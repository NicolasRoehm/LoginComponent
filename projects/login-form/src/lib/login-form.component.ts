// Angular modules
import { OnInit }          from '@angular/core';
import { AfterViewInit }   from '@angular/core';
import { OnChanges }       from '@angular/core';
import { ViewChild }       from '@angular/core';
import { SimpleChanges }   from '@angular/core';
import { OnDestroy }       from '@angular/core';
import { Input }           from '@angular/core';
import { Output }          from '@angular/core';
import { Component }       from '@angular/core';
import { EventEmitter }    from '@angular/core';
import { MatDialog }       from '@angular/material';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer }    from '@angular/platform-browser';

// External modules
import { Subscription }    from 'rxjs/Subscription';

// Enums
import { LayoutIds }       from './enums/layout-ids.enum';
import { FormIds }         from './enums/form-ids.enum';
import { FieldIds }        from './enums/field-ids.enum';
import { FieldTypes }      from './enums/field-types.enum';
import { Themes }          from './enums/themes.enum';
import { UserPolicies }    from './enums/user-policies.enum';
import { DynamicButtons }  from './enums/dynamic-buttons.enum';

// Components
import { ModalWrapperComponent }   from './layouts/modal-wrapper/modal-wrapper.component';
import { DynamicBuilderComponent } from './dynamic-builder/dynamic-builder.component';

