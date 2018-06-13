// Angular modules
import { OnInit }          from '@angular/core';
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
import { LoginValidator }  from './login.validator';

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
export class LoginFormComponent implements OnInit, OnDestroy
{
  public    formLayouts    : any;
  public    theme          : string;

  public    loginLabels    : any;
  public    passLabels     : any;
  public    headerLabels   : any;
  public    mfaSetupLabels : any;
  public    mfaLabels      : any;

  public    userPolicy     : string;
  public    passPolicies   : any;

  public    socialButtons  : any;

  // Display forms inside a modal or a tab
  @Input()  customFormLayouts    : any;
  // Display Google button with the supplied theme : light / dark
  @Input()  customTheme          : string = null;

  // Labels of the login form
  @Input()  customLoginLabels    : any;
  // Labels of the password form
  @Input()  customPassLabels     : any;
  // Labels on top of the password form
  @Input()  customHeaderLabels   : any;
  // Labels of the mfa setup form
  @Input()  customMfaSetupLabels : any;
  // Labels of the mfa form
  @Input()  customMfaLabels      : any;

  // Optional policy applied on the username field : email / phone / regex
  // Be careful, you must double all the backslashes used in the supplied regex
  @Input()  customUserPolicy     : string = null;
  // Policies applied on the password field
  @Input()  customPassPolicies   : any;

  // Social buttons displayed on the login form
  @Input()  customSocialButtons  : any;

  // Dislay user icon inside login input on the login form
  @Input()  iconUserOnLoginForm     : boolean = true;
  // Dislay lock icon inside password input on the login form
  @Input()  iconPassOnLoginForm     : boolean = true;

  // Display clear button inside login input on the login form
  @Input()  btnClearUserOnLoginForm : boolean = true;
  // Display show/hide button inside password input on the login form
  @Input()  btnShowPassOnLoginForm  : boolean = true;
  // Display clear button inside code input on the password form
  @Input()  btnClearCodeOnPassForm  : boolean = true;
  // Display show/hide button inside password input on the password form
  @Input()  btnShowPassOnPassForm   : boolean = true;
  // Display clear button inside code input on the mfa form
  @Input()  btnClearCodeOnMfaForm   : boolean = true;

  // Display errors on the login form
  @Input()  errOnLoginForm          : boolean = true;
  // Display errors on the password form
  @Input()  errOnPassForm           : boolean = true;
  // Display errors on the mfa form
  @Input()  errOnMfaForm            : boolean = true;

  // Event object containing login and password properties
  @Output() login         : EventEmitter<any>    = new EventEmitter();
  // Event object containing login, password and social properties
  @Output() loginSocial   : EventEmitter<any>    = new EventEmitter();
  // Event object containing login and password properties
  @Output() forgottenPass : EventEmitter<any>    = new EventEmitter();
  // Event object containing password and code properties
  @Output() sendResetPass : EventEmitter<any>    = new EventEmitter();
  // Event object containing password property
  @Output() sendFirstPass : EventEmitter<string> = new EventEmitter();
  // Event object containing code property
  @Output() saveMfaKey    : EventEmitter<string> = new EventEmitter();
  // Event object containing code property
  @Output() sendMfaCode   : EventEmitter<string> = new EventEmitter();

  // NOTE: Form
  public    formGroup     : FormGroup;
  public    showPassword  : boolean = false;
  public    formType      : string;
  public    userPolicies = UserPolicies;

  // NOTE: Password
  public    isFirst       : boolean = false;

