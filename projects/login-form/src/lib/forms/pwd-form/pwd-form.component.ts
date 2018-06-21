// Angular modules
import { OnInit }        from '@angular/core';
import { OnChanges }     from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Component }     from '@angular/core';
import { OnDestroy }     from '@angular/core';
import { Input }         from '@angular/core';
import { Output }        from '@angular/core';
import { EventEmitter }  from '@angular/core';
import { FormControl }   from '@angular/forms';
import { FormGroup }     from '@angular/forms';
import { FormBuilder }   from '@angular/forms';
import { Validators }    from '@angular/forms';

// Internal modules
import { PwdValidator }  from '../../validators/pwd.validator';

@Component({
  selector    : 'cal-pwd-form',
  templateUrl : './pwd-form.component.html',
  styleUrls   : ['./pwd-form.component.scss']
})
export class PwdFormComponent implements OnInit, OnChanges, OnDestroy
{
  public    formGroup    : FormGroup;
  public    showPassword : boolean = false;
  // public captchaToken : string; // TODO:

  // Labels
  @Input()  labels       : any;
  // Errors
  @Input()  errors       : any;
  // Inputs
  @Input()  inputs       : any;

  // Username
  @Input()  username     : string;
  // First connection or Forgot password
  @Input()  isFirst      : boolean;
  // Password policies
  @Input()  pwdPolicies  : any;
  // Event sent to the login form and relayed parents (modal & tab)
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
    this.initFormGroups();
  }

  public ngOnChanges(changes : SimpleChanges) : void
  {
    if(changes.pwdPolicies)
      this.initFormGroups(true);
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
      event.username = this.username;
      this.firstConnection.emit(event);
      return;
    }

    event.code = verifCode;
    // Lost password
    this.lostPassword.emit(event);
  }

  private initFormGroups(refresh : boolean = false) : void
  {
    let verifCode   : string = null;
    let newPassword : string = null;

    if(refresh && this.formGroup)
    {
      verifCode   = this.formGroup.controls.verifCode.value;
      newPassword = this.formGroup.controls.newPassword.value;
    }

    let validators : any = [];

    if(this.pwdPolicies.char)
      validators.push(PwdValidator.char);
    if(this.pwdPolicies.number)
      validators.push(PwdValidator.number);
    if(this.pwdPolicies.upper)
      validators.push(PwdValidator.upper);
    if(this.pwdPolicies.lower)
      validators.push(PwdValidator.lower);

    validators.push(Validators.required);
    validators.push(PwdValidator.longEnough(this.pwdPolicies.range.min, this.pwdPolicies.range.max));

    // Refresh min max label
    let rangeLabel : string = null;
    rangeLabel = this.labels.policy.pwdLength;
    rangeLabel = rangeLabel.replace(/{{min}}/, this.pwdPolicies.range.min);
    rangeLabel = rangeLabel.replace(/{{max}}/, this.pwdPolicies.range.max);
    this.labels.policy.pwdLengthReplaced = rangeLabel;

    this.formGroup = this.builder.group({
      verifCode    : new FormControl({
        value      : verifCode,
        disabled   : false
      }),
      newPassword  : new FormControl({
        value      : newPassword,
        disabled   : false
      }, validators),
    });

    if(!this.isFirst)
      this.formGroup.controls.verifCode.setValidators([Validators.required]);
  }

}
