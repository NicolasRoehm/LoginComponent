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
import { PasswordValidator } from './password.validator';
export class PassFormComponent {
    /**
     * @param {?} builder
     */
    constructor(builder) {
        this.builder = builder;
        this.showPassword = false;
        // Event sent to login-form and relayed parents (modal & tab)
        this.firstConnection = new EventEmitter();
        this.lostPassword = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initFormsGroups();
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
     * @return {?}
     */
    initFormsGroups() {
        let /** @type {?} */ validators = [];
        if (this.passPolicies.char)
            validators.push(PasswordValidator.char);
        if (this.passPolicies.number)
            validators.push(PasswordValidator.number);
        if (this.passPolicies.upper)
            validators.push(PasswordValidator.upper);
        if (this.passPolicies.lower)
            validators.push(PasswordValidator.lower);
        validators.push(Validators.required);
        validators.push(PasswordValidator.longEnough(this.passPolicies.range.min, this.passPolicies.range.max));
        this.formGroup = this.builder.group({
            verifCode: new FormControl({
                value: null,
                disabled: false
            }),
            newPassword: new FormControl({
                value: null,
                disabled: false
            }, validators),
        });
        if (!this.isFirst)
            this.formGroup.controls["verifCode"].setValidators([Validators.required]);
    }
}
PassFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'cal-pass-form',
                template: `<!-- NOTE: <form autocomplete="off"> will turn off autocomplete for the form in most browsers
     except for username/email/password fields -->
<form (ngSubmit)="send()" [formGroup]="formGroup" autocomplete="off">

  <!-- NOTE: fake fields are a workaround for chrome/opera autofill getting the wrong fields -->
  <input id="username" style="display:none" type="text" name="fakeusernameremembered">
  <input id="password" style="display:none" type="password" name="fakepasswordremembered">

  <div class="row w-100 no-gutters" *ngIf="!isFirst">
    <div class="col">
      <div class="w-100">
        <p class="small">{{ passLabels.verifCodeMessageLabel }}</p>
      </div>
      <mat-form-field class="w-100">
        <!-- NOTE: <input autocomplete="nope"> turns off autocomplete on many other browsers that don't respect
          the form's "off", but not for "password" inputs. -->
        <input matInput formControlName="verifCode" 
          name="verif-code" autocomplete="nope" 
          placeholder="{{ passLabels.verifCodeLabel }}" 
          pattern="[\\S]+" 
          type="text"/> <!-- NOTE: Pattern matches any non-whitespace character -->
        <button *ngIf="formGroup.controls.verifCode.valid && btnClearCode" 
          mat-button matSuffix mat-icon-button aria-label="Clear" 
          color="primary" (click)="formGroup.controls.verifCode.setValue('')" 
          type="button">
          <mat-icon>close</mat-icon>
        </button>
        <!-- NOTE: Error messages -->
        <mat-hint align="start" *ngIf="formGroup.controls.verifCode.errors?.required && err">
          {{ passLabels.fieldRequiredLabel }}
        </mat-hint>
        <mat-hint align="start" *ngIf="formGroup.controls.verifCode.errors?.pattern && err">
          {{ passLabels.fieldNonWhitespaceLabel }}
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
          placeholder="{{ passLabels.newPasswordLabel }}" 
          type="{{ showPassword ? 'text' : 'password' }}"/>
        <button *ngIf="btnShowPass" 
          mat-button matSuffix mat-icon-button aria-label="Clear" 
          color="primary" (click)="showPassword=!showPassword" 
          type="button">
          <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
        </button>
        <!-- NOTE: Error message -->
        <mat-hint align="start" *ngIf="formGroup.controls.newPassword.errors?.required && err">
          {{ passLabels.fieldRequiredLabel }}
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
          {{ passLabels.policyPassword1Label }}
        </li>
        <li class="check-policy" *ngIf="passPolicies.upper">
          <mat-icon class="red-policy" *ngIf="formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.upper">close</mat-icon>
          <mat-icon class="green-policy" *ngIf="!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.upper">check</mat-icon>
          {{ passLabels.policyPassword2Label }}
        </li>
        <li class="check-policy" *ngIf="passPolicies.lower">
          <mat-icon class="red-policy" *ngIf="formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.lower">close</mat-icon>
          <mat-icon class="green-policy" *ngIf="!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.lower">check</mat-icon>
          {{ passLabels.policyPassword3Label }}
        </li>
        <li class="check-policy" *ngIf="passPolicies.number">
          <mat-icon class="red-policy" *ngIf="formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.number">close</mat-icon>
          <mat-icon class="green-policy" *ngIf="!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.number">check</mat-icon>
          {{ passLabels.policyPassword4Label }}
        </li>
        <li class="check-policy" *ngIf="passPolicies.char">
          <mat-icon class="red-policy" *ngIf="formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.char">close</mat-icon>
          <mat-icon class="green-policy" *ngIf="!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.char">check</mat-icon>
          {{ passLabels.policyPassword5Label }}
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
          {{ passLabels.sendLabel }}
        </button>
      </div>
    </div>
  </div>
</form>`,
                styles: [`.green-policy{color:green}.red-policy{color:red}.check-policy{display:flex;align-items:center}.check-policy .mat-icon{margin-right:4px;font-size:22px;height:22px;width:22px}`]
            },] },
];
/** @nocollapse */
PassFormComponent.ctorParameters = () => [
    { type: FormBuilder, },
];
PassFormComponent.propDecorators = {
    "isFirst": [{ type: Input },],
    "passLabels": [{ type: Input },],
    "passPolicies": [{ type: Input },],
    "btnShowPass": [{ type: Input },],
    "btnClearCode": [{ type: Input },],
    "err": [{ type: Input },],
    "firstConnection": [{ type: Output },],
    "lostPassword": [{ type: Output },],
};
function PassFormComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PassFormComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PassFormComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    PassFormComponent.propDecorators;
    /** @type {?} */
    PassFormComponent.prototype.formGroup;
    /** @type {?} */
    PassFormComponent.prototype.showPassword;
    /** @type {?} */
    PassFormComponent.prototype.isFirst;
    /** @type {?} */
    PassFormComponent.prototype.passLabels;
    /** @type {?} */
    PassFormComponent.prototype.passPolicies;
    /** @type {?} */
    PassFormComponent.prototype.btnShowPass;
    /** @type {?} */
    PassFormComponent.prototype.btnClearCode;
    /** @type {?} */
    PassFormComponent.prototype.err;
    /** @type {?} */
    PassFormComponent.prototype.firstConnection;
    /** @type {?} */
    PassFormComponent.prototype.lostPassword;
    /** @type {?} */
    PassFormComponent.prototype.builder;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzcy1mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtLyIsInNvdXJjZXMiOlsibGliL2Zvcm1zL3Bhc3MtZm9ybS9wYXNzLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQVMsZUFBZSxDQUFDO0FBRTdDLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBYSxlQUFlLENBQUM7QUFDN0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFZLGVBQWUsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTyxnQkFBZ0IsQ0FBQztBQUU5QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU8sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFRLGdCQUFnQixDQUFDO0FBRzlDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBaUh6RCxNQUFNOzs7O0lBb0JKLFlBRVU7UUFBQSxZQUFPLEdBQVAsT0FBTzs0QkFuQmtCLEtBQUs7OytCQWNRLElBQUksWUFBWSxFQUFFOzRCQUNsQixJQUFJLFlBQVksRUFBRTtLQU9qRTs7OztJQUVNLFFBQVE7UUFFYixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Ozs7O0lBR2xCLFdBQVc7Ozs7O0lBSVgsSUFBSTtRQUVULHFCQUFJLEtBQUssR0FBUyxFQUFFLENBQUM7UUFFckIscUJBQUksU0FBUyxHQUFjLElBQUksQ0FBQztRQUNoQyxxQkFBSSxXQUFXLEdBQVksSUFBSSxDQUFDO1FBRWhDLFNBQVMsR0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsY0FBVyxLQUFLLENBQUM7UUFDMUQsV0FBVyxHQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxnQkFBYSxLQUFLLENBQUM7UUFFNUQsS0FBSyxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUM7O1FBRzdCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FDaEIsQ0FBQztZQUNDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pDLE1BQU0sQ0FBQztTQUNSO1FBRUQsS0FBSyxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7O1FBRXZCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7OztJQUd4QixlQUFlO1FBRXJCLHFCQUFJLFVBQVUsR0FBUyxFQUFFLENBQUM7UUFFMUIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDeEIsVUFBVSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztZQUMxQixVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBQ3pCLFVBQVUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDekIsVUFBVSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUzQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQyxVQUFVLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUV4RyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ2xDLFNBQVMsRUFBTSxJQUFJLFdBQVcsQ0FBQztnQkFDN0IsS0FBSyxFQUFRLElBQUk7Z0JBQ2pCLFFBQVEsRUFBSyxLQUFLO2FBQ25CLENBQUM7WUFDRixXQUFXLEVBQUksSUFBSSxXQUFXLENBQUM7Z0JBQzdCLEtBQUssRUFBUSxJQUFJO2dCQUNqQixRQUFRLEVBQUssS0FBSzthQUNuQixFQUFFLFVBQVUsQ0FBQztTQUNmLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNmLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxjQUFXLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7O1lBdk01RSxTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFNLGVBQWU7Z0JBQzdCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQTBHSjtnQkFDTixNQUFNLEVBQUUsQ0FBQywrS0FBK0ssQ0FBQzthQUMxTDs7OztZQXBIUSxXQUFXOzs7d0JBMkhqQixLQUFLOzJCQUVMLEtBQUs7NkJBQ0wsS0FBSzs0QkFFTCxLQUFLOzZCQUVMLEtBQUs7b0JBRUwsS0FBSztnQ0FFTCxNQUFNOzZCQUNOLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBbmd1bGFyIG1vZHVsZXNcclxuaW1wb3J0IHsgT25Jbml0IH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9ICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPbkRlc3Ryb3kgfSAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSW5wdXQgfSAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE91dHB1dCB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAgfSAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVmFsaWRhdG9ycyB9ICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuLy8gSW50ZXJuYWwgbW9kdWxlc1xyXG5pbXBvcnQgeyBQYXNzd29yZFZhbGlkYXRvciB9IGZyb20gJy4vcGFzc3dvcmQudmFsaWRhdG9yJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yICAgIDogJ2NhbC1wYXNzLWZvcm0nLFxyXG4gIHRlbXBsYXRlOiBgPCEtLSBOT1RFOiA8Zm9ybSBhdXRvY29tcGxldGU9XCJvZmZcIj4gd2lsbCB0dXJuIG9mZiBhdXRvY29tcGxldGUgZm9yIHRoZSBmb3JtIGluIG1vc3QgYnJvd3NlcnNcclxuICAgICBleGNlcHQgZm9yIHVzZXJuYW1lL2VtYWlsL3Bhc3N3b3JkIGZpZWxkcyAtLT5cclxuPGZvcm0gKG5nU3VibWl0KT1cInNlbmQoKVwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCI+XHJcblxyXG4gIDwhLS0gTk9URTogZmFrZSBmaWVsZHMgYXJlIGEgd29ya2Fyb3VuZCBmb3IgY2hyb21lL29wZXJhIGF1dG9maWxsIGdldHRpbmcgdGhlIHdyb25nIGZpZWxkcyAtLT5cclxuICA8aW5wdXQgaWQ9XCJ1c2VybmFtZVwiIHN0eWxlPVwiZGlzcGxheTpub25lXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiZmFrZXVzZXJuYW1lcmVtZW1iZXJlZFwiPlxyXG4gIDxpbnB1dCBpZD1cInBhc3N3b3JkXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIiB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwiZmFrZXBhc3N3b3JkcmVtZW1iZXJlZFwiPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwicm93IHctMTAwIG5vLWd1dHRlcnNcIiAqbmdJZj1cIiFpc0ZpcnN0XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgICAgIDxwIGNsYXNzPVwic21hbGxcIj57eyBwYXNzTGFiZWxzLnZlcmlmQ29kZU1lc3NhZ2VMYWJlbCB9fTwvcD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cInctMTAwXCI+XHJcbiAgICAgICAgPCEtLSBOT1RFOiA8aW5wdXQgYXV0b2NvbXBsZXRlPVwibm9wZVwiPiB0dXJucyBvZmYgYXV0b2NvbXBsZXRlIG9uIG1hbnkgb3RoZXIgYnJvd3NlcnMgdGhhdCBkb24ndCByZXNwZWN0XHJcbiAgICAgICAgICB0aGUgZm9ybSdzIFwib2ZmXCIsIGJ1dCBub3QgZm9yIFwicGFzc3dvcmRcIiBpbnB1dHMuIC0tPlxyXG4gICAgICAgIDxpbnB1dCBtYXRJbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJ2ZXJpZkNvZGVcIiBcclxuICAgICAgICAgIG5hbWU9XCJ2ZXJpZi1jb2RlXCIgYXV0b2NvbXBsZXRlPVwibm9wZVwiIFxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eyBwYXNzTGFiZWxzLnZlcmlmQ29kZUxhYmVsIH19XCIgXHJcbiAgICAgICAgICBwYXR0ZXJuPVwiW1xcXFxTXStcIiBcclxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIvPiA8IS0tIE5PVEU6IFBhdHRlcm4gbWF0Y2hlcyBhbnkgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVyIC0tPlxyXG4gICAgICAgIDxidXR0b24gKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLnZhbGlkICYmIGJ0bkNsZWFyQ29kZVwiIFxyXG4gICAgICAgICAgbWF0LWJ1dHRvbiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJDbGVhclwiIFxyXG4gICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cImZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUuc2V0VmFsdWUoJycpXCIgXHJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+XHJcbiAgICAgICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwhLS0gTk9URTogRXJyb3IgbWVzc2FnZXMgLS0+XHJcbiAgICAgICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUuZXJyb3JzPy5yZXF1aXJlZCAmJiBlcnJcIj5cclxuICAgICAgICAgIHt7IHBhc3NMYWJlbHMuZmllbGRSZXF1aXJlZExhYmVsIH19XHJcbiAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS5lcnJvcnM/LnBhdHRlcm4gJiYgZXJyXCI+XHJcbiAgICAgICAgICB7eyBwYXNzTGFiZWxzLmZpZWxkTm9uV2hpdGVzcGFjZUxhYmVsIH19XHJcbiAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDwhLS0gTk9URTogPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGF1dG9jb21wbGV0ZT1cIm5ldy1wYXNzd29yZFwiIHdpbGwgdHVybiBpdCBvZmYgZm9yIHBhc3N3b3JkcyBldmVyeXdoZXJlIC0tPlxyXG4gIDxkaXYgY2xhc3M9XCJyb3cgdy0xMDAgbm8tZ3V0dGVyc1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgICAgIDxpbnB1dCBtYXRJbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJuZXdQYXNzd29yZFwiIFxyXG4gICAgICAgICAgbmFtZT1cIm5ldy1wYXNzd29yZFwiIGF1dG9jb21wbGV0ZT1cIm5ldy1wYXNzd29yZFwiIFxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eyBwYXNzTGFiZWxzLm5ld1Bhc3N3b3JkTGFiZWwgfX1cIiBcclxuICAgICAgICAgIHR5cGU9XCJ7eyBzaG93UGFzc3dvcmQgPyAndGV4dCcgOiAncGFzc3dvcmQnIH19XCIvPlxyXG4gICAgICAgIDxidXR0b24gKm5nSWY9XCJidG5TaG93UGFzc1wiIFxyXG4gICAgICAgICAgbWF0LWJ1dHRvbiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJDbGVhclwiIFxyXG4gICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cInNob3dQYXNzd29yZD0hc2hvd1Bhc3N3b3JkXCIgXHJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+XHJcbiAgICAgICAgICA8bWF0LWljb24+e3sgc2hvd1Bhc3N3b3JkID8gJ3Zpc2liaWxpdHlfb2ZmJyA6ICd2aXNpYmlsaXR5JyB9fTwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPCEtLSBOT1RFOiBFcnJvciBtZXNzYWdlIC0tPlxyXG4gICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzPy5yZXF1aXJlZCAmJiBlcnJcIj5cclxuICAgICAgICAgIHt7IHBhc3NMYWJlbHMuZmllbGRSZXF1aXJlZExhYmVsIH19XHJcbiAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJyb3cgdy0xMDAgbm8tZ3V0dGVyc1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICA8dWwgY2xhc3M9XCJsaXN0LXVuc3R5bGVkIHNtYWxsXCI+XHJcbiAgICAgICAgPGxpIGNsYXNzPVwiY2hlY2stcG9saWN5XCI+XHJcbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJyZWQtcG9saWN5XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzICYmIGZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMubG9uZ0Vub3VnaFwiPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImdyZWVuLXBvbGljeVwiICpuZ0lmPVwiIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgfHwgIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMubG9uZ0Vub3VnaFwiPmNoZWNrPC9tYXQtaWNvbj5cclxuICAgICAgICAgIHt7IHBhc3NMYWJlbHMucG9saWN5UGFzc3dvcmQxTGFiZWwgfX1cclxuICAgICAgICA8L2xpPlxyXG4gICAgICAgIDxsaSBjbGFzcz1cImNoZWNrLXBvbGljeVwiICpuZ0lmPVwicGFzc1BvbGljaWVzLnVwcGVyXCI+XHJcbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJyZWQtcG9saWN5XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzICYmIGZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMudXBwZXJcIj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJncmVlbi1wb2xpY3lcIiAqbmdJZj1cIiFmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzIHx8ICFmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzLnVwcGVyXCI+Y2hlY2s8L21hdC1pY29uPlxyXG4gICAgICAgICAge3sgcGFzc0xhYmVscy5wb2xpY3lQYXNzd29yZDJMYWJlbCB9fVxyXG4gICAgICAgIDwvbGk+XHJcbiAgICAgICAgPGxpIGNsYXNzPVwiY2hlY2stcG9saWN5XCIgKm5nSWY9XCJwYXNzUG9saWNpZXMubG93ZXJcIj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInJlZC1wb2xpY3lcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgJiYgZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycy5sb3dlclwiPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImdyZWVuLXBvbGljeVwiICpuZ0lmPVwiIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgfHwgIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMubG93ZXJcIj5jaGVjazwvbWF0LWljb24+XHJcbiAgICAgICAgICB7eyBwYXNzTGFiZWxzLnBvbGljeVBhc3N3b3JkM0xhYmVsIH19XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgICA8bGkgY2xhc3M9XCJjaGVjay1wb2xpY3lcIiAqbmdJZj1cInBhc3NQb2xpY2llcy5udW1iZXJcIj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInJlZC1wb2xpY3lcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgJiYgZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycy5udW1iZXJcIj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJncmVlbi1wb2xpY3lcIiAqbmdJZj1cIiFmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzIHx8ICFmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzLm51bWJlclwiPmNoZWNrPC9tYXQtaWNvbj5cclxuICAgICAgICAgIHt7IHBhc3NMYWJlbHMucG9saWN5UGFzc3dvcmQ0TGFiZWwgfX1cclxuICAgICAgICA8L2xpPlxyXG4gICAgICAgIDxsaSBjbGFzcz1cImNoZWNrLXBvbGljeVwiICpuZ0lmPVwicGFzc1BvbGljaWVzLmNoYXJcIj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInJlZC1wb2xpY3lcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgJiYgZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycy5jaGFyXCI+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiZ3JlZW4tcG9saWN5XCIgKm5nSWY9XCIhZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycyB8fCAhZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycy5jaGFyXCI+Y2hlY2s8L21hdC1pY29uPlxyXG4gICAgICAgICAge3sgcGFzc0xhYmVscy5wb2xpY3lQYXNzd29yZDVMYWJlbCB9fVxyXG4gICAgICAgIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8IS0tIFRPRE86IEVuYWJsZSBHb29nbGUgQ2FwdGNoYSAtLT5cclxuICA8IS0tIDxkaXYgY2xhc3M9XCJyb3cgdy0xMDAgbm8tZ3V0dGVyc1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICA8cmUtY2FwdGNoYSBzaXRlX2tleT1cIjZMZEJ0QWtVQUFBQUFCMl9sX1RPejdvWm1UTFhhRmpQMWN4bnU0eU1cIlxyXG4gICAgICAgIChjYXB0Y2hhUmVzcG9uc2UpPVwiaGFuZGxlQ29ycmVjdENhcHRjaGEoJGV2ZW50KVwiPlxyXG4gICAgICA8L3JlLWNhcHRjaGE+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj4gLS0+XHJcbiAgPGRpdiBjbGFzcz1cInB0LTAgcGItNCBweC00XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwicm93IHctMTAwIG5vLWd1dHRlcnNcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNvbCB0ZXh0LXJpZ2h0XCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjb2xvcj1cInByaW1hcnlcIiBtYXQtcmFpc2VkLWJ1dHRvbiBjbGFzcz1cInNtYWxsIHRleHQtdXBwZXJjYXNlXCIgdHlwZT1cInN1Ym1pdFwiIFtkaXNhYmxlZF09XCIhZm9ybUdyb3VwLnZhbGlkXCI+XHJcbiAgICAgICAgICB7eyBwYXNzTGFiZWxzLnNlbmRMYWJlbCB9fVxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Zvcm0+YCxcclxuICBzdHlsZXM6IFtgLmdyZWVuLXBvbGljeXtjb2xvcjpncmVlbn0ucmVkLXBvbGljeXtjb2xvcjpyZWR9LmNoZWNrLXBvbGljeXtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyfS5jaGVjay1wb2xpY3kgLm1hdC1pY29ue21hcmdpbi1yaWdodDo0cHg7Zm9udC1zaXplOjIycHg7aGVpZ2h0OjIycHg7d2lkdGg6MjJweH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUGFzc0Zvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxyXG57XHJcbiAgcHVibGljICAgIGZvcm1Hcm91cCAgICA6IEZvcm1Hcm91cDtcclxuICBwdWJsaWMgICAgc2hvd1Bhc3N3b3JkIDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIC8vIHB1YmxpYyBjYXB0Y2hhVG9rZW4gOiBzdHJpbmc7IC8vIFRPRE86XHJcbiAgLy8gRmlyc3QgY29ubmVjdGlvbiBvciBGb3Jnb3R0ZW4gcGFzc3dvcmRcclxuICBASW5wdXQoKSAgaXNGaXJzdCAgICAgIDogYm9vbGVhbjtcclxuICAvLyBMYWJlbHNcclxuICBASW5wdXQoKSAgcGFzc0xhYmVscyAgIDogYW55O1xyXG4gIEBJbnB1dCgpICBwYXNzUG9saWNpZXMgOiBhbnk7XHJcbiAgLy8gRGlzcGxheSBzaG93L2hpZGUgYnV0dG9uIGluc2lkZSBwYXNzd29yZCBpbnB1dFxyXG4gIEBJbnB1dCgpICBidG5TaG93UGFzcyAgOiBib29sZWFuO1xyXG4gIC8vIERpc3BsYXkgY2xlYXIgYnV0dG9uIGluc2lkZSBjb2RlIGlucHV0XHJcbiAgQElucHV0KCkgIGJ0bkNsZWFyQ29kZSA6IGJvb2xlYW47XHJcbiAgLy8gRGlzcGxheSBlcnJvcnNcclxuICBASW5wdXQoKSAgZXJyICAgICAgICAgIDogYm9vbGVhbjtcclxuICAvLyBFdmVudCBzZW50IHRvIGxvZ2luLWZvcm0gYW5kIHJlbGF5ZWQgcGFyZW50cyAobW9kYWwgJiB0YWIpXHJcbiAgQE91dHB1dCgpIGZpcnN0Q29ubmVjdGlvbiA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSBsb3N0UGFzc3dvcmQgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3JcclxuICAoXHJcbiAgICBwcml2YXRlIGJ1aWxkZXIgOiBGb3JtQnVpbGRlclxyXG4gIClcclxuICB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmluaXRGb3Jtc0dyb3VwcygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCkgOiB2b2lkXHJcbiAge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbmQoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZXZlbnQgOiBhbnkgPSB7fTtcclxuXHJcbiAgICBsZXQgdmVyaWZDb2RlICAgOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgbGV0IG5ld1Bhc3N3b3JkIDogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICB2ZXJpZkNvZGUgICAgICAgPSB0aGlzLmZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUudmFsdWU7XHJcbiAgICBuZXdQYXNzd29yZCAgICAgPSB0aGlzLmZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC52YWx1ZTtcclxuXHJcbiAgICBldmVudC5wYXNzd29yZCA9IG5ld1Bhc3N3b3JkO1xyXG5cclxuICAgIC8vIEZpcnN0IGNvbm5lY3Rpb25cclxuICAgIGlmKHRoaXMuaXNGaXJzdClcclxuICAgIHtcclxuICAgICAgdGhpcy5maXJzdENvbm5lY3Rpb24uZW1pdChldmVudCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBldmVudC5jb2RlID0gdmVyaWZDb2RlO1xyXG4gICAgLy8gTG9zdCBwYXNzd29yZFxyXG4gICAgdGhpcy5sb3N0UGFzc3dvcmQuZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRGb3Jtc0dyb3VwcygpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCB2YWxpZGF0b3JzIDogYW55ID0gW107XHJcblxyXG4gICAgaWYodGhpcy5wYXNzUG9saWNpZXMuY2hhcilcclxuICAgICAgdmFsaWRhdG9ycy5wdXNoKFBhc3N3b3JkVmFsaWRhdG9yLmNoYXIpO1xyXG4gICAgaWYodGhpcy5wYXNzUG9saWNpZXMubnVtYmVyKVxyXG4gICAgICB2YWxpZGF0b3JzLnB1c2goUGFzc3dvcmRWYWxpZGF0b3IubnVtYmVyKTtcclxuICAgIGlmKHRoaXMucGFzc1BvbGljaWVzLnVwcGVyKVxyXG4gICAgICB2YWxpZGF0b3JzLnB1c2goUGFzc3dvcmRWYWxpZGF0b3IudXBwZXIpO1xyXG4gICAgaWYodGhpcy5wYXNzUG9saWNpZXMubG93ZXIpXHJcbiAgICAgIHZhbGlkYXRvcnMucHVzaChQYXNzd29yZFZhbGlkYXRvci5sb3dlcik7XHJcblxyXG4gICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xyXG4gICAgdmFsaWRhdG9ycy5wdXNoKFBhc3N3b3JkVmFsaWRhdG9yLmxvbmdFbm91Z2godGhpcy5wYXNzUG9saWNpZXMucmFuZ2UubWluLCB0aGlzLnBhc3NQb2xpY2llcy5yYW5nZS5tYXgpKTtcclxuXHJcbiAgICB0aGlzLmZvcm1Hcm91cCA9IHRoaXMuYnVpbGRlci5ncm91cCh7XHJcbiAgICAgIHZlcmlmQ29kZSAgICA6IG5ldyBGb3JtQ29udHJvbCh7XHJcbiAgICAgICAgdmFsdWUgICAgICA6IG51bGwsXHJcbiAgICAgICAgZGlzYWJsZWQgICA6IGZhbHNlXHJcbiAgICAgIH0pLFxyXG4gICAgICBuZXdQYXNzd29yZCAgOiBuZXcgRm9ybUNvbnRyb2woe1xyXG4gICAgICAgIHZhbHVlICAgICAgOiBudWxsLFxyXG4gICAgICAgIGRpc2FibGVkICAgOiBmYWxzZVxyXG4gICAgICB9LCB2YWxpZGF0b3JzKSxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmKCF0aGlzLmlzRmlyc3QpXHJcbiAgICAgIHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS5zZXRWYWxpZGF0b3JzKFtWYWxpZGF0b3JzLnJlcXVpcmVkXSk7XHJcbiAgfVxyXG5cclxufVxyXG4iXX0=