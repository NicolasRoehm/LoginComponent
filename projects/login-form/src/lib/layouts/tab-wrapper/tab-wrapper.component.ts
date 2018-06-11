// Angular modules
import { Component }    from '@angular/core';
import { OnInit }       from '@angular/core';
import { OnDestroy }    from '@angular/core';
import { Inject }       from '@angular/core';
import { Input }        from '@angular/core';
import { Output }       from '@angular/core';
import { EventEmitter } from '@angular/core';

// External modules
import { Subscription } from 'rxjs/Subscription';

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
  // First connection or Forgotten password
  @Input()  isFirst       : boolean;
  // Password labels
  @Input()  passLabels    : any;
  @Input()  passPolicies  : any;
  // Event sent from password form
  @Output() relayFirstLog : EventEmitter<any> = new EventEmitter();
  @Output() relayLostPass : EventEmitter<any> = new EventEmitter();

  // NOTE: MFA setup
  // MFA secret key
  @Input()  code             : string;
  @Input()  qrCode           : string;
  // Labels
  @Input()  mfaSetupLabels   : any;
  // Event sent from mfa setup form
  @Output() relaySaveMfaKey  : EventEmitter<any> = new EventEmitter();

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
}
