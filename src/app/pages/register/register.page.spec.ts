import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { RegisterPageModule } from './register.module';
import { RegisterPage } from './register.page';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let router: Router;
  let page;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterPage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: "home", loadChildren: () => import('./../../pages/home/home.module').then( m => m.HomePageModule) }
        ]),
        ReactiveFormsModule,
        RegisterPageModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    router = TestBed.get(Router);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement;
  }));

  it('should create register form on page init', () => {
    fixture.detectChanges();

    expect(component.registerForm).not.toBeUndefined();
  })

  it('should go to home page on register', () => {
    fixture.detectChanges();

    spyOn(router, 'navigate');
    
    component.registerForm.getForm().get('name').setValue("anyName");
    component.registerForm.getForm().get('email').setValue("any@email.com");
    component.registerForm.getForm().get('password').setValue("anyPassword");
    component.registerForm.getForm().get('repeatPassword').setValue("anyPassword");
    component.registerForm.getForm().get('phone').setValue("anyPhone");
    component.registerForm.getForm().get('address').get('street').setValue("any street");
    component.registerForm.getForm().get('address').get('number').setValue("any number");
    component.registerForm.getForm().get('address').get('complement').setValue("any complement");
    component.registerForm.getForm().get('address').get('neighborhood').setValue("any neighborhood");
    component.registerForm.getForm().get('address').get('zipCode').setValue("any zip code");
    component.registerForm.getForm().get('address').get('city').setValue("any city");
    component.registerForm.getForm().get('address').get('state').setValue("any state");

    page.querySelector('ion-button').click();

    expect(router.navigate).toHaveBeenCalledWith(['home']);
  })

  it('should not be allowed to register with form invalid', () => {
    fixture.detectChanges();

    spyOn(router, 'navigate');

    page.querySelector('ion-button').click();

    expect(router.navigate).toHaveBeenCalledTimes(0);
  })

});
