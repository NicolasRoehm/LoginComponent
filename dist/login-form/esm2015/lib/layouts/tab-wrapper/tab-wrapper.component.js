/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Forms } from '../../enums/forms.enum';
export class TabWrapperComponent {
    constructor() {
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
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
    }
    /**
     * @return {?}
     */
    backToLogin() {
        this.sendCloseTab.emit();
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    relayFirstLogEvent($event) {
        this.relayFirstLog.emit($event);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    relayLostPwdEvent($event) {
        this.relayLostPwd.emit($event);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    relaySaveMfaKeyEvent($event) {
        this.relaySaveMfaKey.emit($event);
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    relaySendMfaCodeEvent($event) {
        this.relaySendMfaCode.emit($event);
    }
}
TabWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'cal-tab-wrapper',
                template: `<div class="header py-2 px-4 mb-3">
  <div class="row align-items-center">
    <div class="col-2 px-0 text-left">
      <button mat-icon-button (click)="backToLogin()">
        <mat-icon>arrow_back</mat-icon>
      </button>
    </div>
    <div class="col text-right">
      <div *ngIf="!isFirst && formType === forms.PWD">
        <span class="h5 font-weight-light {{ labels.header.subtitlePwd ? 'd-block mb-0' : '' }}">
          {{ labels.header.titlePwd }}
        </span>
        <span *ngIf="labels.header.subtitlePwd" class="d-block font-weight-light small">
          {{ labels.header.subtitlePwd }}
        </span>
      </div>
      <div *ngIf="isFirst && formType === forms.PWD">
        <span class="h5 font-weight-light {{ labels.header.subtitlePwdSetup ? 'd-block mb-0' : '' }}">
          {{ labels.header.titlePwdSetup }}
        </span>
        <span *ngIf="labels.header.subtitlePwdSetup" class="d-block font-weight-light small">
          {{ labels.header.subtitlePwdSetup }}
        </span>
      </div>
      <div *ngIf="formType === forms.MFA">
        <span class="h5 font-weight-light {{ labels.header.subtitleMfa ? 'd-block mb-0' : '' }}">
          {{ labels.header.titleMfa }}
        </span>
        <span *ngIf="labels.header.subtitleMfa" class="d-block font-weight-light small">
          {{ labels.header.subtitleMfa }}
        </span>
      </div>
      <div *ngIf="formType === forms.MFA_SETUP">
        <span class="h5 font-weight-light {{ labels.header.subtitleMfaSetup ? 'd-block mb-0' : '' }}">
          {{ labels.header.titleMfaSetup }}
        </span>
        <span *ngIf="labels.header.subtitleMfaSetup" class="d-block font-weight-light small">
          {{ labels.header.subtitleMfaSetup }}
        </span>
      </div>
    </div>
  </div>
</div>
<!-- NOTE: Pwd Form -->
<cal-pwd-form *ngIf="formType === forms.PWD" 
  [isFirst]="isFirst" 
  [pwdPolicies]="pwdPolicies" 
  [labels]="labels" 
  [inputs]="inputs" 
  [errors]="errors" 
  (firstConnection)="relayFirstLogEvent($event)" 
  (lostPassword)="relayLostPwdEvent($event)">
</cal-pwd-form>
<!-- NOTE: MFA Setup Form -->
<cal-mfa-setup-form *ngIf="formType === forms.MFA_SETUP" 
  [qrCode]="qrCode" 
  [code]  ="code" 
  [labels]="labels" 
  [inputs]="inputs" 
  [errors]="errors" 
  (saveMfa)="relaySaveMfaKeyEvent($event)">
</cal-mfa-setup-form>
<!-- NOTE: MFA Form -->
<cal-mfa-form *ngIf="formType === forms.MFA" 
  [labels]="labels" 
  [inputs]="inputs" 
  [errors]="errors" 
  (sendMfa)="relaySendMfaCodeEvent($event)">
</cal-mfa-form>`,
                styles: [`.header{color:#fff;background:#5eacff}`]
            },] },
];
/** @nocollapse */
TabWrapperComponent.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLXdyYXBwZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vIiwic291cmNlcyI6WyJsaWIvbGF5b3V0cy90YWItd3JhcHBlci90YWItd3JhcHBlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBUyxlQUFlLENBQUM7QUFHN0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFhLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQVksZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHN0MsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFhLHdCQUF3QixDQUFDO0FBMkV0RCxNQUFNO0lBcUNKO3FCQWxDa0IsS0FBSzs7NEJBWTJCLElBQUksWUFBWSxFQUFFOzs2QkFRdEIsSUFBSSxZQUFZLEVBQUU7NEJBQ2xCLElBQUksWUFBWSxFQUFFOzsrQkFPaEIsSUFBSSxZQUFZLEVBQUU7OztnQ0FJakIsSUFBSSxZQUFZLEVBQUU7S0FNbEU7Ozs7SUFFTSxRQUFROzs7OztJQUlSLFdBQVc7Ozs7O0lBSVgsV0FBVztRQUVoQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDOzs7Ozs7SUFHcEIsa0JBQWtCLENBQUMsTUFBWTtRQUVwQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7O0lBRzNCLGlCQUFpQixDQUFDLE1BQVk7UUFFbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7OztJQUcxQixvQkFBb0IsQ0FBQyxNQUFZO1FBRXRDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7SUFHN0IscUJBQXFCLENBQUMsTUFBWTtRQUV2QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7O1lBbEp0QyxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFNLGlCQUFpQjtnQkFDL0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkFvRUk7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsd0NBQXdDLENBQUM7YUFDbkQ7Ozs7O3lCQVFFLEtBQUs7dUJBRUwsS0FBSzt1QkFFTCxLQUFLO3VCQUVMLEtBQUs7NkJBRUwsTUFBTTt3QkFJTixLQUFLOzRCQUVMLEtBQUs7OEJBRUwsTUFBTTs2QkFDTixNQUFNO3FCQUlOLEtBQUs7dUJBQ0wsS0FBSztnQ0FFTCxNQUFNO2lDQUlOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBbmd1bGFyIG1vZHVsZXNcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9uSW5pdCB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPbkRlc3Ryb3kgfSAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSW5wdXQgfSAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE91dHB1dCB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8vIEVudW1cclxuaW1wb3J0IHsgRm9ybXMgfSAgICAgICAgZnJvbSAnLi4vLi4vZW51bXMvZm9ybXMuZW51bSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvciAgICA6ICdjYWwtdGFiLXdyYXBwZXInLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImhlYWRlciBweS0yIHB4LTQgbWItM1wiPlxyXG4gIDxkaXYgY2xhc3M9XCJyb3cgYWxpZ24taXRlbXMtY2VudGVyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sLTIgcHgtMCB0ZXh0LWxlZnRcIj5cclxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gKGNsaWNrKT1cImJhY2tUb0xvZ2luKClcIj5cclxuICAgICAgICA8bWF0LWljb24+YXJyb3dfYmFjazwvbWF0LWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sIHRleHQtcmlnaHRcIj5cclxuICAgICAgPGRpdiAqbmdJZj1cIiFpc0ZpcnN0ICYmIGZvcm1UeXBlID09PSBmb3Jtcy5QV0RcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImg1IGZvbnQtd2VpZ2h0LWxpZ2h0IHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVQd2QgPyAnZC1ibG9jayBtYi0wJyA6ICcnIH19XCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnRpdGxlUHdkIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwibGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZFwiIGNsYXNzPVwiZC1ibG9jayBmb250LXdlaWdodC1saWdodCBzbWFsbFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZCB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJpc0ZpcnN0ICYmIGZvcm1UeXBlID09PSBmb3Jtcy5QV0RcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImg1IGZvbnQtd2VpZ2h0LWxpZ2h0IHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVQd2RTZXR1cCA/ICdkLWJsb2NrIG1iLTAnIDogJycgfX1cIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIudGl0bGVQd2RTZXR1cCB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cImxhYmVscy5oZWFkZXIuc3VidGl0bGVQd2RTZXR1cFwiIGNsYXNzPVwiZC1ibG9jayBmb250LXdlaWdodC1saWdodCBzbWFsbFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZFNldHVwIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdJZj1cImZvcm1UeXBlID09PSBmb3Jtcy5NRkFcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImg1IGZvbnQtd2VpZ2h0LWxpZ2h0IHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVNZmEgPyAnZC1ibG9jayBtYi0wJyA6ICcnIH19XCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnRpdGxlTWZhIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwibGFiZWxzLmhlYWRlci5zdWJ0aXRsZU1mYVwiIGNsYXNzPVwiZC1ibG9jayBmb250LXdlaWdodC1saWdodCBzbWFsbFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZU1mYSB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBX1NFVFVQXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJoNSBmb250LXdlaWdodC1saWdodCB7eyBsYWJlbHMuaGVhZGVyLnN1YnRpdGxlTWZhU2V0dXAgPyAnZC1ibG9jayBtYi0wJyA6ICcnIH19XCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnRpdGxlTWZhU2V0dXAgfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJsYWJlbHMuaGVhZGVyLnN1YnRpdGxlTWZhU2V0dXBcIiBjbGFzcz1cImQtYmxvY2sgZm9udC13ZWlnaHQtbGlnaHQgc21hbGxcIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVNZmFTZXR1cCB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbjwhLS0gTk9URTogUHdkIEZvcm0gLS0+XHJcbjxjYWwtcHdkLWZvcm0gKm5nSWY9XCJmb3JtVHlwZSA9PT0gZm9ybXMuUFdEXCIgXHJcbiAgW2lzRmlyc3RdPVwiaXNGaXJzdFwiIFxyXG4gIFtwd2RQb2xpY2llc109XCJwd2RQb2xpY2llc1wiIFxyXG4gIFtsYWJlbHNdPVwibGFiZWxzXCIgXHJcbiAgW2lucHV0c109XCJpbnB1dHNcIiBcclxuICBbZXJyb3JzXT1cImVycm9yc1wiIFxyXG4gIChmaXJzdENvbm5lY3Rpb24pPVwicmVsYXlGaXJzdExvZ0V2ZW50KCRldmVudClcIiBcclxuICAobG9zdFBhc3N3b3JkKT1cInJlbGF5TG9zdFB3ZEV2ZW50KCRldmVudClcIj5cclxuPC9jYWwtcHdkLWZvcm0+XHJcbjwhLS0gTk9URTogTUZBIFNldHVwIEZvcm0gLS0+XHJcbjxjYWwtbWZhLXNldHVwLWZvcm0gKm5nSWY9XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBX1NFVFVQXCIgXHJcbiAgW3FyQ29kZV09XCJxckNvZGVcIiBcclxuICBbY29kZV0gID1cImNvZGVcIiBcclxuICBbbGFiZWxzXT1cImxhYmVsc1wiIFxyXG4gIFtpbnB1dHNdPVwiaW5wdXRzXCIgXHJcbiAgW2Vycm9yc109XCJlcnJvcnNcIiBcclxuICAoc2F2ZU1mYSk9XCJyZWxheVNhdmVNZmFLZXlFdmVudCgkZXZlbnQpXCI+XHJcbjwvY2FsLW1mYS1zZXR1cC1mb3JtPlxyXG48IS0tIE5PVEU6IE1GQSBGb3JtIC0tPlxyXG48Y2FsLW1mYS1mb3JtICpuZ0lmPVwiZm9ybVR5cGUgPT09IGZvcm1zLk1GQVwiIFxyXG4gIFtsYWJlbHNdPVwibGFiZWxzXCIgXHJcbiAgW2lucHV0c109XCJpbnB1dHNcIiBcclxuICBbZXJyb3JzXT1cImVycm9yc1wiIFxyXG4gIChzZW5kTWZhKT1cInJlbGF5U2VuZE1mYUNvZGVFdmVudCgkZXZlbnQpXCI+XHJcbjwvY2FsLW1mYS1mb3JtPmAsXHJcbiAgc3R5bGVzOiBbYC5oZWFkZXJ7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOiM1ZWFjZmZ9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYldyYXBwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxyXG57XHJcbiAgLy8gTk9URTogVXNlZnVsIGZvciB0ZW1wbGF0ZVxyXG4gIHB1YmxpYyAgICBmb3JtcyA9IEZvcm1zO1xyXG5cclxuICAvLyBOT1RFOiBDb21tb25cclxuICAvLyBGb3JtIHR5cGUgKHBhc3N3b3JkIC8gbWZhKVxyXG4gIEBJbnB1dCgpICBmb3JtVHlwZSAgICAgIDogc3RyaW5nO1xyXG4gIC8vIExhYmVsc1xyXG4gIEBJbnB1dCgpICBsYWJlbHMgICAgICAgIDogYW55O1xyXG4gIC8vIEVycm9yc1xyXG4gIEBJbnB1dCgpICBlcnJvcnMgICAgICAgIDogYW55O1xyXG4gIC8vIElucHV0c1xyXG4gIEBJbnB1dCgpICBpbnB1dHMgICAgICAgIDogYW55O1xyXG4gIC8vIEV2ZW50IHNlbnQgZnJvbSB0YWJcclxuICBAT3V0cHV0KCkgc2VuZENsb3NlVGFiICA6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLy8gTk9URTogUGFzc3dvcmRcclxuICAvLyBGaXJzdCBjb25uZWN0aW9uIG9yIEZvcmdvdCBwYXNzd29yZFxyXG4gIEBJbnB1dCgpICBpc0ZpcnN0ICAgICAgIDogYm9vbGVhbjtcclxuICAvLyBQYXNzd29yZCBwb2xpY2llc1xyXG4gIEBJbnB1dCgpICBwd2RQb2xpY2llcyAgIDogYW55O1xyXG4gIC8vIEV2ZW50IHNlbnQgZnJvbSBwYXNzd29yZCBmb3JtXHJcbiAgQE91dHB1dCgpIHJlbGF5Rmlyc3RMb2cgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgcmVsYXlMb3N0UHdkICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvLyBOT1RFOiBNRkEgc2V0dXBcclxuICAvLyBNRkEgc2VjcmV0IGtleVxyXG4gIEBJbnB1dCgpICBjb2RlICAgICAgICAgICAgOiBzdHJpbmc7XHJcbiAgQElucHV0KCkgIHFyQ29kZSAgICAgICAgICA6IHN0cmluZztcclxuICAvLyBFdmVudCBzZW50IGZyb20gbWZhIHNldHVwIGZvcm1cclxuICBAT3V0cHV0KCkgcmVsYXlTYXZlTWZhS2V5IDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8vIE5PVEU6IE1GQVxyXG4gIC8vIEV2ZW50IHNlbnQgZnJvbSBtZmEgZm9ybVxyXG4gIEBPdXRwdXQoKSByZWxheVNlbmRNZmFDb2RlIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yXHJcbiAgKFxyXG4gIClcclxuICB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKSA6IHZvaWRcclxuICB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSA6IHZvaWRcclxuICB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYmFja1RvTG9naW4oKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnNlbmRDbG9zZVRhYi5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVsYXlGaXJzdExvZ0V2ZW50KCRldmVudCA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5yZWxheUZpcnN0TG9nLmVtaXQoJGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWxheUxvc3RQd2RFdmVudCgkZXZlbnQgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMucmVsYXlMb3N0UHdkLmVtaXQoJGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWxheVNhdmVNZmFLZXlFdmVudCgkZXZlbnQgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMucmVsYXlTYXZlTWZhS2V5LmVtaXQoJGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWxheVNlbmRNZmFDb2RlRXZlbnQoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnJlbGF5U2VuZE1mYUNvZGUuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxufVxyXG4iXX0=