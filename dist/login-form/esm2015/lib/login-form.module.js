/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { LoginFormComponent } from './login-form.component';
import { ModalWrapperComponent } from './layouts/modal-wrapper/modal-wrapper.component';
import { TabWrapperComponent } from './layouts/tab-wrapper/tab-wrapper.component';
import { PwdFormComponent } from './forms/pwd-form/pwd-form.component';
import { MfaSetupFormComponent } from './forms/mfa-setup-form/mfa-setup-form.component';
import { MfaFormComponent } from './forms/mfa-form/mfa-form.component';
import { ExistsLayoutPipe } from './pipes/exists-layout.pipe';
import { QRCodeModule } from 'angularx-qrcode';
export class MaterialModule {
}
MaterialModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    MatButtonModule,
                    MatInputModule,
                    MatIconModule,
                    MatDialogModule,
                    MatTabsModule,
                ]
            },] },
];
function MaterialModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MaterialModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MaterialModule.ctorParameters;
}
export class LoginFormModule {
}
LoginFormModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MaterialModule,
                    FormsModule,
                    ReactiveFormsModule,
                    QRCodeModule
                ],
                declarations: [
                    LoginFormComponent,
                    PwdFormComponent,
                    ModalWrapperComponent,
                    TabWrapperComponent,
                    MfaSetupFormComponent,
                    MfaFormComponent,
                    ExistsLayoutPipe
                ],
                providers: [],
                entryComponents: [ModalWrapperComponent],
                exports: [
                    LoginFormComponent,
                    PwdFormComponent,
                    ModalWrapperComponent,
                    TabWrapperComponent,
                    MfaSetupFormComponent,
                    MfaFormComponent,
                    ExistsLayoutPipe
                ]
            },] },
];
function LoginFormModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    LoginFormModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    LoginFormModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tZm9ybS5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2FsaWF0eXMvbG9naW4tZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9sb2dpbi1mb3JtLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFzQixlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFrQixpQkFBaUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQW1CLGdCQUFnQixDQUFDO0FBQzFELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFXLGdCQUFnQixDQUFDO0FBTTFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBZSxtQkFBbUIsQ0FBQztBQVk3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQWlCLG1CQUFtQixDQUFDO0FBRzdELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBZ0IsbUJBQW1CLENBQUM7QUFHN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFpQixtQkFBbUIsQ0FBQztBQUk3RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQWUsbUJBQW1CLENBQUM7QUFLN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQVksd0JBQXdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQVMsaURBQWlELENBQUM7QUFDM0YsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQVcsNkNBQTZDLENBQUM7QUFDdkYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQWMscUNBQXFDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQVMsaURBQWlELENBQUM7QUFDM0YsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQWMscUNBQXFDLENBQUM7QUFDL0UsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQWMsNEJBQTRCLENBQUM7QUFHdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFrQixpQkFBaUIsQ0FBQztBQWtDM0QsTUFBTTs7O1lBL0JMLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBR1AsZUFBZTtvQkFHZixjQUFjO29CQVVkLGFBQWE7b0JBRWIsZUFBZTtvQkFNZixhQUFhO2lCQUlkO2FBQ0Y7Ozs7Ozs7Ozs7O0FBaUNELE1BQU07OztZQTlCTCxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osY0FBYztvQkFDZCxXQUFXO29CQUNYLG1CQUFtQjtvQkFDbkIsWUFBWTtpQkFDYjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osa0JBQWtCO29CQUNsQixnQkFBZ0I7b0JBQ2hCLHFCQUFxQjtvQkFDckIsbUJBQW1CO29CQUNuQixxQkFBcUI7b0JBQ3JCLGdCQUFnQjtvQkFDaEIsZ0JBQWdCO2lCQUNqQjtnQkFDRCxTQUFTLEVBQUUsRUFDVjtnQkFDRCxlQUFlLEVBQUUsQ0FBRSxxQkFBcUIsQ0FBRTtnQkFDMUMsT0FBTyxFQUFFO29CQUNQLGtCQUFrQjtvQkFDbEIsZ0JBQWdCO29CQUNoQixxQkFBcUI7b0JBQ3JCLG1CQUFtQjtvQkFDbkIscUJBQXFCO29CQUNyQixnQkFBZ0I7b0JBQ2hCLGdCQUFnQjtpQkFDakI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIEFuZ3VsYXIgbW9kdWxlc1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9ICAgICAgICAgICAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gICAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSAgICAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG4vLyBNYXRlcmlhbCBtb2R1bGVzXHJcbi8vIGltcG9ydCB7IE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0VGFibGVNb2R1bGUgfSAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRTb3J0TW9kdWxlIH0gICAgICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IE1hdEJ1dHRvbk1vZHVsZSB9ICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0Q2hpcHNNb2R1bGUgfSAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRDaGVja2JveE1vZHVsZSB9ICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdFJhZGlvTW9kdWxlIH0gICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0U2VsZWN0TW9kdWxlIH0gICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRTbGlkZVRvZ2dsZU1vZHVsZSB9ICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdE1lbnVNb2R1bGUgfSAgICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0U2lkZW5hdk1vZHVsZSB9ICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRUb29sYmFyTW9kdWxlIH0gICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdEdyaWRMaXN0TW9kdWxlIH0gICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0VG9vbHRpcE1vZHVsZSB9ICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRDYXJkTW9kdWxlIH0gICAgICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IE1hdEljb25Nb2R1bGUgfSAgICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUgfSAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRMaXN0TW9kdWxlIH0gICAgICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IE1hdElucHV0TW9kdWxlIH0gICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0RGF0ZXBpY2tlck1vZHVsZSB9ICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXROYXRpdmVEYXRlTW9kdWxlIH0gICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IE1hdFRhYnNNb2R1bGUgfSAgICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0QXV0b2NvbXBsZXRlTW9kdWxlIH0gICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRTdGVwcGVyTW9kdWxlIH0gICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdFBhZ2luYXRvck1vZHVsZSB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgTWF0RGlhbG9nTW9kdWxlIH0gICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRTbmFja0Jhck1vZHVsZSB9ICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdEV4cGFuc2lvbk1vZHVsZSB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbi8vIEludGVybmFsIG1vZHVsZXNcclxuaW1wb3J0IHsgTG9naW5Gb3JtQ29tcG9uZW50IH0gICAgICAgZnJvbSAnLi9sb2dpbi1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1vZGFsV3JhcHBlckNvbXBvbmVudCB9ICAgIGZyb20gJy4vbGF5b3V0cy9tb2RhbC13cmFwcGVyL21vZGFsLXdyYXBwZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVGFiV3JhcHBlckNvbXBvbmVudCB9ICAgICAgZnJvbSAnLi9sYXlvdXRzL3RhYi13cmFwcGVyL3RhYi13cmFwcGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFB3ZEZvcm1Db21wb25lbnQgfSAgICAgICAgIGZyb20gJy4vZm9ybXMvcHdkLWZvcm0vcHdkLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWZhU2V0dXBGb3JtQ29tcG9uZW50IH0gICAgZnJvbSAnLi9mb3Jtcy9tZmEtc2V0dXAtZm9ybS9tZmEtc2V0dXAtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNZmFGb3JtQ29tcG9uZW50IH0gICAgICAgICBmcm9tICcuL2Zvcm1zL21mYS1mb3JtL21mYS1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEV4aXN0c0xheW91dFBpcGUgfSAgICAgICAgIGZyb20gJy4vcGlwZXMvZXhpc3RzLWxheW91dC5waXBlJztcclxuXHJcbi8vIEV4dGVybmFsIG1vZHVsZXNcclxuaW1wb3J0IHsgUVJDb2RlTW9kdWxlIH0gICAgICAgICAgICAgZnJvbSAnYW5ndWxhcngtcXJjb2RlJztcclxuXHJcbi8vIE5nTW9kdWxlIHRoYXQgaW5jbHVkZXMgYWxsIE1hdGVyaWFsIG1vZHVsZXMgdGhhdCBhcmUgcmVxdWlyZWQgdG8gc2VydmUgdGhlIGFwcC5cclxuQE5nTW9kdWxlKHtcclxuICBleHBvcnRzOiBbXHJcbiAgICAvLyBNYXRlcmlhbCBtb2R1bGVzXHJcbiAgICAvLyBNYXRUYWJsZU1vZHVsZSxcclxuICAgIE1hdEJ1dHRvbk1vZHVsZSxcclxuICAgIC8vIE1hdENoaXBzTW9kdWxlLFxyXG4gICAgLy8gTWF0Q2hlY2tib3hNb2R1bGUsXHJcbiAgICBNYXRJbnB1dE1vZHVsZSxcclxuICAgIC8vIE1hdFJhZGlvTW9kdWxlLFxyXG4gICAgLy8gTWF0U2VsZWN0TW9kdWxlLFxyXG4gICAgLy8gTWF0U2xpZGVUb2dnbGVNb2R1bGUsXHJcbiAgICAvLyBNYXRNZW51TW9kdWxlLFxyXG4gICAgLy8gTWF0U2lkZW5hdk1vZHVsZSxcclxuICAgIC8vIE1hdFRvb2xiYXJNb2R1bGUsXHJcbiAgICAvLyBNYXRMaXN0TW9kdWxlLFxyXG4gICAgLy8gTWF0R3JpZExpc3RNb2R1bGUsXHJcbiAgICAvLyBNYXRDYXJkTW9kdWxlLFxyXG4gICAgTWF0SWNvbk1vZHVsZSxcclxuICAgIC8vIE1hdFByb2dyZXNzQmFyTW9kdWxlLFxyXG4gICAgTWF0RGlhbG9nTW9kdWxlLFxyXG4gICAgLy8gTWF0U25hY2tCYXJNb2R1bGUsXHJcbiAgICAvLyBNYXREYXRlcGlja2VyTW9kdWxlLFxyXG4gICAgLy8gTWF0TmF0aXZlRGF0ZU1vZHVsZSxcclxuICAgIC8vIE1hdFByb2dyZXNzU3Bpbm5lck1vZHVsZSxcclxuICAgIC8vIE1hdERhdGVwaWNrZXJNb2R1bGUsXHJcbiAgICBNYXRUYWJzTW9kdWxlLFxyXG4gICAgLy8gTWF0QXV0b2NvbXBsZXRlTW9kdWxlLFxyXG4gICAgLy8gTWF0RXhwYW5zaW9uTW9kdWxlLFxyXG4gICAgLy8gTWF0VG9vbHRpcE1vZHVsZSxcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRlcmlhbE1vZHVsZSB7fVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGUsXHJcbiAgICBNYXRlcmlhbE1vZHVsZSxcclxuICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcclxuICAgIFFSQ29kZU1vZHVsZVxyXG4gIF0sXHJcbiAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICBMb2dpbkZvcm1Db21wb25lbnQsXHJcbiAgICBQd2RGb3JtQ29tcG9uZW50LFxyXG4gICAgTW9kYWxXcmFwcGVyQ29tcG9uZW50LFxyXG4gICAgVGFiV3JhcHBlckNvbXBvbmVudCxcclxuICAgIE1mYVNldHVwRm9ybUNvbXBvbmVudCxcclxuICAgIE1mYUZvcm1Db21wb25lbnQsXHJcbiAgICBFeGlzdHNMYXlvdXRQaXBlXHJcbiAgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogWyBNb2RhbFdyYXBwZXJDb21wb25lbnQgXSxcclxuICBleHBvcnRzOiBbXHJcbiAgICBMb2dpbkZvcm1Db21wb25lbnQsXHJcbiAgICBQd2RGb3JtQ29tcG9uZW50LFxyXG4gICAgTW9kYWxXcmFwcGVyQ29tcG9uZW50LFxyXG4gICAgVGFiV3JhcHBlckNvbXBvbmVudCxcclxuICAgIE1mYVNldHVwRm9ybUNvbXBvbmVudCxcclxuICAgIE1mYUZvcm1Db21wb25lbnQsXHJcbiAgICBFeGlzdHNMYXlvdXRQaXBlXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9naW5Gb3JtTW9kdWxlIHsgfVxyXG4iXX0=