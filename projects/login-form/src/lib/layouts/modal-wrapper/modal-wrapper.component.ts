// Angular modules
import { Component }       from '@angular/core';
import { OnInit }          from '@angular/core';
import { OnDestroy }       from '@angular/core';
import { Inject }          from '@angular/core';
import { EventEmitter }    from '@angular/core';
import { MatDialogRef }    from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

// External modules
import { Subscription }    from 'rxjs/Subscription';

// Enum
import { FormIds }         from '../../enums/form-ids.enum';

@Component({
  selector    : 'cal-modal-wrapper',
  templateUrl : './modal-wrapper.component.html',
  styleUrls   : ['./modal-wrapper.component.scss']
})
export class ModalWrapperComponent implements OnInit, OnDestroy
{
  // NOTE: Useful for template
  public formIds = FormIds;

  // NOTE: Common
  // Form type (password / mfa)
  public formId    : string;
  // Labels
  public labels    : any;
  // Errors
  public errors    : any;
  // Actions
  public actions   : any;
  // Event sent from modal
  public closeSub  : Subscription;

  // NOTE: Password
  // First connection or Forgot password
  public isFirst       : boolean;
  // Password policies
  public pwdPolicies   : any;
  // Event sent from password form
  public relayFirstPwd : EventEmitter<any> = new EventEmitter();
  public relayLostPwd  : EventEmitter<any> = new EventEmitter();

  // NOTE: MFA setup
  // MFA secret key
  public code            : string;
  public qrCode          : string;
  // Event sent from mfa setup form
  public relaySaveMfaKey : EventEmitter<any> = new EventEmitter();

  // NOTE: MFA
  // Event sent from mfa form
  public relaySendMfaCode : EventEmitter<any> = new EventEmitter();

  constructor
  (
    public  dialogRef : MatDialogRef<ModalWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  )
  {
    this.loadParams();
  }

  public ngOnInit() : void
  {
  }

  public ngOnDestroy() : void
  {
    if(this.closeSub)
      this.closeSub.unsubscribe();
  }

  public relayFirstPwdEvent($event : any) : void
  {
    this.relayFirstPwd.emit($event);
  }

  public relayLostPwdEvent($event : any) : void
  {
    this.relayLostPwd.emit($event);
  }

  public relaySaveMfaKeyEvent($event : any) : void
  {
    this.relaySaveMfaKey.emit($event);
  }

  public relaySendMfaCodeEvent($event : any) : void
  {
    this.relaySendMfaCode.emit($event);
  }

  private loadParams() : void
  {
    var data : any;
    data = this.data;

    if(data !== null)
    {
      this.formId         = data.formId;

      // NOTE: Common
      // Labels
      this.labels         = data.labels;
      // Errors
      this.errors         = data.errors;
      // Actions
      this.actions        = data.actions;

      // NOTE: Password
      // First connection or Forgot password
      this.isFirst        = data.isFirst;
      // Password policies
      this.pwdPolicies    = data.pwdPolicies;

      // NOTE: MFA
      // Mfa setupd codes
      this.code           = data.code;
      this.qrCode         = data.qrCode;

      // Close dialog event
      this.closeSub = data.closeEvent.subscribe((res) =>
      {
        this.dialogRef.close();
      });
    }
  }

}
