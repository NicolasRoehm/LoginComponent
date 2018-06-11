// Angular modules
import { OnInit }       from '@angular/core';
import { Component }    from '@angular/core';
import { OnDestroy }    from '@angular/core';
import { Inject }       from '@angular/core';
import { Input }        from '@angular/core';
import { Output }       from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl }  from '@angular/forms';
import { FormGroup }    from '@angular/forms';
import { FormBuilder }  from '@angular/forms';
import { Validators }   from '@angular/forms';

// External modules
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector    : 'cal-mfa-form',
  templateUrl : './mfa-form.component.html',
  styleUrls   : ['./mfa-form.component.scss']
})
export class MfaFormComponent implements OnInit, OnDestroy
{
  @Input()  mfaLabels : any;
  @Output() mfaCode   : EventEmitter<any> = new EventEmitter();

  public formGroup    : FormGroup;

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
    let code   : string = null;
    code = this.formGroup.controls.code.value;
    this.mfaCode.emit(code);
  }

  private initFormsGroups() : void
  {
    this.formGroup = this.builder.group({
      code : new FormControl({
        value      : null,
        disabled   : false
      }, [ Validators.required ]),
    });
  }

}
