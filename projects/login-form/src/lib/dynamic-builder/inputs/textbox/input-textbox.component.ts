import { Component }        from '@angular/core';
import { OnInit }           from '@angular/core';
import { Input }            from '@angular/core';
import { OnChanges }        from '@angular/core';
import { SimpleChanges }    from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { AbstractControl }  from '@angular/forms';

// Enums
import { FieldIds }         from '../../../enums/field-ids.enum';
import { FieldTypes }       from '../../../enums/field-types.enum';

// text,email,tel,textarea,password
@Component({
  selector    : 'cal-input-textbox',
  templateUrl : './input-textbox.component.html',
  styleUrls   : ['./input-textbox.component.scss']
})
export class InputTextboxComponent implements OnInit, OnChanges
{
  @Input() form       : FormGroup;
  @Input() field      : any;
  @Input() params     : any;
  @Input() properties : any;

  public   fieldIds               = FieldIds;
  public   fieldTypes             = FieldTypes;

  public   showPassword : boolean = false;

  constructor() { }

  public ngOnInit() : void
  {
    this.initProperties();
  }

  public ngOnChanges(changes : SimpleChanges) : void
  {
    if(changes.field)
    {
      // NOTE: Update field value
      // NOTE: Yet another fix (Angular form status workaround) : https://github.com/angular/angular/issues/14542
      let field      : AbstractControl = null;
      field = this.form.controls[this.field.name];
      setTimeout(() => {
        let fieldValue : string = '';
        if(changes.field.currentValue.value)
          fieldValue = changes.field.currentValue.value;
        field.setValue(fieldValue);
      }, 1);
    }
    if(changes.properties)
      this.initProperties();
  }

  // https://gist.github.com/runspired/b9fdf1fa74fc9fb4554418dea35718fe
  // NOTE: <input autocomplete="nope"> turns off autocomplete on many other browsers that don't respect
  // the form's "off", but not for "password" inputs.
  // NOTE: <input type="password" autocomplete="new-password" will turn it off for passwords everywhere
  public getOptionAutocomplete(field : any) : string
  {
    if(this.params.autocomplete)
      return field.name;
    if(field.name === FieldIds.PWD)
      return 'new-password';
    return 'nope';
  }

  public initProperties() : void
  {
    if(this.field.name !== FieldIds.PWD)
      return;
    // Refresh min max label
    let rangeLabel : string = null;
    rangeLabel = this.properties.labels.policy.pwdLength;
    rangeLabel = rangeLabel.replace(/{{min}}/, this.field.policies.range.min);
    rangeLabel = rangeLabel.replace(/{{max}}/, this.field.policies.range.max);
    this.properties.labels.policy.pwdLengthReplaced = rangeLabel;
  }

  public getErrors(field : any) : string
  {
    let policyLabels : any              = {};
    let errorMsg     : string           = null;
    let errors       : ValidationErrors = null;

    policyLabels = this.properties.labels.policy;
    errors       = this.form.controls[field.name].errors;

    if(!errors || !this.params.errors) // NOTE: If there is no errors or errors are disabled
      return null;

    if(errors.required)
      return policyLabels.required;

    switch(field.name)
    {
      case FieldIds.USR :
        errorMsg = this.getUsrErrors(errors, policyLabels);
        break;
      case FieldIds.PWD :
        errorMsg = this.getPwdErrors(errors, policyLabels);
        break;
      case FieldIds.VERIF_CODE :
        errorMsg = this.getCodeErrors(errors, policyLabels);
        break;
      default :
        errorMsg = null;
        break;
    }

    return errorMsg;
  }

  private getUsrErrors(errors : ValidationErrors, policy : any) : string
  {
    let errorMsg : string = null;

    if(errors.email)
      errorMsg = policy.email;
    if(errors.phone)
      errorMsg = policy.phone;
    // if(errors.custom)
    //   errorMsg = policy.customRegex;

    return errorMsg;
  }

  private getPwdErrors(errors : ValidationErrors, policy : any) : string
  {
    let errorMsg : string = null;

    if(errors.char)
      errorMsg = policy.pwdSpecial;
    if(errors.lower)
      errorMsg = policy.pwdLowercase;
    if(errors.upper)
      errorMsg = policy.pwdUppercase;
    if(errors.number)
      errorMsg = policy.pwdNumber;
    if(errors.longEnough)
      errorMsg = policy.pwdLengthReplaced;

    return errorMsg;
  }

  private getCodeErrors(errors : ValidationErrors, policy : any) : string
  {
    let errorMsg : string = null;

    if(errors.sixDigits)
      errorMsg = policy.sixDigits;

    return errorMsg;
  }

}
