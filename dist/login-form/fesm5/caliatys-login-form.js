import { Component, Inject, EventEmitter, Input, Output, Pipe, NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatIconRegistry, MatButtonModule, MatIconModule, MatInputModule, MatTabsModule, MatDialogModule } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { __values } from 'tslib';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angularx-qrcode';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UsrValidator = /** @class */ (function () {
    function UsrValidator() {
    }
    /**
     * @param {?} regexp
     * @return {?}
     */
    UsrValidator.custom = /**
     * @param {?} regexp
     * @return {?}
     */
    function (regexp) {
        var /** @type {?} */ func = function (control) {
            var /** @type {?} */ isRespectful = control.value !== null && regexp.test(control.value);
            if (!isRespectful)
                return { custom: true };
            return null;
        };
        return func;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    UsrValidator.email = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        var /** @type {?} */ isEmail = control.value !== null && /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/.test(control.value);
        if (!isEmail)
            return { email: true };
        return null;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    UsrValidator.phone = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        var /** @type {?} */ isPhone = control.value !== null && /^\+?\d*$/.test(control.value);
        if (!isPhone)
            return { phone: true };
        return null;
    };
    return UsrValidator;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
var Layouts = {
    MODAL: 'modal',
    TAB: 'tab',
    INLINE: 'inline',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
var Themes = {
    LIGHT: 'light',
    DARK: 'dark',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
var Forms = {
    PWD: 'pwd',
    MFA_SETUP: 'mfaSetup',
    MFA: 'mfa',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {string} */
var UserPolicies = {
    EMAIL: 'email',
    PHONE: 'phone',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LoginFormComponent = /** @class */ (function () {
    // TODO: Captcha
    // @Input()  rememberMe    : boolean = true; // TODO: check box
    function LoginFormComponent(dialog, sanitizer, iconRegistry, builder) {
        this.dialog = dialog;
        this.sanitizer = sanitizer;
        this.iconRegistry = iconRegistry;
        this.builder = builder;
        // Display login form inside a container
        this.fixedWidth = false;
        // Display login form like Google & Microsoft (step by step)
        this.googleStyle = false;
        // Display Google button with the supplied theme : light / dark
        this.googleTheme = null;
        // Optional policy applied on the username input : email / phone / regex
        // Be careful, you must double all the backslashes used in the supplied regex
        this.customUsrPolicy = null;
        // Event triggered after creating the login form (AfterViewInit)
        this.initialized = new EventEmitter();
        // Event triggered after clicking on the sign up button.
        this.signUp = new EventEmitter();
        // Event object containing username and password properties
        this.login = new EventEmitter();
        // Event object containing username, password and social properties
        this.loginSocial = new EventEmitter();
        // Event object containing username property
        this.forgotPwd = new EventEmitter();
        // Event object containing password and code properties
        this.sendResetPwd = new EventEmitter();
        // Event object containing password property
        this.sendFirstPwd = new EventEmitter();
        // Event object containing code property
        this.saveMfaKey = new EventEmitter();
        // Event object containing code property
        this.sendMfaCode = new EventEmitter();
        // Event object containing username property
        this.stepUsr = new EventEmitter();
        // Event object containing username and password property
        this.stepPwd = new EventEmitter();
        this.showPassword = false;
        this.userPolicies = UserPolicies;
        this.forms = Forms;
        this.isFirst = false;
        this.code = null;
        this.qrCode = null;
        this.userInfo = null;
        this.userImage = null;
        this.layouts = Layouts;
        this.selectedTab = 0;
        this.closeModalEvent = new EventEmitter();
        // Social icons
        // TODO: Fix Angular 6 Library assets : https://github.com/angular/angular-cli/issues/11071
        iconRegistry.addSvgIcon('google', sanitizer.bypassSecurityTrustResourceUrl('../assets/img/google.svg'));
        iconRegistry.addSvgIcon('facebook', sanitizer.bypassSecurityTrustResourceUrl('../assets/img/facebook.svg'));
    }
    /**
     * @return {?}
     */
    LoginFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // Login form
        this.initFormGroups();
        // Style (container, step, theme & layout)
        this.initFormLayouts();
        this.initTheme();
        this.initPolicies();
        this.initIcons();
        this.initButtons();
        this.initInputs();
        this.initErrors();
        this.initLabels();
    };
    /**
     * @return {?}
     */
    LoginFormComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.initialized.emit();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    LoginFormComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["googleStyle"])
            this.initFormGroups();
        if (changes["customFormLayouts"])
            this.initFormLayouts();
        if (changes["googleTheme"])
            this.initTheme();
        if (changes["customPwdPolicies"] || changes["customUsrPolicy"])
            this.initPolicies();
        if (changes["customIcons"])
            this.initIcons();
        if (changes["customButtons"])
            this.initButtons();
        if (changes["customInputs"])
            this.initInputs();
        if (changes["customErrors"])
            this.initErrors();
        if (changes["customLabels"])
            this.initLabels();
    };
    /**
     * @return {?}
     */
    LoginFormComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this.modalFirstSub)
            this.modalFirstSub.unsubscribe();
        if (this.modalLostSub)
            this.modalLostSub.unsubscribe();
        if (this.modalSaveMfaKeySub)
            this.modalSaveMfaKeySub.unsubscribe();
        if (this.modalSendMfaCodeSub)
            this.modalSendMfaCodeSub.unsubscribe();
    };
    /**
     * Emit `$event` object containing username and password properties.
     *
     * \@example
     * var username : string = $event.username;
     * var password : string = $event.password;
     * @return {?}
     */
    LoginFormComponent.prototype.onClickLogin = /**
     * Emit `$event` object containing username and password properties.
     *
     * \@example
     * var username : string = $event.username;
     * var password : string = $event.password;
     * @return {?}
     */
    function () {
        var /** @type {?} */ event = {};
        event = this.getEventResponse();
        this.login.emit(event);
    };
    /**
     * Emit `$event` object containing username, password and social properties.
     *
     * \@example
     * var username : string = $event.username;
     * var password : string = $event.password;
     * var social   : string = $event.social;
     * @param {?} social Name of the social provider
     * @return {?}
     */
    LoginFormComponent.prototype.onClickLoginSocial = /**
     * Emit `$event` object containing username, password and social properties.
     *
     * \@example
     * var username : string = $event.username;
     * var password : string = $event.password;
     * var social   : string = $event.social;
     * @param {?} social Name of the social provider
     * @return {?}
     */
    function (social) {
        var /** @type {?} */ event = {};
        event = this.getEventResponse();
        event.social = social;
        this.loginSocial.emit(event);
    };
    /**
     * Emit a click event on the sign up button.
     * @return {?}
     */
    LoginFormComponent.prototype.onClickSignUp = /**
     * Emit a click event on the sign up button.
     * @return {?}
     */
    function () {
        this.signUp.emit();
    };
    /**
     * Emit `$event` object containing username property.
     *
     * \@example
     * var username : string = $event.username;
     * @return {?}
     */
    LoginFormComponent.prototype.onClickForgotPassword = /**
     * Emit `$event` object containing username property.
     *
     * \@example
     * var username : string = $event.username;
     * @return {?}
     */
    function () {
        var /** @type {?} */ event = {};
        event = this.getEventResponse('usr');
        this.forgotPwd.emit(event);
    };
    /**
     * Show password form either to initialize first password or to reset forgot password.
     *
     * @param {?} isFirst Initialize first password or reset forgot password
     * @return {?}
     */
    LoginFormComponent.prototype.showPwdForm = /**
     * Show password form either to initialize first password or to reset forgot password.
     *
     * @param {?} isFirst Initialize first password or reset forgot password
     * @return {?}
     */
    function (isFirst) {
        this.isFirst = isFirst;
        this.formType = Forms.PWD;
        this.showLayout(this.formLayouts.pwd);
    };
    /**
     * Show MFA setup form to initialize first TOTP (Time-based One-time Password).
     *
     * @param {?} code
     * @param {?} qrCode
     * @return {?}
     */
    LoginFormComponent.prototype.showMfaSetupForm = /**
     * Show MFA setup form to initialize first TOTP (Time-based One-time Password).
     *
     * @param {?} code
     * @param {?} qrCode
     * @return {?}
     */
    function (code, qrCode) {
        this.code = code;
        this.qrCode = qrCode;
        this.formType = Forms.MFA_SETUP;
        this.showLayout(this.formLayouts.mfaSetup);
    };
    /**
     * Show MFA form to get verification code.
     * @return {?}
     */
    LoginFormComponent.prototype.showMfaForm = /**
     * Show MFA form to get verification code.
     * @return {?}
     */
    function () {
        this.formType = Forms.MFA;
        this.showLayout(this.formLayouts.mfa);
    };
    /**
     * Hide password form.
     * @return {?}
     */
    LoginFormComponent.prototype.hidePwdForm = /**
     * Hide password form.
     * @return {?}
     */
    function () {
        this.closeLayout(this.formLayouts.password);
    };
    /**
     * Hide MFA setup form.
     * @return {?}
     */
    LoginFormComponent.prototype.hideMfaSetupForm = /**
     * Hide MFA setup form.
     * @return {?}
     */
    function () {
        this.closeLayout(this.formLayouts.mfaSetup);
    };
    /**
     * Hide MFA form.
     * @return {?}
     */
    LoginFormComponent.prototype.hideMfaForm = /**
     * Hide MFA form.
     * @return {?}
     */
    function () {
        this.closeLayout(this.formLayouts.mfa);
    };
    /**
     * Go password step.
     * @param {?=} userInfo
     * @param {?=} userImage
     * @return {?}
     */
    LoginFormComponent.prototype.showPwdStep = /**
     * Go password step.
     * @param {?=} userInfo
     * @param {?=} userImage
     * @return {?}
     */
    function (userInfo, userImage) {
        if (userInfo === void 0) { userInfo = null; }
        if (userImage === void 0) { userImage = null; }
        this.userInfo = userInfo;
        this.userImage = userImage;
        this.selectedTab = 2;
    };
    /**
     * @param {?} currentStep
     * @return {?}
     */
    LoginFormComponent.prototype.onClickNextStep = /**
     * @param {?} currentStep
     * @return {?}
     */
    function (currentStep) {
        switch (currentStep) {
            case 0:
                this.selectedTab = 1;
                break;
            case 1:
                // Username
                var /** @type {?} */ eventUsr = null;
                eventUsr = this.getEventResponse('usr');
                this.stepUsr.emit(eventUsr);
                break;
            case 2:
                // Password
                var /** @type {?} */ eventPwd = null;
                eventPwd = this.getEventResponse();
                this.stepPwd.emit(eventPwd);
                break;
            default:
                break;
        }
    };
    /**
     * @param {?} currentStep
     * @return {?}
     */
    LoginFormComponent.prototype.onClickPrevStep = /**
     * @param {?} currentStep
     * @return {?}
     */
    function (currentStep) {
        switch (currentStep) {
            case 0:
                break;
            case 1:
                // Username
                this.selectedTab = 0;
                break;
            case 2:
                // Password
                this.selectedTab = 1;
                break;
            default:
                break;
        }
    };
    /**
     * Emit `$event` object containing password property.
     *
     * \@example
     * var newPassword : string = $event.password;
     * @param {?} $event
     * @return {?}
     */
    LoginFormComponent.prototype.tabFirstLog = /**
     * Emit `$event` object containing password property.
     *
     * \@example
     * var newPassword : string = $event.password;
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.sendFirstPwd.emit($event);
    };
    /**
     * Emit `$event` object containing password and code properties.
     *
     * \@example
     * var newPassword      : string = $event.password;
     * var verificationCode : string = $event.code;
     * @param {?} $event
     * @return {?}
     */
    LoginFormComponent.prototype.tabLostPwd = /**
     * Emit `$event` object containing password and code properties.
     *
     * \@example
     * var newPassword      : string = $event.password;
     * var verificationCode : string = $event.code;
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.sendResetPwd.emit($event);
    };
    /**
     * Emit `$event` object containing code property.
     *
     * \@example
     * var verificationCode : string = $event.code;
     * @param {?} $event
     * @return {?}
     */
    LoginFormComponent.prototype.tabSaveMfaKey = /**
     * Emit `$event` object containing code property.
     *
     * \@example
     * var verificationCode : string = $event.code;
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.saveMfaKey.emit($event);
    };
    /**
     * Emit `$event` object containing code property.
     *
     * \@example
     * var verificationCode : string = $event.code;
     * @param {?} $event
     * @return {?}
     */
    LoginFormComponent.prototype.tabSendMfaCode = /**
     * Emit `$event` object containing code property.
     *
     * \@example
     * var verificationCode : string = $event.code;
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.sendMfaCode.emit($event);
    };
    /**
     * Emit `$event` object containing password property.
     *
     * \@example
     * var newPassword : string = $event.password;
     * @param {?} dialogRef
     * @return {?}
     */
    LoginFormComponent.prototype.modalFirstLog = /**
     * Emit `$event` object containing password property.
     *
     * \@example
     * var newPassword : string = $event.password;
     * @param {?} dialogRef
     * @return {?}
     */
    function (dialogRef) {
        var _this = this;
        this.modalFirstSub = dialogRef.componentInstance.relayFirstLog.subscribe(function (event) {
            _this.sendFirstPwd.emit(event);
        });
    };
    /**
     * Emit `$event` object containing password and code properties.
     *
     * \@example
     * var newPassword      : string = $event.password;
     * var verificationCode : string = $event.code;
     * @param {?} dialogRef
     * @return {?}
     */
    LoginFormComponent.prototype.modalLostPwd = /**
     * Emit `$event` object containing password and code properties.
     *
     * \@example
     * var newPassword      : string = $event.password;
     * var verificationCode : string = $event.code;
     * @param {?} dialogRef
     * @return {?}
     */
    function (dialogRef) {
        var _this = this;
        this.modalLostSub = dialogRef.componentInstance.relayLostPwd.subscribe(function (event) {
            _this.sendResetPwd.emit(event);
        });
    };
    /**
     * Emit `$event` object containing code property.
     *
     * \@example
     * var verificationCode : string = $event.code;
     * @param {?} dialogRef
     * @return {?}
     */
    LoginFormComponent.prototype.modalSaveMfaKey = /**
     * Emit `$event` object containing code property.
     *
     * \@example
     * var verificationCode : string = $event.code;
     * @param {?} dialogRef
     * @return {?}
     */
    function (dialogRef) {
        var _this = this;
        this.modalSaveMfaKeySub = dialogRef.componentInstance.relaySaveMfaKey.subscribe(function (event) {
            _this.saveMfaKey.emit(event);
        });
    };
    /**
     * Emit `$event` object containing code property.
     *
     * \@example
     * var verificationCode : string = $event.code;
     * @param {?} dialogRef
     * @return {?}
     */
    LoginFormComponent.prototype.modalSendMfaCode = /**
     * Emit `$event` object containing code property.
     *
     * \@example
     * var verificationCode : string = $event.code;
     * @param {?} dialogRef
     * @return {?}
     */
    function (dialogRef) {
        var _this = this;
        this.modalSendMfaCodeSub = dialogRef.componentInstance.relaySendMfaCode.subscribe(function (event) {
            _this.sendMfaCode.emit(event);
        });
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    LoginFormComponent.prototype.onClickCloseTab = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.closeTab();
    };
    /**
     * @return {?}
     */
    LoginFormComponent.prototype.openModal = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ params = {
            // Common
            formType: this.formType,
            labels: this.labels,
            closeEvent: this.closeModalEvent,
            errors: this.errors,
            inputs: this.inputs,
            // Password form
            isFirst: this.isFirst,
            pwdPolicies: this.pwdPolicies,
            // Mfa form
            code: this.code,
            qrCode: this.qrCode
        };
        var /** @type {?} */ dialogRef = this.dialog.open(ModalWrapperComponent, { data: params });
        if (this.formType === Forms.PWD) {
            this.modalFirstLog(dialogRef);
            this.modalLostPwd(dialogRef);
        }
        if (this.formType === Forms.MFA_SETUP)
            this.modalSaveMfaKey(dialogRef);
        if (this.formType === Forms.MFA)
            this.modalSendMfaCode(dialogRef);
        dialogRef.afterClosed().subscribe(function (result) {
            _this.formType = null;
            if (result)
                _this.formGroup.controls["password"].setValue(result); // Set password
        });
    };
    /**
     * @param {?} formLayout
     * @return {?}
     */
    LoginFormComponent.prototype.showLayout = /**
     * @param {?} formLayout
     * @return {?}
     */
    function (formLayout) {
        switch (formLayout) {
            case Layouts.TAB:
                this.openTab();
                break;
            case Layouts.MODAL:
                this.openModal();
                break;
            case Layouts.INLINE:
                this.formGroup.controls["username"].disable();
                this.formGroup.controls["password"].disable();
                break;
            default:
                this.openTab();
                break;
        }
    };
    /**
     * @param {?} formLayout
     * @return {?}
     */
    LoginFormComponent.prototype.closeLayout = /**
     * @param {?} formLayout
     * @return {?}
     */
    function (formLayout) {
        this.formType = null;
        switch (formLayout) {
            case Layouts.TAB:
                this.closeTab();
                break;
            case Layouts.MODAL:
                this.closeModal();
                break;
            case Layouts.INLINE:
                this.formGroup.controls["username"].enable();
                this.formGroup.controls["password"].enable();
                break;
            default:
                this.closeTab();
                break;
        }
    };
    /**
     * @return {?}
     */
    LoginFormComponent.prototype.closeModal = /**
     * @return {?}
     */
    function () {
        this.closeModalEvent.emit();
    };
    /**
     * @return {?}
     */
    LoginFormComponent.prototype.openTab = /**
     * @return {?}
     */
    function () {
        if (this.googleStyle)
            this.selectedTab = 3;
        else
            this.selectedTab = 1;
    };
    /**
     * @return {?}
     */
    LoginFormComponent.prototype.closeTab = /**
     * @return {?}
     */
    function () {
        this.selectedTab = 0;
    };
    /**
     * @param {?=} onlyOne
     * @return {?}
     */
    LoginFormComponent.prototype.getEventResponse = /**
     * @param {?=} onlyOne
     * @return {?}
     */
    function (onlyOne) {
        if (onlyOne === void 0) { onlyOne = null; }
        var /** @type {?} */ event = {};
        var /** @type {?} */ username = null;
        var /** @type {?} */ password = null;
        if (this.googleStyle) {
            username = this.usrFormGroup.controls["username"].value;
            password = this.pwdFormGroup.controls["password"].value;
        }
        else {
            username = this.formGroup.controls["username"].value;
            password = this.formGroup.controls["password"].value;
        }
        if (!onlyOne) {
            event.username = username;
            event.password = password;
        }
        if (onlyOne && onlyOne === 'usr')
            event.username = username;
        if (onlyOne && onlyOne === 'pwd')
            event.password = password;
        return event;
    };
    /**
     * @return {?}
     */
    LoginFormComponent.prototype.initFormLayouts = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ defaultFormLayouts = null;
        var /** @type {?} */ formLayouts = null;
        // Form layouts
        defaultFormLayouts = {
            pwd: Layouts.TAB,
            mfaSetup: Layouts.TAB,
            mfa: Layouts.TAB,
        };
        formLayouts = Object.assign(defaultFormLayouts, this.customFormLayouts);
        // Corrections
        if (formLayouts.pwd === Layouts.INLINE)
            formLayouts.pwd = Layouts.TAB;
        if (formLayouts.mfaSetup === Layouts.INLINE)
            formLayouts.mfaSetup = Layouts.TAB;
        if (this.googleStyle && formLayouts.mfa === Layouts.INLINE)
            formLayouts.mfa = Layouts.TAB;
        this.formLayouts = formLayouts;
    };
    /**
     * @return {?}
     */
    LoginFormComponent.prototype.initTheme = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ theme = null;
        // Theme
        switch (this.googleTheme) {
            case Themes.LIGHT:
                theme = this.googleTheme;
                break;
            case Themes.DARK:
                theme = this.googleTheme;
                break;
            default:
                theme = Themes.LIGHT;
                break;
        }
        this.theme = theme;
    };
    /**
     * @return {?}
     */
    LoginFormComponent.prototype.initIcons = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ defaultIcons = null;
        var /** @type {?} */ icons = null;
        // Icons
        defaultIcons = {
            iconUsrOnLoginForm: true,
            iconPwdOnLoginForm: true,
        };
        icons = Object.assign(defaultIcons, this.customIcons);
        this.icons = icons;
    };
    /**
     * @return {?}
     */
    LoginFormComponent.prototype.initButtons = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ defaultButons = null;
        var /** @type {?} */ buttons = null;
        // Buttons
        defaultButons = {
            forgotPassword: true,
            signUp: true,
            google: true,
            facebook: true
        };
        buttons = Object.assign(defaultButons, this.customButtons);
        this.buttons = buttons;
    };
    /**
     * @return {?}
     */
    LoginFormComponent.prototype.initInputs = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ defaultInputs = null;
        var /** @type {?} */ inputs = null;
        // Inputs
        defaultInputs = {
            clearUsrOnLoginForm: true,
            showPwdOnLoginForm: true,
            showPwdOnPwdForm: true,
            clearCodeOnPwdForm: true,
            clearCodeOnMfaForm: true
        };
        inputs = Object.assign(defaultInputs, this.customInputs);
        this.inputs = inputs;
    };
    /**
     * @return {?}
     */
    LoginFormComponent.prototype.initErrors = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ defaultErrors = null;
        var /** @type {?} */ errors = null;
        // Errors
        defaultErrors = {
            login: true,
            pwd: true,
            mfa: true
        };
        errors = Object.assign(defaultErrors, this.customErrors);
        this.errors = errors;
    };
    /**
     * @return {?}
     */
    LoginFormComponent.prototype.initPolicies = /**
     * @return {?}
     */
    function () {
        // NOTE: Password
        var /** @type {?} */ defaultPwdPolicies = null;
        var /** @type {?} */ pwdPolicies = null;
        var /** @type {?} */ defaultMin = 8;
        var /** @type {?} */ defaultMax = 128;
        // Password policies
        defaultPwdPolicies = {
            range: {
                min: defaultMin,
                max: defaultMax,
            },
            char: true,
            number: true,
            lower: true,
            upper: true
        };
        pwdPolicies = Object.assign(defaultPwdPolicies, this.customPwdPolicies);
        if (pwdPolicies.range.min > pwdPolicies.range.max) {
            pwdPolicies.range.min = defaultMin;
            pwdPolicies.range.max = defaultMax;
        }
        this.pwdPolicies = pwdPolicies;
        // NOTE: Username
        if (!this.customUsrPolicy)
            return;
        var /** @type {?} */ validators = [];
        switch (this.customUsrPolicy) {
            case UserPolicies.EMAIL:
                validators.push(UsrValidator.email);
                break;
            case UserPolicies.PHONE:
                validators.push(UsrValidator.phone);
                break;
            default:
                var /** @type {?} */ regExp = null;
                regExp = new RegExp(this.customUsrPolicy);
                validators.push(UsrValidator.custom(regExp));
                break;
        }
        validators.push(Validators.required);
        if (this.googleStyle)
            this.usrFormGroup.controls["username"].setValidators(validators);
        else
            this.formGroup.controls["username"].setValidators(validators);
    };
    /**
     * @return {?}
     */
    LoginFormComponent.prototype.initLabels = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ defaultLabels = {};
        var /** @type {?} */ labels = {};
        defaultLabels.header = {
            titlePwd: 'Lost password',
            subtitlePwd: 'Please enter the confirmation code',
            titlePwdSetup: 'Password setup',
            subtitlePwdSetup: 'Please enter a new password',
            titleMfa: 'MFA',
            subtitleMfa: 'Please enter the confirmation code',
            titleMfaSetup: 'MFA setup',
            subtitleMfaSetup: 'Save this secret key for future connection'
        };
        defaultLabels.input = {
            username: 'Username',
            password: 'Password',
            verifCode: 'Verification code',
            newPassword: 'New password'
        };
        defaultLabels.button = {
            signIn: 'Sign in',
            signUp: 'Sign up',
            next: 'Next',
            back: 'Back',
            send: 'Send',
            save: 'Save',
            forgotPassword: 'Forgot password',
            googleSignIn: 'Sign in with Google',
            facebookSignIn: 'Sign in with Facebook'
        };
        defaultLabels.policy = {
            required: 'This field is required',
            nonWhitespace: 'This value must not contain any spaces',
            email: 'This value must be an email',
            phone: 'This value must be a phone number',
            sixDigits: 'This value must contains six digits',
            customRegex: 'This value must match the custom regex provided',
            pwdLength: 'Minimum password length ({{min}} to {{max}})',
            pwdUppercase: 'Require at least one uppercase letter (A to Z)',
            pwdLowercase: 'Require at least one lowercase letter (a to z)',
            pwdNumber: 'Require at least one number (0 to 9)',
            pwdSpecial: 'Require at least one nonalphanumeric character ! @ # $ % ^ & * ( ) _ + - = [ ] { } | \''
        };
        labels = Object.assign(defaultLabels, this.customLabels);
        this.labels = labels;
    };
    /**
     * @return {?}
     */
    LoginFormComponent.prototype.initFormGroups = /**
     * @return {?}
     */
    function () {
        if (!this.googleStyle) {
            this.formGroup = this.builder.group({
                username: new FormControl({
                    value: null,
                    disabled: false
                }, [Validators.required]),
                password: new FormControl({
                    value: null,
                    disabled: false
                }, [Validators.required]),
            });
            return;
        }
        this.usrFormGroup = this.builder.group({
            username: new FormControl({
                value: null,
                disabled: false
            }, [Validators.required])
        });
        this.pwdFormGroup = this.builder.group({
            password: new FormControl({
                value: null,
                disabled: false
            }, [Validators.required])
        });
    };
    LoginFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cal-login-form',
                    template: "<div class=\"{{ fixedWidth ? 'login-wrapper' : '' }}\" id=\"debug-login-form\">\n  <mat-tab-group id=\"caliatys-login-form\" [selectedIndex]=\"selectedTab\">\n    <mat-tab label=\"login-form\">\n      <!-- NOTE: Login form -->\n      <form (ngSubmit)=\"onClickLogin()\" [formGroup]=\"formGroup\" *ngIf=\"!googleStyle\">\n        <div class=\"row no-gutters\">\n          <div class=\"col\">\n            <div class=\"row no-gutters\">\n              <div class=\"col\">\n                <!-- NOTE: Username -->\n                <mat-form-field class=\"w-100\">\n                  <div matPrefix class=\"mr-2\" *ngIf=\"icons.iconUsrOnLoginForm\">\n                    <mat-icon class=\"align-bottom\">person</mat-icon>\n                  </div>\n                  <input matInput formControlName=\"username\" \n                    name=\"username\" autocomplete=\"username\" \n                    placeholder=\"{{ labels.input.username }}\" \n                    type=\"text\"/>\n                  <button *ngIf=\"formGroup.controls.username.value?.length > 0 && inputs.clearUsrOnLoginForm\" \n                    mat-button matSuffix mat-icon-button aria-label=\"Clear\" \n                    color=\"primary\" (click)=\"formGroup.controls.username.setValue('')\" \n                    [disabled]=\"formType === forms.MFA && formLayouts.mfa === layouts.INLINE ? true : false\" \n                    type=\"button\">\n                    <mat-icon>close</mat-icon>\n                  </button>\n                  <!-- NOTE: Error message(s) -->\n                  <mat-hint align=\"start\" *ngIf=\"formGroup.controls.username.errors?.required && errors.login\">\n                    {{ labels.policy.required }}\n                  </mat-hint>\n                  <mat-hint align=\"start\" *ngIf=\"formGroup.controls.username.errors?.pattern && errors.login && usrPolicy === userPolicies.EMAIL\">\n                    {{ labels.policy.email }}\n                  </mat-hint>\n                  <mat-hint align=\"start\" *ngIf=\"formGroup.controls.username.errors?.pattern && errors.login && usrPolicy === userPolicies.PHONE\">\n                    {{ labels.policy.phone }}\n                  </mat-hint>\n                  <mat-hint align=\"start\" *ngIf=\"formGroup.controls.username.errors?.pattern && errors.login && usrPolicy && usrPolicy !== userPolicies.EMAIL && usrPolicy !== userPolicies.PHONE\">\n                    {{ labels.policy.customRegex }}\n                  </mat-hint>\n                </mat-form-field>\n              </div>\n            </div>\n            <div class=\"row no-gutters\">\n              <div class=\"col\">\n                <!-- NOTE: Password -->\n                <mat-form-field class=\"w-100\">\n                  <div matPrefix class=\"mr-2\" *ngIf=\"icons.iconPwdOnLoginForm\">\n                    <mat-icon class=\"align-bottom\">lock</mat-icon>\n                  </div>\n                  <input matInput formControlName=\"password\" \n                    name=\"password\" autocomplete=\"password\" \n                    placeholder=\"{{ labels.input.password }}\" \n                    type=\"{{ showPassword ? 'text' : 'password' }}\"/>\n                  <button *ngIf=\"inputs.showPwdOnLoginForm\" \n                    mat-button matSuffix mat-icon-button aria-label=\"Clear\" \n                    color=\"primary\" (click)=\"showPassword=!showPassword\" \n                    [disabled]=\"formType === forms.MFA && formLayouts.mfa === layouts.INLINE ? true : false\" \n                    type=\"button\">\n                    <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>\n                  </button>\n                  <!-- NOTE: Error message -->\n                  <mat-hint align=\"start\" *ngIf=\"formGroup.controls.password.errors?.required && errors.login\">\n                    {{ labels.policy.required }}\n                  </mat-hint>\n                </mat-form-field>\n              </div> \n            </div>\n            <!-- NOTE: Buttons -->\n            <ng-container *ngIf=\"!( formType === forms.MFA && formLayouts.mfa === layouts.INLINE )\">\n              <div class=\"row no-gutters pb-3\">\n                <div class=\"col text-left\">\n                  <!-- TODO: Remember me -->\n                </div>\n                <!-- NOTE: Forgot password -->\n                <div class=\"col text-right\" *ngIf=\"buttons.forgotPassword\">\n                  <a (click)=\"onClickForgotPassword()\" href=\"#\" class=\"small\">\n                    {{ labels.button.forgotPassword }}\n                  </a>\n                </div>\n              </div>\n              <div class=\"row no-gutters pb-3\">\n                <div class=\"col text-right\">\n                  <!-- NOTE: Sign up -->\n                  <button mat-button (click)=\"onClickSignUp()\" type=\"button\" color=\"primary\" class=\"small text-uppercase mr-3\" *ngIf=\"buttons.signUp\">\n                    {{ labels.button.signUp }}\n                  </button>\n                  <!-- NOTE: Sign in -->\n                  <button mat-raised-button type=\"submit\" color=\"primary\" [disabled]=\"!formGroup.valid\" class=\"small text-uppercase\">\n                    {{ labels.button.signIn }}\n                  </button>\n                </div>\n              </div>\n            </ng-container>\n          </div>\n        </div>\n      </form>\n      <!-- NOTE: Login by steps buttons -->\n      <div class=\"row no-gutters mb-3\" *ngIf=\"googleStyle\">\n        <div class=\"col text-right\" *ngIf=\"buttons.signUp\">\n          <!-- NOTE: Sign up -->\n          <button mat-button (click)=\"onClickSignUp()\" type=\"button\" color=\"primary\" class=\"small text-uppercase mr-2\">\n            {{ labels.button.signUp }}\n          </button>\n        </div>\n        <div class=\"col {{ buttons.signUp ? 'text-left' : 'text-center'}}\">\n          <!-- NOTE: Sign in -->\n          <button mat-raised-button (click)=\"onClickNextStep(0)\" type=\"button\" color=\"primary\" class=\"small text-uppercase ml-2\">\n            {{ labels.button.signIn }}\n          </button>\n        </div>\n      </div>\n      <!-- NOTE: Social buttons -->\n      <ng-container *ngIf=\"!( formType === forms.MFA && formLayouts.mfa === layouts.INLINE )\">\n        <div class=\"row no-gutters\">\n          <div class=\"col text-center\">\n            <!-- NOTE: Google -->\n            <div class=\"d-block mb-3\" *ngIf=\"buttons.google\">\n              <button mat-raised-button type=\"button\" class=\"mat-raised-button cal-btn google {{ theme }}\" (click)=\"onClickLoginSocial('google')\">\n                <span class=\"cal-bg-icon\">\n                  <mat-icon class=\"align-middle cal-icon\" svgIcon=\"google\"></mat-icon>\n                </span>\n                <span class=\"cal-label\">{{ labels.button.googleSignIn }}</span>\n              </button>\n            </div>\n            <!-- NOTE: Facebook -->\n            <div class=\"d-block mb-3\" *ngIf=\"buttons.facebook\">\n              <button mat-raised-button type=\"button\" class=\"cal-btn facebook\" (click)=\"onClickLoginSocial('facebook')\">\n                <span class=\"cal-bg-icon\">\n                  <mat-icon class=\"align-middle cal-icon\" svgIcon=\"facebook\"></mat-icon>\n                </span>\n                <span class=\"cal-label\">{{ labels.button.facebookSignIn }}</span>\n              </button>\n            </div>\n          </div>\n        </div>\n      </ng-container>\n      <!-- NOTE: Inline MFA -->\n      <ng-container *ngIf=\"formType === forms.MFA && formLayouts.mfa === layouts.INLINE\">\n        <div class=\"row no-gutters\">\n          <div class=\"col\">\n            <cal-mfa-form \n              [inputs]=\"inputs\" \n              [labels]=\"labels\" \n              [errors]=\"errors\" \n              (sendMfa)=\"tabSendMfaCode($event)\">\n            </cal-mfa-form>\n          </div>\n        </div>\n      </ng-container>\n    </mat-tab>\n    <mat-tab label=\"usr-step\" *ngIf=\"googleStyle\">\n      <!-- NOTE: Back button -->\n      <div class=\"row no-gutters mb-3\">\n        <div class=\"col\">\n          <a href=\"#\" (click)=\"onClickPrevStep(1)\" title=\"{{ labels.button.back }}\">\n            <mat-icon class=\"align-bottom mr-2\">keyboard_arrow_left</mat-icon>{{ labels.button.back }}\n          </a>\n        </div>\n      </div>\n      <form (ngSubmit)=\"onClickNextStep(1)\" [formGroup]=\"usrFormGroup\">\n        <!-- NOTE: Username -->\n        <mat-form-field class=\"w-100\">\n          <div matPrefix class=\"mr-2\" *ngIf=\"icons.iconUsrOnLoginForm\">\n            <mat-icon class=\"align-bottom\">person</mat-icon>\n          </div>\n          <input matInput formControlName=\"username\" \n            name=\"username\" autocomplete=\"username\" \n            placeholder=\"{{ labels.input.username }}\" \n            type=\"text\"/>\n          <button *ngIf=\"usrFormGroup.controls.username.value?.length > 0 && inputs.clearUsrOnLoginForm\" \n            mat-button matSuffix mat-icon-button aria-label=\"Clear\" \n            color=\"primary\" (click)=\"usrFormGroup.controls.username.setValue('')\" \n            [disabled]=\"formType === forms.MFA && formLayouts.mfa === layouts.INLINE ? true : false\" \n            type=\"button\">\n            <mat-icon>close</mat-icon>\n          </button>\n          <!-- NOTE: Error message(s) -->\n          <mat-hint align=\"start\" *ngIf=\"usrFormGroup.controls.username.errors?.required && errors.login\">\n            {{ labels.policy.required }}\n          </mat-hint>\n          <mat-hint align=\"start\" *ngIf=\"usrFormGroup.controls.username.errors?.pattern && errors.login && usrPolicy === userPolicies.EMAIL\">\n            {{ labels.policy.email }}\n          </mat-hint>\n          <mat-hint align=\"start\" *ngIf=\"usrFormGroup.controls.username.errors?.pattern && errors.login && usrPolicy === userPolicies.PHONE\">\n            {{ labels.policy.phone }}\n          </mat-hint>\n          <mat-hint align=\"start\" *ngIf=\"usrFormGroup.controls.username.errors?.pattern && errors.login && usrPolicy && usrPolicy !== userPolicies.EMAIL && usrPolicy !== userPolicies.PHONE\">\n            {{ labels.policy.customRegex }}\n          </mat-hint>\n        </mat-form-field>\n        <div class=\"row no-gutters mb-3\">\n          <!-- NOTE: Forgot password -->\n          <div class=\"col text-left\" *ngIf=\"buttons.forgotPassword\">\n            <a (click)=\"onClickForgotPassword()\" href=\"#\" class=\"small\">\n              {{ labels.button.forgotPassword }}\n            </a>\n          </div>\n          <!-- NOTE: Next button -->\n          <div class=\"col text-right\">\n            <button mat-raised-button type=\"submit\" color=\"primary\" [disabled]=\"!usrFormGroup.valid\" class=\"small text-uppercase\">\n              {{ labels.button.next }}\n            </button>\n          </div>\n        </div>\n      </form>\n    </mat-tab>\n    <mat-tab label=\"pwd-step\" *ngIf=\"googleStyle\">\n      <!-- NOTE: Back button -->\n      <div class=\"row no-gutters mb-3\">\n        <div class=\"col\">\n          <a href=\"#\" (click)=\"onClickPrevStep(2)\" title=\"{{ labels.button.back }}\">\n            <mat-icon class=\"align-bottom mr-2\">keyboard_arrow_left</mat-icon>{{ labels.button.back }}\n          </a>\n        </div>\n      </div>\n      <!-- TODO: User info -->\n      <p>{{ userInfo }}</p>\n      <form (ngSubmit)=\"onClickNextStep(2)\" [formGroup]=\"pwdFormGroup\">\n        <!-- NOTE: Password -->\n        <mat-form-field class=\"w-100\">\n          <div matPrefix class=\"mr-2\" *ngIf=\"icons.iconPwdOnLoginForm\">\n            <mat-icon class=\"align-bottom\">lock</mat-icon>\n          </div>\n          <input matInput formControlName=\"password\" \n            name=\"password\" autocomplete=\"password\" \n            placeholder=\"{{ labels.input.password }}\" \n            type=\"{{ showPassword ? 'text' : 'password' }}\"/>\n          <button *ngIf=\"inputs.showPwdOnLoginForm\" \n            mat-button matSuffix mat-icon-button aria-label=\"Clear\" \n            color=\"primary\" (click)=\"showPassword=!showPassword\" \n            [disabled]=\"formType === forms.MFA && formLayouts.mfa === layouts.INLINE ? true : false\" \n            type=\"button\">\n            <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>\n          </button>\n          <!-- NOTE: Error message -->\n          <mat-hint align=\"start\" *ngIf=\"pwdFormGroup.controls.password.errors?.required && errors.login\">\n            {{ labels.policy.required }}\n          </mat-hint>\n        </mat-form-field>\n        <!-- NOTE: Next button -->\n        <div class=\"row no-gutters mb-3\">\n          <div class=\"col text-right\">\n            <button mat-raised-button type=\"submit\" color=\"primary\" [disabled]=\"!pwdFormGroup.valid\" class=\"small text-uppercase\">\n              {{ labels.button.next }}\n            </button>\n          </div>\n        </div>\n      </form>\n    </mat-tab>\n    <mat-tab label=\"tab-wrapper\" *ngIf=\"(formLayouts | existsLayout: layouts.TAB)\">\n      <!-- NOTE: Tab form -->\n      <cal-tab-wrapper \n        [formType]=\"formType\" \n        [isFirst]=\"isFirst\" \n        [code]   =\"code\" \n        [qrCode] =\"qrCode\" \n        [pwdPolicies]=\"pwdPolicies\" \n        [errors]=\"errors\" \n        [labels]=\"labels\" \n        [inputs]=\"inputs\" \n        (sendCloseTab)=\"onClickCloseTab($event)\" \n        (relayFirstLog)=\"tabFirstLog($event)\" \n        (relayLostPwd)=\"tabLostPwd($event)\" \n        (relaySaveMfaKey)=\"tabSaveMfaKey($event)\" \n        (relaySendMfaCode)=\"tabSendMfaCode($event)\">\n      </cal-tab-wrapper>\n    </mat-tab>\n  </mat-tab-group>\n</div>",
                    styles: ["/deep/ #caliatys-login-form mat-tab-header{display:none!important}mat-form-field mat-icon{color:grey}.login-wrapper{width:100%;max-width:330px;padding:15px;margin:0 auto}.cal-btn{line-height:35px;border:0!important;padding:1px!important}.cal-btn .cal-bg-icon{padding:8px;width:34px;height:34px;display:inline-block;vertical-align:top!important}.cal-btn .cal-bg-icon .cal-icon{display:inline-block;height:18px;width:18px;margin-top:-4px;vertical-align:top!important}.cal-btn .cal-label{padding-right:8px;padding-left:16px;size:14px;font-family:Roboto,sans-serif}.adn{background-color:#d87a68!important;color:#fff!important}.adn i{color:#fff!important}.adn:hover{background-color:#e29e91!important}.bitbucket{background-color:#205081!important;color:#fff!important}.bitbucket i{color:#fff!important}.bitbucket:hover{background-color:#2a69aa!important}.dropbox{background-color:#1087dd!important;color:#fff!important}.dropbox i{color:#fff!important}.dropbox:hover{background-color:#309ff0!important}.facebook{background-color:#3b5998!important;color:#fff!important}.facebook i{color:#fff!important}.facebook:hover{background-color:#4c70ba!important}.flickr{background-color:#ff0084!important;color:#fff!important}.flickr i{color:#fff!important}.flickr:hover{background-color:#ff339d!important}.foursquare{background-color:#f94877!important;color:#fff!important}.foursquare i{color:#fff!important}.foursquare:hover{background-color:#fb799c!important}.github{background-color:#444!important;color:#fff!important}.github i{color:#fff!important}.github:hover{background-color:#5e5e5e!important}.instagram{background-color:#405de6!important;color:#fff!important}.instagram i{color:#fff!important}.instagram:hover{background-color:#6d83ec!important}.linkedin{background-color:#007bb6!important;color:#fff!important}.linkedin i{color:#fff!important}.linkedin:hover{background-color:#009de9!important}.microsoft{background-color:#2672ec!important;color:#fff!important}.microsoft i{color:#fff!important}.microsoft:hover{background-color:#5590f0!important}.windows{background-color:#2672ec!important;color:#fff!important}.windows i{color:#fff!important}.windows:hover{background-color:#5590f0!important}.odnoklassniki{background-color:#f4731c!important;color:#fff!important}.odnoklassniki i{color:#fff!important}.odnoklassniki:hover{background-color:#f6914d!important}.openid{background-color:#f7931e!important;color:#fff!important}.openid i{color:#fff!important}.openid:hover{background-color:#f9ab4f!important}.pinterest{background-color:#cb2027!important;color:#fff!important}.pinterest i{color:#fff!important}.pinterest:hover{background-color:#e03e44!important}.reddit{background-color:#eff7ff!important;color:#000!important}.reddit i{color:#000!important}.reddit:hover{background-color:#fff!important}.soundcloud{background-color:#f50!important;color:#fff!important}.soundcloud i{color:#fff!important}.soundcloud:hover{background-color:#f73!important}.tumblr{background-color:#2c4762!important;color:#fff!important}.tumblr i{color:#fff!important}.tumblr:hover{background-color:#3c6185!important}.twitter{background-color:#55acee!important;color:#fff!important}.twitter i{color:#fff!important}.twitter:hover{background-color:#83c3f3!important}.vimeo{background-color:#1ab7ea!important;color:#fff!important}.vimeo i{color:#fff!important}.vimeo:hover{background-color:#49c6ee!important}.vk{background-color:#587ea3!important;color:#fff!important}.vk i{color:#fff!important}.vk:hover{background-color:#7897b6!important}.yahoo{background-color:#720e9e!important;color:#fff!important}.yahoo i{color:#fff!important}.yahoo:hover{background-color:#9412cd!important}.google.light{background-color:#fff!important;color:#5f6368!important}.google.light i{color:#5f6368!important}.google.light:hover{background-color:#fff!important}.google.dark{background-color:#4285f4!important;color:#fff!important}.google.dark i{color:#fff!important}.google.dark:hover{background-color:#72a4f7!important}.google.dark .cal-bg-icon{background:#fff}"]
                },] },
    ];
    /** @nocollapse */
    LoginFormComponent.ctorParameters = function () { return [
        { type: MatDialog, },
        { type: DomSanitizer, },
        { type: MatIconRegistry, },
        { type: FormBuilder, },
    ]; };
    LoginFormComponent.propDecorators = {
        "fixedWidth": [{ type: Input },],
        "googleStyle": [{ type: Input },],
        "googleTheme": [{ type: Input },],
        "customFormLayouts": [{ type: Input },],
        "customUsrPolicy": [{ type: Input },],
        "customPwdPolicies": [{ type: Input },],
        "customIcons": [{ type: Input },],
        "customButtons": [{ type: Input },],
        "customInputs": [{ type: Input },],
        "customErrors": [{ type: Input },],
        "customLabels": [{ type: Input },],
        "initialized": [{ type: Output },],
        "signUp": [{ type: Output },],
        "login": [{ type: Output },],
        "loginSocial": [{ type: Output },],
        "forgotPwd": [{ type: Output },],
        "sendResetPwd": [{ type: Output },],
        "sendFirstPwd": [{ type: Output },],
        "saveMfaKey": [{ type: Output },],
        "sendMfaCode": [{ type: Output },],
        "stepUsr": [{ type: Output },],
        "stepPwd": [{ type: Output },],
    };
    return LoginFormComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PwdValidator = /** @class */ (function () {
    function PwdValidator() {
    }
    /**
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    PwdValidator.longEnough = /**
     * @param {?} min
     * @param {?} max
     * @return {?}
     */
    function (min, max) {
        var /** @type {?} */ func = function (control) {
            var /** @type {?} */ isLongEnough = control.value !== null && control.value.length >= min && control.value.length <= max;
            if (!isLongEnough)
                return { longEnough: true };
            return null;
        };
        return func;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    PwdValidator.number = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        var /** @type {?} */ hasNumber = control.value !== null && /\d/.test(control.value);
        if (!hasNumber)
            return { number: true };
        return null;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    PwdValidator.upper = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        var /** @type {?} */ hasUpper = control.value !== null && /[A-Z]/.test(control.value);
        if (!hasUpper)
            return { upper: true };
        return null;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    PwdValidator.lower = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        var /** @type {?} */ hasLower = control.value !== null && /[a-z]/.test(control.value);
        if (!hasLower)
            return { lower: true };
        return null;
    };
    /**
     * @param {?} control
     * @return {?}
     */
    PwdValidator.char = /**
     * @param {?} control
     * @return {?}
     */
    function (control) {
        var /** @type {?} */ hasChar = control.value !== null && /[!@#$%^&\*()_+\-=\[\]{}|']/.test(control.value);
        if (!hasChar)
            return { char: true };
        return null;
    };
    return PwdValidator;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var PwdFormComponent = /** @class */ (function () {
    function PwdFormComponent(builder) {
        this.builder = builder;
        this.showPassword = false;
        // Event sent to the login form and relayed parents (modal & tab)
        this.firstConnection = new EventEmitter();
        this.lostPassword = new EventEmitter();
    }
    /**
     * @return {?}
     */
    PwdFormComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initFormGroups();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PwdFormComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["pwdPolicies"])
            this.initFormGroups(true);
    };
    /**
     * @return {?}
     */
    PwdFormComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    PwdFormComponent.prototype.send = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ event = {};
        var /** @type {?} */ verifCode = null;
        var /** @type {?} */ newPassword = null;
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
    };
    /**
     * @param {?=} refresh
     * @return {?}
     */
    PwdFormComponent.prototype.initFormGroups = /**
     * @param {?=} refresh
     * @return {?}
     */
    function (refresh) {
        if (refresh === void 0) { refresh = false; }
        var /** @type {?} */ verifCode = null;
        var /** @type {?} */ newPassword = null;
        if (refresh && this.formGroup) {
            verifCode = this.formGroup.controls["verifCode"].value;
            newPassword = this.formGroup.controls["newPassword"].value;
        }
        var /** @type {?} */ validators = [];
        if (this.pwdPolicies.char)
            validators.push(PwdValidator.char);
        if (this.pwdPolicies.number)
            validators.push(PwdValidator.number);
        if (this.pwdPolicies.upper)
            validators.push(PwdValidator.upper);
        if (this.pwdPolicies.lower)
            validators.push(PwdValidator.lower);
        validators.push(Validators.required);
        validators.push(PwdValidator.longEnough(this.pwdPolicies.range.min, this.pwdPolicies.range.max));
        // Refresh min max label
        var /** @type {?} */ rangeLabel = null;
        rangeLabel = this.labels.policy.pwdLength;
        rangeLabel = rangeLabel.replace(/{{min}}/, this.pwdPolicies.range.min);
        rangeLabel = rangeLabel.replace(/{{max}}/, this.pwdPolicies.range.max);
        this.labels.policy.pwdLengthReplaced = rangeLabel;
        this.formGroup = this.builder.group({
            verifCode: new FormControl({
                value: verifCode,
                disabled: false
            }),
            newPassword: new FormControl({
                value: newPassword,
                disabled: false
            }, validators),
        });
        if (!this.isFirst)
            this.formGroup.controls["verifCode"].setValidators([Validators.required]);
    };
    PwdFormComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cal-pwd-form',
                    template: "<!-- NOTE: <form autocomplete=\"off\"> will turn off autocomplete for the form in most browsers\n     except for username/email/password fields -->\n<form (ngSubmit)=\"send()\" [formGroup]=\"formGroup\" autocomplete=\"off\">\n\n  <!-- NOTE: fake fields are a workaround for chrome/opera autofill getting the wrong fields -->\n  <input id=\"username\" style=\"display:none\" type=\"text\" name=\"fakeusernameremembered\">\n  <input id=\"password\" style=\"display:none\" type=\"password\" name=\"fakepasswordremembered\">\n\n  <div class=\"row w-100 no-gutters\" *ngIf=\"!isFirst\">\n    <div class=\"col\">\n      <mat-form-field class=\"w-100\">\n        <!-- NOTE: <input autocomplete=\"nope\"> turns off autocomplete on many other browsers that don't respect\n          the form's \"off\", but not for \"password\" inputs. -->\n        <input matInput formControlName=\"verifCode\" \n          name=\"verif-code\" autocomplete=\"nope\" \n          placeholder=\"{{ labels.input.verifCode }}\" \n          pattern=\"\\d{6}\" \n          type=\"text\"/> <!-- NOTE: Pattern matches any non-whitespace character -->\n        <button *ngIf=\"formGroup.controls.verifCode.valid && inputs.clearCodeOnPwdForm\" \n          mat-button matSuffix mat-icon-button aria-label=\"Clear\" \n          color=\"primary\" (click)=\"formGroup.controls.verifCode.setValue('')\" \n          type=\"button\">\n          <mat-icon>close</mat-icon>\n        </button>\n        <!-- NOTE: Error messages -->\n        <mat-hint align=\"start\" *ngIf=\"formGroup.controls.verifCode.errors?.required && errors.pwd\">\n          {{ labels.policy.required }}\n        </mat-hint>\n        <mat-hint align=\"start\" *ngIf=\"formGroup.controls.verifCode.errors?.pattern && errors.pwd\">\n          {{ labels.policy.sixDigits }}\n        </mat-hint>\n      </mat-form-field>\n    </div>\n  </div>\n  <!-- NOTE: <input type=\"password\" autocomplete=\"new-password\" will turn it off for passwords everywhere -->\n  <div class=\"row w-100 no-gutters\">\n    <div class=\"col\">\n      <mat-form-field class=\"w-100\">\n        <input matInput formControlName=\"newPassword\" \n          name=\"new-password\" autocomplete=\"new-password\" \n          placeholder=\"{{ labels.input.newPassword }}\" \n          type=\"{{ showPassword ? 'text' : 'password' }}\"/>\n        <button *ngIf=\"inputs.showPwdOnPwdForm\" \n          mat-button matSuffix mat-icon-button aria-label=\"Clear\" \n          color=\"primary\" (click)=\"showPassword=!showPassword\" \n          type=\"button\">\n          <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>\n        </button>\n        <!-- NOTE: Error message -->\n        <mat-hint align=\"start\" *ngIf=\"formGroup.controls.newPassword.errors?.required && errors.pwd\">\n          {{ labels.policy.required }}\n        </mat-hint>\n      </mat-form-field>\n    </div>\n  </div>\n  <div class=\"row w-100 no-gutters\">\n    <div class=\"col\">\n      <ul class=\"list-unstyled small\">\n        <li class=\"check-policy\">\n          <mat-icon class=\"red-policy\" *ngIf=\"formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.longEnough\">close</mat-icon>\n          <mat-icon class=\"green-policy\" *ngIf=\"!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.longEnough\">check</mat-icon>\n          {{ labels.policy.pwdLengthReplaced }}\n        </li>\n        <li class=\"check-policy\" *ngIf=\"pwdPolicies.upper\">\n          <mat-icon class=\"red-policy\" *ngIf=\"formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.upper\">close</mat-icon>\n          <mat-icon class=\"green-policy\" *ngIf=\"!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.upper\">check</mat-icon>\n          {{ labels.policy.pwdUppercase }}\n        </li>\n        <li class=\"check-policy\" *ngIf=\"pwdPolicies.lower\">\n          <mat-icon class=\"red-policy\" *ngIf=\"formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.lower\">close</mat-icon>\n          <mat-icon class=\"green-policy\" *ngIf=\"!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.lower\">check</mat-icon>\n          {{ labels.policy.pwdLowercase }}\n        </li>\n        <li class=\"check-policy\" *ngIf=\"pwdPolicies.number\">\n          <mat-icon class=\"red-policy\" *ngIf=\"formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.number\">close</mat-icon>\n          <mat-icon class=\"green-policy\" *ngIf=\"!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.number\">check</mat-icon>\n          {{ labels.policy.pwdNumber }}\n        </li>\n        <li class=\"check-policy\" *ngIf=\"pwdPolicies.char\">\n          <mat-icon class=\"red-policy\" *ngIf=\"formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.char\">close</mat-icon>\n          <mat-icon class=\"green-policy\" *ngIf=\"!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.char\">check</mat-icon>\n          {{ labels.policy.pwdSpecial }}\n        </li>\n      </ul>\n    </div>\n  </div>\n  <!-- TODO: Enable Google Captcha -->\n  <!-- <div class=\"row w-100 no-gutters\">\n    <div class=\"col\">\n      <re-captcha site_key=\"6LdBtAkUAAAAAB2_l_TOz7oZmTLXaFjP1cxnu4yM\"\n        (captchaResponse)=\"handleCorrectCaptcha($event)\">\n      </re-captcha>\n    </div>\n  </div> -->\n  <div class=\"pt-0 pb-4 px-4\">\n    <div class=\"row w-100 no-gutters\">\n      <div class=\"col text-right\">\n        <button color=\"primary\" mat-raised-button class=\"small text-uppercase\" type=\"submit\" [disabled]=\"!formGroup.valid\">\n          {{ labels.button.send }}\n        </button>\n      </div>\n    </div>\n  </div>\n</form>",
                    styles: [".green-policy{color:green}.red-policy{color:red}.check-policy{display:flex;align-items:center}.check-policy .mat-icon{margin-right:4px;font-size:22px;height:22px;width:22px}"]
                },] },
    ];
    /** @nocollapse */
    PwdFormComponent.ctorParameters = function () { return [
        { type: FormBuilder, },
    ]; };
    PwdFormComponent.propDecorators = {
        "labels": [{ type: Input },],
        "errors": [{ type: Input },],
        "inputs": [{ type: Input },],
        "isFirst": [{ type: Input },],
        "pwdPolicies": [{ type: Input },],
        "firstConnection": [{ type: Output },],
        "lostPassword": [{ type: Output },],
    };
    return PwdFormComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ExistsLayoutPipe = /** @class */ (function () {
    function ExistsLayoutPipe() {
    }
    /**
     * @param {?} value
     * @param {?} layout
     * @return {?}
     */
    ExistsLayoutPipe.prototype.transform = /**
     * @param {?} value
     * @param {?} layout
     * @return {?}
     */
    function (value, layout) {
        var /** @type {?} */ exist = false;
        try {
            for (var _a = __values(Object.keys(value)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var key = _b.value;
                if (value[key] === layout)
                    exist = true;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return exist;
        var e_1, _c;
    };
    ExistsLayoutPipe.decorators = [
        { type: Pipe, args: [{ name: 'existsLayout' },] },
    ];
    return ExistsLayoutPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
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
    return MaterialModule;
}());
var LoginFormModule = /** @class */ (function () {
    function LoginFormModule() {
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
    return LoginFormModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { LoginFormComponent, MaterialModule, LoginFormModule, ModalWrapperComponent, TabWrapperComponent, PwdFormComponent, MfaFormComponent as ɵb, MfaSetupFormComponent as ɵa, ExistsLayoutPipe as ɵc };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsaWF0eXMtbG9naW4tZm9ybS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vbGliL3ZhbGlkYXRvcnMvdXNyLnZhbGlkYXRvci50cyIsIm5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vbGliL2VudW1zL2xheW91dHMuZW51bS50cyIsIm5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vbGliL2VudW1zL3RoZW1lcy5lbnVtLnRzIiwibmc6Ly9AY2FsaWF0eXMvbG9naW4tZm9ybS9saWIvZW51bXMvZm9ybXMuZW51bS50cyIsIm5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vbGliL2VudW1zL3VzZXItcG9saWNpZXMuZW51bS50cyIsIm5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vbGliL2xheW91dHMvbW9kYWwtd3JhcHBlci9tb2RhbC13cmFwcGVyLmNvbXBvbmVudC50cyIsIm5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vbGliL2xvZ2luLWZvcm0uY29tcG9uZW50LnRzIiwibmc6Ly9AY2FsaWF0eXMvbG9naW4tZm9ybS9saWIvbGF5b3V0cy90YWItd3JhcHBlci90YWItd3JhcHBlci5jb21wb25lbnQudHMiLCJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtL2xpYi92YWxpZGF0b3JzL3B3ZC52YWxpZGF0b3IudHMiLCJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtL2xpYi9mb3Jtcy9wd2QtZm9ybS9wd2QtZm9ybS5jb21wb25lbnQudHMiLCJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtL2xpYi9mb3Jtcy9tZmEtc2V0dXAtZm9ybS9tZmEtc2V0dXAtZm9ybS5jb21wb25lbnQudHMiLCJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtL2xpYi9mb3Jtcy9tZmEtZm9ybS9tZmEtZm9ybS5jb21wb25lbnQudHMiLCJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtL2xpYi9waXBlcy9leGlzdHMtbGF5b3V0LnBpcGUudHMiLCJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtL2xpYi9sb2dpbi1mb3JtLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQ29udHJvbCB9ICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yRm4gfSAgICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0aW9uUmVzdWx0XHJcbntcclxuICBba2V5IDogc3RyaW5nXSA6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVc3JWYWxpZGF0b3Jcclxue1xyXG4gIHB1YmxpYyBzdGF0aWMgY3VzdG9tKHJlZ2V4cCA6IFJlZ0V4cCkgOiBWYWxpZGF0b3JGblxyXG4gIHtcclxuICAgIGxldCBmdW5jID0gKGNvbnRyb2wgOiBBYnN0cmFjdENvbnRyb2wpIDogeyBba2V5IDogc3RyaW5nXSA6IGJvb2xlYW4gfSB8IG51bGwgPT5cclxuICAgIHtcclxuICAgICAgbGV0IGlzUmVzcGVjdGZ1bCA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgcmVnZXhwLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICAgIGlmICggIWlzUmVzcGVjdGZ1bCApXHJcbiAgICAgICAgcmV0dXJuIHsgY3VzdG9tIDogdHJ1ZSB9O1xyXG5cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGVtYWlsKGNvbnRyb2wgOiBGb3JtQ29udHJvbCkgOiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAge1xyXG4gICAgbGV0IGlzRW1haWwgPSBjb250cm9sLnZhbHVlICE9PSBudWxsICYmIC9bYS16MC05Ll8lKy1dK0BbYS16MC05Li1dK1xcLlthLXpdezIsNH0vLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFpc0VtYWlsIClcclxuICAgICAgcmV0dXJuIHsgZW1haWw6IHRydWUgfTtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgcGhvbmUoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaXNQaG9uZSA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgL15cXCs/XFxkKiQvLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFpc1Bob25lIClcclxuICAgICAgcmV0dXJuIHsgcGhvbmU6IHRydWUgfTtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCBlbnVtIExheW91dHNcclxue1xyXG4gIE1PREFMICA9ICdtb2RhbCcsXHJcbiAgVEFCICAgID0gJ3RhYicsXHJcbiAgSU5MSU5FID0gJ2lubGluZSdcclxufVxyXG4iLCJleHBvcnQgZW51bSBUaGVtZXNcclxue1xyXG4gIExJR0hUID0gJ2xpZ2h0JyxcclxuICBEQVJLICA9ICdkYXJrJ1xyXG59XHJcbiIsImV4cG9ydCBlbnVtIEZvcm1zXHJcbntcclxuICBQV0QgICAgICAgPSAncHdkJyxcclxuICBNRkFfU0VUVVAgPSAnbWZhU2V0dXAnLFxyXG4gIE1GQSAgICAgICA9ICdtZmEnXHJcbn1cclxuIiwiZXhwb3J0IGVudW0gVXNlclBvbGljaWVzXHJcbntcclxuICBFTUFJTCAgPSAnZW1haWwnLFxyXG4gIFBIT05FICA9ICdwaG9uZSdcclxufVxyXG4iLCIvLyBBbmd1bGFyIG1vZHVsZXNcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9uSW5pdCB9ICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPbkRlc3Ryb3kgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSW5qZWN0IH0gICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9ICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbi8vIEV4dGVybmFsIG1vZHVsZXNcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gICAgZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xyXG5cclxuLy8gRW51bVxyXG5pbXBvcnQgeyBGb3JtcyB9ICAgICAgICAgICBmcm9tICcuLi8uLi9lbnVtcy9mb3Jtcy5lbnVtJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yICAgIDogJ2NhbC1tb2RhbC13cmFwcGVyJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJoZWFkZXIgcHktMiBweC00XCI+XHJcbiAgPGRpdiBjbGFzcz1cInJvdyBhbGlnbi1pdGVtcy1jZW50ZXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgPGRpdiAqbmdJZj1cIiFpc0ZpcnN0ICYmIGZvcm1UeXBlID09PSBmb3Jtcy5QV0RcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImg1IGZvbnQtd2VpZ2h0LWxpZ2h0IHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVQd2QgPyAnZC1ibG9jayBtYi0wJyA6ICcnIH19XCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnRpdGxlUHdkIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwibGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZFwiIGNsYXNzPVwiZC1ibG9jayBmb250LXdlaWdodC1saWdodCBzbWFsbFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZCB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJpc0ZpcnN0ICYmIGZvcm1UeXBlID09PSBmb3Jtcy5QV0RcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImg1IGZvbnQtd2VpZ2h0LWxpZ2h0IHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVQd2RTZXR1cCA/ICdkLWJsb2NrIG1iLTAnIDogJycgfX1cIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIudGl0bGVQd2RTZXR1cCB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cImxhYmVscy5oZWFkZXIuc3VidGl0bGVQd2RTZXR1cFwiIGNsYXNzPVwiZC1ibG9jayBmb250LXdlaWdodC1saWdodCBzbWFsbFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZFNldHVwIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdJZj1cImZvcm1UeXBlID09PSBmb3Jtcy5NRkFcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImg1IGZvbnQtd2VpZ2h0LWxpZ2h0IHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVNZmEgPyAnZC1ibG9jayBtYi0wJyA6ICcnIH19XCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnRpdGxlTWZhIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwibGFiZWxzLmhlYWRlci5zdWJ0aXRsZU1mYVwiIGNsYXNzPVwiZC1ibG9jayBmb250LXdlaWdodC1saWdodCBzbWFsbFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZU1mYSB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBX1NFVFVQXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJoNSBmb250LXdlaWdodC1saWdodCB7eyBsYWJlbHMuaGVhZGVyLnN1YnRpdGxlTWZhU2V0dXAgPyAnZC1ibG9jayBtYi0wJyA6ICcnIH19XCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnRpdGxlTWZhU2V0dXAgfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJsYWJlbHMuaGVhZGVyLnN1YnRpdGxlTWZhU2V0dXBcIiBjbGFzcz1cImQtYmxvY2sgZm9udC13ZWlnaHQtbGlnaHQgc21hbGxcIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVNZmFTZXR1cCB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtMiBweC0wIHRleHQtcmlnaHRcIj5cclxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0LWRpYWxvZy1jbG9zZT5cclxuICAgICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuPG1hdC1kaWFsb2ctY29udGVudCBjbGFzcz1cInB5LTRcIj5cclxuICA8IS0tIE5PVEU6IFB3ZCBGb3JtIC0tPlxyXG4gIDxjYWwtcHdkLWZvcm0gKm5nSWY9XCJmb3JtVHlwZSA9PT0gZm9ybXMuUFdEXCIgXHJcbiAgICBbaXNGaXJzdF09XCJpc0ZpcnN0XCIgXHJcbiAgICBbcHdkUG9saWNpZXNdPVwicHdkUG9saWNpZXNcIiBcclxuICAgIFtsYWJlbHNdPVwibGFiZWxzXCIgXHJcbiAgICBbaW5wdXRzXT1cImlucHV0c1wiIFxyXG4gICAgW2Vycm9yc109XCJlcnJvcnNcIiBcclxuICAgIChmaXJzdENvbm5lY3Rpb24pPVwicmVsYXlGaXJzdExvZ0V2ZW50KCRldmVudClcIiBcclxuICAgIChsb3N0UGFzc3dvcmQpPVwicmVsYXlMb3N0UHdkRXZlbnQoJGV2ZW50KVwiPlxyXG4gIDwvY2FsLXB3ZC1mb3JtPlxyXG4gIDwhLS0gTk9URTogTUZBIFNldHVwIEZvcm0gLS0+XHJcbiAgPGNhbC1tZmEtc2V0dXAtZm9ybSAqbmdJZj1cImZvcm1UeXBlID09PSBmb3Jtcy5NRkFfU0VUVVBcIiBcclxuICAgIFtxckNvZGVdPVwicXJDb2RlXCIgXHJcbiAgICBbY29kZV0gID1cImNvZGVcIiBcclxuICAgIFtsYWJlbHNdPVwibGFiZWxzXCIgXHJcbiAgICBbaW5wdXRzXT1cImlucHV0c1wiIFxyXG4gICAgW2Vycm9yc109XCJlcnJvcnNcIiBcclxuICAgIChzYXZlTWZhKT1cInJlbGF5U2F2ZU1mYUtleUV2ZW50KCRldmVudClcIj5cclxuICA8L2NhbC1tZmEtc2V0dXAtZm9ybT5cclxuICA8IS0tIE5PVEU6IE1GQSBGb3JtIC0tPlxyXG4gIDxjYWwtbWZhLWZvcm0gKm5nSWY9XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBXCIgXHJcbiAgICBbbGFiZWxzXT1cImxhYmVsc1wiIFxyXG4gICAgW2lucHV0c109XCJpbnB1dHNcIiBcclxuICAgIFtlcnJvcnNdPVwiZXJyb3JzXCIgXHJcbiAgICAoc2VuZE1mYSk9XCJyZWxheVNlbmRNZmFDb2RlRXZlbnQoJGV2ZW50KVwiPlxyXG4gIDwvY2FsLW1mYS1mb3JtPlxyXG48L21hdC1kaWFsb2ctY29udGVudD5gLFxyXG4gIHN0eWxlczogW2AuaGVhZGVye2NvbG9yOiNmZmY7YmFja2dyb3VuZDojNWVhY2ZmfWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNb2RhbFdyYXBwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxyXG57XHJcbiAgLy8gTk9URTogVXNlZnVsIGZvciB0ZW1wbGF0ZVxyXG4gIHB1YmxpYyBmb3JtcyA9IEZvcm1zO1xyXG5cclxuICAvLyBOT1RFOiBDb21tb25cclxuICAvLyBGb3JtIHR5cGUgKHBhc3N3b3JkIC8gbWZhKVxyXG4gIHB1YmxpYyBmb3JtVHlwZSAgICAgICAgOiBzdHJpbmc7XHJcbiAgLy8gTGFiZWxzXHJcbiAgcHVibGljIGxhYmVscyAgICA6IGFueTtcclxuICAvLyBFcnJvcnNcclxuICBwdWJsaWMgZXJyb3JzICAgIDogYW55O1xyXG4gIC8vIElucHV0c1xyXG4gIHB1YmxpYyBpbnB1dHMgICAgOiBhbnk7XHJcbiAgLy8gRXZlbnQgc2VudCBmcm9tIG1vZGFsXHJcbiAgcHVibGljIGNsb3NlU3ViICAgICAgICA6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLy8gTk9URTogUGFzc3dvcmRcclxuICAvLyBGaXJzdCBjb25uZWN0aW9uIG9yIEZvcmdvdCBwYXNzd29yZFxyXG4gIHB1YmxpYyBpc0ZpcnN0ICAgICAgIDogYm9vbGVhbjtcclxuICAvLyBQYXNzd29yZCBwb2xpY2llc1xyXG4gIHB1YmxpYyBwd2RQb2xpY2llcyAgIDogYW55O1xyXG4gIC8vIEV2ZW50IHNlbnQgZnJvbSBwYXNzd29yZCBmb3JtXHJcbiAgcHVibGljIHJlbGF5Rmlyc3RMb2cgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBwdWJsaWMgcmVsYXlMb3N0UHdkICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvLyBOT1RFOiBNRkEgc2V0dXBcclxuICAvLyBNRkEgc2VjcmV0IGtleVxyXG4gIHB1YmxpYyBjb2RlICAgICAgICAgICAgOiBzdHJpbmc7XHJcbiAgcHVibGljIHFyQ29kZSAgICAgICAgICA6IHN0cmluZztcclxuICAvLyBFdmVudCBzZW50IGZyb20gbWZhIHNldHVwIGZvcm1cclxuICBwdWJsaWMgcmVsYXlTYXZlTWZhS2V5IDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8vIE5PVEU6IE1GQVxyXG4gIC8vIEV2ZW50IHNlbnQgZnJvbSBtZmEgZm9ybVxyXG4gIHB1YmxpYyByZWxheVNlbmRNZmFDb2RlIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yXHJcbiAgKFxyXG4gICAgcHVibGljICBkaWFsb2dSZWYgOiBNYXREaWFsb2dSZWY8TW9kYWxXcmFwcGVyQ29tcG9uZW50PixcclxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55XHJcbiAgKVxyXG4gIHtcclxuICAgIHRoaXMubG9hZFBhcmFtcygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCkgOiB2b2lkXHJcbiAge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCkgOiB2b2lkXHJcbiAge1xyXG4gICAgaWYodGhpcy5jbG9zZVN1YilcclxuICAgICAgdGhpcy5jbG9zZVN1Yi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbGF5Rmlyc3RMb2dFdmVudCgkZXZlbnQgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMucmVsYXlGaXJzdExvZy5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVsYXlMb3N0UHdkRXZlbnQoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnJlbGF5TG9zdFB3ZC5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVsYXlTYXZlTWZhS2V5RXZlbnQoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnJlbGF5U2F2ZU1mYUtleS5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVsYXlTZW5kTWZhQ29kZUV2ZW50KCRldmVudCA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5yZWxheVNlbmRNZmFDb2RlLmVtaXQoJGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbG9hZFBhcmFtcygpIDogdm9pZFxyXG4gIHtcclxuICAgIHZhciBkYXRhIDogYW55O1xyXG4gICAgZGF0YSA9IHRoaXMuZGF0YTtcclxuXHJcbiAgICBpZihkYXRhICE9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICB0aGlzLmZvcm1UeXBlICAgICAgID0gZGF0YS5mb3JtVHlwZTtcclxuXHJcbiAgICAgIC8vIE5PVEU6IENvbW1vblxyXG4gICAgICAvLyBMYWJlbHNcclxuICAgICAgdGhpcy5sYWJlbHMgICAgICAgICA9IGRhdGEubGFiZWxzO1xyXG4gICAgICAvLyBMYWJlbHNcclxuICAgICAgdGhpcy5lcnJvcnMgICAgICAgICA9IGRhdGEuZXJyb3JzO1xyXG4gICAgICAvLyBMYWJlbHNcclxuICAgICAgdGhpcy5pbnB1dHMgICAgICAgICA9IGRhdGEuaW5wdXRzO1xyXG5cclxuICAgICAgLy8gTk9URTogUGFzc3dvcmRcclxuICAgICAgLy8gRmlyc3QgY29ubmVjdGlvbiBvciBGb3Jnb3QgcGFzc3dvcmRcclxuICAgICAgdGhpcy5pc0ZpcnN0ICAgICAgICA9IGRhdGEuaXNGaXJzdDtcclxuICAgICAgLy8gUGFzc3dvcmQgcG9saWNpZXNcclxuICAgICAgdGhpcy5wd2RQb2xpY2llcyAgICA9IGRhdGEucHdkUG9saWNpZXM7XHJcblxyXG4gICAgICAvLyBOT1RFOiBNRkFcclxuICAgICAgLy8gTWZhIHNldHVwZCBjb2Rlc1xyXG4gICAgICB0aGlzLmNvZGUgICAgICAgICAgID0gZGF0YS5jb2RlO1xyXG4gICAgICB0aGlzLnFyQ29kZSAgICAgICAgID0gZGF0YS5xckNvZGU7XHJcblxyXG4gICAgICAvLyBDbG9zZSBkaWFsb2cgZXZlbnRcclxuICAgICAgdGhpcy5jbG9zZVN1YiA9IGRhdGEuY2xvc2VFdmVudC5zdWJzY3JpYmUoKHJlcykgPT5cclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8gQW5ndWxhciBtb2R1bGVzXHJcbmltcG9ydCB7IE9uSW5pdCB9ICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0IH0gICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT25DaGFuZ2VzIH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNpbXBsZUNoYW5nZXMgfSAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPbkRlc3Ryb3kgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSW5wdXQgfSAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE91dHB1dCB9ICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdERpYWxvZyB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgTWF0SWNvblJlZ2lzdHJ5IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSAgICBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSAgICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAgfSAgICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVmFsaWRhdG9ycyB9ICAgICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuLy8gRXh0ZXJuYWwgbW9kdWxlc1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSAgICBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XHJcblxyXG4vLyBJbnRlcm5hbCBtb2R1bGVzXHJcbmltcG9ydCB7IFVzclZhbGlkYXRvciB9ICAgIGZyb20gJy4vdmFsaWRhdG9ycy91c3IudmFsaWRhdG9yJztcclxuXHJcbi8vIEVudW1zXHJcbmltcG9ydCB7IExheW91dHMgfSAgICAgICAgIGZyb20gJy4vZW51bXMvbGF5b3V0cy5lbnVtJztcclxuaW1wb3J0IHsgVGhlbWVzIH0gICAgICAgICAgZnJvbSAnLi9lbnVtcy90aGVtZXMuZW51bSc7XHJcbmltcG9ydCB7IEZvcm1zIH0gICAgICAgICAgIGZyb20gJy4vZW51bXMvZm9ybXMuZW51bSc7XHJcbmltcG9ydCB7IFVzZXJQb2xpY2llcyB9ICAgIGZyb20gJy4vZW51bXMvdXNlci1wb2xpY2llcy5lbnVtJztcclxuXHJcbi8vIENvbXBvbmVudHNcclxuaW1wb3J0IHsgTW9kYWxXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXRzL21vZGFsLXdyYXBwZXIvbW9kYWwtd3JhcHBlci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3IgICAgOiAnY2FsLWxvZ2luLWZvcm0nLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInt7IGZpeGVkV2lkdGggPyAnbG9naW4td3JhcHBlcicgOiAnJyB9fVwiIGlkPVwiZGVidWctbG9naW4tZm9ybVwiPlxyXG4gIDxtYXQtdGFiLWdyb3VwIGlkPVwiY2FsaWF0eXMtbG9naW4tZm9ybVwiIFtzZWxlY3RlZEluZGV4XT1cInNlbGVjdGVkVGFiXCI+XHJcbiAgICA8bWF0LXRhYiBsYWJlbD1cImxvZ2luLWZvcm1cIj5cclxuICAgICAgPCEtLSBOT1RFOiBMb2dpbiBmb3JtIC0tPlxyXG4gICAgICA8Zm9ybSAobmdTdWJtaXQpPVwib25DbGlja0xvZ2luKClcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiICpuZ0lmPVwiIWdvb2dsZVN0eWxlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBuby1ndXR0ZXJzXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbm8tZ3V0dGVyc1wiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgIDwhLS0gTk9URTogVXNlcm5hbWUgLS0+XHJcbiAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IG1hdFByZWZpeCBjbGFzcz1cIm1yLTJcIiAqbmdJZj1cImljb25zLmljb25Vc3JPbkxvZ2luRm9ybVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImFsaWduLWJvdHRvbVwiPnBlcnNvbjwvbWF0LWljb24+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwidXNlcm5hbWVcIiBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lPVwidXNlcm5hbWVcIiBhdXRvY29tcGxldGU9XCJ1c2VybmFtZVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3sgbGFiZWxzLmlucHV0LnVzZXJuYW1lIH19XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIi8+XHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUudmFsdWU/Lmxlbmd0aCA+IDAgJiYgaW5wdXRzLmNsZWFyVXNyT25Mb2dpbkZvcm1cIiBcclxuICAgICAgICAgICAgICAgICAgICBtYXQtYnV0dG9uIG1hdFN1ZmZpeCBtYXQtaWNvbi1idXR0b24gYXJpYS1sYWJlbD1cIkNsZWFyXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cImZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS5zZXRWYWx1ZSgnJylcIiBcclxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZm9ybVR5cGUgPT09IGZvcm1zLk1GQSAmJiBmb3JtTGF5b3V0cy5tZmEgPT09IGxheW91dHMuSU5MSU5FID8gdHJ1ZSA6IGZhbHNlXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICA8IS0tIE5PVEU6IEVycm9yIG1lc3NhZ2UocykgLS0+XHJcbiAgICAgICAgICAgICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuZXJyb3JzPy5yZXF1aXJlZCAmJiBlcnJvcnMubG9naW5cIj5cclxuICAgICAgICAgICAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnJlcXVpcmVkIH19XHJcbiAgICAgICAgICAgICAgICAgIDwvbWF0LWhpbnQ+XHJcbiAgICAgICAgICAgICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuZXJyb3JzPy5wYXR0ZXJuICYmIGVycm9ycy5sb2dpbiAmJiB1c3JQb2xpY3kgPT09IHVzZXJQb2xpY2llcy5FTUFJTFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kuZW1haWwgfX1cclxuICAgICAgICAgICAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgICAgICAgICAgICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS5lcnJvcnM/LnBhdHRlcm4gJiYgZXJyb3JzLmxvZ2luICYmIHVzclBvbGljeSA9PT0gdXNlclBvbGljaWVzLlBIT05FXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5waG9uZSB9fVxyXG4gICAgICAgICAgICAgICAgICA8L21hdC1oaW50PlxyXG4gICAgICAgICAgICAgICAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnVzZXJuYW1lLmVycm9ycz8ucGF0dGVybiAmJiBlcnJvcnMubG9naW4gJiYgdXNyUG9saWN5ICYmIHVzclBvbGljeSAhPT0gdXNlclBvbGljaWVzLkVNQUlMICYmIHVzclBvbGljeSAhPT0gdXNlclBvbGljaWVzLlBIT05FXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5jdXN0b21SZWdleCB9fVxyXG4gICAgICAgICAgICAgICAgICA8L21hdC1oaW50PlxyXG4gICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbm8tZ3V0dGVyc1wiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgIDwhLS0gTk9URTogUGFzc3dvcmQgLS0+XHJcbiAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IG1hdFByZWZpeCBjbGFzcz1cIm1yLTJcIiAqbmdJZj1cImljb25zLmljb25Qd2RPbkxvZ2luRm9ybVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImFsaWduLWJvdHRvbVwiPmxvY2s8L21hdC1pY29uPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IGZvcm1Db250cm9sTmFtZT1cInBhc3N3b3JkXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCIgYXV0b2NvbXBsZXRlPVwicGFzc3dvcmRcIiBcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cInt7IGxhYmVscy5pbnB1dC5wYXNzd29yZCB9fVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ7eyBzaG93UGFzc3dvcmQgPyAndGV4dCcgOiAncGFzc3dvcmQnIH19XCIvPlxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiaW5wdXRzLnNob3dQd2RPbkxvZ2luRm9ybVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIG1hdC1idXR0b24gbWF0U3VmZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiQ2xlYXJcIiBcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwic2hvd1Bhc3N3b3JkPSFzaG93UGFzc3dvcmRcIiBcclxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZm9ybVR5cGUgPT09IGZvcm1zLk1GQSAmJiBmb3JtTGF5b3V0cy5tZmEgPT09IGxheW91dHMuSU5MSU5FID8gdHJ1ZSA6IGZhbHNlXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj57eyBzaG93UGFzc3dvcmQgPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknIH19PC9tYXQtaWNvbj5cclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIDwhLS0gTk9URTogRXJyb3IgbWVzc2FnZSAtLT5cclxuICAgICAgICAgICAgICAgICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy5wYXNzd29yZC5lcnJvcnM/LnJlcXVpcmVkICYmIGVycm9ycy5sb2dpblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kucmVxdWlyZWQgfX1cclxuICAgICAgICAgICAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XHJcbiAgICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPCEtLSBOT1RFOiBCdXR0b25zIC0tPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiISggZm9ybVR5cGUgPT09IGZvcm1zLk1GQSAmJiBmb3JtTGF5b3V0cy5tZmEgPT09IGxheW91dHMuSU5MSU5FIClcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnMgcGItM1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbCB0ZXh0LWxlZnRcIj5cclxuICAgICAgICAgICAgICAgICAgPCEtLSBUT0RPOiBSZW1lbWJlciBtZSAtLT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPCEtLSBOT1RFOiBGb3Jnb3QgcGFzc3dvcmQgLS0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIHRleHQtcmlnaHRcIiAqbmdJZj1cImJ1dHRvbnMuZm9yZ290UGFzc3dvcmRcIj5cclxuICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cIm9uQ2xpY2tGb3Jnb3RQYXNzd29yZCgpXCIgaHJlZj1cIiNcIiBjbGFzcz1cInNtYWxsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLmJ1dHRvbi5mb3Jnb3RQYXNzd29yZCB9fVxyXG4gICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnMgcGItM1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbCB0ZXh0LXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDwhLS0gTk9URTogU2lnbiB1cCAtLT5cclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIChjbGljayk9XCJvbkNsaWNrU2lnblVwKClcIiB0eXBlPVwiYnV0dG9uXCIgY29sb3I9XCJwcmltYXJ5XCIgY2xhc3M9XCJzbWFsbCB0ZXh0LXVwcGVyY2FzZSBtci0zXCIgKm5nSWY9XCJidXR0b25zLnNpZ25VcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5idXR0b24uc2lnblVwIH19XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICA8IS0tIE5PVEU6IFNpZ24gaW4gLS0+XHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gdHlwZT1cInN1Ym1pdFwiIGNvbG9yPVwicHJpbWFyeVwiIFtkaXNhYmxlZF09XCIhZm9ybUdyb3VwLnZhbGlkXCIgY2xhc3M9XCJzbWFsbCB0ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5idXR0b24uc2lnbkluIH19XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgICAgPCEtLSBOT1RFOiBMb2dpbiBieSBzdGVwcyBidXR0b25zIC0tPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnMgbWItM1wiICpuZ0lmPVwiZ29vZ2xlU3R5bGVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIHRleHQtcmlnaHRcIiAqbmdJZj1cImJ1dHRvbnMuc2lnblVwXCI+XHJcbiAgICAgICAgICA8IS0tIE5PVEU6IFNpZ24gdXAgLS0+XHJcbiAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gKGNsaWNrKT1cIm9uQ2xpY2tTaWduVXAoKVwiIHR5cGU9XCJidXR0b25cIiBjb2xvcj1cInByaW1hcnlcIiBjbGFzcz1cInNtYWxsIHRleHQtdXBwZXJjYXNlIG1yLTJcIj5cclxuICAgICAgICAgICAge3sgbGFiZWxzLmJ1dHRvbi5zaWduVXAgfX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wge3sgYnV0dG9ucy5zaWduVXAgPyAndGV4dC1sZWZ0JyA6ICd0ZXh0LWNlbnRlcid9fVwiPlxyXG4gICAgICAgICAgPCEtLSBOT1RFOiBTaWduIGluIC0tPlxyXG4gICAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiAoY2xpY2spPVwib25DbGlja05leHRTdGVwKDApXCIgdHlwZT1cImJ1dHRvblwiIGNvbG9yPVwicHJpbWFyeVwiIGNsYXNzPVwic21hbGwgdGV4dC11cHBlcmNhc2UgbWwtMlwiPlxyXG4gICAgICAgICAgICB7eyBsYWJlbHMuYnV0dG9uLnNpZ25JbiB9fVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8IS0tIE5PVEU6IFNvY2lhbCBidXR0b25zIC0tPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiISggZm9ybVR5cGUgPT09IGZvcm1zLk1GQSAmJiBmb3JtTGF5b3V0cy5tZmEgPT09IGxheW91dHMuSU5MSU5FIClcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgPCEtLSBOT1RFOiBHb29nbGUgLS0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWJsb2NrIG1iLTNcIiAqbmdJZj1cImJ1dHRvbnMuZ29vZ2xlXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtYXQtcmFpc2VkLWJ1dHRvbiBjYWwtYnRuIGdvb2dsZSB7eyB0aGVtZSB9fVwiIChjbGljayk9XCJvbkNsaWNrTG9naW5Tb2NpYWwoJ2dvb2dsZScpXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhbC1iZy1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImFsaWduLW1pZGRsZSBjYWwtaWNvblwiIHN2Z0ljb249XCJnb29nbGVcIj48L21hdC1pY29uPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjYWwtbGFiZWxcIj57eyBsYWJlbHMuYnV0dG9uLmdvb2dsZVNpZ25JbiB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwhLS0gTk9URTogRmFjZWJvb2sgLS0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWJsb2NrIG1iLTNcIiAqbmdJZj1cImJ1dHRvbnMuZmFjZWJvb2tcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNhbC1idG4gZmFjZWJvb2tcIiAoY2xpY2spPVwib25DbGlja0xvZ2luU29jaWFsKCdmYWNlYm9vaycpXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhbC1iZy1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImFsaWduLW1pZGRsZSBjYWwtaWNvblwiIHN2Z0ljb249XCJmYWNlYm9va1wiPjwvbWF0LWljb24+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhbC1sYWJlbFwiPnt7IGxhYmVscy5idXR0b24uZmFjZWJvb2tTaWduSW4gfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8IS0tIE5PVEU6IElubGluZSBNRkEgLS0+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBICYmIGZvcm1MYXlvdXRzLm1mYSA9PT0gbGF5b3V0cy5JTkxJTkVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgICAgICAgPGNhbC1tZmEtZm9ybSBcclxuICAgICAgICAgICAgICBbaW5wdXRzXT1cImlucHV0c1wiIFxyXG4gICAgICAgICAgICAgIFtsYWJlbHNdPVwibGFiZWxzXCIgXHJcbiAgICAgICAgICAgICAgW2Vycm9yc109XCJlcnJvcnNcIiBcclxuICAgICAgICAgICAgICAoc2VuZE1mYSk9XCJ0YWJTZW5kTWZhQ29kZSgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDwvY2FsLW1mYS1mb3JtPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9tYXQtdGFiPlxyXG4gICAgPG1hdC10YWIgbGFiZWw9XCJ1c3Itc3RlcFwiICpuZ0lmPVwiZ29vZ2xlU3R5bGVcIj5cclxuICAgICAgPCEtLSBOT1RFOiBCYWNrIGJ1dHRvbiAtLT5cclxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBuby1ndXR0ZXJzIG1iLTNcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XHJcbiAgICAgICAgICA8YSBocmVmPVwiI1wiIChjbGljayk9XCJvbkNsaWNrUHJldlN0ZXAoMSlcIiB0aXRsZT1cInt7IGxhYmVscy5idXR0b24uYmFjayB9fVwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJhbGlnbi1ib3R0b20gbXItMlwiPmtleWJvYXJkX2Fycm93X2xlZnQ8L21hdC1pY29uPnt7IGxhYmVscy5idXR0b24uYmFjayB9fVxyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGZvcm0gKG5nU3VibWl0KT1cIm9uQ2xpY2tOZXh0U3RlcCgxKVwiIFtmb3JtR3JvdXBdPVwidXNyRm9ybUdyb3VwXCI+XHJcbiAgICAgICAgPCEtLSBOT1RFOiBVc2VybmFtZSAtLT5cclxuICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgICAgICAgPGRpdiBtYXRQcmVmaXggY2xhc3M9XCJtci0yXCIgKm5nSWY9XCJpY29ucy5pY29uVXNyT25Mb2dpbkZvcm1cIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWxpZ24tYm90dG9tXCI+cGVyc29uPC9tYXQtaWNvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGlucHV0IG1hdElucHV0IGZvcm1Db250cm9sTmFtZT1cInVzZXJuYW1lXCIgXHJcbiAgICAgICAgICAgIG5hbWU9XCJ1c2VybmFtZVwiIGF1dG9jb21wbGV0ZT1cInVzZXJuYW1lXCIgXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3sgbGFiZWxzLmlucHV0LnVzZXJuYW1lIH19XCIgXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIvPlxyXG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInVzckZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS52YWx1ZT8ubGVuZ3RoID4gMCAmJiBpbnB1dHMuY2xlYXJVc3JPbkxvZ2luRm9ybVwiIFxyXG4gICAgICAgICAgICBtYXQtYnV0dG9uIG1hdFN1ZmZpeCBtYXQtaWNvbi1idXR0b24gYXJpYS1sYWJlbD1cIkNsZWFyXCIgXHJcbiAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJ1c3JGb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuc2V0VmFsdWUoJycpXCIgXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBICYmIGZvcm1MYXlvdXRzLm1mYSA9PT0gbGF5b3V0cy5JTkxJTkUgPyB0cnVlIDogZmFsc2VcIiBcclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8IS0tIE5PVEU6IEVycm9yIG1lc3NhZ2UocykgLS0+XHJcbiAgICAgICAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwidXNyRm9ybUdyb3VwLmNvbnRyb2xzLnVzZXJuYW1lLmVycm9ycz8ucmVxdWlyZWQgJiYgZXJyb3JzLmxvZ2luXCI+XHJcbiAgICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kucmVxdWlyZWQgfX1cclxuICAgICAgICAgIDwvbWF0LWhpbnQ+XHJcbiAgICAgICAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwidXNyRm9ybUdyb3VwLmNvbnRyb2xzLnVzZXJuYW1lLmVycm9ycz8ucGF0dGVybiAmJiBlcnJvcnMubG9naW4gJiYgdXNyUG9saWN5ID09PSB1c2VyUG9saWNpZXMuRU1BSUxcIj5cclxuICAgICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5lbWFpbCB9fVxyXG4gICAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJ1c3JGb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuZXJyb3JzPy5wYXR0ZXJuICYmIGVycm9ycy5sb2dpbiAmJiB1c3JQb2xpY3kgPT09IHVzZXJQb2xpY2llcy5QSE9ORVwiPlxyXG4gICAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnBob25lIH19XHJcbiAgICAgICAgICA8L21hdC1oaW50PlxyXG4gICAgICAgICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cInVzckZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS5lcnJvcnM/LnBhdHRlcm4gJiYgZXJyb3JzLmxvZ2luICYmIHVzclBvbGljeSAmJiB1c3JQb2xpY3kgIT09IHVzZXJQb2xpY2llcy5FTUFJTCAmJiB1c3JQb2xpY3kgIT09IHVzZXJQb2xpY2llcy5QSE9ORVwiPlxyXG4gICAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LmN1c3RvbVJlZ2V4IH19XHJcbiAgICAgICAgICA8L21hdC1oaW50PlxyXG4gICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBuby1ndXR0ZXJzIG1iLTNcIj5cclxuICAgICAgICAgIDwhLS0gTk9URTogRm9yZ290IHBhc3N3b3JkIC0tPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbCB0ZXh0LWxlZnRcIiAqbmdJZj1cImJ1dHRvbnMuZm9yZ290UGFzc3dvcmRcIj5cclxuICAgICAgICAgICAgPGEgKGNsaWNrKT1cIm9uQ2xpY2tGb3Jnb3RQYXNzd29yZCgpXCIgaHJlZj1cIiNcIiBjbGFzcz1cInNtYWxsXCI+XHJcbiAgICAgICAgICAgICAge3sgbGFiZWxzLmJ1dHRvbi5mb3Jnb3RQYXNzd29yZCB9fVxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwhLS0gTk9URTogTmV4dCBidXR0b24gLS0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIHRleHQtcmlnaHRcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY29sb3I9XCJwcmltYXJ5XCIgW2Rpc2FibGVkXT1cIiF1c3JGb3JtR3JvdXAudmFsaWRcIiBjbGFzcz1cInNtYWxsIHRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgICAgICAge3sgbGFiZWxzLmJ1dHRvbi5uZXh0IH19XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgIDwvbWF0LXRhYj5cclxuICAgIDxtYXQtdGFiIGxhYmVsPVwicHdkLXN0ZXBcIiAqbmdJZj1cImdvb2dsZVN0eWxlXCI+XHJcbiAgICAgIDwhLS0gTk9URTogQmFjayBidXR0b24gLS0+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbm8tZ3V0dGVycyBtYi0zXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIiNcIiAoY2xpY2spPVwib25DbGlja1ByZXZTdGVwKDIpXCIgdGl0bGU9XCJ7eyBsYWJlbHMuYnV0dG9uLmJhY2sgfX1cIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWxpZ24tYm90dG9tIG1yLTJcIj5rZXlib2FyZF9hcnJvd19sZWZ0PC9tYXQtaWNvbj57eyBsYWJlbHMuYnV0dG9uLmJhY2sgfX1cclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDwhLS0gVE9ETzogVXNlciBpbmZvIC0tPlxyXG4gICAgICA8cD57eyB1c2VySW5mbyB9fTwvcD5cclxuICAgICAgPGZvcm0gKG5nU3VibWl0KT1cIm9uQ2xpY2tOZXh0U3RlcCgyKVwiIFtmb3JtR3JvdXBdPVwicHdkRm9ybUdyb3VwXCI+XHJcbiAgICAgICAgPCEtLSBOT1RFOiBQYXNzd29yZCAtLT5cclxuICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgICAgICAgPGRpdiBtYXRQcmVmaXggY2xhc3M9XCJtci0yXCIgKm5nSWY9XCJpY29ucy5pY29uUHdkT25Mb2dpbkZvcm1cIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWxpZ24tYm90dG9tXCI+bG9jazwvbWF0LWljb24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJwYXNzd29yZFwiIFxyXG4gICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIiBhdXRvY29tcGxldGU9XCJwYXNzd29yZFwiIFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cInt7IGxhYmVscy5pbnB1dC5wYXNzd29yZCB9fVwiIFxyXG4gICAgICAgICAgICB0eXBlPVwie3sgc2hvd1Bhc3N3b3JkID8gJ3RleHQnIDogJ3Bhc3N3b3JkJyB9fVwiLz5cclxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJpbnB1dHMuc2hvd1B3ZE9uTG9naW5Gb3JtXCIgXHJcbiAgICAgICAgICAgIG1hdC1idXR0b24gbWF0U3VmZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiQ2xlYXJcIiBcclxuICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cInNob3dQYXNzd29yZD0hc2hvd1Bhc3N3b3JkXCIgXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBICYmIGZvcm1MYXlvdXRzLm1mYSA9PT0gbGF5b3V0cy5JTkxJTkUgPyB0cnVlIDogZmFsc2VcIiBcclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24+e3sgc2hvd1Bhc3N3b3JkID8gJ3Zpc2liaWxpdHlfb2ZmJyA6ICd2aXNpYmlsaXR5JyB9fTwvbWF0LWljb24+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwhLS0gTk9URTogRXJyb3IgbWVzc2FnZSAtLT5cclxuICAgICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJwd2RGb3JtR3JvdXAuY29udHJvbHMucGFzc3dvcmQuZXJyb3JzPy5yZXF1aXJlZCAmJiBlcnJvcnMubG9naW5cIj5cclxuICAgICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5yZXF1aXJlZCB9fVxyXG4gICAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxyXG4gICAgICAgIDwhLS0gTk9URTogTmV4dCBidXR0b24gLS0+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBuby1ndXR0ZXJzIG1iLTNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgdGV4dC1yaWdodFwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjb2xvcj1cInByaW1hcnlcIiBbZGlzYWJsZWRdPVwiIXB3ZEZvcm1Hcm91cC52YWxpZFwiIGNsYXNzPVwic21hbGwgdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICAgICAgICB7eyBsYWJlbHMuYnV0dG9uLm5leHQgfX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgPC9tYXQtdGFiPlxyXG4gICAgPG1hdC10YWIgbGFiZWw9XCJ0YWItd3JhcHBlclwiICpuZ0lmPVwiKGZvcm1MYXlvdXRzIHwgZXhpc3RzTGF5b3V0OiBsYXlvdXRzLlRBQilcIj5cclxuICAgICAgPCEtLSBOT1RFOiBUYWIgZm9ybSAtLT5cclxuICAgICAgPGNhbC10YWItd3JhcHBlciBcclxuICAgICAgICBbZm9ybVR5cGVdPVwiZm9ybVR5cGVcIiBcclxuICAgICAgICBbaXNGaXJzdF09XCJpc0ZpcnN0XCIgXHJcbiAgICAgICAgW2NvZGVdICAgPVwiY29kZVwiIFxyXG4gICAgICAgIFtxckNvZGVdID1cInFyQ29kZVwiIFxyXG4gICAgICAgIFtwd2RQb2xpY2llc109XCJwd2RQb2xpY2llc1wiIFxyXG4gICAgICAgIFtlcnJvcnNdPVwiZXJyb3JzXCIgXHJcbiAgICAgICAgW2xhYmVsc109XCJsYWJlbHNcIiBcclxuICAgICAgICBbaW5wdXRzXT1cImlucHV0c1wiIFxyXG4gICAgICAgIChzZW5kQ2xvc2VUYWIpPVwib25DbGlja0Nsb3NlVGFiKCRldmVudClcIiBcclxuICAgICAgICAocmVsYXlGaXJzdExvZyk9XCJ0YWJGaXJzdExvZygkZXZlbnQpXCIgXHJcbiAgICAgICAgKHJlbGF5TG9zdFB3ZCk9XCJ0YWJMb3N0UHdkKCRldmVudClcIiBcclxuICAgICAgICAocmVsYXlTYXZlTWZhS2V5KT1cInRhYlNhdmVNZmFLZXkoJGV2ZW50KVwiIFxyXG4gICAgICAgIChyZWxheVNlbmRNZmFDb2RlKT1cInRhYlNlbmRNZmFDb2RlKCRldmVudClcIj5cclxuICAgICAgPC9jYWwtdGFiLXdyYXBwZXI+XHJcbiAgICA8L21hdC10YWI+XHJcbiAgPC9tYXQtdGFiLWdyb3VwPlxyXG48L2Rpdj5gLFxyXG4gIHN0eWxlczogW2AvZGVlcC8gI2NhbGlhdHlzLWxvZ2luLWZvcm0gbWF0LXRhYi1oZWFkZXJ7ZGlzcGxheTpub25lIWltcG9ydGFudH1tYXQtZm9ybS1maWVsZCBtYXQtaWNvbntjb2xvcjpncmV5fS5sb2dpbi13cmFwcGVye3dpZHRoOjEwMCU7bWF4LXdpZHRoOjMzMHB4O3BhZGRpbmc6MTVweDttYXJnaW46MCBhdXRvfS5jYWwtYnRue2xpbmUtaGVpZ2h0OjM1cHg7Ym9yZGVyOjAhaW1wb3J0YW50O3BhZGRpbmc6MXB4IWltcG9ydGFudH0uY2FsLWJ0biAuY2FsLWJnLWljb257cGFkZGluZzo4cHg7d2lkdGg6MzRweDtoZWlnaHQ6MzRweDtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjp0b3AhaW1wb3J0YW50fS5jYWwtYnRuIC5jYWwtYmctaWNvbiAuY2FsLWljb257ZGlzcGxheTppbmxpbmUtYmxvY2s7aGVpZ2h0OjE4cHg7d2lkdGg6MThweDttYXJnaW4tdG9wOi00cHg7dmVydGljYWwtYWxpZ246dG9wIWltcG9ydGFudH0uY2FsLWJ0biAuY2FsLWxhYmVse3BhZGRpbmctcmlnaHQ6OHB4O3BhZGRpbmctbGVmdDoxNnB4O3NpemU6MTRweDtmb250LWZhbWlseTpSb2JvdG8sc2Fucy1zZXJpZn0uYWRue2JhY2tncm91bmQtY29sb3I6I2Q4N2E2OCFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmFkbiBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5hZG46aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZTI5ZTkxIWltcG9ydGFudH0uYml0YnVja2V0e2JhY2tncm91bmQtY29sb3I6IzIwNTA4MSFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmJpdGJ1Y2tldCBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5iaXRidWNrZXQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojMmE2OWFhIWltcG9ydGFudH0uZHJvcGJveHtiYWNrZ3JvdW5kLWNvbG9yOiMxMDg3ZGQhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS5kcm9wYm94IGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmRyb3Bib3g6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojMzA5ZmYwIWltcG9ydGFudH0uZmFjZWJvb2t7YmFja2dyb3VuZC1jb2xvcjojM2I1OTk4IWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0uZmFjZWJvb2sgaXtjb2xvcjojZmZmIWltcG9ydGFudH0uZmFjZWJvb2s6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNGM3MGJhIWltcG9ydGFudH0uZmxpY2tye2JhY2tncm91bmQtY29sb3I6I2ZmMDA4NCFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmZsaWNrciBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5mbGlja3I6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZmYzMzlkIWltcG9ydGFudH0uZm91cnNxdWFyZXtiYWNrZ3JvdW5kLWNvbG9yOiNmOTQ4NzchaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS5mb3Vyc3F1YXJlIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmZvdXJzcXVhcmU6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZmI3OTljIWltcG9ydGFudH0uZ2l0aHVie2JhY2tncm91bmQtY29sb3I6IzQ0NCFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmdpdGh1YiBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5naXRodWI6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNWU1ZTVlIWltcG9ydGFudH0uaW5zdGFncmFte2JhY2tncm91bmQtY29sb3I6IzQwNWRlNiFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9Lmluc3RhZ3JhbSBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5pbnN0YWdyYW06aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNmQ4M2VjIWltcG9ydGFudH0ubGlua2VkaW57YmFja2dyb3VuZC1jb2xvcjojMDA3YmI2IWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0ubGlua2VkaW4gaXtjb2xvcjojZmZmIWltcG9ydGFudH0ubGlua2VkaW46aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojMDA5ZGU5IWltcG9ydGFudH0ubWljcm9zb2Z0e2JhY2tncm91bmQtY29sb3I6IzI2NzJlYyFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9Lm1pY3Jvc29mdCBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5taWNyb3NvZnQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNTU5MGYwIWltcG9ydGFudH0ud2luZG93c3tiYWNrZ3JvdW5kLWNvbG9yOiMyNjcyZWMhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS53aW5kb3dzIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LndpbmRvd3M6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNTU5MGYwIWltcG9ydGFudH0ub2Rub2tsYXNzbmlraXtiYWNrZ3JvdW5kLWNvbG9yOiNmNDczMWMhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS5vZG5va2xhc3NuaWtpIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9Lm9kbm9rbGFzc25pa2k6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZjY5MTRkIWltcG9ydGFudH0ub3Blbmlke2JhY2tncm91bmQtY29sb3I6I2Y3OTMxZSFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9Lm9wZW5pZCBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5vcGVuaWQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZjlhYjRmIWltcG9ydGFudH0ucGludGVyZXN0e2JhY2tncm91bmQtY29sb3I6I2NiMjAyNyFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LnBpbnRlcmVzdCBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5waW50ZXJlc3Q6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZTAzZTQ0IWltcG9ydGFudH0ucmVkZGl0e2JhY2tncm91bmQtY29sb3I6I2VmZjdmZiFpbXBvcnRhbnQ7Y29sb3I6IzAwMCFpbXBvcnRhbnR9LnJlZGRpdCBpe2NvbG9yOiMwMDAhaW1wb3J0YW50fS5yZWRkaXQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZmZmIWltcG9ydGFudH0uc291bmRjbG91ZHtiYWNrZ3JvdW5kLWNvbG9yOiNmNTAhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS5zb3VuZGNsb3VkIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LnNvdW5kY2xvdWQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZjczIWltcG9ydGFudH0udHVtYmxye2JhY2tncm91bmQtY29sb3I6IzJjNDc2MiFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LnR1bWJsciBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS50dW1ibHI6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojM2M2MTg1IWltcG9ydGFudH0udHdpdHRlcntiYWNrZ3JvdW5kLWNvbG9yOiM1NWFjZWUhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS50d2l0dGVyIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LnR3aXR0ZXI6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojODNjM2YzIWltcG9ydGFudH0udmltZW97YmFja2dyb3VuZC1jb2xvcjojMWFiN2VhIWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0udmltZW8gaXtjb2xvcjojZmZmIWltcG9ydGFudH0udmltZW86aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNDljNmVlIWltcG9ydGFudH0udmt7YmFja2dyb3VuZC1jb2xvcjojNTg3ZWEzIWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0udmsgaXtjb2xvcjojZmZmIWltcG9ydGFudH0udms6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNzg5N2I2IWltcG9ydGFudH0ueWFob297YmFja2dyb3VuZC1jb2xvcjojNzIwZTllIWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0ueWFob28gaXtjb2xvcjojZmZmIWltcG9ydGFudH0ueWFob286aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojOTQxMmNkIWltcG9ydGFudH0uZ29vZ2xlLmxpZ2h0e2JhY2tncm91bmQtY29sb3I6I2ZmZiFpbXBvcnRhbnQ7Y29sb3I6IzVmNjM2OCFpbXBvcnRhbnR9Lmdvb2dsZS5saWdodCBpe2NvbG9yOiM1ZjYzNjghaW1wb3J0YW50fS5nb29nbGUubGlnaHQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZmZmIWltcG9ydGFudH0uZ29vZ2xlLmRhcmt7YmFja2dyb3VuZC1jb2xvcjojNDI4NWY0IWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0uZ29vZ2xlLmRhcmsgaXtjb2xvcjojZmZmIWltcG9ydGFudH0uZ29vZ2xlLmRhcms6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNzJhNGY3IWltcG9ydGFudH0uZ29vZ2xlLmRhcmsgLmNhbC1iZy1pY29ue2JhY2tncm91bmQ6I2ZmZn1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9naW5Gb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveVxyXG57XHJcbiAgcHVibGljICAgIGZvcm1MYXlvdXRzICAgIDogYW55O1xyXG4gIHB1YmxpYyAgICB0aGVtZSAgICAgICAgICA6IHN0cmluZztcclxuXHJcbiAgcHVibGljICAgIHVzclBvbGljeSAgICAgIDogc3RyaW5nO1xyXG4gIHB1YmxpYyAgICBwd2RQb2xpY2llcyAgICA6IGFueTtcclxuXHJcbiAgcHVibGljICAgIGljb25zICAgICAgICAgIDogYW55O1xyXG4gIHB1YmxpYyAgICBidXR0b25zICAgICAgICA6IGFueTtcclxuICBwdWJsaWMgICAgaW5wdXRzICAgICAgICAgOiBhbnk7XHJcbiAgcHVibGljICAgIGVycm9ycyAgICAgICAgIDogYW55O1xyXG4gIHB1YmxpYyAgICBsYWJlbHMgICAgICAgICA6IGFueTtcclxuXHJcbiAgLy8gRGlzcGxheSBsb2dpbiBmb3JtIGluc2lkZSBhIGNvbnRhaW5lclxyXG4gIEBJbnB1dCgpICBmaXhlZFdpZHRoICAgICAgICA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAvLyBEaXNwbGF5IGxvZ2luIGZvcm0gbGlrZSBHb29nbGUgJiBNaWNyb3NvZnQgKHN0ZXAgYnkgc3RlcClcclxuICBASW5wdXQoKSAgZ29vZ2xlU3R5bGUgICAgICAgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgLy8gRGlzcGxheSBHb29nbGUgYnV0dG9uIHdpdGggdGhlIHN1cHBsaWVkIHRoZW1lIDogbGlnaHQgLyBkYXJrXHJcbiAgQElucHV0KCkgIGdvb2dsZVRoZW1lICAgICAgIDogc3RyaW5nICA9IG51bGw7XHJcbiAgLy8gRGlzcGxheSBmb3JtcyBpbnNpZGUgYSBsYXlvdXQgOiB0YWIgKGJ5IGRlZmF1bHQpIC8gbW9kYWwgLyBpbmxpbmVcclxuICAvLyBUaGUgaW5saW5lIGxheW91dCBpcyBvbmx5IGF2YWlsYWJsZSBmb3IgdGhlIE1GQSBmb3JtXHJcbiAgQElucHV0KCkgIGN1c3RvbUZvcm1MYXlvdXRzIDogYW55O1xyXG5cclxuICAvLyBPcHRpb25hbCBwb2xpY3kgYXBwbGllZCBvbiB0aGUgdXNlcm5hbWUgaW5wdXQgOiBlbWFpbCAvIHBob25lIC8gcmVnZXhcclxuICAvLyBCZSBjYXJlZnVsLCB5b3UgbXVzdCBkb3VibGUgYWxsIHRoZSBiYWNrc2xhc2hlcyB1c2VkIGluIHRoZSBzdXBwbGllZCByZWdleFxyXG4gIEBJbnB1dCgpICBjdXN0b21Vc3JQb2xpY3kgICA6IHN0cmluZyA9IG51bGw7XHJcbiAgLy8gUG9saWNpZXMgYXBwbGllZCBvbiB0aGUgcGFzc3dvcmQgaW5wdXRcclxuICBASW5wdXQoKSAgY3VzdG9tUHdkUG9saWNpZXMgOiBhbnk7XHJcblxyXG4gIC8vIERpc2xheSBpY29uIGluc2lkZSBpbnB1dHMgb24gdGhlIGxvZ2luIGZvcm1cclxuICBASW5wdXQoKSAgY3VzdG9tSWNvbnMgICA6IGFueTtcclxuXHJcbiAgLy8gRGlzcGxheSBidXR0b25zIHdpdGggZXZlbnRzXHJcbiAgQElucHV0KCkgIGN1c3RvbUJ1dHRvbnMgOiBhbnk7XHJcblxyXG4gIC8vIERpc3BsYXkgY2xlYXIgJiBzaG93L2hpZGUgYnV0dG9ucyBpbnNpZGUgaW5wdXRzXHJcbiAgQElucHV0KCkgIGN1c3RvbUlucHV0cyAgOiBhbnk7XHJcblxyXG4gIC8vIERpc3BsYXkgZXJyb3IgbWVzc2FnZXNcclxuICBASW5wdXQoKSAgY3VzdG9tRXJyb3JzICA6IGFueTtcclxuXHJcbiAgLy8gTGFiZWxzXHJcbiAgQElucHV0KCkgIGN1c3RvbUxhYmVscyAgOiBhbnk7XHJcblxyXG4gIC8vIEV2ZW50IHRyaWdnZXJlZCBhZnRlciBjcmVhdGluZyB0aGUgbG9naW4gZm9ybSAoQWZ0ZXJWaWV3SW5pdClcclxuICBAT3V0cHV0KCkgaW5pdGlhbGl6ZWQgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8vIEV2ZW50IHRyaWdnZXJlZCBhZnRlciBjbGlja2luZyBvbiB0aGUgc2lnbiB1cCBidXR0b24uXHJcbiAgQE91dHB1dCgpIHNpZ25VcCAgICAgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvLyBFdmVudCBvYmplY3QgY29udGFpbmluZyB1c2VybmFtZSBhbmQgcGFzc3dvcmQgcHJvcGVydGllc1xyXG4gIEBPdXRwdXQoKSBsb2dpbiAgICAgICAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLy8gRXZlbnQgb2JqZWN0IGNvbnRhaW5pbmcgdXNlcm5hbWUsIHBhc3N3b3JkIGFuZCBzb2NpYWwgcHJvcGVydGllc1xyXG4gIEBPdXRwdXQoKSBsb2dpblNvY2lhbCAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLy8gRXZlbnQgb2JqZWN0IGNvbnRhaW5pbmcgdXNlcm5hbWUgcHJvcGVydHlcclxuICBAT3V0cHV0KCkgZm9yZ290UHdkICAgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8vIEV2ZW50IG9iamVjdCBjb250YWluaW5nIHBhc3N3b3JkIGFuZCBjb2RlIHByb3BlcnRpZXNcclxuICBAT3V0cHV0KCkgc2VuZFJlc2V0UHdkICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8vIEV2ZW50IG9iamVjdCBjb250YWluaW5nIHBhc3N3b3JkIHByb3BlcnR5XHJcbiAgQE91dHB1dCgpIHNlbmRGaXJzdFB3ZCAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvLyBFdmVudCBvYmplY3QgY29udGFpbmluZyBjb2RlIHByb3BlcnR5XHJcbiAgQE91dHB1dCgpIHNhdmVNZmFLZXkgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvLyBFdmVudCBvYmplY3QgY29udGFpbmluZyBjb2RlIHByb3BlcnR5XHJcbiAgQE91dHB1dCgpIHNlbmRNZmFDb2RlICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvLyBFdmVudCBvYmplY3QgY29udGFpbmluZyB1c2VybmFtZSBwcm9wZXJ0eVxyXG4gIEBPdXRwdXQoKSBzdGVwVXNyICAgICAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLy8gRXZlbnQgb2JqZWN0IGNvbnRhaW5pbmcgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIHByb3BlcnR5XHJcbiAgQE91dHB1dCgpIHN0ZXBQd2QgICAgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLy8gTk9URTogRm9ybVxyXG4gIHB1YmxpYyAgICBmb3JtR3JvdXAgICAgIDogRm9ybUdyb3VwO1xyXG4gIHB1YmxpYyAgICBzaG93UGFzc3dvcmQgIDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyAgICBmb3JtVHlwZSAgICAgIDogc3RyaW5nO1xyXG4gIHB1YmxpYyAgICB1c2VyUG9saWNpZXMgPSBVc2VyUG9saWNpZXM7XHJcbiAgcHVibGljICAgIGZvcm1zID0gRm9ybXM7XHJcblxyXG4gIC8vIE5PVEU6IFBhc3N3b3JkXHJcbiAgcHVibGljICAgIGlzRmlyc3QgICAgICAgOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8vIE5PVEU6IE1GQVxyXG4gIHB1YmxpYyAgICBjb2RlICAgICAgICAgIDogc3RyaW5nICA9IG51bGw7XHJcbiAgcHVibGljICAgIHFyQ29kZSAgICAgICAgOiBzdHJpbmcgID0gbnVsbDtcclxuXHJcbiAgLy8gTk9URTogU3RlcHNcclxuICBwdWJsaWMgICAgdXNyRm9ybUdyb3VwICA6IEZvcm1Hcm91cDtcclxuICBwdWJsaWMgICAgcHdkRm9ybUdyb3VwICA6IEZvcm1Hcm91cDtcclxuICBwdWJsaWMgICAgdXNlckluZm8gICAgICA6IHN0cmluZyAgPSBudWxsO1xyXG4gIHB1YmxpYyAgICB1c2VySW1hZ2UgICAgIDogc3RyaW5nICA9IG51bGw7XHJcblxyXG4gIC8vIE5PVEU6IFdyYXBwZXJcclxuICBwdWJsaWMgICAgbGF5b3V0cyA9IExheW91dHM7XHJcbiAgcHVibGljICAgIHNlbGVjdGVkVGFiICAgICA6IG51bWJlciA9IDA7XHJcbiAgcHVibGljICAgIGNsb3NlTW9kYWxFdmVudCA6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgcHJpdmF0ZSAgIG1vZGFsRmlyc3RTdWIgICAgICAgOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSAgIG1vZGFsTG9zdFN1YiAgICAgICAgOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSAgIG1vZGFsU2F2ZU1mYUtleVN1YiAgOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSAgIG1vZGFsU2VuZE1mYUNvZGVTdWIgOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8vIFRPRE86IENhcHRjaGFcclxuICAvLyBASW5wdXQoKSAgcmVtZW1iZXJNZSAgICA6IGJvb2xlYW4gPSB0cnVlOyAvLyBUT0RPOiBjaGVjayBib3hcclxuXHJcbiAgY29uc3RydWN0b3JcclxuICAoXHJcbiAgICBwdWJsaWMgIGRpYWxvZyAgICAgICA6IE1hdERpYWxvZyxcclxuICAgIHB1YmxpYyAgc2FuaXRpemVyICAgIDogRG9tU2FuaXRpemVyLFxyXG4gICAgcHVibGljICBpY29uUmVnaXN0cnkgOiBNYXRJY29uUmVnaXN0cnksXHJcbiAgICBwcml2YXRlIGJ1aWxkZXIgICAgICA6IEZvcm1CdWlsZGVyXHJcbiAgKVxyXG4gIHtcclxuICAgIC8vIFNvY2lhbCBpY29uc1xyXG4gICAgLy8gVE9ETzogRml4IEFuZ3VsYXIgNiBMaWJyYXJ5IGFzc2V0cyA6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXItY2xpL2lzc3Vlcy8xMTA3MVxyXG4gICAgaWNvblJlZ2lzdHJ5LmFkZFN2Z0ljb24oJ2dvb2dsZScsICAgc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCgnLi4vYXNzZXRzL2ltZy9nb29nbGUuc3ZnJykpO1xyXG4gICAgaWNvblJlZ2lzdHJ5LmFkZFN2Z0ljb24oJ2ZhY2Vib29rJywgc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCgnLi4vYXNzZXRzL2ltZy9mYWNlYm9vay5zdmcnKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKSA6IHZvaWRcclxuICB7XHJcbiAgICAvLyBMb2dpbiBmb3JtXHJcbiAgICB0aGlzLmluaXRGb3JtR3JvdXBzKCk7XHJcbiAgICAvLyBTdHlsZSAoY29udGFpbmVyLCBzdGVwLCB0aGVtZSAmIGxheW91dClcclxuICAgIHRoaXMuaW5pdEZvcm1MYXlvdXRzKCk7XHJcbiAgICB0aGlzLmluaXRUaGVtZSgpO1xyXG5cclxuICAgIHRoaXMuaW5pdFBvbGljaWVzKCk7XHJcbiAgICB0aGlzLmluaXRJY29ucygpO1xyXG4gICAgdGhpcy5pbml0QnV0dG9ucygpO1xyXG4gICAgdGhpcy5pbml0SW5wdXRzKCk7XHJcbiAgICB0aGlzLmluaXRFcnJvcnMoKTtcclxuICAgIHRoaXMuaW5pdExhYmVscygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZWQuZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXMgOiBTaW1wbGVDaGFuZ2VzKSA6IHZvaWRcclxuICB7XHJcbiAgICBpZihjaGFuZ2VzLmdvb2dsZVN0eWxlKVxyXG4gICAgICB0aGlzLmluaXRGb3JtR3JvdXBzKCk7XHJcbiAgICBpZihjaGFuZ2VzLmN1c3RvbUZvcm1MYXlvdXRzKVxyXG4gICAgICB0aGlzLmluaXRGb3JtTGF5b3V0cygpO1xyXG4gICAgaWYoY2hhbmdlcy5nb29nbGVUaGVtZSlcclxuICAgICAgdGhpcy5pbml0VGhlbWUoKTtcclxuXHJcbiAgICBpZihjaGFuZ2VzLmN1c3RvbVB3ZFBvbGljaWVzIHx8IGNoYW5nZXMuY3VzdG9tVXNyUG9saWN5KVxyXG4gICAgICB0aGlzLmluaXRQb2xpY2llcygpO1xyXG4gICAgaWYoY2hhbmdlcy5jdXN0b21JY29ucylcclxuICAgICAgdGhpcy5pbml0SWNvbnMoKTtcclxuICAgIGlmKGNoYW5nZXMuY3VzdG9tQnV0dG9ucylcclxuICAgICAgdGhpcy5pbml0QnV0dG9ucygpO1xyXG4gICAgaWYoY2hhbmdlcy5jdXN0b21JbnB1dHMpXHJcbiAgICAgIHRoaXMuaW5pdElucHV0cygpO1xyXG4gICAgaWYoY2hhbmdlcy5jdXN0b21FcnJvcnMpXHJcbiAgICAgIHRoaXMuaW5pdEVycm9ycygpO1xyXG4gICAgaWYoY2hhbmdlcy5jdXN0b21MYWJlbHMpXHJcbiAgICAgIHRoaXMuaW5pdExhYmVscygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCkgOiB2b2lkXHJcbiAge1xyXG4gICAgaWYodGhpcy5tb2RhbEZpcnN0U3ViKVxyXG4gICAgICB0aGlzLm1vZGFsRmlyc3RTdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIGlmKHRoaXMubW9kYWxMb3N0U3ViKVxyXG4gICAgICB0aGlzLm1vZGFsTG9zdFN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgaWYodGhpcy5tb2RhbFNhdmVNZmFLZXlTdWIpXHJcbiAgICAgIHRoaXMubW9kYWxTYXZlTWZhS2V5U3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICBpZih0aGlzLm1vZGFsU2VuZE1mYUNvZGVTdWIpXHJcbiAgICAgIHRoaXMubW9kYWxTZW5kTWZhQ29kZVN1Yi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5PVEU6IEV2ZW50IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8vIE5PVEU6IEZyb20gY29tcG9uZW50IHRvIHVzZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLyoqIEVtaXQgYCRldmVudGAgb2JqZWN0IGNvbnRhaW5pbmcgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIHByb3BlcnRpZXMuXHJcbiAgKlxyXG4gICogQGV4YW1wbGVcclxuICAqIHZhciB1c2VybmFtZSA6IHN0cmluZyA9ICRldmVudC51c2VybmFtZTtcclxuICAqIHZhciBwYXNzd29yZCA6IHN0cmluZyA9ICRldmVudC5wYXNzd29yZDtcclxuICAqL1xyXG4gIHB1YmxpYyBvbkNsaWNrTG9naW4oKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZXZlbnQgOiBhbnkgPSB7fTtcclxuICAgIGV2ZW50ID0gdGhpcy5nZXRFdmVudFJlc3BvbnNlKCk7XHJcbiAgICB0aGlzLmxvZ2luLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEVtaXQgYCRldmVudGAgb2JqZWN0IGNvbnRhaW5pbmcgdXNlcm5hbWUsIHBhc3N3b3JkIGFuZCBzb2NpYWwgcHJvcGVydGllcy5cclxuICAqXHJcbiAgKiBAcGFyYW0gc29jaWFsIE5hbWUgb2YgdGhlIHNvY2lhbCBwcm92aWRlclxyXG4gICogQGV4YW1wbGVcclxuICAqIHZhciB1c2VybmFtZSA6IHN0cmluZyA9ICRldmVudC51c2VybmFtZTtcclxuICAqIHZhciBwYXNzd29yZCA6IHN0cmluZyA9ICRldmVudC5wYXNzd29yZDtcclxuICAqIHZhciBzb2NpYWwgICA6IHN0cmluZyA9ICRldmVudC5zb2NpYWw7XHJcbiAgKi9cclxuICBwdWJsaWMgb25DbGlja0xvZ2luU29jaWFsKHNvY2lhbCA6IHN0cmluZykgOiB2b2lkXHJcbiAge1xyXG4gICAgbGV0IGV2ZW50IDogYW55ID0ge307XHJcbiAgICBldmVudCA9IHRoaXMuZ2V0RXZlbnRSZXNwb25zZSgpO1xyXG4gICAgZXZlbnQuc29jaWFsID0gc29jaWFsO1xyXG4gICAgdGhpcy5sb2dpblNvY2lhbC5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKiBFbWl0IGEgY2xpY2sgZXZlbnQgb24gdGhlIHNpZ24gdXAgYnV0dG9uLiAqL1xyXG4gIHB1YmxpYyBvbkNsaWNrU2lnblVwKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zaWduVXAuZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEVtaXQgYCRldmVudGAgb2JqZWN0IGNvbnRhaW5pbmcgdXNlcm5hbWUgcHJvcGVydHkuXHJcbiAgKlxyXG4gICogQGV4YW1wbGVcclxuICAqIHZhciB1c2VybmFtZSA6IHN0cmluZyA9ICRldmVudC51c2VybmFtZTtcclxuICAqL1xyXG4gIHB1YmxpYyBvbkNsaWNrRm9yZ290UGFzc3dvcmQoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZXZlbnQgOiBhbnkgPSB7fTtcclxuICAgIGV2ZW50ID0gdGhpcy5nZXRFdmVudFJlc3BvbnNlKCd1c3InKTtcclxuICAgIHRoaXMuZm9yZ290UHdkLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLy8gTk9URTogRnJvbSB1c2VyIHRvIGNvbXBvbmVudCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKiogU2hvdyBwYXNzd29yZCBmb3JtIGVpdGhlciB0byBpbml0aWFsaXplIGZpcnN0IHBhc3N3b3JkIG9yIHRvIHJlc2V0IGZvcmdvdCBwYXNzd29yZC5cclxuICAqXHJcbiAgKiBAcGFyYW0gaXNGaXJzdCBJbml0aWFsaXplIGZpcnN0IHBhc3N3b3JkIG9yIHJlc2V0IGZvcmdvdCBwYXNzd29yZFxyXG4gICovXHJcbiAgcHVibGljIHNob3dQd2RGb3JtKGlzRmlyc3QgOiBib29sZWFuKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmlzRmlyc3QgID0gaXNGaXJzdDtcclxuICAgIHRoaXMuZm9ybVR5cGUgPSBGb3Jtcy5QV0Q7XHJcbiAgICB0aGlzLnNob3dMYXlvdXQodGhpcy5mb3JtTGF5b3V0cy5wd2QpO1xyXG4gIH1cclxuXHJcbiAgLyoqIFNob3cgTUZBIHNldHVwIGZvcm0gdG8gaW5pdGlhbGl6ZSBmaXJzdCBUT1RQIChUaW1lLWJhc2VkIE9uZS10aW1lIFBhc3N3b3JkKS5cclxuICAqXHJcbiAgKiBAcGFyYW0gY29kZSAgIFxyXG4gICogQHBhcmFtIHFyQ29kZSBcclxuICAqL1xyXG4gIHB1YmxpYyBzaG93TWZhU2V0dXBGb3JtKGNvZGUgOiBzdHJpbmcsIHFyQ29kZSA6IHN0cmluZykgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5jb2RlICAgICA9IGNvZGU7XHJcbiAgICB0aGlzLnFyQ29kZSAgID0gcXJDb2RlO1xyXG4gICAgdGhpcy5mb3JtVHlwZSA9IEZvcm1zLk1GQV9TRVRVUDtcclxuICAgIHRoaXMuc2hvd0xheW91dCh0aGlzLmZvcm1MYXlvdXRzLm1mYVNldHVwKTtcclxuICB9XHJcblxyXG4gIC8qKiBTaG93IE1GQSBmb3JtIHRvIGdldCB2ZXJpZmljYXRpb24gY29kZS4gKi9cclxuICBwdWJsaWMgc2hvd01mYUZvcm0oKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmZvcm1UeXBlID0gRm9ybXMuTUZBO1xyXG4gICAgdGhpcy5zaG93TGF5b3V0KHRoaXMuZm9ybUxheW91dHMubWZhKTtcclxuICB9XHJcblxyXG4gIC8qKiBIaWRlIHBhc3N3b3JkIGZvcm0uICovXHJcbiAgcHVibGljIGhpZGVQd2RGb3JtKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5jbG9zZUxheW91dCh0aGlzLmZvcm1MYXlvdXRzLnBhc3N3b3JkKTtcclxuICB9XHJcblxyXG4gIC8qKiBIaWRlIE1GQSBzZXR1cCBmb3JtLiAqL1xyXG4gIHB1YmxpYyBoaWRlTWZhU2V0dXBGb3JtKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5jbG9zZUxheW91dCh0aGlzLmZvcm1MYXlvdXRzLm1mYVNldHVwKTtcclxuICB9XHJcblxyXG4gIC8qKiBIaWRlIE1GQSBmb3JtLiAqL1xyXG4gIHB1YmxpYyBoaWRlTWZhRm9ybSgpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuY2xvc2VMYXlvdXQodGhpcy5mb3JtTGF5b3V0cy5tZmEpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdvIHBhc3N3b3JkIHN0ZXAuICovXHJcbiAgcHVibGljIHNob3dQd2RTdGVwKHVzZXJJbmZvIDogc3RyaW5nID0gbnVsbCwgdXNlckltYWdlIDogc3RyaW5nID0gbnVsbCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy51c2VySW5mbyAgICA9IHVzZXJJbmZvO1xyXG4gICAgdGhpcy51c2VySW1hZ2UgICA9IHVzZXJJbWFnZTtcclxuICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSAyO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5PVEU6IFN0ZXBzIGV2ZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIHB1YmxpYyBvbkNsaWNrTmV4dFN0ZXAoY3VycmVudFN0ZXAgOiBudW1iZXIpIDogdm9pZFxyXG4gIHtcclxuICAgIHN3aXRjaChjdXJyZW50U3RlcClcclxuICAgIHtcclxuICAgICAgY2FzZSAwIDpcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxIDogLy8gVXNlcm5hbWVcclxuICAgICAgICBsZXQgZXZlbnRVc3IgOiBhbnkgPSBudWxsO1xyXG4gICAgICAgIGV2ZW50VXNyID0gdGhpcy5nZXRFdmVudFJlc3BvbnNlKCd1c3InKTtcclxuICAgICAgICB0aGlzLnN0ZXBVc3IuZW1pdChldmVudFVzcik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMiA6IC8vIFBhc3N3b3JkXHJcbiAgICAgICAgbGV0IGV2ZW50UHdkIDogYW55ID0gbnVsbDtcclxuICAgICAgICBldmVudFB3ZCA9IHRoaXMuZ2V0RXZlbnRSZXNwb25zZSgpO1xyXG4gICAgICAgIHRoaXMuc3RlcFB3ZC5lbWl0KGV2ZW50UHdkKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkNsaWNrUHJldlN0ZXAoY3VycmVudFN0ZXAgOiBudW1iZXIpIDogdm9pZFxyXG4gIHtcclxuICAgIHN3aXRjaChjdXJyZW50U3RlcClcclxuICAgIHtcclxuICAgICAgY2FzZSAwIDpcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxIDogLy8gVXNlcm5hbWVcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gMDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyIDogLy8gUGFzc3dvcmRcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBOT1RFOiBUYWIgZXZlbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKiogRW1pdCBgJGV2ZW50YCBvYmplY3QgY29udGFpbmluZyBwYXNzd29yZCBwcm9wZXJ0eS5cclxuICAqXHJcbiAgKiBAZXhhbXBsZVxyXG4gICogdmFyIG5ld1Bhc3N3b3JkIDogc3RyaW5nID0gJGV2ZW50LnBhc3N3b3JkO1xyXG4gICovXHJcbiAgcHVibGljIHRhYkZpcnN0TG9nKCRldmVudCA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zZW5kRmlyc3RQd2QuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEVtaXQgYCRldmVudGAgb2JqZWN0IGNvbnRhaW5pbmcgcGFzc3dvcmQgYW5kIGNvZGUgcHJvcGVydGllcy5cclxuICAqXHJcbiAgKiBAZXhhbXBsZVxyXG4gICogdmFyIG5ld1Bhc3N3b3JkICAgICAgOiBzdHJpbmcgPSAkZXZlbnQucGFzc3dvcmQ7XHJcbiAgKiB2YXIgdmVyaWZpY2F0aW9uQ29kZSA6IHN0cmluZyA9ICRldmVudC5jb2RlO1xyXG4gICovXHJcbiAgcHVibGljIHRhYkxvc3RQd2QoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnNlbmRSZXNldFB3ZC5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKiogRW1pdCBgJGV2ZW50YCBvYmplY3QgY29udGFpbmluZyBjb2RlIHByb3BlcnR5LlxyXG4gICpcclxuICAqIEBleGFtcGxlXHJcbiAgKiB2YXIgdmVyaWZpY2F0aW9uQ29kZSA6IHN0cmluZyA9ICRldmVudC5jb2RlO1xyXG4gICovXHJcbiAgcHVibGljIHRhYlNhdmVNZmFLZXkoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnNhdmVNZmFLZXkuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEVtaXQgYCRldmVudGAgb2JqZWN0IGNvbnRhaW5pbmcgY29kZSBwcm9wZXJ0eS5cclxuICAqXHJcbiAgKiBAZXhhbXBsZVxyXG4gICogdmFyIHZlcmlmaWNhdGlvbkNvZGUgOiBzdHJpbmcgPSAkZXZlbnQuY29kZTtcclxuICAqL1xyXG4gIHB1YmxpYyB0YWJTZW5kTWZhQ29kZSgkZXZlbnQgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuc2VuZE1mYUNvZGUuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5PVEU6IE1vZGFsIGV2ZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKiBFbWl0IGAkZXZlbnRgIG9iamVjdCBjb250YWluaW5nIHBhc3N3b3JkIHByb3BlcnR5LlxyXG4gICpcclxuICAqIEBleGFtcGxlXHJcbiAgKiB2YXIgbmV3UGFzc3dvcmQgOiBzdHJpbmcgPSAkZXZlbnQucGFzc3dvcmQ7XHJcbiAgKi9cclxuICBwdWJsaWMgbW9kYWxGaXJzdExvZyhkaWFsb2dSZWYgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMubW9kYWxGaXJzdFN1YiA9IGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5yZWxheUZpcnN0TG9nLnN1YnNjcmliZSgoZXZlbnQpID0+XHJcbiAgICB7XHJcbiAgICAgIHRoaXMuc2VuZEZpcnN0UHdkLmVtaXQoZXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogRW1pdCBgJGV2ZW50YCBvYmplY3QgY29udGFpbmluZyBwYXNzd29yZCBhbmQgY29kZSBwcm9wZXJ0aWVzLlxyXG4gICpcclxuICAqIEBleGFtcGxlXHJcbiAgKiB2YXIgbmV3UGFzc3dvcmQgICAgICA6IHN0cmluZyA9ICRldmVudC5wYXNzd29yZDtcclxuICAqIHZhciB2ZXJpZmljYXRpb25Db2RlIDogc3RyaW5nID0gJGV2ZW50LmNvZGU7XHJcbiAgKi9cclxuICBwdWJsaWMgbW9kYWxMb3N0UHdkKGRpYWxvZ1JlZiA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5tb2RhbExvc3RTdWIgPSBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UucmVsYXlMb3N0UHdkLnN1YnNjcmliZSgoZXZlbnQpID0+XHJcbiAgICB7XHJcbiAgICAgIHRoaXMuc2VuZFJlc2V0UHdkLmVtaXQoZXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogRW1pdCBgJGV2ZW50YCBvYmplY3QgY29udGFpbmluZyBjb2RlIHByb3BlcnR5LlxyXG4gICpcclxuICAqIEBleGFtcGxlXHJcbiAgKiB2YXIgdmVyaWZpY2F0aW9uQ29kZSA6IHN0cmluZyA9ICRldmVudC5jb2RlO1xyXG4gICovXHJcbiAgcHVibGljIG1vZGFsU2F2ZU1mYUtleShkaWFsb2dSZWYgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMubW9kYWxTYXZlTWZhS2V5U3ViID0gZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnJlbGF5U2F2ZU1mYUtleS5zdWJzY3JpYmUoKGV2ZW50KSA9PlxyXG4gICAge1xyXG4gICAgICB0aGlzLnNhdmVNZmFLZXkuZW1pdChldmVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBFbWl0IGAkZXZlbnRgIG9iamVjdCBjb250YWluaW5nIGNvZGUgcHJvcGVydHkuXHJcbiAgKlxyXG4gICogQGV4YW1wbGVcclxuICAqIHZhciB2ZXJpZmljYXRpb25Db2RlIDogc3RyaW5nID0gJGV2ZW50LmNvZGU7XHJcbiAgKi9cclxuICBwdWJsaWMgbW9kYWxTZW5kTWZhQ29kZShkaWFsb2dSZWYgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMubW9kYWxTZW5kTWZhQ29kZVN1YiA9IGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5yZWxheVNlbmRNZmFDb2RlLnN1YnNjcmliZSgoZXZlbnQpID0+XHJcbiAgICB7XHJcbiAgICAgIHRoaXMuc2VuZE1mYUNvZGUuZW1pdChldmVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBOT1RFOiBUYWIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBwdWJsaWMgb25DbGlja0Nsb3NlVGFiKCRldmVudCA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5jbG9zZVRhYigpO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5PVEU6IE1vZGFsIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIHByaXZhdGUgb3Blbk1vZGFsKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgbGV0IHBhcmFtcyA6IGFueSA9IHtcclxuICAgICAgLy8gQ29tbW9uXHJcbiAgICAgIGZvcm1UeXBlICAgICAgICAgICAgICA6IHRoaXMuZm9ybVR5cGUsXHJcbiAgICAgIGxhYmVscyAgICAgICAgICAgICAgICA6IHRoaXMubGFiZWxzLFxyXG4gICAgICBjbG9zZUV2ZW50ICAgICAgICAgICAgOiB0aGlzLmNsb3NlTW9kYWxFdmVudCxcclxuICAgICAgZXJyb3JzICAgICAgICAgICAgICAgIDogdGhpcy5lcnJvcnMsXHJcbiAgICAgIGlucHV0cyAgICAgICAgICAgICAgICA6IHRoaXMuaW5wdXRzLFxyXG4gICAgICAvLyBQYXNzd29yZCBmb3JtXHJcbiAgICAgIGlzRmlyc3QgICAgICAgICAgICAgICA6IHRoaXMuaXNGaXJzdCxcclxuICAgICAgcHdkUG9saWNpZXMgICAgICAgICAgIDogdGhpcy5wd2RQb2xpY2llcyxcclxuICAgICAgLy8gTWZhIGZvcm1cclxuICAgICAgY29kZSAgICAgICAgICAgICAgICAgIDogdGhpcy5jb2RlLFxyXG4gICAgICBxckNvZGUgICAgICAgICAgICAgICAgOiB0aGlzLnFyQ29kZVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihNb2RhbFdyYXBwZXJDb21wb25lbnQsIHsgZGF0YSA6IHBhcmFtcyB9KTtcclxuXHJcbiAgICBpZih0aGlzLmZvcm1UeXBlID09PSBGb3Jtcy5QV0QpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMubW9kYWxGaXJzdExvZyhkaWFsb2dSZWYpO1xyXG4gICAgICB0aGlzLm1vZGFsTG9zdFB3ZChkaWFsb2dSZWYpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHRoaXMuZm9ybVR5cGUgPT09IEZvcm1zLk1GQV9TRVRVUClcclxuICAgICAgdGhpcy5tb2RhbFNhdmVNZmFLZXkoZGlhbG9nUmVmKTtcclxuXHJcbiAgICBpZih0aGlzLmZvcm1UeXBlID09PSBGb3Jtcy5NRkEpXHJcbiAgICAgIHRoaXMubW9kYWxTZW5kTWZhQ29kZShkaWFsb2dSZWYpO1xyXG5cclxuICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT5cclxuICAgIHtcclxuICAgICAgdGhpcy5mb3JtVHlwZSA9IG51bGw7XHJcbiAgICAgIGlmKHJlc3VsdClcclxuICAgICAgICB0aGlzLmZvcm1Hcm91cC5jb250cm9scy5wYXNzd29yZC5zZXRWYWx1ZShyZXN1bHQpOyAvLyBTZXQgcGFzc3dvcmRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5PVEU6IFByaXZhdGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIHByaXZhdGUgc2hvd0xheW91dChmb3JtTGF5b3V0IDogc3RyaW5nKSA6IHZvaWRcclxuICB7XHJcbiAgICBzd2l0Y2goZm9ybUxheW91dClcclxuICAgIHtcclxuICAgICAgY2FzZSBMYXlvdXRzLlRBQiAgICA6XHJcbiAgICAgICAgdGhpcy5vcGVuVGFiKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgTGF5b3V0cy5NT0RBTCAgOlxyXG4gICAgICAgIHRoaXMub3Blbk1vZGFsKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgTGF5b3V0cy5JTkxJTkUgOlxyXG4gICAgICAgIHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzLnVzZXJuYW1lLmRpc2FibGUoKTtcclxuICAgICAgICB0aGlzLmZvcm1Hcm91cC5jb250cm9scy5wYXNzd29yZC5kaXNhYmxlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgIHRoaXMub3BlblRhYigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbG9zZUxheW91dChmb3JtTGF5b3V0IDogc3RyaW5nKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmZvcm1UeXBlID0gbnVsbDtcclxuXHJcbiAgICBzd2l0Y2goZm9ybUxheW91dClcclxuICAgIHtcclxuICAgICAgY2FzZSBMYXlvdXRzLlRBQiAgICA6XHJcbiAgICAgICAgdGhpcy5jbG9zZVRhYigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIExheW91dHMuTU9EQUwgIDpcclxuICAgICAgICB0aGlzLmNsb3NlTW9kYWwoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBMYXlvdXRzLklOTElORSA6XHJcbiAgICAgICAgdGhpcy5mb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuZW5hYmxlKCk7XHJcbiAgICAgICAgdGhpcy5mb3JtR3JvdXAuY29udHJvbHMucGFzc3dvcmQuZW5hYmxlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgIHRoaXMuY2xvc2VUYWIoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xvc2VNb2RhbCgpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuY2xvc2VNb2RhbEV2ZW50LmVtaXQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb3BlblRhYigpIDogdm9pZFxyXG4gIHtcclxuICAgIGlmKHRoaXMuZ29vZ2xlU3R5bGUpXHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSAzO1xyXG4gICAgZWxzZVxyXG4gICAgICB0aGlzLnNlbGVjdGVkVGFiID0gMTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xvc2VUYWIoKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnNlbGVjdGVkVGFiID0gMDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0RXZlbnRSZXNwb25zZShvbmx5T25lIDogc3RyaW5nID0gbnVsbCkgOiBhbnlcclxuICB7XHJcbiAgICBsZXQgZXZlbnQgICAgOiBhbnkgICAgPSB7fTtcclxuICAgIGxldCB1c2VybmFtZSA6IHN0cmluZyA9IG51bGw7XHJcbiAgICBsZXQgcGFzc3dvcmQgOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIGlmKHRoaXMuZ29vZ2xlU3R5bGUpXHJcbiAgICB7XHJcbiAgICAgIHVzZXJuYW1lID0gdGhpcy51c3JGb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUudmFsdWU7XHJcbiAgICAgIHBhc3N3b3JkID0gdGhpcy5wd2RGb3JtR3JvdXAuY29udHJvbHMucGFzc3dvcmQudmFsdWU7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIHVzZXJuYW1lID0gdGhpcy5mb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUudmFsdWU7XHJcbiAgICAgIHBhc3N3b3JkID0gdGhpcy5mb3JtR3JvdXAuY29udHJvbHMucGFzc3dvcmQudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIW9ubHlPbmUpXHJcbiAgICB7XHJcbiAgICAgIGV2ZW50LnVzZXJuYW1lID0gdXNlcm5hbWU7XHJcbiAgICAgIGV2ZW50LnBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcbiAgICB9XHJcbiAgICBpZihvbmx5T25lICYmIG9ubHlPbmUgPT09ICd1c3InKVxyXG4gICAgICBldmVudC51c2VybmFtZSA9IHVzZXJuYW1lO1xyXG4gICAgaWYob25seU9uZSAmJiBvbmx5T25lID09PSAncHdkJylcclxuICAgICAgZXZlbnQucGFzc3dvcmQgPSBwYXNzd29yZDtcclxuXHJcbiAgICByZXR1cm4gZXZlbnQ7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gTk9URTogSW5pdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgcHJpdmF0ZSBpbml0Rm9ybUxheW91dHMoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZGVmYXVsdEZvcm1MYXlvdXRzIDogYW55ID0gbnVsbDtcclxuICAgIGxldCBmb3JtTGF5b3V0cyAgICAgICAgOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIC8vIEZvcm0gbGF5b3V0c1xyXG4gICAgZGVmYXVsdEZvcm1MYXlvdXRzID0ge1xyXG4gICAgICBwd2QgICAgICA6IExheW91dHMuVEFCLFxyXG4gICAgICBtZmFTZXR1cCA6IExheW91dHMuVEFCLFxyXG4gICAgICBtZmEgICAgICA6IExheW91dHMuVEFCLFxyXG4gICAgfTtcclxuXHJcbiAgICBmb3JtTGF5b3V0cyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdEZvcm1MYXlvdXRzLCB0aGlzLmN1c3RvbUZvcm1MYXlvdXRzKTtcclxuXHJcbiAgICAvLyBDb3JyZWN0aW9uc1xyXG4gICAgaWYoZm9ybUxheW91dHMucHdkID09PSBMYXlvdXRzLklOTElORSlcclxuICAgICAgZm9ybUxheW91dHMucHdkID0gTGF5b3V0cy5UQUI7XHJcbiAgICBpZihmb3JtTGF5b3V0cy5tZmFTZXR1cCA9PT0gTGF5b3V0cy5JTkxJTkUpXHJcbiAgICAgIGZvcm1MYXlvdXRzLm1mYVNldHVwID0gTGF5b3V0cy5UQUI7XHJcbiAgICBpZih0aGlzLmdvb2dsZVN0eWxlICYmIGZvcm1MYXlvdXRzLm1mYSA9PT0gTGF5b3V0cy5JTkxJTkUpXHJcbiAgICAgIGZvcm1MYXlvdXRzLm1mYSA9IExheW91dHMuVEFCO1xyXG5cclxuICAgIHRoaXMuZm9ybUxheW91dHMgPSBmb3JtTGF5b3V0cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFRoZW1lKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgbGV0IHRoZW1lIDogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICAvLyBUaGVtZVxyXG4gICAgc3dpdGNoKHRoaXMuZ29vZ2xlVGhlbWUpXHJcbiAgICB7XHJcbiAgICAgIGNhc2UgVGhlbWVzLkxJR0hUIDpcclxuICAgICAgICB0aGVtZSA9IHRoaXMuZ29vZ2xlVGhlbWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgVGhlbWVzLkRBUksgOlxyXG4gICAgICAgIHRoZW1lID0gdGhpcy5nb29nbGVUaGVtZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgdGhlbWUgPSBUaGVtZXMuTElHSFQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50aGVtZSA9IHRoZW1lO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0SWNvbnMoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZGVmYXVsdEljb25zIDogYW55ID0gbnVsbDtcclxuICAgIGxldCBpY29ucyAgICAgICAgOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIC8vIEljb25zXHJcbiAgICBkZWZhdWx0SWNvbnMgPSB7XHJcbiAgICAgIGljb25Vc3JPbkxvZ2luRm9ybSA6IHRydWUsXHJcbiAgICAgIGljb25Qd2RPbkxvZ2luRm9ybSA6IHRydWUsXHJcbiAgICB9O1xyXG5cclxuICAgIGljb25zID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0SWNvbnMsIHRoaXMuY3VzdG9tSWNvbnMpO1xyXG4gICAgdGhpcy5pY29ucyA9IGljb25zO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0QnV0dG9ucygpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBkZWZhdWx0QnV0b25zIDogYW55ID0gbnVsbDtcclxuICAgIGxldCBidXR0b25zICAgICAgIDogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvLyBCdXR0b25zXHJcbiAgICBkZWZhdWx0QnV0b25zID0ge1xyXG4gICAgICBmb3Jnb3RQYXNzd29yZCA6IHRydWUsXHJcbiAgICAgIHNpZ25VcCAgICAgICAgIDogdHJ1ZSxcclxuICAgICAgZ29vZ2xlICAgICAgICAgOiB0cnVlLFxyXG4gICAgICBmYWNlYm9vayAgICAgICA6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgYnV0dG9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdEJ1dG9ucywgdGhpcy5jdXN0b21CdXR0b25zKTtcclxuICAgIHRoaXMuYnV0dG9ucyA9IGJ1dHRvbnM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRJbnB1dHMoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZGVmYXVsdElucHV0cyA6IGFueSA9IG51bGw7XHJcbiAgICBsZXQgaW5wdXRzICAgICAgICA6IGFueSA9IG51bGw7XHJcblxyXG4gICAgLy8gSW5wdXRzXHJcbiAgICBkZWZhdWx0SW5wdXRzID0ge1xyXG4gICAgICBjbGVhclVzck9uTG9naW5Gb3JtIDogdHJ1ZSxcclxuICAgICAgc2hvd1B3ZE9uTG9naW5Gb3JtICA6IHRydWUsXHJcbiAgICAgIHNob3dQd2RPblB3ZEZvcm0gICAgOiB0cnVlLFxyXG4gICAgICBjbGVhckNvZGVPblB3ZEZvcm0gIDogdHJ1ZSxcclxuICAgICAgY2xlYXJDb2RlT25NZmFGb3JtICA6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgaW5wdXRzID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0SW5wdXRzLCB0aGlzLmN1c3RvbUlucHV0cyk7XHJcbiAgICB0aGlzLmlucHV0cyA9IGlucHV0cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEVycm9ycygpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBkZWZhdWx0RXJyb3JzIDogYW55ID0gbnVsbDtcclxuICAgIGxldCBlcnJvcnMgICAgICAgIDogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvLyBFcnJvcnNcclxuICAgIGRlZmF1bHRFcnJvcnMgPSB7XHJcbiAgICAgIGxvZ2luIDogdHJ1ZSxcclxuICAgICAgcHdkICAgOiB0cnVlLFxyXG4gICAgICBtZmEgICA6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgZXJyb3JzID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0RXJyb3JzLCB0aGlzLmN1c3RvbUVycm9ycyk7XHJcbiAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFBvbGljaWVzKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgLy8gTk9URTogUGFzc3dvcmRcclxuICAgIGxldCBkZWZhdWx0UHdkUG9saWNpZXMgOiBhbnkgICAgPSBudWxsO1xyXG4gICAgbGV0IHB3ZFBvbGljaWVzICAgICAgICA6IGFueSAgICA9IG51bGw7XHJcbiAgICBsZXQgZGVmYXVsdE1pbiAgICAgICAgIDogbnVtYmVyID0gODtcclxuICAgIGxldCBkZWZhdWx0TWF4ICAgICAgICAgOiBudW1iZXIgPSAxMjg7XHJcblxyXG4gICAgLy8gUGFzc3dvcmQgcG9saWNpZXNcclxuICAgIGRlZmF1bHRQd2RQb2xpY2llcyA9IHtcclxuICAgICAgcmFuZ2UgOiB7XHJcbiAgICAgICAgbWluIDogZGVmYXVsdE1pbixcclxuICAgICAgICBtYXggOiBkZWZhdWx0TWF4LFxyXG4gICAgICB9LFxyXG4gICAgICBjaGFyICAgOiB0cnVlLFxyXG4gICAgICBudW1iZXIgOiB0cnVlLFxyXG4gICAgICBsb3dlciAgOiB0cnVlLFxyXG4gICAgICB1cHBlciAgOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIHB3ZFBvbGljaWVzID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0UHdkUG9saWNpZXMsIHRoaXMuY3VzdG9tUHdkUG9saWNpZXMpO1xyXG5cclxuICAgIGlmKHB3ZFBvbGljaWVzLnJhbmdlLm1pbiA+IHB3ZFBvbGljaWVzLnJhbmdlLm1heClcclxuICAgIHtcclxuICAgICAgcHdkUG9saWNpZXMucmFuZ2UubWluID0gZGVmYXVsdE1pbjtcclxuICAgICAgcHdkUG9saWNpZXMucmFuZ2UubWF4ID0gZGVmYXVsdE1heDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnB3ZFBvbGljaWVzID0gcHdkUG9saWNpZXM7XHJcblxyXG4gICAgLy8gTk9URTogVXNlcm5hbWVcclxuICAgIGlmKCF0aGlzLmN1c3RvbVVzclBvbGljeSlcclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIGxldCB2YWxpZGF0b3JzIDogYW55ID0gW107XHJcblxyXG4gICAgc3dpdGNoKHRoaXMuY3VzdG9tVXNyUG9saWN5KVxyXG4gICAge1xyXG4gICAgICBjYXNlIFVzZXJQb2xpY2llcy5FTUFJTCA6XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFVzclZhbGlkYXRvci5lbWFpbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgVXNlclBvbGljaWVzLlBIT05FIDpcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVXNyVmFsaWRhdG9yLnBob25lKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgbGV0IHJlZ0V4cCA6IFJlZ0V4cCA9IG51bGw7XHJcbiAgICAgICAgcmVnRXhwID0gbmV3IFJlZ0V4cCh0aGlzLmN1c3RvbVVzclBvbGljeSk7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFVzclZhbGlkYXRvci5jdXN0b20ocmVnRXhwKSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xyXG4gICAgaWYodGhpcy5nb29nbGVTdHlsZSlcclxuICAgICAgdGhpcy51c3JGb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuc2V0VmFsaWRhdG9ycyh2YWxpZGF0b3JzKTtcclxuICAgIGVsc2VcclxuICAgICAgdGhpcy5mb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuc2V0VmFsaWRhdG9ycyh2YWxpZGF0b3JzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdExhYmVscygpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBkZWZhdWx0TGFiZWxzIDogYW55ID0ge307XHJcbiAgICBsZXQgbGFiZWxzICAgICAgICA6IGFueSA9IHt9O1xyXG5cclxuICAgIGRlZmF1bHRMYWJlbHMuaGVhZGVyID0ge1xyXG4gICAgICB0aXRsZVB3ZCAgICAgICAgIDogJ0xvc3QgcGFzc3dvcmQnLFxyXG4gICAgICBzdWJ0aXRsZVB3ZCAgICAgIDogJ1BsZWFzZSBlbnRlciB0aGUgY29uZmlybWF0aW9uIGNvZGUnLFxyXG4gICAgICB0aXRsZVB3ZFNldHVwICAgIDogJ1Bhc3N3b3JkIHNldHVwJyxcclxuICAgICAgc3VidGl0bGVQd2RTZXR1cCA6ICdQbGVhc2UgZW50ZXIgYSBuZXcgcGFzc3dvcmQnLFxyXG4gICAgICB0aXRsZU1mYSAgICAgICAgIDogJ01GQScsXHJcbiAgICAgIHN1YnRpdGxlTWZhICAgICAgOiAnUGxlYXNlIGVudGVyIHRoZSBjb25maXJtYXRpb24gY29kZScsXHJcbiAgICAgIHRpdGxlTWZhU2V0dXAgICAgOiAnTUZBIHNldHVwJyxcclxuICAgICAgc3VidGl0bGVNZmFTZXR1cCA6ICdTYXZlIHRoaXMgc2VjcmV0IGtleSBmb3IgZnV0dXJlIGNvbm5lY3Rpb24nXHJcbiAgICB9O1xyXG4gICAgZGVmYXVsdExhYmVscy5pbnB1dCA9IHtcclxuICAgICAgdXNlcm5hbWUgICAgOiAnVXNlcm5hbWUnLFxyXG4gICAgICBwYXNzd29yZCAgICA6ICdQYXNzd29yZCcsXHJcbiAgICAgIHZlcmlmQ29kZSAgIDogJ1ZlcmlmaWNhdGlvbiBjb2RlJyxcclxuICAgICAgbmV3UGFzc3dvcmQgOiAnTmV3IHBhc3N3b3JkJ1xyXG4gICAgfTtcclxuICAgIGRlZmF1bHRMYWJlbHMuYnV0dG9uID0ge1xyXG4gICAgICBzaWduSW4gICAgICAgICA6ICdTaWduIGluJyxcclxuICAgICAgc2lnblVwICAgICAgICAgOiAnU2lnbiB1cCcsXHJcbiAgICAgIG5leHQgICAgICAgICAgIDogJ05leHQnLFxyXG4gICAgICBiYWNrICAgICAgICAgICA6ICdCYWNrJyxcclxuICAgICAgc2VuZCAgICAgICAgICAgOiAnU2VuZCcsXHJcbiAgICAgIHNhdmUgICAgICAgICAgIDogJ1NhdmUnLFxyXG4gICAgICBmb3Jnb3RQYXNzd29yZCA6ICdGb3Jnb3QgcGFzc3dvcmQnLFxyXG4gICAgICBnb29nbGVTaWduSW4gICA6ICdTaWduIGluIHdpdGggR29vZ2xlJyxcclxuICAgICAgZmFjZWJvb2tTaWduSW4gOiAnU2lnbiBpbiB3aXRoIEZhY2Vib29rJ1xyXG4gICAgfTtcclxuICAgIGRlZmF1bHRMYWJlbHMucG9saWN5ID0ge1xyXG4gICAgICByZXF1aXJlZCAgICAgIDogJ1RoaXMgZmllbGQgaXMgcmVxdWlyZWQnLFxyXG4gICAgICBub25XaGl0ZXNwYWNlIDogJ1RoaXMgdmFsdWUgbXVzdCBub3QgY29udGFpbiBhbnkgc3BhY2VzJyxcclxuICAgICAgZW1haWwgICAgICAgICA6ICdUaGlzIHZhbHVlIG11c3QgYmUgYW4gZW1haWwnLFxyXG4gICAgICBwaG9uZSAgICAgICAgIDogJ1RoaXMgdmFsdWUgbXVzdCBiZSBhIHBob25lIG51bWJlcicsXHJcbiAgICAgIHNpeERpZ2l0cyAgICAgOiAnVGhpcyB2YWx1ZSBtdXN0IGNvbnRhaW5zIHNpeCBkaWdpdHMnLFxyXG4gICAgICBjdXN0b21SZWdleCAgIDogJ1RoaXMgdmFsdWUgbXVzdCBtYXRjaCB0aGUgY3VzdG9tIHJlZ2V4IHByb3ZpZGVkJyxcclxuICAgICAgcHdkTGVuZ3RoICAgICA6ICdNaW5pbXVtIHBhc3N3b3JkIGxlbmd0aCAoe3ttaW59fSB0byB7e21heH19KScsXHJcbiAgICAgIHB3ZFVwcGVyY2FzZSAgOiAnUmVxdWlyZSBhdCBsZWFzdCBvbmUgdXBwZXJjYXNlIGxldHRlciAoQSB0byBaKScsXHJcbiAgICAgIHB3ZExvd2VyY2FzZSAgOiAnUmVxdWlyZSBhdCBsZWFzdCBvbmUgbG93ZXJjYXNlIGxldHRlciAoYSB0byB6KScsXHJcbiAgICAgIHB3ZE51bWJlciAgICAgOiAnUmVxdWlyZSBhdCBsZWFzdCBvbmUgbnVtYmVyICgwIHRvIDkpJyxcclxuICAgICAgcHdkU3BlY2lhbCAgICA6ICdSZXF1aXJlIGF0IGxlYXN0IG9uZSBub25hbHBoYW51bWVyaWMgY2hhcmFjdGVyICEgQCAjICQgJSBeICYgKiAoICkgXyArIC0gPSBbIF0geyB9IHwgXFwnJ1xyXG4gICAgfTtcclxuXHJcbiAgICBsYWJlbHMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRMYWJlbHMsIHRoaXMuY3VzdG9tTGFiZWxzKTtcclxuXHJcbiAgICB0aGlzLmxhYmVscyA9IGxhYmVscztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEZvcm1Hcm91cHMoKSA6IHZvaWRcclxuICB7XHJcbiAgICBpZighdGhpcy5nb29nbGVTdHlsZSlcclxuICAgIHtcclxuICAgICAgdGhpcy5mb3JtR3JvdXAgPSB0aGlzLmJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICAgIHVzZXJuYW1lICAgICA6IG5ldyBGb3JtQ29udHJvbCh7XHJcbiAgICAgICAgICB2YWx1ZSAgICAgIDogbnVsbCxcclxuICAgICAgICAgIGRpc2FibGVkICAgOiBmYWxzZVxyXG4gICAgICAgIH0sW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSxcclxuICAgICAgICBwYXNzd29yZCAgICAgOiBuZXcgRm9ybUNvbnRyb2woe1xyXG4gICAgICAgICAgdmFsdWUgICAgICA6IG51bGwsXHJcbiAgICAgICAgICBkaXNhYmxlZCAgIDogZmFsc2VcclxuICAgICAgICB9LFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51c3JGb3JtR3JvdXAgPSB0aGlzLmJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICB1c2VybmFtZSAgICAgOiBuZXcgRm9ybUNvbnRyb2woe1xyXG4gICAgICAgIHZhbHVlICAgICAgOiBudWxsLFxyXG4gICAgICAgIGRpc2FibGVkICAgOiBmYWxzZVxyXG4gICAgICB9LFtWYWxpZGF0b3JzLnJlcXVpcmVkXSlcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucHdkRm9ybUdyb3VwID0gdGhpcy5idWlsZGVyLmdyb3VwKHtcclxuICAgICAgcGFzc3dvcmQgICAgIDogbmV3IEZvcm1Db250cm9sKHtcclxuICAgICAgICB2YWx1ZSAgICAgIDogbnVsbCxcclxuICAgICAgICBkaXNhYmxlZCAgIDogZmFsc2VcclxuICAgICAgfSxbVmFsaWRhdG9ycy5yZXF1aXJlZF0pXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59XHJcbiIsIi8vIEFuZ3VsYXIgbW9kdWxlc1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT25Jbml0IH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9uRGVzdHJveSB9ICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJbnB1dCB9ICAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT3V0cHV0IH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLy8gRW51bVxyXG5pbXBvcnQgeyBGb3JtcyB9ICAgICAgICBmcm9tICcuLi8uLi9lbnVtcy9mb3Jtcy5lbnVtJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yICAgIDogJ2NhbC10YWItd3JhcHBlcicsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaGVhZGVyIHB5LTIgcHgtNCBtYi0zXCI+XHJcbiAgPGRpdiBjbGFzcz1cInJvdyBhbGlnbi1pdGVtcy1jZW50ZXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtMiBweC0wIHRleHQtbGVmdFwiPlxyXG4gICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwiYmFja1RvTG9naW4oKVwiPlxyXG4gICAgICAgIDxtYXQtaWNvbj5hcnJvd19iYWNrPC9tYXQtaWNvbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wgdGV4dC1yaWdodFwiPlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiIWlzRmlyc3QgJiYgZm9ybVR5cGUgPT09IGZvcm1zLlBXRFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaDUgZm9udC13ZWlnaHQtbGlnaHQge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZCA/ICdkLWJsb2NrIG1iLTAnIDogJycgfX1cIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIudGl0bGVQd2QgfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJsYWJlbHMuaGVhZGVyLnN1YnRpdGxlUHdkXCIgY2xhc3M9XCJkLWJsb2NrIGZvbnQtd2VpZ2h0LWxpZ2h0IHNtYWxsXCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnN1YnRpdGxlUHdkIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdJZj1cImlzRmlyc3QgJiYgZm9ybVR5cGUgPT09IGZvcm1zLlBXRFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaDUgZm9udC13ZWlnaHQtbGlnaHQge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZFNldHVwID8gJ2QtYmxvY2sgbWItMCcgOiAnJyB9fVwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci50aXRsZVB3ZFNldHVwIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwibGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZFNldHVwXCIgY2xhc3M9XCJkLWJsb2NrIGZvbnQtd2VpZ2h0LWxpZ2h0IHNtYWxsXCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnN1YnRpdGxlUHdkU2V0dXAgfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiZm9ybVR5cGUgPT09IGZvcm1zLk1GQVwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaDUgZm9udC13ZWlnaHQtbGlnaHQge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZU1mYSA/ICdkLWJsb2NrIG1iLTAnIDogJycgfX1cIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIudGl0bGVNZmEgfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJsYWJlbHMuaGVhZGVyLnN1YnRpdGxlTWZhXCIgY2xhc3M9XCJkLWJsb2NrIGZvbnQtd2VpZ2h0LWxpZ2h0IHNtYWxsXCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnN1YnRpdGxlTWZhIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdJZj1cImZvcm1UeXBlID09PSBmb3Jtcy5NRkFfU0VUVVBcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImg1IGZvbnQtd2VpZ2h0LWxpZ2h0IHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVNZmFTZXR1cCA/ICdkLWJsb2NrIG1iLTAnIDogJycgfX1cIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIudGl0bGVNZmFTZXR1cCB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cImxhYmVscy5oZWFkZXIuc3VidGl0bGVNZmFTZXR1cFwiIGNsYXNzPVwiZC1ibG9jayBmb250LXdlaWdodC1saWdodCBzbWFsbFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZU1mYVNldHVwIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuPCEtLSBOT1RFOiBQd2QgRm9ybSAtLT5cclxuPGNhbC1wd2QtZm9ybSAqbmdJZj1cImZvcm1UeXBlID09PSBmb3Jtcy5QV0RcIiBcclxuICBbaXNGaXJzdF09XCJpc0ZpcnN0XCIgXHJcbiAgW3B3ZFBvbGljaWVzXT1cInB3ZFBvbGljaWVzXCIgXHJcbiAgW2xhYmVsc109XCJsYWJlbHNcIiBcclxuICBbaW5wdXRzXT1cImlucHV0c1wiIFxyXG4gIFtlcnJvcnNdPVwiZXJyb3JzXCIgXHJcbiAgKGZpcnN0Q29ubmVjdGlvbik9XCJyZWxheUZpcnN0TG9nRXZlbnQoJGV2ZW50KVwiIFxyXG4gIChsb3N0UGFzc3dvcmQpPVwicmVsYXlMb3N0UHdkRXZlbnQoJGV2ZW50KVwiPlxyXG48L2NhbC1wd2QtZm9ybT5cclxuPCEtLSBOT1RFOiBNRkEgU2V0dXAgRm9ybSAtLT5cclxuPGNhbC1tZmEtc2V0dXAtZm9ybSAqbmdJZj1cImZvcm1UeXBlID09PSBmb3Jtcy5NRkFfU0VUVVBcIiBcclxuICBbcXJDb2RlXT1cInFyQ29kZVwiIFxyXG4gIFtjb2RlXSAgPVwiY29kZVwiIFxyXG4gIFtsYWJlbHNdPVwibGFiZWxzXCIgXHJcbiAgW2lucHV0c109XCJpbnB1dHNcIiBcclxuICBbZXJyb3JzXT1cImVycm9yc1wiIFxyXG4gIChzYXZlTWZhKT1cInJlbGF5U2F2ZU1mYUtleUV2ZW50KCRldmVudClcIj5cclxuPC9jYWwtbWZhLXNldHVwLWZvcm0+XHJcbjwhLS0gTk9URTogTUZBIEZvcm0gLS0+XHJcbjxjYWwtbWZhLWZvcm0gKm5nSWY9XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBXCIgXHJcbiAgW2xhYmVsc109XCJsYWJlbHNcIiBcclxuICBbaW5wdXRzXT1cImlucHV0c1wiIFxyXG4gIFtlcnJvcnNdPVwiZXJyb3JzXCIgXHJcbiAgKHNlbmRNZmEpPVwicmVsYXlTZW5kTWZhQ29kZUV2ZW50KCRldmVudClcIj5cclxuPC9jYWwtbWZhLWZvcm0+YCxcclxuICBzdHlsZXM6IFtgLmhlYWRlcntjb2xvcjojZmZmO2JhY2tncm91bmQ6IzVlYWNmZn1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFiV3JhcHBlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XHJcbntcclxuICAvLyBOT1RFOiBVc2VmdWwgZm9yIHRlbXBsYXRlXHJcbiAgcHVibGljICAgIGZvcm1zID0gRm9ybXM7XHJcblxyXG4gIC8vIE5PVEU6IENvbW1vblxyXG4gIC8vIEZvcm0gdHlwZSAocGFzc3dvcmQgLyBtZmEpXHJcbiAgQElucHV0KCkgIGZvcm1UeXBlICAgICAgOiBzdHJpbmc7XHJcbiAgLy8gTGFiZWxzXHJcbiAgQElucHV0KCkgIGxhYmVscyAgICAgICAgOiBhbnk7XHJcbiAgLy8gRXJyb3JzXHJcbiAgQElucHV0KCkgIGVycm9ycyAgICAgICAgOiBhbnk7XHJcbiAgLy8gSW5wdXRzXHJcbiAgQElucHV0KCkgIGlucHV0cyAgICAgICAgOiBhbnk7XHJcbiAgLy8gRXZlbnQgc2VudCBmcm9tIHRhYlxyXG4gIEBPdXRwdXQoKSBzZW5kQ2xvc2VUYWIgIDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvLyBOT1RFOiBQYXNzd29yZFxyXG4gIC8vIEZpcnN0IGNvbm5lY3Rpb24gb3IgRm9yZ290IHBhc3N3b3JkXHJcbiAgQElucHV0KCkgIGlzRmlyc3QgICAgICAgOiBib29sZWFuO1xyXG4gIC8vIFBhc3N3b3JkIHBvbGljaWVzXHJcbiAgQElucHV0KCkgIHB3ZFBvbGljaWVzICAgOiBhbnk7XHJcbiAgLy8gRXZlbnQgc2VudCBmcm9tIHBhc3N3b3JkIGZvcm1cclxuICBAT3V0cHV0KCkgcmVsYXlGaXJzdExvZyA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSByZWxheUxvc3RQd2QgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8vIE5PVEU6IE1GQSBzZXR1cFxyXG4gIC8vIE1GQSBzZWNyZXQga2V5XHJcbiAgQElucHV0KCkgIGNvZGUgICAgICAgICAgICA6IHN0cmluZztcclxuICBASW5wdXQoKSAgcXJDb2RlICAgICAgICAgIDogc3RyaW5nO1xyXG4gIC8vIEV2ZW50IHNlbnQgZnJvbSBtZmEgc2V0dXAgZm9ybVxyXG4gIEBPdXRwdXQoKSByZWxheVNhdmVNZmFLZXkgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLy8gTk9URTogTUZBXHJcbiAgLy8gRXZlbnQgc2VudCBmcm9tIG1mYSBmb3JtXHJcbiAgQE91dHB1dCgpIHJlbGF5U2VuZE1mYUNvZGUgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3JcclxuICAoXHJcbiAgKVxyXG4gIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpIDogdm9pZFxyXG4gIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIDogdm9pZFxyXG4gIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBiYWNrVG9Mb2dpbigpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuc2VuZENsb3NlVGFiLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWxheUZpcnN0TG9nRXZlbnQoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnJlbGF5Rmlyc3RMb2cuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbGF5TG9zdFB3ZEV2ZW50KCRldmVudCA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5yZWxheUxvc3RQd2QuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbGF5U2F2ZU1mYUtleUV2ZW50KCRldmVudCA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5yZWxheVNhdmVNZmFLZXkuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbGF5U2VuZE1mYUNvZGVFdmVudCgkZXZlbnQgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMucmVsYXlTZW5kTWZhQ29kZS5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEZvcm1Db250cm9sIH0gICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3JGbiB9ICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRpb25SZXN1bHRcclxue1xyXG4gIFtrZXkgOiBzdHJpbmddIDogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFB3ZFZhbGlkYXRvclxyXG57XHJcbiAgcHVibGljIHN0YXRpYyBsb25nRW5vdWdoKG1pbiA6IG51bWJlciwgbWF4IDogbnVtYmVyKSA6IFZhbGlkYXRvckZuXHJcbiAge1xyXG4gICAgbGV0IGZ1bmMgPSAoY29udHJvbCA6IEFic3RyYWN0Q29udHJvbCkgOiB7IFtrZXkgOiBzdHJpbmddIDogYm9vbGVhbiB9IHwgbnVsbCA9PlxyXG4gICAge1xyXG4gICAgICBsZXQgaXNMb25nRW5vdWdoID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiBjb250cm9sLnZhbHVlLmxlbmd0aCA+PSBtaW4gJiYgY29udHJvbC52YWx1ZS5sZW5ndGggPD0gbWF4O1xyXG4gICAgICBpZiAoICFpc0xvbmdFbm91Z2ggKVxyXG4gICAgICAgIHJldHVybiB7IGxvbmdFbm91Z2g6IHRydWUgfTtcclxuXHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBudW1iZXIoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaGFzTnVtYmVyID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvXFxkLy50ZXN0KGNvbnRyb2wudmFsdWUpO1xyXG4gICAgaWYgKCAhaGFzTnVtYmVyIClcclxuICAgICAgcmV0dXJuIHsgbnVtYmVyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHVwcGVyKGNvbnRyb2wgOiBGb3JtQ29udHJvbCkgOiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAge1xyXG4gICAgbGV0IGhhc1VwcGVyID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvW0EtWl0vLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFoYXNVcHBlciApXHJcbiAgICAgIHJldHVybiB7IHVwcGVyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGxvd2VyKGNvbnRyb2wgOiBGb3JtQ29udHJvbCkgOiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAge1xyXG4gICAgbGV0IGhhc0xvd2VyID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvW2Etel0vLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFoYXNMb3dlciApXHJcbiAgICAgIHJldHVybiB7IGxvd2VyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNoYXIoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaGFzQ2hhciA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgL1shQCMkJV4mXFwqKClfK1xcLT1cXFtcXF17fXwnXS8udGVzdChjb250cm9sLnZhbHVlKTtcclxuICAgIGlmICggIWhhc0NoYXIgKVxyXG4gICAgICByZXR1cm4geyBjaGFyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcbiIsIi8vIEFuZ3VsYXIgbW9kdWxlc1xyXG5pbXBvcnQgeyBPbkluaXQgfSAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9uQ2hhbmdlcyB9ICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9uRGVzdHJveSB9ICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSW5wdXQgfSAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPdXRwdXQgfSAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9ICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwIH0gICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVmFsaWRhdG9ycyB9ICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbi8vIEludGVybmFsIG1vZHVsZXNcclxuaW1wb3J0IHsgUHdkVmFsaWRhdG9yIH0gIGZyb20gJy4uLy4uL3ZhbGlkYXRvcnMvcHdkLnZhbGlkYXRvcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvciAgICA6ICdjYWwtcHdkLWZvcm0nLFxyXG4gIHRlbXBsYXRlOiBgPCEtLSBOT1RFOiA8Zm9ybSBhdXRvY29tcGxldGU9XCJvZmZcIj4gd2lsbCB0dXJuIG9mZiBhdXRvY29tcGxldGUgZm9yIHRoZSBmb3JtIGluIG1vc3QgYnJvd3NlcnNcclxuICAgICBleGNlcHQgZm9yIHVzZXJuYW1lL2VtYWlsL3Bhc3N3b3JkIGZpZWxkcyAtLT5cclxuPGZvcm0gKG5nU3VibWl0KT1cInNlbmQoKVwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCI+XHJcblxyXG4gIDwhLS0gTk9URTogZmFrZSBmaWVsZHMgYXJlIGEgd29ya2Fyb3VuZCBmb3IgY2hyb21lL29wZXJhIGF1dG9maWxsIGdldHRpbmcgdGhlIHdyb25nIGZpZWxkcyAtLT5cclxuICA8aW5wdXQgaWQ9XCJ1c2VybmFtZVwiIHN0eWxlPVwiZGlzcGxheTpub25lXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiZmFrZXVzZXJuYW1lcmVtZW1iZXJlZFwiPlxyXG4gIDxpbnB1dCBpZD1cInBhc3N3b3JkXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIiB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwiZmFrZXBhc3N3b3JkcmVtZW1iZXJlZFwiPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwicm93IHctMTAwIG5vLWd1dHRlcnNcIiAqbmdJZj1cIiFpc0ZpcnN0XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XHJcbiAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cInctMTAwXCI+XHJcbiAgICAgICAgPCEtLSBOT1RFOiA8aW5wdXQgYXV0b2NvbXBsZXRlPVwibm9wZVwiPiB0dXJucyBvZmYgYXV0b2NvbXBsZXRlIG9uIG1hbnkgb3RoZXIgYnJvd3NlcnMgdGhhdCBkb24ndCByZXNwZWN0XHJcbiAgICAgICAgICB0aGUgZm9ybSdzIFwib2ZmXCIsIGJ1dCBub3QgZm9yIFwicGFzc3dvcmRcIiBpbnB1dHMuIC0tPlxyXG4gICAgICAgIDxpbnB1dCBtYXRJbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJ2ZXJpZkNvZGVcIiBcclxuICAgICAgICAgIG5hbWU9XCJ2ZXJpZi1jb2RlXCIgYXV0b2NvbXBsZXRlPVwibm9wZVwiIFxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eyBsYWJlbHMuaW5wdXQudmVyaWZDb2RlIH19XCIgXHJcbiAgICAgICAgICBwYXR0ZXJuPVwiXFxcXGR7Nn1cIiBcclxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIvPiA8IS0tIE5PVEU6IFBhdHRlcm4gbWF0Y2hlcyBhbnkgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVyIC0tPlxyXG4gICAgICAgIDxidXR0b24gKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLnZhbGlkICYmIGlucHV0cy5jbGVhckNvZGVPblB3ZEZvcm1cIiBcclxuICAgICAgICAgIG1hdC1idXR0b24gbWF0U3VmZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiQ2xlYXJcIiBcclxuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLnNldFZhbHVlKCcnKVwiIFxyXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8IS0tIE5PVEU6IEVycm9yIG1lc3NhZ2VzIC0tPlxyXG4gICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLmVycm9ycz8ucmVxdWlyZWQgJiYgZXJyb3JzLnB3ZFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5yZXF1aXJlZCB9fVxyXG4gICAgICAgIDwvbWF0LWhpbnQ+XHJcbiAgICAgICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUuZXJyb3JzPy5wYXR0ZXJuICYmIGVycm9ycy5wd2RcIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kuc2l4RGlnaXRzIH19XHJcbiAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDwhLS0gTk9URTogPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGF1dG9jb21wbGV0ZT1cIm5ldy1wYXNzd29yZFwiIHdpbGwgdHVybiBpdCBvZmYgZm9yIHBhc3N3b3JkcyBldmVyeXdoZXJlIC0tPlxyXG4gIDxkaXYgY2xhc3M9XCJyb3cgdy0xMDAgbm8tZ3V0dGVyc1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgICAgIDxpbnB1dCBtYXRJbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJuZXdQYXNzd29yZFwiIFxyXG4gICAgICAgICAgbmFtZT1cIm5ldy1wYXNzd29yZFwiIGF1dG9jb21wbGV0ZT1cIm5ldy1wYXNzd29yZFwiIFxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eyBsYWJlbHMuaW5wdXQubmV3UGFzc3dvcmQgfX1cIiBcclxuICAgICAgICAgIHR5cGU9XCJ7eyBzaG93UGFzc3dvcmQgPyAndGV4dCcgOiAncGFzc3dvcmQnIH19XCIvPlxyXG4gICAgICAgIDxidXR0b24gKm5nSWY9XCJpbnB1dHMuc2hvd1B3ZE9uUHdkRm9ybVwiIFxyXG4gICAgICAgICAgbWF0LWJ1dHRvbiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJDbGVhclwiIFxyXG4gICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cInNob3dQYXNzd29yZD0hc2hvd1Bhc3N3b3JkXCIgXHJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+XHJcbiAgICAgICAgICA8bWF0LWljb24+e3sgc2hvd1Bhc3N3b3JkID8gJ3Zpc2liaWxpdHlfb2ZmJyA6ICd2aXNpYmlsaXR5JyB9fTwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPCEtLSBOT1RFOiBFcnJvciBtZXNzYWdlIC0tPlxyXG4gICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzPy5yZXF1aXJlZCAmJiBlcnJvcnMucHdkXCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnJlcXVpcmVkIH19XHJcbiAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJyb3cgdy0xMDAgbm8tZ3V0dGVyc1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICA8dWwgY2xhc3M9XCJsaXN0LXVuc3R5bGVkIHNtYWxsXCI+XHJcbiAgICAgICAgPGxpIGNsYXNzPVwiY2hlY2stcG9saWN5XCI+XHJcbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJyZWQtcG9saWN5XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzICYmIGZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMubG9uZ0Vub3VnaFwiPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImdyZWVuLXBvbGljeVwiICpuZ0lmPVwiIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgfHwgIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMubG9uZ0Vub3VnaFwiPmNoZWNrPC9tYXQtaWNvbj5cclxuICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kucHdkTGVuZ3RoUmVwbGFjZWQgfX1cclxuICAgICAgICA8L2xpPlxyXG4gICAgICAgIDxsaSBjbGFzcz1cImNoZWNrLXBvbGljeVwiICpuZ0lmPVwicHdkUG9saWNpZXMudXBwZXJcIj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInJlZC1wb2xpY3lcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgJiYgZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycy51cHBlclwiPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImdyZWVuLXBvbGljeVwiICpuZ0lmPVwiIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgfHwgIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMudXBwZXJcIj5jaGVjazwvbWF0LWljb24+XHJcbiAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnB3ZFVwcGVyY2FzZSB9fVxyXG4gICAgICAgIDwvbGk+XHJcbiAgICAgICAgPGxpIGNsYXNzPVwiY2hlY2stcG9saWN5XCIgKm5nSWY9XCJwd2RQb2xpY2llcy5sb3dlclwiPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwicmVkLXBvbGljeVwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycyAmJiBmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzLmxvd2VyXCI+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiZ3JlZW4tcG9saWN5XCIgKm5nSWY9XCIhZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycyB8fCAhZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycy5sb3dlclwiPmNoZWNrPC9tYXQtaWNvbj5cclxuICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kucHdkTG93ZXJjYXNlIH19XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgICA8bGkgY2xhc3M9XCJjaGVjay1wb2xpY3lcIiAqbmdJZj1cInB3ZFBvbGljaWVzLm51bWJlclwiPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwicmVkLXBvbGljeVwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycyAmJiBmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzLm51bWJlclwiPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImdyZWVuLXBvbGljeVwiICpuZ0lmPVwiIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgfHwgIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMubnVtYmVyXCI+Y2hlY2s8L21hdC1pY29uPlxyXG4gICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5wd2ROdW1iZXIgfX1cclxuICAgICAgICA8L2xpPlxyXG4gICAgICAgIDxsaSBjbGFzcz1cImNoZWNrLXBvbGljeVwiICpuZ0lmPVwicHdkUG9saWNpZXMuY2hhclwiPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwicmVkLXBvbGljeVwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycyAmJiBmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzLmNoYXJcIj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJncmVlbi1wb2xpY3lcIiAqbmdJZj1cIiFmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzIHx8ICFmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzLmNoYXJcIj5jaGVjazwvbWF0LWljb24+XHJcbiAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnB3ZFNwZWNpYWwgfX1cclxuICAgICAgICA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPCEtLSBUT0RPOiBFbmFibGUgR29vZ2xlIENhcHRjaGEgLS0+XHJcbiAgPCEtLSA8ZGl2IGNsYXNzPVwicm93IHctMTAwIG5vLWd1dHRlcnNcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgPHJlLWNhcHRjaGEgc2l0ZV9rZXk9XCI2TGRCdEFrVUFBQUFBQjJfbF9UT3o3b1ptVExYYUZqUDFjeG51NHlNXCJcclxuICAgICAgICAoY2FwdGNoYVJlc3BvbnNlKT1cImhhbmRsZUNvcnJlY3RDYXB0Y2hhKCRldmVudClcIj5cclxuICAgICAgPC9yZS1jYXB0Y2hhPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+IC0tPlxyXG4gIDxkaXYgY2xhc3M9XCJwdC0wIHBiLTQgcHgtNFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInJvdyB3LTEwMCBuby1ndXR0ZXJzXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wgdGV4dC1yaWdodFwiPlxyXG4gICAgICAgIDxidXR0b24gY29sb3I9XCJwcmltYXJ5XCIgbWF0LXJhaXNlZC1idXR0b24gY2xhc3M9XCJzbWFsbCB0ZXh0LXVwcGVyY2FzZVwiIHR5cGU9XCJzdWJtaXRcIiBbZGlzYWJsZWRdPVwiIWZvcm1Hcm91cC52YWxpZFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmJ1dHRvbi5zZW5kIH19XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZm9ybT5gLFxyXG4gIHN0eWxlczogW2AuZ3JlZW4tcG9saWN5e2NvbG9yOmdyZWVufS5yZWQtcG9saWN5e2NvbG9yOnJlZH0uY2hlY2stcG9saWN5e2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXJ9LmNoZWNrLXBvbGljeSAubWF0LWljb257bWFyZ2luLXJpZ2h0OjRweDtmb250LXNpemU6MjJweDtoZWlnaHQ6MjJweDt3aWR0aDoyMnB4fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQd2RGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveVxyXG57XHJcbiAgcHVibGljICAgIGZvcm1Hcm91cCAgICA6IEZvcm1Hcm91cDtcclxuICBwdWJsaWMgICAgc2hvd1Bhc3N3b3JkIDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIC8vIHB1YmxpYyBjYXB0Y2hhVG9rZW4gOiBzdHJpbmc7IC8vIFRPRE86XHJcblxyXG4gIC8vIExhYmVsc1xyXG4gIEBJbnB1dCgpICBsYWJlbHMgICAgICAgOiBhbnk7XHJcbiAgLy8gRXJyb3JzXHJcbiAgQElucHV0KCkgIGVycm9ycyAgICAgICA6IGFueTtcclxuICAvLyBJbnB1dHNcclxuICBASW5wdXQoKSAgaW5wdXRzICAgICAgIDogYW55O1xyXG5cclxuICAvLyBGaXJzdCBjb25uZWN0aW9uIG9yIEZvcmdvdCBwYXNzd29yZFxyXG4gIEBJbnB1dCgpICBpc0ZpcnN0ICAgICAgOiBib29sZWFuO1xyXG4gIC8vIFBhc3N3b3JkIHBvbGljaWVzXHJcbiAgQElucHV0KCkgIHB3ZFBvbGljaWVzICA6IGFueTtcclxuICAvLyBFdmVudCBzZW50IHRvIHRoZSBsb2dpbiBmb3JtIGFuZCByZWxheWVkIHBhcmVudHMgKG1vZGFsICYgdGFiKVxyXG4gIEBPdXRwdXQoKSBmaXJzdENvbm5lY3Rpb24gOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgbG9zdFBhc3N3b3JkICAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yXHJcbiAgKFxyXG4gICAgcHJpdmF0ZSBidWlsZGVyIDogRm9ybUJ1aWxkZXJcclxuICApXHJcbiAge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5pbml0Rm9ybUdyb3VwcygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXMgOiBTaW1wbGVDaGFuZ2VzKSA6IHZvaWRcclxuICB7XHJcbiAgICBpZihjaGFuZ2VzLnB3ZFBvbGljaWVzKVxyXG4gICAgICB0aGlzLmluaXRGb3JtR3JvdXBzKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCkgOiB2b2lkXHJcbiAge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbmQoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZXZlbnQgOiBhbnkgPSB7fTtcclxuXHJcbiAgICBsZXQgdmVyaWZDb2RlICAgOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgbGV0IG5ld1Bhc3N3b3JkIDogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICB2ZXJpZkNvZGUgICAgICAgPSB0aGlzLmZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUudmFsdWU7XHJcbiAgICBuZXdQYXNzd29yZCAgICAgPSB0aGlzLmZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC52YWx1ZTtcclxuXHJcbiAgICBldmVudC5wYXNzd29yZCA9IG5ld1Bhc3N3b3JkO1xyXG5cclxuICAgIC8vIEZpcnN0IGNvbm5lY3Rpb25cclxuICAgIGlmKHRoaXMuaXNGaXJzdClcclxuICAgIHtcclxuICAgICAgdGhpcy5maXJzdENvbm5lY3Rpb24uZW1pdChldmVudCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBldmVudC5jb2RlID0gdmVyaWZDb2RlO1xyXG4gICAgLy8gTG9zdCBwYXNzd29yZFxyXG4gICAgdGhpcy5sb3N0UGFzc3dvcmQuZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRGb3JtR3JvdXBzKHJlZnJlc2ggOiBib29sZWFuID0gZmFsc2UpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCB2ZXJpZkNvZGUgICA6IHN0cmluZyA9IG51bGw7XHJcbiAgICBsZXQgbmV3UGFzc3dvcmQgOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIGlmKHJlZnJlc2ggJiYgdGhpcy5mb3JtR3JvdXApXHJcbiAgICB7XHJcbiAgICAgIHZlcmlmQ29kZSAgID0gdGhpcy5mb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLnZhbHVlO1xyXG4gICAgICBuZXdQYXNzd29yZCA9IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB2YWxpZGF0b3JzIDogYW55ID0gW107XHJcblxyXG4gICAgaWYodGhpcy5wd2RQb2xpY2llcy5jaGFyKVxyXG4gICAgICB2YWxpZGF0b3JzLnB1c2goUHdkVmFsaWRhdG9yLmNoYXIpO1xyXG4gICAgaWYodGhpcy5wd2RQb2xpY2llcy5udW1iZXIpXHJcbiAgICAgIHZhbGlkYXRvcnMucHVzaChQd2RWYWxpZGF0b3IubnVtYmVyKTtcclxuICAgIGlmKHRoaXMucHdkUG9saWNpZXMudXBwZXIpXHJcbiAgICAgIHZhbGlkYXRvcnMucHVzaChQd2RWYWxpZGF0b3IudXBwZXIpO1xyXG4gICAgaWYodGhpcy5wd2RQb2xpY2llcy5sb3dlcilcclxuICAgICAgdmFsaWRhdG9ycy5wdXNoKFB3ZFZhbGlkYXRvci5sb3dlcik7XHJcblxyXG4gICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xyXG4gICAgdmFsaWRhdG9ycy5wdXNoKFB3ZFZhbGlkYXRvci5sb25nRW5vdWdoKHRoaXMucHdkUG9saWNpZXMucmFuZ2UubWluLCB0aGlzLnB3ZFBvbGljaWVzLnJhbmdlLm1heCkpO1xyXG5cclxuICAgIC8vIFJlZnJlc2ggbWluIG1heCBsYWJlbFxyXG4gICAgbGV0IHJhbmdlTGFiZWwgOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcmFuZ2VMYWJlbCA9IHRoaXMubGFiZWxzLnBvbGljeS5wd2RMZW5ndGg7XHJcbiAgICByYW5nZUxhYmVsID0gcmFuZ2VMYWJlbC5yZXBsYWNlKC97e21pbn19LywgdGhpcy5wd2RQb2xpY2llcy5yYW5nZS5taW4pO1xyXG4gICAgcmFuZ2VMYWJlbCA9IHJhbmdlTGFiZWwucmVwbGFjZSgve3ttYXh9fS8sIHRoaXMucHdkUG9saWNpZXMucmFuZ2UubWF4KTtcclxuICAgIHRoaXMubGFiZWxzLnBvbGljeS5wd2RMZW5ndGhSZXBsYWNlZCA9IHJhbmdlTGFiZWw7XHJcblxyXG4gICAgdGhpcy5mb3JtR3JvdXAgPSB0aGlzLmJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICB2ZXJpZkNvZGUgICAgOiBuZXcgRm9ybUNvbnRyb2woe1xyXG4gICAgICAgIHZhbHVlICAgICAgOiB2ZXJpZkNvZGUsXHJcbiAgICAgICAgZGlzYWJsZWQgICA6IGZhbHNlXHJcbiAgICAgIH0pLFxyXG4gICAgICBuZXdQYXNzd29yZCAgOiBuZXcgRm9ybUNvbnRyb2woe1xyXG4gICAgICAgIHZhbHVlICAgICAgOiBuZXdQYXNzd29yZCxcclxuICAgICAgICBkaXNhYmxlZCAgIDogZmFsc2VcclxuICAgICAgfSwgdmFsaWRhdG9ycyksXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZighdGhpcy5pc0ZpcnN0KVxyXG4gICAgICB0aGlzLmZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUuc2V0VmFsaWRhdG9ycyhbVmFsaWRhdG9ycy5yZXF1aXJlZF0pO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8gQW5ndWxhciBtb2R1bGVzXHJcbmltcG9ydCB7IE9uSW5pdCB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT25EZXN0cm95IH0gICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElucHV0IH0gICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPdXRwdXQgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwIH0gICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciB9ICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFZhbGlkYXRvcnMgfSAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yICAgIDogJ2NhbC1tZmEtc2V0dXAtZm9ybScsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY29kZSB0ZXh0LWNlbnRlclwiPlxyXG4gIDxxcmNvZGUgW3FyZGF0YV09XCJxckNvZGVcIiBbc2l6ZV09XCIxMDBcIiBbbGV2ZWxdPVwiJ0wnXCI+PC9xcmNvZGU+XHJcbiAgPHAgY2xhc3M9XCJteS0zXCI+e3sgY29kZSB9fTwvcD5cclxuPC9kaXY+XHJcbjxmb3JtIChuZ1N1Ym1pdCk9XCJzZW5kKClcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxyXG4gIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cInctMTAwXCI+XHJcbiAgICA8aW5wdXQgbWF0SW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwidmVyaWZDb2RlXCIgXHJcbiAgICAgIG5hbWU9XCJ2ZXJpZkNvZGVcIiBwbGFjZWhvbGRlcj1cInt7IGxhYmVscy5pbnB1dC52ZXJpZkNvZGUgfX1cIiBcclxuICAgICAgcGF0dGVybj1cIlxcXFxkezZ9XCIgXHJcbiAgICAgIHR5cGU9XCJ0ZXh0XCIvPiA8IS0tIE5PVEU6IFBhdHRlcm4gbWF0Y2hlcyA2IGRpZ2l0cyAtLT5cclxuICAgIDxidXR0b24gKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLnZhbGlkICYmIGlucHV0cy5jbGVhckNvZGVPbk1mYUZvcm1cIiBcclxuICAgICAgbWF0LWJ1dHRvbiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJDbGVhclwiIFxyXG4gICAgICBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS5zZXRWYWx1ZSgnJylcIiBcclxuICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgPC9idXR0b24+XHJcbiAgICA8IS0tIE5PVEU6IEVycm9yIG1lc3NhZ2VzIC0tPlxyXG4gICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUuZXJyb3JzPy5yZXF1aXJlZCAmJiBlcnJvcnMubWZhXCI+XHJcbiAgICAgIHt7IGxhYmVscy5wb2xpY3kucmVxdWlyZWQgfX1cclxuICAgIDwvbWF0LWhpbnQ+XHJcbiAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS5lcnJvcnM/LnBhdHRlcm4gJiYgZXJyb3JzLm1mYVwiPlxyXG4gICAgICB7eyBsYWJlbHMucG9saWN5LnNpeERpZ2l0cyB9fVxyXG4gICAgPC9tYXQtaGludD5cclxuICA8L21hdC1mb3JtLWZpZWxkPlxyXG4gIDxkaXYgY2xhc3M9XCJyb3cgdy0xMDAgbm8tZ3V0dGVyc1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbCB0ZXh0LXJpZ2h0XCI+XHJcbiAgICAgIDxidXR0b24gY29sb3I9XCJwcmltYXJ5XCIgbWF0LXJhaXNlZC1idXR0b24gY2xhc3M9XCJzbWFsbCB0ZXh0LXVwcGVyY2FzZVwiIHR5cGU9XCJzdWJtaXRcIiBbZGlzYWJsZWRdPVwiIWZvcm1Hcm91cC52YWxpZFwiPlxyXG4gICAgICAgIHt7IGxhYmVscy5idXR0b24uc2F2ZSB9fVxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Zvcm0+YCxcclxuICBzdHlsZXM6IFtgLmNvZGV7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjthbGlnbi1pdGVtczpjZW50ZXJ9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1mYVNldHVwRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XHJcbntcclxuICBwdWJsaWMgICAgZm9ybUdyb3VwICAgICAgOiBGb3JtR3JvdXA7XHJcblxyXG4gIC8vIExhYmVsc1xyXG4gIEBJbnB1dCgpICBsYWJlbHMgICAgICAgICA6IGFueTtcclxuICAvLyBFcnJvcnNcclxuICBASW5wdXQoKSAgZXJyb3JzICAgICAgICAgOiBhbnk7XHJcbiAgLy8gSW5wdXRzXHJcbiAgQElucHV0KCkgIGlucHV0cyAgICAgICAgIDogYW55O1xyXG5cclxuICAvLyBNRkEgc2VjcmV0IGtleVxyXG4gIEBJbnB1dCgpICBxckNvZGUgICAgICAgICA6IHN0cmluZztcclxuICBASW5wdXQoKSAgY29kZSAgICAgICAgICAgOiBzdHJpbmc7XHJcbiAgLy8gRXZlbnQgc2VudCB0byB0aGUgbG9naW4gZm9ybSBhbmQgcmVsYXllZCBwYXJlbnRzIChtb2RhbCAmIHRhYilcclxuICBAT3V0cHV0KCkgc2F2ZU1mYSAgICAgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3JcclxuICAoXHJcbiAgICBwcml2YXRlIGJ1aWxkZXIgOiBGb3JtQnVpbGRlclxyXG4gIClcclxuICB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmluaXRGb3JtR3JvdXBzKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSA6IHZvaWRcclxuICB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VuZCgpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBldmVudCA6IGFueSA9IHt9O1xyXG5cclxuICAgIGxldCB2ZXJpZkNvZGUgOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIHZlcmlmQ29kZSA9IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS52YWx1ZTtcclxuXHJcbiAgICBldmVudC5jb2RlID0gdmVyaWZDb2RlO1xyXG5cclxuICAgIHRoaXMuc2F2ZU1mYS5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEZvcm1Hcm91cHMoKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmZvcm1Hcm91cCA9IHRoaXMuYnVpbGRlci5ncm91cCh7XHJcbiAgICAgIHZlcmlmQ29kZSA6IG5ldyBGb3JtQ29udHJvbCh7XHJcbiAgICAgICAgdmFsdWUgICAgICA6IG51bGwsXHJcbiAgICAgICAgZGlzYWJsZWQgICA6IGZhbHNlXHJcbiAgICAgIH0sIFsgVmFsaWRhdG9ycy5yZXF1aXJlZCBdKSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8gQW5ndWxhciBtb2R1bGVzXHJcbmltcG9ydCB7IE9uSW5pdCB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT25EZXN0cm95IH0gICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElucHV0IH0gICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPdXRwdXQgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwIH0gICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciB9ICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFZhbGlkYXRvcnMgfSAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yICAgIDogJ2NhbC1tZmEtZm9ybScsXHJcbiAgdGVtcGxhdGU6IGA8Zm9ybSAobmdTdWJtaXQpPVwic2VuZCgpXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIiBhdXRvY29tcGxldGU9XCJvZmZcIj5cclxuICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgPGlucHV0IG1hdElucHV0IGZvcm1Db250cm9sTmFtZT1cInZlcmlmQ29kZVwiIFxyXG4gICAgICBuYW1lPVwidmVyaWZDb2RlXCIgcGxhY2Vob2xkZXI9XCJ7eyBsYWJlbHMuaW5wdXQudmVyaWZDb2RlIH19XCIgXHJcbiAgICAgIHBhdHRlcm49XCJcXFxcZHs2fVwiIFxyXG4gICAgICB0eXBlPVwidGV4dFwiLz4gPCEtLSBOT1RFOiBQYXR0ZXJuIG1hdGNoZXMgNiBkaWdpdHMgLS0+XHJcbiAgICA8YnV0dG9uICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS52YWxpZCAmJiBpbnB1dHMuY2xlYXJDb2RlT25NZmFGb3JtXCIgXHJcbiAgICAgIG1hdC1idXR0b24gbWF0U3VmZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiQ2xlYXJcIiBcclxuICAgICAgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cImZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUuc2V0VmFsdWUoJycpXCIgXHJcbiAgICAgIHR5cGU9XCJidXR0b25cIj5cclxuICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gICAgPCEtLSBOT1RFOiBFcnJvciBtZXNzYWdlcyAtLT5cclxuICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLmVycm9ycz8ucmVxdWlyZWQgJiYgZXJyb3JzLm1mYVwiPlxyXG4gICAgICB7eyBsYWJlbHMucG9saWN5LnJlcXVpcmVkIH19XHJcbiAgICA8L21hdC1oaW50PlxyXG4gICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUuZXJyb3JzPy5wYXR0ZXJuICYmIGVycm9ycy5tZmFcIj5cclxuICAgICAge3sgbGFiZWxzLnBvbGljeS5zaXhEaWdpdHMgfX1cclxuICAgIDwvbWF0LWhpbnQ+XHJcbiAgPC9tYXQtZm9ybS1maWVsZD5cclxuICA8ZGl2IGNsYXNzPVwicm93IHctMTAwIG5vLWd1dHRlcnNcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wgdGV4dC1yaWdodFwiPlxyXG4gICAgICA8YnV0dG9uIGNvbG9yPVwicHJpbWFyeVwiIG1hdC1yYWlzZWQtYnV0dG9uIGNsYXNzPVwic21hbGwgdGV4dC11cHBlcmNhc2VcIiB0eXBlPVwic3VibWl0XCIgW2Rpc2FibGVkXT1cIiFmb3JtR3JvdXAudmFsaWRcIj5cclxuICAgICAgICB7eyBsYWJlbHMuYnV0dG9uLnNlbmQgfX1cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9mb3JtPmAsXHJcbiAgc3R5bGVzOiBbYGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZmFGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3lcclxue1xyXG4gIHB1YmxpYyAgICBmb3JtR3JvdXAgICAgOiBGb3JtR3JvdXA7XHJcblxyXG4gIC8vIExhYmVsc1xyXG4gIEBJbnB1dCgpICBsYWJlbHMgICAgICAgOiBhbnk7XHJcbiAgLy8gRXJyb3JzXHJcbiAgQElucHV0KCkgIGVycm9ycyAgICAgICA6IGFueTtcclxuICAvLyBJbnB1dHNcclxuICBASW5wdXQoKSAgaW5wdXRzICAgICAgIDogYW55O1xyXG5cclxuICAvLyBFdmVudCBzZW50IHRvIHRoZSBsb2dpbiBmb3JtIGFuZCByZWxheWVkIHBhcmVudHMgKG1vZGFsICYgdGFiKVxyXG4gIEBPdXRwdXQoKSBzZW5kTWZhICAgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3JcclxuICAoXHJcbiAgICBwcml2YXRlIGJ1aWxkZXIgOiBGb3JtQnVpbGRlclxyXG4gIClcclxuICB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmluaXRGb3JtR3JvdXBzKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSA6IHZvaWRcclxuICB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VuZCgpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBldmVudCAgICAgOiBhbnkgICAgPSB7fTtcclxuICAgIGxldCB2ZXJpZkNvZGUgOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIHZlcmlmQ29kZSAgPSB0aGlzLmZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUudmFsdWU7XHJcbiAgICBldmVudC5jb2RlID0gdmVyaWZDb2RlO1xyXG4gICAgdGhpcy5zZW5kTWZhLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0Rm9ybUdyb3VwcygpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuZm9ybUdyb3VwID0gdGhpcy5idWlsZGVyLmdyb3VwKHtcclxuICAgICAgdmVyaWZDb2RlIDogbmV3IEZvcm1Db250cm9sKHtcclxuICAgICAgICB2YWx1ZSAgICAgIDogbnVsbCxcclxuICAgICAgICBkaXNhYmxlZCAgIDogZmFsc2VcclxuICAgICAgfSwgWyBWYWxpZGF0b3JzLnJlcXVpcmVkIF0pLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyBQaXBlIH0gICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBQaXBlKHsgbmFtZTogJ2V4aXN0c0xheW91dCcgfSlcclxuZXhwb3J0IGNsYXNzIEV4aXN0c0xheW91dFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtXHJcbntcclxuICB0cmFuc2Zvcm0odmFsdWUgOiBhbnksIGxheW91dCA6IHN0cmluZylcclxuICB7XHJcbiAgICBsZXQgZXhpc3QgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBmb3IgKCBsZXQga2V5IG9mIE9iamVjdC5rZXlzKHZhbHVlKSApXHJcbiAgICAgIGlmICggdmFsdWVba2V5XSA9PT0gbGF5b3V0IClcclxuICAgICAgICBleGlzdCA9IHRydWU7XHJcblxyXG4gICAgcmV0dXJuIGV4aXN0O1xyXG4gIH1cclxufVxyXG4iLCIvLyBBbmd1bGFyIG1vZHVsZXNcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSAgICAgICAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9ICAgICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gICAgICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9ICAgICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuLy8gTWF0ZXJpYWwgbW9kdWxlc1xyXG4vLyBpbXBvcnQgeyBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdFRhYmxlTW9kdWxlIH0gICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0U29ydE1vZHVsZSB9ICAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSAgICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdENoaXBzTW9kdWxlIH0gICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0Q2hlY2tib3hNb2R1bGUgfSAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRSYWRpb01vZHVsZSB9ICAgICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdFNlbGVjdE1vZHVsZSB9ICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0U2xpZGVUb2dnbGVNb2R1bGUgfSAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRNZW51TW9kdWxlIH0gICAgICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdFNpZGVuYXZNb2R1bGUgfSAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0VG9vbGJhck1vZHVsZSB9ICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRHcmlkTGlzdE1vZHVsZSB9ICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0Q2FyZE1vZHVsZSB9ICAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gICAgICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdFByb2dyZXNzQmFyTW9kdWxlIH0gICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0TGlzdE1vZHVsZSB9ICAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBNYXRJbnB1dE1vZHVsZSB9ICAgICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdERhdGVwaWNrZXJNb2R1bGUgfSAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0TmF0aXZlRGF0ZU1vZHVsZSB9ICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBNYXRUYWJzTW9kdWxlIH0gICAgICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdEF1dG9jb21wbGV0ZU1vZHVsZSB9ICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0U3RlcHBlck1vZHVsZSB9ICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRQYWdpbmF0b3JNb2R1bGUgfSAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IE1hdERpYWxvZ01vZHVsZSB9ICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0U25hY2tCYXJNb2R1bGUgfSAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRFeHBhbnNpb25Nb2R1bGUgfSAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcblxyXG4vLyBJbnRlcm5hbCBtb2R1bGVzXHJcbmltcG9ydCB7IExvZ2luRm9ybUNvbXBvbmVudCB9ICAgICAgIGZyb20gJy4vbG9naW4tZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNb2RhbFdyYXBwZXJDb21wb25lbnQgfSAgICBmcm9tICcuL2xheW91dHMvbW9kYWwtd3JhcHBlci9tb2RhbC13cmFwcGVyLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRhYldyYXBwZXJDb21wb25lbnQgfSAgICAgIGZyb20gJy4vbGF5b3V0cy90YWItd3JhcHBlci90YWItd3JhcHBlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQd2RGb3JtQ29tcG9uZW50IH0gICAgICAgICBmcm9tICcuL2Zvcm1zL3B3ZC1mb3JtL3B3ZC1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1mYVNldHVwRm9ybUNvbXBvbmVudCB9ICAgIGZyb20gJy4vZm9ybXMvbWZhLXNldHVwLWZvcm0vbWZhLXNldHVwLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgTWZhRm9ybUNvbXBvbmVudCB9ICAgICAgICAgZnJvbSAnLi9mb3Jtcy9tZmEtZm9ybS9tZmEtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBFeGlzdHNMYXlvdXRQaXBlIH0gICAgICAgICBmcm9tICcuL3BpcGVzL2V4aXN0cy1sYXlvdXQucGlwZSc7XHJcblxyXG4vLyBFeHRlcm5hbCBtb2R1bGVzXHJcbmltcG9ydCB7IFFSQ29kZU1vZHVsZSB9ICAgICAgICAgICAgIGZyb20gJ2FuZ3VsYXJ4LXFyY29kZSc7XHJcblxyXG4vLyBOZ01vZHVsZSB0aGF0IGluY2x1ZGVzIGFsbCBNYXRlcmlhbCBtb2R1bGVzIHRoYXQgYXJlIHJlcXVpcmVkIHRvIHNlcnZlIHRoZSBhcHAuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZXhwb3J0czogW1xyXG4gICAgLy8gTWF0ZXJpYWwgbW9kdWxlc1xyXG4gICAgLy8gTWF0VGFibGVNb2R1bGUsXHJcbiAgICBNYXRCdXR0b25Nb2R1bGUsXHJcbiAgICAvLyBNYXRDaGlwc01vZHVsZSxcclxuICAgIC8vIE1hdENoZWNrYm94TW9kdWxlLFxyXG4gICAgTWF0SW5wdXRNb2R1bGUsXHJcbiAgICAvLyBNYXRSYWRpb01vZHVsZSxcclxuICAgIC8vIE1hdFNlbGVjdE1vZHVsZSxcclxuICAgIC8vIE1hdFNsaWRlVG9nZ2xlTW9kdWxlLFxyXG4gICAgLy8gTWF0TWVudU1vZHVsZSxcclxuICAgIC8vIE1hdFNpZGVuYXZNb2R1bGUsXHJcbiAgICAvLyBNYXRUb29sYmFyTW9kdWxlLFxyXG4gICAgLy8gTWF0TGlzdE1vZHVsZSxcclxuICAgIC8vIE1hdEdyaWRMaXN0TW9kdWxlLFxyXG4gICAgLy8gTWF0Q2FyZE1vZHVsZSxcclxuICAgIE1hdEljb25Nb2R1bGUsXHJcbiAgICAvLyBNYXRQcm9ncmVzc0Jhck1vZHVsZSxcclxuICAgIE1hdERpYWxvZ01vZHVsZSxcclxuICAgIC8vIE1hdFNuYWNrQmFyTW9kdWxlLFxyXG4gICAgLy8gTWF0RGF0ZXBpY2tlck1vZHVsZSxcclxuICAgIC8vIE1hdE5hdGl2ZURhdGVNb2R1bGUsXHJcbiAgICAvLyBNYXRQcm9ncmVzc1NwaW5uZXJNb2R1bGUsXHJcbiAgICAvLyBNYXREYXRlcGlja2VyTW9kdWxlLFxyXG4gICAgTWF0VGFic01vZHVsZSxcclxuICAgIC8vIE1hdEF1dG9jb21wbGV0ZU1vZHVsZSxcclxuICAgIC8vIE1hdEV4cGFuc2lvbk1vZHVsZSxcclxuICAgIC8vIE1hdFRvb2x0aXBNb2R1bGUsXHJcbiAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0ZXJpYWxNb2R1bGUge31cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogW1xyXG4gICAgQ29tbW9uTW9kdWxlLFxyXG4gICAgTWF0ZXJpYWxNb2R1bGUsXHJcbiAgICBGb3Jtc01vZHVsZSxcclxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXHJcbiAgICBRUkNvZGVNb2R1bGVcclxuICBdLFxyXG4gIGRlY2xhcmF0aW9uczogW1xyXG4gICAgTG9naW5Gb3JtQ29tcG9uZW50LFxyXG4gICAgUHdkRm9ybUNvbXBvbmVudCxcclxuICAgIE1vZGFsV3JhcHBlckNvbXBvbmVudCxcclxuICAgIFRhYldyYXBwZXJDb21wb25lbnQsXHJcbiAgICBNZmFTZXR1cEZvcm1Db21wb25lbnQsXHJcbiAgICBNZmFGb3JtQ29tcG9uZW50LFxyXG4gICAgRXhpc3RzTGF5b3V0UGlwZVxyXG4gIF0sXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgXSxcclxuICBlbnRyeUNvbXBvbmVudHM6IFsgTW9kYWxXcmFwcGVyQ29tcG9uZW50IF0sXHJcbiAgZXhwb3J0czogW1xyXG4gICAgTG9naW5Gb3JtQ29tcG9uZW50LFxyXG4gICAgUHdkRm9ybUNvbXBvbmVudCxcclxuICAgIE1vZGFsV3JhcHBlckNvbXBvbmVudCxcclxuICAgIFRhYldyYXBwZXJDb21wb25lbnQsXHJcbiAgICBNZmFTZXR1cEZvcm1Db21wb25lbnQsXHJcbiAgICBNZmFGb3JtQ29tcG9uZW50LFxyXG4gICAgRXhpc3RzTGF5b3V0UGlwZVxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2luRm9ybU1vZHVsZSB7IH1cclxuIl0sIm5hbWVzIjpbInRzbGliXzEuX192YWx1ZXMiXSwibWFwcGluZ3Mi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