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
var MfaSetupFormComponent = /** @class */ (function () {
    function MfaSetupFormComponent(builder) {
        this.builder = builder;
        // Event sent to the login form and relayed parents (modal & tab)
        this.saveMfa = new EventEmitter();
    }
    /**
     * @return {?}
     */
    MfaSetupFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initFormGroups();
    };
    /**
     * @return {?}
     */
    MfaSetupFormComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    MfaSetupFormComponent.prototype.send = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ event = {};
        var /** @type {?} */ verifCode = null;
        verifCode = this.formGroup.controls["verifCode"].value;
        event.code = verifCode;
        this.saveMfa.emit(event);
    };
    /**
     * @return {?}
     */
    MfaSetupFormComponent.prototype.initFormGroups = /**
     * @return {?}
     */
    function () {
        this.formGroup = this.builder.group({
            verifCode: new FormControl({
                value: null,
                disabled: false
            }, [Validators.required]),
        });
    };
    MfaSetupFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cal-mfa-setup-form',
                    template: "<div class=\"code text-center\">\n  <qrcode [qrdata]=\"qrCode\" [size]=\"100\" [level]=\"'L'\"></qrcode>\n  <p class=\"my-3\">{{ code }}</p>\n</div>\n<form (ngSubmit)=\"send()\" [formGroup]=\"formGroup\" autocomplete=\"off\">\n  <mat-form-field class=\"w-100\">\n    <input matInput formControlName=\"verifCode\" \n      name=\"verifCode\" placeholder=\"{{ labels.input.verifCode }}\" \n      pattern=\"\\d{6}\" \n      type=\"text\"/> <!-- NOTE: Pattern matches 6 digits -->\n    <button *ngIf=\"formGroup.controls.verifCode.valid && inputs.clearCodeOnMfaForm\" \n      mat-button matSuffix mat-icon-button aria-label=\"Clear\" \n      color=\"primary\" (click)=\"formGroup.controls.verifCode.setValue('')\" \n      type=\"button\">\n      <mat-icon>close</mat-icon>\n    </button>\n    <!-- NOTE: Error messages -->\n    <mat-hint align=\"start\" *ngIf=\"formGroup.controls.verifCode.errors?.required && errors.mfa\">\n      {{ labels.policy.required }}\n    </mat-hint>\n    <mat-hint align=\"start\" *ngIf=\"formGroup.controls.verifCode.errors?.pattern && errors.mfa\">\n      {{ labels.policy.sixDigits }}\n    </mat-hint>\n  </mat-form-field>\n  <div class=\"row w-100 no-gutters\">\n    <div class=\"col text-right\">\n      <button color=\"primary\" mat-raised-button class=\"small text-uppercase\" type=\"submit\" [disabled]=\"!formGroup.valid\">\n        {{ labels.button.save }}\n      </button>\n    </div>\n  </div>\n</form>",
                    styles: [".code{display:flex;flex-direction:column;align-items:center}"]
                },] },
    ];
    /** @nocollapse */
    MfaSetupFormComponent.ctorParameters = function () { return [
        { type: FormBuilder, },
    ]; };
    MfaSetupFormComponent.propDecorators = {
        "labels": [{ type: Input },],
        "errors": [{ type: Input },],
        "inputs": [{ type: Input },],
        "qrCode": [{ type: Input },],
        "code": [{ type: Input },],
        "saveMfa": [{ type: Output },],
    };
    return MfaSetupFormComponent;
}());
export { MfaSetupFormComponent };
function MfaSetupFormComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MfaSetupFormComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MfaSetupFormComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MfaSetupFormComponent.propDecorators;
    /** @type {?} */
    MfaSetupFormComponent.prototype.formGroup;
    /** @type {?} */
    MfaSetupFormComponent.prototype.labels;
    /** @type {?} */
    MfaSetupFormComponent.prototype.errors;
    /** @type {?} */
    MfaSetupFormComponent.prototype.inputs;
    /** @type {?} */
    MfaSetupFormComponent.prototype.qrCode;
    /** @type {?} */
    MfaSetupFormComponent.prototype.code;
    /** @type {?} */
    MfaSetupFormComponent.prototype.saveMfa;
    /** @type {?} */
    MfaSetupFormComponent.prototype.builder;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWZhLXNldHVwLWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vIiwic291cmNlcyI6WyJsaWIvZm9ybXMvbWZhLXNldHVwLWZvcm0vbWZhLXNldHVwLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQVMsZUFBZSxDQUFDO0FBRTdDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBYSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFZLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTyxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU8sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFRLGdCQUFnQixDQUFDOztJQXVENUMsK0JBRVU7UUFBQSxZQUFPLEdBQVAsT0FBTzs7dUJBSjhCLElBQUksWUFBWSxFQUFFO0tBT2hFOzs7O0lBRU0sd0NBQVE7Ozs7UUFFYixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Ozs7O0lBR2pCLDJDQUFXOzs7Ozs7OztJQUlYLG9DQUFJOzs7O1FBRVQscUJBQUksS0FBSyxHQUFTLEVBQUUsQ0FBQztRQUVyQixxQkFBSSxTQUFTLEdBQVksSUFBSSxDQUFDO1FBRTlCLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsY0FBVyxLQUFLLENBQUM7UUFFcEQsS0FBSyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFFdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7O0lBR25CLDhDQUFjOzs7O1FBRXBCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDbEMsU0FBUyxFQUFHLElBQUksV0FBVyxDQUFDO2dCQUMxQixLQUFLLEVBQVEsSUFBSTtnQkFDakIsUUFBUSxFQUFLLEtBQUs7YUFDbkIsRUFBRSxDQUFFLFVBQVUsQ0FBQyxRQUFRLENBQUUsQ0FBQztTQUM1QixDQUFDLENBQUM7OztnQkF6Rk4sU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBTSxvQkFBb0I7b0JBQ2xDLFFBQVEsRUFBRSwrNUNBK0JKO29CQUNOLE1BQU0sRUFBRSxDQUFDLDhEQUE4RCxDQUFDO2lCQUN6RTs7OztnQkF0Q1EsV0FBVzs7OzJCQTRDakIsS0FBSzsyQkFFTCxLQUFLOzJCQUVMLEtBQUs7MkJBR0wsS0FBSzt5QkFDTCxLQUFLOzRCQUVMLE1BQU07O2dDQS9EVDs7U0FnRGEscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQW5ndWxhciBtb2R1bGVzXHJcbmltcG9ydCB7IE9uSW5pdCB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT25EZXN0cm95IH0gICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElucHV0IH0gICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPdXRwdXQgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwIH0gICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciB9ICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFZhbGlkYXRvcnMgfSAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yICAgIDogJ2NhbC1tZmEtc2V0dXAtZm9ybScsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY29kZSB0ZXh0LWNlbnRlclwiPlxyXG4gIDxxcmNvZGUgW3FyZGF0YV09XCJxckNvZGVcIiBbc2l6ZV09XCIxMDBcIiBbbGV2ZWxdPVwiJ0wnXCI+PC9xcmNvZGU+XHJcbiAgPHAgY2xhc3M9XCJteS0zXCI+e3sgY29kZSB9fTwvcD5cclxuPC9kaXY+XHJcbjxmb3JtIChuZ1N1Ym1pdCk9XCJzZW5kKClcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxyXG4gIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cInctMTAwXCI+XHJcbiAgICA8aW5wdXQgbWF0SW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwidmVyaWZDb2RlXCIgXHJcbiAgICAgIG5hbWU9XCJ2ZXJpZkNvZGVcIiBwbGFjZWhvbGRlcj1cInt7IGxhYmVscy5pbnB1dC52ZXJpZkNvZGUgfX1cIiBcclxuICAgICAgcGF0dGVybj1cIlxcXFxkezZ9XCIgXHJcbiAgICAgIHR5cGU9XCJ0ZXh0XCIvPiA8IS0tIE5PVEU6IFBhdHRlcm4gbWF0Y2hlcyA2IGRpZ2l0cyAtLT5cclxuICAgIDxidXR0b24gKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLnZhbGlkICYmIGlucHV0cy5jbGVhckNvZGVPbk1mYUZvcm1cIiBcclxuICAgICAgbWF0LWJ1dHRvbiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJDbGVhclwiIFxyXG4gICAgICBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS5zZXRWYWx1ZSgnJylcIiBcclxuICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgPC9idXR0b24+XHJcbiAgICA8IS0tIE5PVEU6IEVycm9yIG1lc3NhZ2VzIC0tPlxyXG4gICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUuZXJyb3JzPy5yZXF1aXJlZCAmJiBlcnJvcnMubWZhXCI+XHJcbiAgICAgIHt7IGxhYmVscy5wb2xpY3kucmVxdWlyZWQgfX1cclxuICAgIDwvbWF0LWhpbnQ+XHJcbiAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS5lcnJvcnM/LnBhdHRlcm4gJiYgZXJyb3JzLm1mYVwiPlxyXG4gICAgICB7eyBsYWJlbHMucG9saWN5LnNpeERpZ2l0cyB9fVxyXG4gICAgPC9tYXQtaGludD5cclxuICA8L21hdC1mb3JtLWZpZWxkPlxyXG4gIDxkaXYgY2xhc3M9XCJyb3cgdy0xMDAgbm8tZ3V0dGVyc1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbCB0ZXh0LXJpZ2h0XCI+XHJcbiAgICAgIDxidXR0b24gY29sb3I9XCJwcmltYXJ5XCIgbWF0LXJhaXNlZC1idXR0b24gY2xhc3M9XCJzbWFsbCB0ZXh0LXVwcGVyY2FzZVwiIHR5cGU9XCJzdWJtaXRcIiBbZGlzYWJsZWRdPVwiIWZvcm1Hcm91cC52YWxpZFwiPlxyXG4gICAgICAgIHt7IGxhYmVscy5idXR0b24uc2F2ZSB9fVxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Zvcm0+YCxcclxuICBzdHlsZXM6IFtgLmNvZGV7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjthbGlnbi1pdGVtczpjZW50ZXJ9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1mYVNldHVwRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XHJcbntcclxuICBwdWJsaWMgICAgZm9ybUdyb3VwICAgICAgOiBGb3JtR3JvdXA7XHJcblxyXG4gIC8vIExhYmVsc1xyXG4gIEBJbnB1dCgpICBsYWJlbHMgICAgICAgICA6IGFueTtcclxuICAvLyBFcnJvcnNcclxuICBASW5wdXQoKSAgZXJyb3JzICAgICAgICAgOiBhbnk7XHJcbiAgLy8gSW5wdXRzXHJcbiAgQElucHV0KCkgIGlucHV0cyAgICAgICAgIDogYW55O1xyXG5cclxuICAvLyBNRkEgc2VjcmV0IGtleVxyXG4gIEBJbnB1dCgpICBxckNvZGUgICAgICAgICA6IHN0cmluZztcclxuICBASW5wdXQoKSAgY29kZSAgICAgICAgICAgOiBzdHJpbmc7XHJcbiAgLy8gRXZlbnQgc2VudCB0byB0aGUgbG9naW4gZm9ybSBhbmQgcmVsYXllZCBwYXJlbnRzIChtb2RhbCAmIHRhYilcclxuICBAT3V0cHV0KCkgc2F2ZU1mYSAgICAgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3JcclxuICAoXHJcbiAgICBwcml2YXRlIGJ1aWxkZXIgOiBGb3JtQnVpbGRlclxyXG4gIClcclxuICB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmluaXRGb3JtR3JvdXBzKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSA6IHZvaWRcclxuICB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VuZCgpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBldmVudCA6IGFueSA9IHt9O1xyXG5cclxuICAgIGxldCB2ZXJpZkNvZGUgOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIHZlcmlmQ29kZSA9IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS52YWx1ZTtcclxuXHJcbiAgICBldmVudC5jb2RlID0gdmVyaWZDb2RlO1xyXG5cclxuICAgIHRoaXMuc2F2ZU1mYS5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEZvcm1Hcm91cHMoKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmZvcm1Hcm91cCA9IHRoaXMuYnVpbGRlci5ncm91cCh7XHJcbiAgICAgIHZlcmlmQ29kZSA6IG5ldyBGb3JtQ29udHJvbCh7XHJcbiAgICAgICAgdmFsdWUgICAgICA6IG51bGwsXHJcbiAgICAgICAgZGlzYWJsZWQgICA6IGZhbHNlXHJcbiAgICAgIH0sIFsgVmFsaWRhdG9ycy5yZXF1aXJlZCBdKSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19