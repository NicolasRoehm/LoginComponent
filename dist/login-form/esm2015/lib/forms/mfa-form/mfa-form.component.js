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
export class MfaFormComponent {
    /**
     * @param {?} builder
     */
    constructor(builder) {
        this.builder = builder;
        // Event sent to the login form and relayed parents (modal & tab)
        this.sendMfa = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initFormGroups();
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
        verifCode = this.formGroup.controls["verifCode"].value;
        event.code = verifCode;
        this.sendMfa.emit(event);
    }
    /**
     * @return {?}
     */
    initFormGroups() {
        this.formGroup = this.builder.group({
            verifCode: new FormControl({
                value: null,
                disabled: false
            }, [Validators.required]),
        });
    }
}
MfaFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'cal-mfa-form',
                template: `<form (ngSubmit)="send()" [formGroup]="formGroup" autocomplete="off">
  <mat-form-field class="w-100">
    <input matInput formControlName="verifCode" 
      name="verifCode" placeholder="{{ labels.input.verifCode }}" 
      pattern="\\d{6}" 
      type="text"/> <!-- NOTE: Pattern matches 6 digits -->
    <button *ngIf="formGroup.controls.verifCode.valid && inputs.clearCodeOnMfaForm" 
      mat-button matSuffix mat-icon-button aria-label="Clear" 
      color="primary" (click)="formGroup.controls.verifCode.setValue('')" 
      type="button">
      <mat-icon>close</mat-icon>
    </button>
    <!-- NOTE: Error messages -->
    <mat-hint align="start" *ngIf="formGroup.controls.verifCode.errors?.required && errors.mfa">
      {{ labels.policy.required }}
    </mat-hint>
    <mat-hint align="start" *ngIf="formGroup.controls.verifCode.errors?.pattern && errors.mfa">
      {{ labels.policy.sixDigits }}
    </mat-hint>
  </mat-form-field>
  <div class="row w-100 no-gutters">
    <div class="col text-right">
      <button color="primary" mat-raised-button class="small text-uppercase" type="submit" [disabled]="!formGroup.valid">
        {{ labels.button.send }}
      </button>
    </div>
  </div>
</form>`,
                styles: [``]
            },] },
];
/** @nocollapse */
MfaFormComponent.ctorParameters = () => [
    { type: FormBuilder, },
];
MfaFormComponent.propDecorators = {
    "labels": [{ type: Input },],
    "errors": [{ type: Input },],
    "inputs": [{ type: Input },],
    "sendMfa": [{ type: Output },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWZhLWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vIiwic291cmNlcyI6WyJsaWIvZm9ybXMvbWZhLWZvcm0vbWZhLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQVMsZUFBZSxDQUFDO0FBRTdDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBYSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFZLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTyxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU8sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFRLGdCQUFnQixDQUFDO0FBa0M5QyxNQUFNOzs7O0lBY0osWUFFVTtRQUFBLFlBQU8sR0FBUCxPQUFPOzt1QkFKNEIsSUFBSSxZQUFZLEVBQUU7S0FPOUQ7Ozs7SUFFTSxRQUFRO1FBRWIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOzs7OztJQUdqQixXQUFXOzs7OztJQUlYLElBQUk7UUFFVCxxQkFBSSxLQUFLLEdBQWdCLEVBQUUsQ0FBQztRQUM1QixxQkFBSSxTQUFTLEdBQVksSUFBSSxDQUFDO1FBRTlCLFNBQVMsR0FBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsY0FBVyxLQUFLLENBQUM7UUFDckQsS0FBSyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7O0lBR25CLGNBQWM7UUFFcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNsQyxTQUFTLEVBQUcsSUFBSSxXQUFXLENBQUM7Z0JBQzFCLEtBQUssRUFBUSxJQUFJO2dCQUNqQixRQUFRLEVBQUssS0FBSzthQUNuQixFQUFFLENBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBRSxDQUFDO1NBQzVCLENBQUMsQ0FBQzs7OztZQS9FTixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFNLGNBQWM7Z0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBMkJKO2dCQUNOLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNiOzs7O1lBbENRLFdBQVc7Ozt1QkF3Q2pCLEtBQUs7dUJBRUwsS0FBSzt1QkFFTCxLQUFLO3dCQUdMLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBbmd1bGFyIG1vZHVsZXNcclxuaW1wb3J0IHsgT25Jbml0IH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9ICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPbkRlc3Ryb3kgfSAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSW5wdXQgfSAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE91dHB1dCB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAgfSAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVmFsaWRhdG9ycyB9ICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3IgICAgOiAnY2FsLW1mYS1mb3JtJyxcclxuICB0ZW1wbGF0ZTogYDxmb3JtIChuZ1N1Ym1pdCk9XCJzZW5kKClcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxyXG4gIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cInctMTAwXCI+XHJcbiAgICA8aW5wdXQgbWF0SW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwidmVyaWZDb2RlXCIgXHJcbiAgICAgIG5hbWU9XCJ2ZXJpZkNvZGVcIiBwbGFjZWhvbGRlcj1cInt7IGxhYmVscy5pbnB1dC52ZXJpZkNvZGUgfX1cIiBcclxuICAgICAgcGF0dGVybj1cIlxcXFxkezZ9XCIgXHJcbiAgICAgIHR5cGU9XCJ0ZXh0XCIvPiA8IS0tIE5PVEU6IFBhdHRlcm4gbWF0Y2hlcyA2IGRpZ2l0cyAtLT5cclxuICAgIDxidXR0b24gKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLnZhbGlkICYmIGlucHV0cy5jbGVhckNvZGVPbk1mYUZvcm1cIiBcclxuICAgICAgbWF0LWJ1dHRvbiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJDbGVhclwiIFxyXG4gICAgICBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS5zZXRWYWx1ZSgnJylcIiBcclxuICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgPC9idXR0b24+XHJcbiAgICA8IS0tIE5PVEU6IEVycm9yIG1lc3NhZ2VzIC0tPlxyXG4gICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUuZXJyb3JzPy5yZXF1aXJlZCAmJiBlcnJvcnMubWZhXCI+XHJcbiAgICAgIHt7IGxhYmVscy5wb2xpY3kucmVxdWlyZWQgfX1cclxuICAgIDwvbWF0LWhpbnQ+XHJcbiAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS5lcnJvcnM/LnBhdHRlcm4gJiYgZXJyb3JzLm1mYVwiPlxyXG4gICAgICB7eyBsYWJlbHMucG9saWN5LnNpeERpZ2l0cyB9fVxyXG4gICAgPC9tYXQtaGludD5cclxuICA8L21hdC1mb3JtLWZpZWxkPlxyXG4gIDxkaXYgY2xhc3M9XCJyb3cgdy0xMDAgbm8tZ3V0dGVyc1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbCB0ZXh0LXJpZ2h0XCI+XHJcbiAgICAgIDxidXR0b24gY29sb3I9XCJwcmltYXJ5XCIgbWF0LXJhaXNlZC1idXR0b24gY2xhc3M9XCJzbWFsbCB0ZXh0LXVwcGVyY2FzZVwiIHR5cGU9XCJzdWJtaXRcIiBbZGlzYWJsZWRdPVwiIWZvcm1Hcm91cC52YWxpZFwiPlxyXG4gICAgICAgIHt7IGxhYmVscy5idXR0b24uc2VuZCB9fVxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Zvcm0+YCxcclxuICBzdHlsZXM6IFtgYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1mYUZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxyXG57XHJcbiAgcHVibGljICAgIGZvcm1Hcm91cCAgICA6IEZvcm1Hcm91cDtcclxuXHJcbiAgLy8gTGFiZWxzXHJcbiAgQElucHV0KCkgIGxhYmVscyAgICAgICA6IGFueTtcclxuICAvLyBFcnJvcnNcclxuICBASW5wdXQoKSAgZXJyb3JzICAgICAgIDogYW55O1xyXG4gIC8vIElucHV0c1xyXG4gIEBJbnB1dCgpICBpbnB1dHMgICAgICAgOiBhbnk7XHJcblxyXG4gIC8vIEV2ZW50IHNlbnQgdG8gdGhlIGxvZ2luIGZvcm0gYW5kIHJlbGF5ZWQgcGFyZW50cyAobW9kYWwgJiB0YWIpXHJcbiAgQE91dHB1dCgpIHNlbmRNZmEgICAgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3RvclxyXG4gIChcclxuICAgIHByaXZhdGUgYnVpbGRlciA6IEZvcm1CdWlsZGVyXHJcbiAgKVxyXG4gIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuaW5pdEZvcm1Hcm91cHMoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIDogdm9pZFxyXG4gIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZW5kKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgbGV0IGV2ZW50ICAgICA6IGFueSAgICA9IHt9O1xyXG4gICAgbGV0IHZlcmlmQ29kZSA6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gICAgdmVyaWZDb2RlICA9IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS52YWx1ZTtcclxuICAgIGV2ZW50LmNvZGUgPSB2ZXJpZkNvZGU7XHJcbiAgICB0aGlzLnNlbmRNZmEuZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRGb3JtR3JvdXBzKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5mb3JtR3JvdXAgPSB0aGlzLmJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICB2ZXJpZkNvZGUgOiBuZXcgRm9ybUNvbnRyb2woe1xyXG4gICAgICAgIHZhbHVlICAgICAgOiBudWxsLFxyXG4gICAgICAgIGRpc2FibGVkICAgOiBmYWxzZVxyXG4gICAgICB9LCBbIFZhbGlkYXRvcnMucmVxdWlyZWQgXSksXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==