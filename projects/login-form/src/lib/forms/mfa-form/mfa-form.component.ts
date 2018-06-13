// Angular modules
import { OnInit }       from '@angular/core';
import { Component }    from '@angular/core';
import { OnDestroy }    from '@angular/core';
import { Input }        from '@angular/core';
import { Output }       from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl }  from '@angular/forms';
import { FormGroup }    from '@angular/forms';
import { FormBuilder }  from '@angular/forms';
import { Validators }   from '@angular/forms';

@Component({
  selector    : 'cal-mfa-form',
  templateUrl : './mfa-form.component.html',
  styleUrls   : ['./mfa-form.component.scss']
})
export class MfaFormComponent implements OnInit, OnDestroy
{
  public    formGroup    : FormGroup;

  // Labels
  @Input()  mfaLabels    : any;
  // Display clear button inside code input
  @Input()  btnClearCode : boolean;
  // Display errors
  @Input()  err          : boolean;
  // Event sent to login-form and relayed parents (modal & tab)
  @Output() sendMfa      : EventEmitter<any> = new EventEmitter();

  constructor
  (
    private builder : FormBuilder
  )
  {
  }

  public ngOnInit() : void
  {
    this.initFormsGroups();
  }

  public ngOnDestroy() : void
  {
  }

  public send() : void
  {
    let event     : any    = {};
    let verifCode : string = null;

    verifCode  = this.formGroup.controls.verifCode.value;
    event.code = verifCode;
    this.sendMfa.emit(event);
  }

  private initFormsGroups() : void
  {
    this.formGroup = this.builder.group({
      verifCode : new FormControl({
        value      : null,
        disabled   : false
      }, [ Validators.required ]),
    });
  }

}
