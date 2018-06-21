// Angular modules
import { OnInit }          from '@angular/core';
import { AfterViewInit }   from '@angular/core';
import { OnChanges }       from '@angular/core';
import { SimpleChanges }   from '@angular/core';
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
export class LoginFormComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  public    formLayouts    : any;
  public    theme          : string;

  public    usrPolicy      : string;
  public    pwdPolicies    : any;

  public    icons          : any;
  public    buttons        : any;
  public    inputs         : any;
  public    errors         : any;
  public    labels         : any;

  // Display login form inside a container
  @Input()  fixedWidth        : boolean = false;
  // Display login form like Google & Microsoft (step by step)
  @Input()  googleStyle       : boolean = false;
  // Display Google button with the supplied theme : light / dark
  @Input()  googleTheme       : string  = null;
  // Display forms inside a layout : tab (by default) / modal / inline
  // The inline layout is only available for the MFA form
  @Input()  customFormLayouts : any;

  // Optional policy applied on the username input : email / phone / regex
  // Be careful, you must double all the backslashes used in the supplied regex
  @Input()  customUsrPolicy   : string = null;
  // Policies applied on the password input
  @Input()  customPwdPolicies : any;

  // Dislay icon inside inputs on the login form
  @Input()  customIcons   : any;

  // Display buttons with events
  @Input()  customButtons : any;

  // Display clear & show/hide buttons inside inputs
  @Input()  customInputs  : any;

  // Display error messages
  @Input()  customErrors  : any;

  // Labels
  @Input()  customLabels  : any;

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
  // Event object containing username and password property
  @Output() sendFirstPwd  : EventEmitter<any> = new EventEmitter();
  // Event object containing code property
  @Output() saveMfaKey    : EventEmitter<any> = new EventEmitter();
  // Event object containing code property
  @Output() sendMfaCode   : EventEmitter<any> = new EventEmitter();
  // Event object containing username property
  @Output() stepUsr       : EventEmitter<any> = new EventEmitter();
  // Event object containing username and password property
  @Output() stepPwd       : EventEmitter<any> = new EventEmitter();

  // NOTE: Form
  public    formGroup     : FormGroup;
  public    showPassword  : boolean = false;
  public    formType      : string;
  public    userPolicies = UserPolicies;
  public    forms = Forms;

  // NOTE: Password
  public    username      : string  = null;
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
    this.initFormGroups();
    // Style (container, step, theme & layout)
    this.initFormLayouts();
    this.initTheme();

    this.initPolicies();
    this.initIcons();
    this.initButtons();
    this.initInputs();
    this.initErrors();
    this.initLabels();
  }

  public ngAfterViewInit() : void
  {
    this.initialized.emit();
  }

  public ngOnChanges(changes : SimpleChanges) : void
  {
    if(changes.googleStyle)
      this.initFormGroups();
    if(changes.customFormLayouts)
      this.initFormLayouts();
    if(changes.googleTheme)
      this.initTheme();

    if(changes.customPwdPolicies || changes.customUsrPolicy)
      this.initPolicies();
    if(changes.customIcons)
      this.initIcons();
    if(changes.customButtons)
      this.initButtons();
    if(changes.customInputs)
      this.initInputs();
    if(changes.customErrors)
      this.initErrors();
    if(changes.customLabels)
      this.initLabels();
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
    event = this.getEventResponse();
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
    event = this.getEventResponse();
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
    event = this.getEventResponse('usr');
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
    if(!this.googleStyle)
      this.username = this.formGroup.controls.username.value;
    else
      this.username = this.usrFormGroup.controls.username.value;
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

  /** Show password input (for google-style form). */
  public showPwdStep(userInfo : string = null, userImage : string = null) : void
  {
    if(!this.googleStyle)
      return;
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
        eventUsr = this.getEventResponse('usr');
        this.stepUsr.emit(eventUsr);
        break;
      case 2 : // Password
        let eventPwd : any = null;
        eventPwd = this.getEventResponse();
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
  * var username    : string = $event.username;
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
      labels                : this.labels,
      closeEvent            : this.closeModalEvent,
      errors                : this.errors,
      inputs                : this.inputs,
      // Password form
      username              : this.username,
      isFirst               : this.isFirst,
      pwdPolicies           : this.pwdPolicies,
      // Mfa form
      code                  : this.code,
      qrCode                : this.qrCode
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
    if(this.googleStyle)
      this.selectedTab = 3;
    else
      this.selectedTab = 1;
  }

  private closeTab() : void
  {
    this.selectedTab = 0;
  }

  private getEventResponse(onlyOne : string = null) : any
  {
    let event    : any    = {};
    let username : string = null;
    let password : string = null;

    if(this.googleStyle)
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

  // -------------------------------------------------------------------------------------------
  // NOTE: Init --------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

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
    if(this.googleStyle && formLayouts.mfa === Layouts.INLINE)
      formLayouts.mfa = Layouts.TAB;

    this.formLayouts = formLayouts;
  }

  private initTheme() : void
  {
    let theme : string = null;

    // Theme
    switch(this.googleTheme)
    {
      case Themes.LIGHT :
        theme = this.googleTheme;
        break;
      case Themes.DARK :
        theme = this.googleTheme;
        break;
      default :
        theme = Themes.LIGHT;
        break;
    }

    this.theme = theme;
  }

  private initIcons() : void
  {
    let defaultIcons : any = null;
    let icons        : any = null;

    // Icons
    defaultIcons = {
      iconUsrOnLoginForm : true,
      iconPwdOnLoginForm : true,
    };

    icons = Object.assign(defaultIcons, this.customIcons);
    this.icons = icons;
  }

  private initButtons() : void
  {
    let defaultButons : any = null;
    let buttons       : any = null;

    // Buttons
    defaultButons = {
      forgotPassword : true,
      signUp         : true,
      google         : true,
      facebook       : true
    };

    buttons = Object.assign(defaultButons, this.customButtons);
    this.buttons = buttons;
  }

  private initInputs() : void
  {
    let defaultInputs : any = null;
    let inputs        : any = null;

    // Inputs
    defaultInputs = {
      clearUsrOnLoginForm : true,
      showPwdOnLoginForm  : true,
      showPwdOnPwdForm    : true,
      clearCodeOnPwdForm  : true,
      clearCodeOnMfaForm  : true
    };

    inputs = Object.assign(defaultInputs, this.customInputs);
    this.inputs = inputs;
  }

  private initErrors() : void
  {
    let defaultErrors : any = null;
    let errors        : any = null;

    // Errors
    defaultErrors = {
      login : true,
      pwd   : true,
      mfa   : true
    };

    errors = Object.assign(defaultErrors, this.customErrors);
    this.errors = errors;
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
    if(this.googleStyle)
      this.usrFormGroup.controls.username.setValidators(validators);
    else
      this.formGroup.controls.username.setValidators(validators);
  }

  private initLabels() : void
  {
    let defaultLabels : any = {};
    let labels        : any = {};

    defaultLabels.header = {
      titlePwd         : 'Lost password',
      subtitlePwd      : 'Please enter the confirmation code',
      titlePwdSetup    : 'Password setup',
      subtitlePwdSetup : 'Please enter a new password',
      titleMfa         : 'MFA',
      subtitleMfa      : 'Please enter the confirmation code',
      titleMfaSetup    : 'MFA setup',
      subtitleMfaSetup : 'Save this secret key for future connection'
    };
    defaultLabels.input = {
      username    : 'Username',
      password    : 'Password',
      verifCode   : 'Verification code',
      newPassword : 'New password'
    };
    defaultLabels.button = {
      signIn         : 'Sign in',
      signUp         : 'Sign up',
      next           : 'Next',
      back           : 'Back',
      send           : 'Send',
      save           : 'Save',
      forgotPassword : 'Forgot password',
      googleSignIn   : 'Sign in with Google',
      facebookSignIn : 'Sign in with Facebook'
    };
    defaultLabels.policy = {
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
    };

    labels = Object.assign(defaultLabels, this.customLabels);

    this.labels = labels;
  }

  private initFormGroups() : void
  {
    if(!this.googleStyle)
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
