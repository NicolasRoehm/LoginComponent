import { FormControl }     from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidatorFn }     from '@angular/forms';

export interface ValidationResult
{
  [key : string] : boolean;
}

export class UsrValidator
{
  public static custom(regexp : RegExp) : ValidatorFn
  {
    let func = (control : AbstractControl) : { [key : string] : boolean } | null =>
    {
      let isRespectful = control.value !== null && regexp.test(control.value);
      if ( !isRespectful )
        return { custom : true };

      return null;
    };
    return func;
  }

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

}
