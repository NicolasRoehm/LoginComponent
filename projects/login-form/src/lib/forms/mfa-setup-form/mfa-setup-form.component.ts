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
  selector    : 'cal-mfa-setup-form',
  templateUrl : './mfa-setup-form.component.html',
  styleUrls   : ['./mfa-setup-form.component.scss']
})
export class MfaSetupFormComponent implements OnInit, OnDestroy
{
  public    formGroup      : FormGroup;

  // MFA secret key
  @Input()  qrCode         : string;
  @Input()  code           : string;
  // Labels
  @Input()  mfaSetupLabels : any;
  // Display clear button inside code input
  @Input()  btnClearCode   : boolean;
  // Display errors
  @Input()  err            : boolean;
  // Event sent to the login form and relayed parents (modal & tab)
  @Output() saveMfa        : EventEmitter<any> = new EventEmitter();

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
    let event : any = {};

    let verifCode : string = null;

    verifCode = this.formGroup.controls.verifCode.value;

    event.code = verifCode;

    this.saveMfa.emit(event);
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
