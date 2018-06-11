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

// Internal modules
import { PasswordValidator } from './password.validator';

@Component({
  selector    : 'cal-pass-form',
  templateUrl : './pass-form.component.html',
  styleUrls   : ['./pass-form.component.scss']
})
export class PassFormComponent implements OnInit, OnDestroy
{
  public    formGroup    : FormGroup;
  // public captchaToken : string; // TODO:
  // First connection or Forgotten password
  @Input()  isFirst      : boolean;
  // Labels
  @Input()  passLabels   : any;
  @Input()  passPolicies : any;
  // Event sent to login-form and relayed parents (modal & tab)
  @Output() firstConnection : EventEmitter<any> = new EventEmitter();
  @Output() lostPassword    : EventEmitter<any> = new EventEmitter();

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

    let verifCode   : string = null;
    let newPassword : string = null;

    verifCode       = this.formGroup.controls.verifCode.value;
    newPassword     = this.formGroup.controls.newPassword.value;

    event.password = newPassword;

    // First connection
    if(this.isFirst)
    {
      this.firstConnection.emit(event);
      return;
    }

    event.code = verifCode;
    // Lost password
    this.lostPassword.emit(event);
  }

  private initFormsGroups() : void
  {
    let validators : any = [];

    if(this.passPolicies.char)
      validators.push(PasswordValidator.char);
    if(this.passPolicies.number)
      validators.push(PasswordValidator.number);
    if(this.passPolicies.upper)
      validators.push(PasswordValidator.upper);
    if(this.passPolicies.lower)
      validators.push(PasswordValidator.lower);

    validators.push(Validators.required);
    validators.push(PasswordValidator.longEnough(this.passPolicies.range.min, this.passPolicies.range.max));

    this.formGroup = this.builder.group({
      verifCode    : new FormControl({
        value      : null,
        disabled   : false
      }),
      newPassword  : new FormControl({
        value      : null,
        disabled   : false
      }, validators),
    });

    if(!this.isFirst)
      this.formGroup.controls.verifCode.setValidators([Validators.required]);
  }

}
