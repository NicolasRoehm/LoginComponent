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
import { Forms }           from '../../enums/forms.enum';

@Component({
  selector    : 'cal-modal-wrapper',
  templateUrl : './modal-wrapper.component.html',
  styleUrls   : ['./modal-wrapper.component.scss']
})
export class ModalWrapperComponent implements OnInit, OnDestroy
{
  // NOTE: Useful for template
  public forms = Forms;

  // NOTE: Common
  // Form type (password / mfa)
  public formType        : string;
  // Header labels
  public headerLabels    : any;
  // Event sent from modal
  public closeSub        : Subscription;

  // NOTE: Password
  // First connection or Forgotten password
  public isFirst       : boolean;
  // Labels
  public passLabels    : any;
  public passPolicies  : any;
  // Display errors on the password form
  public errOnPassForm : boolean;
  // Display show/hide button inside password input
  public btnShowPassOnPassForm  : boolean;
  // Display clear button inside code input
  public btnClearCodeOnPassForm : boolean;
  // Event sent from password form
  public relayFirstLog : EventEmitter<any> = new EventEmitter();
  public relayLostPass : EventEmitter<any> = new EventEmitter();

  // NOTE: MFA setup
  // MFA secret key
  public code            : string;
  public qrCode          : string;
  // Labels
  public mfaSetupLabels  : any;
  // Display errors on the mfa form
  public errOnMfaForm    : boolean;
  // Display clear button inside code input
  public btnClearCodeOnMfaForm : boolean;
  // Event sent from mfa setup form
  public relaySaveMfaKey : EventEmitter<any> = new EventEmitter();

  // NOTE: MFA
  // Labels
  public mfaLabels        : any;
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

  public relayFirstLogEvent($event : any) : void
  {
    this.relayFirstLog.emit($event);
  }

  public relayLostPassEvent($event : any) : void
  {
    this.relayLostPass.emit($event);
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
      this.formType       = data.formType;

      // NOTE: Password
      // First connection or Forgotten password
      this.isFirst        = data.isFirst;
      // Password labels
      this.headerLabels   = data.headerLabels;
      this.passLabels     = data.passLabels;
      this.passPolicies   = data.passPolicies;
      // Password errors
      this.errOnPassForm  = data.errOnPassForm;
      // Password buttons
      this.btnShowPassOnPassForm  = data.btnShowPassOnPassForm;
      this.btnClearCodeOnPassForm = data.btnClearCodeOnPassForm;

      // NOTE: MFA
      // Mfa setup labels
      this.mfaSetupLabels = data.mfaSetupLabels;
      // Mfa setupd codes
      this.code           = data.code;
      this.qrCode         = data.qrCode;
      // Mfa labels
      this.mfaLabels      = data.mfaLabels;
      // Mfa errors
      this.errOnMfaForm   = data.errOnMfaForm;
      // Mfa button
      this.btnClearCodeOnMfaForm = data.btnClearCodeOnMfaForm;

      // Close dialog event
      this.closeSub = data.closeEvent.subscribe((res) =>
      {
        this.dialogRef.close();
      });
    }
  }

}
