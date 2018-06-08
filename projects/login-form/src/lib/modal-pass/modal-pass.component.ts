// Angular modules
import { Component }       from '@angular/core';
import { OnInit }          from '@angular/core';
import { OnDestroy }       from '@angular/core';
import { Inject }          from '@angular/core';
import { Input }           from '@angular/core';
import { Output }          from '@angular/core';
import { EventEmitter }    from '@angular/core';
import { MatDialogRef }    from '@angular/material';
import { MatDialog }       from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

// External modules
import { Subscription }    from 'rxjs/Subscription';

@Component({
  selector    : 'cal-modal-pass',
  templateUrl : './modal-pass.component.html',
  styleUrls   : ['./modal-pass.component.scss']
})
export class ModalPassComponent implements OnInit, OnDestroy
{
  // First connection or Forgotten password
  public  isFirst       : boolean;
  // Labels
  public  headerLabels  : any;
  public  passLabels    : any;
  public  passPolicies  : any;
  // Event sent from pass-form
  public  relayFirstLog : EventEmitter<any> = new EventEmitter();
  public  relayLostPass : EventEmitter<any> = new EventEmitter();
  // Event sent from login-form
  private closeSub      : Subscription;

  constructor
  (
    public  dialogRef : MatDialogRef<ModalPassComponent>,
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

  private loadParams() : void
  {
    var data : any;
    data = this.data;

    if(data !== null)
    {
      // First connection or Forgotten password
      this.isFirst      = data.isFirst;
      // Labels
      this.headerLabels = data.headerLabels;
      this.passLabels   = data.passLabels;
      this.passPolicies = data.passPolicies;
      // Close dialog event
      this.closeSub = data.closeEvent.subscribe((res) =>
      {
        this.dialogRef.close();
      });
    }
  }

}
