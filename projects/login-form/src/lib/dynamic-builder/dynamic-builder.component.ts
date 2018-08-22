import { Component }      from '@angular/core';
import { Input }          from '@angular/core';
import { OnInit }         from '@angular/core';
import { Output }         from '@angular/core';
import { EventEmitter }   from '@angular/core';
import { OnChanges }      from '@angular/core';
import { SimpleChanges }  from '@angular/core';
import { FormGroup }      from '@angular/forms';
import { FormControl }    from '@angular/forms';
import { Validators }     from '@angular/forms';
import { ValidatorFn }    from '@angular/forms';

// Internal modules
import { FieldValidator } from '../validators/field.validator';

// Enums
import { UserPolicies }   from '../enums/user-policies.enum';
import { FieldIds }       from '../enums/field-ids.enum';
import { FormIds }        from '../enums/form-ids.enum';
import { LayoutIds }      from '../enums/layout-ids.enum';
import { DynamicButtons } from '../enums/dynamic-buttons.enum';

// https://stackblitz.com/edit/angular-dynamic-form-builder

@Component({
  selector    : 'cal-dynamic-builder',
  templateUrl : './dynamic-builder.component.html',
})
export class DynamicBuilderComponent implements OnInit, OnChanges
{
  public    form       : FormGroup;

  @Input()  fields     : any[]             = [];
  @Input()  params     : any;
  @Input()  properties : any;

  @Output() onSubmit   : EventEmitter<any> = new EventEmitter();
  @Output() forgotPwd  : EventEmitter<any> = new EventEmitter();
  @Output() signUp     : EventEmitter<any> = new EventEmitter();

  // Enums
  public    dynamicButtons                 = DynamicButtons;
  public    layoutIds                      = LayoutIds;
  public    formIds                        = FormIds;

  constructor() { }

  public ngOnChanges(changes : SimpleChanges) : void
  {
    if(changes.fields && this.form)
    {
      // NOTE: Update field state
      let fields : any = [];
      fields = changes.fields.currentValue;
      for(let field of fields)
      {
        let fieldState : boolean = null;
        fieldState = field.disabled;
        if(fieldState !== null && fieldState)
          this.form.controls[field.name].disable();
        else if (fieldState !== null && !fieldState)
          this.form.controls[field.name].enable();
      }
    }
  }

  public ngOnInit() : void
  {
    let fieldsCtrls : any = {};
    for(let field of this.fields)
    {
      // if(field.type !== 'checkbox')
      // {
        let validators : ValidatorFn[] = [];
        let formState  : any           = {};

        validators = this.getValidators(field);
        formState  = {
          value    : field.value    || '',
          disabled : field.disabled || false
        };

        fieldsCtrls[field.name] = new FormControl(formState, validators);
      // }
      // else
      // {
      //   let opts = {};

      //   // NOTE: Options useful for select / checkbox / radio
      //   for(let opt of field.options)
      //     opts[opt.key] = new FormControl(opt.value);

      //   fieldsCtrls[field.name] = new FormGroup(opts);
      // }
    }
    this.form = new FormGroup(fieldsCtrls);
  }

  public onClickForgotPassword() : void
  {
    this.forgotPwd.emit();
  }

  public onClickSignUp() : void
  {
    this.signUp.emit();
  }

  private getValidators(field : any) : ValidatorFn[]
  {
    let validators : ValidatorFn[] = [];

    switch(field.name)
    {
      case FieldIds.USR :
        validators = this.getUsrValidators(field.policies);
        break;
      case FieldIds.PWD :
        validators = this.getPwdValidators(field.policies);
        break;
      case FieldIds.VERIF_CODE :
        validators = this.getCodeValidators();
        break;
      default :
          validators.push(Validators.required);
        break;
    }

    return validators;
  }

  private getUsrValidators(usrPolicy : string) : ValidatorFn[]
  {
    let validators : ValidatorFn[] = [];
    validators.push(Validators.required);

    if(!usrPolicy)
      return validators;

    switch(usrPolicy)
    {
      case UserPolicies.EMAIL :
        validators.push(FieldValidator.email);
        break;
      case UserPolicies.PHONE :
        validators.push(FieldValidator.phone);
        break;
      default :
        let regExp : RegExp = null;
        regExp = new RegExp(usrPolicy);
        validators.push(FieldValidator.custom(regExp));
        break;
    }

    return validators;
  }

  private getPwdValidators(pwdPolicies : any) : ValidatorFn[]
  {
    let validators : ValidatorFn[] = [];
    validators.push(Validators.required);

    if(!pwdPolicies)
      return validators;

    validators.push(FieldValidator.longEnough(pwdPolicies.range.min, pwdPolicies.range.max));

    if(pwdPolicies.char)
      validators.push(FieldValidator.char);
    if(pwdPolicies.number)
      validators.push(FieldValidator.number);
    if(pwdPolicies.upper)
      validators.push(FieldValidator.upper);
    if(pwdPolicies.lower)
      validators.push(FieldValidator.lower);

    return validators;
  }

  private getCodeValidators() : ValidatorFn[]
  {
    let validators : ValidatorFn[] = [];
    validators.push(Validators.required);

    // if(codePolicies.char)
    validators.push(FieldValidator.sixDigits);

    return validators;
  }

}
