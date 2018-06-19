/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PwdValidator } from '../../validators/pwd.validator';
export class PwdFormComponent {
    /**
     * @param {?} builder
     */
    constructor(builder) {
        this.builder = builder;
        this.showPassword = false;
        // Event sent to the login form and relayed parents (modal & tab)
        this.firstConnection = new EventEmitter();
        this.lostPassword = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initFormGroups();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes["pwdPolicies"])
            this.initFormGroups(true);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
    }
    /**
     * @return {?}
     */
    send() {
        let /** @type {?} */ event = {};
        let /** @type {?} */ verifCode = null;
        let /** @type {?} */ newPassword = null;
        verifCode = this.formGroup.controls["verifCode"].value;
        newPassword = this.formGroup.controls["newPassword"].value;
        event.password = newPassword;
        // First connection
        if (this.isFirst) {
            this.firstConnection.emit(event);
            return;
        }
        event.code = verifCode;
        // Lost password
        this.lostPassword.emit(event);
    }
    /**
     * @param {?=} refresh
     * @return {?}
     */
    initFormGroups(refresh = false) {
        let /** @type {?} */ verifCode = null;
        let /** @type {?} */ newPassword = null;
        if (refresh && this.formGroup) {
            verifCode = this.formGroup.controls["verifCode"].value;
            newPassword = this.formGroup.controls["newPassword"].value;
        }
        let /** @type {?} */ validators = [];
        if (this.pwdPolicies.char)
            validators.push(PwdValidator.char);
        if (this.pwdPolicies.number)
            validators.push(PwdValidator.number);
        if (this.pwdPolicies.upper)
            validators.push(PwdValidator.upper);
        if (this.pwdPolicies.lower)
            validators.push(PwdValidator.lower);
        validators.push(Validators.required);
        validators.push(PwdValidator.longEnough(this.pwdPolicies.range.min, this.pwdPolicies.range.max));
        // Refresh min max label
        let /** @type {?} */ rangeLabel = null;
        rangeLabel = this.labels.policy.pwdLength;
        rangeLabel = rangeLabel.replace(/{{min}}/, this.pwdPolicies.range.min);
        rangeLabel = rangeLabel.replace(/{{max}}/, this.pwdPolicies.range.max);
        this.labels.policy.pwdLengthReplaced = rangeLabel;
        this.formGroup = this.builder.group({
            verifCode: new FormControl({
                value: verifCode,
                disabled: false
            }),
            newPassword: new FormControl({
                value: newPassword,
                disabled: false
            }, validators),
        });
        if (!this.isFirst)
            this.formGroup.controls["verifCode"].setValidators([Validators.required]);
    }
}
PwdFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'cal-pwd-form',
                template: `<!-- NOTE: <form autocomplete="off"> will turn off autocomplete for the form in most browsers
     except for username/email/password fields -->
<form (ngSubmit)="send()" [formGroup]="formGroup" autocomplete="off">

  <!-- NOTE: fake fields are a workaround for chrome/opera autofill getting the wrong fields -->
  <input id="username" style="display:none" type="text" name="fakeusernameremembered">
  <input id="password" style="display:none" type="password" name="fakepasswordremembered">

  <div class="row w-100 no-gutters" *ngIf="!isFirst">
    <div class="col">
      <mat-form-field class="w-100">
        <!-- NOTE: <input autocomplete="nope"> turns off autocomplete on many other browsers that don't respect
          the form's "off", but not for "password" inputs. -->
        <input matInput formControlName="verifCode" 
          name="verif-code" autocomplete="nope" 
          placeholder="{{ labels.input.verifCode }}" 
          pattern="\\d{6}" 
          type="text"/> <!-- NOTE: Pattern matches any non-whitespace character -->
        <button *ngIf="formGroup.controls.verifCode.valid && inputs.clearCodeOnPwdForm" 
          mat-button matSuffix mat-icon-button aria-label="Clear" 
          color="primary" (click)="formGroup.controls.verifCode.setValue('')" 
          type="button">
          <mat-icon>close</mat-icon>
        </button>
        <!-- NOTE: Error messages -->
        <mat-hint align="start" *ngIf="formGroup.controls.verifCode.errors?.required && errors.pwd">
          {{ labels.policy.required }}
        </mat-hint>
        <mat-hint align="start" *ngIf="formGroup.controls.verifCode.errors?.pattern && errors.pwd">
          {{ labels.policy.sixDigits }}
        </mat-hint>
      </mat-form-field>
    </div>
  </div>
  <!-- NOTE: <input type="password" autocomplete="new-password" will turn it off for passwords everywhere -->
  <div class="row w-100 no-gutters">
    <div class="col">
      <mat-form-field class="w-100">
        <input matInput formControlName="newPassword" 
          name="new-password" autocomplete="new-password" 
          placeholder="{{ labels.input.newPassword }}" 
          type="{{ showPassword ? 'text' : 'password' }}"/>
        <button *ngIf="inputs.showPwdOnPwdForm" 
          mat-button matSuffix mat-icon-button aria-label="Clear" 
          color="primary" (click)="showPassword=!showPassword" 
          type="button">
          <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
        </button>
        <!-- NOTE: Error message -->
        <mat-hint align="start" *ngIf="formGroup.controls.newPassword.errors?.required && errors.pwd">
          {{ labels.policy.required }}
        </mat-hint>
      </mat-form-field>
    </div>
  </div>
  <div class="row w-100 no-gutters">
    <div class="col">
      <ul class="list-unstyled small">
        <li class="check-policy">
          <mat-icon class="red-policy" *ngIf="formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.longEnough">close</mat-icon>
          <mat-icon class="green-policy" *ngIf="!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.longEnough">check</mat-icon>
          {{ labels.policy.pwdLengthReplaced }}
        </li>
        <li class="check-policy" *ngIf="pwdPolicies.upper">
          <mat-icon class="red-policy" *ngIf="formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.upper">close</mat-icon>
          <mat-icon class="green-policy" *ngIf="!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.upper">check</mat-icon>
          {{ labels.policy.pwdUppercase }}
        </li>
        <li class="check-policy" *ngIf="pwdPolicies.lower">
          <mat-icon class="red-policy" *ngIf="formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.lower">close</mat-icon>
          <mat-icon class="green-policy" *ngIf="!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.lower">check</mat-icon>
          {{ labels.policy.pwdLowercase }}
        </li>
        <li class="check-policy" *ngIf="pwdPolicies.number">
          <mat-icon class="red-policy" *ngIf="formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.number">close</mat-icon>
          <mat-icon class="green-policy" *ngIf="!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.number">check</mat-icon>
          {{ labels.policy.pwdNumber }}
        </li>
        <li class="check-policy" *ngIf="pwdPolicies.char">
          <mat-icon class="red-policy" *ngIf="formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.char">close</mat-icon>
          <mat-icon class="green-policy" *ngIf="!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.char">check</mat-icon>
          {{ labels.policy.pwdSpecial }}
        </li>
      </ul>
    </div>
  </div>
  <!-- TODO: Enable Google Captcha -->
  <!-- <div class="row w-100 no-gutters">
    <div class="col">
      <re-captcha site_key="6LdBtAkUAAAAAB2_l_TOz7oZmTLXaFjP1cxnu4yM"
        (captchaResponse)="handleCorrectCaptcha($event)">
      </re-captcha>
    </div>
  </div> -->
  <div class="pt-0 pb-4 px-4">
    <div class="row w-100 no-gutters">
      <div class="col text-right">
        <button color="primary" mat-raised-button class="small text-uppercase" type="submit" [disabled]="!formGroup.valid">
          {{ labels.button.send }}
        </button>
      </div>
    </div>
  </div>
</form>`,
                styles: [`.green-policy{color:green}.red-policy{color:red}.check-policy{display:flex;align-items:center}.check-policy .mat-icon{margin-right:4px;font-size:22px;height:22px;width:22px}`]
            },] },
];
/** @nocollapse */
PwdFormComponent.ctorParameters = () => [
    { type: FormBuilder, },
];
PwdFormComponent.propDecorators = {
    "labels": [{ type: Input },],
    "errors": [{ type: Input },],
    "inputs": [{ type: Input },],
    "isFirst": [{ type: Input },],
    "pwdPolicies": [{ type: Input },],
    "firstConnection": [{ type: Output },],
    "lostPassword": [{ type: Output },],
};
function PwdFormComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PwdFormComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PwdFormComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    PwdFormComponent.propDecorators;
    /** @type {?} */
    PwdFormComponent.prototype.formGroup;
    /** @type {?} */
    PwdFormComponent.prototype.showPassword;
    /** @type {?} */
    PwdFormComponent.prototype.labels;
    /** @type {?} */
    PwdFormComponent.prototype.errors;
    /** @type {?} */
    PwdFormComponent.prototype.inputs;
    /** @type {?} */
    PwdFormComponent.prototype.isFirst;
    /** @type {?} */
    PwdFormComponent.prototype.pwdPolicies;
    /** @type {?} */
    PwdFormComponent.prototype.firstConnection;
    /** @type {?} */
    PwdFormComponent.prototype.lostPassword;
    /** @type {?} */
    PwdFormComponent.prototype.builder;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHdkLWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vIiwic291cmNlcyI6WyJsaWIvZm9ybXMvcHdkLWZvcm0vcHdkLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFJQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQVUsZUFBZSxDQUFDO0FBRTlDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBYyxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFhLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU8sZUFBZSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBUSxnQkFBZ0IsQ0FBQztBQUUvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQVEsZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFTLGdCQUFnQixDQUFDO0FBRy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTyxnQ0FBZ0MsQ0FBQztBQThHL0QsTUFBTTs7OztJQXFCSixZQUVVO1FBQUEsWUFBTyxHQUFQLE9BQU87NEJBcEJrQixLQUFLOzsrQkFlUSxJQUFJLFlBQVksRUFBRTs0QkFDbEIsSUFBSSxZQUFZLEVBQUU7S0FPakU7Ozs7SUFFTSxRQUFRO1FBRWIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOzs7Ozs7SUFHakIsV0FBVyxDQUFDLE9BQXVCO1FBRXhDLEVBQUUsQ0FBQSxDQUFDLE9BQU87WUFDUixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDOzs7OztJQUd2QixXQUFXOzs7OztJQUlYLElBQUk7UUFFVCxxQkFBSSxLQUFLLEdBQVMsRUFBRSxDQUFDO1FBRXJCLHFCQUFJLFNBQVMsR0FBYyxJQUFJLENBQUM7UUFDaEMscUJBQUksV0FBVyxHQUFZLElBQUksQ0FBQztRQUVoQyxTQUFTLEdBQVMsSUFBSSxDQUFDLFNB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U0FDZixDQUFDLENBQUM7UUFFSCxFQUFFLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsY0FBVyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7OztZQTNONUUsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBTSxjQUFjO2dCQUM1QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUF1R0o7Z0JBQ04sTUFBTSxFQUFFLENBQUMsK0tBQStLLENBQUM7YUFDMUw7Ozs7WUFqSFEsV0FBVzs7O3VCQXlIakIsS0FBSzt1QkFFTCxLQUFLO3VCQUVMLEtBQUs7d0JBR0wsS0FBSzs0QkFFTCxLQUFLO2dDQUVMLE1BQU07NkJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8vIEFuZ3VsYXIgbW9kdWxlc1xyXG5pbXBvcnQgeyBPbkluaXQgfSAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9uQ2hhbmdlcyB9ICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9uRGVzdHJveSB9ICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSW5wdXQgfSAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPdXRwdXQgfSAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9ICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwIH0gICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVmFsaWRhdG9ycyB9ICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbi8vIEludGVybmFsIG1vZHVsZXNcclxuaW1wb3J0IHsgUHdkVmFsaWRhdG9yIH0gIGZyb20gJy4uLy4uL3ZhbGlkYXRvcnMvcHdkLnZhbGlkYXRvcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvciAgICA6ICdjYWwtcHdkLWZvcm0nLFxyXG4gIHRlbXBsYXRlOiBgPCEtLSBOT1RFOiA8Zm9ybSBhdXRvY29tcGxldGU9XCJvZmZcIj4gd2lsbCB0dXJuIG9mZiBhdXRvY29tcGxldGUgZm9yIHRoZSBmb3JtIGluIG1vc3QgYnJvd3NlcnNcclxuICAgICBleGNlcHQgZm9yIHVzZXJuYW1lL2VtYWlsL3Bhc3N3b3JkIGZpZWxkcyAtLT5cclxuPGZvcm0gKG5nU3VibWl0KT1cInNlbmQoKVwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCI+XHJcblxyXG4gIDwhLS0gTk9URTogZmFrZSBmaWVsZHMgYXJlIGEgd29ya2Fyb3VuZCBmb3IgY2hyb21lL29wZXJhIGF1dG9maWxsIGdldHRpbmcgdGhlIHdyb25nIGZpZWxkcyAtLT5cclxuICA8aW5wdXQgaWQ9XCJ1c2VybmFtZVwiIHN0eWxlPVwiZGlzcGxheTpub25lXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiZmFrZXVzZXJuYW1lcmVtZW1iZXJlZFwiPlxyXG4gIDxpbnB1dCBpZD1cInBhc3N3b3JkXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIiB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwiZmFrZXBhc3N3b3JkcmVtZW1iZXJlZFwiPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwicm93IHctMTAwIG5vLWd1dHRlcnNcIiAqbmdJZj1cIiFpc0ZpcnN0XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XHJcbiAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cInctMTAwXCI+XHJcbiAgICAgICAgPCEtLSBOT1RFOiA8aW5wdXQgYXV0b2NvbXBsZXRlPVwibm9wZVwiPiB0dXJucyBvZmYgYXV0b2NvbXBsZXRlIG9uIG1hbnkgb3RoZXIgYnJvd3NlcnMgdGhhdCBkb24ndCByZXNwZWN0XHJcbiAgICAgICAgICB0aGUgZm9ybSdzIFwib2ZmXCIsIGJ1dCBub3QgZm9yIFwicGFzc3dvcmRcIiBpbnB1dHMuIC0tPlxyXG4gICAgICAgIDxpbnB1dCBtYXRJbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJ2ZXJpZkNvZGVcIiBcclxuICAgICAgICAgIG5hbWU9XCJ2ZXJpZi1jb2RlXCIgYXV0b2NvbXBsZXRlPVwibm9wZVwiIFxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eyBsYWJlbHMuaW5wdXQudmVyaWZDb2RlIH19XCIgXHJcbiAgICAgICAgICBwYXR0ZXJuPVwiXFxcXGR7Nn1cIiBcclxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIvPiA8IS0tIE5PVEU6IFBhdHRlcm4gbWF0Y2hlcyBhbnkgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVyIC0tPlxyXG4gICAgICAgIDxidXR0b24gKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLnZhbGlkICYmIGlucHV0cy5jbGVhckNvZGVPblB3ZEZvcm1cIiBcclxuICAgICAgICAgIG1hdC1idXR0b24gbWF0U3VmZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiQ2xlYXJcIiBcclxuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLnNldFZhbHVlKCcnKVwiIFxyXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8IS0tIE5PVEU6IEVycm9yIG1lc3NhZ2VzIC0tPlxyXG4gICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLmVycm9ycz8ucmVxdWlyZWQgJiYgZXJyb3JzLnB3ZFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5yZXF1aXJlZCB9fVxyXG4gICAgICAgIDwvbWF0LWhpbnQ+XHJcbiAgICAgICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUuZXJyb3JzPy5wYXR0ZXJuICYmIGVycm9ycy5wd2RcIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kuc2l4RGlnaXRzIH19XHJcbiAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDwhLS0gTk9URTogPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGF1dG9jb21wbGV0ZT1cIm5ldy1wYXNzd29yZFwiIHdpbGwgdHVybiBpdCBvZmYgZm9yIHBhc3N3b3JkcyBldmVyeXdoZXJlIC0tPlxyXG4gIDxkaXYgY2xhc3M9XCJyb3cgdy0xMDAgbm8tZ3V0dGVyc1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgICAgIDxpbnB1dCBtYXRJbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJuZXdQYXNzd29yZFwiIFxyXG4gICAgICAgICAgbmFtZT1cIm5ldy1wYXNzd29yZFwiIGF1dG9jb21wbGV0ZT1cIm5ldy1wYXNzd29yZFwiIFxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eyBsYWJlbHMuaW5wdXQubmV3UGFzc3dvcmQgfX1cIiBcclxuICAgICAgICAgIHR5cGU9XCJ7eyBzaG93UGFzc3dvcmQgPyAndGV4dCcgOiAncGFzc3dvcmQnIH19XCIvPlxyXG4gICAgICAgIDxidXR0b24gKm5nSWY9XCJpbnB1dHMuc2hvd1B3ZE9uUHdkRm9ybVwiIFxyXG4gICAgICAgICAgbWF0LWJ1dHRvbiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJDbGVhclwiIFxyXG4gICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cInNob3dQYXNzd29yZD0hc2hvd1Bhc3N3b3JkXCIgXHJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+XHJcbiAgICAgICAgICA8bWF0LWljb24+e3sgc2hvd1Bhc3N3b3JkID8gJ3Zpc2liaWxpdHlfb2ZmJyA6ICd2aXNpYmlsaXR5JyB9fTwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPCEtLSBOT1RFOiBFcnJvciBtZXNzYWdlIC0tPlxyXG4gICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzPy5yZXF1aXJlZCAmJiBlcnJvcnMucHdkXCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnJlcXVpcmVkIH19XHJcbiAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJyb3cgdy0xMDAgbm8tZ3V0dGVyc1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICA8dWwgY2xhc3M9XCJsaXN0LXVuc3R5bGVkIHNtYWxsXCI+XHJcbiAgICAgICAgPGxpIGNsYXNzPVwiY2hlY2stcG9saWN5XCI+XHJcbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJyZWQtcG9saWN5XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzICYmIGZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMubG9uZ0Vub3VnaFwiPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImdyZWVuLXBvbGljeVwiICpuZ0lmPVwiIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgfHwgIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMubG9uZ0Vub3VnaFwiPmNoZWNrPC9tYXQtaWNvbj5cclxuICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kucHdkTGVuZ3RoUmVwbGFjZWQgfX1cclxuICAgICAgICA8L2xpPlxyXG4gICAgICAgIDxsaSBjbGFzcz1cImNoZWNrLXBvbGljeVwiICpuZ0lmPVwicHdkUG9saWNpZXMudXBwZXJcIj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInJlZC1wb2xpY3lcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgJiYgZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycy51cHBlclwiPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImdyZWVuLXBvbGljeVwiICpuZ0lmPVwiIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgfHwgIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMudXBwZXJcIj5jaGVjazwvbWF0LWljb24+XHJcbiAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnB3ZFVwcGVyY2FzZSB9fVxyXG4gICAgICAgIDwvbGk+XHJcbiAgICAgICAgPGxpIGNsYXNzPVwiY2hlY2stcG9saWN5XCIgKm5nSWY9XCJwd2RQb2xpY2llcy5sb3dlclwiPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwicmVkLXBvbGljeVwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycyAmJiBmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzLmxvd2VyXCI+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiZ3JlZW4tcG9saWN5XCIgKm5nSWY9XCIhZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycyB8fCAhZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycy5sb3dlclwiPmNoZWNrPC9tYXQtaWNvbj5cclxuICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kucHdkTG93ZXJjYXNlIH19XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgICA8bGkgY2xhc3M9XCJjaGVjay1wb2xpY3lcIiAqbmdJZj1cInB3ZFBvbGljaWVzLm51bWJlclwiPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwicmVkLXBvbGljeVwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycyAmJiBmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzLm51bWJlclwiPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImdyZWVuLXBvbGljeVwiICpuZ0lmPVwiIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgfHwgIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMubnVtYmVyXCI+Y2hlY2s8L21hdC1pY29uPlxyXG4gICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5wd2ROdW1iZXIgfX1cclxuICAgICAgICA8L2xpPlxyXG4gICAgICAgIDxsaSBjbGFzcz1cImNoZWNrLXBvbGljeVwiICpuZ0lmPVwicHdkUG9saWNpZXMuY2hhclwiPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwicmVkLXBvbGljeVwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycyAmJiBmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzLmNoYXJcIj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJncmVlbi1wb2xpY3lcIiAqbmdJZj1cIiFmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzIHx8ICFmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzLmNoYXJcIj5jaGVjazwvbWF0LWljb24+XHJcbiAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnB3ZFNwZWNpYWwgfX1cclxuICAgICAgICA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPCEtLSBUT0RPOiBFbmFibGUgR29vZ2xlIENhcHRjaGEgLS0+XHJcbiAgPCEtLSA8ZGl2IGNsYXNzPVwicm93IHctMTAwIG5vLWd1dHRlcnNcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgPHJlLWNhcHRjaGEgc2l0ZV9rZXk9XCI2TGRCdEFrVUFBQUFBQjJfbF9UT3o3b1ptVExYYUZqUDFjeG51NHlNXCJcclxuICAgICAgICAoY2FwdGNoYVJlc3BvbnNlKT1cImhhbmRsZUNvcnJlY3RDYXB0Y2hhKCRldmVudClcIj5cclxuICAgICAgPC9yZS1jYXB0Y2hhPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+IC0tPlxyXG4gIDxkaXYgY2xhc3M9XCJwdC0wIHBiLTQgcHgtNFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInJvdyB3LTEwMCBuby1ndXR0ZXJzXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wgdGV4dC1yaWdodFwiPlxyXG4gICAgICAgIDxidXR0b24gY29sb3I9XCJwcmltYXJ5XCIgbWF0LXJhaXNlZC1idXR0b24gY2xhc3M9XCJzbWFsbCB0ZXh0LXVwcGVyY2FzZVwiIHR5cGU9XCJzdWJtaXRcIiBbZGlzYWJsZWRdPVwiIWZvcm1Hcm91cC52YWxpZFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmJ1dHRvbi5zZW5kIH19XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZm9ybT5gLFxyXG4gIHN0eWxlczogW2AuZ3JlZW4tcG9saWN5e2NvbG9yOmdyZWVufS5yZWQtcG9saWN5e2NvbG9yOnJlZH0uY2hlY2stcG9saWN5e2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXJ9LmNoZWNrLXBvbGljeSAubWF0LWljb257bWFyZ2luLXJpZ2h0OjRweDtmb250LXNpemU6MjJweDtoZWlnaHQ6MjJweDt3aWR0aDoyMnB4fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQd2RGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveVxyXG57XHJcbiAgcHVibGljICAgIGZvcm1Hcm91cCAgICA6IEZvcm1Hcm91cDtcclxuICBwdWJsaWMgICAgc2hvd1Bhc3N3b3JkIDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIC8vIHB1YmxpYyBjYXB0Y2hhVG9rZW4gOiBzdHJpbmc7IC8vIFRPRE86XHJcblxyXG4gIC8vIExhYmVsc1xyXG4gIEBJbnB1dCgpICBsYWJlbHMgICAgICAgOiBhbnk7XHJcbiAgLy8gRXJyb3JzXHJcbiAgQElucHV0KCkgIGVycm9ycyAgICAgICA6IGFueTtcclxuICAvLyBJbnB1dHNcclxuICBASW5wdXQoKSAgaW5wdXRzICAgICAgIDogYW55O1xyXG5cclxuICAvLyBGaXJzdCBjb25uZWN0aW9uIG9yIEZvcmdvdCBwYXNzd29yZFxyXG4gIEBJbnB1dCgpICBpc0ZpcnN0ICAgICAgOiBib29sZWFuO1xyXG4gIC8vIFBhc3N3b3JkIHBvbGljaWVzXHJcbiAgQElucHV0KCkgIHB3ZFBvbGljaWVzICA6IGFueTtcclxuICAvLyBFdmVudCBzZW50IHRvIHRoZSBsb2dpbiBmb3JtIGFuZCByZWxheWVkIHBhcmVudHMgKG1vZGFsICYgdGFiKVxyXG4gIEBPdXRwdXQoKSBmaXJzdENvbm5lY3Rpb24gOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgbG9zdFBhc3N3b3JkICAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yXHJcbiAgKFxyXG4gICAgcHJpdmF0ZSBidWlsZGVyIDogRm9ybUJ1aWxkZXJcclxuICApXHJcbiAge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5pbml0Rm9ybUdyb3VwcygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXMgOiBTaW1wbGVDaGFuZ2VzKSA6IHZvaWRcclxuICB7XHJcbiAgICBpZihjaGFuZ2VzLnB3ZFBvbGljaWVzKVxyXG4gICAgICB0aGlzLmluaXRGb3JtR3JvdXBzKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCkgOiB2b2lkXHJcbiAge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbmQoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZXZlbnQgOiBhbnkgPSB7fTtcclxuXHJcbiAgICBsZXQgdmVyaWZDb2RlICAgOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgbGV0IG5ld1Bhc3N3b3JkIDogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICB2ZXJpZkNvZGUgICAgICAgPSB0aGlzLmZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUudmFsdWU7XHJcbiAgICBuZXdQYXNzd29yZCAgICAgPSB0aGlzLmZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC52YWx1ZTtcclxuXHJcbiAgICBldmVudC5wYXNzd29yZCA9IG5ld1Bhc3N3b3JkO1xyXG5cclxuICAgIC8vIEZpcnN0IGNvbm5lY3Rpb25cclxuICAgIGlmKHRoaXMuaXNGaXJzdClcclxuICAgIHtcclxuICAgICAgdGhpcy5maXJzdENvbm5lY3Rpb24uZW1pdChldmVudCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBldmVudC5jb2RlID0gdmVyaWZDb2RlO1xyXG4gICAgLy8gTG9zdCBwYXNzd29yZFxyXG4gICAgdGhpcy5sb3N0UGFzc3dvcmQuZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRGb3JtR3JvdXBzKHJlZnJlc2ggOiBib29sZWFuID0gZmFsc2UpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCB2ZXJpZkNvZGUgICA6IHN0cmluZyA9IG51bGw7XHJcbiAgICBsZXQgbmV3UGFzc3dvcmQgOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIGlmKHJlZnJlc2ggJiYgdGhpcy5mb3JtR3JvdXApXHJcbiAgICB7XHJcbiAgICAgIHZlcmlmQ29kZSAgID0gdGhpcy5mb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLnZhbHVlO1xyXG4gICAgICBuZXdQYXNzd29yZCA9IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB2YWxpZGF0b3JzIDogYW55ID0gW107XHJcblxyXG4gICAgaWYodGhpcy5wd2RQb2xpY2llcy5jaGFyKVxyXG4gICAgICB2YWxpZGF0b3JzLnB1c2goUHdkVmFsaWRhdG9yLmNoYXIpO1xyXG4gICAgaWYodGhpcy5wd2RQb2xpY2llcy5udW1iZXIpXHJcbiAgICAgIHZhbGlkYXRvcnMucHVzaChQd2RWYWxpZGF0b3IubnVtYmVyKTtcclxuICAgIGlmKHRoaXMucHdkUG9saWNpZXMudXBwZXIpXHJcbiAgICAgIHZhbGlkYXRvcnMucHVzaChQd2RWYWxpZGF0b3IudXBwZXIpO1xyXG4gICAgaWYodGhpcy5wd2RQb2xpY2llcy5sb3dlcilcclxuICAgICAgdmFsaWRhdG9ycy5wdXNoKFB3ZFZhbGlkYXRvci5sb3dlcik7XHJcblxyXG4gICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xyXG4gICAgdmFsaWRhdG9ycy5wdXNoKFB3ZFZhbGlkYXRvci5sb25nRW5vdWdoKHRoaXMucHdkUG9saWNpZXMucmFuZ2UubWluLCB0aGlzLnB3ZFBvbGljaWVzLnJhbmdlLm1heCkpO1xyXG5cclxuICAgIC8vIFJlZnJlc2ggbWluIG1heCBsYWJlbFxyXG4gICAgbGV0IHJhbmdlTGFiZWwgOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcmFuZ2VMYWJlbCA9IHRoaXMubGFiZWxzLnBvbGljeS5wd2RMZW5ndGg7XHJcbiAgICByYW5nZUxhYmVsID0gcmFuZ2VMYWJlbC5yZXBsYWNlKC97e21pbn19LywgdGhpcy5wd2RQb2xpY2llcy5yYW5nZS5taW4pO1xyXG4gICAgcmFuZ2VMYWJlbCA9IHJhbmdlTGFiZWwucmVwbGFjZSgve3ttYXh9fS8sIHRoaXMucHdkUG9saWNpZXMucmFuZ2UubWF4KTtcclxuICAgIHRoaXMubGFiZWxzLnBvbGljeS5wd2RMZW5ndGhSZXBsYWNlZCA9IHJhbmdlTGFiZWw7XHJcblxyXG4gICAgdGhpcy5mb3JtR3JvdXAgPSB0aGlzLmJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICB2ZXJpZkNvZGUgICAgOiBuZXcgRm9ybUNvbnRyb2woe1xyXG4gICAgICAgIHZhbHVlICAgICAgOiB2ZXJpZkNvZGUsXHJcbiAgICAgICAgZGlzYWJsZWQgICA6IGZhbHNlXHJcbiAgICAgIH0pLFxyXG4gICAgICBuZXdQYXNzd29yZCAgOiBuZXcgRm9ybUNvbnRyb2woe1xyXG4gICAgICAgIHZhbHVlICAgICAgOiBuZXdQYXNzd29yZCxcclxuICAgICAgICBkaXNhYmxlZCAgIDogZmFsc2VcclxuICAgICAgfSwgdmFsaWRhdG9ycyksXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZighdGhpcy5pc0ZpcnN0KVxyXG4gICAgICB0aGlzLmZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUuc2V0VmFsaWRhdG9ycyhbVmFsaWRhdG9ycy5yZXF1aXJlZF0pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19