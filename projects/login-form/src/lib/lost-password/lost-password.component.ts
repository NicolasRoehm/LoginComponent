// Angular modules
import { Component }        from '@angular/core';
import { OnDestroy }        from '@angular/core';
import { Inject }           from '@angular/core';
import { Input }            from '@angular/core';
import { Output }           from '@angular/core';
import { EventEmitter }     from '@angular/core';
import { MatDialogRef }     from '@angular/material';
import { MatDialog }        from '@angular/material';
import { MAT_DIALOG_DATA }  from '@angular/material';
import { FormControl }      from '@angular/forms';
import { FormGroup }        from '@angular/forms';
import { FormBuilder }      from '@angular/forms';
import { Validators }       from '@angular/forms';

// External modules
import { Subscription }     from 'rxjs/Subscription';

@Component({
  selector    : 'cal-lost-password',
  templateUrl : './lost-password.component.html',
  styleUrls   : ['./lost-password.component.scss']
})
export class LostPasswordComponent implements OnDestroy
{
  public formGroup    : FormGroup;

  public labels       : any;

  public captchaToken : string;
  public isFirst      : boolean;

  public firstConnection : EventEmitter<any> = new EventEmitter();
  public lostPassword    : EventEmitter<any> = new EventEmitter();

  private closeSub : Subscription;

  constructor
  (
    public  dialogRef  : MatDialogRef<LostPasswordComponent>,
    private builder    : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  )
  {
    this.loadParams();
    this.initFormsGroups();
  }

  public ngOnDestroy() : void
  {
    if(this.closeSub)
      this.closeSub.unsubscribe();
  }

  public send() : void
  {
    let event : any = {};

    let verifCode   : string = null;
    let newPassword : string = null;

    verifCode       = this.formGroup.controls.verifCode.value;
    newPassword     = this.formGroup.controls.newPassword.value;

    event.newPassword = newPassword;

    // First connection
    if(this.isFirst)
    {
      this.firstConnection.emit(event);
      return;
    }

    event.verifCode = verifCode;
    // Lost password
    this.lostPassword.emit(event);
  }

  private initFormsGroups() : void
  {
    this.formGroup = this.builder.group({
      verifCode    : new FormControl({
        value      : null,
        disabled   : false
      }),
      newPassword  : new FormControl({
        value      : null,
        disabled   : false
      },[Validators.required]),
    });

    if(!this.isFirst)
      this.formGroup.controls.verifCode.setValidators([Validators.required]);
  }

  private loadParams() : void
  {
    var data : any;

    data = this.data;

    if(data !== null)
    {
      // First connection or Forgotten password
      this.isFirst  = data.isFirst;

      // Close dialog event
      this.closeSub = data.closeEvent.subscribe((res) =>
      {
        this.dialogRef.close();
      });

      // Labels
      this.labels   = data.labels;
    }
  }

}
