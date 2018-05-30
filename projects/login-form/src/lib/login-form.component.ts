// Angular modules
import { OnInit }       from '@angular/core';
import { OnDestroy }    from '@angular/core';
import { Input }        from '@angular/core';
import { Output }       from '@angular/core';
import { Component }    from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MatDialog }    from '@angular/material';
import { FormControl }  from '@angular/forms';
import { FormGroup }    from '@angular/forms';
import { FormBuilder }  from '@angular/forms';
import { Validators }   from '@angular/forms';

// External modules
import { Subscription } from 'rxjs/Subscription';

// Components
import { LostPasswordComponent } from './lost-password/lost-password.component';

@Component({
  selector    : 'enl-login-form',
  templateUrl : './login-form.component.html',
  styleUrls   : ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy
{
  public    formGroup    : FormGroup;
  public    showPassword : boolean;

  public    loginLabels : any;
  public    modalLabels : any;

  @Input()  customLoginLabels : any;
  @Input()  customModalLabels : any;

  @Output() login         : EventEmitter<any>    = new EventEmitter();
  @Output() forgottenPass : EventEmitter<any>    = new EventEmitter();

  @Output() sendFirstPass : EventEmitter<string> = new EventEmitter();
  @Output() sendResetPass : EventEmitter<string> = new EventEmitter();

  private   closeEvent    : EventEmitter<boolean> = new EventEmitter();

  private   firstSub : Subscription;
  private   lostSub  : Subscription;

  constructor
  (
    public  dialog  : MatDialog,
    private builder : FormBuilder,
  )
  {
    this.showPassword = false;
    this.initFormsGroups();
    this.prepareLabels();
  }

  public ngOnInit() : void
  {
  }

  public ngOnDestroy() : void
  {
    if(this.firstSub)
      this.firstSub.unsubscribe();
    if(this.lostSub)
      this.lostSub.unsubscribe();
  }

  public openDialog(firstPwd : boolean) : void
  {
    let params : any = { isFirst : firstPwd, closeEvent : this.closeEvent, labels : this.modalLabels };

    let dialogRef = this.dialog.open(LostPasswordComponent, { data : params });

    this.firstSub = dialogRef.componentInstance.firstConnection.subscribe((newPassword) =>
    {
      this.sendFirstPass.emit(newPassword);
    });
    this.lostSub  = dialogRef.componentInstance.lostPassword.subscribe((newPassword) =>
    {
      this.sendResetPass.emit(newPassword);
    });
    dialogRef.afterClosed().subscribe(result =>
    {
      if(result)
        this.formGroup.controls.password.setValue(result); // Set password
    });
  }

  public closeDialog() : void
  {
    this.closeEvent.emit();
  }

  public onClickLogin() : void
  {
    let event : any = null;
    event = this.prepareEvent();
    this.login.emit(event);
  }

  public forgottenPassword() : void
  {
    let event : any = null;
    event = this.prepareEvent();
    this.forgottenPass.emit(event);
  }

  private prepareLabels() : any
  {
    let defaultLoginLabels : any = null;
    let defaultModalLabels : any = null;
    let loginLabels        : any = null;
    let modalLabels        : any = null;

    // Login labels
    defaultLoginLabels = {
      loginLabel                 : 'Login',
      passwordLabel              : 'Password',
      forgottenPasswordLabel     : 'Forgotten password',
      signInLabel                : 'Sign in',
      googleConnectionLabel      : 'Connect with Google',
      fieldRequiredLabel         : 'This field is required',
      fieldEmailLabel            : 'This value must be an email',
    };
    // Modal labels
    defaultModalLabels = {
      lostPasswordLabel          : 'Lost password',
      updatePasswordLabel        : 'Update password',
      updatePasswordMessageLabel : 'Please enter a new password',
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
      fieldNonWhitespaceLabel    : 'This value must not contain any spaces',
    };

    loginLabels = Object.assign(defaultLoginLabels, this.customLoginLabels);
    modalLabels = Object.assign(defaultModalLabels, this.customModalLabels);

    this.loginLabels = loginLabels;
    this.modalLabels = modalLabels;
  }

  private prepareEvent() : any
  {
    let event : any = null;

    let login    : string = this.formGroup.controls.login.value;
    let password : string = this.formGroup.controls.password.value;

    event = {
      login      : login,
      password   : password
    };

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
