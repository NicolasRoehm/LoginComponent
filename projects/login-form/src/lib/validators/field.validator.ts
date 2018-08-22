import { FormControl }     from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidatorFn }     from '@angular/forms';

export interface ValidationResult
{
  [key : string] : boolean;
}

export class FieldValidator
{
  // -------------------------------------------------------------------------------------------
  // NOTE: Username ----------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  public static email(control : FormControl) : ValidationResult
  {
    let isEmail = control.value !== null && /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(control.value);
    if ( !isEmail )
      return { email: true };

    return null;
  }

  public static phone(control : FormControl) : ValidationResult
  {
    let isPhone = control.value !== null && /^\+?\d*$/.test(control.value);
    if ( !isPhone )
      return { phone: true };

    return null;
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Password ----------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  public static longEnough(min : number, max : number) : ValidatorFn
  {
    let func = (control : AbstractControl) : { [key : string] : boolean } | null =>
    {
      let isLongEnough = control.value !== null && control.value.length >= min && control.value.length <= max;
      if(!isLongEnough)
        return { longEnough : true };

      return null;
    };
    return func;
  }

  public static number(control : FormControl) : ValidationResult
  {
    let hasNumber = control.value !== null && /\d/.test(control.value);
    if(!hasNumber)
      return { number : true };

    return null;
  }

  public static upper(control : FormControl) : ValidationResult
  {
    let hasUpper = control.value !== null && /[A-Z]/.test(control.value);
    if(!hasUpper)
      return { upper : true };

    return null;
  }

  public static lower(control : FormControl) : ValidationResult
  {
    let hasLower = control.value !== null && /[a-z]/.test(control.value);
    if(!hasLower)
      return { lower : true };

    return null;
  }

  public static char(control : FormControl) : ValidationResult
  {
    let hasChar = control.value !== null && /[!@#$%^&\*()_><\.~\[\]{}|'\\:;?\-"\/,\`]/.test(control.value);
    if(!hasChar)
      return { char : true };

    return null;
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Verification code -------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  public static sixDigits(control : FormControl) : ValidationResult
  {
    let hasSixDigits = control.value !== null && /^[0-9]{6}$/.test(control.value);
    if(!hasSixDigits)
      return { sixDigits : true };

    return null;
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Custom ------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  public static custom(regexp : RegExp) : ValidatorFn
  {
    let func = (control : AbstractControl) : { [key : string] : boolean } | null =>
    {
      let isRespectful = control.value !== null && regexp.test(control.value);
      if(!isRespectful)
        return { custom : true };

      return null;
    };
    return func;
  }

}
