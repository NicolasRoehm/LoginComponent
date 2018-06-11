// Angular modules
import { Component }          from '@angular/core';
import { ViewChild }          from '@angular/core';
import { OnInit }             from '@angular/core';
import { MatSnackBar }        from '@angular/material';

// External modules
import { TranslateService }   from '@ngx-translate/core';

// Services
import { AuthService }        from './auth.service';

// Components
import { LoginFormComponent } from 'login-form';

// Enums
import { AuthError }          from './auth.enum';
import { Demo }               from './demo.enum';
import { Credentials }        from './credentials.enum';

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})
export class AppComponent implements OnInit
{
  @ViewChild('loginForm') loginForm : LoginFormComponent;

  public demo        = Demo;
  public credentials = Credentials;
  public selectedDemo : string = Demo.SIMPLE_CONNECTION;

  constructor
  (
    public  snackBar    : MatSnackBar,
    private authService : AuthService,
    private translate   : TranslateService
  )
  {
    // NOTE: This language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // NOTE: The lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  public ngOnInit() : void
  {
    this.setValues(Credentials.LOGIN_1, Credentials.PASS_1);
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE: Events -------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public login($event : any) : void
  { // NOTE: onClickLogin
    if(!$event)
      return;

    let login    : string = null;
    let password : string = null;
    login    = $event.login;
    password = $event.password;

    // Show loader

    this.authService.fakeAuth(login, password).subscribe(user =>
    {
      console.log(user);
      this.snackBar.open('SUCCESS', 'X');
    },
    err =>
    {
      console.log(err);
      // Hide loader

      // First connection
      if(err === 1)
        this.loginForm.showPassForm(true);

      // Error
      if(err === 2)
        this.snackBar.open(this.translate.instant('ERROR_LOGIN_FAILED'), 'X');

      // MFA setup
      if(err === 3)
        this.loginForm.showMfaSetupForm('JBSWY3DPEHPK3PXP', 'otpauth://totp/john@doe.com?secret=JBSWY3DPEHPK3PXP&issuer=Caliatys');
    });
  }

  public loginSocial($event : any) : void
  { // NOTE: onClickLoginSocial
    if(!$event)
      return;

    let login    : string = null;
    let password : string = null;
    let social   : string = null;
    login    = $event.login;
    password = $event.password;
    social   = $event.social;

    console.log($event);

    // TODO: fakeService
  }

  public forgottenPassword($event : any) : void
  { // NOTE: onClickForgottenPassword
    if(!$event)
      return;

    let login : string = null;
    login = $event.login;

    console.log($event);

    if(!login)
    {
      this.snackBar.open(this.translate.instant('ERROR_LOGIN_REQUIRED'), 'X');
      return;
    }

    this.authService.fakeResetPassword(login).subscribe((res : any) =>
    {
      this.loginForm.showPassForm(false);
    },
    err =>
    {
      let errorMsg  : string = null;
      let errorCode : string = null;
      errorCode = err.code;

      switch(errorCode)
      { // NOTE: This example use AWS errors
        case AuthError.FORGOT_PASS_VERIF_EMAIL :
          errorMsg = this.translate.instant('ERROR_INCORRECT_EMAIL');
          break;
        case AuthError.FORGOT_PASS_VERIF_INIT :
          errorMsg = this.translate.instant('ERROR_FORGOT_PASS_VERIF_INIT');
          break;
        case AuthError.VERIF_LIMIT :
          errorMsg = this.translate.instant('ERROR_VERIF_LIMIT');
          break;
        case AuthError.VERIF_AUTHORIZATION :
          errorMsg = this.translate.instant('ERROR_VERIF_AUTHORIZATION');
          break;
        default :
          errorMsg = this.translate.instant('ERROR_AMAZON_POLICY');
          break;
      }

      this.snackBar.open(errorMsg, 'X');
    });
  }

  public firstPassword($event : any) : void
  { // NOTE: First connection
    if(!$event)
      return;

    console.log($event);

    let newPassword : string = null;
    newPassword = $event.password;

    this.authService.fakeInitPassword(newPassword).subscribe(res =>
    {
      this.loginForm.hidePassForm();
      this.snackBar.open(this.translate.instant('SUCCESS_UPDATE_PWD'), 'x');
    },
    err =>
    {
      this.snackBar.open(this.translate.instant('ERROR_AMAZON_POLICY'), 'x');
    });
  }

  public lostPassword($event : any) : void
  { // NOTE: Lost password
    if(!$event)
      return;

    console.log($event);

    let newPassword : string = null;
    let verifCode   : string = null;
    newPassword = $event.password;
    verifCode   = $event.code;

    this.authService.fakeConfirmPassword(newPassword, verifCode).subscribe(res =>
    {
      this.loginForm.hidePassForm();
      this.snackBar.open(this.translate.instant('SUCCESS_UPDATE_PWD'), 'x');
    },
    err =>
    {
      let errorMsg  : string = null;
      let errorCode : string = null;
      errorCode = err.code;

      switch(errorCode)
      { // NOTE: This example use AWS errors
        case AuthError.VERIF_CODE :
          errorMsg = this.translate.instant('ERROR_VERIF_CODE');
          break;
        case AuthError.VERIF_LIMIT :
          errorMsg = this.translate.instant('ERROR_VERIF_LIMIT');
          break;
        default :
          errorMsg = this.translate.instant('ERROR_AMAZON_POLICY');
          break;
      }

      this.snackBar.open(errorMsg, 'x');
    });
  }

  public saveMfaKey($event : any) : void
  { // NOTE: MFA code
    if(!$event)
      return;

    console.log($event);

    let verifCode   : string = null;
    verifCode   = $event.code;

    this.loginForm.hideMfaSetupForm();
  }

  public sendMfaCode($event : any) : void
  { // NOTE: MFA code
    if(!$event)
      return;

    console.log($event);

    let verifCode : string = null;
    verifCode = $event.code;

    console.log(verifCode);
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE: Demo ---------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public onClickChangeDemo(demo : string) : void
  {
    this.selectedDemo = demo;
    switch(demo)
    {
      case Demo.SIMPLE_CONNECTION :
        this.setValues(Credentials.LOGIN_1, Credentials.PASS_1);
        break;
      case Demo.MFA_CONNECTION :
        this.setValues(Credentials.LOGIN_2, Credentials.PASS_2);
        break;
      case Demo.PASSWORD_SETUP :
        this.setValues(Credentials.LOGIN_3, Credentials.PASS_3);
        break;
      case Demo.MFA_SETUP :
        this.setValues(Credentials.LOGIN_4, Credentials.PASS_4);
        break;
      case Demo.GOOGLE :
        this.setValues(Credentials.LOGIN_5, Credentials.PASS_5);
        break;
      case Demo.FACEBOOK :
        this.setValues(Credentials.LOGIN_6, Credentials.PASS_6);
        break;
      default :
        this.setValues(Credentials.LOGIN_1, Credentials.PASS_1);
        break;
    }
  }

  public setValues(login : string, password: string) : void
  {
    this.loginForm.formGroup.controls.login.setValue(login);
    this.loginForm.formGroup.controls.password.setValue(password);
  }
}
