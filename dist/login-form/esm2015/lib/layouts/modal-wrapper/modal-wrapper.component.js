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
export class ModalWrapperComponent {
    /**
     * @param {?} dialogRef
     * @param {?} data
     */
    constructor(dialogRef, data) {
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
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.closeSub)
            this.closeSub.unsubscribe();
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
    /**
     * @return {?}
     */
    loadParams() {
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
            this.closeSub = data.closeEvent.subscribe((res) => {
                this.dialogRef.close();
            });
        }
    }
}
ModalWrapperComponent.decorators = [
    { type: Component, args: [{
                selector: 'cal-modal-wrapper',
                template: `<div class="header py-2 px-4">
  <div class="row align-items-center">
    <div class="col">
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
    <div class="col-2 px-0 text-right">
      <button mat-icon-button mat-dialog-close>
        <mat-icon>close</mat-icon>
      </button>
    </div>
  </div>
</div>
<mat-dialog-content class="py-4">
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
  </cal-mfa-form>
</mat-dialog-content>`,
                styles: [`.header{color:#fff;background:#5eacff}`]
            },] },
];
/** @nocollapse */
ModalWrapperComponent.ctorParameters = () => [
    { type: MatDialogRef, },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] },] },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtd3JhcHBlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2FsaWF0eXMvbG9naW4tZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9sYXlvdXRzL21vZGFsLXdyYXBwZXIvbW9kYWwtd3JhcHBlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBWSxlQUFlLENBQUM7QUFHaEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFlLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQVMsZUFBZSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBUyxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFNcEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFnQix3QkFBd0IsQ0FBQztBQTZFekQsTUFBTTs7Ozs7SUFxQ0osWUFFVSxXQUN3QjtRQUR4QixjQUFTLEdBQVQsU0FBUztRQUNlLFNBQUksR0FBSixJQUFJO3FCQXJDdkIsS0FBSzs2QkFvQnVCLElBQUksWUFBWSxFQUFFOzRCQUNsQixJQUFJLFlBQVksRUFBRTsrQkFPaEIsSUFBSSxZQUFZLEVBQUU7Z0NBSWpCLElBQUksWUFBWSxFQUFFO1FBUTlELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztLQUNuQjs7OztJQUVNLFFBQVE7Ozs7O0lBSVIsV0FBVztRQUVoQixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7O0lBR3pCLGtCQUFrQixDQUFDLE1BQVk7UUFFcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7OztJQUczQixpQkFBaUIsQ0FBQyxNQUFZO1FBRW5DLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7SUFHMUIsb0JBQW9CLENBQUMsTUFBWTtRQUV0QyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7O0lBRzdCLHFCQUFxQixDQUFDLE1BQVk7UUFFdkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7SUFHN0IsVUFBVTtRQUVoQixxQkFBSSxJQUFVLENBQUM7UUFDZixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUVqQixFQUFFLENBQUEsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQ2pCLENBQUM7WUFDQyxJQUFJLENBQUMsUUFBUSxHQUFTLElBQUksQ0FBQyxRQUFRLENBQUM7OztZQUlwQyxJQUFJLENBQUMsTUFBTSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUM7O1lBRWxDLElBQUksQ0FBQyxNQUFNLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7WUFFbEMsSUFBSSxDQUFDLE1BQU0sR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7WUFJbEMsSUFBSSxDQUFDLE9BQU8sR0FBVSxJQUFJLENBQUMsT0FBTyxDQUFDOztZQUVuQyxJQUFJLENBQUMsV0FBVyxHQUFNLElBQUksQ0FBQyxXQUFXLENBQUM7OztZQUl2QyxJQUFJLENBQUMsSUFBSSxHQUFhLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDOztZQUdsQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBRWhELElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDeEIsQ0FBQyxDQUFDO1NBQ0o7Ozs7WUF4TEosU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBTSxtQkFBbUI7Z0JBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkFzRVU7Z0JBQ3BCLE1BQU0sRUFBRSxDQUFDLHdDQUF3QyxDQUFDO2FBQ25EOzs7O1lBbkZRLFlBQVk7NENBNEhoQixNQUFNLFNBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8vIEFuZ3VsYXIgbW9kdWxlc1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT25Jbml0IH0gICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9uRGVzdHJveSB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJbmplY3QgfSAgICAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiB9ICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuLy8gRXh0ZXJuYWwgbW9kdWxlc1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSAgICBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XHJcblxyXG4vLyBFbnVtXHJcbmltcG9ydCB7IEZvcm1zIH0gICAgICAgICAgIGZyb20gJy4uLy4uL2VudW1zL2Zvcm1zLmVudW0nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3IgICAgOiAnY2FsLW1vZGFsLXdyYXBwZXInLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImhlYWRlciBweS0yIHB4LTRcIj5cclxuICA8ZGl2IGNsYXNzPVwicm93IGFsaWduLWl0ZW1zLWNlbnRlclwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiIWlzRmlyc3QgJiYgZm9ybVR5cGUgPT09IGZvcm1zLlBXRFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaDUgZm9udC13ZWlnaHQtbGlnaHQge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZCA/ICdkLWJsb2NrIG1iLTAnIDogJycgfX1cIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIudGl0bGVQd2QgfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJsYWJlbHMuaGVhZGVyLnN1YnRpdGxlUHdkXCIgY2xhc3M9XCJkLWJsb2NrIGZvbnQtd2VpZ2h0LWxpZ2h0IHNtYWxsXCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnN1YnRpdGxlUHdkIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdJZj1cImlzRmlyc3QgJiYgZm9ybVR5cGUgPT09IGZvcm1zLlBXRFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaDUgZm9udC13ZWlnaHQtbGlnaHQge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZFNldHVwID8gJ2QtYmxvY2sgbWItMCcgOiAnJyB9fVwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci50aXRsZVB3ZFNldHVwIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwibGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZFNldHVwXCIgY2xhc3M9XCJkLWJsb2NrIGZvbnQtd2VpZ2h0LWxpZ2h0IHNtYWxsXCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnN1YnRpdGxlUHdkU2V0dXAgfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiZm9ybVR5cGUgPT09IGZvcm1zLk1GQVwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaDUgZm9udC13ZWlnaHQtbGlnaHQge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZU1mYSA/ICdkLWJsb2NrIG1iLTAnIDogJycgfX1cIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIudGl0bGVNZmEgfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJsYWJlbHMuaGVhZGVyLnN1YnRpdGxlTWZhXCIgY2xhc3M9XCJkLWJsb2NrIGZvbnQtd2VpZ2h0LWxpZ2h0IHNtYWxsXCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnN1YnRpdGxlTWZhIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdJZj1cImZvcm1UeXBlID09PSBmb3Jtcy5NRkFfU0VUVVBcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImg1IGZvbnQtd2VpZ2h0LWxpZ2h0IHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVNZmFTZXR1cCA/ICdkLWJsb2NrIG1iLTAnIDogJycgfX1cIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIudGl0bGVNZmFTZXR1cCB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cImxhYmVscy5oZWFkZXIuc3VidGl0bGVNZmFTZXR1cFwiIGNsYXNzPVwiZC1ibG9jayBmb250LXdlaWdodC1saWdodCBzbWFsbFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZU1mYVNldHVwIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbC0yIHB4LTAgdGV4dC1yaWdodFwiPlxyXG4gICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiBtYXQtZGlhbG9nLWNsb3NlPlxyXG4gICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG48bWF0LWRpYWxvZy1jb250ZW50IGNsYXNzPVwicHktNFwiPlxyXG4gIDwhLS0gTk9URTogUHdkIEZvcm0gLS0+XHJcbiAgPGNhbC1wd2QtZm9ybSAqbmdJZj1cImZvcm1UeXBlID09PSBmb3Jtcy5QV0RcIiBcclxuICAgIFtpc0ZpcnN0XT1cImlzRmlyc3RcIiBcclxuICAgIFtwd2RQb2xpY2llc109XCJwd2RQb2xpY2llc1wiIFxyXG4gICAgW2xhYmVsc109XCJsYWJlbHNcIiBcclxuICAgIFtpbnB1dHNdPVwiaW5wdXRzXCIgXHJcbiAgICBbZXJyb3JzXT1cImVycm9yc1wiIFxyXG4gICAgKGZpcnN0Q29ubmVjdGlvbik9XCJyZWxheUZpcnN0TG9nRXZlbnQoJGV2ZW50KVwiIFxyXG4gICAgKGxvc3RQYXNzd29yZCk9XCJyZWxheUxvc3RQd2RFdmVudCgkZXZlbnQpXCI+XHJcbiAgPC9jYWwtcHdkLWZvcm0+XHJcbiAgPCEtLSBOT1RFOiBNRkEgU2V0dXAgRm9ybSAtLT5cclxuICA8Y2FsLW1mYS1zZXR1cC1mb3JtICpuZ0lmPVwiZm9ybVR5cGUgPT09IGZvcm1zLk1GQV9TRVRVUFwiIFxyXG4gICAgW3FyQ29kZV09XCJxckNvZGVcIiBcclxuICAgIFtjb2RlXSAgPVwiY29kZVwiIFxyXG4gICAgW2xhYmVsc109XCJsYWJlbHNcIiBcclxuICAgIFtpbnB1dHNdPVwiaW5wdXRzXCIgXHJcbiAgICBbZXJyb3JzXT1cImVycm9yc1wiIFxyXG4gICAgKHNhdmVNZmEpPVwicmVsYXlTYXZlTWZhS2V5RXZlbnQoJGV2ZW50KVwiPlxyXG4gIDwvY2FsLW1mYS1zZXR1cC1mb3JtPlxyXG4gIDwhLS0gTk9URTogTUZBIEZvcm0gLS0+XHJcbiAgPGNhbC1tZmEtZm9ybSAqbmdJZj1cImZvcm1UeXBlID09PSBmb3Jtcy5NRkFcIiBcclxuICAgIFtsYWJlbHNdPVwibGFiZWxzXCIgXHJcbiAgICBbaW5wdXRzXT1cImlucHV0c1wiIFxyXG4gICAgW2Vycm9yc109XCJlcnJvcnNcIiBcclxuICAgIChzZW5kTWZhKT1cInJlbGF5U2VuZE1mYUNvZGVFdmVudCgkZXZlbnQpXCI+XHJcbiAgPC9jYWwtbWZhLWZvcm0+XHJcbjwvbWF0LWRpYWxvZy1jb250ZW50PmAsXHJcbiAgc3R5bGVzOiBbYC5oZWFkZXJ7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOiM1ZWFjZmZ9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1vZGFsV3JhcHBlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XHJcbntcclxuICAvLyBOT1RFOiBVc2VmdWwgZm9yIHRlbXBsYXRlXHJcbiAgcHVibGljIGZvcm1zID0gRm9ybXM7XHJcblxyXG4gIC8vIE5PVEU6IENvbW1vblxyXG4gIC8vIEZvcm0gdHlwZSAocGFzc3dvcmQgLyBtZmEpXHJcbiAgcHVibGljIGZvcm1UeXBlICAgICAgICA6IHN0cmluZztcclxuICAvLyBMYWJlbHNcclxuICBwdWJsaWMgbGFiZWxzICAgIDogYW55O1xyXG4gIC8vIEVycm9yc1xyXG4gIHB1YmxpYyBlcnJvcnMgICAgOiBhbnk7XHJcbiAgLy8gSW5wdXRzXHJcbiAgcHVibGljIGlucHV0cyAgICA6IGFueTtcclxuICAvLyBFdmVudCBzZW50IGZyb20gbW9kYWxcclxuICBwdWJsaWMgY2xvc2VTdWIgICAgICAgIDogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAvLyBOT1RFOiBQYXNzd29yZFxyXG4gIC8vIEZpcnN0IGNvbm5lY3Rpb24gb3IgRm9yZ290IHBhc3N3b3JkXHJcbiAgcHVibGljIGlzRmlyc3QgICAgICAgOiBib29sZWFuO1xyXG4gIC8vIFBhc3N3b3JkIHBvbGljaWVzXHJcbiAgcHVibGljIHB3ZFBvbGljaWVzICAgOiBhbnk7XHJcbiAgLy8gRXZlbnQgc2VudCBmcm9tIHBhc3N3b3JkIGZvcm1cclxuICBwdWJsaWMgcmVsYXlGaXJzdExvZyA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIHB1YmxpYyByZWxheUxvc3RQd2QgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8vIE5PVEU6IE1GQSBzZXR1cFxyXG4gIC8vIE1GQSBzZWNyZXQga2V5XHJcbiAgcHVibGljIGNvZGUgICAgICAgICAgICA6IHN0cmluZztcclxuICBwdWJsaWMgcXJDb2RlICAgICAgICAgIDogc3RyaW5nO1xyXG4gIC8vIEV2ZW50IHNlbnQgZnJvbSBtZmEgc2V0dXAgZm9ybVxyXG4gIHB1YmxpYyByZWxheVNhdmVNZmFLZXkgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLy8gTk9URTogTUZBXHJcbiAgLy8gRXZlbnQgc2VudCBmcm9tIG1mYSBmb3JtXHJcbiAgcHVibGljIHJlbGF5U2VuZE1mYUNvZGUgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3JcclxuICAoXHJcbiAgICBwdWJsaWMgIGRpYWxvZ1JlZiA6IE1hdERpYWxvZ1JlZjxNb2RhbFdyYXBwZXJDb21wb25lbnQ+LFxyXG4gICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBhbnlcclxuICApXHJcbiAge1xyXG4gICAgdGhpcy5sb2FkUGFyYW1zKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKSA6IHZvaWRcclxuICB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSA6IHZvaWRcclxuICB7XHJcbiAgICBpZih0aGlzLmNsb3NlU3ViKVxyXG4gICAgICB0aGlzLmNsb3NlU3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVsYXlGaXJzdExvZ0V2ZW50KCRldmVudCA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5yZWxheUZpcnN0TG9nLmVtaXQoJGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWxheUxvc3RQd2RFdmVudCgkZXZlbnQgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMucmVsYXlMb3N0UHdkLmVtaXQoJGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWxheVNhdmVNZmFLZXlFdmVudCgkZXZlbnQgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMucmVsYXlTYXZlTWZhS2V5LmVtaXQoJGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWxheVNlbmRNZmFDb2RlRXZlbnQoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnJlbGF5U2VuZE1mYUNvZGUuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBsb2FkUGFyYW1zKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdmFyIGRhdGEgOiBhbnk7XHJcbiAgICBkYXRhID0gdGhpcy5kYXRhO1xyXG5cclxuICAgIGlmKGRhdGEgIT09IG51bGwpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMuZm9ybVR5cGUgICAgICAgPSBkYXRhLmZvcm1UeXBlO1xyXG5cclxuICAgICAgLy8gTk9URTogQ29tbW9uXHJcbiAgICAgIC8vIExhYmVsc1xyXG4gICAgICB0aGlzLmxhYmVscyAgICAgICAgID0gZGF0YS5sYWJlbHM7XHJcbiAgICAgIC8vIExhYmVsc1xyXG4gICAgICB0aGlzLmVycm9ycyAgICAgICAgID0gZGF0YS5lcnJvcnM7XHJcbiAgICAgIC8vIExhYmVsc1xyXG4gICAgICB0aGlzLmlucHV0cyAgICAgICAgID0gZGF0YS5pbnB1dHM7XHJcblxyXG4gICAgICAvLyBOT1RFOiBQYXNzd29yZFxyXG4gICAgICAvLyBGaXJzdCBjb25uZWN0aW9uIG9yIEZvcmdvdCBwYXNzd29yZFxyXG4gICAgICB0aGlzLmlzRmlyc3QgICAgICAgID0gZGF0YS5pc0ZpcnN0O1xyXG4gICAgICAvLyBQYXNzd29yZCBwb2xpY2llc1xyXG4gICAgICB0aGlzLnB3ZFBvbGljaWVzICAgID0gZGF0YS5wd2RQb2xpY2llcztcclxuXHJcbiAgICAgIC8vIE5PVEU6IE1GQVxyXG4gICAgICAvLyBNZmEgc2V0dXBkIGNvZGVzXHJcbiAgICAgIHRoaXMuY29kZSAgICAgICAgICAgPSBkYXRhLmNvZGU7XHJcbiAgICAgIHRoaXMucXJDb2RlICAgICAgICAgPSBkYXRhLnFyQ29kZTtcclxuXHJcbiAgICAgIC8vIENsb3NlIGRpYWxvZyBldmVudFxyXG4gICAgICB0aGlzLmNsb3NlU3ViID0gZGF0YS5jbG9zZUV2ZW50LnN1YnNjcmliZSgocmVzKSA9PlxyXG4gICAgICB7XHJcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=