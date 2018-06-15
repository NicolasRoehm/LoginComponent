// Angular modules
import { OnInit }          from '@angular/core';
import { AfterViewInit }   from '@angular/core';
import { OnDestroy }       from '@angular/core';
import { Input }           from '@angular/core';
import { Output }          from '@angular/core';
import { Component }       from '@angular/core';
import { EventEmitter }    from '@angular/core';
import { MatDialog }       from '@angular/material';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer }    from '@angular/platform-browser';
import { FormControl }     from '@angular/forms';
import { FormGroup }       from '@angular/forms';
import { FormBuilder }     from '@angular/forms';
import { Validators }      from '@angular/forms';

// External modules
import { Subscription }    from 'rxjs/Subscription';

// Internal modules
import { UsrValidator }    from './validators/usr.validator';

// Enums
import { Layouts }         from './enums/layouts.enum';
import { Themes }          from './enums/themes.enum';
import { Forms }           from './enums/forms.enum';
import { UserPolicies }    from './enums/user-policies.enum';

// Components
import { ModalWrapperComponent } from './layouts/modal-wrapper/modal-wrapper.component';

@Component({
  selector    : 'cal-login-form',
  templateUrl : './login-form.component.html',
  styleUrls   : ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, AfterViewInit, OnDestroy
{
  public    formLayouts    : any;
  public    theme          : string;

  public    loginLabels    : any;
  public    pwdLabels      : any;
  public    headerLabels   : any;
  public    mfaSetupLabels : any;
  public    mfaLabels      : any;

  public    usrPolicy      : string;
  public    pwdPolicies    : any;

  public    socialButtons  : any;

  // Display login form like Google & Microsoft (step by step)
  @Input()  loginBySteps         : boolean = false;
  // Display forms inside a layout : tab (by default) / modal / inline
  // The inline layout is only available for the MFA form
  @Input()  customFormLayouts    : any;
  // Display Google button with the supplied theme : light / dark
  @Input()  customTheme          : string  = null;
  // Display login form inside a container
  @Input()  container            : boolean = false;

  // Optional policy applied on the username input : email / phone / regex
  // Be careful, you must double all the backslashes used in the supplied regex
  @Input()  customUsrPolicy      : string = null;
  // Policies applied on the password input
  @Input()  customPwdPolicies    : any;

  // Social buttons displayed on the login form
  @Input()  customSocialButtons  : any;

  // Dislay user icon inside username input on the login form
  @Input()  iconUserOnLoginForm     : boolean = true;
  // Dislay lock icon inside password input on the login form
  @Input()  iconPwdOnLoginForm      : boolean = true;

  // Display clear button inside username input on the login form
  @Input()  btnClearUserOnLoginForm : boolean = true;
  // Display show/hide button inside password input on the login form
  @Input()  btnShowPwdOnLoginForm   : boolean = true;
  // Display clear button inside code input on the password form
  @Input()  btnClearCodeOnPwdForm   : boolean = true;
  // Display show/hide button inside password input on the password form
  @Input()  btnShowPwdOnPwdForm     : boolean = true;
  // Display clear button inside code input on the mfa form
  @Input()  btnClearCodeOnMfaForm   : boolean = true;

  // Display forgot password button on the login form
  @Input()  btnForgotPwdOnLoginForm : boolean = true;
  // Display sign up button on the login form
  @Input()  btnSignUpOnLoginForm    : boolean = true;

  // Display errors on the login form
  @Input()  errOnLoginForm          : boolean = true;
  // Display errors on the password form
  @Input()  errOnPwdForm            : boolean = true;
  // Display errors on the mfa form
  @Input()  errOnMfaForm            : boolean = true;

  // Labels of the login form
  @Input()  customLoginLabels    : any;
  // Labels of the password form
  @Input()  customPwdLabels      : any;
  // Labels on top of the password form
  @Input()  customHeaderLabels   : any;
  // Labels of the mfa setup form
  @Input()  customMfaSetupLabels : any;
  // Labels of the mfa form
  @Input()  customMfaLabels      : any;

  // Event triggered after creating the login form (AfterViewInit)
  @Output() initialized   : EventEmitter<any> = new EventEmitter();
  // Event triggered after clicking on the sign up button.
  @Output() signUp        : EventEmitter<any> = new EventEmitter();
  // Event object containing username and password properties
  @Output() login         : EventEmitter<any> = new EventEmitter();
  // Event object containing username, password and social properties
  @Output() loginSocial   : EventEmitter<any> = new EventEmitter();
  // Event object containing username property
  @Output() forgotPwd     : EventEmitter<any> = new EventEmitter();
  // Event object containing password and code properties
  @Output() sendResetPwd  : EventEmitter<any> = new EventEmitter();
  // Event object containing password property
  @Output() sendFirstPwd  : EventEmitter<any> = new EventEmitter();
  // Event object containing code property
  @Output() saveMfaKey    : EventEmitter<any> = new EventEmitter();
  // Event object containing code property
  @Output() sendMfaCode   : EventEmitter<any> = new EventEmitter();
  // Event object containing username property
  @Output() stepUsr       : EventEmitter<any> = new EventEmitter();
  // Event object containing password property
  @Output() stepPwd       : EventEmitter<any> = new EventEmitter();

  // NOTE: Form
  public    formGroup     : FormGroup;
  public    showPassword  : boolean = false;
  public    formType      : string;
  public    userPolicies = UserPolicies;
  public    forms = Forms;

  // NOTE: Password
  public    isFirst       : boolean = false;

  // NOTE: MFA
  public    code          : string  = null;
  public    qrCode        : string  = null;

  // NOTE: Steps
  public    usrFormGroup  : FormGroup;
  public    pwdFormGroup  : FormGroup;
  public    userInfo      : string  = null;
  public    userImage     : string  = null;

  // NOTE: Wrapper
  public    layouts = Layouts;
  public    selectedTab     : number = 0;
  public    closeModalEvent : EventEmitter<boolean> = new EventEmitter();

  private   modalFirstSub       : Subscription;
  private   modalLostSub        : Subscription;
  private   modalSaveMfaKeySub  : Subscription;
  private   modalSendMfaCodeSub : Subscription;

  // TODO: Captcha
  // @Input()  rememberMe    : boolean = true; // TODO: check box

  constructor
  (
    public  dialog       : MatDialog,
    public  sanitizer    : DomSanitizer,
    public  iconRegistry : MatIconRegistry,
    private builder      : FormBuilder
  )
  {
    // Social icons
    // TODO: Fix Angular 6 Library assets : https://github.com/angular/angular-cli/issues/11071
    iconRegistry.addSvgIcon('google',   sanitizer.bypassSecurityTrustResourceUrl('../assets/img/google.svg'));
    iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('../assets/img/facebook.svg'));
  }

  public ngOnInit() : void
  {
    // Login form
    this.initFormsGroups();
    // Inputs
    this.initFormLayouts();
    this.initTheme();
    this.initLabels();
    this.initPolicies();
    this.initSocialButtons();
  }

  public ngAfterViewInit() : void
  {
    this.initialized.emit();
  }

  public ngOnDestroy() : void
  {
    if(this.modalFirstSub)
      this.modalFirstSub.unsubscribe();
    if(this.modalLostSub)
      this.modalLostSub.unsubscribe();
    if(this.modalSaveMfaKeySub)
      this.modalSaveMfaKeySub.unsubscribe();
    if(this.modalSendMfaCodeSub)
      this.modalSendMfaCodeSub.unsubscribe();
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Event -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  // NOTE: From component to user --------------------------------------------------------------

  /** Emit `$event` object containing username and password properties.
  *
  * @example
  * var username : string = $event.username;
  * var password : string = $event.password;
  */
  public onClickLogin() : void
  {
    let event : any = {};
    event = this.initEvent();
    this.login.emit(event);
  }

  /** Emit `$event` object containing username, password and social properties.
  *
  * @param social Name of the social provider
  * @example
  * var username : string = $event.username;
  * var password : string = $event.password;
  * var social   : string = $event.social;
  */
  public onClickLoginSocial(social : string) : void
  {
    let event : any = {};
    event = this.initEvent();
    event.social = social;
    this.loginSocial.emit(event);
  }

  /** Emit a click event on the sign up button. */
  public onClickSignUp() : void
  {
    this.signUp.emit();
  }

  /** Emit `$event` object containing username property.
  *
  * @example
  * var username : string = $event.username;
  */
  public onClickForgotPassword() : void
  {
    let event : any = {};
    event = this.initEvent('usr');
    this.forgotPwd.emit(event);
  }

  // NOTE: From user to component --------------------------------------------------------------

  /** Show password form either to initialize first password or to reset forgot password.
  *
  * @param isFirst Initialize first password or reset forgot password
  */
  public showPwdForm(isFirst : boolean) : void
  {
    this.isFirst  = isFirst;
    this.formType = Forms.PWD;
    this.showLayout(this.formLayouts.pwd);
  }

  /** Show MFA setup form to initialize first TOTP (Time-based One-time Password).
  *
  * @param code   
  * @param qrCode 
  */
  public showMfaSetupForm(code : string, qrCode : string) : void
  {
    this.code     = code;
    this.qrCode   = qrCode;
    this.formType = Forms.MFA_SETUP;
    this.showLayout(this.formLayouts.mfaSetup);
  }

  /** Show MFA form to get verification code. */
  public showMfaForm() : void
  {
    this.formType = Forms.MFA;
    this.showLayout(this.formLayouts.mfa);
  }

  /** Hide password form. */
  public hidePwdForm() : void
  {
    this.closeLayout(this.formLayouts.password);
  }

  /** Hide MFA setup form. */
  public hideMfaSetupForm() : void
  {
    this.closeLayout(this.formLayouts.mfaSetup);
  }

  /** Hide MFA form. */
  public hideMfaForm() : void
  {
    this.closeLayout(this.formLayouts.mfa);
  }

  /** Go password step. */
  public showPwdStep(userInfo : string = null, userImage : string = null) : void
  {
    this.userInfo    = userInfo;
    this.userImage   = userImage;
    this.selectedTab = 2;
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Steps events ------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  public onClickNextStep(currentStep : number) : void
  {
    switch(currentStep)
    {
      case 0 :
        this.selectedTab = 1;
        break;
      case 1 : // Username
        let eventUsr : any = null;
        eventUsr = this.initEvent('usr');
        this.stepUsr.emit(eventUsr);
        break;
      case 2 : // Password
        let eventPwd : any = null;
        eventPwd = this.initEvent('pwd');
        this.stepPwd.emit(eventPwd);
        break;
      default:
        break;
    }
  }

  public onClickPrevStep(currentStep : number) : void
  {
    switch(currentStep)
    {
      case 0 :
        break;
      case 1 : // Username
        this.selectedTab = 0;
        break;
      case 2 : // Password
        this.selectedTab = 1;
        break;
      default:
        break;
    }
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Tab events --------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  /** Emit `$event` object containing password property.
  *
  * @example
  * var newPassword : string = $event.password;
  */
  public tabFirstLog($event : any) : void
  {
    this.sendFirstPwd.emit($event);
  }

  /** Emit `$event` object containing password and code properties.
  *
  * @example
  * var newPassword      : string = $event.password;
  * var verificationCode : string = $event.code;
  */
  public tabLostPwd($event : any) : void
  {
    this.sendResetPwd.emit($event);
  }

  /** Emit `$event` object containing code property.
  *
  * @example
  * var verificationCode : string = $event.code;
  */
  public tabSaveMfaKey($event : any) : void
  {
    this.saveMfaKey.emit($event);
  }

  /** Emit `$event` object containing code property.
  *
  * @example
  * var verificationCode : string = $event.code;
  */
  public tabSendMfaCode($event : any) : void
  {
    this.sendMfaCode.emit($event);
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Modal events ------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  /** Emit `$event` object containing password property.
  *
  * @example
  * var newPassword : string = $event.password;
  */
  public modalFirstLog(dialogRef : any) : void
  {
    this.modalFirstSub = dialogRef.componentInstance.relayFirstLog.subscribe((event) =>
    {
      this.sendFirstPwd.emit(event);
    });
  }

  /** Emit `$event` object containing password and code properties.
  *
  * @example
  * var newPassword      : string = $event.password;
  * var verificationCode : string = $event.code;
  */
  public modalLostPwd(dialogRef : any) : void
  {
    this.modalLostSub = dialogRef.componentInstance.relayLostPwd.subscribe((event) =>
    {
      this.sendResetPwd.emit(event);
    });
  }

  /** Emit `$event` object containing code property.
  *
  * @example
  * var verificationCode : string = $event.code;
  */
  public modalSaveMfaKey(dialogRef : any) : void
  {
    this.modalSaveMfaKeySub = dialogRef.componentInstance.relaySaveMfaKey.subscribe((event) =>
    {
      this.saveMfaKey.emit(event);
    });
  }

  /** Emit `$event` object containing code property.
  *
  * @example
  * var verificationCode : string = $event.code;
  */
  public modalSendMfaCode(dialogRef : any) : void
  {
    this.modalSendMfaCodeSub = dialogRef.componentInstance.relaySendMfaCode.subscribe((event) =>
    {
      this.sendMfaCode.emit(event);
    });
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Tab ---------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  public onClickCloseTab($event : any) : void
  {
    this.closeTab();
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Modal -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  private openModal() : void
  {
    let params : any = {
      // Common
      formType              : this.formType,
      headerLabels          : this.headerLabels,
      closeEvent            : this.closeModalEvent,
      // Password form
      isFirst               : this.isFirst,
      pwdLabels             : this.pwdLabels,
      pwdPolicies           : this.pwdPolicies,
      errOnPwdForm          : this.errOnPwdForm,
      btnShowPwdOnPwdForm   : this.btnShowPwdOnPwdForm,
      btnClearCodeOnPwdForm : this.btnClearCodeOnPwdForm,
      // Mfa form
      code                  : this.code,
      qrCode                : this.qrCode,
      mfaLabels             : this.mfaLabels,
      mfaSetupLabels        : this.mfaSetupLabels,
      errOnMfaForm          : this.errOnMfaForm,
      btnClearCodeOnMfaForm : this.btnClearCodeOnMfaForm
    };

    let dialogRef = this.dialog.open(ModalWrapperComponent, { data : params });

    if(this.formType === Forms.PWD)
    {
      this.modalFirstLog(dialogRef);
      this.modalLostPwd(dialogRef);
    }

    if(this.formType === Forms.MFA_SETUP)
      this.modalSaveMfaKey(dialogRef);

    if(this.formType === Forms.MFA)
      this.modalSendMfaCode(dialogRef);

    dialogRef.afterClosed().subscribe(result =>
    {
      this.formType = null;
      if(result)
        this.formGroup.controls.password.setValue(result); // Set password
    });
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Private -----------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  private showLayout(formLayout : string) : void
  {
    switch(formLayout)
    {
      case Layouts.TAB    :
        this.openTab();
        break;
      case Layouts.MODAL  :
        this.openModal();
        break;
      case Layouts.INLINE :
        this.formGroup.controls.username.disable();
        this.formGroup.controls.password.disable();
        break;
      default :
        this.openTab();
        break;
    }
  }

  private closeLayout(formLayout : string) : void
  {
    this.formType = null;

    switch(formLayout)
    {
      case Layouts.TAB    :
        this.closeTab();
        break;
      case Layouts.MODAL  :
        this.closeModal();
        break;
      case Layouts.INLINE :
        this.formGroup.controls.username.enable();
        this.formGroup.controls.password.enable();
        break;
      default :
        this.closeTab();
        break;
    }
  }

  private closeModal() : void
  {
    this.closeModalEvent.emit();
  }

  private openTab() : void
  {
    if(this.loginBySteps)
      this.selectedTab = 3;
    else
      this.selectedTab = 1;
  }

  private closeTab() : void
  {
    this.selectedTab = 0;
  }

  private initFormLayouts() : void
  {
    let defaultFormLayouts : any = null;
    let formLayouts        : any = null;

    // Form layouts
    defaultFormLayouts = {
      pwd      : Layouts.TAB,
      mfaSetup : Layouts.TAB,
      mfa      : Layouts.TAB,
    };

    formLayouts = Object.assign(defaultFormLayouts, this.customFormLayouts);

    // Corrections
    if(formLayouts.pwd === Layouts.INLINE)
      formLayouts.pwd = Layouts.TAB;
    if(formLayouts.mfaSetup === Layouts.INLINE)
      formLayouts.mfaSetup = Layouts.TAB;
    if(this.loginBySteps && formLayouts.mfa === Layouts.INLINE)
      formLayouts.mfa = Layouts.TAB;

    this.formLayouts = formLayouts;
  }

  private initTheme() : void
  {
    let theme : string = null;

    // Theme
    switch(this.customTheme)
    {
      case Themes.LIGHT :
        theme = this.customTheme;
        break;
      case Themes.DARK :
        theme = this.customTheme;
        break;
      default :
        theme = Themes.LIGHT;
        break;
    }

    this.theme = theme;
  }

  private initSocialButtons() : void
  {
    let defaultButons : any = null;
    let buttons       : any = null;

    // Social buttons
    defaultButons = {
      google   : true,
      facebook : true
    };

    buttons = Object.assign(defaultButons, this.customSocialButtons);
    this.socialButtons = buttons;
  }

  private initPolicies() : void
  {
    // NOTE: Password
    let defaultPwdPolicies : any    = null;
    let pwdPolicies        : any    = null;
    let defaultMin         : number = 8;
    let defaultMax         : number = 128;

    // Password policies
    defaultPwdPolicies = {
      range : {
        min : defaultMin,
        max : defaultMax,
      },
      char   : true,
      number : true,
      lower  : true,
      upper  : true
    };

    pwdPolicies = Object.assign(defaultPwdPolicies, this.customPwdPolicies);

    if(pwdPolicies.range.min > pwdPolicies.range.max)
    {
      pwdPolicies.range.min = defaultMin;
      pwdPolicies.range.max = defaultMax;
    }

    this.pwdPolicies = pwdPolicies;

    // NOTE: Username
    if(!this.customUsrPolicy)
      return;

    let validators : any = [];

    switch(this.customUsrPolicy)
    {
      case UserPolicies.EMAIL :
        validators.push(UsrValidator.email);
        break;
      case UserPolicies.PHONE :
        validators.push(UsrValidator.phone);
        break;
      default :
        let regExp : RegExp = null;
        regExp = new RegExp(this.customUsrPolicy);
        validators.push(UsrValidator.custom(regExp));
        break;
    }

    validators.push(Validators.required);
    if(this.loginBySteps)
      this.usrFormGroup.controls.username.setValidators(validators);
    else
      this.formGroup.controls.username.setValidators(validators);
  }

  private initLabels() : void
  {
    let defaultLoginLabels    : any = null;
    let defaultPwdLabels      : any = null;
    let defaultHeaderLabels   : any = null;
    let defaultMfaSetupLabels : any = null;
    let defaultMfaLabels      : any = null;

    let loginLabels           : any = null;
    let pwdLabels             : any = null;
    let headerLabels          : any = null;
    let mfaSetupLabels        : any = null;
    let mfaLabels             : any = null;

    // Login labels
    defaultLoginLabels = {
      usernameLabel       : 'Username',
      passwordLabel       : 'Password',
      forgotPasswordLabel : 'Forgot password',
      signInLabel         : 'Sign in',
      signUpLabel         : 'Sign up',
      nextLabel           : 'Next',
      backLabel           : 'Back',
      googleSignInLabel   : 'Sign in with Google',
      facebookSignInLabel : 'Sign in with Facebook',
      fieldRequiredLabel  : 'This field is required',
      fieldEmailLabel     : 'This value must be an email',
      fieldPhoneLabel     : 'This value must be a phone number',
      fieldCustomLabel    : 'This value must match the custom regex provided'
    };
    // Pass labels
    defaultPwdLabels = {
      verifCodeMessageLabel   : 'Please enter the confirmation code you will receive by email', // TODO: check if it can be send to a phone number
      verifCodeLabel          : 'Verification code',
      newPasswordLabel        : 'New password',
      sendLabel               : 'Send',
      policyPassword1Label    : 'Minimum password length (6 to 128)',
      policyPassword2Label    : 'Require at least one uppercase letter (A to Z)',
      policyPassword3Label    : 'Require at least one lowercase letter (a to z)',
      policyPassword4Label    : 'Require at least one number (0 to 9)',
      policyPassword5Label    : 'Require at least one nonalphanumeric character ! @ # $ % ^ & * ( ) _ + - = [ ] { } | \'',
      fieldRequiredLabel      : 'This field is required',
      fieldNonWhitespaceLabel : 'This value must not contain any spaces'
    };
    // Header labels
    defaultHeaderLabels = {
      mfaCodeLabel               : 'MFA Code',
      lostPasswordLabel          : 'Lost password',
      updatePasswordLabel        : 'Update password',
      updatePasswordMessageLabel : 'Please enter a new password'
    };
    // Mfa setup labels
    defaultMfaSetupLabels = {
      verifCodeLabel      : 'Verification code',
      saveLabel           : 'Save',
      description         : 'Save this secret key for future connection',
      fieldRequiredLabel  : 'This field is required',
      fieldSixDigitsLabel : 'This value must contains six digits'
    };
    // Mfa labels
    defaultMfaLabels = {
      verifCodeLabel      : 'Verification code',
      sendLabel           : 'Send',
      fieldRequiredLabel  : 'This field is required',
      fieldSixDigitsLabel : 'This value must contains six digits'
    };

    loginLabels    = Object.assign(defaultLoginLabels, this.customLoginLabels);
    pwdLabels      = Object.assign(defaultPwdLabels, this.customPwdLabels);
    headerLabels   = Object.assign(defaultHeaderLabels, this.customHeaderLabels);
    mfaSetupLabels = Object.assign(defaultMfaSetupLabels, this.customMfaSetupLabels);
    mfaLabels      = Object.assign(defaultMfaLabels, this.customMfaLabels);

    this.loginLabels    = loginLabels;
    this.pwdLabels      = pwdLabels;
    this.headerLabels   = headerLabels;
    this.mfaSetupLabels = mfaSetupLabels;
    this.mfaLabels      = mfaLabels;
  }

  private initEvent(onlyOne : string = null) : any
  {
    let event    : any    = {};
    let username : string = null;
    let password : string = null;

    if(this.loginBySteps)
    {
      username = this.usrFormGroup.controls.username.value;
      password = this.pwdFormGroup.controls.password.value;
    }
    else
    {
      username = this.formGroup.controls.username.value;
      password = this.formGroup.controls.password.value;
    }

    if(!onlyOne)
    {
      event.username = username;
      event.password = password;
    }
    if(onlyOne && onlyOne === 'usr')
      event.username = username;
    if(onlyOne && onlyOne === 'pwd')
      event.password = password;

    return event;
  }

  private initFormsGroups() : void
  {
    if(!this.loginBySteps)
    {
      this.formGroup = this.builder.group({
        username     : new FormControl({
          value      : null,
          disabled   : false
        },[Validators.required]),
        password     : new FormControl({
          value      : null,
          disabled   : false
        },[Validators.required]),
      });
      return;
    }

    this.usrFormGroup = this.builder.group({
      username     : new FormControl({
        value      : null,
        disabled   : false
      },[Validators.required])
    });

    this.pwdFormGroup = this.builder.group({
      password     : new FormControl({
        value      : null,
        disabled   : false
      },[Validators.required])
    });
  }

}
