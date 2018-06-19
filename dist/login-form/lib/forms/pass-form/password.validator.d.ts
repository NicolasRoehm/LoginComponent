import { FormControl } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
export interface ValidationResult {
    [key: string]: boolean;
}
export declare class PasswordValidator {
    static longEnough(min: number, max: number): ValidatorFn;
    static number(control: FormControl): ValidationResult;
    static upper(control: FormControl): ValidationResult;
    static lower(control: FormControl): ValidationResult;
    static char(control: FormControl): ValidationResult;
}
