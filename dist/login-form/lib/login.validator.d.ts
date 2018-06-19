import { FormControl } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
export interface ValidationResult {
    [key: string]: boolean;
}
export declare class LoginValidator {
    static custom(regexp: RegExp): ValidatorFn;
    static email(control: FormControl): ValidationResult;
    static phone(control: FormControl): ValidationResult;
}
