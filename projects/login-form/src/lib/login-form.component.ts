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

// Components
import { ModalPassComponent }  from './modal-pass/modal-pass.component';
import { InlinePassComponent } from './inline-pass/inline-pass.component';
import { PassFormComponent }   from './pass-form/pass-form.component';

@Component({
  selector    : 'cal-login-form',
  templateUrl : './login-form.component.html',
  styleUrls   : ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy
{
  public    formGroup     : FormGroup;
  public    showPassword  : boolean = false;

  public    loginLabels   : any;
  public    passLabels    : any;
  public    headerLabels  : any;
  public    passPolicies  : any;
  public    socialButtons : any;

  // Labels of the login form
  @Input()  customLoginLabels    : any;
  // Labels of the password form
  @Input()  customPassLabels     : any;
  // Labels on top of the password form
  @Input()  customHeaderLabels   : any;
  // Policies applied on the password field
  @Input()  customPolicies       : any;
  // Social buttons displayed on the login form
  @Input()  customSocialButtons  : any;
  // Dislay user icon inside login input
  @Input()  inputLoginWithIcon   : boolean = true;
  // Display clear button on login input
  @Input()  inputLoginWithButton : boolean = true;
  // Display lock icon inside password input
  @Input()  inputPassWithIcon    : boolean = true;
  // Display show/hide button on password input
  @Input()  inputPassWithButton  : boolean = true;
  // Display password form inside modal or tab
  @Input()  modalTemplate : boolean = true;

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

  public    isFirst         : boolean = false;
  public    selectedTab     : number  = 0;
  public    closeModalEvent : EventEmitter<boolean> = new EventEmitter();

  private   modalFirstSub  : Subscription;
  private   modalLostSub   : Subscription;
  private   inlineFirstSub : Subscription;
  private   inlineLostSub  : Subscription;

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
    if(this.inlineFirstSub)
      this.inlineFirstSub.unsubscribe();
    if(this.inlineLostSub)
      this.inlineLostSub.unsubscribe();
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
    this.isFirst = isFirst;
    if(this.modalTemplate)
      this.openModal();
    else
      this.openInline();
  }

  /** Hide password form */
  public hidePassForm() : void
  {
    if(this.modalTemplate)
      this.closeModal();
    else
      this.closeInline();
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Inline events -----------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  /** Emit `$event` object containing password property.
  *
  * @example
  * var newPassword : string = $event.password;
  */
  public inlineFirstLog($event : any) : void
  {
    this.sendFirstPass.emit($event);
  }

  /** Emit `$event` object containing password and code properties.
  *
  * @example
  * var newPassword      : string = $event.password;
  * var verificationCode : string = $event.code;
  */
  public inlineLostPass($event : any) : void
  {
    this.sendFirstPass.emit($event);
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
    this.modalLostSub  = dialogRef.componentInstance.relayLostPass.subscribe((event) =>
    {
      this.sendResetPass.emit(event);
    });
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Inline ------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  public onClickCloseInline($event : any) : void
  {
    this.closeInline();
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Modal -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  private openModal() : void
  {
    let params : any = {
      isFirst      : this.isFirst,
      closeEvent   : this.closeModalEvent,
      headerLabels : this.headerLabels,
      passLabels   : this.passLabels,
      passPolicies : this.passPolicies
    };

    let dialogRef = this.dialog.open(ModalPassComponent, { data : params });

    this.modalFirstLog(dialogRef);
    this.modalLostPass(dialogRef);

    dialogRef.afterClosed().subscribe(result =>
    {
      if(result)
        this.formGroup.controls.password.setValue(result); // Set password
    });
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Private -----------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  private closeModal() : void
  {
    this.closeModalEvent.emit();
  }

  private openInline() : void
  {
    this.selectedTab = 1;
  }

  private closeInline() : void
  {
    this.selectedTab = 0;
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
    let defaultLoginLabels  : any = null;
    let defaultPassLabels   : any = null;
    let defaultHeaderLabels : any = null;
    let loginLabels         : any = null;
    let passLabels          : any = null;
    let headerLabels        : any = null;

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
      lostPasswordLabel          : 'Lost password',
      updatePasswordLabel        : 'Update password',
      updatePasswordMessageLabel : 'Please enter a new password',
    };

    loginLabels  = Object.assign(defaultLoginLabels, this.customLoginLabels);
    passLabels   = Object.assign(defaultPassLabels, this.customPassLabels);
    headerLabels = Object.assign(defaultHeaderLabels, this.customHeaderLabels);

    this.loginLabels  = loginLabels;
    this.passLabels   = passLabels;
    this.headerLabels = headerLabels;
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
