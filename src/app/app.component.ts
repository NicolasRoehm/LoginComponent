// Angular modules
import { Component }          from '@angular/core';
import { ViewChild }          from '@angular/core';
import { OnInit }             from '@angular/core';
import { OnDestroy }          from '@angular/core';
import { ChangeDetectorRef }  from '@angular/core';
import { MatSnackBar }        from '@angular/material';

// External modules
import * as dat               from 'dat.gui';
// import * as cssdebug          from 'debugcss';
declare var CssDebug : any;
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
export class AppComponent implements OnInit, OnDestroy
{
  public loginForm : LoginFormComponent;
  public reset : any[] = [{}];
  @ViewChild('loginForm') set content(content : LoginFormComponent)
  {
    this.loginForm = content;
    this.changeDemo();
    this.cdRef.detectChanges();
  }

  public demo        = Demo;
  public credentials = Credentials;

  public selectedDemo : string = Demo.SIMPLE_CONNECTION;

  public toggleNavbar : string = '';

  // NOTE: Dynamic demo
  public gui      : dat.GUI;
  public settings : any = {
    // NOTE: Style
    container    : false,
    loginBySteps : false,
    customTheme  : 'light',
    // NOTE: Layouts (customFormLayouts)
    pwd      : 'modal',
    mfaSetup : 'tab',
    mfa      : 'inline',
    // NOTE: Policies (customUsrPolicy & customPwdPolicies)
    usrPolicy   : 'email', // email / phone / regex
    pwdRangeMin : 8,
    pwdRangeMax : 128,
    pwdChar     : true,
    pwdNumber   : true,
    pwdLower    : true,
    pwdUpper    : true,
    // NOTE: Social buttons (customSocialButtons)
    google   : true,
    facebook : true,
    // NOTE: Icons
    iconUsrOnLoginForm : true,
    iconPwdOnLoginForm : true,
    // NOTE: Buttons
    btnClearUsrOnLoginForm  : true,
    btnShowPwdOnLoginForm   : true,
    btnClearCodeOnPwdForm   : true,
    btnShowPwdOnPwdForm     : true,
    btnClearCodeOnMfaForm   : true,
    btnForgotPwdOnLoginForm : true,
    btnSignUpOnLoginForm    : true,
    // NOTE: Errors
    errOnLoginForm : true,
    errOnPwdForm : true,
    errOnMfaForm : true,
    // NOTE: Translation
  };

