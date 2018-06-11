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

@Component({
  selector    : 'cal-inline-pass',
  templateUrl : './inline-pass.component.html',
  styleUrls   : ['./inline-pass.component.scss']
})
export class InlinePassComponent implements OnInit, OnDestroy
{
  // First connection or Forgotten password
  @Input()  isFirst       : boolean;
  // Labels
  @Input()  headerLabels  : any;
  @Input()  passLabels    : any;
  @Input()  passPolicies  : any;
  // Event sent from pass-form
  @Output() relayFirstLog : EventEmitter<any> = new EventEmitter();
  @Output() relayLostPass : EventEmitter<any> = new EventEmitter();
  // Event sent from inline
  @Output() sendCloseTab  : EventEmitter<boolean> = new EventEmitter();

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
}
