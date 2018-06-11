// Angular modules
import { OnInit }          from '@angular/core';
import { OnDestroy }       from '@angular/core';
import { Input }           from '@angular/core';
import { Output }          from '@angular/core';
import { Component }       from '@angular/core';
import { EventEmitter }    from '@angular/core';
import { MatDialogRef }    from '@angular/material';
import { MatDialog }       from '@angular/material';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer }    from '@angular/platform-browser';
import { FormControl }     from '@angular/forms';
import { FormGroup }       from '@angular/forms';
import { FormBuilder }     from '@angular/forms';
import { Validators }      from '@angular/forms';

// External modules
import { Subscription }    from 'rxjs/Subscription';

// Enums
import { Layouts }         from './enums/layouts.enum';
import { Forms }           from './enums/forms.enum';

// Components
import { ModalWrapperComponent } from './layouts/modal-wrapper/modal-wrapper.component';
import { TabWrapperComponent }   from './layouts/tab-wrapper/tab-wrapper.component';
import { PassFormComponent }     from './forms/pass-form/pass-form.component';

@Component({
  selector    : 'cal-login-form',
  templateUrl : './login-form.component.html',
  styleUrls   : ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy
{
  public    formGroup      : FormGroup;
  public    formType       : string;

  // NOTE: Useful for template
  public    showPassword   : boolean = false;
  public    layouts = Layouts;

  public    formLayouts    : any;

  public    loginLabels    : any;
  public    passLabels     : any;
  public    headerLabels   : any;
  public    mfaSetupLabels : any;
  public    mfaLabels      : any;

  public    passPolicies   : any;
  public    socialButtons  : any;

  // Display password form inside modal or tab
  @Input()  customFormLayouts    : any;
  // Display login and password forms with the provided theme : light / dark
  @Input()  theme                : string  = 'light'; // TODO:

  // Labels of the login form
  @Input()  customLoginLabels    : any;
  // Labels of the password form
  @Input()  customPassLabels     : any;
  // Labels on top of the password form
  @Input()  customHeaderLabels   : any;
  // Labels of the mfa setup form
  @Input()  customMfaSetupLabels : any;
  // Labels of the mfa form
  @Input()  customMfaLabels       : any;

  // Policies applied on the password field
  @Input()  customPolicies       : any;
  // Social buttons displayed on the login form
  @Input()  customSocialButtons  : any;

  // Display user icon inside login input
  @Input()  inputLoginWithIcon   : boolean = true;
  // Display clear button on login input
  @Input()  inputLoginWithButton : boolean = true;
  // Display lock icon inside password input
  @Input()  inputPassWithIcon    : boolean = true;
  // Display show/hide button on password input
  @Input()  inputPassWithButton  : boolean = true;

  // Event object containing login and password properties
  @Output() login         : EventEmitter<any>    = new EventEmitter();
  // Event object containing login, password and social properties
  @Output() loginSocial   : EventEmitter<any>    = new EventEmitter();
  // Event object containing login and password properties
  @Output() forgottenPass : EventEmitter<any>    = new EventEmitter();
  // Event object containing password property
  @Output() sendFirstPass : EventEmitter<string> = new EventEmitter();
  // Event object containing password and code properties
  @Output() sendResetPass : EventEmitter<string> = new EventEmitter();
  // Event object containing code property
  @Output() saveMfaKey    : EventEmitter<string> = new EventEmitter();
  // Event object containing code property
  @Output() sendMfaCode   : EventEmitter<string> = new EventEmitter();

  public    isFirst         : boolean = false;
  public    code : string = null;
  public    qrCode : string = null;
  public    selectedTab     : number  = 0;
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
    this.initFormsGroups();
    this.prepareFormLayouts();
    this.prepareLabels();
    this.preparePolicies();
    this.prepareSocialButtons();

    iconRegistry.addSvgIcon('google',   sanitizer.bypassSecurityTrustResourceUrl('../assets/img/google.svg'));
    iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('../assets/img/facebook.svg'));
  }

  public ngOnInit() : void
  {
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
    event = this.prepareEvent();
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
    event = this.prepareEvent();
    event.social = social;
    this.loginSocial.emit(event);
  }

  public onClickSaveMfa(code : string) : void
  { // TODO:
    console.log('onClickSaveMfa');
    console.log(code);
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
    event = this.prepareEvent();
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
      isFirst        : this.isFirst,
      closeEvent     : this.closeModalEvent,
      headerLabels   : this.headerLabels,
      passLabels     : this.passLabels,
      passPolicies   : this.passPolicies,
      mfaLabels      : this.mfaLabels,
      mfaSetupLabels : this.mfaSetupLabels,
      formType       : this.formType,
      code           : this.code,
      qrCode         : this.qrCode
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

  private prepareFormLayouts() : any
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

  private prepareSocialButtons() : any
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

  private preparePolicies() : any
  {
    let defaultPolicies : any    = null;
    let policies        : any    = null;
    let defaultMin      : number = 8;
    let defaultMax      : number = 128;

    // Password policies
    defaultPolicies = {
      range : {
        min : defaultMin,
        max : defaultMax,
      },
      char   : true,
      number : true,
      lower  : true,
      upper  : true
    };

    policies = Object.assign(defaultPolicies, this.customPolicies);

    if(policies.range.min > policies.range.max)
    {
      policies.range.min = defaultMin;
      policies.range.max = defaultMax;
    }

    this.passPolicies = policies;
  }

  private prepareLabels() : any
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
      fieldEmailLabel            : 'This value must be an email'
    };
    // Pass labels
    defaultPassLabels = {
      verifCodeMessageLabel      : 'Please enter the confirmation code you will receive by email',
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
      updatePasswordMessageLabel : 'Please enter a new password',
    };
    // Mfa setup labels
    defaultMfaSetupLabels = {
      verifCodeLabel : 'Verification code',
      saveLabel      : 'Save',
      description    : 'Save this secret key for future connection'
    };
    // Mfa labels
    defaultMfaLabels = {
      verifCodeLabel : 'Verification code',
      sendLabel      : 'Send'
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

  private prepareEvent() : any
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