  constructor
  (
    public  snackBar    : MatSnackBar,
    private authService : AuthService,
    private translate   : TranslateService,
    private cdRef       : ChangeDetectorRef
  )
  {
    // NOTE: This language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // NOTE: The lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  public ngOnInit() : void
  {
    this.gui = new dat.GUI({
      width: 300,
      autoPlace: false
    });
    this.gui.useLocalStorage = true;
    this.gui.remember(this.settings);

    var stepSize = 1; // NOTE: Precision level of our gui

    this.gui.styleFolder = this.gui.addFolder('Style');
    this.gui.styleFolder.add(this.settings, 'container').name('Fixed width');
    this.gui.styleFolder.add(this.settings, 'loginBySteps').name('Google style');
    this.gui.styleFolder.add(this.settings, 'customTheme', [ 'light', 'dark' ]).name('Theme');

    this.gui.layoutsFolder = this.gui.addFolder('Layouts');
    this.gui.layoutsFolder.add(this.settings, 'pwd', [ 'modal', 'tab' ] ).name('Password + setup');
    this.gui.layoutsFolder.add(this.settings, 'mfaSetup', [ 'modal', 'tab' ] ).name('MFA setup');
    this.gui.layoutsFolder.add(this.settings, 'mfa', [ 'modal', 'tab', 'inline' ] ).name('MFA');

    this.gui.policiesFolder = this.gui.addFolder('Policies');
    this.gui.policiesFolder.add(this.settings, 'usrPolicy').name('Username policy');
    this.gui.policiesFolder.add(this.settings, 'pwdRangeMin').min(0).max(255).step(stepSize).name('Password min length');
    this.gui.policiesFolder.add(this.settings, 'pwdRangeMax').min(0).max(255).step(stepSize).name('Password max length');
    this.gui.policiesFolder.add(this.settings, 'pwdChar').name('Password character');
    this.gui.policiesFolder.add(this.settings, 'pwdNumber').name('Password number');
    this.gui.policiesFolder.add(this.settings, 'pwdLower').name('Password lowercase');
    this.gui.policiesFolder.add(this.settings, 'pwdUpper').name('Password uppercase');

    this.gui.iconsFolder = this.gui.addFolder('Icons');
    this.gui.iconsFolder.add(this.settings, 'iconUsrOnLoginForm').name('User icon');
    this.gui.iconsFolder.add(this.settings, 'iconPwdOnLoginForm').name('Lock icon');

    this.gui.buttonsFolder = this.gui.addFolder('Buttons');
    this.gui.buttonsFolder.add(this.settings, 'btnForgotPwdOnLoginForm').name('Forgot password');
    this.gui.buttonsFolder.add(this.settings, 'btnSignUpOnLoginForm').name('Sign up');
    this.gui.buttonsFolder.add(this.settings, 'google').name('Sign in with Google');
    this.gui.buttonsFolder.add(this.settings, 'facebook').name('Sign in with Facebook');

    this.gui.inputsFolder = this.gui.addFolder('Inputs');
    this.gui.inputsFolder.add(this.settings, 'btnClearUsrOnLoginForm').name('Clear username');
    this.gui.inputsFolder.add(this.settings, 'btnShowPwdOnLoginForm').name('Show password');
    this.gui.inputsFolder.add(this.settings, 'btnShowPwdOnPwdForm').name('Show password (pwd)');
    this.gui.inputsFolder.add(this.settings, 'btnClearCodeOnPwdForm').name('Clear code (pwd)');
    this.gui.inputsFolder.add(this.settings, 'btnClearCodeOnMfaForm').name('Clear code (MFA)');

    this.gui.errorsFolder = this.gui.addFolder('Errors');
    this.gui.errorsFolder.add(this.settings, 'errOnLoginForm').name('Login form');
    this.gui.errorsFolder.add(this.settings, 'errOnPwdForm').name('Password form');
    this.gui.errorsFolder.add(this.settings, 'errOnMfaForm').name('MFA form');

    var customContainer = document.getElementById('gui-container');
    customContainer.appendChild(this.gui.domElement);

    this.selectedDemo = Demo.SIMPLE_CONNECTION;
  }

  public ngOnDestroy() : void
  {
    this.cdRef.detach();
  }

  public debugCss() : void
  {
    // var form = document.getElementById('debug-login-form');
    // form.addEventListener('click', (event) => {
    //   CssDebug.readQueryString();
    //   CssDebug.AddOutliners();
    //   CssDebug.mouseHandler(event);
    // }, true);
    // form.click();
    // console.log(form);
    // console.log(CssDebug);
    
    // var test = new cssdebug();
    // cssdebug.mouseHandler(form);
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE: Events -------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public initialized() : void
  {
    console.log('initialized');
    this.debugCss();
  }

  public signUp() : void
  {
    console.log('sign up');
  }

  public stepUsr($event : any) : void
  {
    if(!$event)
      return;

    let username : string = null;
    username = $event.username;

    console.log(username);
    // NextStep
    this.loginForm.showPwdStep('nicolas roehm');
  }

  public stepPwd($event : any) : void
  {
    if(!$event)
      return;

    let password : string = null;
    password = $event.password;

    console.log(password);
  }

  public login($event : any) : void
  { // NOTE: onClickLogin
    if(!$event)
      return;

    let username : string = null;
    let password : string = null;
    username = $event.username;
    password = $event.password;

    // Show loader

    this.authService.fakeAuth(username, password).subscribe(res =>
    {
      if(res === 1)
        this.snackBar.open('SUCCESS', 'X');

      if(res === 2)
        this.loginForm.showMfaForm();
    },
    err =>
    {
      // Hide loader

      // First connection
      if(err === 1)
        this.loginForm.showPwdForm(true);

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

    let username : string = null;
    let password : string = null;
    let social   : string = null;
    username = $event.username;
    password = $event.password;
    social   = $event.social;

    console.log($event);
  }

  public forgotPassword($event : any) : void
  { // NOTE: onClickForgotPassword
    if(!$event)
      return;

    let username : string = null;
    username = $event.username;

    console.log($event);

    if(!username)
    {
      this.snackBar.open(this.translate.instant('ERROR_USR_REQUIRED'), 'X');
      return;
    }

    this.authService.fakeResetPassword(username).subscribe((res : any) =>
    {
      this.loginForm.showPwdForm(false);
    },
    err =>
    {
      let errorMsg  : string = null;
      let errorCode : string = null;
      errorCode = err.code;

      switch(errorCode)
      { // NOTE: This example use AWS errors
        case AuthError.FORGOT_PWD_VERIF_USER :
          errorMsg = this.translate.instant('ERROR_INCORRECT_USER');
          break;
        case AuthError.FORGOT_PWD_VERIF_INIT :
          errorMsg = this.translate.instant('ERROR_FORGOT_PW_VERIF_INIT');
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
      this.loginForm.hidePwdForm();
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
      this.loginForm.hidePwdForm();
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

    let verifCode : string = null;
    verifCode = $event.code;

    console.log(verifCode);

    this.loginForm.hideMfaForm();
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE: Demo ---------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public onClickNavbar() : void
  {
    if(!this.toggleNavbar.length)
      this.toggleNavbar = 'open';
    else
      this.toggleNavbar = '';
  }

  public onRecreate() : void
  {
    this.reset[0] = {};
  }

  public onClickChangeDemo(demo : string) : void
  {
    this.onRecreate();
    this.selectedDemo = demo;
  }

  public changeDemo() : void
  {
    switch(this.selectedDemo)
    {
      case Demo.SIMPLE_CONNECTION :
        this.setValues(Credentials.USR_1, Credentials.PWD_1);
        break;
      case Demo.MFA_CONNECTION :
        this.setValues(Credentials.USR_2, Credentials.PWD_2);
        break;
      case Demo.PWD_SETUP :
        this.setValues(Credentials.USR_3, Credentials.PWD_3);
        break;
      case Demo.MFA_SETUP :
        this.setValues(Credentials.USR_4, Credentials.PWD_4);
        break;
      default :
        this.setValues(Credentials.USR_1, Credentials.PWD_1);
        break;
    }
  }

  public setValues(username : string, password: string) : void
  {
    if(this.loginForm.formGroup)
    {
      this.loginForm.formGroup.controls.username.setValue(username);
      this.loginForm.formGroup.controls.password.setValue(password);
    }
    else
    {
      this.loginForm.usrFormGroup.controls.username.setValue(username);
      this.loginForm.pwdFormGroup.controls.password.setValue(password);
    }
  }
}
