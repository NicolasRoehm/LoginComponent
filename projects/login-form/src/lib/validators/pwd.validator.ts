import { FormControl }     from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidatorFn }     from '@angular/forms';

export interface ValidationResult
{
  [key : string] : boolean;
}

export class PwdValidator
{
  public static longEnough(min : number, max : number) : ValidatorFn
  {
    let func = (control : AbstractControl) : { [key : string] : boolean } | null =>
    {
      let isLongEnough = control.value !== null && control.value.length >= min && control.value.length <= max;
      if ( !isLongEnough )
        return { longEnough: true };

      return null;
    };
    return func;
  }

  public static number(control : FormControl) : ValidationResult
  {
    let hasNumber = control.value !== null && /\d/.test(control.value);
    if ( !hasNumber )
      return { number: true };

    return null;
  }

  public static upper(control : FormControl) : ValidationResult
  {
    let hasUpper = control.value !== null && /[A-Z]/.test(control.value);
    if ( !hasUpper )
      return { upper: true };

    return null;
  }

  public static lower(control : FormControl) : ValidationResult
  {
    let hasLower = control.value !== null && /[a-z]/.test(control.value);
    if ( !hasLower )
      return { lower: true };

    return null;
  }

  public static char(control : FormControl) : ValidationResult
  {
    let hasChar = control.value !== null && /[!@#$%^&\*()_+\-=\[\]{}|']/.test(control.value);
    if ( !hasChar )
      return { char: true };

    return null;
  }
}
