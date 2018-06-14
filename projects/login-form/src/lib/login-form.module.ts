// Angular modules
import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';
import { ReactiveFormsModule }      from '@angular/forms';

// Material modules
// import { MatProgressSpinnerModule } from '@angular/material';
// import { MatTableModule }           from '@angular/material';
// import { MatSortModule }            from '@angular/material';
import { MatButtonModule }          from '@angular/material';
// import { MatChipsModule }           from '@angular/material';
// import { MatCheckboxModule }        from '@angular/material';
// import { MatRadioModule }           from '@angular/material';
// import { MatSelectModule }          from '@angular/material';
// import { MatSlideToggleModule }     from '@angular/material';
// import { MatMenuModule }            from '@angular/material';
// import { MatSidenavModule }         from '@angular/material';
// import { MatToolbarModule }         from '@angular/material';
// import { MatGridListModule }        from '@angular/material';
// import { MatTooltipModule }         from '@angular/material';
// import { MatCardModule }            from '@angular/material';
import { MatIconModule }            from '@angular/material';
// import { MatProgressBarModule }     from '@angular/material';
// import { MatListModule }            from '@angular/material';
import { MatInputModule }           from '@angular/material';
// import { MatDatepickerModule }      from '@angular/material';
// import { MatNativeDateModule }      from '@angular/material';
import { MatTabsModule }            from '@angular/material';
// import { MatAutocompleteModule }    from '@angular/material';
// import { MatStepperModule }         from '@angular/material';
// import { MatPaginatorModule }       from '@angular/material';
import { MatDialogModule }          from '@angular/material';
// import { MatSnackBarModule }        from '@angular/material';
// import { MatExpansionModule }       from '@angular/material';

// Internal modules
import { LoginFormComponent }       from './login-form.component';
import { ModalWrapperComponent }    from './layouts/modal-wrapper/modal-wrapper.component';
import { TabWrapperComponent }      from './layouts/tab-wrapper/tab-wrapper.component';
import { PwdFormComponent }         from './forms/pwd-form/pwd-form.component';
import { MfaSetupFormComponent }    from './forms/mfa-setup-form/mfa-setup-form.component';
import { MfaFormComponent }         from './forms/mfa-form/mfa-form.component';
import { ExistsLayoutPipe }         from './pipes/exists-layout.pipe';

// External modules
import { QRCodeModule }             from 'angularx-qrcode';

// NgModule that includes all Material modules that are required to serve the app.
@NgModule({
  exports: [
    // Material modules
    // MatTableModule,
    MatButtonModule,
    // MatChipsModule,
    // MatCheckboxModule,
    MatInputModule,
    // MatRadioModule,
    // MatSelectModule,
    // MatSlideToggleModule,
    // MatMenuModule,
    // MatSidenavModule,
    // MatToolbarModule,
    // MatListModule,
    // MatGridListModule,
    // MatCardModule,
    MatIconModule,
    // MatProgressBarModule,
    MatDialogModule,
    // MatSnackBarModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatProgressSpinnerModule,
    // MatDatepickerModule,
    MatTabsModule,
    // MatAutocompleteModule,
    // MatExpansionModule,
    // MatTooltipModule,
  ]
})
export class MaterialModule {}

@NgModule({
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
  providers: [
  ],
  entryComponents: [ ModalWrapperComponent ],
  exports: [
    LoginFormComponent,
    PwdFormComponent,
    ModalWrapperComponent,
    TabWrapperComponent,
    MfaSetupFormComponent,
    MfaFormComponent,
    ExistsLayoutPipe
  ]
})
export class LoginFormModule { }
