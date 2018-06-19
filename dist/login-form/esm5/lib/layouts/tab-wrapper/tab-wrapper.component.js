/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Forms } from '../../enums/forms.enum';
var TabWrapperComponent = /** @class */ (function () {
    function TabWrapperComponent() {
        this.forms = Forms;
        // Event sent from tab
        this.sendCloseTab = new EventEmitter();
        // Event sent from password form
        this.relayFirstLog = new EventEmitter();
        this.relayLostPwd = new EventEmitter();
        // Event sent from mfa setup form
        this.relaySaveMfaKey = new EventEmitter();
        // NOTE: MFA
        // Event sent from mfa form
        this.relaySendMfaCode = new EventEmitter();
    }
    /**
     * @return {?}
     */
    TabWrapperComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    TabWrapperComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    TabWrapperComponent.prototype.backToLogin = /**
     * @return {?}
     */
    function () {
        this.sendCloseTab.emit();
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    TabWrapperComponent.prototype.relayFirstLogEvent = /**
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
    TabWrapperComponent.prototype.relayLostPwdEvent = /**
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
    TabWrapperComponent.prototype.relaySaveMfaKeyEvent = /**
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
    TabWrapperComponent.prototype.relaySendMfaCodeEvent = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.relaySendMfaCode.emit($event);
    };
    TabWrapperComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cal-tab-wrapper',
                    template: "<div class=\"header py-2 px-4 mb-3\">\n  <div class=\"row align-items-center\">\n    <div class=\"col-2 px-0 text-left\">\n      <button mat-icon-button (click)=\"backToLogin()\">\n        <mat-icon>arrow_back</mat-icon>\n      </button>\n    </div>\n    <div class=\"col text-right\">\n      <div *ngIf=\"!isFirst && formType === forms.PWD\">\n        <span class=\"h5 font-weight-light {{ labels.header.subtitlePwd ? 'd-block mb-0' : '' }}\">\n          {{ labels.header.titlePwd }}\n        </span>\n        <span *ngIf=\"labels.header.subtitlePwd\" class=\"d-block font-weight-light small\">\n          {{ labels.header.subtitlePwd }}\n        </span>\n      </div>\n      <div *ngIf=\"isFirst && formType === forms.PWD\">\n        <span class=\"h5 font-weight-light {{ labels.header.subtitlePwdSetup ? 'd-block mb-0' : '' }}\">\n          {{ labels.header.titlePwdSetup }}\n        </span>\n        <span *ngIf=\"labels.header.subtitlePwdSetup\" class=\"d-block font-weight-light small\">\n          {{ labels.header.subtitlePwdSetup }}\n        </span>\n      </div>\n      <div *ngIf=\"formType === forms.MFA\">\n        <span class=\"h5 font-weight-light {{ labels.header.subtitleMfa ? 'd-block mb-0' : '' }}\">\n          {{ labels.header.titleMfa }}\n        </span>\n        <span *ngIf=\"labels.header.subtitleMfa\" class=\"d-block font-weight-light small\">\n          {{ labels.header.subtitleMfa }}\n        </span>\n      </div>\n      <div *ngIf=\"formType === forms.MFA_SETUP\">\n        <span class=\"h5 font-weight-light {{ labels.header.subtitleMfaSetup ? 'd-block mb-0' : '' }}\">\n          {{ labels.header.titleMfaSetup }}\n        </span>\n        <span *ngIf=\"labels.header.subtitleMfaSetup\" class=\"d-block font-weight-light small\">\n          {{ labels.header.subtitleMfaSetup }}\n        </span>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- NOTE: Pwd Form -->\n<cal-pwd-form *ngIf=\"formType === forms.PWD\" \n  [isFirst]=\"isFirst\" \n  [pwdPolicies]=\"pwdPolicies\" \n  [labels]=\"labels\" \n  [inputs]=\"inputs\" \n  [errors]=\"errors\" \n  (firstConnection)=\"relayFirstLogEvent($event)\" \n  (lostPassword)=\"relayLostPwdEvent($event)\">\n</cal-pwd-form>\n<!-- NOTE: MFA Setup Form -->\n<cal-mfa-setup-form *ngIf=\"formType === forms.MFA_SETUP\" \n  [qrCode]=\"qrCode\" \n  [code]  =\"code\" \n  [labels]=\"labels\" \n  [inputs]=\"inputs\" \n  [errors]=\"errors\" \n  (saveMfa)=\"relaySaveMfaKeyEvent($event)\">\n</cal-mfa-setup-form>\n<!-- NOTE: MFA Form -->\n<cal-mfa-form *ngIf=\"formType === forms.MFA\" \n  [labels]=\"labels\" \n  [inputs]=\"inputs\" \n  [errors]=\"errors\" \n  (sendMfa)=\"relaySendMfaCodeEvent($event)\">\n</cal-mfa-form>",
                    styles: [".header{color:#fff;background:#5eacff}"]
                },] },
    ];
    /** @nocollapse */
    TabWrapperComponent.ctorParameters = function () { return []; };
    TabWrapperComponent.propDecorators = {
        "formType": [{ type: Input },],
        "labels": [{ type: Input },],
        "errors": [{ type: Input },],
        "inputs": [{ type: Input },],
        "sendCloseTab": [{ type: Output },],
        "isFirst": [{ type: Input },],
        "pwdPolicies": [{ type: Input },],
        "relayFirstLog": [{ type: Output },],
        "relayLostPwd": [{ type: Output },],
        "code": [{ type: Input },],
        "qrCode": [{ type: Input },],
        "relaySaveMfaKey": [{ type: Output },],
        "relaySendMfaCode": [{ type: Output },],
    };
    return TabWrapperComponent;
}());
export { TabWrapperComponent };
function TabWrapperComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TabWrapperComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TabWrapperComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    TabWrapperComponent.propDecorators;
    /** @type {?} */
    TabWrapperComponent.prototype.forms;
    /** @type {?} */
    TabWrapperComponent.prototype.formType;
    /** @type {?} */
    TabWrapperComponent.prototype.labels;
    /** @type {?} */
    TabWrapperComponent.prototype.errors;
    /** @type {?} */
    TabWrapperComponent.prototype.inputs;
    /** @type {?} */
    TabWrapperComponent.prototype.sendCloseTab;
    /** @type {?} */
    TabWrapperComponent.prototype.isFirst;
    /** @type {?} */
    TabWrapperComponent.prototype.pwdPolicies;
    /** @type {?} */
    TabWrapperComponent.prototype.relayFirstLog;
    /** @type {?} */
    TabWrapperComponent.prototype.relayLostPwd;
    /** @type {?} */
    TabWrapperComponent.prototype.code;
    /** @type {?} */
    TabWrapperComponent.prototype.qrCode;
    /** @type {?} */
    TabWrapperComponent.prototype.relaySaveMfaKey;
    /** @type {?} */
    TabWrapperComponent.prototype.relaySendMfaCode;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLXdyYXBwZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vIiwic291cmNlcyI6WyJsaWIvbGF5b3V0cy90YWItd3JhcHBlci90YWItd3JhcHBlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBUyxlQUFlLENBQUM7QUFHN0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFhLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQVksZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHN0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFhLHdCQUF3QixDQUFDOztJQWdIcEQ7cUJBbENrQixLQUFLOzs0QkFZMkIsSUFBSSxZQUFZLEVBQUU7OzZCQVF0QixJQUFJLFlBQVksRUFBRTs0QkFDbEIsSUFBSSxZQUFZLEVBQUU7OytCQU9oQixJQUFJLFlBQVksRUFBRTs7O2dDQUlqQixJQUFJLFlBQVksRUFBRTtLQU1sRTs7OztJQUVNLHNDQUFROzs7Ozs7OztJQUlSLHlDQUFXOzs7Ozs7OztJQUlYLHlDQUFXOzs7O1FBRWhCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7Ozs7OztJQUdwQixnREFBa0I7Ozs7Y0FBQyxNQUFZO1FBRXBDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7SUFHM0IsK0NBQWlCOzs7O2NBQUMsTUFBWTtRQUVuQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7O0lBRzFCLGtEQUFvQjs7OztjQUFDLE1BQVk7UUFFdEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7OztJQUc3QixtREFBcUI7Ozs7Y0FBQyxNQUFZO1FBRXZDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7OztnQkFsSnRDLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQU0saUJBQWlCO29CQUMvQixRQUFRLEVBQUUsa29GQW9FSTtvQkFDZCxNQUFNLEVBQUUsQ0FBQyx3Q0FBd0MsQ0FBQztpQkFDbkQ7Ozs7OzZCQVFFLEtBQUs7MkJBRUwsS0FBSzsyQkFFTCxLQUFLOzJCQUVMLEtBQUs7aUNBRUwsTUFBTTs0QkFJTixLQUFLO2dDQUVMLEtBQUs7a0NBRUwsTUFBTTtpQ0FDTixNQUFNO3lCQUlOLEtBQUs7MkJBQ0wsS0FBSztvQ0FFTCxNQUFNO3FDQUlOLE1BQU07OzhCQXZIVDs7U0FvRmEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQW5ndWxhciBtb2R1bGVzXHJcbmltcG9ydCB7IENvbXBvbmVudCB9ICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPbkluaXQgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT25EZXN0cm95IH0gICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElucHV0IH0gICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPdXRwdXQgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vLyBFbnVtXHJcbmltcG9ydCB7IEZvcm1zIH0gICAgICAgIGZyb20gJy4uLy4uL2VudW1zL2Zvcm1zLmVudW0nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3IgICAgOiAnY2FsLXRhYi13cmFwcGVyJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJoZWFkZXIgcHktMiBweC00IG1iLTNcIj5cclxuICA8ZGl2IGNsYXNzPVwicm93IGFsaWduLWl0ZW1zLWNlbnRlclwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbC0yIHB4LTAgdGV4dC1sZWZ0XCI+XHJcbiAgICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJiYWNrVG9Mb2dpbigpXCI+XHJcbiAgICAgICAgPG1hdC1pY29uPmFycm93X2JhY2s8L21hdC1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbCB0ZXh0LXJpZ2h0XCI+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCIhaXNGaXJzdCAmJiBmb3JtVHlwZSA9PT0gZm9ybXMuUFdEXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJoNSBmb250LXdlaWdodC1saWdodCB7eyBsYWJlbHMuaGVhZGVyLnN1YnRpdGxlUHdkID8gJ2QtYmxvY2sgbWItMCcgOiAnJyB9fVwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci50aXRsZVB3ZCB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cImxhYmVscy5oZWFkZXIuc3VidGl0bGVQd2RcIiBjbGFzcz1cImQtYmxvY2sgZm9udC13ZWlnaHQtbGlnaHQgc21hbGxcIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVQd2QgfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiaXNGaXJzdCAmJiBmb3JtVHlwZSA9PT0gZm9ybXMuUFdEXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJoNSBmb250LXdlaWdodC1saWdodCB7eyBsYWJlbHMuaGVhZGVyLnN1YnRpdGxlUHdkU2V0dXAgPyAnZC1ibG9jayBtYi0wJyA6ICcnIH19XCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnRpdGxlUHdkU2V0dXAgfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJsYWJlbHMuaGVhZGVyLnN1YnRpdGxlUHdkU2V0dXBcIiBjbGFzcz1cImQtYmxvY2sgZm9udC13ZWlnaHQtbGlnaHQgc21hbGxcIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVQd2RTZXR1cCB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJoNSBmb250LXdlaWdodC1saWdodCB7eyBsYWJlbHMuaGVhZGVyLnN1YnRpdGxlTWZhID8gJ2QtYmxvY2sgbWItMCcgOiAnJyB9fVwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci50aXRsZU1mYSB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cImxhYmVscy5oZWFkZXIuc3VidGl0bGVNZmFcIiBjbGFzcz1cImQtYmxvY2sgZm9udC13ZWlnaHQtbGlnaHQgc21hbGxcIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVNZmEgfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiZm9ybVR5cGUgPT09IGZvcm1zLk1GQV9TRVRVUFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaDUgZm9udC13ZWlnaHQtbGlnaHQge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZU1mYVNldHVwID8gJ2QtYmxvY2sgbWItMCcgOiAnJyB9fVwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci50aXRsZU1mYVNldHVwIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwibGFiZWxzLmhlYWRlci5zdWJ0aXRsZU1mYVNldHVwXCIgY2xhc3M9XCJkLWJsb2NrIGZvbnQtd2VpZ2h0LWxpZ2h0IHNtYWxsXCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnN1YnRpdGxlTWZhU2V0dXAgfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG48IS0tIE5PVEU6IFB3ZCBGb3JtIC0tPlxyXG48Y2FsLXB3ZC1mb3JtICpuZ0lmPVwiZm9ybVR5cGUgPT09IGZvcm1zLlBXRFwiIFxyXG4gIFtpc0ZpcnN0XT1cImlzRmlyc3RcIiBcclxuICBbcHdkUG9saWNpZXNdPVwicHdkUG9saWNpZXNcIiBcclxuICBbbGFiZWxzXT1cImxhYmVsc1wiIFxyXG4gIFtpbnB1dHNdPVwiaW5wdXRzXCIgXHJcbiAgW2Vycm9yc109XCJlcnJvcnNcIiBcclxuICAoZmlyc3RDb25uZWN0aW9uKT1cInJlbGF5Rmlyc3RMb2dFdmVudCgkZXZlbnQpXCIgXHJcbiAgKGxvc3RQYXNzd29yZCk9XCJyZWxheUxvc3RQd2RFdmVudCgkZXZlbnQpXCI+XHJcbjwvY2FsLXB3ZC1mb3JtPlxyXG48IS0tIE5PVEU6IE1GQSBTZXR1cCBGb3JtIC0tPlxyXG48Y2FsLW1mYS1zZXR1cC1mb3JtICpuZ0lmPVwiZm9ybVR5cGUgPT09IGZvcm1zLk1GQV9TRVRVUFwiIFxyXG4gIFtxckNvZGVdPVwicXJDb2RlXCIgXHJcbiAgW2NvZGVdICA9XCJjb2RlXCIgXHJcbiAgW2xhYmVsc109XCJsYWJlbHNcIiBcclxuICBbaW5wdXRzXT1cImlucHV0c1wiIFxyXG4gIFtlcnJvcnNdPVwiZXJyb3JzXCIgXHJcbiAgKHNhdmVNZmEpPVwicmVsYXlTYXZlTWZhS2V5RXZlbnQoJGV2ZW50KVwiPlxyXG48L2NhbC1tZmEtc2V0dXAtZm9ybT5cclxuPCEtLSBOT1RFOiBNRkEgRm9ybSAtLT5cclxuPGNhbC1tZmEtZm9ybSAqbmdJZj1cImZvcm1UeXBlID09PSBmb3Jtcy5NRkFcIiBcclxuICBbbGFiZWxzXT1cImxhYmVsc1wiIFxyXG4gIFtpbnB1dHNdPVwiaW5wdXRzXCIgXHJcbiAgW2Vycm9yc109XCJlcnJvcnNcIiBcclxuICAoc2VuZE1mYSk9XCJyZWxheVNlbmRNZmFDb2RlRXZlbnQoJGV2ZW50KVwiPlxyXG48L2NhbC1tZmEtZm9ybT5gLFxyXG4gIHN0eWxlczogW2AuaGVhZGVye2NvbG9yOiNmZmY7YmFja2dyb3VuZDojNWVhY2ZmfWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJXcmFwcGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3lcclxue1xyXG4gIC8vIE5PVEU6IFVzZWZ1bCBmb3IgdGVtcGxhdGVcclxuICBwdWJsaWMgICAgZm9ybXMgPSBGb3JtcztcclxuXHJcbiAgLy8gTk9URTogQ29tbW9uXHJcbiAgLy8gRm9ybSB0eXBlIChwYXNzd29yZCAvIG1mYSlcclxuICBASW5wdXQoKSAgZm9ybVR5cGUgICAgICA6IHN0cmluZztcclxuICAvLyBMYWJlbHNcclxuICBASW5wdXQoKSAgbGFiZWxzICAgICAgICA6IGFueTtcclxuICAvLyBFcnJvcnNcclxuICBASW5wdXQoKSAgZXJyb3JzICAgICAgICA6IGFueTtcclxuICAvLyBJbnB1dHNcclxuICBASW5wdXQoKSAgaW5wdXRzICAgICAgICA6IGFueTtcclxuICAvLyBFdmVudCBzZW50IGZyb20gdGFiXHJcbiAgQE91dHB1dCgpIHNlbmRDbG9zZVRhYiAgOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8vIE5PVEU6IFBhc3N3b3JkXHJcbiAgLy8gRmlyc3QgY29ubmVjdGlvbiBvciBGb3Jnb3QgcGFzc3dvcmRcclxuICBASW5wdXQoKSAgaXNGaXJzdCAgICAgICA6IGJvb2xlYW47XHJcbiAgLy8gUGFzc3dvcmQgcG9saWNpZXNcclxuICBASW5wdXQoKSAgcHdkUG9saWNpZXMgICA6IGFueTtcclxuICAvLyBFdmVudCBzZW50IGZyb20gcGFzc3dvcmQgZm9ybVxyXG4gIEBPdXRwdXQoKSByZWxheUZpcnN0TG9nIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgQE91dHB1dCgpIHJlbGF5TG9zdFB3ZCAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLy8gTk9URTogTUZBIHNldHVwXHJcbiAgLy8gTUZBIHNlY3JldCBrZXlcclxuICBASW5wdXQoKSAgY29kZSAgICAgICAgICAgIDogc3RyaW5nO1xyXG4gIEBJbnB1dCgpICBxckNvZGUgICAgICAgICAgOiBzdHJpbmc7XHJcbiAgLy8gRXZlbnQgc2VudCBmcm9tIG1mYSBzZXR1cCBmb3JtXHJcbiAgQE91dHB1dCgpIHJlbGF5U2F2ZU1mYUtleSA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvLyBOT1RFOiBNRkFcclxuICAvLyBFdmVudCBzZW50IGZyb20gbWZhIGZvcm1cclxuICBAT3V0cHV0KCkgcmVsYXlTZW5kTWZhQ29kZSA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBjb25zdHJ1Y3RvclxyXG4gIChcclxuICApXHJcbiAge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCkgOiB2b2lkXHJcbiAge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCkgOiB2b2lkXHJcbiAge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGJhY2tUb0xvZ2luKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zZW5kQ2xvc2VUYWIuZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbGF5Rmlyc3RMb2dFdmVudCgkZXZlbnQgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMucmVsYXlGaXJzdExvZy5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVsYXlMb3N0UHdkRXZlbnQoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnJlbGF5TG9zdFB3ZC5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVsYXlTYXZlTWZhS2V5RXZlbnQoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnJlbGF5U2F2ZU1mYUtleS5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVsYXlTZW5kTWZhQ29kZUV2ZW50KCRldmVudCA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5yZWxheVNlbmRNZmFDb2RlLmVtaXQoJGV2ZW50KTtcclxuICB9XHJcbn1cclxuIl19