@Component({
  selector    : 'cal-login-form',
  templateUrl : './login-form.component.html',
  styleUrls   : ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  public    layouts        : any;
  public    theme          : string;

  public    pwdPolicies    : any;

  public    icons          : any;
  public    buttons        : any;
  public    actions        : any;
  public    errors         : any;
  public    labels         : any;

  // Display login form inside a container
  @Input()  fixedWidth    : boolean = false;
  // Display login form like Google & Microsoft (step by step)
  @Input()  googleStyle   : boolean = false;
  // Display Google button with the supplied theme : light / dark
  @Input()  googleTheme   : string  = null;
  // Display forms inside a layout : tab (by default) / modal / inline
  // The inline layout is only available for the MFA form
  @Input()  customLayouts : any;

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
  @Input()  customActions : any;

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

  // NOTE: Forms
  public    formId         : string  = null;
  public    formProperties : any     = {};

  @ViewChild('defaultLoginForm') defaultLoginForm : DynamicBuilderComponent;
  public    loginParams    : any     = {};
  public    loginFields    : any[]   = [];

  @ViewChild('usrForm')   usrForm   : DynamicBuilderComponent;
  public    usrParams      : any     = {};
  public    usrFields      : any[]   = [];

  @ViewChild('pwdForm')   pwdForm   : DynamicBuilderComponent;
  public    pwdParams      : any     = {};
  public    pwdFields      : any[]   = [];

  public    mfaParams      : any     = {};
  public    mfaFields      : any[]   = [];

  // NOTE: Password
  public    username      : string  = null;
  public    isFirst       : boolean = false;

  // NOTE: MFA
  public    code          : string  = null;
  public    qrCode        : string  = null;

  // NOTE: Steps
  public    userInfo      : string  = null;
  public    userImage     : string  = null;

  // NOTE: Wrapper
  public    selectedTab     : number = 0;
  public    closeModalEvent : EventEmitter<boolean> = new EventEmitter();

  // NOTE: Enums
  public    userPolicies = UserPolicies;
  public    formIds      = FormIds;
  public    layoutIds    = LayoutIds;

  // NOTE: Modal events
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
    public  iconRegistry : MatIconRegistry
  )
  {
    // Social icons
    // TODO: Fix Angular 6 Library assets : https://github.com/angular/angular-cli/issues/11071
    iconRegistry.addSvgIcon('google',   sanitizer.bypassSecurityTrustResourceUrl('../assets/img/google.svg'));
    iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('../assets/img/facebook.svg'));
  }

  public ngOnInit() : void
  {
    // Style (container, step, theme & layout)
    this.initLayouts();
    this.initTheme();

    this.initPolicies();
    this.initIcons();
    this.initButtons();
    this.initActions();
    this.initErrors();
    this.initLabels();

    // Login form
    this.initFormProperties();
    this.initLoginParameters();
    this.initLoginForm();

    // Mfa form
    this.initMfaParameters();
    this.initMfaForm();
  }

  public ngAfterViewInit() : void
  {
    this.initialized.emit();
  }

  public ngOnChanges(changes : SimpleChanges) : void
  {
    if(changes.customLayouts)
    {
      this.initLayouts();
      this.initFormProperties();
    }

    if(changes.googleTheme)
      this.initTheme();

    if(changes.customPwdPolicies || changes.customUsrPolicy)
      this.initPolicies();
    if(changes.customIcons)
      this.initIcons();
    if(changes.customButtons)
      this.initButtons();
    if(changes.customActions)
      this.initActions();
    if(changes.customErrors)
    {
      this.initErrors();
      this.initLoginParameters();
      this.initMfaParameters();
    }

    if(changes.customLabels)
    {
      this.initLabels();
      this.initFormProperties();
    }

    if(changes.googleStyle)
    {
      this.initLoginParameters();
      this.initLoginForm();
    }
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
  public onClickLogin($event) : void
  {
    this.login.emit($event);
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
    // this.normalizeEvent(event);
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
    event = this.getEventResponse(FieldIds.USR);
    this.forgotPwd.emit(event);
  }

  // NOTE: From user to component --------------------------------------------------------------

  /** Show password form either to initialize first password or to reset forgot password.
  *
  * @param isFirst Initialize first password or reset forgot password
  */
  public showPwdForm(isFirst : boolean) : void
  {
    this.isFirst = isFirst;
    this.formId  = FormIds.PWD;
    this.initFormProperties(); // NOTE: Refresh formId
    this.showLayout(this.layouts.pwd);
  }

  /** Show MFA setup form to initialize first TOTP (Time-based One-time Password).
  *
  * @param code   
  * @param qrCode 
  */
  public showMfaSetupForm(code : string, qrCode : string) : void
  {
    this.code   = code;
    this.qrCode = qrCode;
    this.formId = FormIds.MFA_SETUP;
    this.initFormProperties(); // NOTE: Refresh formId
    this.showLayout(this.layouts.mfaSetup);
  }

  /** Show MFA form to get verification code. */
  public showMfaForm() : void
  {
    this.formId = FormIds.MFA;
    this.initFormProperties(); // NOTE: Refresh formId
    this.showLayout(this.layouts.mfa);
  }

  /** Hide password form. */
  public hidePwdForm(updatePwdField ?: string) : void
  {
    let obj : any = {};
    obj.password = updatePwdField;
    if(updatePwdField)
      this.setForm(obj);
    this.closeLayout(this.layouts.pwd);
  }

  /** Hide MFA setup form. */
  public hideMfaSetupForm() : void
  {
    this.closeLayout(this.layouts.mfaSetup);
  }

  /** Hide MFA form. */
  public hideMfaForm() : void
  {
    this.closeLayout(this.layouts.mfa);
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

  /** Content management */

  public getForm() : any
  {
    return this.getEventResponse();
  }

  public setForm(obj : any) : void
  {
    let usrField : any = {};
    let pwdField : any = {};

    if(!this.googleStyle)
    {
      usrField = this.loginFields.find((field) => { return field.name === FieldIds.USR; });
      pwdField = this.loginFields.find((field) => { return field.name === FieldIds.PWD; });
    }
    else
    {
      usrField = this.usrFields.find((field) => { return field.name === FieldIds.USR; });
      pwdField = this.pwdFields.find((field) => { return field.name === FieldIds.PWD; });
    }

    if(obj.username)
      usrField.value = obj.username;
    if(obj.password)
      pwdField.value = obj.password;
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Steps events ------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  public onClickNextStep(currentStep : number, $event ?: any) : void
  {
    switch(currentStep)
    {
      case 0 :
        this.selectedTab = 1;
        break;
      case 1 : // Username
        this.stepUsr.emit($event);
        break;
      case 2 : // Password
        let pwdEvent : any = null;
        pwdEvent = this.getEventResponse();
        this.stepPwd.emit(pwdEvent);
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
  public tabFirstPwd($event : any) : void
  {
    // Add username
    let usrEvent : any = {};
    usrEvent = this.getEventResponse(FieldIds.USR);
    $event.username = usrEvent.username;
    this.sendFirstPwd.emit($event);
  }

  /** Emit `$event` object containing password and code properties.
  *
  * @example
  * var username         : string = $event.username;
  * var newPassword      : string = $event.password;
  * var verificationCode : string = $event.code;
  */
  public tabLostPwd($event : any) : void
  {
    // Add username
    let usrEvent : any = {};
    usrEvent = this.getEventResponse(FieldIds.USR);
    $event.username = usrEvent.username;
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
  * var username    : string = $event.username;
  * var newPassword : string = $event.password;
  */
  public modalFirstPwd(dialogRef : any) : void
  {
    this.modalFirstSub = dialogRef.componentInstance.relayFirstPwd.subscribe((event) =>
    {
      let usrEvent : any = {};
      usrEvent = this.getEventResponse(FieldIds.USR);
      event.username = usrEvent.username;
      // this.normalizeEvent(event);
      this.sendFirstPwd.emit(event);
    });
  }

  /** Emit `$event` object containing password and code properties.
  *
  * @example
  * var username         : string = $event.username;
  * var newPassword      : string = $event.password;
  * var verificationCode : string = $event.code;
  */
  public modalLostPwd(dialogRef : any) : void
  {
    this.modalLostSub = dialogRef.componentInstance.relayLostPwd.subscribe((event) =>
    {
      let usrEvent : any = {};
      usrEvent = this.getEventResponse(FieldIds.USR);
      event.username = usrEvent.username;
      // this.normalizeEvent(event);
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
      formId      : this.formId,
      labels      : this.labels,
      closeEvent  : this.closeModalEvent,
      errors      : this.errors,
      actions     : this.actions,
      // Password form
      isFirst     : this.isFirst,
      pwdPolicies : this.pwdPolicies,
      // Mfa form
      code        : this.code,
      qrCode      : this.qrCode
    };

    let dialogRef = this.dialog.open(ModalWrapperComponent, { data : params });

    if(this.formId === FormIds.PWD)
    {
      this.modalFirstPwd(dialogRef);
      this.modalLostPwd(dialogRef);
    }

    if(this.formId === FormIds.MFA_SETUP)
      this.modalSaveMfaKey(dialogRef);

    if(this.formId === FormIds.MFA)
      this.modalSendMfaCode(dialogRef);

    dialogRef.afterClosed().subscribe(result =>
    {
      this.formId = null;
      this.initFormProperties(); // NOTE: Refresh formId
      if(result)
      {
        let pwdField : any = {};
        pwdField           = this.loginFields.find((field) => { return field.name === FieldIds.PWD; });
        pwdField.value     = result; // Set password
      }
    });
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Private -----------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  private showLayout(formLayout : string) : void
  {
    switch(formLayout)
    {
      case LayoutIds.TAB    :
        this.openTab();
        break;
      case LayoutIds.MODAL  :
        this.openModal();
        break;
      case LayoutIds.INLINE :
        for(let field of this.loginFields)
          field.disabled = true;
        this.loginFields = Object.assign([], this.loginFields);
        break;
      default :
        this.openTab();
        break;
    }
  }

  private closeLayout(layoutId : string) : void
  {
    this.formId = null;
    this.initFormProperties(); // NOTE: Refresh formId

    switch(layoutId)
    {
      case LayoutIds.TAB    :
        this.closeTab();
        break;
      case LayoutIds.MODAL  :
        this.closeModal();
        break;
      case LayoutIds.INLINE :
        for(let field of this.loginFields)
          field.disabled = false;
        this.loginFields = Object.assign([], this.loginFields);
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
    let event      : any = {};
    let usrValue   : any = {};
    let pwdValue   : any = {};

    if(!this.googleStyle)
    {
      let loginFormValues : any = {};
      loginFormValues = this.defaultLoginForm.form.value;
      usrValue        = loginFormValues.username;
      pwdValue        = loginFormValues.password;
    }
    else
    {
      let usrFormValue : any = {};
      let pwdFormValue : any = {};
      usrFormValue = this.usrForm.form.value;
      pwdFormValue = this.pwdForm.form.value;
      usrValue     = usrFormValue.username;
      pwdValue     = pwdFormValue.password;
    }

    if(!onlyOne)
    {
      event.username = usrValue;
      event.password = pwdValue;
    }
    if(onlyOne && onlyOne === FieldIds.USR)
      event.username = usrValue;
    if(onlyOne && onlyOne === FieldIds.PWD)
      event.password = pwdValue;

    return event;
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Init --------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  private initLayouts() : void
  {
    let defaultLayouts : any = null;
    let layouts        : any = null;

    // Form layouts
    defaultLayouts = {
      pwd      : LayoutIds.TAB,
      mfaSetup : LayoutIds.TAB,
      mfa      : LayoutIds.TAB,
    };

    layouts = Object.assign(defaultLayouts, this.customLayouts);

    // Corrections
    if(layouts.pwd === LayoutIds.INLINE)
      layouts.pwd = LayoutIds.TAB;
    if(layouts.mfaSetup === LayoutIds.INLINE)
      layouts.mfaSetup = LayoutIds.TAB;
    if(this.googleStyle && layouts.mfa === LayoutIds.INLINE)
      layouts.mfa = LayoutIds.TAB;

    this.layouts = layouts;
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
      iconUsr       : 'person',
      iconPwd       : 'lock',
      iconVerifCode : 'fingerprint'
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

  private initActions() : void
  {
    let defaultActions : any = null;
    let actions        : any = null;

    // Actions
    defaultActions = {
      clearUsr  : true,
      clearCode : true,
      showPwd   : true
    };

    actions = Object.assign(defaultActions, this.customActions);
    this.actions = actions;
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
      username         : 'Username',
      password         : 'Password',
      verificationCode : 'Verification code',
      newPassword      : 'New password'
    };
    defaultLabels.button = {
      signIn         : 'Sign in',
      signUp         : 'Sign up',
      submit         : 'Submit',
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

  // -------------------------------------------------------------------------------------------
  // NOTE: Dynamic forms -----------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  private initFormProperties() : void
  {
    // NOTE: Form properties
    this.formProperties.layouts = this.layouts;
    this.formProperties.buttons = this.buttons;
    this.formProperties.labels  = this.labels;
    this.formProperties.formId  = this.formId;
  }

  private initMfaParameters() : void
  {
    // NOTE: Mfa parameters
    this.mfaParams.errors       = this.errors.mfa;
    this.mfaParams.autocomplete = false;
  }

  private initMfaForm() : void
  {
    // NOTE: Get field
    let verificationCodeField : any = null;
    verificationCodeField = this.initVerificationCodeField();

    this.mfaFields = [];
    this.mfaFields.push(verificationCodeField);
  }

  private initLoginParameters() : void
  {
    let params : any    = {};
    params.errors       = this.errors.login;
    params.autocomplete = true;

    // NOTE: Login parameters
    if(!this.googleStyle)
    {
      this.loginParams = params;
      this.loginParams.dynamicButtons = DynamicButtons.LOGIN;
      return;
    }

    this.usrParams = params;
    this.usrParams.dynamicButtons = DynamicButtons.USR_STEP;

    this.pwdParams = params;
    this.pwdParams.dynamicButtons = DynamicButtons.PWD_STEP;
  }

  private initLoginForm() : void
  {
    // NOTE: Get fields
    let usernameField : any = null;
    let passwordField : any = null;
    usernameField = this.initUsernameField();
    passwordField = this.initPasswordField();

    if(!this.googleStyle)
    {
      // NOTE: Login fields
      this.loginFields = [];
      this.loginFields.push(usernameField);
      this.loginFields.push(passwordField);
      return;
    }

    this.usrFields = [];
    this.usrFields.push(usernameField);

    this.pwdFields = [];
    this.pwdFields.push(passwordField);
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Fields ------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  private initUsernameField() : any
  {
    let field : any = {};
    field.type      = FieldTypes.TEXT;
    field.name      = FieldIds.USR;
    field.id        = FieldIds.USR;
    field.policies  = this.customUsrPolicy;
    field.action    = this.actions.clearUsr;
    field.icon      = this.icons.iconUsr;
    field.disabled  = false;
    return field;
  }

  private initPasswordField() : any
  {
    let field : any = {};
    field.type      = FieldTypes.PASSWORD;
    field.name      = FieldIds.PWD;
    field.id        = FieldIds.PWD;
    field.policies  = this.pwdPolicies;
    field.action    = this.actions.showPwd;
    field.icon      = this.icons.iconPwd;
    field.disabled  = false;
    return field;
  }

  private initVerificationCodeField() : any
  {
    let field : any = {};
    field.type      = FieldTypes.TEXT;
    field.name      = FieldIds.VERIF_CODE;
    field.id        = FieldIds.VERIF_CODE;
    // field.policies  = this.pwdPolicies;
    field.action    = this.actions.clearCode;
    field.icon      = this.icons.iconVerifCode;
    field.disabled  = false;
    return field;
  }

}
