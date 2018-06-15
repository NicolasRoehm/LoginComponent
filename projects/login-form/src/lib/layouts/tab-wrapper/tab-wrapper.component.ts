// Angular modules
import { Component }    from '@angular/core';
import { OnInit }       from '@angular/core';
import { OnDestroy }    from '@angular/core';
import { Input }        from '@angular/core';
import { Output }       from '@angular/core';
import { EventEmitter } from '@angular/core';

// Enum
import { Forms }        from '../../enums/forms.enum';

@Component({
  selector    : 'cal-tab-wrapper',
  templateUrl : './tab-wrapper.component.html',
  styleUrls   : ['./tab-wrapper.component.scss']
})
export class TabWrapperComponent implements OnInit, OnDestroy
{
  // NOTE: Useful for template
  public    forms = Forms;

  // NOTE: Common
  // Form type (password / mfa)
  @Input()  formType      : string;
  // Header labels
  @Input()  headerLabels  : any;
  // Event sent from tab
  @Output() sendCloseTab  : EventEmitter<boolean> = new EventEmitter();

  // NOTE: Password
  // First connection or Forgot password
  @Input()  isFirst       : boolean;
  // Password labels
  @Input()  pwdLabels     : any;
  @Input()  pwdPolicies   : any;
  // Display errors on the password form
  @Input()  errOnPwdForm  : boolean;
  // Display show/hide button inside password input
  @Input()  btnShowPwdOnPwdForm   : boolean;
  // Display clear button inside code input
  @Input()  btnClearCodeOnPwdForm : boolean;
  // Event sent from password form
  @Output() relayFirstLog : EventEmitter<any> = new EventEmitter();
  @Output() relayLostPwd  : EventEmitter<any> = new EventEmitter();

  // NOTE: MFA setup
  // MFA secret key
  @Input()  code            : string;
  @Input()  qrCode          : string;
  // Labels
  @Input()  mfaSetupLabels  : any;
  // Display errors on the mfa form
  @Input()  errOnMfaForm    : boolean;
  // Display clear button inside code input
  @Input()  btnClearCodeOnMfaForm : boolean;
  // Event sent from mfa setup form
  @Output() relaySaveMfaKey : EventEmitter<any> = new EventEmitter();

  // NOTE: MFA
  // Labels
  @Input()  mfaLabels        : any;
  // Event sent from mfa form
  @Output() relaySendMfaCode : EventEmitter<any> = new EventEmitter();

  constructor
  (
  )
  {
  }

  public ngOnInit() : void
  {
  }

  public ngOnDestroy() : void
  {
  }

  public backToLogin() : void
  {
    this.sendCloseTab.emit();
  }

  public relayFirstLogEvent($event : any) : void
  {
    this.relayFirstLog.emit($event);
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
}
