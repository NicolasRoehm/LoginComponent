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
var MfaFormComponent = /** @class */ (function () {
    function MfaFormComponent(builder) {
        this.builder = builder;
        // Event sent to the login form and relayed parents (modal & tab)
        this.sendMfa = new EventEmitter();
    }
    /**
     * @return {?}
     */
    MfaFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initFormGroups();
    };
    /**
     * @return {?}
     */
    MfaFormComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    MfaFormComponent.prototype.send = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ event = {};
        var /** @type {?} */ verifCode = null;
        verifCode = this.formGroup.controls["verifCode"].value;
        event.code = verifCode;
        this.sendMfa.emit(event);
    };
    /**
     * @return {?}
     */
    MfaFormComponent.prototype.initFormGroups = /**
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
    MfaFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cal-mfa-form',
                    template: "<form (ngSubmit)=\"send()\" [formGroup]=\"formGroup\" autocomplete=\"off\">\n  <mat-form-field class=\"w-100\">\n    <input matInput formControlName=\"verifCode\" \n      name=\"verifCode\" placeholder=\"{{ labels.input.verifCode }}\" \n      pattern=\"\\d{6}\" \n      type=\"text\"/> <!-- NOTE: Pattern matches 6 digits -->\n    <button *ngIf=\"formGroup.controls.verifCode.valid && inputs.clearCodeOnMfaForm\" \n      mat-button matSuffix mat-icon-button aria-label=\"Clear\" \n      color=\"primary\" (click)=\"formGroup.controls.verifCode.setValue('')\" \n      type=\"button\">\n      <mat-icon>close</mat-icon>\n    </button>\n    <!-- NOTE: Error messages -->\n    <mat-hint align=\"start\" *ngIf=\"formGroup.controls.verifCode.errors?.required && errors.mfa\">\n      {{ labels.policy.required }}\n    </mat-hint>\n    <mat-hint align=\"start\" *ngIf=\"formGroup.controls.verifCode.errors?.pattern && errors.mfa\">\n      {{ labels.policy.sixDigits }}\n    </mat-hint>\n  </mat-form-field>\n  <div class=\"row w-100 no-gutters\">\n    <div class=\"col text-right\">\n      <button color=\"primary\" mat-raised-button class=\"small text-uppercase\" type=\"submit\" [disabled]=\"!formGroup.valid\">\n        {{ labels.button.send }}\n      </button>\n    </div>\n  </div>\n</form>",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    MfaFormComponent.ctorParameters = function () { return [
        { type: FormBuilder, },
    ]; };
    MfaFormComponent.propDecorators = {
        "labels": [{ type: Input },],
        "errors": [{ type: Input },],
        "inputs": [{ type: Input },],
        "sendMfa": [{ type: Output },],
    };
    return MfaFormComponent;
}());
export { MfaFormComponent };
function MfaFormComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MfaFormComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MfaFormComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MfaFormComponent.propDecorators;
    /** @type {?} */
    MfaFormComponent.prototype.formGroup;
    /** @type {?} */
    MfaFormComponent.prototype.labels;
    /** @type {?} */
    MfaFormComponent.prototype.errors;
    /** @type {?} */
    MfaFormComponent.prototype.inputs;
    /** @type {?} */
    MfaFormComponent.prototype.sendMfa;
    /** @type {?} */
    MfaFormComponent.prototype.builder;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWZhLWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vIiwic291cmNlcyI6WyJsaWIvZm9ybXMvbWZhLWZvcm0vbWZhLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQVMsZUFBZSxDQUFDO0FBRTdDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBYSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFZLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTyxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU8sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFRLGdCQUFnQixDQUFDOztJQWdENUMsMEJBRVU7UUFBQSxZQUFPLEdBQVAsT0FBTzs7dUJBSjRCLElBQUksWUFBWSxFQUFFO0tBTzlEOzs7O0lBRU0sbUNBQVE7Ozs7UUFFYixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7Ozs7O0lBR2pCLHNDQUFXOzs7Ozs7OztJQUlYLCtCQUFJOzs7O1FBRVQscUJBQUksS0FBSyxHQUFnQixFQUFFLENBQUM7UUFDNUIscUJBQUksU0FBUyxHQUFZLElBQUksQ0FBQztRQUU5QixTQUFTLEdBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLGNBQVcsS0FBSyxDQUFDO1FBQ3JELEtBQUssQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OztJQUduQix5Q0FBYzs7OztRQUVwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ2xDLFNBQVMsRUFBRyxJQUFJLFdBQVcsQ0FBQztnQkFDMUIsS0FBSyxFQUFRLElBQUk7Z0JBQ2pCLFFBQVEsRUFBSyxLQUFLO2FBQ25CLEVBQUUsQ0FBRSxVQUFVLENBQUMsUUFBUSxDQUFFLENBQUM7U0FDNUIsQ0FBQyxDQUFDOzs7Z0JBL0VOLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQU0sY0FBYztvQkFDNUIsUUFBUSxFQUFFLHl3Q0EyQko7b0JBQ04sTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2lCQUNiOzs7O2dCQWxDUSxXQUFXOzs7MkJBd0NqQixLQUFLOzJCQUVMLEtBQUs7MkJBRUwsS0FBSzs0QkFHTCxNQUFNOzsyQkF4RFQ7O1NBNENhLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIEFuZ3VsYXIgbW9kdWxlc1xyXG5pbXBvcnQgeyBPbkluaXQgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9uRGVzdHJveSB9ICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJbnB1dCB9ICAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT3V0cHV0IH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9ICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCB9ICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3JzIH0gICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvciAgICA6ICdjYWwtbWZhLWZvcm0nLFxyXG4gIHRlbXBsYXRlOiBgPGZvcm0gKG5nU3VibWl0KT1cInNlbmQoKVwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCI+XHJcbiAgPG1hdC1mb3JtLWZpZWxkIGNsYXNzPVwidy0xMDBcIj5cclxuICAgIDxpbnB1dCBtYXRJbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJ2ZXJpZkNvZGVcIiBcclxuICAgICAgbmFtZT1cInZlcmlmQ29kZVwiIHBsYWNlaG9sZGVyPVwie3sgbGFiZWxzLmlucHV0LnZlcmlmQ29kZSB9fVwiIFxyXG4gICAgICBwYXR0ZXJuPVwiXFxcXGR7Nn1cIiBcclxuICAgICAgdHlwZT1cInRleHRcIi8+IDwhLS0gTk9URTogUGF0dGVybiBtYXRjaGVzIDYgZGlnaXRzIC0tPlxyXG4gICAgPGJ1dHRvbiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUudmFsaWQgJiYgaW5wdXRzLmNsZWFyQ29kZU9uTWZhRm9ybVwiIFxyXG4gICAgICBtYXQtYnV0dG9uIG1hdFN1ZmZpeCBtYXQtaWNvbi1idXR0b24gYXJpYS1sYWJlbD1cIkNsZWFyXCIgXHJcbiAgICAgIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLnNldFZhbHVlKCcnKVwiIFxyXG4gICAgICB0eXBlPVwiYnV0dG9uXCI+XHJcbiAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICA8L2J1dHRvbj5cclxuICAgIDwhLS0gTk9URTogRXJyb3IgbWVzc2FnZXMgLS0+XHJcbiAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS5lcnJvcnM/LnJlcXVpcmVkICYmIGVycm9ycy5tZmFcIj5cclxuICAgICAge3sgbGFiZWxzLnBvbGljeS5yZXF1aXJlZCB9fVxyXG4gICAgPC9tYXQtaGludD5cclxuICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLmVycm9ycz8ucGF0dGVybiAmJiBlcnJvcnMubWZhXCI+XHJcbiAgICAgIHt7IGxhYmVscy5wb2xpY3kuc2l4RGlnaXRzIH19XHJcbiAgICA8L21hdC1oaW50PlxyXG4gIDwvbWF0LWZvcm0tZmllbGQ+XHJcbiAgPGRpdiBjbGFzcz1cInJvdyB3LTEwMCBuby1ndXR0ZXJzXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sIHRleHQtcmlnaHRcIj5cclxuICAgICAgPGJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiBtYXQtcmFpc2VkLWJ1dHRvbiBjbGFzcz1cInNtYWxsIHRleHQtdXBwZXJjYXNlXCIgdHlwZT1cInN1Ym1pdFwiIFtkaXNhYmxlZF09XCIhZm9ybUdyb3VwLnZhbGlkXCI+XHJcbiAgICAgICAge3sgbGFiZWxzLmJ1dHRvbi5zZW5kIH19XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZm9ybT5gLFxyXG4gIHN0eWxlczogW2BgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWZhRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XHJcbntcclxuICBwdWJsaWMgICAgZm9ybUdyb3VwICAgIDogRm9ybUdyb3VwO1xyXG5cclxuICAvLyBMYWJlbHNcclxuICBASW5wdXQoKSAgbGFiZWxzICAgICAgIDogYW55O1xyXG4gIC8vIEVycm9yc1xyXG4gIEBJbnB1dCgpICBlcnJvcnMgICAgICAgOiBhbnk7XHJcbiAgLy8gSW5wdXRzXHJcbiAgQElucHV0KCkgIGlucHV0cyAgICAgICA6IGFueTtcclxuXHJcbiAgLy8gRXZlbnQgc2VudCB0byB0aGUgbG9naW4gZm9ybSBhbmQgcmVsYXllZCBwYXJlbnRzIChtb2RhbCAmIHRhYilcclxuICBAT3V0cHV0KCkgc2VuZE1mYSAgICAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yXHJcbiAgKFxyXG4gICAgcHJpdmF0ZSBidWlsZGVyIDogRm9ybUJ1aWxkZXJcclxuICApXHJcbiAge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5pbml0Rm9ybUdyb3VwcygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCkgOiB2b2lkXHJcbiAge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbmQoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZXZlbnQgICAgIDogYW55ICAgID0ge307XHJcbiAgICBsZXQgdmVyaWZDb2RlIDogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICB2ZXJpZkNvZGUgID0gdGhpcy5mb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLnZhbHVlO1xyXG4gICAgZXZlbnQuY29kZSA9IHZlcmlmQ29kZTtcclxuICAgIHRoaXMuc2VuZE1mYS5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEZvcm1Hcm91cHMoKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmZvcm1Hcm91cCA9IHRoaXMuYnVpbGRlci5ncm91cCh7XHJcbiAgICAgIHZlcmlmQ29kZSA6IG5ldyBGb3JtQ29udHJvbCh7XHJcbiAgICAgICAgdmFsdWUgICAgICA6IG51bGwsXHJcbiAgICAgICAgZGlzYWJsZWQgICA6IGZhbHNlXHJcbiAgICAgIH0sIFsgVmFsaWRhdG9ycy5yZXF1aXJlZCBdKSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19