  // NOTE: MFA
  public    code          : string  = null;
  public    qrCode        : string  = null;

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
    // Login form
    this.initFormsGroups();
    // Social icons
    // TODO: Fix Angular 6 Library assets : https://github.com/angular/angular-cli/issues/11071
    iconRegistry.addSvgIcon('google',   sanitizer.bypassSecurityTrustResourceUrl('../assets/img/google.svg'));
    iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('../assets/img/facebook.svg'));
  }

  public ngOnInit() : void
  {
    // Inputs
    this.initFormLayouts();
    this.initTheme();
    this.initLabels();
    this.initPolicies();
    this.initSocialButtons();
  }

  public ngOnDestroy() : void
  {
    if(this.modalFirstSub)
      this.modalFirstSub.unsubscribe();
    if(this.modalLostSub)
      this.modalLostSub.unsubscribe();
    if(this.modalSaveMfaKeySub)
      this.modalSaveMfaKeySub.unsubscribe();
    if(this.modalSendMfaCode)
      this.modalSendMfaCodeSub.unsubscribe();
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Event -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  /** Emit `$event` object containing login and password properties.
  *
  * @example
  * var login    : string = $event.login;
  * var password : string = $event.login;
  */
  public onClickLogin() : void
  {
    let event : any = {};
    event = this.initEvent();
    this.login.emit(event);
  }

  /** Emit `$event` object containing login, password and social properties.
  *
  * @param social Name of the social provider
  * @example
  * var login    : string = $event.login;
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

  /** Emit `$event` object containing login and password properties.
  *
  * @example
  * var login    : string = $event.login;
  * var password : string = $event.password;
  */
  public forgottenPassword() : void
  {
    let event : any = {};
    event = this.initEvent();
    this.forgottenPass.emit(event);
  }

  /** Show password form either to initialize first password or to reset forgotten password.
  *
  * @param isFirst Initialize first password or reset forgotten password
  */
  public showPassForm(isFirst : boolean) : void
  {
    this.isFirst  = isFirst;
    this.formType = Forms.PASSWORD;
    this.showLayout(this.formLayouts.password);
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

  /** Hide password form */
  public hidePassForm() : void
  {
    this.closeLayout(this.formLayouts.password);
  }

  /** Hide MFA setup form */
  public hideMfaSetupForm() : void
  {
    this.closeLayout(this.formLayouts.mfaSetup);
  }

  /** Hide MFA form */
  public hideMfaForm() : void
  {
    this.closeLayout(this.formLayouts.mfa);
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
    this.sendFirstPass.emit($event);
  }

  /** Emit `$event` object containing password and code properties.
  *
  * @example
  * var newPassword      : string = $event.password;
  * var verificationCode : string = $event.code;
  */
  public tabLostPass($event : any) : void
  {
    this.sendResetPass.emit($event);
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
      this.sendFirstPass.emit(event);
    });
  }

  /** Emit `$event` object containing password and code properties.
  *
  * @example
  * var newPassword      : string = $event.password;
  * var verificationCode : string = $event.code;
  */
  public modalLostPass(dialogRef : any) : void
  {
    this.modalLostSub = dialogRef.componentInstance.relayLostPass.subscribe((event) =>
    {
      this.sendResetPass.emit(event);
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
      formType               : this.formType,
      headerLabels           : this.headerLabels,
      closeEvent             : this.closeModalEvent,
      // Password form
      isFirst                : this.isFirst,
      passLabels             : this.passLabels,
      passPolicies           : this.passPolicies,
      errOnPassForm          : this.errOnPassForm,
      btnShowPassOnPassForm  : this.btnShowPassOnPassForm,
      btnClearCodeOnPassForm : this.btnClearCodeOnPassForm,
      // Mfa form
      code                   : this.code,
      qrCode                 : this.qrCode,
      mfaLabels              : this.mfaLabels,
      mfaSetupLabels         : this.mfaSetupLabels,
      errOnMfaForm           : this.errOnMfaForm,
      btnClearCodeOnMfaForm  : this.btnClearCodeOnMfaForm
    };

    let dialogRef = this.dialog.open(ModalWrapperComponent, { data : params });

    if(this.formType === Forms.PASSWORD)
    {
      this.modalFirstLog(dialogRef);
      this.modalLostPass(dialogRef);
    }

    if(this.formType === Forms.MFA_SETUP)
      this.modalSaveMfaKey(dialogRef);

    if(this.formType === Forms.MFA)
      this.modalSendMfaCode(dialogRef);

    dialogRef.afterClosed().subscribe(result =>
    {
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
        // TODO:
        break;
      default :
        this.openTab();
        break;
    }
  }

  private closeLayout(formLayout : string) : void
  {
    switch(formLayout)
    {
      case Layouts.TAB    :
        this.closeTab();
        break;
      case Layouts.MODAL  :
        this.closeModal();
        break;
      case Layouts.INLINE :
        // TODO:
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
      password : Layouts.TAB,
      mfaSetup : Layouts.TAB,
      mfa      : Layouts.TAB,
    };

    formLayouts = Object.assign(defaultFormLayouts, this.customFormLayouts);
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
    let defaultPassPolicies : any    = null;
    let passPolicies        : any    = null;
    let defaultMin          : number = 8;
    let defaultMax          : number = 128;

    // Password policies
    defaultPassPolicies = {
      range : {
        min : defaultMin,
        max : defaultMax,
      },
      char   : true,
      number : true,
      lower  : true,
      upper  : true
    };

    passPolicies = Object.assign(defaultPassPolicies, this.customPassPolicies);

    if(passPolicies.range.min > passPolicies.range.max)
    {
      passPolicies.range.min = defaultMin;
      passPolicies.range.max = defaultMax;
    }

    this.passPolicies = passPolicies;

    // NOTE: Username
    if(!this.customUserPolicy)
      return;

    let validators : any = [];

    switch(this.customUserPolicy)
    {
      case UserPolicies.EMAIL :
        validators.push(LoginValidator.email);
        break;
      case UserPolicies.PHONE :
        validators.push(LoginValidator.phone);
        break;
      default :
        let regExp : RegExp = null;
        regExp = new RegExp(this.customUserPolicy);
        validators.push(LoginValidator.custom(regExp));
        break;
    }

    validators.push(Validators.required);
    this.formGroup.controls.login.setValidators(validators);
  }

  private initLabels() : void
  {
    let defaultLoginLabels    : any = null;
    let defaultPassLabels     : any = null;
    let defaultHeaderLabels   : any = null;
    let defaultMfaSetupLabels : any = null;
    let defaultMfaLabels      : any = null;

    let loginLabels           : any = null;
    let passLabels            : any = null;
    let headerLabels          : any = null;
    let mfaSetupLabels        : any = null;
    let mfaLabels             : any = null;

    // Login labels
    defaultLoginLabels = {
      loginLabel                 : 'Login',
      passwordLabel              : 'Password',
      forgottenPasswordLabel     : 'Forgotten password',
      signInLabel                : 'Sign in',
      googleSignInLabel          : 'Sign in with Google',
      facebookSignInLabel        : 'Sign in with Facebook',
      fieldRequiredLabel         : 'This field is required',
      fieldEmailLabel            : 'This value must be an email',
      fieldPhoneLabel            : 'This value must be a phone number',
      fieldCustomLabel           : 'This value must match the custom regex provided'
    };
    // Pass labels
    defaultPassLabels = {
      verifCodeMessageLabel      : 'Please enter the confirmation code you will receive by email', // TODO: check if it can be send to a phone number
      verifCodeLabel             : 'Verification code',
      newPasswordLabel           : 'New password',
      sendLabel                  : 'Send',
      policyPassword1Label       : 'Minimum password length (6 to 128)',
      policyPassword2Label       : 'Require at least one uppercase letter (A to Z)',
      policyPassword3Label       : 'Require at least one lowercase letter (a to z)',
      policyPassword4Label       : 'Require at least one number (0 to 9)',
      policyPassword5Label       : 'Require at least one nonalphanumeric character ! @ # $ % ^ & * ( ) _ + - = [ ] { } | \'',
      fieldRequiredLabel         : 'This field is required',
      fieldNonWhitespaceLabel    : 'This value must not contain any spaces'
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
      verifCodeLabel     : 'Verification code',
      saveLabel          : 'Save',
      description        : 'Save this secret key for future connection',
      fieldRequiredLabel : 'This field is required'
    };
    // Mfa labels
    defaultMfaLabels = {
      verifCodeLabel     : 'Verification code',
      sendLabel          : 'Send',
      fieldRequiredLabel : 'This field is required'
    };

    loginLabels    = Object.assign(defaultLoginLabels, this.customLoginLabels);
    passLabels     = Object.assign(defaultPassLabels, this.customPassLabels);
    headerLabels   = Object.assign(defaultHeaderLabels, this.customHeaderLabels);
    mfaSetupLabels = Object.assign(defaultMfaSetupLabels, this.customMfaSetupLabels);
    mfaLabels      = Object.assign(defaultMfaLabels, this.customMfaLabels);

    this.loginLabels    = loginLabels;
    this.passLabels     = passLabels;
    this.headerLabels   = headerLabels;
    this.mfaSetupLabels = mfaSetupLabels;
    this.mfaLabels      = mfaLabels;
  }

  private initEvent() : any
  {
    let event : any = {};

    let login    : string = this.formGroup.controls.login.value;
    let password : string = this.formGroup.controls.password.value;

    event.login    = login;
    event.password = password;

    return event;
  }

  private initFormsGroups() : void
  {
    this.formGroup = this.builder.group({
      login        : new FormControl({
        value      : null,
        disabled   : false
      },[Validators.required]),
      password     : new FormControl({
        value      : null,
        disabled   : false
      },[Validators.required]),
    });
  }

}
