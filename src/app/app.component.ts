// Angular modules
import { Component }          from '@angular/core';
import { ViewChild }          from '@angular/core';
import { OnInit }             from '@angular/core';
import { OnDestroy }          from '@angular/core';
import { ChangeDetectorRef }  from '@angular/core';
import { MatSnackBar }        from '@angular/material';

// External modules
declare var CssDebug : any;
import * as dat               from 'dat.gui';
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

  public pwdPolicies : any = {
    range : {
      min : 8,
      max : 128,
    },
    char   : true,
    number : true,
    lower  : true,
    upper  : true
  };

  public icons : any = {
    iconUsrOnLoginForm : true,
    iconPwdOnLoginForm : true
  };

  public inputs : any = {
    clearUsrOnLoginForm : true,
    showPwdOnLoginForm  : true,
    showPwdOnPwdForm    : true,
    clearCodeOnPwdForm  : true,
    clearCodeOnMfaForm  : true
  };

  public buttons : any = {
    google         : true,
    facebook       : true,
    forgotPassword : true,
    signUp         : true
  };

  public layouts : any = {
    pwd      : 'modal',
    mfaSetup : 'tab',
    mfa      : 'inline',
  };

  public errors : any = {
    login : true,
    pwd   : true,
    mfa   : true
  };

  public labels : any = {
    header : {
      titlePwd         : 'Lost password',
      subtitlePwd      : 'Please enter the confirmation code',
      titlePwdSetup    : 'Password setup',
      subtitlePwdSetup : 'Please enter a new password',
      titleMfa         : 'MFA',
      subtitleMfa      : 'Please enter the confirmation code',
      titleMfaSetup    : 'MFA setup',
      subtitleMfaSetup : 'Save this secret key for future connection'
    },
    input : {
      username    : 'Username',
      password    : 'Password',
      verifCode   : 'Verification code',
      newPassword : 'New password'
    },
    button : {
      signIn         : 'Sign in',
      signUp         : 'Sign up',
      next           : 'Next',
      back           : 'Back',
      send           : 'Send',
      save           : 'Save',
      forgotPassword : 'Forgot password',
      googleSignIn   : 'Sign in with Google',
      facebookSignIn : 'Sign in with Facebook'
    },
    policy : {
      required      : 'This field is required',
      nonWhitespace : 'This value must not contain any spaces',
      email         : 'This value must be an email',
      phone         : 'This value must be a phone number',
      sixDigits     : 'This value must contains six digits',
      customRegex   : 'This value must match the custom regex provided',
      pwdLength     : 'Minimum password length ({{min}} to {{max}})',
      pwdUppercase  : 'Require at least one uppercase letter (A to Z)',
      pwdLowercase  : 'Require at least one lowercase letter (a to z)',
      pwdNumber     : 'Require at least one number (0 to 9)',
      pwdSpecial    : 'Require at least one nonalphanumeric character ! @ # $ % ^ & * ( ) _ + - = [ ] { } | \''
    }
  };

  public settings : any = {
    // NOTE: Style
    fixedWidth  : false,
    googleStyle : false,
    googleTheme : 'light',
    // NOTE: User policy
    usrPolicy   : 'email', // email / phone / regex
    // NOTE: CSS
    debugCss : false,
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
    // NOTE: Init dat.GUI
    this.initDatGui();

    // NOTE: Init CssDebug
    CssDebug.readQueryString();
    CssDebug.AddOutliners();

    // NOTE: Simple connection
    this.selectedDemo = Demo.SIMPLE_CONNECTION;
  }

  public ngOnDestroy() : void
  {
    this.cdRef.detach();
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE: Events -------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public initialized() : void
  {
    console.log('initialized');
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

    console.log('stepUsr', $event);
    // NextStep
    this.loginForm.showPwdStep('nicolas roehm');
  }

  public stepPwd($event : any) : void
  {
    if(!$event)
      return;

    let username : string = null;
    let password : string = null;
    username = $event.username;
    password = $event.password;

    console.log('stepPwd', $event);

    this.auth(username, password);
  }

  public login($event : any) : void
  { // NOTE: onClickLogin
    if(!$event)
      return;

    let username : string = null;
    let password : string = null;
    username = $event.username;
    password = $event.password;

    console.log('login', $event);

    this.auth(username, password);
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

    console.log('loginSocial', $event);
  }

  public forgotPassword($event : any) : void
  { // NOTE: onClickForgotPassword
    if(!$event)
      return;

    let username : string = null;
    username = $event.username;

    console.log('forgotPassword', $event);

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

    console.log('firstPassword', $event);

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

    console.log('lostPassword', $event);

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

    console.log('saveMfaKey', $event);

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

    console.log('sendMfaCode', $event);

    this.loginForm.hideMfaForm();
  }

  public auth(username : string, password : string) : void
  {
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

  // -------------------------------------------------------------------------------
  // ---- NOTE: Demo ---------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public initDatGui() : void
  {
    this.gui = new dat.GUI({
      width: 300,
      autoPlace: false
    });
    this.gui.useLocalStorage = true;
    this.gui.remember(this.settings);

    var stepSize = 1; // NOTE: Precision level of our gui

    this.gui.styleFolder = this.gui.addFolder('Style');
    this.gui.styleFolder.add(this.settings, 'fixedWidth').name('Fixed width');
    this.gui.styleFolder.add(this.settings, 'googleStyle').name('Google style');
    this.gui.styleFolder.add(this.settings, 'googleTheme', [ 'light', 'dark' ]).name('Google theme');

    this.gui.layoutsFolder = this.gui.addFolder('Layouts');
    this.gui.layoutsFolder.add(this.layouts, 'pwd', [ 'modal', 'tab' ] ).name('Password + setup').onChange((v)=>{this.upd('layouts','pwd',v);});
    this.gui.layoutsFolder.add(this.layouts, 'mfaSetup', [ 'modal', 'tab' ] ).name('MFA setup').onChange((v)=>{this.upd('layouts','mfaSetup',v);});
    this.gui.layoutsFolder.add(this.layouts, 'mfa', [ 'modal', 'tab', 'inline' ] ).name('MFA').onChange((v)=>{this.upd('layouts','mfa',v);});

    this.gui.policiesFolder = this.gui.addFolder('Policies');
    this.gui.policiesFolder.add(this.settings, 'usrPolicy').name('Username policy');
    this.gui.policiesFolder.add(this.pwdPolicies.range, 'min').min(0).max(255).step(stepSize).name('Password min length').onChange((v)=>{this.upd('pwdPolicies.range','min',v);});
    this.gui.policiesFolder.add(this.pwdPolicies.range, 'max').min(0).max(255).step(stepSize).name('Password max length').onChange((v)=>{this.upd('pwdPolicies.range','max',v);});
    this.gui.policiesFolder.add(this.pwdPolicies, 'char').name('Password character').onChange((v)=>{this.upd('pwdPolicies','char',v);});
    this.gui.policiesFolder.add(this.pwdPolicies, 'number').name('Password number').onChange((v)=>{this.upd('pwdPolicies','number',v);});
    this.gui.policiesFolder.add(this.pwdPolicies, 'lower').name('Password lowercase').onChange((v)=>{this.upd('pwdPolicies','lower',v);});
    this.gui.policiesFolder.add(this.pwdPolicies, 'upper').name('Password uppercase').onChange((v)=>{this.upd('pwdPolicies','upper',v);});

    this.gui.iconsFolder = this.gui.addFolder('Icons');
    this.gui.iconsFolder.add(this.icons, 'iconUsrOnLoginForm').name('User icon').onChange((v)=>{this.upd('icons','iconUsrOnLoginForm',v);});
    this.gui.iconsFolder.add(this.icons, 'iconPwdOnLoginForm').name('Lock icon').onChange((v)=>{this.upd('icons','iconPwdOnLoginForm',v);});

    this.gui.buttonsFolder = this.gui.addFolder('Buttons');
    this.gui.buttonsFolder.add(this.buttons, 'forgotPassword').name('Forgot password').onChange((v)=>{this.upd('buttons','forgotPassword',v);});
    this.gui.buttonsFolder.add(this.buttons, 'signUp').name('Sign up').onChange((v)=>{this.upd('buttons','signUp',v);});
    this.gui.buttonsFolder.add(this.buttons, 'google').name('Sign in with Google').onChange((v)=>{this.upd('buttons','google',v);});
    this.gui.buttonsFolder.add(this.buttons, 'facebook').name('Sign in with Facebook').onChange((v)=>{this.upd('buttons','facebook',v);});

    this.gui.inputsFolder = this.gui.addFolder('Inputs');
    this.gui.inputsFolder.add(this.inputs, 'clearUsrOnLoginForm').name('Clear username').onChange((v)=>{this.upd('inputs','clearUsrOnLoginForm',v);});
    this.gui.inputsFolder.add(this.inputs, 'showPwdOnLoginForm').name('Show password').onChange((v)=>{this.upd('inputs','showPwdOnLoginForm',v);});
    this.gui.inputsFolder.add(this.inputs, 'showPwdOnPwdForm').name('Show password (pwd)').onChange((v)=>{this.upd('inputs','showPwdOnPwdForm',v);});
    this.gui.inputsFolder.add(this.inputs, 'clearCodeOnPwdForm').name('Clear code (pwd)').onChange((v)=>{this.upd('inputs','clearCodeOnPwdForm',v);});
    this.gui.inputsFolder.add(this.inputs, 'clearCodeOnMfaForm').name('Clear code (MFA)').onChange((v)=>{this.upd('inputs','clearCodeOnMfaForm',v);});

    this.gui.errorsFolder = this.gui.addFolder('Errors');
    this.gui.errorsFolder.add(this.errors, 'login').name('Login form').onChange((v)=>{this.upd('errors','login',v);});
    this.gui.errorsFolder.add(this.errors, 'pwd').name('Password form').onChange((v)=>{this.upd('errors','pwd',v);});
    this.gui.errorsFolder.add(this.errors, 'mfa').name('MFA form').onChange((v)=>{this.upd('errors','mfa',v);});

    this.gui.translateFolder = this.gui.addFolder('Translation');
    // this.gui.translateFolder.add(this.labels.header, 'titlePwd').name('Title pwd').onChange((v)=>{this.upd('labels.header','titlePwd',v);});
    // this.gui.translateFolder.add(this.labels.header, 'subtitlePwd').name('Subitle pwd').onChange((v)=>{this.upd('labels.header','subtitlePwd',v);});
    // this.gui.translateFolder.add(this.labels.header, 'titlePwdSetup').name('Title pwd stp').onChange((v)=>{this.upd('labels.header','titlePwdSetup',v);});
    // this.gui.translateFolder.add(this.labels.header, 'subtitlePwdSetup').name('Subitle pwd stp').onChange((v)=>{this.upd('labels.header','subtitlePwdSetup',v);});
    // this.gui.translateFolder.add(this.labels.header, 'titleMfa').name('Title mfa').onChange((v)=>{this.upd('labels.header','titleMfa',v);});
    // this.gui.translateFolder.add(this.labels.header, 'subtitleMfa').name('Subitle mfa').onChange((v)=>{this.upd('labels.header','subtitleMfa',v);});
    // this.gui.translateFolder.add(this.labels.header, 'titleMfaSetup').name('Title mfa stp').onChange((v)=>{this.upd('labels.header','titleMfaSetup',v);});
    // this.gui.translateFolder.add(this.labels.header, 'subtitleMfaSetup').name('Subitle mfa stp').onChange((v)=>{this.upd('labels.header','subtitleMfaSetup',v);});

    this.gui.translateFolder.add(this.labels.input, 'username').name('Username').onChange((v)=>{this.upd('labels.input','username',v);});
    this.gui.translateFolder.add(this.labels.input, 'password').name('Password').onChange((v)=>{this.upd('labels.input','password',v);});
    this.gui.translateFolder.add(this.labels.input, 'verifCode').name('Verif code').onChange((v)=>{this.upd('labels.input','verifCode',v);});
    this.gui.translateFolder.add(this.labels.input, 'newPassword').name('New pwd').onChange((v)=>{this.upd('labels.input','newPassword',v);});

    // TODO: add other translation
    // TODO: repair dat.GUI scroll

    this.gui.cssFolder = this.gui.addFolder('CSS');
    this.gui.cssFolder.add(this.settings, 'debugCss').name('Debug').onChange((v)=>{this.cssDebug(v);});

    // NOTE: dat.GUI position
    var customContainer = document.getElementById('gui-container');
    customContainer.appendChild(this.gui.domElement);
  }

  public cssDebug(value : boolean) : void
  {
    if(!value)
    { // Remove event
      CssDebug.removeEvent(document.body, 'mouseover', CssDebug.mouseHandler);
      CssDebug.removeEvent(window, 'scroll', CssDebug.scrollHandler);
      CssDebug.removeEvent(document.body, 'mouseout', CssDebug.mouseOutHandler);
      CssDebug.hideBoxVis();
      return;
    }
    // Add event
    CssDebug.addEvent(document.body, 'mouseover', CssDebug.mouseHandler);
    CssDebug.addEvent(window, 'scroll', CssDebug.scrollHandler);
    CssDebug.addEvent(document.body, 'mouseout', CssDebug.mouseOutHandler);
  }

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

  private upd(obj : any, child : string, v : any) : any
  {
    if(!obj.includes('.'))
    {
      this[obj][child] = v;
      this[obj] = Object.assign({}, this[obj]);
      return;
    }

    var depths = obj.split('.').reverse(),
    toBottom = depths.length,
    property = this;

    while (toBottom--)
      property = property[depths[toBottom]];

    property[child] = v;

    let firstItem : string = null;
    firstItem = obj.split('.')[0];
    this[firstItem] = Object.assign({}, this[firstItem]);
  }
}
