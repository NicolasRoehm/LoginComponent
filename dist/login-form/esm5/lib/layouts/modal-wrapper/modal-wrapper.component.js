/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Forms } from '../../enums/forms.enum';
var ModalWrapperComponent = /** @class */ (function () {
    function ModalWrapperComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.forms = Forms;
        this.relayFirstLog = new EventEmitter();
        this.relayLostPwd = new EventEmitter();
        this.relaySaveMfaKey = new EventEmitter();
        this.relaySendMfaCode = new EventEmitter();
        this.loadParams();
    }
    /**
     * @return {?}
     */
    ModalWrapperComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    ModalWrapperComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.closeSub)
            this.closeSub.unsubscribe();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    ModalWrapperComponent.prototype.relayFirstLogEvent = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.relayFirstLog.emit($event);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    ModalWrapperComponent.prototype.relayLostPwdEvent = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.relayLostPwd.emit($event);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    ModalWrapperComponent.prototype.relaySaveMfaKeyEvent = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.relaySaveMfaKey.emit($event);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    ModalWrapperComponent.prototype.relaySendMfaCodeEvent = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.relaySendMfaCode.emit($event);
    };
    /**
     * @return {?}
     */
    ModalWrapperComponent.prototype.loadParams = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ data;
        data = this.data;
        if (data !== null) {
            this.formType = data.formType;
            // NOTE: Common
            // Labels
            this.labels = data.labels;
            // Labels
            this.errors = data.errors;
            // Labels
            this.inputs = data.inputs;
            // NOTE: Password
            // First connection or Forgot password
            this.isFirst = data.isFirst;
            // Password policies
            this.pwdPolicies = data.pwdPolicies;
            // NOTE: MFA
            // Mfa setupd codes
            this.code = data.code;
            this.qrCode = data.qrCode;
            // Close dialog event
            this.closeSub = data.closeEvent.subscribe(function (res) {
                _this.dialogRef.close();
            });
        }
    };
    ModalWrapperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cal-modal-wrapper',
                    template: "<div class=\"header py-2 px-4\">\n  <div class=\"row align-items-center\">\n    <div class=\"col\">\n      <div *ngIf=\"!isFirst && formType === forms.PWD\">\n        <span class=\"h5 font-weight-light {{ labels.header.subtitlePwd ? 'd-block mb-0' : '' }}\">\n          {{ labels.header.titlePwd }}\n        </span>\n        <span *ngIf=\"labels.header.subtitlePwd\" class=\"d-block font-weight-light small\">\n          {{ labels.header.subtitlePwd }}\n        </span>\n      </div>\n      <div *ngIf=\"isFirst && formType === forms.PWD\">\n        <span class=\"h5 font-weight-light {{ labels.header.subtitlePwdSetup ? 'd-block mb-0' : '' }}\">\n          {{ labels.header.titlePwdSetup }}\n        </span>\n        <span *ngIf=\"labels.header.subtitlePwdSetup\" class=\"d-block font-weight-light small\">\n          {{ labels.header.subtitlePwdSetup }}\n        </span>\n      </div>\n      <div *ngIf=\"formType === forms.MFA\">\n        <span class=\"h5 font-weight-light {{ labels.header.subtitleMfa ? 'd-block mb-0' : '' }}\">\n          {{ labels.header.titleMfa }}\n        </span>\n        <span *ngIf=\"labels.header.subtitleMfa\" class=\"d-block font-weight-light small\">\n          {{ labels.header.subtitleMfa }}\n        </span>\n      </div>\n      <div *ngIf=\"formType === forms.MFA_SETUP\">\n        <span class=\"h5 font-weight-light {{ labels.header.subtitleMfaSetup ? 'd-block mb-0' : '' }}\">\n          {{ labels.header.titleMfaSetup }}\n        </span>\n        <span *ngIf=\"labels.header.subtitleMfaSetup\" class=\"d-block font-weight-light small\">\n          {{ labels.header.subtitleMfaSetup }}\n        </span>\n      </div>\n    </div>\n    <div class=\"col-2 px-0 text-right\">\n      <button mat-icon-button mat-dialog-close>\n        <mat-icon>close</mat-icon>\n      </button>\n    </div>\n  </div>\n</div>\n<mat-dialog-content class=\"py-4\">\n  <!-- NOTE: Pwd Form -->\n  <cal-pwd-form *ngIf=\"formType === forms.PWD\" \n    [isFirst]=\"isFirst\" \n    [pwdPolicies]=\"pwdPolicies\" \n    [labels]=\"labels\" \n    [inputs]=\"inputs\" \n    [errors]=\"errors\" \n    (firstConnection)=\"relayFirstLogEvent($event)\" \n    (lostPassword)=\"relayLostPwdEvent($event)\">\n  </cal-pwd-form>\n  <!-- NOTE: MFA Setup Form -->\n  <cal-mfa-setup-form *ngIf=\"formType === forms.MFA_SETUP\" \n    [qrCode]=\"qrCode\" \n    [code]  =\"code\" \n    [labels]=\"labels\" \n    [inputs]=\"inputs\" \n    [errors]=\"errors\" \n    (saveMfa)=\"relaySaveMfaKeyEvent($event)\">\n  </cal-mfa-setup-form>\n  <!-- NOTE: MFA Form -->\n  <cal-mfa-form *ngIf=\"formType === forms.MFA\" \n    [labels]=\"labels\" \n    [inputs]=\"inputs\" \n    [errors]=\"errors\" \n    (sendMfa)=\"relaySendMfaCodeEvent($event)\">\n  </cal-mfa-form>\n</mat-dialog-content>",
                    styles: [".header{color:#fff;background:#5eacff}"]
                },] },
    ];
    /** @nocollapse */
    ModalWrapperComponent.ctorParameters = function () { return [
        { type: MatDialogRef, },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] },] },
    ]; };
    return ModalWrapperComponent;
}());
export { ModalWrapperComponent };
function ModalWrapperComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ModalWrapperComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ModalWrapperComponent.ctorParameters;
    /** @type {?} */
    ModalWrapperComponent.prototype.forms;
    /** @type {?} */
    ModalWrapperComponent.prototype.formType;
    /** @type {?} */
    ModalWrapperComponent.prototype.labels;
    /** @type {?} */
    ModalWrapperComponent.prototype.errors;
    /** @type {?} */
    ModalWrapperComponent.prototype.inputs;
    /** @type {?} */
    ModalWrapperComponent.prototype.closeSub;
    /** @type {?} */
    ModalWrapperComponent.prototype.isFirst;
    /** @type {?} */
    ModalWrapperComponent.prototype.pwdPolicies;
    /** @type {?} */
    ModalWrapperComponent.prototype.relayFirstLog;
    /** @type {?} */
    ModalWrapperComponent.prototype.relayLostPwd;
    /** @type {?} */
    ModalWrapperComponent.prototype.code;
    /** @type {?} */
    ModalWrapperComponent.prototype.qrCode;
    /** @type {?} */
    ModalWrapperComponent.prototype.relaySaveMfaKey;
    /** @type {?} */
    ModalWrapperComponent.prototype.relaySendMfaCode;
    /** @type {?} */
    ModalWrapperComponent.prototype.dialogRef;
    /** @type {?} */
    ModalWrapperComponent.prototype.data;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtd3JhcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2FsaWF0eXMvbG9naW4tZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9sYXlvdXRzL21vZGFsLXdyYXBwZXIvbW9kYWwtd3JhcHBlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBWSxlQUFlLENBQUM7QUFHaEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFlLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQVMsZUFBZSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBUyxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFNcEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFnQix3QkFBd0IsQ0FBQzs7SUFrSHZELCtCQUVVLFdBQ3dCO1FBRHhCLGNBQVMsR0FBVCxTQUFTO1FBQ2UsU0FBSSxHQUFKLElBQUk7cUJBckN2QixLQUFLOzZCQW9CdUIsSUFBSSxZQUFZLEVBQUU7NEJBQ2xCLElBQUksWUFBWSxFQUFFOytCQU9oQixJQUFJLFlBQVksRUFBRTtnQ0FJakIsSUFBSSxZQUFZLEVBQUU7UUFROUQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0tBQ25COzs7O0lBRU0sd0NBQVE7Ozs7Ozs7O0lBSVIsMkNBQVc7Ozs7UUFFaEIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7OztJQUd6QixrREFBa0I7Ozs7Y0FBQyxNQUFZO1FBRXBDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7SUFHM0IsaURBQWlCOzs7O2NBQUMsTUFBWTtRQUVuQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7O0lBRzFCLG9EQUFvQjs7OztjQUFDLE1BQVk7UUFFdEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7OztJQUc3QixxREFBcUI7Ozs7Y0FBQyxNQUFZO1FBRXZDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7O0lBRzdCLDBDQUFVOzs7OztRQUVoQixxQkFBSSxJQUFVLENBQUM7UUFDZixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUVqQixFQUFFLENBQUEsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQ2pCLENBQUM7WUFDQyxJQUFJLENBQUMsUUFBUSxHQUFTLElBQUksQ0FBQyxRQUFRLENBQUM7OztZQUlwQyxJQUFJLENBQUMsTUFBTSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUM7O1lBRWxDLElBQUksQ0FBQyxNQUFNLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7WUFFbEMsSUFBSSxDQUFDLE1BQU0sR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7WUFJbEMsSUFBSSxDQUFDLE9BQU8sR0FBVSxJQUFJLENBQUMsT0FBTyxDQUFDOztZQUVuQyxJQUFJLENBQUMsV0FBVyxHQUFNLElBQUksQ0FBQyxXQUFXLENBQUM7OztZQUl2QyxJQUFJLENBQUMsSUFBSSxHQUFhLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDOztZQUdsQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBRztnQkFFNUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN4QixDQUFDLENBQUM7U0FDSjs7O2dCQXhMSixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFNLG1CQUFtQjtvQkFDakMsUUFBUSxFQUFFLHF0RkFzRVU7b0JBQ3BCLE1BQU0sRUFBRSxDQUFDLHdDQUF3QyxDQUFDO2lCQUNuRDs7OztnQkFuRlEsWUFBWTtnREE0SGhCLE1BQU0sU0FBQyxlQUFlOztnQ0FsSTNCOztTQTBGYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBbmd1bGFyIG1vZHVsZXNcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9uSW5pdCB9ICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPbkRlc3Ryb3kgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSW5qZWN0IH0gICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9ICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbi8vIEV4dGVybmFsIG1vZHVsZXNcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gICAgZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xyXG5cclxuLy8gRW51bVxyXG5pbXBvcnQgeyBGb3JtcyB9ICAgICAgICAgICBmcm9tICcuLi8uLi9lbnVtcy9mb3Jtcy5lbnVtJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yICAgIDogJ2NhbC1tb2RhbC13cmFwcGVyJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJoZWFkZXIgcHktMiBweC00XCI+XHJcbiAgPGRpdiBjbGFzcz1cInJvdyBhbGlnbi1pdGVtcy1jZW50ZXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgPGRpdiAqbmdJZj1cIiFpc0ZpcnN0ICYmIGZvcm1UeXBlID09PSBmb3Jtcy5QV0RcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImg1IGZvbnQtd2VpZ2h0LWxpZ2h0IHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVQd2QgPyAnZC1ibG9jayBtYi0wJyA6ICcnIH19XCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnRpdGxlUHdkIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwibGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZFwiIGNsYXNzPVwiZC1ibG9jayBmb250LXdlaWdodC1saWdodCBzbWFsbFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZCB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJpc0ZpcnN0ICYmIGZvcm1UeXBlID09PSBmb3Jtcy5QV0RcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImg1IGZvbnQtd2VpZ2h0LWxpZ2h0IHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVQd2RTZXR1cCA/ICdkLWJsb2NrIG1iLTAnIDogJycgfX1cIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIudGl0bGVQd2RTZXR1cCB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cImxhYmVscy5oZWFkZXIuc3VidGl0bGVQd2RTZXR1cFwiIGNsYXNzPVwiZC1ibG9jayBmb250LXdlaWdodC1saWdodCBzbWFsbFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZFNldHVwIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdJZj1cImZvcm1UeXBlID09PSBmb3Jtcy5NRkFcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImg1IGZvbnQtd2VpZ2h0LWxpZ2h0IHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVNZmEgPyAnZC1ibG9jayBtYi0wJyA6ICcnIH19XCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnRpdGxlTWZhIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwibGFiZWxzLmhlYWRlci5zdWJ0aXRsZU1mYVwiIGNsYXNzPVwiZC1ibG9jayBmb250LXdlaWdodC1saWdodCBzbWFsbFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZU1mYSB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBX1NFVFVQXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJoNSBmb250LXdlaWdodC1saWdodCB7eyBsYWJlbHMuaGVhZGVyLnN1YnRpdGxlTWZhU2V0dXAgPyAnZC1ibG9jayBtYi0wJyA6ICcnIH19XCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnRpdGxlTWZhU2V0dXAgfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJsYWJlbHMuaGVhZGVyLnN1YnRpdGxlTWZhU2V0dXBcIiBjbGFzcz1cImQtYmxvY2sgZm9udC13ZWlnaHQtbGlnaHQgc21hbGxcIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVNZmFTZXR1cCB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtMiBweC0wIHRleHQtcmlnaHRcIj5cclxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0LWRpYWxvZy1jbG9zZT5cclxuICAgICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuPG1hdC1kaWFsb2ctY29udGVudCBjbGFzcz1cInB5LTRcIj5cclxuICA8IS0tIE5PVEU6IFB3ZCBGb3JtIC0tPlxyXG4gIDxjYWwtcHdkLWZvcm0gKm5nSWY9XCJmb3JtVHlwZSA9PT0gZm9ybXMuUFdEXCIgXHJcbiAgICBbaXNGaXJzdF09XCJpc0ZpcnN0XCIgXHJcbiAgICBbcHdkUG9saWNpZXNdPVwicHdkUG9saWNpZXNcIiBcclxuICAgIFtsYWJlbHNdPVwibGFiZWxzXCIgXHJcbiAgICBbaW5wdXRzXT1cImlucHV0c1wiIFxyXG4gICAgW2Vycm9yc109XCJlcnJvcnNcIiBcclxuICAgIChmaXJzdENvbm5lY3Rpb24pPVwicmVsYXlGaXJzdExvZ0V2ZW50KCRldmVudClcIiBcclxuICAgIChsb3N0UGFzc3dvcmQpPVwicmVsYXlMb3N0UHdkRXZlbnQoJGV2ZW50KVwiPlxyXG4gIDwvY2FsLXB3ZC1mb3JtPlxyXG4gIDwhLS0gTk9URTogTUZBIFNldHVwIEZvcm0gLS0+XHJcbiAgPGNhbC1tZmEtc2V0dXAtZm9ybSAqbmdJZj1cImZvcm1UeXBlID09PSBmb3Jtcy5NRkFfU0VUVVBcIiBcclxuICAgIFtxckNvZGVdPVwicXJDb2RlXCIgXHJcbiAgICBbY29kZV0gID1cImNvZGVcIiBcclxuICAgIFtsYWJlbHNdPVwibGFiZWxzXCIgXHJcbiAgICBbaW5wdXRzXT1cImlucHV0c1wiIFxyXG4gICAgW2Vycm9yc109XCJlcnJvcnNcIiBcclxuICAgIChzYXZlTWZhKT1cInJlbGF5U2F2ZU1mYUtleUV2ZW50KCRldmVudClcIj5cclxuICA8L2NhbC1tZmEtc2V0dXAtZm9ybT5cclxuICA8IS0tIE5PVEU6IE1GQSBGb3JtIC0tPlxyXG4gIDxjYWwtbWZhLWZvcm0gKm5nSWY9XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBXCIgXHJcbiAgICBbbGFiZWxzXT1cImxhYmVsc1wiIFxyXG4gICAgW2lucHV0c109XCJpbnB1dHNcIiBcclxuICAgIFtlcnJvcnNdPVwiZXJyb3JzXCIgXHJcbiAgICAoc2VuZE1mYSk9XCJyZWxheVNlbmRNZmFDb2RlRXZlbnQoJGV2ZW50KVwiPlxyXG4gIDwvY2FsLW1mYS1mb3JtPlxyXG48L21hdC1kaWFsb2ctY29udGVudD5gLFxyXG4gIHN0eWxlczogW2AuaGVhZGVye2NvbG9yOiNmZmY7YmFja2dyb3VuZDojNWVhY2ZmfWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNb2RhbFdyYXBwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxyXG57XHJcbiAgLy8gTk9URTogVXNlZnVsIGZvciB0ZW1wbGF0ZVxyXG4gIHB1YmxpYyBmb3JtcyA9IEZvcm1zO1xyXG5cclxuICAvLyBOT1RFOiBDb21tb25cclxuICAvLyBGb3JtIHR5cGUgKHBhc3N3b3JkIC8gbWZhKVxyXG4gIHB1YmxpYyBmb3JtVHlwZSAgICAgICAgOiBzdHJpbmc7XHJcbiAgLy8gTGFiZWxzXHJcbiAgcHVibGljIGxhYmVscyAgICA6IGFueTtcclxuICAvLyBFcnJvcnNcclxuICBwdWJsaWMgZXJyb3JzICAgIDogYW55O1xyXG4gIC8vIElucHV0c1xyXG4gIHB1YmxpYyBpbnB1dHMgICAgOiBhbnk7XHJcbiAgLy8gRXZlbnQgc2VudCBmcm9tIG1vZGFsXHJcbiAgcHVibGljIGNsb3NlU3ViICAgICAgICA6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLy8gTk9URTogUGFzc3dvcmRcclxuICAvLyBGaXJzdCBjb25uZWN0aW9uIG9yIEZvcmdvdCBwYXNzd29yZFxyXG4gIHB1YmxpYyBpc0ZpcnN0ICAgICAgIDogYm9vbGVhbjtcclxuICAvLyBQYXNzd29yZCBwb2xpY2llc1xyXG4gIHB1YmxpYyBwd2RQb2xpY2llcyAgIDogYW55O1xyXG4gIC8vIEV2ZW50IHNlbnQgZnJvbSBwYXNzd29yZCBmb3JtXHJcbiAgcHVibGljIHJlbGF5Rmlyc3RMb2cgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBwdWJsaWMgcmVsYXlMb3N0UHdkICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvLyBOT1RFOiBNRkEgc2V0dXBcclxuICAvLyBNRkEgc2VjcmV0IGtleVxyXG4gIHB1YmxpYyBjb2RlICAgICAgICAgICAgOiBzdHJpbmc7XHJcbiAgcHVibGljIHFyQ29kZSAgICAgICAgICA6IHN0cmluZztcclxuICAvLyBFdmVudCBzZW50IGZyb20gbWZhIHNldHVwIGZvcm1cclxuICBwdWJsaWMgcmVsYXlTYXZlTWZhS2V5IDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8vIE5PVEU6IE1GQVxyXG4gIC8vIEV2ZW50IHNlbnQgZnJvbSBtZmEgZm9ybVxyXG4gIHB1YmxpYyByZWxheVNlbmRNZmFDb2RlIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yXHJcbiAgKFxyXG4gICAgcHVibGljICBkaWFsb2dSZWYgOiBNYXREaWFsb2dSZWY8TW9kYWxXcmFwcGVyQ29tcG9uZW50PixcclxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55XHJcbiAgKVxyXG4gIHtcclxuICAgIHRoaXMubG9hZFBhcmFtcygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCkgOiB2b2lkXHJcbiAge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCkgOiB2b2lkXHJcbiAge1xyXG4gICAgaWYodGhpcy5jbG9zZVN1YilcclxuICAgICAgdGhpcy5jbG9zZVN1Yi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbGF5Rmlyc3RMb2dFdmVudCgkZXZlbnQgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMucmVsYXlGaXJzdExvZy5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVsYXlMb3N0UHdkRXZlbnQoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnJlbGF5TG9zdFB3ZC5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVsYXlTYXZlTWZhS2V5RXZlbnQoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnJlbGF5U2F2ZU1mYUtleS5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVsYXlTZW5kTWZhQ29kZUV2ZW50KCRldmVudCA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5yZWxheVNlbmRNZmFDb2RlLmVtaXQoJGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbG9hZFBhcmFtcygpIDogdm9pZFxyXG4gIHtcclxuICAgIHZhciBkYXRhIDogYW55O1xyXG4gICAgZGF0YSA9IHRoaXMuZGF0YTtcclxuXHJcbiAgICBpZihkYXRhICE9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICB0aGlzLmZvcm1UeXBlICAgICAgID0gZGF0YS5mb3JtVHlwZTtcclxuXHJcbiAgICAgIC8vIE5PVEU6IENvbW1vblxyXG4gICAgICAvLyBMYWJlbHNcclxuICAgICAgdGhpcy5sYWJlbHMgICAgICAgICA9IGRhdGEubGFiZWxzO1xyXG4gICAgICAvLyBMYWJlbHNcclxuICAgICAgdGhpcy5lcnJvcnMgICAgICAgICA9IGRhdGEuZXJyb3JzO1xyXG4gICAgICAvLyBMYWJlbHNcclxuICAgICAgdGhpcy5pbnB1dHMgICAgICAgICA9IGRhdGEuaW5wdXRzO1xyXG5cclxuICAgICAgLy8gTk9URTogUGFzc3dvcmRcclxuICAgICAgLy8gRmlyc3QgY29ubmVjdGlvbiBvciBGb3Jnb3QgcGFzc3dvcmRcclxuICAgICAgdGhpcy5pc0ZpcnN0ICAgICAgICA9IGRhdGEuaXNGaXJzdDtcclxuICAgICAgLy8gUGFzc3dvcmQgcG9saWNpZXNcclxuICAgICAgdGhpcy5wd2RQb2xpY2llcyAgICA9IGRhdGEucHdkUG9saWNpZXM7XHJcblxyXG4gICAgICAvLyBOT1RFOiBNRkFcclxuICAgICAgLy8gTWZhIHNldHVwZCBjb2Rlc1xyXG4gICAgICB0aGlzLmNvZGUgICAgICAgICAgID0gZGF0YS5jb2RlO1xyXG4gICAgICB0aGlzLnFyQ29kZSAgICAgICAgID0gZGF0YS5xckNvZGU7XHJcblxyXG4gICAgICAvLyBDbG9zZSBkaWFsb2cgZXZlbnRcclxuICAgICAgdGhpcy5jbG9zZVN1YiA9IGRhdGEuY2xvc2VFdmVudC5zdWJzY3JpYmUoKHJlcykgPT5cclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIl19