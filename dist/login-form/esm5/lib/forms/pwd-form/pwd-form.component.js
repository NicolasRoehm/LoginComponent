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
var PwdFormComponent = /** @class */ (function () {
    function PwdFormComponent(builder) {
        this.builder = builder;
        this.showPassword = false;
        // Event sent to the login form and relayed parents (modal & tab)
        this.firstConnection = new EventEmitter();
        this.lostPassword = new EventEmitter();
    }
    /**
     * @return {?}
     */
    PwdFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initFormGroups();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PwdFormComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["pwdPolicies"])
            this.initFormGroups(true);
    };
    /**
     * @return {?}
     */
    PwdFormComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    PwdFormComponent.prototype.send = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ event = {};
        var /** @type {?} */ verifCode = null;
        var /** @type {?} */ newPassword = null;
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
    };
    /**
     * @param {?=} refresh
     * @return {?}
     */
    PwdFormComponent.prototype.initFormGroups = /**
     * @param {?=} refresh
     * @return {?}
     */
    function (refresh) {
        if (refresh === void 0) { refresh = false; }
        var /** @type {?} */ verifCode = null;
        var /** @type {?} */ newPassword = null;
        if (refresh && this.formGroup) {
            verifCode = this.formGroup.controls["verifCode"].value;
            newPassword = this.formGroup.controls["newPassword"].value;
        }
        var /** @type {?} */ validators = [];
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
        var /** @type {?} */ rangeLabel = null;
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
    };
    PwdFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cal-pwd-form',
                    template: "<!-- NOTE: <form autocomplete=\"off\"> will turn off autocomplete for the form in most browsers\n     except for username/email/password fields -->\n<form (ngSubmit)=\"send()\" [formGroup]=\"formGroup\" autocomplete=\"off\">\n\n  <!-- NOTE: fake fields are a workaround for chrome/opera autofill getting the wrong fields -->\n  <input id=\"username\" style=\"display:none\" type=\"text\" name=\"fakeusernameremembered\">\n  <input id=\"password\" style=\"display:none\" type=\"password\" name=\"fakepasswordremembered\">\n\n  <div class=\"row w-100 no-gutters\" *ngIf=\"!isFirst\">\n    <div class=\"col\">\n      <mat-form-field class=\"w-100\">\n        <!-- NOTE: <input autocomplete=\"nope\"> turns off autocomplete on many other browsers that don't respect\n          the form's \"off\", but not for \"password\" inputs. -->\n        <input matInput formControlName=\"verifCode\" \n          name=\"verif-code\" autocomplete=\"nope\" \n          placeholder=\"{{ labels.input.verifCode }}\" \n          pattern=\"\\d{6}\" \n          type=\"text\"/> <!-- NOTE: Pattern matches any non-whitespace character -->\n        <button *ngIf=\"formGroup.controls.verifCode.valid && inputs.clearCodeOnPwdForm\" \n          mat-button matSuffix mat-icon-button aria-label=\"Clear\" \n          color=\"primary\" (click)=\"formGroup.controls.verifCode.setValue('')\" \n          type=\"button\">\n          <mat-icon>close</mat-icon>\n        </button>\n        <!-- NOTE: Error messages -->\n        <mat-hint align=\"start\" *ngIf=\"formGroup.controls.verifCode.errors?.required && errors.pwd\">\n          {{ labels.policy.required }}\n        </mat-hint>\n        <mat-hint align=\"start\" *ngIf=\"formGroup.controls.verifCode.errors?.pattern && errors.pwd\">\n          {{ labels.policy.sixDigits }}\n        </mat-hint>\n      </mat-form-field>\n    </div>\n  </div>\n  <!-- NOTE: <input type=\"password\" autocomplete=\"new-password\" will turn it off for passwords everywhere -->\n  <div class=\"row w-100 no-gutters\">\n    <div class=\"col\">\n      <mat-form-field class=\"w-100\">\n        <input matInput formControlName=\"newPassword\" \n          name=\"new-password\" autocomplete=\"new-password\" \n          placeholder=\"{{ labels.input.newPassword }}\" \n          type=\"{{ showPassword ? 'text' : 'password' }}\"/>\n        <button *ngIf=\"inputs.showPwdOnPwdForm\" \n          mat-button matSuffix mat-icon-button aria-label=\"Clear\" \n          color=\"primary\" (click)=\"showPassword=!showPassword\" \n          type=\"button\">\n          <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>\n        </button>\n        <!-- NOTE: Error message -->\n        <mat-hint align=\"start\" *ngIf=\"formGroup.controls.newPassword.errors?.required && errors.pwd\">\n          {{ labels.policy.required }}\n        </mat-hint>\n      </mat-form-field>\n    </div>\n  </div>\n  <div class=\"row w-100 no-gutters\">\n    <div class=\"col\">\n      <ul class=\"list-unstyled small\">\n        <li class=\"check-policy\">\n          <mat-icon class=\"red-policy\" *ngIf=\"formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.longEnough\">close</mat-icon>\n          <mat-icon class=\"green-policy\" *ngIf=\"!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.longEnough\">check</mat-icon>\n          {{ labels.policy.pwdLengthReplaced }}\n        </li>\n        <li class=\"check-policy\" *ngIf=\"pwdPolicies.upper\">\n          <mat-icon class=\"red-policy\" *ngIf=\"formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.upper\">close</mat-icon>\n          <mat-icon class=\"green-policy\" *ngIf=\"!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.upper\">check</mat-icon>\n          {{ labels.policy.pwdUppercase }}\n        </li>\n        <li class=\"check-policy\" *ngIf=\"pwdPolicies.lower\">\n          <mat-icon class=\"red-policy\" *ngIf=\"formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.lower\">close</mat-icon>\n          <mat-icon class=\"green-policy\" *ngIf=\"!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.lower\">check</mat-icon>\n          {{ labels.policy.pwdLowercase }}\n        </li>\n        <li class=\"check-policy\" *ngIf=\"pwdPolicies.number\">\n          <mat-icon class=\"red-policy\" *ngIf=\"formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.number\">close</mat-icon>\n          <mat-icon class=\"green-policy\" *ngIf=\"!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.number\">check</mat-icon>\n          {{ labels.policy.pwdNumber }}\n        </li>\n        <li class=\"check-policy\" *ngIf=\"pwdPolicies.char\">\n          <mat-icon class=\"red-policy\" *ngIf=\"formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.char\">close</mat-icon>\n          <mat-icon class=\"green-policy\" *ngIf=\"!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.char\">check</mat-icon>\n          {{ labels.policy.pwdSpecial }}\n        </li>\n      </ul>\n    </div>\n  </div>\n  <!-- TODO: Enable Google Captcha -->\n  <!-- <div class=\"row w-100 no-gutters\">\n    <div class=\"col\">\n      <re-captcha site_key=\"6LdBtAkUAAAAAB2_l_TOz7oZmTLXaFjP1cxnu4yM\"\n        (captchaResponse)=\"handleCorrectCaptcha($event)\">\n      </re-captcha>\n    </div>\n  </div> -->\n  <div class=\"pt-0 pb-4 px-4\">\n    <div class=\"row w-100 no-gutters\">\n      <div class=\"col text-right\">\n        <button color=\"primary\" mat-raised-button class=\"small text-uppercase\" type=\"submit\" [disabled]=\"!formGroup.valid\">\n          {{ labels.button.send }}\n        </button>\n      </div>\n    </div>\n  </div>\n</form>",
                    styles: [".green-policy{color:green}.red-policy{color:red}.check-policy{display:flex;align-items:center}.check-policy .mat-icon{margin-right:4px;font-size:22px;height:22px;width:22px}"]
                },] },
    ];
    /** @nocollapse */
    PwdFormComponent.ctorParameters = function () { return [
        { type: FormBuilder, },
    ]; };
    PwdFormComponent.propDecorators = {
        "labels": [{ type: Input },],
        "errors": [{ type: Input },],
        "inputs": [{ type: Input },],
        "isFirst": [{ type: Input },],
        "pwdPolicies": [{ type: Input },],
        "firstConnection": [{ type: Output },],
        "lostPassword": [{ type: Output },],
    };
    return PwdFormComponent;
}());
export { PwdFormComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHdkLWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vIiwic291cmNlcyI6WyJsaWIvZm9ybXMvcHdkLWZvcm0vcHdkLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFJQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQVUsZUFBZSxDQUFDO0FBRTlDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBYyxlQUFlLENBQUM7QUFDOUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFhLGVBQWUsQ0FBQztBQUM5QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU8sZUFBZSxDQUFDO0FBQzlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBUSxnQkFBZ0IsQ0FBQztBQUUvQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQVEsZ0JBQWdCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFTLGdCQUFnQixDQUFDO0FBRy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTyxnQ0FBZ0MsQ0FBQzs7SUFtSTdELDBCQUVVO1FBQUEsWUFBTyxHQUFQLE9BQU87NEJBcEJrQixLQUFLOzsrQkFlUSxJQUFJLFlBQVksRUFBRTs0QkFDbEIsSUFBSSxZQUFZLEVBQUU7S0FPakU7Ozs7SUFFTSxtQ0FBUTs7OztRQUViLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7Ozs7O0lBR2pCLHNDQUFXOzs7O2NBQUMsT0FBdUI7UUFFeEMsRUFBRSxDQUFBLENBQUMsT0FBTztZQUNSLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7Ozs7O0lBR3ZCLHNDQUFXOzs7Ozs7OztJQUlYLCtCQUFJOzs7O1FBRVQscUJBQUksS0FBSyxHQUFTLEVBQUUsQ0FBQztRQUVyQixxQkFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDO1FBQ2hDLHFCQUFJLFdBQVcsR0FBWSxJQUFJLENBQUM7UUFFaEMsU0FBUyxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxjQUFXLEtBQUssQ0FBQztRQUMxRCxXQUFXLEdBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLGdCQUFhLEtBQUssQ0FBQztRQUU1RCxLQUFLLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQzs7UUFHN0IsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUNoQixDQUFDO1lBQ0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMsTUFBTSxDQUFDO1NBQ1I7UUFFRCxLQUFLLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQzs7UUFFdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7OztJQUd4Qix5Q0FBYzs7OztjQUFDLE9BQXlCO1FBQXpCLHdCQUFBLEVBQUEsZUFBeUI7UUFFOUMscUJBQUksU0FBUyxHQUFjLElBQUksQ0FBQztRQUNoQyxxQkFBSSxXQUFXLEdBQVksSUFBSSxDQUFDO1FBRWhDLEVBQUUsQ0FBQSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQzdCLENBQUM7WUFDQyxTQUFTLEdBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLGNBQVcsS0FBSyxDQUFDO1lBQ3RELFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsZ0JBQWEsS0FBSyxDQUFDO1NBQ3pEO1FBRUQscUJBQUksVUFBVSxHQUFTLEVBQUUsQ0FBQztRQUUxQixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUN2QixVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUN6QixVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUN4QixVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUN4QixVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV0QyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7O1FBR2pHLHFCQUFJLFVBQVUsR0FBWSxJQUFJLENBQUM7UUFDL0IsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUMxQyxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkUsVUFBVSxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGlCQUFpQixHQUFHLFVBQVUsQ0FBQztRQUVsRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ2xDLFNBQVMsRUFBTSxJQUFJLFdBQVcsQ0FBQztnQkFDN0IsS0FBSyxFQUFRLFNBQVM7Z0JBQ3RCLFFBQVEsRUFBSyxLQUFLO2FBQ25CLENBQUM7WUFDRixXQUFXLEVBQUksSUFBSSxXQUFXLENBQUM7Z0JBQzdCLEtBQUssRUFBUSxXQUFXO2dCQUN4QixRQUFRLEVBQUssS0FBSzthQUNuQixFQUFFLFVBQVUsQ0FBQztTQUNmLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxjQUFXLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7Z0JBM041RSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFNLGNBQWM7b0JBQzVCLFFBQVEsRUFBRSwwdExBdUdKO29CQUNOLE1BQU0sRUFBRSxDQUFDLCtLQUErSyxDQUFDO2lCQUMxTDs7OztnQkFqSFEsV0FBVzs7OzJCQXlIakIsS0FBSzsyQkFFTCxLQUFLOzJCQUVMLEtBQUs7NEJBR0wsS0FBSztnQ0FFTCxLQUFLO29DQUVMLE1BQU07aUNBQ04sTUFBTTs7MkJBaEpUOztTQTZIYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBbmd1bGFyIG1vZHVsZXNcclxuaW1wb3J0IHsgT25Jbml0IH0gICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPbkNoYW5nZXMgfSAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPbkRlc3Ryb3kgfSAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElucHV0IH0gICAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT3V0cHV0IH0gICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCB9ICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFZhbGlkYXRvcnMgfSAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG4vLyBJbnRlcm5hbCBtb2R1bGVzXHJcbmltcG9ydCB7IFB3ZFZhbGlkYXRvciB9ICBmcm9tICcuLi8uLi92YWxpZGF0b3JzL3B3ZC52YWxpZGF0b3InO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3IgICAgOiAnY2FsLXB3ZC1mb3JtJyxcclxuICB0ZW1wbGF0ZTogYDwhLS0gTk9URTogPGZvcm0gYXV0b2NvbXBsZXRlPVwib2ZmXCI+IHdpbGwgdHVybiBvZmYgYXV0b2NvbXBsZXRlIGZvciB0aGUgZm9ybSBpbiBtb3N0IGJyb3dzZXJzXHJcbiAgICAgZXhjZXB0IGZvciB1c2VybmFtZS9lbWFpbC9wYXNzd29yZCBmaWVsZHMgLS0+XHJcbjxmb3JtIChuZ1N1Ym1pdCk9XCJzZW5kKClcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxyXG5cclxuICA8IS0tIE5PVEU6IGZha2UgZmllbGRzIGFyZSBhIHdvcmthcm91bmQgZm9yIGNocm9tZS9vcGVyYSBhdXRvZmlsbCBnZXR0aW5nIHRoZSB3cm9uZyBmaWVsZHMgLS0+XHJcbiAgPGlucHV0IGlkPVwidXNlcm5hbWVcIiBzdHlsZT1cImRpc3BsYXk6bm9uZVwiIHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImZha2V1c2VybmFtZXJlbWVtYmVyZWRcIj5cclxuICA8aW5wdXQgaWQ9XCJwYXNzd29yZFwiIHN0eWxlPVwiZGlzcGxheTpub25lXCIgdHlwZT1cInBhc3N3b3JkXCIgbmFtZT1cImZha2VwYXNzd29yZHJlbWVtYmVyZWRcIj5cclxuXHJcbiAgPGRpdiBjbGFzcz1cInJvdyB3LTEwMCBuby1ndXR0ZXJzXCIgKm5nSWY9XCIhaXNGaXJzdFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgICAgIDwhLS0gTk9URTogPGlucHV0IGF1dG9jb21wbGV0ZT1cIm5vcGVcIj4gdHVybnMgb2ZmIGF1dG9jb21wbGV0ZSBvbiBtYW55IG90aGVyIGJyb3dzZXJzIHRoYXQgZG9uJ3QgcmVzcGVjdFxyXG4gICAgICAgICAgdGhlIGZvcm0ncyBcIm9mZlwiLCBidXQgbm90IGZvciBcInBhc3N3b3JkXCIgaW5wdXRzLiAtLT5cclxuICAgICAgICA8aW5wdXQgbWF0SW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwidmVyaWZDb2RlXCIgXHJcbiAgICAgICAgICBuYW1lPVwidmVyaWYtY29kZVwiIGF1dG9jb21wbGV0ZT1cIm5vcGVcIiBcclxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3sgbGFiZWxzLmlucHV0LnZlcmlmQ29kZSB9fVwiIFxyXG4gICAgICAgICAgcGF0dGVybj1cIlxcXFxkezZ9XCIgXHJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiLz4gPCEtLSBOT1RFOiBQYXR0ZXJuIG1hdGNoZXMgYW55IG5vbi13aGl0ZXNwYWNlIGNoYXJhY3RlciAtLT5cclxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS52YWxpZCAmJiBpbnB1dHMuY2xlYXJDb2RlT25Qd2RGb3JtXCIgXHJcbiAgICAgICAgICBtYXQtYnV0dG9uIG1hdFN1ZmZpeCBtYXQtaWNvbi1idXR0b24gYXJpYS1sYWJlbD1cIkNsZWFyXCIgXHJcbiAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS5zZXRWYWx1ZSgnJylcIiBcclxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIj5cclxuICAgICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPCEtLSBOT1RFOiBFcnJvciBtZXNzYWdlcyAtLT5cclxuICAgICAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS5lcnJvcnM/LnJlcXVpcmVkICYmIGVycm9ycy5wd2RcIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kucmVxdWlyZWQgfX1cclxuICAgICAgICA8L21hdC1oaW50PlxyXG4gICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLmVycm9ycz8ucGF0dGVybiAmJiBlcnJvcnMucHdkXCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnNpeERpZ2l0cyB9fVxyXG4gICAgICAgIDwvbWF0LWhpbnQ+XHJcbiAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8IS0tIE5PVEU6IDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBhdXRvY29tcGxldGU9XCJuZXctcGFzc3dvcmRcIiB3aWxsIHR1cm4gaXQgb2ZmIGZvciBwYXNzd29yZHMgZXZlcnl3aGVyZSAtLT5cclxuICA8ZGl2IGNsYXNzPVwicm93IHctMTAwIG5vLWd1dHRlcnNcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwidy0xMDBcIj5cclxuICAgICAgICA8aW5wdXQgbWF0SW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwibmV3UGFzc3dvcmRcIiBcclxuICAgICAgICAgIG5hbWU9XCJuZXctcGFzc3dvcmRcIiBhdXRvY29tcGxldGU9XCJuZXctcGFzc3dvcmRcIiBcclxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3sgbGFiZWxzLmlucHV0Lm5ld1Bhc3N3b3JkIH19XCIgXHJcbiAgICAgICAgICB0eXBlPVwie3sgc2hvd1Bhc3N3b3JkID8gJ3RleHQnIDogJ3Bhc3N3b3JkJyB9fVwiLz5cclxuICAgICAgICA8YnV0dG9uICpuZ0lmPVwiaW5wdXRzLnNob3dQd2RPblB3ZEZvcm1cIiBcclxuICAgICAgICAgIG1hdC1idXR0b24gbWF0U3VmZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiQ2xlYXJcIiBcclxuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJzaG93UGFzc3dvcmQ9IXNob3dQYXNzd29yZFwiIFxyXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgPG1hdC1pY29uPnt7IHNob3dQYXNzd29yZCA/ICd2aXNpYmlsaXR5X29mZicgOiAndmlzaWJpbGl0eScgfX08L21hdC1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwhLS0gTk9URTogRXJyb3IgbWVzc2FnZSAtLT5cclxuICAgICAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycz8ucmVxdWlyZWQgJiYgZXJyb3JzLnB3ZFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5yZXF1aXJlZCB9fVxyXG4gICAgICAgIDwvbWF0LWhpbnQ+XHJcbiAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwicm93IHctMTAwIG5vLWd1dHRlcnNcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgPHVsIGNsYXNzPVwibGlzdC11bnN0eWxlZCBzbWFsbFwiPlxyXG4gICAgICAgIDxsaSBjbGFzcz1cImNoZWNrLXBvbGljeVwiPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwicmVkLXBvbGljeVwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycyAmJiBmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzLmxvbmdFbm91Z2hcIj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJncmVlbi1wb2xpY3lcIiAqbmdJZj1cIiFmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzIHx8ICFmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzLmxvbmdFbm91Z2hcIj5jaGVjazwvbWF0LWljb24+XHJcbiAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnB3ZExlbmd0aFJlcGxhY2VkIH19XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgICA8bGkgY2xhc3M9XCJjaGVjay1wb2xpY3lcIiAqbmdJZj1cInB3ZFBvbGljaWVzLnVwcGVyXCI+XHJcbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJyZWQtcG9saWN5XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzICYmIGZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMudXBwZXJcIj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJncmVlbi1wb2xpY3lcIiAqbmdJZj1cIiFmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzIHx8ICFmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzLnVwcGVyXCI+Y2hlY2s8L21hdC1pY29uPlxyXG4gICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5wd2RVcHBlcmNhc2UgfX1cclxuICAgICAgICA8L2xpPlxyXG4gICAgICAgIDxsaSBjbGFzcz1cImNoZWNrLXBvbGljeVwiICpuZ0lmPVwicHdkUG9saWNpZXMubG93ZXJcIj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInJlZC1wb2xpY3lcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgJiYgZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycy5sb3dlclwiPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImdyZWVuLXBvbGljeVwiICpuZ0lmPVwiIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgfHwgIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMubG93ZXJcIj5jaGVjazwvbWF0LWljb24+XHJcbiAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnB3ZExvd2VyY2FzZSB9fVxyXG4gICAgICAgIDwvbGk+XHJcbiAgICAgICAgPGxpIGNsYXNzPVwiY2hlY2stcG9saWN5XCIgKm5nSWY9XCJwd2RQb2xpY2llcy5udW1iZXJcIj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInJlZC1wb2xpY3lcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgJiYgZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycy5udW1iZXJcIj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJncmVlbi1wb2xpY3lcIiAqbmdJZj1cIiFmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzIHx8ICFmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzLm51bWJlclwiPmNoZWNrPC9tYXQtaWNvbj5cclxuICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kucHdkTnVtYmVyIH19XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgICA8bGkgY2xhc3M9XCJjaGVjay1wb2xpY3lcIiAqbmdJZj1cInB3ZFBvbGljaWVzLmNoYXJcIj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInJlZC1wb2xpY3lcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgJiYgZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycy5jaGFyXCI+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiZ3JlZW4tcG9saWN5XCIgKm5nSWY9XCIhZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycyB8fCAhZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycy5jaGFyXCI+Y2hlY2s8L21hdC1pY29uPlxyXG4gICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5wd2RTcGVjaWFsIH19XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDwhLS0gVE9ETzogRW5hYmxlIEdvb2dsZSBDYXB0Y2hhIC0tPlxyXG4gIDwhLS0gPGRpdiBjbGFzcz1cInJvdyB3LTEwMCBuby1ndXR0ZXJzXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XHJcbiAgICAgIDxyZS1jYXB0Y2hhIHNpdGVfa2V5PVwiNkxkQnRBa1VBQUFBQUIyX2xfVE96N29abVRMWGFGalAxY3hudTR5TVwiXHJcbiAgICAgICAgKGNhcHRjaGFSZXNwb25zZSk9XCJoYW5kbGVDb3JyZWN0Q2FwdGNoYSgkZXZlbnQpXCI+XHJcbiAgICAgIDwvcmUtY2FwdGNoYT5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PiAtLT5cclxuICA8ZGl2IGNsYXNzPVwicHQtMCBwYi00IHB4LTRcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJyb3cgdy0xMDAgbm8tZ3V0dGVyc1wiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY29sIHRleHQtcmlnaHRcIj5cclxuICAgICAgICA8YnV0dG9uIGNvbG9yPVwicHJpbWFyeVwiIG1hdC1yYWlzZWQtYnV0dG9uIGNsYXNzPVwic21hbGwgdGV4dC11cHBlcmNhc2VcIiB0eXBlPVwic3VibWl0XCIgW2Rpc2FibGVkXT1cIiFmb3JtR3JvdXAudmFsaWRcIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5idXR0b24uc2VuZCB9fVxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Zvcm0+YCxcclxuICBzdHlsZXM6IFtgLmdyZWVuLXBvbGljeXtjb2xvcjpncmVlbn0ucmVkLXBvbGljeXtjb2xvcjpyZWR9LmNoZWNrLXBvbGljeXtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyfS5jaGVjay1wb2xpY3kgLm1hdC1pY29ue21hcmdpbi1yaWdodDo0cHg7Zm9udC1zaXplOjIycHg7aGVpZ2h0OjIycHg7d2lkdGg6MjJweH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHdkRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3lcclxue1xyXG4gIHB1YmxpYyAgICBmb3JtR3JvdXAgICAgOiBGb3JtR3JvdXA7XHJcbiAgcHVibGljICAgIHNob3dQYXNzd29yZCA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAvLyBwdWJsaWMgY2FwdGNoYVRva2VuIDogc3RyaW5nOyAvLyBUT0RPOlxyXG5cclxuICAvLyBMYWJlbHNcclxuICBASW5wdXQoKSAgbGFiZWxzICAgICAgIDogYW55O1xyXG4gIC8vIEVycm9yc1xyXG4gIEBJbnB1dCgpICBlcnJvcnMgICAgICAgOiBhbnk7XHJcbiAgLy8gSW5wdXRzXHJcbiAgQElucHV0KCkgIGlucHV0cyAgICAgICA6IGFueTtcclxuXHJcbiAgLy8gRmlyc3QgY29ubmVjdGlvbiBvciBGb3Jnb3QgcGFzc3dvcmRcclxuICBASW5wdXQoKSAgaXNGaXJzdCAgICAgIDogYm9vbGVhbjtcclxuICAvLyBQYXNzd29yZCBwb2xpY2llc1xyXG4gIEBJbnB1dCgpICBwd2RQb2xpY2llcyAgOiBhbnk7XHJcbiAgLy8gRXZlbnQgc2VudCB0byB0aGUgbG9naW4gZm9ybSBhbmQgcmVsYXllZCBwYXJlbnRzIChtb2RhbCAmIHRhYilcclxuICBAT3V0cHV0KCkgZmlyc3RDb25uZWN0aW9uIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIGxvc3RQYXNzd29yZCAgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3RvclxyXG4gIChcclxuICAgIHByaXZhdGUgYnVpbGRlciA6IEZvcm1CdWlsZGVyXHJcbiAgKVxyXG4gIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuaW5pdEZvcm1Hcm91cHMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzIDogU2ltcGxlQ2hhbmdlcykgOiB2b2lkXHJcbiAge1xyXG4gICAgaWYoY2hhbmdlcy5wd2RQb2xpY2llcylcclxuICAgICAgdGhpcy5pbml0Rm9ybUdyb3Vwcyh0cnVlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIDogdm9pZFxyXG4gIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZW5kKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgbGV0IGV2ZW50IDogYW55ID0ge307XHJcblxyXG4gICAgbGV0IHZlcmlmQ29kZSAgIDogc3RyaW5nID0gbnVsbDtcclxuICAgIGxldCBuZXdQYXNzd29yZCA6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gICAgdmVyaWZDb2RlICAgICAgID0gdGhpcy5mb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLnZhbHVlO1xyXG4gICAgbmV3UGFzc3dvcmQgICAgID0gdGhpcy5mb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQudmFsdWU7XHJcblxyXG4gICAgZXZlbnQucGFzc3dvcmQgPSBuZXdQYXNzd29yZDtcclxuXHJcbiAgICAvLyBGaXJzdCBjb25uZWN0aW9uXHJcbiAgICBpZih0aGlzLmlzRmlyc3QpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuZmlyc3RDb25uZWN0aW9uLmVtaXQoZXZlbnQpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnQuY29kZSA9IHZlcmlmQ29kZTtcclxuICAgIC8vIExvc3QgcGFzc3dvcmRcclxuICAgIHRoaXMubG9zdFBhc3N3b3JkLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0Rm9ybUdyb3VwcyhyZWZyZXNoIDogYm9vbGVhbiA9IGZhbHNlKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgdmVyaWZDb2RlICAgOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgbGV0IG5ld1Bhc3N3b3JkIDogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICBpZihyZWZyZXNoICYmIHRoaXMuZm9ybUdyb3VwKVxyXG4gICAge1xyXG4gICAgICB2ZXJpZkNvZGUgICA9IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS52YWx1ZTtcclxuICAgICAgbmV3UGFzc3dvcmQgPSB0aGlzLmZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgdmFsaWRhdG9ycyA6IGFueSA9IFtdO1xyXG5cclxuICAgIGlmKHRoaXMucHdkUG9saWNpZXMuY2hhcilcclxuICAgICAgdmFsaWRhdG9ycy5wdXNoKFB3ZFZhbGlkYXRvci5jaGFyKTtcclxuICAgIGlmKHRoaXMucHdkUG9saWNpZXMubnVtYmVyKVxyXG4gICAgICB2YWxpZGF0b3JzLnB1c2goUHdkVmFsaWRhdG9yLm51bWJlcik7XHJcbiAgICBpZih0aGlzLnB3ZFBvbGljaWVzLnVwcGVyKVxyXG4gICAgICB2YWxpZGF0b3JzLnB1c2goUHdkVmFsaWRhdG9yLnVwcGVyKTtcclxuICAgIGlmKHRoaXMucHdkUG9saWNpZXMubG93ZXIpXHJcbiAgICAgIHZhbGlkYXRvcnMucHVzaChQd2RWYWxpZGF0b3IubG93ZXIpO1xyXG5cclxuICAgIHZhbGlkYXRvcnMucHVzaChWYWxpZGF0b3JzLnJlcXVpcmVkKTtcclxuICAgIHZhbGlkYXRvcnMucHVzaChQd2RWYWxpZGF0b3IubG9uZ0Vub3VnaCh0aGlzLnB3ZFBvbGljaWVzLnJhbmdlLm1pbiwgdGhpcy5wd2RQb2xpY2llcy5yYW5nZS5tYXgpKTtcclxuXHJcbiAgICAvLyBSZWZyZXNoIG1pbiBtYXggbGFiZWxcclxuICAgIGxldCByYW5nZUxhYmVsIDogc3RyaW5nID0gbnVsbDtcclxuICAgIHJhbmdlTGFiZWwgPSB0aGlzLmxhYmVscy5wb2xpY3kucHdkTGVuZ3RoO1xyXG4gICAgcmFuZ2VMYWJlbCA9IHJhbmdlTGFiZWwucmVwbGFjZSgve3ttaW59fS8sIHRoaXMucHdkUG9saWNpZXMucmFuZ2UubWluKTtcclxuICAgIHJhbmdlTGFiZWwgPSByYW5nZUxhYmVsLnJlcGxhY2UoL3t7bWF4fX0vLCB0aGlzLnB3ZFBvbGljaWVzLnJhbmdlLm1heCk7XHJcbiAgICB0aGlzLmxhYmVscy5wb2xpY3kucHdkTGVuZ3RoUmVwbGFjZWQgPSByYW5nZUxhYmVsO1xyXG5cclxuICAgIHRoaXMuZm9ybUdyb3VwID0gdGhpcy5idWlsZGVyLmdyb3VwKHtcclxuICAgICAgdmVyaWZDb2RlICAgIDogbmV3IEZvcm1Db250cm9sKHtcclxuICAgICAgICB2YWx1ZSAgICAgIDogdmVyaWZDb2RlLFxyXG4gICAgICAgIGRpc2FibGVkICAgOiBmYWxzZVxyXG4gICAgICB9KSxcclxuICAgICAgbmV3UGFzc3dvcmQgIDogbmV3IEZvcm1Db250cm9sKHtcclxuICAgICAgICB2YWx1ZSAgICAgIDogbmV3UGFzc3dvcmQsXHJcbiAgICAgICAgZGlzYWJsZWQgICA6IGZhbHNlXHJcbiAgICAgIH0sIHZhbGlkYXRvcnMpLFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYoIXRoaXMuaXNGaXJzdClcclxuICAgICAgdGhpcy5mb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLnNldFZhbGlkYXRvcnMoW1ZhbGlkYXRvcnMucmVxdWlyZWRdKTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==