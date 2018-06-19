(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/material'), require('@angular/platform-browser'), require('@angular/forms'), require('@angular/common'), require('angularx-qrcode')) :
    typeof define === 'function' && define.amd ? define('@caliatys/login-form', ['exports', '@angular/core', '@angular/material', '@angular/platform-browser', '@angular/forms', '@angular/common', 'angularx-qrcode'], factory) :
    (factory((global.caliatys = global.caliatys || {}, global.caliatys['login-form'] = {}),global.ng.core,global.ng.material,global.ng.platformBrowser,global.ng.forms,global.ng.common,null));
}(this, (function (exports,core,material,platformBrowser,forms,common,angularxQrcode) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var UsrValidator = (function () {
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
    var ModalWrapperComponent = (function () {
        function ModalWrapperComponent(dialogRef, data) {
            this.dialogRef = dialogRef;
            this.data = data;
            this.forms = Forms;
            this.relayFirstLog = new core.EventEmitter();
            this.relayLostPwd = new core.EventEmitter();
            this.relaySaveMfaKey = new core.EventEmitter();
            this.relaySendMfaCode = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'cal-modal-wrapper',
                        template: "<div class=\"header py-2 px-4\">\n  <div class=\"row align-items-center\">\n    <div class=\"col\">\n      <div *ngIf=\"!isFirst && formType === forms.PWD\">\n        <span class=\"h5 font-weight-light {{ labels.header.subtitlePwd ? 'd-block mb-0' : '' }}\">\n          {{ labels.header.titlePwd }}\n        </span>\n        <span *ngIf=\"labels.header.subtitlePwd\" class=\"d-block font-weight-light small\">\n          {{ labels.header.subtitlePwd }}\n        </span>\n      </div>\n      <div *ngIf=\"isFirst && formType === forms.PWD\">\n        <span class=\"h5 font-weight-light {{ labels.header.subtitlePwdSetup ? 'd-block mb-0' : '' }}\">\n          {{ labels.header.titlePwdSetup }}\n        </span>\n        <span *ngIf=\"labels.header.subtitlePwdSetup\" class=\"d-block font-weight-light small\">\n          {{ labels.header.subtitlePwdSetup }}\n        </span>\n      </div>\n      <div *ngIf=\"formType === forms.MFA\">\n        <span class=\"h5 font-weight-light {{ labels.header.subtitleMfa ? 'd-block mb-0' : '' }}\">\n          {{ labels.header.titleMfa }}\n        </span>\n        <span *ngIf=\"labels.header.subtitleMfa\" class=\"d-block font-weight-light small\">\n          {{ labels.header.subtitleMfa }}\n        </span>\n      </div>\n      <div *ngIf=\"formType === forms.MFA_SETUP\">\n        <span class=\"h5 font-weight-light {{ labels.header.subtitleMfaSetup ? 'd-block mb-0' : '' }}\">\n          {{ labels.header.titleMfaSetup }}\n        </span>\n        <span *ngIf=\"labels.header.subtitleMfaSetup\" class=\"d-block font-weight-light small\">\n          {{ labels.header.subtitleMfaSetup }}\n        </span>\n      </div>\n    </div>\n    <div class=\"col-2 px-0 text-right\">\n      <button mat-icon-button mat-dialog-close>\n        <mat-icon>close</mat-icon>\n      </button>\n    </div>\n  </div>\n</div>\n<mat-dialog-content class=\"py-4\">\n  <!-- NOTE: Pwd Form -->\n  <cal-pwd-form *ngIf=\"formType === forms.PWD\" \n    [isFirst]=\"isFirst\" \n    [pwdPolicies]=\"pwdPolicies\" \n    [labels]=\"labels\" \n    [inputs]=\"inputs\" \n    [errors]=\"errors\" \n    (firstConnection)=\"relayFirstLogEvent($event)\" \n    (lostPassword)=\"relayLostPwdEvent($event)\">\n  </cal-pwd-form>\n  <!-- NOTE: MFA Setup Form -->\n  <cal-mfa-setup-form *ngIf=\"formType === forms.MFA_SETUP\" \n    [qrCode]=\"qrCode\" \n    [code]  =\"code\" \n    [labels]=\"labels\" \n    [inputs]=\"inputs\" \n    [errors]=\"errors\" \n    (saveMfa)=\"relaySaveMfaKeyEvent($event)\">\n  </cal-mfa-setup-form>\n  <!-- NOTE: MFA Form -->\n  <cal-mfa-form *ngIf=\"formType === forms.MFA\" \n    [labels]=\"labels\" \n    [inputs]=\"inputs\" \n    [errors]=\"errors\" \n    (sendMfa)=\"relaySendMfaCodeEvent($event)\">\n  </cal-mfa-form>\n</mat-dialog-content>",
                        styles: [".header{color:#fff;background:#5eacff}"]
                    },] },
        ];
        /** @nocollapse */
        ModalWrapperComponent.ctorParameters = function () {
            return [
                { type: material.MatDialogRef, },
                { type: undefined, decorators: [{ type: core.Inject, args: [material.MAT_DIALOG_DATA,] },] },
            ];
        };
        return ModalWrapperComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var LoginFormComponent = (function () {
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
            this.initialized = new core.EventEmitter();
            // Event triggered after clicking on the sign up button.
            this.signUp = new core.EventEmitter();
            // Event object containing username and password properties
            this.login = new core.EventEmitter();
            // Event object containing username, password and social properties
            this.loginSocial = new core.EventEmitter();
            // Event object containing username property
            this.forgotPwd = new core.EventEmitter();
            // Event object containing password and code properties
            this.sendResetPwd = new core.EventEmitter();
            // Event object containing password property
            this.sendFirstPwd = new core.EventEmitter();
            // Event object containing code property
            this.saveMfaKey = new core.EventEmitter();
            // Event object containing code property
            this.sendMfaCode = new core.EventEmitter();
            // Event object containing username property
            this.stepUsr = new core.EventEmitter();
            // Event object containing username and password property
            this.stepPwd = new core.EventEmitter();
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
            this.closeModalEvent = new core.EventEmitter();
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
                if (userInfo === void 0) {
                    userInfo = null;
                }
                if (userImage === void 0) {
                    userImage = null;
                }
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
                if (onlyOne === void 0) {
                    onlyOne = null;
                }
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
                validators.push(forms.Validators.required);
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
                        username: new forms.FormControl({
                            value: null,
                            disabled: false
                        }, [forms.Validators.required]),
                        password: new forms.FormControl({
                            value: null,
                            disabled: false
                        }, [forms.Validators.required]),
                    });
                    return;
                }
                this.usrFormGroup = this.builder.group({
                    username: new forms.FormControl({
                        value: null,
                        disabled: false
                    }, [forms.Validators.required])
                });
                this.pwdFormGroup = this.builder.group({
                    password: new forms.FormControl({
                        value: null,
                        disabled: false
                    }, [forms.Validators.required])
                });
            };
        LoginFormComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'cal-login-form',
                        template: "<div class=\"{{ fixedWidth ? 'login-wrapper' : '' }}\" id=\"debug-login-form\">\n  <mat-tab-group id=\"caliatys-login-form\" [selectedIndex]=\"selectedTab\">\n    <mat-tab label=\"login-form\">\n      <!-- NOTE: Login form -->\n      <form (ngSubmit)=\"onClickLogin()\" [formGroup]=\"formGroup\" *ngIf=\"!googleStyle\">\n        <div class=\"row no-gutters\">\n          <div class=\"col\">\n            <div class=\"row no-gutters\">\n              <div class=\"col\">\n                <!-- NOTE: Username -->\n                <mat-form-field class=\"w-100\">\n                  <div matPrefix class=\"mr-2\" *ngIf=\"icons.iconUsrOnLoginForm\">\n                    <mat-icon class=\"align-bottom\">person</mat-icon>\n                  </div>\n                  <input matInput formControlName=\"username\" \n                    name=\"username\" autocomplete=\"username\" \n                    placeholder=\"{{ labels.input.username }}\" \n                    type=\"text\"/>\n                  <button *ngIf=\"formGroup.controls.username.value?.length > 0 && inputs.clearUsrOnLoginForm\" \n                    mat-button matSuffix mat-icon-button aria-label=\"Clear\" \n                    color=\"primary\" (click)=\"formGroup.controls.username.setValue('')\" \n                    [disabled]=\"formType === forms.MFA && formLayouts.mfa === layouts.INLINE ? true : false\" \n                    type=\"button\">\n                    <mat-icon>close</mat-icon>\n                  </button>\n                  <!-- NOTE: Error message(s) -->\n                  <mat-hint align=\"start\" *ngIf=\"formGroup.controls.username.errors?.required && errors.login\">\n                    {{ labels.policy.required }}\n                  </mat-hint>\n                  <mat-hint align=\"start\" *ngIf=\"formGroup.controls.username.errors?.pattern && errors.login && usrPolicy === userPolicies.EMAIL\">\n                    {{ labels.policy.email }}\n                  </mat-hint>\n                  <mat-hint align=\"start\" *ngIf=\"formGroup.controls.username.errors?.pattern && errors.login && usrPolicy === userPolicies.PHONE\">\n                    {{ labels.policy.phone }}\n                  </mat-hint>\n                  <mat-hint align=\"start\" *ngIf=\"formGroup.controls.username.errors?.pattern && errors.login && usrPolicy && usrPolicy !== userPolicies.EMAIL && usrPolicy !== userPolicies.PHONE\">\n                    {{ labels.policy.customRegex }}\n                  </mat-hint>\n                </mat-form-field>\n              </div>\n            </div>\n            <div class=\"row no-gutters\">\n              <div class=\"col\">\n                <!-- NOTE: Password -->\n                <mat-form-field class=\"w-100\">\n                  <div matPrefix class=\"mr-2\" *ngIf=\"icons.iconPwdOnLoginForm\">\n                    <mat-icon class=\"align-bottom\">lock</mat-icon>\n                  </div>\n                  <input matInput formControlName=\"password\" \n                    name=\"password\" autocomplete=\"password\" \n                    placeholder=\"{{ labels.input.password }}\" \n                    type=\"{{ showPassword ? 'text' : 'password' }}\"/>\n                  <button *ngIf=\"inputs.showPwdOnLoginForm\" \n                    mat-button matSuffix mat-icon-button aria-label=\"Clear\" \n                    color=\"primary\" (click)=\"showPassword=!showPassword\" \n                    [disabled]=\"formType === forms.MFA && formLayouts.mfa === layouts.INLINE ? true : false\" \n                    type=\"button\">\n                    <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>\n                  </button>\n                  <!-- NOTE: Error message -->\n                  <mat-hint align=\"start\" *ngIf=\"formGroup.controls.password.errors?.required && errors.login\">\n                    {{ labels.policy.required }}\n                  </mat-hint>\n                </mat-form-field>\n              </div> \n            </div>\n            <!-- NOTE: Buttons -->\n            <ng-container *ngIf=\"!( formType === forms.MFA && formLayouts.mfa === layouts.INLINE )\">\n              <div class=\"row no-gutters pb-3\">\n                <div class=\"col text-left\">\n                  <!-- TODO: Remember me -->\n                </div>\n                <!-- NOTE: Forgot password -->\n                <div class=\"col text-right\" *ngIf=\"buttons.forgotPassword\">\n                  <a (click)=\"onClickForgotPassword()\" href=\"#\" class=\"small\">\n                    {{ labels.button.forgotPassword }}\n                  </a>\n                </div>\n              </div>\n              <div class=\"row no-gutters pb-3\">\n                <div class=\"col text-right\">\n                  <!-- NOTE: Sign up -->\n                  <button mat-button (click)=\"onClickSignUp()\" type=\"button\" color=\"primary\" class=\"small text-uppercase mr-3\" *ngIf=\"buttons.signUp\">\n                    {{ labels.button.signUp }}\n                  </button>\n                  <!-- NOTE: Sign in -->\n                  <button mat-raised-button type=\"submit\" color=\"primary\" [disabled]=\"!formGroup.valid\" class=\"small text-uppercase\">\n                    {{ labels.button.signIn }}\n                  </button>\n                </div>\n              </div>\n            </ng-container>\n          </div>\n        </div>\n      </form>\n      <!-- NOTE: Login by steps buttons -->\n      <div class=\"row no-gutters mb-3\" *ngIf=\"googleStyle\">\n        <div class=\"col text-right\" *ngIf=\"buttons.signUp\">\n          <!-- NOTE: Sign up -->\n          <button mat-button (click)=\"onClickSignUp()\" type=\"button\" color=\"primary\" class=\"small text-uppercase mr-2\">\n            {{ labels.button.signUp }}\n          </button>\n        </div>\n        <div class=\"col {{ buttons.signUp ? 'text-left' : 'text-center'}}\">\n          <!-- NOTE: Sign in -->\n          <button mat-raised-button (click)=\"onClickNextStep(0)\" type=\"button\" color=\"primary\" class=\"small text-uppercase ml-2\">\n            {{ labels.button.signIn }}\n          </button>\n        </div>\n      </div>\n      <!-- NOTE: Social buttons -->\n      <ng-container *ngIf=\"!( formType === forms.MFA && formLayouts.mfa === layouts.INLINE )\">\n        <div class=\"row no-gutters\">\n          <div class=\"col text-center\">\n            <!-- NOTE: Google -->\n            <div class=\"d-block mb-3\" *ngIf=\"buttons.google\">\n              <button mat-raised-button type=\"button\" class=\"mat-raised-button cal-btn google {{ theme }}\" (click)=\"onClickLoginSocial('google')\">\n                <span class=\"cal-bg-icon\">\n                  <mat-icon class=\"align-middle cal-icon\" svgIcon=\"google\"></mat-icon>\n                </span>\n                <span class=\"cal-label\">{{ labels.button.googleSignIn }}</span>\n              </button>\n            </div>\n            <!-- NOTE: Facebook -->\n            <div class=\"d-block mb-3\" *ngIf=\"buttons.facebook\">\n              <button mat-raised-button type=\"button\" class=\"cal-btn facebook\" (click)=\"onClickLoginSocial('facebook')\">\n                <span class=\"cal-bg-icon\">\n                  <mat-icon class=\"align-middle cal-icon\" svgIcon=\"facebook\"></mat-icon>\n                </span>\n                <span class=\"cal-label\">{{ labels.button.facebookSignIn }}</span>\n              </button>\n            </div>\n          </div>\n        </div>\n      </ng-container>\n      <!-- NOTE: Inline MFA -->\n      <ng-container *ngIf=\"formType === forms.MFA && formLayouts.mfa === layouts.INLINE\">\n        <div class=\"row no-gutters\">\n          <div class=\"col\">\n            <cal-mfa-form \n              [inputs]=\"inputs\" \n              [labels]=\"labels\" \n              [errors]=\"errors\" \n              (sendMfa)=\"tabSendMfaCode($event)\">\n            </cal-mfa-form>\n          </div>\n        </div>\n      </ng-container>\n    </mat-tab>\n    <mat-tab label=\"usr-step\" *ngIf=\"googleStyle\">\n      <!-- NOTE: Back button -->\n      <div class=\"row no-gutters mb-3\">\n        <div class=\"col\">\n          <a href=\"#\" (click)=\"onClickPrevStep(1)\" title=\"{{ labels.button.back }}\">\n            <mat-icon class=\"align-bottom mr-2\">keyboard_arrow_left</mat-icon>{{ labels.button.back }}\n          </a>\n        </div>\n      </div>\n      <form (ngSubmit)=\"onClickNextStep(1)\" [formGroup]=\"usrFormGroup\">\n        <!-- NOTE: Username -->\n        <mat-form-field class=\"w-100\">\n          <div matPrefix class=\"mr-2\" *ngIf=\"icons.iconUsrOnLoginForm\">\n            <mat-icon class=\"align-bottom\">person</mat-icon>\n          </div>\n          <input matInput formControlName=\"username\" \n            name=\"username\" autocomplete=\"username\" \n            placeholder=\"{{ labels.input.username }}\" \n            type=\"text\"/>\n          <button *ngIf=\"usrFormGroup.controls.username.value?.length > 0 && inputs.clearUsrOnLoginForm\" \n            mat-button matSuffix mat-icon-button aria-label=\"Clear\" \n            color=\"primary\" (click)=\"usrFormGroup.controls.username.setValue('')\" \n            [disabled]=\"formType === forms.MFA && formLayouts.mfa === layouts.INLINE ? true : false\" \n            type=\"button\">\n            <mat-icon>close</mat-icon>\n          </button>\n          <!-- NOTE: Error message(s) -->\n          <mat-hint align=\"start\" *ngIf=\"usrFormGroup.controls.username.errors?.required && errors.login\">\n            {{ labels.policy.required }}\n          </mat-hint>\n          <mat-hint align=\"start\" *ngIf=\"usrFormGroup.controls.username.errors?.pattern && errors.login && usrPolicy === userPolicies.EMAIL\">\n            {{ labels.policy.email }}\n          </mat-hint>\n          <mat-hint align=\"start\" *ngIf=\"usrFormGroup.controls.username.errors?.pattern && errors.login && usrPolicy === userPolicies.PHONE\">\n            {{ labels.policy.phone }}\n          </mat-hint>\n          <mat-hint align=\"start\" *ngIf=\"usrFormGroup.controls.username.errors?.pattern && errors.login && usrPolicy && usrPolicy !== userPolicies.EMAIL && usrPolicy !== userPolicies.PHONE\">\n            {{ labels.policy.customRegex }}\n          </mat-hint>\n        </mat-form-field>\n        <div class=\"row no-gutters mb-3\">\n          <!-- NOTE: Forgot password -->\n          <div class=\"col text-left\" *ngIf=\"buttons.forgotPassword\">\n            <a (click)=\"onClickForgotPassword()\" href=\"#\" class=\"small\">\n              {{ labels.button.forgotPassword }}\n            </a>\n          </div>\n          <!-- NOTE: Next button -->\n          <div class=\"col text-right\">\n            <button mat-raised-button type=\"submit\" color=\"primary\" [disabled]=\"!usrFormGroup.valid\" class=\"small text-uppercase\">\n              {{ labels.button.next }}\n            </button>\n          </div>\n        </div>\n      </form>\n    </mat-tab>\n    <mat-tab label=\"pwd-step\" *ngIf=\"googleStyle\">\n      <!-- NOTE: Back button -->\n      <div class=\"row no-gutters mb-3\">\n        <div class=\"col\">\n          <a href=\"#\" (click)=\"onClickPrevStep(2)\" title=\"{{ labels.button.back }}\">\n            <mat-icon class=\"align-bottom mr-2\">keyboard_arrow_left</mat-icon>{{ labels.button.back }}\n          </a>\n        </div>\n      </div>\n      <!-- TODO: User info -->\n      <p>{{ userInfo }}</p>\n      <form (ngSubmit)=\"onClickNextStep(2)\" [formGroup]=\"pwdFormGroup\">\n        <!-- NOTE: Password -->\n        <mat-form-field class=\"w-100\">\n          <div matPrefix class=\"mr-2\" *ngIf=\"icons.iconPwdOnLoginForm\">\n            <mat-icon class=\"align-bottom\">lock</mat-icon>\n          </div>\n          <input matInput formControlName=\"password\" \n            name=\"password\" autocomplete=\"password\" \n            placeholder=\"{{ labels.input.password }}\" \n            type=\"{{ showPassword ? 'text' : 'password' }}\"/>\n          <button *ngIf=\"inputs.showPwdOnLoginForm\" \n            mat-button matSuffix mat-icon-button aria-label=\"Clear\" \n            color=\"primary\" (click)=\"showPassword=!showPassword\" \n            [disabled]=\"formType === forms.MFA && formLayouts.mfa === layouts.INLINE ? true : false\" \n            type=\"button\">\n            <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>\n          </button>\n          <!-- NOTE: Error message -->\n          <mat-hint align=\"start\" *ngIf=\"pwdFormGroup.controls.password.errors?.required && errors.login\">\n            {{ labels.policy.required }}\n          </mat-hint>\n        </mat-form-field>\n        <!-- NOTE: Next button -->\n        <div class=\"row no-gutters mb-3\">\n          <div class=\"col text-right\">\n            <button mat-raised-button type=\"submit\" color=\"primary\" [disabled]=\"!pwdFormGroup.valid\" class=\"small text-uppercase\">\n              {{ labels.button.next }}\n            </button>\n          </div>\n        </div>\n      </form>\n    </mat-tab>\n    <mat-tab label=\"tab-wrapper\" *ngIf=\"(formLayouts | existsLayout: layouts.TAB)\">\n      <!-- NOTE: Tab form -->\n      <cal-tab-wrapper \n        [formType]=\"formType\" \n        [isFirst]=\"isFirst\" \n        [code]   =\"code\" \n        [qrCode] =\"qrCode\" \n        [pwdPolicies]=\"pwdPolicies\" \n        [errors]=\"errors\" \n        [labels]=\"labels\" \n        [inputs]=\"inputs\" \n        (sendCloseTab)=\"onClickCloseTab($event)\" \n        (relayFirstLog)=\"tabFirstLog($event)\" \n        (relayLostPwd)=\"tabLostPwd($event)\" \n        (relaySaveMfaKey)=\"tabSaveMfaKey($event)\" \n        (relaySendMfaCode)=\"tabSendMfaCode($event)\">\n      </cal-tab-wrapper>\n    </mat-tab>\n  </mat-tab-group>\n</div>",
                        styles: ["/deep/ #caliatys-login-form mat-tab-header{display:none!important}mat-form-field mat-icon{color:grey}.login-wrapper{width:100%;max-width:330px;padding:15px;margin:0 auto}.cal-btn{line-height:35px;border:0!important;padding:1px!important}.cal-btn .cal-bg-icon{padding:8px;width:34px;height:34px;display:inline-block;vertical-align:top!important}.cal-btn .cal-bg-icon .cal-icon{display:inline-block;height:18px;width:18px;margin-top:-4px;vertical-align:top!important}.cal-btn .cal-label{padding-right:8px;padding-left:16px;size:14px;font-family:Roboto,sans-serif}.adn{background-color:#d87a68!important;color:#fff!important}.adn i{color:#fff!important}.adn:hover{background-color:#e29e91!important}.bitbucket{background-color:#205081!important;color:#fff!important}.bitbucket i{color:#fff!important}.bitbucket:hover{background-color:#2a69aa!important}.dropbox{background-color:#1087dd!important;color:#fff!important}.dropbox i{color:#fff!important}.dropbox:hover{background-color:#309ff0!important}.facebook{background-color:#3b5998!important;color:#fff!important}.facebook i{color:#fff!important}.facebook:hover{background-color:#4c70ba!important}.flickr{background-color:#ff0084!important;color:#fff!important}.flickr i{color:#fff!important}.flickr:hover{background-color:#ff339d!important}.foursquare{background-color:#f94877!important;color:#fff!important}.foursquare i{color:#fff!important}.foursquare:hover{background-color:#fb799c!important}.github{background-color:#444!important;color:#fff!important}.github i{color:#fff!important}.github:hover{background-color:#5e5e5e!important}.instagram{background-color:#405de6!important;color:#fff!important}.instagram i{color:#fff!important}.instagram:hover{background-color:#6d83ec!important}.linkedin{background-color:#007bb6!important;color:#fff!important}.linkedin i{color:#fff!important}.linkedin:hover{background-color:#009de9!important}.microsoft{background-color:#2672ec!important;color:#fff!important}.microsoft i{color:#fff!important}.microsoft:hover{background-color:#5590f0!important}.windows{background-color:#2672ec!important;color:#fff!important}.windows i{color:#fff!important}.windows:hover{background-color:#5590f0!important}.odnoklassniki{background-color:#f4731c!important;color:#fff!important}.odnoklassniki i{color:#fff!important}.odnoklassniki:hover{background-color:#f6914d!important}.openid{background-color:#f7931e!important;color:#fff!important}.openid i{color:#fff!important}.openid:hover{background-color:#f9ab4f!important}.pinterest{background-color:#cb2027!important;color:#fff!important}.pinterest i{color:#fff!important}.pinterest:hover{background-color:#e03e44!important}.reddit{background-color:#eff7ff!important;color:#000!important}.reddit i{color:#000!important}.reddit:hover{background-color:#fff!important}.soundcloud{background-color:#f50!important;color:#fff!important}.soundcloud i{color:#fff!important}.soundcloud:hover{background-color:#f73!important}.tumblr{background-color:#2c4762!important;color:#fff!important}.tumblr i{color:#fff!important}.tumblr:hover{background-color:#3c6185!important}.twitter{background-color:#55acee!important;color:#fff!important}.twitter i{color:#fff!important}.twitter:hover{background-color:#83c3f3!important}.vimeo{background-color:#1ab7ea!important;color:#fff!important}.vimeo i{color:#fff!important}.vimeo:hover{background-color:#49c6ee!important}.vk{background-color:#587ea3!important;color:#fff!important}.vk i{color:#fff!important}.vk:hover{background-color:#7897b6!important}.yahoo{background-color:#720e9e!important;color:#fff!important}.yahoo i{color:#fff!important}.yahoo:hover{background-color:#9412cd!important}.google.light{background-color:#fff!important;color:#5f6368!important}.google.light i{color:#5f6368!important}.google.light:hover{background-color:#fff!important}.google.dark{background-color:#4285f4!important;color:#fff!important}.google.dark i{color:#fff!important}.google.dark:hover{background-color:#72a4f7!important}.google.dark .cal-bg-icon{background:#fff}"]
                    },] },
        ];
        /** @nocollapse */
        LoginFormComponent.ctorParameters = function () {
            return [
                { type: material.MatDialog, },
                { type: platformBrowser.DomSanitizer, },
                { type: material.MatIconRegistry, },
                { type: forms.FormBuilder, },
            ];
        };
        LoginFormComponent.propDecorators = {
            "fixedWidth": [{ type: core.Input },],
            "googleStyle": [{ type: core.Input },],
            "googleTheme": [{ type: core.Input },],
            "customFormLayouts": [{ type: core.Input },],
            "customUsrPolicy": [{ type: core.Input },],
            "customPwdPolicies": [{ type: core.Input },],
            "customIcons": [{ type: core.Input },],
            "customButtons": [{ type: core.Input },],
            "customInputs": [{ type: core.Input },],
            "customErrors": [{ type: core.Input },],
            "customLabels": [{ type: core.Input },],
            "initialized": [{ type: core.Output },],
            "signUp": [{ type: core.Output },],
            "login": [{ type: core.Output },],
            "loginSocial": [{ type: core.Output },],
            "forgotPwd": [{ type: core.Output },],
            "sendResetPwd": [{ type: core.Output },],
            "sendFirstPwd": [{ type: core.Output },],
            "saveMfaKey": [{ type: core.Output },],
            "sendMfaCode": [{ type: core.Output },],
            "stepUsr": [{ type: core.Output },],
            "stepPwd": [{ type: core.Output },],
        };
        return LoginFormComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var TabWrapperComponent = (function () {
        function TabWrapperComponent() {
            this.forms = Forms;
            // Event sent from tab
            this.sendCloseTab = new core.EventEmitter();
            // Event sent from password form
            this.relayFirstLog = new core.EventEmitter();
            this.relayLostPwd = new core.EventEmitter();
            // Event sent from mfa setup form
            this.relaySaveMfaKey = new core.EventEmitter();
            // NOTE: MFA
            // Event sent from mfa form
            this.relaySendMfaCode = new core.EventEmitter();
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
            { type: core.Component, args: [{
                        selector: 'cal-tab-wrapper',
                        template: "<div class=\"header py-2 px-4 mb-3\">\n  <div class=\"row align-items-center\">\n    <div class=\"col-2 px-0 text-left\">\n      <button mat-icon-button (click)=\"backToLogin()\">\n        <mat-icon>arrow_back</mat-icon>\n      </button>\n    </div>\n    <div class=\"col text-right\">\n      <div *ngIf=\"!isFirst && formType === forms.PWD\">\n        <span class=\"h5 font-weight-light {{ labels.header.subtitlePwd ? 'd-block mb-0' : '' }}\">\n          {{ labels.header.titlePwd }}\n        </span>\n        <span *ngIf=\"labels.header.subtitlePwd\" class=\"d-block font-weight-light small\">\n          {{ labels.header.subtitlePwd }}\n        </span>\n      </div>\n      <div *ngIf=\"isFirst && formType === forms.PWD\">\n        <span class=\"h5 font-weight-light {{ labels.header.subtitlePwdSetup ? 'd-block mb-0' : '' }}\">\n          {{ labels.header.titlePwdSetup }}\n        </span>\n        <span *ngIf=\"labels.header.subtitlePwdSetup\" class=\"d-block font-weight-light small\">\n          {{ labels.header.subtitlePwdSetup }}\n        </span>\n      </div>\n      <div *ngIf=\"formType === forms.MFA\">\n        <span class=\"h5 font-weight-light {{ labels.header.subtitleMfa ? 'd-block mb-0' : '' }}\">\n          {{ labels.header.titleMfa }}\n        </span>\n        <span *ngIf=\"labels.header.subtitleMfa\" class=\"d-block font-weight-light small\">\n          {{ labels.header.subtitleMfa }}\n        </span>\n      </div>\n      <div *ngIf=\"formType === forms.MFA_SETUP\">\n        <span class=\"h5 font-weight-light {{ labels.header.subtitleMfaSetup ? 'd-block mb-0' : '' }}\">\n          {{ labels.header.titleMfaSetup }}\n        </span>\n        <span *ngIf=\"labels.header.subtitleMfaSetup\" class=\"d-block font-weight-light small\">\n          {{ labels.header.subtitleMfaSetup }}\n        </span>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- NOTE: Pwd Form -->\n<cal-pwd-form *ngIf=\"formType === forms.PWD\" \n  [isFirst]=\"isFirst\" \n  [pwdPolicies]=\"pwdPolicies\" \n  [labels]=\"labels\" \n  [inputs]=\"inputs\" \n  [errors]=\"errors\" \n  (firstConnection)=\"relayFirstLogEvent($event)\" \n  (lostPassword)=\"relayLostPwdEvent($event)\">\n</cal-pwd-form>\n<!-- NOTE: MFA Setup Form -->\n<cal-mfa-setup-form *ngIf=\"formType === forms.MFA_SETUP\" \n  [qrCode]=\"qrCode\" \n  [code]  =\"code\" \n  [labels]=\"labels\" \n  [inputs]=\"inputs\" \n  [errors]=\"errors\" \n  (saveMfa)=\"relaySaveMfaKeyEvent($event)\">\n</cal-mfa-setup-form>\n<!-- NOTE: MFA Form -->\n<cal-mfa-form *ngIf=\"formType === forms.MFA\" \n  [labels]=\"labels\" \n  [inputs]=\"inputs\" \n  [errors]=\"errors\" \n  (sendMfa)=\"relaySendMfaCodeEvent($event)\">\n</cal-mfa-form>",
                        styles: [".header{color:#fff;background:#5eacff}"]
                    },] },
        ];
        /** @nocollapse */
        TabWrapperComponent.ctorParameters = function () { return []; };
        TabWrapperComponent.propDecorators = {
            "formType": [{ type: core.Input },],
            "labels": [{ type: core.Input },],
            "errors": [{ type: core.Input },],
            "inputs": [{ type: core.Input },],
            "sendCloseTab": [{ type: core.Output },],
            "isFirst": [{ type: core.Input },],
            "pwdPolicies": [{ type: core.Input },],
            "relayFirstLog": [{ type: core.Output },],
            "relayLostPwd": [{ type: core.Output },],
            "code": [{ type: core.Input },],
            "qrCode": [{ type: core.Input },],
            "relaySaveMfaKey": [{ type: core.Output },],
            "relaySendMfaCode": [{ type: core.Output },],
        };
        return TabWrapperComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var PwdValidator = (function () {
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
    var PwdFormComponent = (function () {
        function PwdFormComponent(builder) {
            this.builder = builder;
            this.showPassword = false;
            // Event sent to the login form and relayed parents (modal & tab)
            this.firstConnection = new core.EventEmitter();
            this.lostPassword = new core.EventEmitter();
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
                if (refresh === void 0) {
                    refresh = false;
                }
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
                validators.push(forms.Validators.required);
                validators.push(PwdValidator.longEnough(this.pwdPolicies.range.min, this.pwdPolicies.range.max));
                // Refresh min max label
                var /** @type {?} */ rangeLabel = null;
                rangeLabel = this.labels.policy.pwdLength;
                rangeLabel = rangeLabel.replace(/{{min}}/, this.pwdPolicies.range.min);
                rangeLabel = rangeLabel.replace(/{{max}}/, this.pwdPolicies.range.max);
                this.labels.policy.pwdLengthReplaced = rangeLabel;
                this.formGroup = this.builder.group({
                    verifCode: new forms.FormControl({
                        value: verifCode,
                        disabled: false
                    }),
                    newPassword: new forms.FormControl({
                        value: newPassword,
                        disabled: false
                    }, validators),
                });
                if (!this.isFirst)
                    this.formGroup.controls["verifCode"].setValidators([forms.Validators.required]);
            };
        PwdFormComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'cal-pwd-form',
                        template: "<!-- NOTE: <form autocomplete=\"off\"> will turn off autocomplete for the form in most browsers\n     except for username/email/password fields -->\n<form (ngSubmit)=\"send()\" [formGroup]=\"formGroup\" autocomplete=\"off\">\n\n  <!-- NOTE: fake fields are a workaround for chrome/opera autofill getting the wrong fields -->\n  <input id=\"username\" style=\"display:none\" type=\"text\" name=\"fakeusernameremembered\">\n  <input id=\"password\" style=\"display:none\" type=\"password\" name=\"fakepasswordremembered\">\n\n  <div class=\"row w-100 no-gutters\" *ngIf=\"!isFirst\">\n    <div class=\"col\">\n      <mat-form-field class=\"w-100\">\n        <!-- NOTE: <input autocomplete=\"nope\"> turns off autocomplete on many other browsers that don't respect\n          the form's \"off\", but not for \"password\" inputs. -->\n        <input matInput formControlName=\"verifCode\" \n          name=\"verif-code\" autocomplete=\"nope\" \n          placeholder=\"{{ labels.input.verifCode }}\" \n          pattern=\"\\d{6}\" \n          type=\"text\"/> <!-- NOTE: Pattern matches any non-whitespace character -->\n        <button *ngIf=\"formGroup.controls.verifCode.valid && inputs.clearCodeOnPwdForm\" \n          mat-button matSuffix mat-icon-button aria-label=\"Clear\" \n          color=\"primary\" (click)=\"formGroup.controls.verifCode.setValue('')\" \n          type=\"button\">\n          <mat-icon>close</mat-icon>\n        </button>\n        <!-- NOTE: Error messages -->\n        <mat-hint align=\"start\" *ngIf=\"formGroup.controls.verifCode.errors?.required && errors.pwd\">\n          {{ labels.policy.required }}\n        </mat-hint>\n        <mat-hint align=\"start\" *ngIf=\"formGroup.controls.verifCode.errors?.pattern && errors.pwd\">\n          {{ labels.policy.sixDigits }}\n        </mat-hint>\n      </mat-form-field>\n    </div>\n  </div>\n  <!-- NOTE: <input type=\"password\" autocomplete=\"new-password\" will turn it off for passwords everywhere -->\n  <div class=\"row w-100 no-gutters\">\n    <div class=\"col\">\n      <mat-form-field class=\"w-100\">\n        <input matInput formControlName=\"newPassword\" \n          name=\"new-password\" autocomplete=\"new-password\" \n          placeholder=\"{{ labels.input.newPassword }}\" \n          type=\"{{ showPassword ? 'text' : 'password' }}\"/>\n        <button *ngIf=\"inputs.showPwdOnPwdForm\" \n          mat-button matSuffix mat-icon-button aria-label=\"Clear\" \n          color=\"primary\" (click)=\"showPassword=!showPassword\" \n          type=\"button\">\n          <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>\n        </button>\n        <!-- NOTE: Error message -->\n        <mat-hint align=\"start\" *ngIf=\"formGroup.controls.newPassword.errors?.required && errors.pwd\">\n          {{ labels.policy.required }}\n        </mat-hint>\n      </mat-form-field>\n    </div>\n  </div>\n  <div class=\"row w-100 no-gutters\">\n    <div class=\"col\">\n      <ul class=\"list-unstyled small\">\n        <li class=\"check-policy\">\n          <mat-icon class=\"red-policy\" *ngIf=\"formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.longEnough\">close</mat-icon>\n          <mat-icon class=\"green-policy\" *ngIf=\"!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.longEnough\">check</mat-icon>\n          {{ labels.policy.pwdLengthReplaced }}\n        </li>\n        <li class=\"check-policy\" *ngIf=\"pwdPolicies.upper\">\n          <mat-icon class=\"red-policy\" *ngIf=\"formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.upper\">close</mat-icon>\n          <mat-icon class=\"green-policy\" *ngIf=\"!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.upper\">check</mat-icon>\n          {{ labels.policy.pwdUppercase }}\n        </li>\n        <li class=\"check-policy\" *ngIf=\"pwdPolicies.lower\">\n          <mat-icon class=\"red-policy\" *ngIf=\"formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.lower\">close</mat-icon>\n          <mat-icon class=\"green-policy\" *ngIf=\"!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.lower\">check</mat-icon>\n          {{ labels.policy.pwdLowercase }}\n        </li>\n        <li class=\"check-policy\" *ngIf=\"pwdPolicies.number\">\n          <mat-icon class=\"red-policy\" *ngIf=\"formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.number\">close</mat-icon>\n          <mat-icon class=\"green-policy\" *ngIf=\"!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.number\">check</mat-icon>\n          {{ labels.policy.pwdNumber }}\n        </li>\n        <li class=\"check-policy\" *ngIf=\"pwdPolicies.char\">\n          <mat-icon class=\"red-policy\" *ngIf=\"formGroup.controls.newPassword.errors && formGroup.controls.newPassword.errors.char\">close</mat-icon>\n          <mat-icon class=\"green-policy\" *ngIf=\"!formGroup.controls.newPassword.errors || !formGroup.controls.newPassword.errors.char\">check</mat-icon>\n          {{ labels.policy.pwdSpecial }}\n        </li>\n      </ul>\n    </div>\n  </div>\n  <!-- TODO: Enable Google Captcha -->\n  <!-- <div class=\"row w-100 no-gutters\">\n    <div class=\"col\">\n      <re-captcha site_key=\"6LdBtAkUAAAAAB2_l_TOz7oZmTLXaFjP1cxnu4yM\"\n        (captchaResponse)=\"handleCorrectCaptcha($event)\">\n      </re-captcha>\n    </div>\n  </div> -->\n  <div class=\"pt-0 pb-4 px-4\">\n    <div class=\"row w-100 no-gutters\">\n      <div class=\"col text-right\">\n        <button color=\"primary\" mat-raised-button class=\"small text-uppercase\" type=\"submit\" [disabled]=\"!formGroup.valid\">\n          {{ labels.button.send }}\n        </button>\n      </div>\n    </div>\n  </div>\n</form>",
                        styles: [".green-policy{color:green}.red-policy{color:red}.check-policy{display:flex;align-items:center}.check-policy .mat-icon{margin-right:4px;font-size:22px;height:22px;width:22px}"]
                    },] },
        ];
        /** @nocollapse */
        PwdFormComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder, },
            ];
        };
        PwdFormComponent.propDecorators = {
            "labels": [{ type: core.Input },],
            "errors": [{ type: core.Input },],
            "inputs": [{ type: core.Input },],
            "isFirst": [{ type: core.Input },],
            "pwdPolicies": [{ type: core.Input },],
            "firstConnection": [{ type: core.Output },],
            "lostPassword": [{ type: core.Output },],
        };
        return PwdFormComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var MfaSetupFormComponent = (function () {
        function MfaSetupFormComponent(builder) {
            this.builder = builder;
            // Event sent to the login form and relayed parents (modal & tab)
            this.saveMfa = new core.EventEmitter();
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
                    verifCode: new forms.FormControl({
                        value: null,
                        disabled: false
                    }, [forms.Validators.required]),
                });
            };
        MfaSetupFormComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'cal-mfa-setup-form',
                        template: "<div class=\"code text-center\">\n  <qrcode [qrdata]=\"qrCode\" [size]=\"100\" [level]=\"'L'\"></qrcode>\n  <p class=\"my-3\">{{ code }}</p>\n</div>\n<form (ngSubmit)=\"send()\" [formGroup]=\"formGroup\" autocomplete=\"off\">\n  <mat-form-field class=\"w-100\">\n    <input matInput formControlName=\"verifCode\" \n      name=\"verifCode\" placeholder=\"{{ labels.input.verifCode }}\" \n      pattern=\"\\d{6}\" \n      type=\"text\"/> <!-- NOTE: Pattern matches 6 digits -->\n    <button *ngIf=\"formGroup.controls.verifCode.valid && inputs.clearCodeOnMfaForm\" \n      mat-button matSuffix mat-icon-button aria-label=\"Clear\" \n      color=\"primary\" (click)=\"formGroup.controls.verifCode.setValue('')\" \n      type=\"button\">\n      <mat-icon>close</mat-icon>\n    </button>\n    <!-- NOTE: Error messages -->\n    <mat-hint align=\"start\" *ngIf=\"formGroup.controls.verifCode.errors?.required && errors.mfa\">\n      {{ labels.policy.required }}\n    </mat-hint>\n    <mat-hint align=\"start\" *ngIf=\"formGroup.controls.verifCode.errors?.pattern && errors.mfa\">\n      {{ labels.policy.sixDigits }}\n    </mat-hint>\n  </mat-form-field>\n  <div class=\"row w-100 no-gutters\">\n    <div class=\"col text-right\">\n      <button color=\"primary\" mat-raised-button class=\"small text-uppercase\" type=\"submit\" [disabled]=\"!formGroup.valid\">\n        {{ labels.button.save }}\n      </button>\n    </div>\n  </div>\n</form>",
                        styles: [".code{display:flex;flex-direction:column;align-items:center}"]
                    },] },
        ];
        /** @nocollapse */
        MfaSetupFormComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder, },
            ];
        };
        MfaSetupFormComponent.propDecorators = {
            "labels": [{ type: core.Input },],
            "errors": [{ type: core.Input },],
            "inputs": [{ type: core.Input },],
            "qrCode": [{ type: core.Input },],
            "code": [{ type: core.Input },],
            "saveMfa": [{ type: core.Output },],
        };
        return MfaSetupFormComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var MfaFormComponent = (function () {
        function MfaFormComponent(builder) {
            this.builder = builder;
            // Event sent to the login form and relayed parents (modal & tab)
            this.sendMfa = new core.EventEmitter();
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
                    verifCode: new forms.FormControl({
                        value: null,
                        disabled: false
                    }, [forms.Validators.required]),
                });
            };
        MfaFormComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'cal-mfa-form',
                        template: "<form (ngSubmit)=\"send()\" [formGroup]=\"formGroup\" autocomplete=\"off\">\n  <mat-form-field class=\"w-100\">\n    <input matInput formControlName=\"verifCode\" \n      name=\"verifCode\" placeholder=\"{{ labels.input.verifCode }}\" \n      pattern=\"\\d{6}\" \n      type=\"text\"/> <!-- NOTE: Pattern matches 6 digits -->\n    <button *ngIf=\"formGroup.controls.verifCode.valid && inputs.clearCodeOnMfaForm\" \n      mat-button matSuffix mat-icon-button aria-label=\"Clear\" \n      color=\"primary\" (click)=\"formGroup.controls.verifCode.setValue('')\" \n      type=\"button\">\n      <mat-icon>close</mat-icon>\n    </button>\n    <!-- NOTE: Error messages -->\n    <mat-hint align=\"start\" *ngIf=\"formGroup.controls.verifCode.errors?.required && errors.mfa\">\n      {{ labels.policy.required }}\n    </mat-hint>\n    <mat-hint align=\"start\" *ngIf=\"formGroup.controls.verifCode.errors?.pattern && errors.mfa\">\n      {{ labels.policy.sixDigits }}\n    </mat-hint>\n  </mat-form-field>\n  <div class=\"row w-100 no-gutters\">\n    <div class=\"col text-right\">\n      <button color=\"primary\" mat-raised-button class=\"small text-uppercase\" type=\"submit\" [disabled]=\"!formGroup.valid\">\n        {{ labels.button.send }}\n      </button>\n    </div>\n  </div>\n</form>",
                        styles: [""]
                    },] },
        ];
        /** @nocollapse */
        MfaFormComponent.ctorParameters = function () {
            return [
                { type: forms.FormBuilder, },
            ];
        };
        MfaFormComponent.propDecorators = {
            "labels": [{ type: core.Input },],
            "errors": [{ type: core.Input },],
            "inputs": [{ type: core.Input },],
            "sendMfa": [{ type: core.Output },],
        };
        return MfaFormComponent;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ExistsLayoutPipe = (function () {
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
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return))
                            _c.call(_a);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                return exist;
                var e_1, _c;
            };
        ExistsLayoutPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'existsLayout' },] },
        ];
        return ExistsLayoutPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var MaterialModule = (function () {
        function MaterialModule() {
        }
        MaterialModule.decorators = [
            { type: core.NgModule, args: [{
                        exports: [
                            material.MatButtonModule,
                            material.MatInputModule,
                            material.MatIconModule,
                            material.MatDialogModule,
                            material.MatTabsModule,
                        ]
                    },] },
        ];
        return MaterialModule;
    }());
    var LoginFormModule = (function () {
        function LoginFormModule() {
        }
        LoginFormModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            MaterialModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            angularxQrcode.QRCodeModule
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

    exports.LoginFormComponent = LoginFormComponent;
    exports.MaterialModule = MaterialModule;
    exports.LoginFormModule = LoginFormModule;
    exports.ModalWrapperComponent = ModalWrapperComponent;
    exports.TabWrapperComponent = TabWrapperComponent;
    exports.PwdFormComponent = PwdFormComponent;
    exports.ɵb = MfaFormComponent;
    exports.ɵa = MfaSetupFormComponent;
    exports.ɵc = ExistsLayoutPipe;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsaWF0eXMtbG9naW4tZm9ybS51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtL2xpYi92YWxpZGF0b3JzL3Vzci52YWxpZGF0b3IudHMiLCJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtL2xpYi9lbnVtcy9sYXlvdXRzLmVudW0udHMiLCJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtL2xpYi9lbnVtcy90aGVtZXMuZW51bS50cyIsIm5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vbGliL2VudW1zL2Zvcm1zLmVudW0udHMiLCJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtL2xpYi9lbnVtcy91c2VyLXBvbGljaWVzLmVudW0udHMiLCJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtL2xpYi9sYXlvdXRzL21vZGFsLXdyYXBwZXIvbW9kYWwtd3JhcHBlci5jb21wb25lbnQudHMiLCJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtL2xpYi9sb2dpbi1mb3JtLmNvbXBvbmVudC50cyIsIm5nOi8vQGNhbGlhdHlzL2xvZ2luLWZvcm0vbGliL2xheW91dHMvdGFiLXdyYXBwZXIvdGFiLXdyYXBwZXIuY29tcG9uZW50LnRzIiwibmc6Ly9AY2FsaWF0eXMvbG9naW4tZm9ybS9saWIvdmFsaWRhdG9ycy9wd2QudmFsaWRhdG9yLnRzIiwibmc6Ly9AY2FsaWF0eXMvbG9naW4tZm9ybS9saWIvZm9ybXMvcHdkLWZvcm0vcHdkLWZvcm0uY29tcG9uZW50LnRzIiwibmc6Ly9AY2FsaWF0eXMvbG9naW4tZm9ybS9saWIvZm9ybXMvbWZhLXNldHVwLWZvcm0vbWZhLXNldHVwLWZvcm0uY29tcG9uZW50LnRzIiwibmc6Ly9AY2FsaWF0eXMvbG9naW4tZm9ybS9saWIvZm9ybXMvbWZhLWZvcm0vbWZhLWZvcm0uY29tcG9uZW50LnRzIixudWxsLCJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtL2xpYi9waXBlcy9leGlzdHMtbGF5b3V0LnBpcGUudHMiLCJuZzovL0BjYWxpYXR5cy9sb2dpbi1mb3JtL2xpYi9sb2dpbi1mb3JtLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQ29udHJvbCB9ICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVmFsaWRhdG9yRm4gfSAgICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0aW9uUmVzdWx0XHJcbntcclxuICBba2V5IDogc3RyaW5nXSA6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBVc3JWYWxpZGF0b3Jcclxue1xyXG4gIHB1YmxpYyBzdGF0aWMgY3VzdG9tKHJlZ2V4cCA6IFJlZ0V4cCkgOiBWYWxpZGF0b3JGblxyXG4gIHtcclxuICAgIGxldCBmdW5jID0gKGNvbnRyb2wgOiBBYnN0cmFjdENvbnRyb2wpIDogeyBba2V5IDogc3RyaW5nXSA6IGJvb2xlYW4gfSB8IG51bGwgPT5cclxuICAgIHtcclxuICAgICAgbGV0IGlzUmVzcGVjdGZ1bCA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgcmVnZXhwLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICAgIGlmICggIWlzUmVzcGVjdGZ1bCApXHJcbiAgICAgICAgcmV0dXJuIHsgY3VzdG9tIDogdHJ1ZSB9O1xyXG5cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGZ1bmM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGVtYWlsKGNvbnRyb2wgOiBGb3JtQ29udHJvbCkgOiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAge1xyXG4gICAgbGV0IGlzRW1haWwgPSBjb250cm9sLnZhbHVlICE9PSBudWxsICYmIC9bYS16MC05Ll8lKy1dK0BbYS16MC05Li1dK1xcLlthLXpdezIsNH0vLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFpc0VtYWlsIClcclxuICAgICAgcmV0dXJuIHsgZW1haWw6IHRydWUgfTtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgcGhvbmUoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaXNQaG9uZSA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgL15cXCs/XFxkKiQvLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFpc1Bob25lIClcclxuICAgICAgcmV0dXJuIHsgcGhvbmU6IHRydWUgfTtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG59XHJcbiIsImV4cG9ydCBlbnVtIExheW91dHNcclxue1xyXG4gIE1PREFMICA9ICdtb2RhbCcsXHJcbiAgVEFCICAgID0gJ3RhYicsXHJcbiAgSU5MSU5FID0gJ2lubGluZSdcclxufVxyXG4iLCJleHBvcnQgZW51bSBUaGVtZXNcclxue1xyXG4gIExJR0hUID0gJ2xpZ2h0JyxcclxuICBEQVJLICA9ICdkYXJrJ1xyXG59XHJcbiIsImV4cG9ydCBlbnVtIEZvcm1zXHJcbntcclxuICBQV0QgICAgICAgPSAncHdkJyxcclxuICBNRkFfU0VUVVAgPSAnbWZhU2V0dXAnLFxyXG4gIE1GQSAgICAgICA9ICdtZmEnXHJcbn1cclxuIiwiZXhwb3J0IGVudW0gVXNlclBvbGljaWVzXHJcbntcclxuICBFTUFJTCAgPSAnZW1haWwnLFxyXG4gIFBIT05FICA9ICdwaG9uZSdcclxufVxyXG4iLCIvLyBBbmd1bGFyIG1vZHVsZXNcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9uSW5pdCB9ICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPbkRlc3Ryb3kgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSW5qZWN0IH0gICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9ICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuXHJcbi8vIEV4dGVybmFsIG1vZHVsZXNcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gICAgZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xyXG5cclxuLy8gRW51bVxyXG5pbXBvcnQgeyBGb3JtcyB9ICAgICAgICAgICBmcm9tICcuLi8uLi9lbnVtcy9mb3Jtcy5lbnVtJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yICAgIDogJ2NhbC1tb2RhbC13cmFwcGVyJyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJoZWFkZXIgcHktMiBweC00XCI+XHJcbiAgPGRpdiBjbGFzcz1cInJvdyBhbGlnbi1pdGVtcy1jZW50ZXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgPGRpdiAqbmdJZj1cIiFpc0ZpcnN0ICYmIGZvcm1UeXBlID09PSBmb3Jtcy5QV0RcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImg1IGZvbnQtd2VpZ2h0LWxpZ2h0IHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVQd2QgPyAnZC1ibG9jayBtYi0wJyA6ICcnIH19XCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnRpdGxlUHdkIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwibGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZFwiIGNsYXNzPVwiZC1ibG9jayBmb250LXdlaWdodC1saWdodCBzbWFsbFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZCB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJpc0ZpcnN0ICYmIGZvcm1UeXBlID09PSBmb3Jtcy5QV0RcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImg1IGZvbnQtd2VpZ2h0LWxpZ2h0IHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVQd2RTZXR1cCA/ICdkLWJsb2NrIG1iLTAnIDogJycgfX1cIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIudGl0bGVQd2RTZXR1cCB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cImxhYmVscy5oZWFkZXIuc3VidGl0bGVQd2RTZXR1cFwiIGNsYXNzPVwiZC1ibG9jayBmb250LXdlaWdodC1saWdodCBzbWFsbFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZFNldHVwIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdJZj1cImZvcm1UeXBlID09PSBmb3Jtcy5NRkFcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImg1IGZvbnQtd2VpZ2h0LWxpZ2h0IHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVNZmEgPyAnZC1ibG9jayBtYi0wJyA6ICcnIH19XCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnRpdGxlTWZhIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwibGFiZWxzLmhlYWRlci5zdWJ0aXRsZU1mYVwiIGNsYXNzPVwiZC1ibG9jayBmb250LXdlaWdodC1saWdodCBzbWFsbFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZU1mYSB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBX1NFVFVQXCI+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJoNSBmb250LXdlaWdodC1saWdodCB7eyBsYWJlbHMuaGVhZGVyLnN1YnRpdGxlTWZhU2V0dXAgPyAnZC1ibG9jayBtYi0wJyA6ICcnIH19XCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnRpdGxlTWZhU2V0dXAgfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJsYWJlbHMuaGVhZGVyLnN1YnRpdGxlTWZhU2V0dXBcIiBjbGFzcz1cImQtYmxvY2sgZm9udC13ZWlnaHQtbGlnaHQgc21hbGxcIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVNZmFTZXR1cCB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtMiBweC0wIHRleHQtcmlnaHRcIj5cclxuICAgICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b24gbWF0LWRpYWxvZy1jbG9zZT5cclxuICAgICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuPG1hdC1kaWFsb2ctY29udGVudCBjbGFzcz1cInB5LTRcIj5cclxuICA8IS0tIE5PVEU6IFB3ZCBGb3JtIC0tPlxyXG4gIDxjYWwtcHdkLWZvcm0gKm5nSWY9XCJmb3JtVHlwZSA9PT0gZm9ybXMuUFdEXCIgXHJcbiAgICBbaXNGaXJzdF09XCJpc0ZpcnN0XCIgXHJcbiAgICBbcHdkUG9saWNpZXNdPVwicHdkUG9saWNpZXNcIiBcclxuICAgIFtsYWJlbHNdPVwibGFiZWxzXCIgXHJcbiAgICBbaW5wdXRzXT1cImlucHV0c1wiIFxyXG4gICAgW2Vycm9yc109XCJlcnJvcnNcIiBcclxuICAgIChmaXJzdENvbm5lY3Rpb24pPVwicmVsYXlGaXJzdExvZ0V2ZW50KCRldmVudClcIiBcclxuICAgIChsb3N0UGFzc3dvcmQpPVwicmVsYXlMb3N0UHdkRXZlbnQoJGV2ZW50KVwiPlxyXG4gIDwvY2FsLXB3ZC1mb3JtPlxyXG4gIDwhLS0gTk9URTogTUZBIFNldHVwIEZvcm0gLS0+XHJcbiAgPGNhbC1tZmEtc2V0dXAtZm9ybSAqbmdJZj1cImZvcm1UeXBlID09PSBmb3Jtcy5NRkFfU0VUVVBcIiBcclxuICAgIFtxckNvZGVdPVwicXJDb2RlXCIgXHJcbiAgICBbY29kZV0gID1cImNvZGVcIiBcclxuICAgIFtsYWJlbHNdPVwibGFiZWxzXCIgXHJcbiAgICBbaW5wdXRzXT1cImlucHV0c1wiIFxyXG4gICAgW2Vycm9yc109XCJlcnJvcnNcIiBcclxuICAgIChzYXZlTWZhKT1cInJlbGF5U2F2ZU1mYUtleUV2ZW50KCRldmVudClcIj5cclxuICA8L2NhbC1tZmEtc2V0dXAtZm9ybT5cclxuICA8IS0tIE5PVEU6IE1GQSBGb3JtIC0tPlxyXG4gIDxjYWwtbWZhLWZvcm0gKm5nSWY9XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBXCIgXHJcbiAgICBbbGFiZWxzXT1cImxhYmVsc1wiIFxyXG4gICAgW2lucHV0c109XCJpbnB1dHNcIiBcclxuICAgIFtlcnJvcnNdPVwiZXJyb3JzXCIgXHJcbiAgICAoc2VuZE1mYSk9XCJyZWxheVNlbmRNZmFDb2RlRXZlbnQoJGV2ZW50KVwiPlxyXG4gIDwvY2FsLW1mYS1mb3JtPlxyXG48L21hdC1kaWFsb2ctY29udGVudD5gLFxyXG4gIHN0eWxlczogW2AuaGVhZGVye2NvbG9yOiNmZmY7YmFja2dyb3VuZDojNWVhY2ZmfWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNb2RhbFdyYXBwZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxyXG57XHJcbiAgLy8gTk9URTogVXNlZnVsIGZvciB0ZW1wbGF0ZVxyXG4gIHB1YmxpYyBmb3JtcyA9IEZvcm1zO1xyXG5cclxuICAvLyBOT1RFOiBDb21tb25cclxuICAvLyBGb3JtIHR5cGUgKHBhc3N3b3JkIC8gbWZhKVxyXG4gIHB1YmxpYyBmb3JtVHlwZSAgICAgICAgOiBzdHJpbmc7XHJcbiAgLy8gTGFiZWxzXHJcbiAgcHVibGljIGxhYmVscyAgICA6IGFueTtcclxuICAvLyBFcnJvcnNcclxuICBwdWJsaWMgZXJyb3JzICAgIDogYW55O1xyXG4gIC8vIElucHV0c1xyXG4gIHB1YmxpYyBpbnB1dHMgICAgOiBhbnk7XHJcbiAgLy8gRXZlbnQgc2VudCBmcm9tIG1vZGFsXHJcbiAgcHVibGljIGNsb3NlU3ViICAgICAgICA6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLy8gTk9URTogUGFzc3dvcmRcclxuICAvLyBGaXJzdCBjb25uZWN0aW9uIG9yIEZvcmdvdCBwYXNzd29yZFxyXG4gIHB1YmxpYyBpc0ZpcnN0ICAgICAgIDogYm9vbGVhbjtcclxuICAvLyBQYXNzd29yZCBwb2xpY2llc1xyXG4gIHB1YmxpYyBwd2RQb2xpY2llcyAgIDogYW55O1xyXG4gIC8vIEV2ZW50IHNlbnQgZnJvbSBwYXNzd29yZCBmb3JtXHJcbiAgcHVibGljIHJlbGF5Rmlyc3RMb2cgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBwdWJsaWMgcmVsYXlMb3N0UHdkICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvLyBOT1RFOiBNRkEgc2V0dXBcclxuICAvLyBNRkEgc2VjcmV0IGtleVxyXG4gIHB1YmxpYyBjb2RlICAgICAgICAgICAgOiBzdHJpbmc7XHJcbiAgcHVibGljIHFyQ29kZSAgICAgICAgICA6IHN0cmluZztcclxuICAvLyBFdmVudCBzZW50IGZyb20gbWZhIHNldHVwIGZvcm1cclxuICBwdWJsaWMgcmVsYXlTYXZlTWZhS2V5IDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8vIE5PVEU6IE1GQVxyXG4gIC8vIEV2ZW50IHNlbnQgZnJvbSBtZmEgZm9ybVxyXG4gIHB1YmxpYyByZWxheVNlbmRNZmFDb2RlIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yXHJcbiAgKFxyXG4gICAgcHVibGljICBkaWFsb2dSZWYgOiBNYXREaWFsb2dSZWY8TW9kYWxXcmFwcGVyQ29tcG9uZW50PixcclxuICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogYW55XHJcbiAgKVxyXG4gIHtcclxuICAgIHRoaXMubG9hZFBhcmFtcygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCkgOiB2b2lkXHJcbiAge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCkgOiB2b2lkXHJcbiAge1xyXG4gICAgaWYodGhpcy5jbG9zZVN1YilcclxuICAgICAgdGhpcy5jbG9zZVN1Yi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbGF5Rmlyc3RMb2dFdmVudCgkZXZlbnQgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMucmVsYXlGaXJzdExvZy5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVsYXlMb3N0UHdkRXZlbnQoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnJlbGF5TG9zdFB3ZC5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVsYXlTYXZlTWZhS2V5RXZlbnQoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnJlbGF5U2F2ZU1mYUtleS5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVsYXlTZW5kTWZhQ29kZUV2ZW50KCRldmVudCA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5yZWxheVNlbmRNZmFDb2RlLmVtaXQoJGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbG9hZFBhcmFtcygpIDogdm9pZFxyXG4gIHtcclxuICAgIHZhciBkYXRhIDogYW55O1xyXG4gICAgZGF0YSA9IHRoaXMuZGF0YTtcclxuXHJcbiAgICBpZihkYXRhICE9PSBudWxsKVxyXG4gICAge1xyXG4gICAgICB0aGlzLmZvcm1UeXBlICAgICAgID0gZGF0YS5mb3JtVHlwZTtcclxuXHJcbiAgICAgIC8vIE5PVEU6IENvbW1vblxyXG4gICAgICAvLyBMYWJlbHNcclxuICAgICAgdGhpcy5sYWJlbHMgICAgICAgICA9IGRhdGEubGFiZWxzO1xyXG4gICAgICAvLyBMYWJlbHNcclxuICAgICAgdGhpcy5lcnJvcnMgICAgICAgICA9IGRhdGEuZXJyb3JzO1xyXG4gICAgICAvLyBMYWJlbHNcclxuICAgICAgdGhpcy5pbnB1dHMgICAgICAgICA9IGRhdGEuaW5wdXRzO1xyXG5cclxuICAgICAgLy8gTk9URTogUGFzc3dvcmRcclxuICAgICAgLy8gRmlyc3QgY29ubmVjdGlvbiBvciBGb3Jnb3QgcGFzc3dvcmRcclxuICAgICAgdGhpcy5pc0ZpcnN0ICAgICAgICA9IGRhdGEuaXNGaXJzdDtcclxuICAgICAgLy8gUGFzc3dvcmQgcG9saWNpZXNcclxuICAgICAgdGhpcy5wd2RQb2xpY2llcyAgICA9IGRhdGEucHdkUG9saWNpZXM7XHJcblxyXG4gICAgICAvLyBOT1RFOiBNRkFcclxuICAgICAgLy8gTWZhIHNldHVwZCBjb2Rlc1xyXG4gICAgICB0aGlzLmNvZGUgICAgICAgICAgID0gZGF0YS5jb2RlO1xyXG4gICAgICB0aGlzLnFyQ29kZSAgICAgICAgID0gZGF0YS5xckNvZGU7XHJcblxyXG4gICAgICAvLyBDbG9zZSBkaWFsb2cgZXZlbnRcclxuICAgICAgdGhpcy5jbG9zZVN1YiA9IGRhdGEuY2xvc2VFdmVudC5zdWJzY3JpYmUoKHJlcykgPT5cclxuICAgICAge1xyXG4gICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8gQW5ndWxhciBtb2R1bGVzXHJcbmltcG9ydCB7IE9uSW5pdCB9ICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0IH0gICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT25DaGFuZ2VzIH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNpbXBsZUNoYW5nZXMgfSAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPbkRlc3Ryb3kgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSW5wdXQgfSAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE91dHB1dCB9ICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdERpYWxvZyB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgTWF0SWNvblJlZ2lzdHJ5IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSAgICBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSAgICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAgfSAgICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVmFsaWRhdG9ycyB9ICAgICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuLy8gRXh0ZXJuYWwgbW9kdWxlc1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSAgICBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XHJcblxyXG4vLyBJbnRlcm5hbCBtb2R1bGVzXHJcbmltcG9ydCB7IFVzclZhbGlkYXRvciB9ICAgIGZyb20gJy4vdmFsaWRhdG9ycy91c3IudmFsaWRhdG9yJztcclxuXHJcbi8vIEVudW1zXHJcbmltcG9ydCB7IExheW91dHMgfSAgICAgICAgIGZyb20gJy4vZW51bXMvbGF5b3V0cy5lbnVtJztcclxuaW1wb3J0IHsgVGhlbWVzIH0gICAgICAgICAgZnJvbSAnLi9lbnVtcy90aGVtZXMuZW51bSc7XHJcbmltcG9ydCB7IEZvcm1zIH0gICAgICAgICAgIGZyb20gJy4vZW51bXMvZm9ybXMuZW51bSc7XHJcbmltcG9ydCB7IFVzZXJQb2xpY2llcyB9ICAgIGZyb20gJy4vZW51bXMvdXNlci1wb2xpY2llcy5lbnVtJztcclxuXHJcbi8vIENvbXBvbmVudHNcclxuaW1wb3J0IHsgTW9kYWxXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXRzL21vZGFsLXdyYXBwZXIvbW9kYWwtd3JhcHBlci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3IgICAgOiAnY2FsLWxvZ2luLWZvcm0nLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInt7IGZpeGVkV2lkdGggPyAnbG9naW4td3JhcHBlcicgOiAnJyB9fVwiIGlkPVwiZGVidWctbG9naW4tZm9ybVwiPlxyXG4gIDxtYXQtdGFiLWdyb3VwIGlkPVwiY2FsaWF0eXMtbG9naW4tZm9ybVwiIFtzZWxlY3RlZEluZGV4XT1cInNlbGVjdGVkVGFiXCI+XHJcbiAgICA8bWF0LXRhYiBsYWJlbD1cImxvZ2luLWZvcm1cIj5cclxuICAgICAgPCEtLSBOT1RFOiBMb2dpbiBmb3JtIC0tPlxyXG4gICAgICA8Zm9ybSAobmdTdWJtaXQpPVwib25DbGlja0xvZ2luKClcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiICpuZ0lmPVwiIWdvb2dsZVN0eWxlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBuby1ndXR0ZXJzXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbm8tZ3V0dGVyc1wiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgIDwhLS0gTk9URTogVXNlcm5hbWUgLS0+XHJcbiAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IG1hdFByZWZpeCBjbGFzcz1cIm1yLTJcIiAqbmdJZj1cImljb25zLmljb25Vc3JPbkxvZ2luRm9ybVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImFsaWduLWJvdHRvbVwiPnBlcnNvbjwvbWF0LWljb24+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwidXNlcm5hbWVcIiBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lPVwidXNlcm5hbWVcIiBhdXRvY29tcGxldGU9XCJ1c2VybmFtZVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3sgbGFiZWxzLmlucHV0LnVzZXJuYW1lIH19XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIi8+XHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUudmFsdWU/Lmxlbmd0aCA+IDAgJiYgaW5wdXRzLmNsZWFyVXNyT25Mb2dpbkZvcm1cIiBcclxuICAgICAgICAgICAgICAgICAgICBtYXQtYnV0dG9uIG1hdFN1ZmZpeCBtYXQtaWNvbi1idXR0b24gYXJpYS1sYWJlbD1cIkNsZWFyXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cImZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS5zZXRWYWx1ZSgnJylcIiBcclxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZm9ybVR5cGUgPT09IGZvcm1zLk1GQSAmJiBmb3JtTGF5b3V0cy5tZmEgPT09IGxheW91dHMuSU5MSU5FID8gdHJ1ZSA6IGZhbHNlXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICA8IS0tIE5PVEU6IEVycm9yIG1lc3NhZ2UocykgLS0+XHJcbiAgICAgICAgICAgICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuZXJyb3JzPy5yZXF1aXJlZCAmJiBlcnJvcnMubG9naW5cIj5cclxuICAgICAgICAgICAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnJlcXVpcmVkIH19XHJcbiAgICAgICAgICAgICAgICAgIDwvbWF0LWhpbnQ+XHJcbiAgICAgICAgICAgICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuZXJyb3JzPy5wYXR0ZXJuICYmIGVycm9ycy5sb2dpbiAmJiB1c3JQb2xpY3kgPT09IHVzZXJQb2xpY2llcy5FTUFJTFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kuZW1haWwgfX1cclxuICAgICAgICAgICAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgICAgICAgICAgICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS5lcnJvcnM/LnBhdHRlcm4gJiYgZXJyb3JzLmxvZ2luICYmIHVzclBvbGljeSA9PT0gdXNlclBvbGljaWVzLlBIT05FXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5waG9uZSB9fVxyXG4gICAgICAgICAgICAgICAgICA8L21hdC1oaW50PlxyXG4gICAgICAgICAgICAgICAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnVzZXJuYW1lLmVycm9ycz8ucGF0dGVybiAmJiBlcnJvcnMubG9naW4gJiYgdXNyUG9saWN5ICYmIHVzclBvbGljeSAhPT0gdXNlclBvbGljaWVzLkVNQUlMICYmIHVzclBvbGljeSAhPT0gdXNlclBvbGljaWVzLlBIT05FXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5jdXN0b21SZWdleCB9fVxyXG4gICAgICAgICAgICAgICAgICA8L21hdC1oaW50PlxyXG4gICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbm8tZ3V0dGVyc1wiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgIDwhLS0gTk9URTogUGFzc3dvcmQgLS0+XHJcbiAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IG1hdFByZWZpeCBjbGFzcz1cIm1yLTJcIiAqbmdJZj1cImljb25zLmljb25Qd2RPbkxvZ2luRm9ybVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImFsaWduLWJvdHRvbVwiPmxvY2s8L21hdC1pY29uPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IGZvcm1Db250cm9sTmFtZT1cInBhc3N3b3JkXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCIgYXV0b2NvbXBsZXRlPVwicGFzc3dvcmRcIiBcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cInt7IGxhYmVscy5pbnB1dC5wYXNzd29yZCB9fVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ7eyBzaG93UGFzc3dvcmQgPyAndGV4dCcgOiAncGFzc3dvcmQnIH19XCIvPlxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiaW5wdXRzLnNob3dQd2RPbkxvZ2luRm9ybVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIG1hdC1idXR0b24gbWF0U3VmZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiQ2xlYXJcIiBcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwic2hvd1Bhc3N3b3JkPSFzaG93UGFzc3dvcmRcIiBcclxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZm9ybVR5cGUgPT09IGZvcm1zLk1GQSAmJiBmb3JtTGF5b3V0cy5tZmEgPT09IGxheW91dHMuSU5MSU5FID8gdHJ1ZSA6IGZhbHNlXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj57eyBzaG93UGFzc3dvcmQgPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknIH19PC9tYXQtaWNvbj5cclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIDwhLS0gTk9URTogRXJyb3IgbWVzc2FnZSAtLT5cclxuICAgICAgICAgICAgICAgICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy5wYXNzd29yZC5lcnJvcnM/LnJlcXVpcmVkICYmIGVycm9ycy5sb2dpblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kucmVxdWlyZWQgfX1cclxuICAgICAgICAgICAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XHJcbiAgICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPCEtLSBOT1RFOiBCdXR0b25zIC0tPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiISggZm9ybVR5cGUgPT09IGZvcm1zLk1GQSAmJiBmb3JtTGF5b3V0cy5tZmEgPT09IGxheW91dHMuSU5MSU5FIClcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnMgcGItM1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbCB0ZXh0LWxlZnRcIj5cclxuICAgICAgICAgICAgICAgICAgPCEtLSBUT0RPOiBSZW1lbWJlciBtZSAtLT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPCEtLSBOT1RFOiBGb3Jnb3QgcGFzc3dvcmQgLS0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIHRleHQtcmlnaHRcIiAqbmdJZj1cImJ1dHRvbnMuZm9yZ290UGFzc3dvcmRcIj5cclxuICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cIm9uQ2xpY2tGb3Jnb3RQYXNzd29yZCgpXCIgaHJlZj1cIiNcIiBjbGFzcz1cInNtYWxsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLmJ1dHRvbi5mb3Jnb3RQYXNzd29yZCB9fVxyXG4gICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnMgcGItM1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbCB0ZXh0LXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDwhLS0gTk9URTogU2lnbiB1cCAtLT5cclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIChjbGljayk9XCJvbkNsaWNrU2lnblVwKClcIiB0eXBlPVwiYnV0dG9uXCIgY29sb3I9XCJwcmltYXJ5XCIgY2xhc3M9XCJzbWFsbCB0ZXh0LXVwcGVyY2FzZSBtci0zXCIgKm5nSWY9XCJidXR0b25zLnNpZ25VcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5idXR0b24uc2lnblVwIH19XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICA8IS0tIE5PVEU6IFNpZ24gaW4gLS0+XHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gdHlwZT1cInN1Ym1pdFwiIGNvbG9yPVwicHJpbWFyeVwiIFtkaXNhYmxlZF09XCIhZm9ybUdyb3VwLnZhbGlkXCIgY2xhc3M9XCJzbWFsbCB0ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5idXR0b24uc2lnbkluIH19XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgICAgPCEtLSBOT1RFOiBMb2dpbiBieSBzdGVwcyBidXR0b25zIC0tPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnMgbWItM1wiICpuZ0lmPVwiZ29vZ2xlU3R5bGVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIHRleHQtcmlnaHRcIiAqbmdJZj1cImJ1dHRvbnMuc2lnblVwXCI+XHJcbiAgICAgICAgICA8IS0tIE5PVEU6IFNpZ24gdXAgLS0+XHJcbiAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gKGNsaWNrKT1cIm9uQ2xpY2tTaWduVXAoKVwiIHR5cGU9XCJidXR0b25cIiBjb2xvcj1cInByaW1hcnlcIiBjbGFzcz1cInNtYWxsIHRleHQtdXBwZXJjYXNlIG1yLTJcIj5cclxuICAgICAgICAgICAge3sgbGFiZWxzLmJ1dHRvbi5zaWduVXAgfX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wge3sgYnV0dG9ucy5zaWduVXAgPyAndGV4dC1sZWZ0JyA6ICd0ZXh0LWNlbnRlcid9fVwiPlxyXG4gICAgICAgICAgPCEtLSBOT1RFOiBTaWduIGluIC0tPlxyXG4gICAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiAoY2xpY2spPVwib25DbGlja05leHRTdGVwKDApXCIgdHlwZT1cImJ1dHRvblwiIGNvbG9yPVwicHJpbWFyeVwiIGNsYXNzPVwic21hbGwgdGV4dC11cHBlcmNhc2UgbWwtMlwiPlxyXG4gICAgICAgICAgICB7eyBsYWJlbHMuYnV0dG9uLnNpZ25JbiB9fVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8IS0tIE5PVEU6IFNvY2lhbCBidXR0b25zIC0tPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiISggZm9ybVR5cGUgPT09IGZvcm1zLk1GQSAmJiBmb3JtTGF5b3V0cy5tZmEgPT09IGxheW91dHMuSU5MSU5FIClcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgPCEtLSBOT1RFOiBHb29nbGUgLS0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWJsb2NrIG1iLTNcIiAqbmdJZj1cImJ1dHRvbnMuZ29vZ2xlXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtYXQtcmFpc2VkLWJ1dHRvbiBjYWwtYnRuIGdvb2dsZSB7eyB0aGVtZSB9fVwiIChjbGljayk9XCJvbkNsaWNrTG9naW5Tb2NpYWwoJ2dvb2dsZScpXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhbC1iZy1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImFsaWduLW1pZGRsZSBjYWwtaWNvblwiIHN2Z0ljb249XCJnb29nbGVcIj48L21hdC1pY29uPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjYWwtbGFiZWxcIj57eyBsYWJlbHMuYnV0dG9uLmdvb2dsZVNpZ25JbiB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwhLS0gTk9URTogRmFjZWJvb2sgLS0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWJsb2NrIG1iLTNcIiAqbmdJZj1cImJ1dHRvbnMuZmFjZWJvb2tcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNhbC1idG4gZmFjZWJvb2tcIiAoY2xpY2spPVwib25DbGlja0xvZ2luU29jaWFsKCdmYWNlYm9vaycpXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhbC1iZy1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImFsaWduLW1pZGRsZSBjYWwtaWNvblwiIHN2Z0ljb249XCJmYWNlYm9va1wiPjwvbWF0LWljb24+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhbC1sYWJlbFwiPnt7IGxhYmVscy5idXR0b24uZmFjZWJvb2tTaWduSW4gfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8IS0tIE5PVEU6IElubGluZSBNRkEgLS0+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBICYmIGZvcm1MYXlvdXRzLm1mYSA9PT0gbGF5b3V0cy5JTkxJTkVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgICAgICAgPGNhbC1tZmEtZm9ybSBcclxuICAgICAgICAgICAgICBbaW5wdXRzXT1cImlucHV0c1wiIFxyXG4gICAgICAgICAgICAgIFtsYWJlbHNdPVwibGFiZWxzXCIgXHJcbiAgICAgICAgICAgICAgW2Vycm9yc109XCJlcnJvcnNcIiBcclxuICAgICAgICAgICAgICAoc2VuZE1mYSk9XCJ0YWJTZW5kTWZhQ29kZSgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDwvY2FsLW1mYS1mb3JtPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9tYXQtdGFiPlxyXG4gICAgPG1hdC10YWIgbGFiZWw9XCJ1c3Itc3RlcFwiICpuZ0lmPVwiZ29vZ2xlU3R5bGVcIj5cclxuICAgICAgPCEtLSBOT1RFOiBCYWNrIGJ1dHRvbiAtLT5cclxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBuby1ndXR0ZXJzIG1iLTNcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XHJcbiAgICAgICAgICA8YSBocmVmPVwiI1wiIChjbGljayk9XCJvbkNsaWNrUHJldlN0ZXAoMSlcIiB0aXRsZT1cInt7IGxhYmVscy5idXR0b24uYmFjayB9fVwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJhbGlnbi1ib3R0b20gbXItMlwiPmtleWJvYXJkX2Fycm93X2xlZnQ8L21hdC1pY29uPnt7IGxhYmVscy5idXR0b24uYmFjayB9fVxyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGZvcm0gKG5nU3VibWl0KT1cIm9uQ2xpY2tOZXh0U3RlcCgxKVwiIFtmb3JtR3JvdXBdPVwidXNyRm9ybUdyb3VwXCI+XHJcbiAgICAgICAgPCEtLSBOT1RFOiBVc2VybmFtZSAtLT5cclxuICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgICAgICAgPGRpdiBtYXRQcmVmaXggY2xhc3M9XCJtci0yXCIgKm5nSWY9XCJpY29ucy5pY29uVXNyT25Mb2dpbkZvcm1cIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWxpZ24tYm90dG9tXCI+cGVyc29uPC9tYXQtaWNvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGlucHV0IG1hdElucHV0IGZvcm1Db250cm9sTmFtZT1cInVzZXJuYW1lXCIgXHJcbiAgICAgICAgICAgIG5hbWU9XCJ1c2VybmFtZVwiIGF1dG9jb21wbGV0ZT1cInVzZXJuYW1lXCIgXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3sgbGFiZWxzLmlucHV0LnVzZXJuYW1lIH19XCIgXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIvPlxyXG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInVzckZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS52YWx1ZT8ubGVuZ3RoID4gMCAmJiBpbnB1dHMuY2xlYXJVc3JPbkxvZ2luRm9ybVwiIFxyXG4gICAgICAgICAgICBtYXQtYnV0dG9uIG1hdFN1ZmZpeCBtYXQtaWNvbi1idXR0b24gYXJpYS1sYWJlbD1cIkNsZWFyXCIgXHJcbiAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJ1c3JGb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuc2V0VmFsdWUoJycpXCIgXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBICYmIGZvcm1MYXlvdXRzLm1mYSA9PT0gbGF5b3V0cy5JTkxJTkUgPyB0cnVlIDogZmFsc2VcIiBcclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8IS0tIE5PVEU6IEVycm9yIG1lc3NhZ2UocykgLS0+XHJcbiAgICAgICAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwidXNyRm9ybUdyb3VwLmNvbnRyb2xzLnVzZXJuYW1lLmVycm9ycz8ucmVxdWlyZWQgJiYgZXJyb3JzLmxvZ2luXCI+XHJcbiAgICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kucmVxdWlyZWQgfX1cclxuICAgICAgICAgIDwvbWF0LWhpbnQ+XHJcbiAgICAgICAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwidXNyRm9ybUdyb3VwLmNvbnRyb2xzLnVzZXJuYW1lLmVycm9ycz8ucGF0dGVybiAmJiBlcnJvcnMubG9naW4gJiYgdXNyUG9saWN5ID09PSB1c2VyUG9saWNpZXMuRU1BSUxcIj5cclxuICAgICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5lbWFpbCB9fVxyXG4gICAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJ1c3JGb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuZXJyb3JzPy5wYXR0ZXJuICYmIGVycm9ycy5sb2dpbiAmJiB1c3JQb2xpY3kgPT09IHVzZXJQb2xpY2llcy5QSE9ORVwiPlxyXG4gICAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnBob25lIH19XHJcbiAgICAgICAgICA8L21hdC1oaW50PlxyXG4gICAgICAgICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cInVzckZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS5lcnJvcnM/LnBhdHRlcm4gJiYgZXJyb3JzLmxvZ2luICYmIHVzclBvbGljeSAmJiB1c3JQb2xpY3kgIT09IHVzZXJQb2xpY2llcy5FTUFJTCAmJiB1c3JQb2xpY3kgIT09IHVzZXJQb2xpY2llcy5QSE9ORVwiPlxyXG4gICAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LmN1c3RvbVJlZ2V4IH19XHJcbiAgICAgICAgICA8L21hdC1oaW50PlxyXG4gICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBuby1ndXR0ZXJzIG1iLTNcIj5cclxuICAgICAgICAgIDwhLS0gTk9URTogRm9yZ290IHBhc3N3b3JkIC0tPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbCB0ZXh0LWxlZnRcIiAqbmdJZj1cImJ1dHRvbnMuZm9yZ290UGFzc3dvcmRcIj5cclxuICAgICAgICAgICAgPGEgKGNsaWNrKT1cIm9uQ2xpY2tGb3Jnb3RQYXNzd29yZCgpXCIgaHJlZj1cIiNcIiBjbGFzcz1cInNtYWxsXCI+XHJcbiAgICAgICAgICAgICAge3sgbGFiZWxzLmJ1dHRvbi5mb3Jnb3RQYXNzd29yZCB9fVxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwhLS0gTk9URTogTmV4dCBidXR0b24gLS0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIHRleHQtcmlnaHRcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY29sb3I9XCJwcmltYXJ5XCIgW2Rpc2FibGVkXT1cIiF1c3JGb3JtR3JvdXAudmFsaWRcIiBjbGFzcz1cInNtYWxsIHRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgICAgICAge3sgbGFiZWxzLmJ1dHRvbi5uZXh0IH19XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgIDwvbWF0LXRhYj5cclxuICAgIDxtYXQtdGFiIGxhYmVsPVwicHdkLXN0ZXBcIiAqbmdJZj1cImdvb2dsZVN0eWxlXCI+XHJcbiAgICAgIDwhLS0gTk9URTogQmFjayBidXR0b24gLS0+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbm8tZ3V0dGVycyBtYi0zXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIiNcIiAoY2xpY2spPVwib25DbGlja1ByZXZTdGVwKDIpXCIgdGl0bGU9XCJ7eyBsYWJlbHMuYnV0dG9uLmJhY2sgfX1cIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWxpZ24tYm90dG9tIG1yLTJcIj5rZXlib2FyZF9hcnJvd19sZWZ0PC9tYXQtaWNvbj57eyBsYWJlbHMuYnV0dG9uLmJhY2sgfX1cclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDwhLS0gVE9ETzogVXNlciBpbmZvIC0tPlxyXG4gICAgICA8cD57eyB1c2VySW5mbyB9fTwvcD5cclxuICAgICAgPGZvcm0gKG5nU3VibWl0KT1cIm9uQ2xpY2tOZXh0U3RlcCgyKVwiIFtmb3JtR3JvdXBdPVwicHdkRm9ybUdyb3VwXCI+XHJcbiAgICAgICAgPCEtLSBOT1RFOiBQYXNzd29yZCAtLT5cclxuICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgICAgICAgPGRpdiBtYXRQcmVmaXggY2xhc3M9XCJtci0yXCIgKm5nSWY9XCJpY29ucy5pY29uUHdkT25Mb2dpbkZvcm1cIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWxpZ24tYm90dG9tXCI+bG9jazwvbWF0LWljb24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJwYXNzd29yZFwiIFxyXG4gICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIiBhdXRvY29tcGxldGU9XCJwYXNzd29yZFwiIFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cInt7IGxhYmVscy5pbnB1dC5wYXNzd29yZCB9fVwiIFxyXG4gICAgICAgICAgICB0eXBlPVwie3sgc2hvd1Bhc3N3b3JkID8gJ3RleHQnIDogJ3Bhc3N3b3JkJyB9fVwiLz5cclxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJpbnB1dHMuc2hvd1B3ZE9uTG9naW5Gb3JtXCIgXHJcbiAgICAgICAgICAgIG1hdC1idXR0b24gbWF0U3VmZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiQ2xlYXJcIiBcclxuICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cInNob3dQYXNzd29yZD0hc2hvd1Bhc3N3b3JkXCIgXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBICYmIGZvcm1MYXlvdXRzLm1mYSA9PT0gbGF5b3V0cy5JTkxJTkUgPyB0cnVlIDogZmFsc2VcIiBcclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24+e3sgc2hvd1Bhc3N3b3JkID8gJ3Zpc2liaWxpdHlfb2ZmJyA6ICd2aXNpYmlsaXR5JyB9fTwvbWF0LWljb24+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwhLS0gTk9URTogRXJyb3IgbWVzc2FnZSAtLT5cclxuICAgICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJwd2RGb3JtR3JvdXAuY29udHJvbHMucGFzc3dvcmQuZXJyb3JzPy5yZXF1aXJlZCAmJiBlcnJvcnMubG9naW5cIj5cclxuICAgICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5yZXF1aXJlZCB9fVxyXG4gICAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxyXG4gICAgICAgIDwhLS0gTk9URTogTmV4dCBidXR0b24gLS0+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBuby1ndXR0ZXJzIG1iLTNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgdGV4dC1yaWdodFwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjb2xvcj1cInByaW1hcnlcIiBbZGlzYWJsZWRdPVwiIXB3ZEZvcm1Hcm91cC52YWxpZFwiIGNsYXNzPVwic21hbGwgdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICAgICAgICB7eyBsYWJlbHMuYnV0dG9uLm5leHQgfX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgPC9tYXQtdGFiPlxyXG4gICAgPG1hdC10YWIgbGFiZWw9XCJ0YWItd3JhcHBlclwiICpuZ0lmPVwiKGZvcm1MYXlvdXRzIHwgZXhpc3RzTGF5b3V0OiBsYXlvdXRzLlRBQilcIj5cclxuICAgICAgPCEtLSBOT1RFOiBUYWIgZm9ybSAtLT5cclxuICAgICAgPGNhbC10YWItd3JhcHBlciBcclxuICAgICAgICBbZm9ybVR5cGVdPVwiZm9ybVR5cGVcIiBcclxuICAgICAgICBbaXNGaXJzdF09XCJpc0ZpcnN0XCIgXHJcbiAgICAgICAgW2NvZGVdICAgPVwiY29kZVwiIFxyXG4gICAgICAgIFtxckNvZGVdID1cInFyQ29kZVwiIFxyXG4gICAgICAgIFtwd2RQb2xpY2llc109XCJwd2RQb2xpY2llc1wiIFxyXG4gICAgICAgIFtlcnJvcnNdPVwiZXJyb3JzXCIgXHJcbiAgICAgICAgW2xhYmVsc109XCJsYWJlbHNcIiBcclxuICAgICAgICBbaW5wdXRzXT1cImlucHV0c1wiIFxyXG4gICAgICAgIChzZW5kQ2xvc2VUYWIpPVwib25DbGlja0Nsb3NlVGFiKCRldmVudClcIiBcclxuICAgICAgICAocmVsYXlGaXJzdExvZyk9XCJ0YWJGaXJzdExvZygkZXZlbnQpXCIgXHJcbiAgICAgICAgKHJlbGF5TG9zdFB3ZCk9XCJ0YWJMb3N0UHdkKCRldmVudClcIiBcclxuICAgICAgICAocmVsYXlTYXZlTWZhS2V5KT1cInRhYlNhdmVNZmFLZXkoJGV2ZW50KVwiIFxyXG4gICAgICAgIChyZWxheVNlbmRNZmFDb2RlKT1cInRhYlNlbmRNZmFDb2RlKCRldmVudClcIj5cclxuICAgICAgPC9jYWwtdGFiLXdyYXBwZXI+XHJcbiAgICA8L21hdC10YWI+XHJcbiAgPC9tYXQtdGFiLWdyb3VwPlxyXG48L2Rpdj5gLFxyXG4gIHN0eWxlczogW2AvZGVlcC8gI2NhbGlhdHlzLWxvZ2luLWZvcm0gbWF0LXRhYi1oZWFkZXJ7ZGlzcGxheTpub25lIWltcG9ydGFudH1tYXQtZm9ybS1maWVsZCBtYXQtaWNvbntjb2xvcjpncmV5fS5sb2dpbi13cmFwcGVye3dpZHRoOjEwMCU7bWF4LXdpZHRoOjMzMHB4O3BhZGRpbmc6MTVweDttYXJnaW46MCBhdXRvfS5jYWwtYnRue2xpbmUtaGVpZ2h0OjM1cHg7Ym9yZGVyOjAhaW1wb3J0YW50O3BhZGRpbmc6MXB4IWltcG9ydGFudH0uY2FsLWJ0biAuY2FsLWJnLWljb257cGFkZGluZzo4cHg7d2lkdGg6MzRweDtoZWlnaHQ6MzRweDtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjp0b3AhaW1wb3J0YW50fS5jYWwtYnRuIC5jYWwtYmctaWNvbiAuY2FsLWljb257ZGlzcGxheTppbmxpbmUtYmxvY2s7aGVpZ2h0OjE4cHg7d2lkdGg6MThweDttYXJnaW4tdG9wOi00cHg7dmVydGljYWwtYWxpZ246dG9wIWltcG9ydGFudH0uY2FsLWJ0biAuY2FsLWxhYmVse3BhZGRpbmctcmlnaHQ6OHB4O3BhZGRpbmctbGVmdDoxNnB4O3NpemU6MTRweDtmb250LWZhbWlseTpSb2JvdG8sc2Fucy1zZXJpZn0uYWRue2JhY2tncm91bmQtY29sb3I6I2Q4N2E2OCFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmFkbiBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5hZG46aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZTI5ZTkxIWltcG9ydGFudH0uYml0YnVja2V0e2JhY2tncm91bmQtY29sb3I6IzIwNTA4MSFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmJpdGJ1Y2tldCBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5iaXRidWNrZXQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojMmE2OWFhIWltcG9ydGFudH0uZHJvcGJveHtiYWNrZ3JvdW5kLWNvbG9yOiMxMDg3ZGQhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS5kcm9wYm94IGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmRyb3Bib3g6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojMzA5ZmYwIWltcG9ydGFudH0uZmFjZWJvb2t7YmFja2dyb3VuZC1jb2xvcjojM2I1OTk4IWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0uZmFjZWJvb2sgaXtjb2xvcjojZmZmIWltcG9ydGFudH0uZmFjZWJvb2s6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNGM3MGJhIWltcG9ydGFudH0uZmxpY2tye2JhY2tncm91bmQtY29sb3I6I2ZmMDA4NCFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmZsaWNrciBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5mbGlja3I6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZmYzMzlkIWltcG9ydGFudH0uZm91cnNxdWFyZXtiYWNrZ3JvdW5kLWNvbG9yOiNmOTQ4NzchaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS5mb3Vyc3F1YXJlIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmZvdXJzcXVhcmU6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZmI3OTljIWltcG9ydGFudH0uZ2l0aHVie2JhY2tncm91bmQtY29sb3I6IzQ0NCFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmdpdGh1YiBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5naXRodWI6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNWU1ZTVlIWltcG9ydGFudH0uaW5zdGFncmFte2JhY2tncm91bmQtY29sb3I6IzQwNWRlNiFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9Lmluc3RhZ3JhbSBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5pbnN0YWdyYW06aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNmQ4M2VjIWltcG9ydGFudH0ubGlua2VkaW57YmFja2dyb3VuZC1jb2xvcjojMDA3YmI2IWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0ubGlua2VkaW4gaXtjb2xvcjojZmZmIWltcG9ydGFudH0ubGlua2VkaW46aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojMDA5ZGU5IWltcG9ydGFudH0ubWljcm9zb2Z0e2JhY2tncm91bmQtY29sb3I6IzI2NzJlYyFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9Lm1pY3Jvc29mdCBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5taWNyb3NvZnQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNTU5MGYwIWltcG9ydGFudH0ud2luZG93c3tiYWNrZ3JvdW5kLWNvbG9yOiMyNjcyZWMhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS53aW5kb3dzIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LndpbmRvd3M6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNTU5MGYwIWltcG9ydGFudH0ub2Rub2tsYXNzbmlraXtiYWNrZ3JvdW5kLWNvbG9yOiNmNDczMWMhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS5vZG5va2xhc3NuaWtpIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9Lm9kbm9rbGFzc25pa2k6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZjY5MTRkIWltcG9ydGFudH0ub3Blbmlke2JhY2tncm91bmQtY29sb3I6I2Y3OTMxZSFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9Lm9wZW5pZCBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5vcGVuaWQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZjlhYjRmIWltcG9ydGFudH0ucGludGVyZXN0e2JhY2tncm91bmQtY29sb3I6I2NiMjAyNyFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LnBpbnRlcmVzdCBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5waW50ZXJlc3Q6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZTAzZTQ0IWltcG9ydGFudH0ucmVkZGl0e2JhY2tncm91bmQtY29sb3I6I2VmZjdmZiFpbXBvcnRhbnQ7Y29sb3I6IzAwMCFpbXBvcnRhbnR9LnJlZGRpdCBpe2NvbG9yOiMwMDAhaW1wb3J0YW50fS5yZWRkaXQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZmZmIWltcG9ydGFudH0uc291bmRjbG91ZHtiYWNrZ3JvdW5kLWNvbG9yOiNmNTAhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS5zb3VuZGNsb3VkIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LnNvdW5kY2xvdWQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZjczIWltcG9ydGFudH0udHVtYmxye2JhY2tncm91bmQtY29sb3I6IzJjNDc2MiFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LnR1bWJsciBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS50dW1ibHI6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojM2M2MTg1IWltcG9ydGFudH0udHdpdHRlcntiYWNrZ3JvdW5kLWNvbG9yOiM1NWFjZWUhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS50d2l0dGVyIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LnR3aXR0ZXI6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojODNjM2YzIWltcG9ydGFudH0udmltZW97YmFja2dyb3VuZC1jb2xvcjojMWFiN2VhIWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0udmltZW8gaXtjb2xvcjojZmZmIWltcG9ydGFudH0udmltZW86aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNDljNmVlIWltcG9ydGFudH0udmt7YmFja2dyb3VuZC1jb2xvcjojNTg3ZWEzIWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0udmsgaXtjb2xvcjojZmZmIWltcG9ydGFudH0udms6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNzg5N2I2IWltcG9ydGFudH0ueWFob297YmFja2dyb3VuZC1jb2xvcjojNzIwZTllIWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0ueWFob28gaXtjb2xvcjojZmZmIWltcG9ydGFudH0ueWFob286aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojOTQxMmNkIWltcG9ydGFudH0uZ29vZ2xlLmxpZ2h0e2JhY2tncm91bmQtY29sb3I6I2ZmZiFpbXBvcnRhbnQ7Y29sb3I6IzVmNjM2OCFpbXBvcnRhbnR9Lmdvb2dsZS5saWdodCBpe2NvbG9yOiM1ZjYzNjghaW1wb3J0YW50fS5nb29nbGUubGlnaHQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZmZmIWltcG9ydGFudH0uZ29vZ2xlLmRhcmt7YmFja2dyb3VuZC1jb2xvcjojNDI4NWY0IWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0uZ29vZ2xlLmRhcmsgaXtjb2xvcjojZmZmIWltcG9ydGFudH0uZ29vZ2xlLmRhcms6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNzJhNGY3IWltcG9ydGFudH0uZ29vZ2xlLmRhcmsgLmNhbC1iZy1pY29ue2JhY2tncm91bmQ6I2ZmZn1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9naW5Gb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveVxyXG57XHJcbiAgcHVibGljICAgIGZvcm1MYXlvdXRzICAgIDogYW55O1xyXG4gIHB1YmxpYyAgICB0aGVtZSAgICAgICAgICA6IHN0cmluZztcclxuXHJcbiAgcHVibGljICAgIHVzclBvbGljeSAgICAgIDogc3RyaW5nO1xyXG4gIHB1YmxpYyAgICBwd2RQb2xpY2llcyAgICA6IGFueTtcclxuXHJcbiAgcHVibGljICAgIGljb25zICAgICAgICAgIDogYW55O1xyXG4gIHB1YmxpYyAgICBidXR0b25zICAgICAgICA6IGFueTtcclxuICBwdWJsaWMgICAgaW5wdXRzICAgICAgICAgOiBhbnk7XHJcbiAgcHVibGljICAgIGVycm9ycyAgICAgICAgIDogYW55O1xyXG4gIHB1YmxpYyAgICBsYWJlbHMgICAgICAgICA6IGFueTtcclxuXHJcbiAgLy8gRGlzcGxheSBsb2dpbiBmb3JtIGluc2lkZSBhIGNvbnRhaW5lclxyXG4gIEBJbnB1dCgpICBmaXhlZFdpZHRoICAgICAgICA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAvLyBEaXNwbGF5IGxvZ2luIGZvcm0gbGlrZSBHb29nbGUgJiBNaWNyb3NvZnQgKHN0ZXAgYnkgc3RlcClcclxuICBASW5wdXQoKSAgZ29vZ2xlU3R5bGUgICAgICAgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgLy8gRGlzcGxheSBHb29nbGUgYnV0dG9uIHdpdGggdGhlIHN1cHBsaWVkIHRoZW1lIDogbGlnaHQgLyBkYXJrXHJcbiAgQElucHV0KCkgIGdvb2dsZVRoZW1lICAgICAgIDogc3RyaW5nICA9IG51bGw7XHJcbiAgLy8gRGlzcGxheSBmb3JtcyBpbnNpZGUgYSBsYXlvdXQgOiB0YWIgKGJ5IGRlZmF1bHQpIC8gbW9kYWwgLyBpbmxpbmVcclxuICAvLyBUaGUgaW5saW5lIGxheW91dCBpcyBvbmx5IGF2YWlsYWJsZSBmb3IgdGhlIE1GQSBmb3JtXHJcbiAgQElucHV0KCkgIGN1c3RvbUZvcm1MYXlvdXRzIDogYW55O1xyXG5cclxuICAvLyBPcHRpb25hbCBwb2xpY3kgYXBwbGllZCBvbiB0aGUgdXNlcm5hbWUgaW5wdXQgOiBlbWFpbCAvIHBob25lIC8gcmVnZXhcclxuICAvLyBCZSBjYXJlZnVsLCB5b3UgbXVzdCBkb3VibGUgYWxsIHRoZSBiYWNrc2xhc2hlcyB1c2VkIGluIHRoZSBzdXBwbGllZCByZWdleFxyXG4gIEBJbnB1dCgpICBjdXN0b21Vc3JQb2xpY3kgICA6IHN0cmluZyA9IG51bGw7XHJcbiAgLy8gUG9saWNpZXMgYXBwbGllZCBvbiB0aGUgcGFzc3dvcmQgaW5wdXRcclxuICBASW5wdXQoKSAgY3VzdG9tUHdkUG9saWNpZXMgOiBhbnk7XHJcblxyXG4gIC8vIERpc2xheSBpY29uIGluc2lkZSBpbnB1dHMgb24gdGhlIGxvZ2luIGZvcm1cclxuICBASW5wdXQoKSAgY3VzdG9tSWNvbnMgICA6IGFueTtcclxuXHJcbiAgLy8gRGlzcGxheSBidXR0b25zIHdpdGggZXZlbnRzXHJcbiAgQElucHV0KCkgIGN1c3RvbUJ1dHRvbnMgOiBhbnk7XHJcblxyXG4gIC8vIERpc3BsYXkgY2xlYXIgJiBzaG93L2hpZGUgYnV0dG9ucyBpbnNpZGUgaW5wdXRzXHJcbiAgQElucHV0KCkgIGN1c3RvbUlucHV0cyAgOiBhbnk7XHJcblxyXG4gIC8vIERpc3BsYXkgZXJyb3IgbWVzc2FnZXNcclxuICBASW5wdXQoKSAgY3VzdG9tRXJyb3JzICA6IGFueTtcclxuXHJcbiAgLy8gTGFiZWxzXHJcbiAgQElucHV0KCkgIGN1c3RvbUxhYmVscyAgOiBhbnk7XHJcblxyXG4gIC8vIEV2ZW50IHRyaWdnZXJlZCBhZnRlciBjcmVhdGluZyB0aGUgbG9naW4gZm9ybSAoQWZ0ZXJWaWV3SW5pdClcclxuICBAT3V0cHV0KCkgaW5pdGlhbGl6ZWQgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8vIEV2ZW50IHRyaWdnZXJlZCBhZnRlciBjbGlja2luZyBvbiB0aGUgc2lnbiB1cCBidXR0b24uXHJcbiAgQE91dHB1dCgpIHNpZ25VcCAgICAgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvLyBFdmVudCBvYmplY3QgY29udGFpbmluZyB1c2VybmFtZSBhbmQgcGFzc3dvcmQgcHJvcGVydGllc1xyXG4gIEBPdXRwdXQoKSBsb2dpbiAgICAgICAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLy8gRXZlbnQgb2JqZWN0IGNvbnRhaW5pbmcgdXNlcm5hbWUsIHBhc3N3b3JkIGFuZCBzb2NpYWwgcHJvcGVydGllc1xyXG4gIEBPdXRwdXQoKSBsb2dpblNvY2lhbCAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLy8gRXZlbnQgb2JqZWN0IGNvbnRhaW5pbmcgdXNlcm5hbWUgcHJvcGVydHlcclxuICBAT3V0cHV0KCkgZm9yZ290UHdkICAgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8vIEV2ZW50IG9iamVjdCBjb250YWluaW5nIHBhc3N3b3JkIGFuZCBjb2RlIHByb3BlcnRpZXNcclxuICBAT3V0cHV0KCkgc2VuZFJlc2V0UHdkICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8vIEV2ZW50IG9iamVjdCBjb250YWluaW5nIHBhc3N3b3JkIHByb3BlcnR5XHJcbiAgQE91dHB1dCgpIHNlbmRGaXJzdFB3ZCAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvLyBFdmVudCBvYmplY3QgY29udGFpbmluZyBjb2RlIHByb3BlcnR5XHJcbiAgQE91dHB1dCgpIHNhdmVNZmFLZXkgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvLyBFdmVudCBvYmplY3QgY29udGFpbmluZyBjb2RlIHByb3BlcnR5XHJcbiAgQE91dHB1dCgpIHNlbmRNZmFDb2RlICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvLyBFdmVudCBvYmplY3QgY29udGFpbmluZyB1c2VybmFtZSBwcm9wZXJ0eVxyXG4gIEBPdXRwdXQoKSBzdGVwVXNyICAgICAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLy8gRXZlbnQgb2JqZWN0IGNvbnRhaW5pbmcgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIHByb3BlcnR5XHJcbiAgQE91dHB1dCgpIHN0ZXBQd2QgICAgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLy8gTk9URTogRm9ybVxyXG4gIHB1YmxpYyAgICBmb3JtR3JvdXAgICAgIDogRm9ybUdyb3VwO1xyXG4gIHB1YmxpYyAgICBzaG93UGFzc3dvcmQgIDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyAgICBmb3JtVHlwZSAgICAgIDogc3RyaW5nO1xyXG4gIHB1YmxpYyAgICB1c2VyUG9saWNpZXMgPSBVc2VyUG9saWNpZXM7XHJcbiAgcHVibGljICAgIGZvcm1zID0gRm9ybXM7XHJcblxyXG4gIC8vIE5PVEU6IFBhc3N3b3JkXHJcbiAgcHVibGljICAgIGlzRmlyc3QgICAgICAgOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8vIE5PVEU6IE1GQVxyXG4gIHB1YmxpYyAgICBjb2RlICAgICAgICAgIDogc3RyaW5nICA9IG51bGw7XHJcbiAgcHVibGljICAgIHFyQ29kZSAgICAgICAgOiBzdHJpbmcgID0gbnVsbDtcclxuXHJcbiAgLy8gTk9URTogU3RlcHNcclxuICBwdWJsaWMgICAgdXNyRm9ybUdyb3VwICA6IEZvcm1Hcm91cDtcclxuICBwdWJsaWMgICAgcHdkRm9ybUdyb3VwICA6IEZvcm1Hcm91cDtcclxuICBwdWJsaWMgICAgdXNlckluZm8gICAgICA6IHN0cmluZyAgPSBudWxsO1xyXG4gIHB1YmxpYyAgICB1c2VySW1hZ2UgICAgIDogc3RyaW5nICA9IG51bGw7XHJcblxyXG4gIC8vIE5PVEU6IFdyYXBwZXJcclxuICBwdWJsaWMgICAgbGF5b3V0cyA9IExheW91dHM7XHJcbiAgcHVibGljICAgIHNlbGVjdGVkVGFiICAgICA6IG51bWJlciA9IDA7XHJcbiAgcHVibGljICAgIGNsb3NlTW9kYWxFdmVudCA6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgcHJpdmF0ZSAgIG1vZGFsRmlyc3RTdWIgICAgICAgOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSAgIG1vZGFsTG9zdFN1YiAgICAgICAgOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSAgIG1vZGFsU2F2ZU1mYUtleVN1YiAgOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSAgIG1vZGFsU2VuZE1mYUNvZGVTdWIgOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8vIFRPRE86IENhcHRjaGFcclxuICAvLyBASW5wdXQoKSAgcmVtZW1iZXJNZSAgICA6IGJvb2xlYW4gPSB0cnVlOyAvLyBUT0RPOiBjaGVjayBib3hcclxuXHJcbiAgY29uc3RydWN0b3JcclxuICAoXHJcbiAgICBwdWJsaWMgIGRpYWxvZyAgICAgICA6IE1hdERpYWxvZyxcclxuICAgIHB1YmxpYyAgc2FuaXRpemVyICAgIDogRG9tU2FuaXRpemVyLFxyXG4gICAgcHVibGljICBpY29uUmVnaXN0cnkgOiBNYXRJY29uUmVnaXN0cnksXHJcbiAgICBwcml2YXRlIGJ1aWxkZXIgICAgICA6IEZvcm1CdWlsZGVyXHJcbiAgKVxyXG4gIHtcclxuICAgIC8vIFNvY2lhbCBpY29uc1xyXG4gICAgLy8gVE9ETzogRml4IEFuZ3VsYXIgNiBMaWJyYXJ5IGFzc2V0cyA6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXItY2xpL2lzc3Vlcy8xMTA3MVxyXG4gICAgaWNvblJlZ2lzdHJ5LmFkZFN2Z0ljb24oJ2dvb2dsZScsICAgc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCgnLi4vYXNzZXRzL2ltZy9nb29nbGUuc3ZnJykpO1xyXG4gICAgaWNvblJlZ2lzdHJ5LmFkZFN2Z0ljb24oJ2ZhY2Vib29rJywgc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCgnLi4vYXNzZXRzL2ltZy9mYWNlYm9vay5zdmcnKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKSA6IHZvaWRcclxuICB7XHJcbiAgICAvLyBMb2dpbiBmb3JtXHJcbiAgICB0aGlzLmluaXRGb3JtR3JvdXBzKCk7XHJcbiAgICAvLyBTdHlsZSAoY29udGFpbmVyLCBzdGVwLCB0aGVtZSAmIGxheW91dClcclxuICAgIHRoaXMuaW5pdEZvcm1MYXlvdXRzKCk7XHJcbiAgICB0aGlzLmluaXRUaGVtZSgpO1xyXG5cclxuICAgIHRoaXMuaW5pdFBvbGljaWVzKCk7XHJcbiAgICB0aGlzLmluaXRJY29ucygpO1xyXG4gICAgdGhpcy5pbml0QnV0dG9ucygpO1xyXG4gICAgdGhpcy5pbml0SW5wdXRzKCk7XHJcbiAgICB0aGlzLmluaXRFcnJvcnMoKTtcclxuICAgIHRoaXMuaW5pdExhYmVscygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZWQuZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXMgOiBTaW1wbGVDaGFuZ2VzKSA6IHZvaWRcclxuICB7XHJcbiAgICBpZihjaGFuZ2VzLmdvb2dsZVN0eWxlKVxyXG4gICAgICB0aGlzLmluaXRGb3JtR3JvdXBzKCk7XHJcbiAgICBpZihjaGFuZ2VzLmN1c3RvbUZvcm1MYXlvdXRzKVxyXG4gICAgICB0aGlzLmluaXRGb3JtTGF5b3V0cygpO1xyXG4gICAgaWYoY2hhbmdlcy5nb29nbGVUaGVtZSlcclxuICAgICAgdGhpcy5pbml0VGhlbWUoKTtcclxuXHJcbiAgICBpZihjaGFuZ2VzLmN1c3RvbVB3ZFBvbGljaWVzIHx8IGNoYW5nZXMuY3VzdG9tVXNyUG9saWN5KVxyXG4gICAgICB0aGlzLmluaXRQb2xpY2llcygpO1xyXG4gICAgaWYoY2hhbmdlcy5jdXN0b21JY29ucylcclxuICAgICAgdGhpcy5pbml0SWNvbnMoKTtcclxuICAgIGlmKGNoYW5nZXMuY3VzdG9tQnV0dG9ucylcclxuICAgICAgdGhpcy5pbml0QnV0dG9ucygpO1xyXG4gICAgaWYoY2hhbmdlcy5jdXN0b21JbnB1dHMpXHJcbiAgICAgIHRoaXMuaW5pdElucHV0cygpO1xyXG4gICAgaWYoY2hhbmdlcy5jdXN0b21FcnJvcnMpXHJcbiAgICAgIHRoaXMuaW5pdEVycm9ycygpO1xyXG4gICAgaWYoY2hhbmdlcy5jdXN0b21MYWJlbHMpXHJcbiAgICAgIHRoaXMuaW5pdExhYmVscygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCkgOiB2b2lkXHJcbiAge1xyXG4gICAgaWYodGhpcy5tb2RhbEZpcnN0U3ViKVxyXG4gICAgICB0aGlzLm1vZGFsRmlyc3RTdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIGlmKHRoaXMubW9kYWxMb3N0U3ViKVxyXG4gICAgICB0aGlzLm1vZGFsTG9zdFN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgaWYodGhpcy5tb2RhbFNhdmVNZmFLZXlTdWIpXHJcbiAgICAgIHRoaXMubW9kYWxTYXZlTWZhS2V5U3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICBpZih0aGlzLm1vZGFsU2VuZE1mYUNvZGVTdWIpXHJcbiAgICAgIHRoaXMubW9kYWxTZW5kTWZhQ29kZVN1Yi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5PVEU6IEV2ZW50IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8vIE5PVEU6IEZyb20gY29tcG9uZW50IHRvIHVzZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLyoqIEVtaXQgYCRldmVudGAgb2JqZWN0IGNvbnRhaW5pbmcgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIHByb3BlcnRpZXMuXHJcbiAgKlxyXG4gICogQGV4YW1wbGVcclxuICAqIHZhciB1c2VybmFtZSA6IHN0cmluZyA9ICRldmVudC51c2VybmFtZTtcclxuICAqIHZhciBwYXNzd29yZCA6IHN0cmluZyA9ICRldmVudC5wYXNzd29yZDtcclxuICAqL1xyXG4gIHB1YmxpYyBvbkNsaWNrTG9naW4oKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZXZlbnQgOiBhbnkgPSB7fTtcclxuICAgIGV2ZW50ID0gdGhpcy5nZXRFdmVudFJlc3BvbnNlKCk7XHJcbiAgICB0aGlzLmxvZ2luLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEVtaXQgYCRldmVudGAgb2JqZWN0IGNvbnRhaW5pbmcgdXNlcm5hbWUsIHBhc3N3b3JkIGFuZCBzb2NpYWwgcHJvcGVydGllcy5cclxuICAqXHJcbiAgKiBAcGFyYW0gc29jaWFsIE5hbWUgb2YgdGhlIHNvY2lhbCBwcm92aWRlclxyXG4gICogQGV4YW1wbGVcclxuICAqIHZhciB1c2VybmFtZSA6IHN0cmluZyA9ICRldmVudC51c2VybmFtZTtcclxuICAqIHZhciBwYXNzd29yZCA6IHN0cmluZyA9ICRldmVudC5wYXNzd29yZDtcclxuICAqIHZhciBzb2NpYWwgICA6IHN0cmluZyA9ICRldmVudC5zb2NpYWw7XHJcbiAgKi9cclxuICBwdWJsaWMgb25DbGlja0xvZ2luU29jaWFsKHNvY2lhbCA6IHN0cmluZykgOiB2b2lkXHJcbiAge1xyXG4gICAgbGV0IGV2ZW50IDogYW55ID0ge307XHJcbiAgICBldmVudCA9IHRoaXMuZ2V0RXZlbnRSZXNwb25zZSgpO1xyXG4gICAgZXZlbnQuc29jaWFsID0gc29jaWFsO1xyXG4gICAgdGhpcy5sb2dpblNvY2lhbC5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKiBFbWl0IGEgY2xpY2sgZXZlbnQgb24gdGhlIHNpZ24gdXAgYnV0dG9uLiAqL1xyXG4gIHB1YmxpYyBvbkNsaWNrU2lnblVwKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zaWduVXAuZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEVtaXQgYCRldmVudGAgb2JqZWN0IGNvbnRhaW5pbmcgdXNlcm5hbWUgcHJvcGVydHkuXHJcbiAgKlxyXG4gICogQGV4YW1wbGVcclxuICAqIHZhciB1c2VybmFtZSA6IHN0cmluZyA9ICRldmVudC51c2VybmFtZTtcclxuICAqL1xyXG4gIHB1YmxpYyBvbkNsaWNrRm9yZ290UGFzc3dvcmQoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZXZlbnQgOiBhbnkgPSB7fTtcclxuICAgIGV2ZW50ID0gdGhpcy5nZXRFdmVudFJlc3BvbnNlKCd1c3InKTtcclxuICAgIHRoaXMuZm9yZ290UHdkLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLy8gTk9URTogRnJvbSB1c2VyIHRvIGNvbXBvbmVudCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKiogU2hvdyBwYXNzd29yZCBmb3JtIGVpdGhlciB0byBpbml0aWFsaXplIGZpcnN0IHBhc3N3b3JkIG9yIHRvIHJlc2V0IGZvcmdvdCBwYXNzd29yZC5cclxuICAqXHJcbiAgKiBAcGFyYW0gaXNGaXJzdCBJbml0aWFsaXplIGZpcnN0IHBhc3N3b3JkIG9yIHJlc2V0IGZvcmdvdCBwYXNzd29yZFxyXG4gICovXHJcbiAgcHVibGljIHNob3dQd2RGb3JtKGlzRmlyc3QgOiBib29sZWFuKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmlzRmlyc3QgID0gaXNGaXJzdDtcclxuICAgIHRoaXMuZm9ybVR5cGUgPSBGb3Jtcy5QV0Q7XHJcbiAgICB0aGlzLnNob3dMYXlvdXQodGhpcy5mb3JtTGF5b3V0cy5wd2QpO1xyXG4gIH1cclxuXHJcbiAgLyoqIFNob3cgTUZBIHNldHVwIGZvcm0gdG8gaW5pdGlhbGl6ZSBmaXJzdCBUT1RQIChUaW1lLWJhc2VkIE9uZS10aW1lIFBhc3N3b3JkKS5cclxuICAqXHJcbiAgKiBAcGFyYW0gY29kZSAgIFxyXG4gICogQHBhcmFtIHFyQ29kZSBcclxuICAqL1xyXG4gIHB1YmxpYyBzaG93TWZhU2V0dXBGb3JtKGNvZGUgOiBzdHJpbmcsIHFyQ29kZSA6IHN0cmluZykgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5jb2RlICAgICA9IGNvZGU7XHJcbiAgICB0aGlzLnFyQ29kZSAgID0gcXJDb2RlO1xyXG4gICAgdGhpcy5mb3JtVHlwZSA9IEZvcm1zLk1GQV9TRVRVUDtcclxuICAgIHRoaXMuc2hvd0xheW91dCh0aGlzLmZvcm1MYXlvdXRzLm1mYVNldHVwKTtcclxuICB9XHJcblxyXG4gIC8qKiBTaG93IE1GQSBmb3JtIHRvIGdldCB2ZXJpZmljYXRpb24gY29kZS4gKi9cclxuICBwdWJsaWMgc2hvd01mYUZvcm0oKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmZvcm1UeXBlID0gRm9ybXMuTUZBO1xyXG4gICAgdGhpcy5zaG93TGF5b3V0KHRoaXMuZm9ybUxheW91dHMubWZhKTtcclxuICB9XHJcblxyXG4gIC8qKiBIaWRlIHBhc3N3b3JkIGZvcm0uICovXHJcbiAgcHVibGljIGhpZGVQd2RGb3JtKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5jbG9zZUxheW91dCh0aGlzLmZvcm1MYXlvdXRzLnBhc3N3b3JkKTtcclxuICB9XHJcblxyXG4gIC8qKiBIaWRlIE1GQSBzZXR1cCBmb3JtLiAqL1xyXG4gIHB1YmxpYyBoaWRlTWZhU2V0dXBGb3JtKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5jbG9zZUxheW91dCh0aGlzLmZvcm1MYXlvdXRzLm1mYVNldHVwKTtcclxuICB9XHJcblxyXG4gIC8qKiBIaWRlIE1GQSBmb3JtLiAqL1xyXG4gIHB1YmxpYyBoaWRlTWZhRm9ybSgpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuY2xvc2VMYXlvdXQodGhpcy5mb3JtTGF5b3V0cy5tZmEpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdvIHBhc3N3b3JkIHN0ZXAuICovXHJcbiAgcHVibGljIHNob3dQd2RTdGVwKHVzZXJJbmZvIDogc3RyaW5nID0gbnVsbCwgdXNlckltYWdlIDogc3RyaW5nID0gbnVsbCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy51c2VySW5mbyAgICA9IHVzZXJJbmZvO1xyXG4gICAgdGhpcy51c2VySW1hZ2UgICA9IHVzZXJJbWFnZTtcclxuICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSAyO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5PVEU6IFN0ZXBzIGV2ZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIHB1YmxpYyBvbkNsaWNrTmV4dFN0ZXAoY3VycmVudFN0ZXAgOiBudW1iZXIpIDogdm9pZFxyXG4gIHtcclxuICAgIHN3aXRjaChjdXJyZW50U3RlcClcclxuICAgIHtcclxuICAgICAgY2FzZSAwIDpcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxIDogLy8gVXNlcm5hbWVcclxuICAgICAgICBsZXQgZXZlbnRVc3IgOiBhbnkgPSBudWxsO1xyXG4gICAgICAgIGV2ZW50VXNyID0gdGhpcy5nZXRFdmVudFJlc3BvbnNlKCd1c3InKTtcclxuICAgICAgICB0aGlzLnN0ZXBVc3IuZW1pdChldmVudFVzcik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMiA6IC8vIFBhc3N3b3JkXHJcbiAgICAgICAgbGV0IGV2ZW50UHdkIDogYW55ID0gbnVsbDtcclxuICAgICAgICBldmVudFB3ZCA9IHRoaXMuZ2V0RXZlbnRSZXNwb25zZSgpO1xyXG4gICAgICAgIHRoaXMuc3RlcFB3ZC5lbWl0KGV2ZW50UHdkKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkNsaWNrUHJldlN0ZXAoY3VycmVudFN0ZXAgOiBudW1iZXIpIDogdm9pZFxyXG4gIHtcclxuICAgIHN3aXRjaChjdXJyZW50U3RlcClcclxuICAgIHtcclxuICAgICAgY2FzZSAwIDpcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxIDogLy8gVXNlcm5hbWVcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gMDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyIDogLy8gUGFzc3dvcmRcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBOT1RFOiBUYWIgZXZlbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKiogRW1pdCBgJGV2ZW50YCBvYmplY3QgY29udGFpbmluZyBwYXNzd29yZCBwcm9wZXJ0eS5cclxuICAqXHJcbiAgKiBAZXhhbXBsZVxyXG4gICogdmFyIG5ld1Bhc3N3b3JkIDogc3RyaW5nID0gJGV2ZW50LnBhc3N3b3JkO1xyXG4gICovXHJcbiAgcHVibGljIHRhYkZpcnN0TG9nKCRldmVudCA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zZW5kRmlyc3RQd2QuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEVtaXQgYCRldmVudGAgb2JqZWN0IGNvbnRhaW5pbmcgcGFzc3dvcmQgYW5kIGNvZGUgcHJvcGVydGllcy5cclxuICAqXHJcbiAgKiBAZXhhbXBsZVxyXG4gICogdmFyIG5ld1Bhc3N3b3JkICAgICAgOiBzdHJpbmcgPSAkZXZlbnQucGFzc3dvcmQ7XHJcbiAgKiB2YXIgdmVyaWZpY2F0aW9uQ29kZSA6IHN0cmluZyA9ICRldmVudC5jb2RlO1xyXG4gICovXHJcbiAgcHVibGljIHRhYkxvc3RQd2QoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnNlbmRSZXNldFB3ZC5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKiogRW1pdCBgJGV2ZW50YCBvYmplY3QgY29udGFpbmluZyBjb2RlIHByb3BlcnR5LlxyXG4gICpcclxuICAqIEBleGFtcGxlXHJcbiAgKiB2YXIgdmVyaWZpY2F0aW9uQ29kZSA6IHN0cmluZyA9ICRldmVudC5jb2RlO1xyXG4gICovXHJcbiAgcHVibGljIHRhYlNhdmVNZmFLZXkoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnNhdmVNZmFLZXkuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEVtaXQgYCRldmVudGAgb2JqZWN0IGNvbnRhaW5pbmcgY29kZSBwcm9wZXJ0eS5cclxuICAqXHJcbiAgKiBAZXhhbXBsZVxyXG4gICogdmFyIHZlcmlmaWNhdGlvbkNvZGUgOiBzdHJpbmcgPSAkZXZlbnQuY29kZTtcclxuICAqL1xyXG4gIHB1YmxpYyB0YWJTZW5kTWZhQ29kZSgkZXZlbnQgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuc2VuZE1mYUNvZGUuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5PVEU6IE1vZGFsIGV2ZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKiBFbWl0IGAkZXZlbnRgIG9iamVjdCBjb250YWluaW5nIHBhc3N3b3JkIHByb3BlcnR5LlxyXG4gICpcclxuICAqIEBleGFtcGxlXHJcbiAgKiB2YXIgbmV3UGFzc3dvcmQgOiBzdHJpbmcgPSAkZXZlbnQucGFzc3dvcmQ7XHJcbiAgKi9cclxuICBwdWJsaWMgbW9kYWxGaXJzdExvZyhkaWFsb2dSZWYgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMubW9kYWxGaXJzdFN1YiA9IGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5yZWxheUZpcnN0TG9nLnN1YnNjcmliZSgoZXZlbnQpID0+XHJcbiAgICB7XHJcbiAgICAgIHRoaXMuc2VuZEZpcnN0UHdkLmVtaXQoZXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogRW1pdCBgJGV2ZW50YCBvYmplY3QgY29udGFpbmluZyBwYXNzd29yZCBhbmQgY29kZSBwcm9wZXJ0aWVzLlxyXG4gICpcclxuICAqIEBleGFtcGxlXHJcbiAgKiB2YXIgbmV3UGFzc3dvcmQgICAgICA6IHN0cmluZyA9ICRldmVudC5wYXNzd29yZDtcclxuICAqIHZhciB2ZXJpZmljYXRpb25Db2RlIDogc3RyaW5nID0gJGV2ZW50LmNvZGU7XHJcbiAgKi9cclxuICBwdWJsaWMgbW9kYWxMb3N0UHdkKGRpYWxvZ1JlZiA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5tb2RhbExvc3RTdWIgPSBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UucmVsYXlMb3N0UHdkLnN1YnNjcmliZSgoZXZlbnQpID0+XHJcbiAgICB7XHJcbiAgICAgIHRoaXMuc2VuZFJlc2V0UHdkLmVtaXQoZXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogRW1pdCBgJGV2ZW50YCBvYmplY3QgY29udGFpbmluZyBjb2RlIHByb3BlcnR5LlxyXG4gICpcclxuICAqIEBleGFtcGxlXHJcbiAgKiB2YXIgdmVyaWZpY2F0aW9uQ29kZSA6IHN0cmluZyA9ICRldmVudC5jb2RlO1xyXG4gICovXHJcbiAgcHVibGljIG1vZGFsU2F2ZU1mYUtleShkaWFsb2dSZWYgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMubW9kYWxTYXZlTWZhS2V5U3ViID0gZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnJlbGF5U2F2ZU1mYUtleS5zdWJzY3JpYmUoKGV2ZW50KSA9PlxyXG4gICAge1xyXG4gICAgICB0aGlzLnNhdmVNZmFLZXkuZW1pdChldmVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBFbWl0IGAkZXZlbnRgIG9iamVjdCBjb250YWluaW5nIGNvZGUgcHJvcGVydHkuXHJcbiAgKlxyXG4gICogQGV4YW1wbGVcclxuICAqIHZhciB2ZXJpZmljYXRpb25Db2RlIDogc3RyaW5nID0gJGV2ZW50LmNvZGU7XHJcbiAgKi9cclxuICBwdWJsaWMgbW9kYWxTZW5kTWZhQ29kZShkaWFsb2dSZWYgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMubW9kYWxTZW5kTWZhQ29kZVN1YiA9IGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5yZWxheVNlbmRNZmFDb2RlLnN1YnNjcmliZSgoZXZlbnQpID0+XHJcbiAgICB7XHJcbiAgICAgIHRoaXMuc2VuZE1mYUNvZGUuZW1pdChldmVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBOT1RFOiBUYWIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBwdWJsaWMgb25DbGlja0Nsb3NlVGFiKCRldmVudCA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5jbG9zZVRhYigpO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5PVEU6IE1vZGFsIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIHByaXZhdGUgb3Blbk1vZGFsKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgbGV0IHBhcmFtcyA6IGFueSA9IHtcclxuICAgICAgLy8gQ29tbW9uXHJcbiAgICAgIGZvcm1UeXBlICAgICAgICAgICAgICA6IHRoaXMuZm9ybVR5cGUsXHJcbiAgICAgIGxhYmVscyAgICAgICAgICAgICAgICA6IHRoaXMubGFiZWxzLFxyXG4gICAgICBjbG9zZUV2ZW50ICAgICAgICAgICAgOiB0aGlzLmNsb3NlTW9kYWxFdmVudCxcclxuICAgICAgZXJyb3JzICAgICAgICAgICAgICAgIDogdGhpcy5lcnJvcnMsXHJcbiAgICAgIGlucHV0cyAgICAgICAgICAgICAgICA6IHRoaXMuaW5wdXRzLFxyXG4gICAgICAvLyBQYXNzd29yZCBmb3JtXHJcbiAgICAgIGlzRmlyc3QgICAgICAgICAgICAgICA6IHRoaXMuaXNGaXJzdCxcclxuICAgICAgcHdkUG9saWNpZXMgICAgICAgICAgIDogdGhpcy5wd2RQb2xpY2llcyxcclxuICAgICAgLy8gTWZhIGZvcm1cclxuICAgICAgY29kZSAgICAgICAgICAgICAgICAgIDogdGhpcy5jb2RlLFxyXG4gICAgICBxckNvZGUgICAgICAgICAgICAgICAgOiB0aGlzLnFyQ29kZVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihNb2RhbFdyYXBwZXJDb21wb25lbnQsIHsgZGF0YSA6IHBhcmFtcyB9KTtcclxuXHJcbiAgICBpZih0aGlzLmZvcm1UeXBlID09PSBGb3Jtcy5QV0QpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMubW9kYWxGaXJzdExvZyhkaWFsb2dSZWYpO1xyXG4gICAgICB0aGlzLm1vZGFsTG9zdFB3ZChkaWFsb2dSZWYpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHRoaXMuZm9ybVR5cGUgPT09IEZvcm1zLk1GQV9TRVRVUClcclxuICAgICAgdGhpcy5tb2RhbFNhdmVNZmFLZXkoZGlhbG9nUmVmKTtcclxuXHJcbiAgICBpZih0aGlzLmZvcm1UeXBlID09PSBGb3Jtcy5NRkEpXHJcbiAgICAgIHRoaXMubW9kYWxTZW5kTWZhQ29kZShkaWFsb2dSZWYpO1xyXG5cclxuICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT5cclxuICAgIHtcclxuICAgICAgdGhpcy5mb3JtVHlwZSA9IG51bGw7XHJcbiAgICAgIGlmKHJlc3VsdClcclxuICAgICAgICB0aGlzLmZvcm1Hcm91cC5jb250cm9scy5wYXNzd29yZC5zZXRWYWx1ZShyZXN1bHQpOyAvLyBTZXQgcGFzc3dvcmRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5PVEU6IFByaXZhdGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIHByaXZhdGUgc2hvd0xheW91dChmb3JtTGF5b3V0IDogc3RyaW5nKSA6IHZvaWRcclxuICB7XHJcbiAgICBzd2l0Y2goZm9ybUxheW91dClcclxuICAgIHtcclxuICAgICAgY2FzZSBMYXlvdXRzLlRBQiAgICA6XHJcbiAgICAgICAgdGhpcy5vcGVuVGFiKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgTGF5b3V0cy5NT0RBTCAgOlxyXG4gICAgICAgIHRoaXMub3Blbk1vZGFsKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgTGF5b3V0cy5JTkxJTkUgOlxyXG4gICAgICAgIHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzLnVzZXJuYW1lLmRpc2FibGUoKTtcclxuICAgICAgICB0aGlzLmZvcm1Hcm91cC5jb250cm9scy5wYXNzd29yZC5kaXNhYmxlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgIHRoaXMub3BlblRhYigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbG9zZUxheW91dChmb3JtTGF5b3V0IDogc3RyaW5nKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmZvcm1UeXBlID0gbnVsbDtcclxuXHJcbiAgICBzd2l0Y2goZm9ybUxheW91dClcclxuICAgIHtcclxuICAgICAgY2FzZSBMYXlvdXRzLlRBQiAgICA6XHJcbiAgICAgICAgdGhpcy5jbG9zZVRhYigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIExheW91dHMuTU9EQUwgIDpcclxuICAgICAgICB0aGlzLmNsb3NlTW9kYWwoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBMYXlvdXRzLklOTElORSA6XHJcbiAgICAgICAgdGhpcy5mb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuZW5hYmxlKCk7XHJcbiAgICAgICAgdGhpcy5mb3JtR3JvdXAuY29udHJvbHMucGFzc3dvcmQuZW5hYmxlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgIHRoaXMuY2xvc2VUYWIoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xvc2VNb2RhbCgpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuY2xvc2VNb2RhbEV2ZW50LmVtaXQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb3BlblRhYigpIDogdm9pZFxyXG4gIHtcclxuICAgIGlmKHRoaXMuZ29vZ2xlU3R5bGUpXHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSAzO1xyXG4gICAgZWxzZVxyXG4gICAgICB0aGlzLnNlbGVjdGVkVGFiID0gMTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xvc2VUYWIoKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnNlbGVjdGVkVGFiID0gMDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0RXZlbnRSZXNwb25zZShvbmx5T25lIDogc3RyaW5nID0gbnVsbCkgOiBhbnlcclxuICB7XHJcbiAgICBsZXQgZXZlbnQgICAgOiBhbnkgICAgPSB7fTtcclxuICAgIGxldCB1c2VybmFtZSA6IHN0cmluZyA9IG51bGw7XHJcbiAgICBsZXQgcGFzc3dvcmQgOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIGlmKHRoaXMuZ29vZ2xlU3R5bGUpXHJcbiAgICB7XHJcbiAgICAgIHVzZXJuYW1lID0gdGhpcy51c3JGb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUudmFsdWU7XHJcbiAgICAgIHBhc3N3b3JkID0gdGhpcy5wd2RGb3JtR3JvdXAuY29udHJvbHMucGFzc3dvcmQudmFsdWU7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIHVzZXJuYW1lID0gdGhpcy5mb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUudmFsdWU7XHJcbiAgICAgIHBhc3N3b3JkID0gdGhpcy5mb3JtR3JvdXAuY29udHJvbHMucGFzc3dvcmQudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIW9ubHlPbmUpXHJcbiAgICB7XHJcbiAgICAgIGV2ZW50LnVzZXJuYW1lID0gdXNlcm5hbWU7XHJcbiAgICAgIGV2ZW50LnBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcbiAgICB9XHJcbiAgICBpZihvbmx5T25lICYmIG9ubHlPbmUgPT09ICd1c3InKVxyXG4gICAgICBldmVudC51c2VybmFtZSA9IHVzZXJuYW1lO1xyXG4gICAgaWYob25seU9uZSAmJiBvbmx5T25lID09PSAncHdkJylcclxuICAgICAgZXZlbnQucGFzc3dvcmQgPSBwYXNzd29yZDtcclxuXHJcbiAgICByZXR1cm4gZXZlbnQ7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gTk9URTogSW5pdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgcHJpdmF0ZSBpbml0Rm9ybUxheW91dHMoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZGVmYXVsdEZvcm1MYXlvdXRzIDogYW55ID0gbnVsbDtcclxuICAgIGxldCBmb3JtTGF5b3V0cyAgICAgICAgOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIC8vIEZvcm0gbGF5b3V0c1xyXG4gICAgZGVmYXVsdEZvcm1MYXlvdXRzID0ge1xyXG4gICAgICBwd2QgICAgICA6IExheW91dHMuVEFCLFxyXG4gICAgICBtZmFTZXR1cCA6IExheW91dHMuVEFCLFxyXG4gICAgICBtZmEgICAgICA6IExheW91dHMuVEFCLFxyXG4gICAgfTtcclxuXHJcbiAgICBmb3JtTGF5b3V0cyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdEZvcm1MYXlvdXRzLCB0aGlzLmN1c3RvbUZvcm1MYXlvdXRzKTtcclxuXHJcbiAgICAvLyBDb3JyZWN0aW9uc1xyXG4gICAgaWYoZm9ybUxheW91dHMucHdkID09PSBMYXlvdXRzLklOTElORSlcclxuICAgICAgZm9ybUxheW91dHMucHdkID0gTGF5b3V0cy5UQUI7XHJcbiAgICBpZihmb3JtTGF5b3V0cy5tZmFTZXR1cCA9PT0gTGF5b3V0cy5JTkxJTkUpXHJcbiAgICAgIGZvcm1MYXlvdXRzLm1mYVNldHVwID0gTGF5b3V0cy5UQUI7XHJcbiAgICBpZih0aGlzLmdvb2dsZVN0eWxlICYmIGZvcm1MYXlvdXRzLm1mYSA9PT0gTGF5b3V0cy5JTkxJTkUpXHJcbiAgICAgIGZvcm1MYXlvdXRzLm1mYSA9IExheW91dHMuVEFCO1xyXG5cclxuICAgIHRoaXMuZm9ybUxheW91dHMgPSBmb3JtTGF5b3V0cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFRoZW1lKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgbGV0IHRoZW1lIDogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICAvLyBUaGVtZVxyXG4gICAgc3dpdGNoKHRoaXMuZ29vZ2xlVGhlbWUpXHJcbiAgICB7XHJcbiAgICAgIGNhc2UgVGhlbWVzLkxJR0hUIDpcclxuICAgICAgICB0aGVtZSA9IHRoaXMuZ29vZ2xlVGhlbWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgVGhlbWVzLkRBUksgOlxyXG4gICAgICAgIHRoZW1lID0gdGhpcy5nb29nbGVUaGVtZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgdGhlbWUgPSBUaGVtZXMuTElHSFQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50aGVtZSA9IHRoZW1lO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0SWNvbnMoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZGVmYXVsdEljb25zIDogYW55ID0gbnVsbDtcclxuICAgIGxldCBpY29ucyAgICAgICAgOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIC8vIEljb25zXHJcbiAgICBkZWZhdWx0SWNvbnMgPSB7XHJcbiAgICAgIGljb25Vc3JPbkxvZ2luRm9ybSA6IHRydWUsXHJcbiAgICAgIGljb25Qd2RPbkxvZ2luRm9ybSA6IHRydWUsXHJcbiAgICB9O1xyXG5cclxuICAgIGljb25zID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0SWNvbnMsIHRoaXMuY3VzdG9tSWNvbnMpO1xyXG4gICAgdGhpcy5pY29ucyA9IGljb25zO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0QnV0dG9ucygpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBkZWZhdWx0QnV0b25zIDogYW55ID0gbnVsbDtcclxuICAgIGxldCBidXR0b25zICAgICAgIDogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvLyBCdXR0b25zXHJcbiAgICBkZWZhdWx0QnV0b25zID0ge1xyXG4gICAgICBmb3Jnb3RQYXNzd29yZCA6IHRydWUsXHJcbiAgICAgIHNpZ25VcCAgICAgICAgIDogdHJ1ZSxcclxuICAgICAgZ29vZ2xlICAgICAgICAgOiB0cnVlLFxyXG4gICAgICBmYWNlYm9vayAgICAgICA6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgYnV0dG9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdEJ1dG9ucywgdGhpcy5jdXN0b21CdXR0b25zKTtcclxuICAgIHRoaXMuYnV0dG9ucyA9IGJ1dHRvbnM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRJbnB1dHMoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZGVmYXVsdElucHV0cyA6IGFueSA9IG51bGw7XHJcbiAgICBsZXQgaW5wdXRzICAgICAgICA6IGFueSA9IG51bGw7XHJcblxyXG4gICAgLy8gSW5wdXRzXHJcbiAgICBkZWZhdWx0SW5wdXRzID0ge1xyXG4gICAgICBjbGVhclVzck9uTG9naW5Gb3JtIDogdHJ1ZSxcclxuICAgICAgc2hvd1B3ZE9uTG9naW5Gb3JtICA6IHRydWUsXHJcbiAgICAgIHNob3dQd2RPblB3ZEZvcm0gICAgOiB0cnVlLFxyXG4gICAgICBjbGVhckNvZGVPblB3ZEZvcm0gIDogdHJ1ZSxcclxuICAgICAgY2xlYXJDb2RlT25NZmFGb3JtICA6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgaW5wdXRzID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0SW5wdXRzLCB0aGlzLmN1c3RvbUlucHV0cyk7XHJcbiAgICB0aGlzLmlucHV0cyA9IGlucHV0cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEVycm9ycygpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBkZWZhdWx0RXJyb3JzIDogYW55ID0gbnVsbDtcclxuICAgIGxldCBlcnJvcnMgICAgICAgIDogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvLyBFcnJvcnNcclxuICAgIGRlZmF1bHRFcnJvcnMgPSB7XHJcbiAgICAgIGxvZ2luIDogdHJ1ZSxcclxuICAgICAgcHdkICAgOiB0cnVlLFxyXG4gICAgICBtZmEgICA6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgZXJyb3JzID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0RXJyb3JzLCB0aGlzLmN1c3RvbUVycm9ycyk7XHJcbiAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFBvbGljaWVzKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgLy8gTk9URTogUGFzc3dvcmRcclxuICAgIGxldCBkZWZhdWx0UHdkUG9saWNpZXMgOiBhbnkgICAgPSBudWxsO1xyXG4gICAgbGV0IHB3ZFBvbGljaWVzICAgICAgICA6IGFueSAgICA9IG51bGw7XHJcbiAgICBsZXQgZGVmYXVsdE1pbiAgICAgICAgIDogbnVtYmVyID0gODtcclxuICAgIGxldCBkZWZhdWx0TWF4ICAgICAgICAgOiBudW1iZXIgPSAxMjg7XHJcblxyXG4gICAgLy8gUGFzc3dvcmQgcG9saWNpZXNcclxuICAgIGRlZmF1bHRQd2RQb2xpY2llcyA9IHtcclxuICAgICAgcmFuZ2UgOiB7XHJcbiAgICAgICAgbWluIDogZGVmYXVsdE1pbixcclxuICAgICAgICBtYXggOiBkZWZhdWx0TWF4LFxyXG4gICAgICB9LFxyXG4gICAgICBjaGFyICAgOiB0cnVlLFxyXG4gICAgICBudW1iZXIgOiB0cnVlLFxyXG4gICAgICBsb3dlciAgOiB0cnVlLFxyXG4gICAgICB1cHBlciAgOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIHB3ZFBvbGljaWVzID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0UHdkUG9saWNpZXMsIHRoaXMuY3VzdG9tUHdkUG9saWNpZXMpO1xyXG5cclxuICAgIGlmKHB3ZFBvbGljaWVzLnJhbmdlLm1pbiA+IHB3ZFBvbGljaWVzLnJhbmdlLm1heClcclxuICAgIHtcclxuICAgICAgcHdkUG9saWNpZXMucmFuZ2UubWluID0gZGVmYXVsdE1pbjtcclxuICAgICAgcHdkUG9saWNpZXMucmFuZ2UubWF4ID0gZGVmYXVsdE1heDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnB3ZFBvbGljaWVzID0gcHdkUG9saWNpZXM7XHJcblxyXG4gICAgLy8gTk9URTogVXNlcm5hbWVcclxuICAgIGlmKCF0aGlzLmN1c3RvbVVzclBvbGljeSlcclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIGxldCB2YWxpZGF0b3JzIDogYW55ID0gW107XHJcblxyXG4gICAgc3dpdGNoKHRoaXMuY3VzdG9tVXNyUG9saWN5KVxyXG4gICAge1xyXG4gICAgICBjYXNlIFVzZXJQb2xpY2llcy5FTUFJTCA6XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFVzclZhbGlkYXRvci5lbWFpbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgVXNlclBvbGljaWVzLlBIT05FIDpcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVXNyVmFsaWRhdG9yLnBob25lKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgbGV0IHJlZ0V4cCA6IFJlZ0V4cCA9IG51bGw7XHJcbiAgICAgICAgcmVnRXhwID0gbmV3IFJlZ0V4cCh0aGlzLmN1c3RvbVVzclBvbGljeSk7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFVzclZhbGlkYXRvci5jdXN0b20ocmVnRXhwKSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xyXG4gICAgaWYodGhpcy5nb29nbGVTdHlsZSlcclxuICAgICAgdGhpcy51c3JGb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuc2V0VmFsaWRhdG9ycyh2YWxpZGF0b3JzKTtcclxuICAgIGVsc2VcclxuICAgICAgdGhpcy5mb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuc2V0VmFsaWRhdG9ycyh2YWxpZGF0b3JzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdExhYmVscygpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBkZWZhdWx0TGFiZWxzIDogYW55ID0ge307XHJcbiAgICBsZXQgbGFiZWxzICAgICAgICA6IGFueSA9IHt9O1xyXG5cclxuICAgIGRlZmF1bHRMYWJlbHMuaGVhZGVyID0ge1xyXG4gICAgICB0aXRsZVB3ZCAgICAgICAgIDogJ0xvc3QgcGFzc3dvcmQnLFxyXG4gICAgICBzdWJ0aXRsZVB3ZCAgICAgIDogJ1BsZWFzZSBlbnRlciB0aGUgY29uZmlybWF0aW9uIGNvZGUnLFxyXG4gICAgICB0aXRsZVB3ZFNldHVwICAgIDogJ1Bhc3N3b3JkIHNldHVwJyxcclxuICAgICAgc3VidGl0bGVQd2RTZXR1cCA6ICdQbGVhc2UgZW50ZXIgYSBuZXcgcGFzc3dvcmQnLFxyXG4gICAgICB0aXRsZU1mYSAgICAgICAgIDogJ01GQScsXHJcbiAgICAgIHN1YnRpdGxlTWZhICAgICAgOiAnUGxlYXNlIGVudGVyIHRoZSBjb25maXJtYXRpb24gY29kZScsXHJcbiAgICAgIHRpdGxlTWZhU2V0dXAgICAgOiAnTUZBIHNldHVwJyxcclxuICAgICAgc3VidGl0bGVNZmFTZXR1cCA6ICdTYXZlIHRoaXMgc2VjcmV0IGtleSBmb3IgZnV0dXJlIGNvbm5lY3Rpb24nXHJcbiAgICB9O1xyXG4gICAgZGVmYXVsdExhYmVscy5pbnB1dCA9IHtcclxuICAgICAgdXNlcm5hbWUgICAgOiAnVXNlcm5hbWUnLFxyXG4gICAgICBwYXNzd29yZCAgICA6ICdQYXNzd29yZCcsXHJcbiAgICAgIHZlcmlmQ29kZSAgIDogJ1ZlcmlmaWNhdGlvbiBjb2RlJyxcclxuICAgICAgbmV3UGFzc3dvcmQgOiAnTmV3IHBhc3N3b3JkJ1xyXG4gICAgfTtcclxuICAgIGRlZmF1bHRMYWJlbHMuYnV0dG9uID0ge1xyXG4gICAgICBzaWduSW4gICAgICAgICA6ICdTaWduIGluJyxcclxuICAgICAgc2lnblVwICAgICAgICAgOiAnU2lnbiB1cCcsXHJcbiAgICAgIG5leHQgICAgICAgICAgIDogJ05leHQnLFxyXG4gICAgICBiYWNrICAgICAgICAgICA6ICdCYWNrJyxcclxuICAgICAgc2VuZCAgICAgICAgICAgOiAnU2VuZCcsXHJcbiAgICAgIHNhdmUgICAgICAgICAgIDogJ1NhdmUnLFxyXG4gICAgICBmb3Jnb3RQYXNzd29yZCA6ICdGb3Jnb3QgcGFzc3dvcmQnLFxyXG4gICAgICBnb29nbGVTaWduSW4gICA6ICdTaWduIGluIHdpdGggR29vZ2xlJyxcclxuICAgICAgZmFjZWJvb2tTaWduSW4gOiAnU2lnbiBpbiB3aXRoIEZhY2Vib29rJ1xyXG4gICAgfTtcclxuICAgIGRlZmF1bHRMYWJlbHMucG9saWN5ID0ge1xyXG4gICAgICByZXF1aXJlZCAgICAgIDogJ1RoaXMgZmllbGQgaXMgcmVxdWlyZWQnLFxyXG4gICAgICBub25XaGl0ZXNwYWNlIDogJ1RoaXMgdmFsdWUgbXVzdCBub3QgY29udGFpbiBhbnkgc3BhY2VzJyxcclxuICAgICAgZW1haWwgICAgICAgICA6ICdUaGlzIHZhbHVlIG11c3QgYmUgYW4gZW1haWwnLFxyXG4gICAgICBwaG9uZSAgICAgICAgIDogJ1RoaXMgdmFsdWUgbXVzdCBiZSBhIHBob25lIG51bWJlcicsXHJcbiAgICAgIHNpeERpZ2l0cyAgICAgOiAnVGhpcyB2YWx1ZSBtdXN0IGNvbnRhaW5zIHNpeCBkaWdpdHMnLFxyXG4gICAgICBjdXN0b21SZWdleCAgIDogJ1RoaXMgdmFsdWUgbXVzdCBtYXRjaCB0aGUgY3VzdG9tIHJlZ2V4IHByb3ZpZGVkJyxcclxuICAgICAgcHdkTGVuZ3RoICAgICA6ICdNaW5pbXVtIHBhc3N3b3JkIGxlbmd0aCAoe3ttaW59fSB0byB7e21heH19KScsXHJcbiAgICAgIHB3ZFVwcGVyY2FzZSAgOiAnUmVxdWlyZSBhdCBsZWFzdCBvbmUgdXBwZXJjYXNlIGxldHRlciAoQSB0byBaKScsXHJcbiAgICAgIHB3ZExvd2VyY2FzZSAgOiAnUmVxdWlyZSBhdCBsZWFzdCBvbmUgbG93ZXJjYXNlIGxldHRlciAoYSB0byB6KScsXHJcbiAgICAgIHB3ZE51bWJlciAgICAgOiAnUmVxdWlyZSBhdCBsZWFzdCBvbmUgbnVtYmVyICgwIHRvIDkpJyxcclxuICAgICAgcHdkU3BlY2lhbCAgICA6ICdSZXF1aXJlIGF0IGxlYXN0IG9uZSBub25hbHBoYW51bWVyaWMgY2hhcmFjdGVyICEgQCAjICQgJSBeICYgKiAoICkgXyArIC0gPSBbIF0geyB9IHwgXFwnJ1xyXG4gICAgfTtcclxuXHJcbiAgICBsYWJlbHMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRMYWJlbHMsIHRoaXMuY3VzdG9tTGFiZWxzKTtcclxuXHJcbiAgICB0aGlzLmxhYmVscyA9IGxhYmVscztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEZvcm1Hcm91cHMoKSA6IHZvaWRcclxuICB7XHJcbiAgICBpZighdGhpcy5nb29nbGVTdHlsZSlcclxuICAgIHtcclxuICAgICAgdGhpcy5mb3JtR3JvdXAgPSB0aGlzLmJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICAgIHVzZXJuYW1lICAgICA6IG5ldyBGb3JtQ29udHJvbCh7XHJcbiAgICAgICAgICB2YWx1ZSAgICAgIDogbnVsbCxcclxuICAgICAgICAgIGRpc2FibGVkICAgOiBmYWxzZVxyXG4gICAgICAgIH0sW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSxcclxuICAgICAgICBwYXNzd29yZCAgICAgOiBuZXcgRm9ybUNvbnRyb2woe1xyXG4gICAgICAgICAgdmFsdWUgICAgICA6IG51bGwsXHJcbiAgICAgICAgICBkaXNhYmxlZCAgIDogZmFsc2VcclxuICAgICAgICB9LFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51c3JGb3JtR3JvdXAgPSB0aGlzLmJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICB1c2VybmFtZSAgICAgOiBuZXcgRm9ybUNvbnRyb2woe1xyXG4gICAgICAgIHZhbHVlICAgICAgOiBudWxsLFxyXG4gICAgICAgIGRpc2FibGVkICAgOiBmYWxzZVxyXG4gICAgICB9LFtWYWxpZGF0b3JzLnJlcXVpcmVkXSlcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucHdkRm9ybUdyb3VwID0gdGhpcy5idWlsZGVyLmdyb3VwKHtcclxuICAgICAgcGFzc3dvcmQgICAgIDogbmV3IEZvcm1Db250cm9sKHtcclxuICAgICAgICB2YWx1ZSAgICAgIDogbnVsbCxcclxuICAgICAgICBkaXNhYmxlZCAgIDogZmFsc2VcclxuICAgICAgfSxbVmFsaWRhdG9ycy5yZXF1aXJlZF0pXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59XHJcbiIsIi8vIEFuZ3VsYXIgbW9kdWxlc1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT25Jbml0IH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9uRGVzdHJveSB9ICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJbnB1dCB9ICAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT3V0cHV0IH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLy8gRW51bVxyXG5pbXBvcnQgeyBGb3JtcyB9ICAgICAgICBmcm9tICcuLi8uLi9lbnVtcy9mb3Jtcy5lbnVtJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yICAgIDogJ2NhbC10YWItd3JhcHBlcicsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiaGVhZGVyIHB5LTIgcHgtNCBtYi0zXCI+XHJcbiAgPGRpdiBjbGFzcz1cInJvdyBhbGlnbi1pdGVtcy1jZW50ZXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wtMiBweC0wIHRleHQtbGVmdFwiPlxyXG4gICAgICA8YnV0dG9uIG1hdC1pY29uLWJ1dHRvbiAoY2xpY2spPVwiYmFja1RvTG9naW4oKVwiPlxyXG4gICAgICAgIDxtYXQtaWNvbj5hcnJvd19iYWNrPC9tYXQtaWNvbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wgdGV4dC1yaWdodFwiPlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiIWlzRmlyc3QgJiYgZm9ybVR5cGUgPT09IGZvcm1zLlBXRFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaDUgZm9udC13ZWlnaHQtbGlnaHQge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZCA/ICdkLWJsb2NrIG1iLTAnIDogJycgfX1cIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIudGl0bGVQd2QgfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJsYWJlbHMuaGVhZGVyLnN1YnRpdGxlUHdkXCIgY2xhc3M9XCJkLWJsb2NrIGZvbnQtd2VpZ2h0LWxpZ2h0IHNtYWxsXCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnN1YnRpdGxlUHdkIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdJZj1cImlzRmlyc3QgJiYgZm9ybVR5cGUgPT09IGZvcm1zLlBXRFwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaDUgZm9udC13ZWlnaHQtbGlnaHQge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZFNldHVwID8gJ2QtYmxvY2sgbWItMCcgOiAnJyB9fVwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci50aXRsZVB3ZFNldHVwIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwibGFiZWxzLmhlYWRlci5zdWJ0aXRsZVB3ZFNldHVwXCIgY2xhc3M9XCJkLWJsb2NrIGZvbnQtd2VpZ2h0LWxpZ2h0IHNtYWxsXCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnN1YnRpdGxlUHdkU2V0dXAgfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiZm9ybVR5cGUgPT09IGZvcm1zLk1GQVwiPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaDUgZm9udC13ZWlnaHQtbGlnaHQge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZU1mYSA/ICdkLWJsb2NrIG1iLTAnIDogJycgfX1cIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIudGl0bGVNZmEgfX1cclxuICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJsYWJlbHMuaGVhZGVyLnN1YnRpdGxlTWZhXCIgY2xhc3M9XCJkLWJsb2NrIGZvbnQtd2VpZ2h0LWxpZ2h0IHNtYWxsXCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMuaGVhZGVyLnN1YnRpdGxlTWZhIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdJZj1cImZvcm1UeXBlID09PSBmb3Jtcy5NRkFfU0VUVVBcIj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImg1IGZvbnQtd2VpZ2h0LWxpZ2h0IHt7IGxhYmVscy5oZWFkZXIuc3VidGl0bGVNZmFTZXR1cCA/ICdkLWJsb2NrIG1iLTAnIDogJycgfX1cIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5oZWFkZXIudGl0bGVNZmFTZXR1cCB9fVxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8c3BhbiAqbmdJZj1cImxhYmVscy5oZWFkZXIuc3VidGl0bGVNZmFTZXR1cFwiIGNsYXNzPVwiZC1ibG9jayBmb250LXdlaWdodC1saWdodCBzbWFsbFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmhlYWRlci5zdWJ0aXRsZU1mYVNldHVwIH19XHJcbiAgICAgICAgPC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuPCEtLSBOT1RFOiBQd2QgRm9ybSAtLT5cclxuPGNhbC1wd2QtZm9ybSAqbmdJZj1cImZvcm1UeXBlID09PSBmb3Jtcy5QV0RcIiBcclxuICBbaXNGaXJzdF09XCJpc0ZpcnN0XCIgXHJcbiAgW3B3ZFBvbGljaWVzXT1cInB3ZFBvbGljaWVzXCIgXHJcbiAgW2xhYmVsc109XCJsYWJlbHNcIiBcclxuICBbaW5wdXRzXT1cImlucHV0c1wiIFxyXG4gIFtlcnJvcnNdPVwiZXJyb3JzXCIgXHJcbiAgKGZpcnN0Q29ubmVjdGlvbik9XCJyZWxheUZpcnN0TG9nRXZlbnQoJGV2ZW50KVwiIFxyXG4gIChsb3N0UGFzc3dvcmQpPVwicmVsYXlMb3N0UHdkRXZlbnQoJGV2ZW50KVwiPlxyXG48L2NhbC1wd2QtZm9ybT5cclxuPCEtLSBOT1RFOiBNRkEgU2V0dXAgRm9ybSAtLT5cclxuPGNhbC1tZmEtc2V0dXAtZm9ybSAqbmdJZj1cImZvcm1UeXBlID09PSBmb3Jtcy5NRkFfU0VUVVBcIiBcclxuICBbcXJDb2RlXT1cInFyQ29kZVwiIFxyXG4gIFtjb2RlXSAgPVwiY29kZVwiIFxyXG4gIFtsYWJlbHNdPVwibGFiZWxzXCIgXHJcbiAgW2lucHV0c109XCJpbnB1dHNcIiBcclxuICBbZXJyb3JzXT1cImVycm9yc1wiIFxyXG4gIChzYXZlTWZhKT1cInJlbGF5U2F2ZU1mYUtleUV2ZW50KCRldmVudClcIj5cclxuPC9jYWwtbWZhLXNldHVwLWZvcm0+XHJcbjwhLS0gTk9URTogTUZBIEZvcm0gLS0+XHJcbjxjYWwtbWZhLWZvcm0gKm5nSWY9XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBXCIgXHJcbiAgW2xhYmVsc109XCJsYWJlbHNcIiBcclxuICBbaW5wdXRzXT1cImlucHV0c1wiIFxyXG4gIFtlcnJvcnNdPVwiZXJyb3JzXCIgXHJcbiAgKHNlbmRNZmEpPVwicmVsYXlTZW5kTWZhQ29kZUV2ZW50KCRldmVudClcIj5cclxuPC9jYWwtbWZhLWZvcm0+YCxcclxuICBzdHlsZXM6IFtgLmhlYWRlcntjb2xvcjojZmZmO2JhY2tncm91bmQ6IzVlYWNmZn1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFiV3JhcHBlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XHJcbntcclxuICAvLyBOT1RFOiBVc2VmdWwgZm9yIHRlbXBsYXRlXHJcbiAgcHVibGljICAgIGZvcm1zID0gRm9ybXM7XHJcblxyXG4gIC8vIE5PVEU6IENvbW1vblxyXG4gIC8vIEZvcm0gdHlwZSAocGFzc3dvcmQgLyBtZmEpXHJcbiAgQElucHV0KCkgIGZvcm1UeXBlICAgICAgOiBzdHJpbmc7XHJcbiAgLy8gTGFiZWxzXHJcbiAgQElucHV0KCkgIGxhYmVscyAgICAgICAgOiBhbnk7XHJcbiAgLy8gRXJyb3JzXHJcbiAgQElucHV0KCkgIGVycm9ycyAgICAgICAgOiBhbnk7XHJcbiAgLy8gSW5wdXRzXHJcbiAgQElucHV0KCkgIGlucHV0cyAgICAgICAgOiBhbnk7XHJcbiAgLy8gRXZlbnQgc2VudCBmcm9tIHRhYlxyXG4gIEBPdXRwdXQoKSBzZW5kQ2xvc2VUYWIgIDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvLyBOT1RFOiBQYXNzd29yZFxyXG4gIC8vIEZpcnN0IGNvbm5lY3Rpb24gb3IgRm9yZ290IHBhc3N3b3JkXHJcbiAgQElucHV0KCkgIGlzRmlyc3QgICAgICAgOiBib29sZWFuO1xyXG4gIC8vIFBhc3N3b3JkIHBvbGljaWVzXHJcbiAgQElucHV0KCkgIHB3ZFBvbGljaWVzICAgOiBhbnk7XHJcbiAgLy8gRXZlbnQgc2VudCBmcm9tIHBhc3N3b3JkIGZvcm1cclxuICBAT3V0cHV0KCkgcmVsYXlGaXJzdExvZyA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIEBPdXRwdXQoKSByZWxheUxvc3RQd2QgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8vIE5PVEU6IE1GQSBzZXR1cFxyXG4gIC8vIE1GQSBzZWNyZXQga2V5XHJcbiAgQElucHV0KCkgIGNvZGUgICAgICAgICAgICA6IHN0cmluZztcclxuICBASW5wdXQoKSAgcXJDb2RlICAgICAgICAgIDogc3RyaW5nO1xyXG4gIC8vIEV2ZW50IHNlbnQgZnJvbSBtZmEgc2V0dXAgZm9ybVxyXG4gIEBPdXRwdXQoKSByZWxheVNhdmVNZmFLZXkgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLy8gTk9URTogTUZBXHJcbiAgLy8gRXZlbnQgc2VudCBmcm9tIG1mYSBmb3JtXHJcbiAgQE91dHB1dCgpIHJlbGF5U2VuZE1mYUNvZGUgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3JcclxuICAoXHJcbiAgKVxyXG4gIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpIDogdm9pZFxyXG4gIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIDogdm9pZFxyXG4gIHtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBiYWNrVG9Mb2dpbigpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuc2VuZENsb3NlVGFiLmVtaXQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZWxheUZpcnN0TG9nRXZlbnQoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnJlbGF5Rmlyc3RMb2cuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbGF5TG9zdFB3ZEV2ZW50KCRldmVudCA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5yZWxheUxvc3RQd2QuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbGF5U2F2ZU1mYUtleUV2ZW50KCRldmVudCA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5yZWxheVNhdmVNZmFLZXkuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbGF5U2VuZE1mYUNvZGVFdmVudCgkZXZlbnQgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMucmVsYXlTZW5kTWZhQ29kZS5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IEZvcm1Db250cm9sIH0gICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3JGbiB9ICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFZhbGlkYXRpb25SZXN1bHRcclxue1xyXG4gIFtrZXkgOiBzdHJpbmddIDogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFB3ZFZhbGlkYXRvclxyXG57XHJcbiAgcHVibGljIHN0YXRpYyBsb25nRW5vdWdoKG1pbiA6IG51bWJlciwgbWF4IDogbnVtYmVyKSA6IFZhbGlkYXRvckZuXHJcbiAge1xyXG4gICAgbGV0IGZ1bmMgPSAoY29udHJvbCA6IEFic3RyYWN0Q29udHJvbCkgOiB7IFtrZXkgOiBzdHJpbmddIDogYm9vbGVhbiB9IHwgbnVsbCA9PlxyXG4gICAge1xyXG4gICAgICBsZXQgaXNMb25nRW5vdWdoID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiBjb250cm9sLnZhbHVlLmxlbmd0aCA+PSBtaW4gJiYgY29udHJvbC52YWx1ZS5sZW5ndGggPD0gbWF4O1xyXG4gICAgICBpZiAoICFpc0xvbmdFbm91Z2ggKVxyXG4gICAgICAgIHJldHVybiB7IGxvbmdFbm91Z2g6IHRydWUgfTtcclxuXHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuICAgIHJldHVybiBmdW5jO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBudW1iZXIoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaGFzTnVtYmVyID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvXFxkLy50ZXN0KGNvbnRyb2wudmFsdWUpO1xyXG4gICAgaWYgKCAhaGFzTnVtYmVyIClcclxuICAgICAgcmV0dXJuIHsgbnVtYmVyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIHVwcGVyKGNvbnRyb2wgOiBGb3JtQ29udHJvbCkgOiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAge1xyXG4gICAgbGV0IGhhc1VwcGVyID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvW0EtWl0vLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFoYXNVcHBlciApXHJcbiAgICAgIHJldHVybiB7IHVwcGVyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGxvd2VyKGNvbnRyb2wgOiBGb3JtQ29udHJvbCkgOiBWYWxpZGF0aW9uUmVzdWx0XHJcbiAge1xyXG4gICAgbGV0IGhhc0xvd2VyID0gY29udHJvbC52YWx1ZSAhPT0gbnVsbCAmJiAvW2Etel0vLnRlc3QoY29udHJvbC52YWx1ZSk7XHJcbiAgICBpZiAoICFoYXNMb3dlciApXHJcbiAgICAgIHJldHVybiB7IGxvd2VyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIGNoYXIoY29udHJvbCA6IEZvcm1Db250cm9sKSA6IFZhbGlkYXRpb25SZXN1bHRcclxuICB7XHJcbiAgICBsZXQgaGFzQ2hhciA9IGNvbnRyb2wudmFsdWUgIT09IG51bGwgJiYgL1shQCMkJV4mXFwqKClfK1xcLT1cXFtcXF17fXwnXS8udGVzdChjb250cm9sLnZhbHVlKTtcclxuICAgIGlmICggIWhhc0NoYXIgKVxyXG4gICAgICByZXR1cm4geyBjaGFyOiB0cnVlIH07XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcbiIsIi8vIEFuZ3VsYXIgbW9kdWxlc1xyXG5pbXBvcnQgeyBPbkluaXQgfSAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9uQ2hhbmdlcyB9ICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9uRGVzdHJveSB9ICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSW5wdXQgfSAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPdXRwdXQgfSAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9ICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwIH0gICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVmFsaWRhdG9ycyB9ICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbi8vIEludGVybmFsIG1vZHVsZXNcclxuaW1wb3J0IHsgUHdkVmFsaWRhdG9yIH0gIGZyb20gJy4uLy4uL3ZhbGlkYXRvcnMvcHdkLnZhbGlkYXRvcic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvciAgICA6ICdjYWwtcHdkLWZvcm0nLFxyXG4gIHRlbXBsYXRlOiBgPCEtLSBOT1RFOiA8Zm9ybSBhdXRvY29tcGxldGU9XCJvZmZcIj4gd2lsbCB0dXJuIG9mZiBhdXRvY29tcGxldGUgZm9yIHRoZSBmb3JtIGluIG1vc3QgYnJvd3NlcnNcclxuICAgICBleGNlcHQgZm9yIHVzZXJuYW1lL2VtYWlsL3Bhc3N3b3JkIGZpZWxkcyAtLT5cclxuPGZvcm0gKG5nU3VibWl0KT1cInNlbmQoKVwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCIgYXV0b2NvbXBsZXRlPVwib2ZmXCI+XHJcblxyXG4gIDwhLS0gTk9URTogZmFrZSBmaWVsZHMgYXJlIGEgd29ya2Fyb3VuZCBmb3IgY2hyb21lL29wZXJhIGF1dG9maWxsIGdldHRpbmcgdGhlIHdyb25nIGZpZWxkcyAtLT5cclxuICA8aW5wdXQgaWQ9XCJ1c2VybmFtZVwiIHN0eWxlPVwiZGlzcGxheTpub25lXCIgdHlwZT1cInRleHRcIiBuYW1lPVwiZmFrZXVzZXJuYW1lcmVtZW1iZXJlZFwiPlxyXG4gIDxpbnB1dCBpZD1cInBhc3N3b3JkXCIgc3R5bGU9XCJkaXNwbGF5Om5vbmVcIiB0eXBlPVwicGFzc3dvcmRcIiBuYW1lPVwiZmFrZXBhc3N3b3JkcmVtZW1iZXJlZFwiPlxyXG5cclxuICA8ZGl2IGNsYXNzPVwicm93IHctMTAwIG5vLWd1dHRlcnNcIiAqbmdJZj1cIiFpc0ZpcnN0XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XHJcbiAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cInctMTAwXCI+XHJcbiAgICAgICAgPCEtLSBOT1RFOiA8aW5wdXQgYXV0b2NvbXBsZXRlPVwibm9wZVwiPiB0dXJucyBvZmYgYXV0b2NvbXBsZXRlIG9uIG1hbnkgb3RoZXIgYnJvd3NlcnMgdGhhdCBkb24ndCByZXNwZWN0XHJcbiAgICAgICAgICB0aGUgZm9ybSdzIFwib2ZmXCIsIGJ1dCBub3QgZm9yIFwicGFzc3dvcmRcIiBpbnB1dHMuIC0tPlxyXG4gICAgICAgIDxpbnB1dCBtYXRJbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJ2ZXJpZkNvZGVcIiBcclxuICAgICAgICAgIG5hbWU9XCJ2ZXJpZi1jb2RlXCIgYXV0b2NvbXBsZXRlPVwibm9wZVwiIFxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eyBsYWJlbHMuaW5wdXQudmVyaWZDb2RlIH19XCIgXHJcbiAgICAgICAgICBwYXR0ZXJuPVwiXFxcXGR7Nn1cIiBcclxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIvPiA8IS0tIE5PVEU6IFBhdHRlcm4gbWF0Y2hlcyBhbnkgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVyIC0tPlxyXG4gICAgICAgIDxidXR0b24gKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLnZhbGlkICYmIGlucHV0cy5jbGVhckNvZGVPblB3ZEZvcm1cIiBcclxuICAgICAgICAgIG1hdC1idXR0b24gbWF0U3VmZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiQ2xlYXJcIiBcclxuICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLnNldFZhbHVlKCcnKVwiIFxyXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8IS0tIE5PVEU6IEVycm9yIG1lc3NhZ2VzIC0tPlxyXG4gICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLmVycm9ycz8ucmVxdWlyZWQgJiYgZXJyb3JzLnB3ZFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5yZXF1aXJlZCB9fVxyXG4gICAgICAgIDwvbWF0LWhpbnQ+XHJcbiAgICAgICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUuZXJyb3JzPy5wYXR0ZXJuICYmIGVycm9ycy5wd2RcIj5cclxuICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kuc2l4RGlnaXRzIH19XHJcbiAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDwhLS0gTk9URTogPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGF1dG9jb21wbGV0ZT1cIm5ldy1wYXNzd29yZFwiIHdpbGwgdHVybiBpdCBvZmYgZm9yIHBhc3N3b3JkcyBldmVyeXdoZXJlIC0tPlxyXG4gIDxkaXYgY2xhc3M9XCJyb3cgdy0xMDAgbm8tZ3V0dGVyc1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgICAgIDxpbnB1dCBtYXRJbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJuZXdQYXNzd29yZFwiIFxyXG4gICAgICAgICAgbmFtZT1cIm5ldy1wYXNzd29yZFwiIGF1dG9jb21wbGV0ZT1cIm5ldy1wYXNzd29yZFwiIFxyXG4gICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eyBsYWJlbHMuaW5wdXQubmV3UGFzc3dvcmQgfX1cIiBcclxuICAgICAgICAgIHR5cGU9XCJ7eyBzaG93UGFzc3dvcmQgPyAndGV4dCcgOiAncGFzc3dvcmQnIH19XCIvPlxyXG4gICAgICAgIDxidXR0b24gKm5nSWY9XCJpbnB1dHMuc2hvd1B3ZE9uUHdkRm9ybVwiIFxyXG4gICAgICAgICAgbWF0LWJ1dHRvbiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJDbGVhclwiIFxyXG4gICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cInNob3dQYXNzd29yZD0hc2hvd1Bhc3N3b3JkXCIgXHJcbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+XHJcbiAgICAgICAgICA8bWF0LWljb24+e3sgc2hvd1Bhc3N3b3JkID8gJ3Zpc2liaWxpdHlfb2ZmJyA6ICd2aXNpYmlsaXR5JyB9fTwvbWF0LWljb24+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPCEtLSBOT1RFOiBFcnJvciBtZXNzYWdlIC0tPlxyXG4gICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzPy5yZXF1aXJlZCAmJiBlcnJvcnMucHdkXCI+XHJcbiAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnJlcXVpcmVkIH19XHJcbiAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJyb3cgdy0xMDAgbm8tZ3V0dGVyc1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICA8dWwgY2xhc3M9XCJsaXN0LXVuc3R5bGVkIHNtYWxsXCI+XHJcbiAgICAgICAgPGxpIGNsYXNzPVwiY2hlY2stcG9saWN5XCI+XHJcbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJyZWQtcG9saWN5XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzICYmIGZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMubG9uZ0Vub3VnaFwiPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImdyZWVuLXBvbGljeVwiICpuZ0lmPVwiIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgfHwgIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMubG9uZ0Vub3VnaFwiPmNoZWNrPC9tYXQtaWNvbj5cclxuICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kucHdkTGVuZ3RoUmVwbGFjZWQgfX1cclxuICAgICAgICA8L2xpPlxyXG4gICAgICAgIDxsaSBjbGFzcz1cImNoZWNrLXBvbGljeVwiICpuZ0lmPVwicHdkUG9saWNpZXMudXBwZXJcIj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cInJlZC1wb2xpY3lcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgJiYgZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycy51cHBlclwiPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImdyZWVuLXBvbGljeVwiICpuZ0lmPVwiIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgfHwgIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMudXBwZXJcIj5jaGVjazwvbWF0LWljb24+XHJcbiAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnB3ZFVwcGVyY2FzZSB9fVxyXG4gICAgICAgIDwvbGk+XHJcbiAgICAgICAgPGxpIGNsYXNzPVwiY2hlY2stcG9saWN5XCIgKm5nSWY9XCJwd2RQb2xpY2llcy5sb3dlclwiPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwicmVkLXBvbGljeVwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycyAmJiBmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzLmxvd2VyXCI+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiZ3JlZW4tcG9saWN5XCIgKm5nSWY9XCIhZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycyB8fCAhZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycy5sb3dlclwiPmNoZWNrPC9tYXQtaWNvbj5cclxuICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kucHdkTG93ZXJjYXNlIH19XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgICA8bGkgY2xhc3M9XCJjaGVjay1wb2xpY3lcIiAqbmdJZj1cInB3ZFBvbGljaWVzLm51bWJlclwiPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwicmVkLXBvbGljeVwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycyAmJiBmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzLm51bWJlclwiPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImdyZWVuLXBvbGljeVwiICpuZ0lmPVwiIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMgfHwgIWZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC5lcnJvcnMubnVtYmVyXCI+Y2hlY2s8L21hdC1pY29uPlxyXG4gICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5wd2ROdW1iZXIgfX1cclxuICAgICAgICA8L2xpPlxyXG4gICAgICAgIDxsaSBjbGFzcz1cImNoZWNrLXBvbGljeVwiICpuZ0lmPVwicHdkUG9saWNpZXMuY2hhclwiPlxyXG4gICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwicmVkLXBvbGljeVwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLmVycm9ycyAmJiBmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzLmNoYXJcIj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJncmVlbi1wb2xpY3lcIiAqbmdJZj1cIiFmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzIHx8ICFmb3JtR3JvdXAuY29udHJvbHMubmV3UGFzc3dvcmQuZXJyb3JzLmNoYXJcIj5jaGVjazwvbWF0LWljb24+XHJcbiAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnB3ZFNwZWNpYWwgfX1cclxuICAgICAgICA8L2xpPlxyXG4gICAgICA8L3VsPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPCEtLSBUT0RPOiBFbmFibGUgR29vZ2xlIENhcHRjaGEgLS0+XHJcbiAgPCEtLSA8ZGl2IGNsYXNzPVwicm93IHctMTAwIG5vLWd1dHRlcnNcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgPHJlLWNhcHRjaGEgc2l0ZV9rZXk9XCI2TGRCdEFrVUFBQUFBQjJfbF9UT3o3b1ptVExYYUZqUDFjeG51NHlNXCJcclxuICAgICAgICAoY2FwdGNoYVJlc3BvbnNlKT1cImhhbmRsZUNvcnJlY3RDYXB0Y2hhKCRldmVudClcIj5cclxuICAgICAgPC9yZS1jYXB0Y2hhPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+IC0tPlxyXG4gIDxkaXYgY2xhc3M9XCJwdC0wIHBiLTQgcHgtNFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInJvdyB3LTEwMCBuby1ndXR0ZXJzXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjb2wgdGV4dC1yaWdodFwiPlxyXG4gICAgICAgIDxidXR0b24gY29sb3I9XCJwcmltYXJ5XCIgbWF0LXJhaXNlZC1idXR0b24gY2xhc3M9XCJzbWFsbCB0ZXh0LXVwcGVyY2FzZVwiIHR5cGU9XCJzdWJtaXRcIiBbZGlzYWJsZWRdPVwiIWZvcm1Hcm91cC52YWxpZFwiPlxyXG4gICAgICAgICAge3sgbGFiZWxzLmJ1dHRvbi5zZW5kIH19XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZm9ybT5gLFxyXG4gIHN0eWxlczogW2AuZ3JlZW4tcG9saWN5e2NvbG9yOmdyZWVufS5yZWQtcG9saWN5e2NvbG9yOnJlZH0uY2hlY2stcG9saWN5e2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXJ9LmNoZWNrLXBvbGljeSAubWF0LWljb257bWFyZ2luLXJpZ2h0OjRweDtmb250LXNpemU6MjJweDtoZWlnaHQ6MjJweDt3aWR0aDoyMnB4fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQd2RGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveVxyXG57XHJcbiAgcHVibGljICAgIGZvcm1Hcm91cCAgICA6IEZvcm1Hcm91cDtcclxuICBwdWJsaWMgICAgc2hvd1Bhc3N3b3JkIDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIC8vIHB1YmxpYyBjYXB0Y2hhVG9rZW4gOiBzdHJpbmc7IC8vIFRPRE86XHJcblxyXG4gIC8vIExhYmVsc1xyXG4gIEBJbnB1dCgpICBsYWJlbHMgICAgICAgOiBhbnk7XHJcbiAgLy8gRXJyb3JzXHJcbiAgQElucHV0KCkgIGVycm9ycyAgICAgICA6IGFueTtcclxuICAvLyBJbnB1dHNcclxuICBASW5wdXQoKSAgaW5wdXRzICAgICAgIDogYW55O1xyXG5cclxuICAvLyBGaXJzdCBjb25uZWN0aW9uIG9yIEZvcmdvdCBwYXNzd29yZFxyXG4gIEBJbnB1dCgpICBpc0ZpcnN0ICAgICAgOiBib29sZWFuO1xyXG4gIC8vIFBhc3N3b3JkIHBvbGljaWVzXHJcbiAgQElucHV0KCkgIHB3ZFBvbGljaWVzICA6IGFueTtcclxuICAvLyBFdmVudCBzZW50IHRvIHRoZSBsb2dpbiBmb3JtIGFuZCByZWxheWVkIHBhcmVudHMgKG1vZGFsICYgdGFiKVxyXG4gIEBPdXRwdXQoKSBmaXJzdENvbm5lY3Rpb24gOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICBAT3V0cHV0KCkgbG9zdFBhc3N3b3JkICAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yXHJcbiAgKFxyXG4gICAgcHJpdmF0ZSBidWlsZGVyIDogRm9ybUJ1aWxkZXJcclxuICApXHJcbiAge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25Jbml0KCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5pbml0Rm9ybUdyb3VwcygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXMgOiBTaW1wbGVDaGFuZ2VzKSA6IHZvaWRcclxuICB7XHJcbiAgICBpZihjaGFuZ2VzLnB3ZFBvbGljaWVzKVxyXG4gICAgICB0aGlzLmluaXRGb3JtR3JvdXBzKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCkgOiB2b2lkXHJcbiAge1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNlbmQoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZXZlbnQgOiBhbnkgPSB7fTtcclxuXHJcbiAgICBsZXQgdmVyaWZDb2RlICAgOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgbGV0IG5ld1Bhc3N3b3JkIDogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICB2ZXJpZkNvZGUgICAgICAgPSB0aGlzLmZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUudmFsdWU7XHJcbiAgICBuZXdQYXNzd29yZCAgICAgPSB0aGlzLmZvcm1Hcm91cC5jb250cm9scy5uZXdQYXNzd29yZC52YWx1ZTtcclxuXHJcbiAgICBldmVudC5wYXNzd29yZCA9IG5ld1Bhc3N3b3JkO1xyXG5cclxuICAgIC8vIEZpcnN0IGNvbm5lY3Rpb25cclxuICAgIGlmKHRoaXMuaXNGaXJzdClcclxuICAgIHtcclxuICAgICAgdGhpcy5maXJzdENvbm5lY3Rpb24uZW1pdChldmVudCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBldmVudC5jb2RlID0gdmVyaWZDb2RlO1xyXG4gICAgLy8gTG9zdCBwYXNzd29yZFxyXG4gICAgdGhpcy5sb3N0UGFzc3dvcmQuZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRGb3JtR3JvdXBzKHJlZnJlc2ggOiBib29sZWFuID0gZmFsc2UpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCB2ZXJpZkNvZGUgICA6IHN0cmluZyA9IG51bGw7XHJcbiAgICBsZXQgbmV3UGFzc3dvcmQgOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIGlmKHJlZnJlc2ggJiYgdGhpcy5mb3JtR3JvdXApXHJcbiAgICB7XHJcbiAgICAgIHZlcmlmQ29kZSAgID0gdGhpcy5mb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLnZhbHVlO1xyXG4gICAgICBuZXdQYXNzd29yZCA9IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzLm5ld1Bhc3N3b3JkLnZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB2YWxpZGF0b3JzIDogYW55ID0gW107XHJcblxyXG4gICAgaWYodGhpcy5wd2RQb2xpY2llcy5jaGFyKVxyXG4gICAgICB2YWxpZGF0b3JzLnB1c2goUHdkVmFsaWRhdG9yLmNoYXIpO1xyXG4gICAgaWYodGhpcy5wd2RQb2xpY2llcy5udW1iZXIpXHJcbiAgICAgIHZhbGlkYXRvcnMucHVzaChQd2RWYWxpZGF0b3IubnVtYmVyKTtcclxuICAgIGlmKHRoaXMucHdkUG9saWNpZXMudXBwZXIpXHJcbiAgICAgIHZhbGlkYXRvcnMucHVzaChQd2RWYWxpZGF0b3IudXBwZXIpO1xyXG4gICAgaWYodGhpcy5wd2RQb2xpY2llcy5sb3dlcilcclxuICAgICAgdmFsaWRhdG9ycy5wdXNoKFB3ZFZhbGlkYXRvci5sb3dlcik7XHJcblxyXG4gICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xyXG4gICAgdmFsaWRhdG9ycy5wdXNoKFB3ZFZhbGlkYXRvci5sb25nRW5vdWdoKHRoaXMucHdkUG9saWNpZXMucmFuZ2UubWluLCB0aGlzLnB3ZFBvbGljaWVzLnJhbmdlLm1heCkpO1xyXG5cclxuICAgIC8vIFJlZnJlc2ggbWluIG1heCBsYWJlbFxyXG4gICAgbGV0IHJhbmdlTGFiZWwgOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcmFuZ2VMYWJlbCA9IHRoaXMubGFiZWxzLnBvbGljeS5wd2RMZW5ndGg7XHJcbiAgICByYW5nZUxhYmVsID0gcmFuZ2VMYWJlbC5yZXBsYWNlKC97e21pbn19LywgdGhpcy5wd2RQb2xpY2llcy5yYW5nZS5taW4pO1xyXG4gICAgcmFuZ2VMYWJlbCA9IHJhbmdlTGFiZWwucmVwbGFjZSgve3ttYXh9fS8sIHRoaXMucHdkUG9saWNpZXMucmFuZ2UubWF4KTtcclxuICAgIHRoaXMubGFiZWxzLnBvbGljeS5wd2RMZW5ndGhSZXBsYWNlZCA9IHJhbmdlTGFiZWw7XHJcblxyXG4gICAgdGhpcy5mb3JtR3JvdXAgPSB0aGlzLmJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICB2ZXJpZkNvZGUgICAgOiBuZXcgRm9ybUNvbnRyb2woe1xyXG4gICAgICAgIHZhbHVlICAgICAgOiB2ZXJpZkNvZGUsXHJcbiAgICAgICAgZGlzYWJsZWQgICA6IGZhbHNlXHJcbiAgICAgIH0pLFxyXG4gICAgICBuZXdQYXNzd29yZCAgOiBuZXcgRm9ybUNvbnRyb2woe1xyXG4gICAgICAgIHZhbHVlICAgICAgOiBuZXdQYXNzd29yZCxcclxuICAgICAgICBkaXNhYmxlZCAgIDogZmFsc2VcclxuICAgICAgfSwgdmFsaWRhdG9ycyksXHJcbiAgICB9KTtcclxuXHJcbiAgICBpZighdGhpcy5pc0ZpcnN0KVxyXG4gICAgICB0aGlzLmZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUuc2V0VmFsaWRhdG9ycyhbVmFsaWRhdG9ycy5yZXF1aXJlZF0pO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8gQW5ndWxhciBtb2R1bGVzXHJcbmltcG9ydCB7IE9uSW5pdCB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT25EZXN0cm95IH0gICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElucHV0IH0gICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPdXRwdXQgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwIH0gICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciB9ICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFZhbGlkYXRvcnMgfSAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yICAgIDogJ2NhbC1tZmEtc2V0dXAtZm9ybScsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY29kZSB0ZXh0LWNlbnRlclwiPlxyXG4gIDxxcmNvZGUgW3FyZGF0YV09XCJxckNvZGVcIiBbc2l6ZV09XCIxMDBcIiBbbGV2ZWxdPVwiJ0wnXCI+PC9xcmNvZGU+XHJcbiAgPHAgY2xhc3M9XCJteS0zXCI+e3sgY29kZSB9fTwvcD5cclxuPC9kaXY+XHJcbjxmb3JtIChuZ1N1Ym1pdCk9XCJzZW5kKClcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiIGF1dG9jb21wbGV0ZT1cIm9mZlwiPlxyXG4gIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cInctMTAwXCI+XHJcbiAgICA8aW5wdXQgbWF0SW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwidmVyaWZDb2RlXCIgXHJcbiAgICAgIG5hbWU9XCJ2ZXJpZkNvZGVcIiBwbGFjZWhvbGRlcj1cInt7IGxhYmVscy5pbnB1dC52ZXJpZkNvZGUgfX1cIiBcclxuICAgICAgcGF0dGVybj1cIlxcXFxkezZ9XCIgXHJcbiAgICAgIHR5cGU9XCJ0ZXh0XCIvPiA8IS0tIE5PVEU6IFBhdHRlcm4gbWF0Y2hlcyA2IGRpZ2l0cyAtLT5cclxuICAgIDxidXR0b24gKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLnZhbGlkICYmIGlucHV0cy5jbGVhckNvZGVPbk1mYUZvcm1cIiBcclxuICAgICAgbWF0LWJ1dHRvbiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJDbGVhclwiIFxyXG4gICAgICBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS5zZXRWYWx1ZSgnJylcIiBcclxuICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgPC9idXR0b24+XHJcbiAgICA8IS0tIE5PVEU6IEVycm9yIG1lc3NhZ2VzIC0tPlxyXG4gICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUuZXJyb3JzPy5yZXF1aXJlZCAmJiBlcnJvcnMubWZhXCI+XHJcbiAgICAgIHt7IGxhYmVscy5wb2xpY3kucmVxdWlyZWQgfX1cclxuICAgIDwvbWF0LWhpbnQ+XHJcbiAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS5lcnJvcnM/LnBhdHRlcm4gJiYgZXJyb3JzLm1mYVwiPlxyXG4gICAgICB7eyBsYWJlbHMucG9saWN5LnNpeERpZ2l0cyB9fVxyXG4gICAgPC9tYXQtaGludD5cclxuICA8L21hdC1mb3JtLWZpZWxkPlxyXG4gIDxkaXYgY2xhc3M9XCJyb3cgdy0xMDAgbm8tZ3V0dGVyc1wiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNvbCB0ZXh0LXJpZ2h0XCI+XHJcbiAgICAgIDxidXR0b24gY29sb3I9XCJwcmltYXJ5XCIgbWF0LXJhaXNlZC1idXR0b24gY2xhc3M9XCJzbWFsbCB0ZXh0LXVwcGVyY2FzZVwiIHR5cGU9XCJzdWJtaXRcIiBbZGlzYWJsZWRdPVwiIWZvcm1Hcm91cC52YWxpZFwiPlxyXG4gICAgICAgIHt7IGxhYmVscy5idXR0b24uc2F2ZSB9fVxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Zvcm0+YCxcclxuICBzdHlsZXM6IFtgLmNvZGV7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjthbGlnbi1pdGVtczpjZW50ZXJ9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1mYVNldHVwRm9ybUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95XHJcbntcclxuICBwdWJsaWMgICAgZm9ybUdyb3VwICAgICAgOiBGb3JtR3JvdXA7XHJcblxyXG4gIC8vIExhYmVsc1xyXG4gIEBJbnB1dCgpICBsYWJlbHMgICAgICAgICA6IGFueTtcclxuICAvLyBFcnJvcnNcclxuICBASW5wdXQoKSAgZXJyb3JzICAgICAgICAgOiBhbnk7XHJcbiAgLy8gSW5wdXRzXHJcbiAgQElucHV0KCkgIGlucHV0cyAgICAgICAgIDogYW55O1xyXG5cclxuICAvLyBNRkEgc2VjcmV0IGtleVxyXG4gIEBJbnB1dCgpICBxckNvZGUgICAgICAgICA6IHN0cmluZztcclxuICBASW5wdXQoKSAgY29kZSAgICAgICAgICAgOiBzdHJpbmc7XHJcbiAgLy8gRXZlbnQgc2VudCB0byB0aGUgbG9naW4gZm9ybSBhbmQgcmVsYXllZCBwYXJlbnRzIChtb2RhbCAmIHRhYilcclxuICBAT3V0cHV0KCkgc2F2ZU1mYSAgICAgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3JcclxuICAoXHJcbiAgICBwcml2YXRlIGJ1aWxkZXIgOiBGb3JtQnVpbGRlclxyXG4gIClcclxuICB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmluaXRGb3JtR3JvdXBzKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSA6IHZvaWRcclxuICB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VuZCgpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBldmVudCA6IGFueSA9IHt9O1xyXG5cclxuICAgIGxldCB2ZXJpZkNvZGUgOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIHZlcmlmQ29kZSA9IHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS52YWx1ZTtcclxuXHJcbiAgICBldmVudC5jb2RlID0gdmVyaWZDb2RlO1xyXG5cclxuICAgIHRoaXMuc2F2ZU1mYS5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEZvcm1Hcm91cHMoKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmZvcm1Hcm91cCA9IHRoaXMuYnVpbGRlci5ncm91cCh7XHJcbiAgICAgIHZlcmlmQ29kZSA6IG5ldyBGb3JtQ29udHJvbCh7XHJcbiAgICAgICAgdmFsdWUgICAgICA6IG51bGwsXHJcbiAgICAgICAgZGlzYWJsZWQgICA6IGZhbHNlXHJcbiAgICAgIH0sIFsgVmFsaWRhdG9ycy5yZXF1aXJlZCBdKSxcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIiwiLy8gQW5ndWxhciBtb2R1bGVzXHJcbmltcG9ydCB7IE9uSW5pdCB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT25EZXN0cm95IH0gICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IElucHV0IH0gICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPdXRwdXQgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZvcm1Db250cm9sIH0gIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRm9ybUdyb3VwIH0gICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBGb3JtQnVpbGRlciB9ICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFZhbGlkYXRvcnMgfSAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yICAgIDogJ2NhbC1tZmEtZm9ybScsXHJcbiAgdGVtcGxhdGU6IGA8Zm9ybSAobmdTdWJtaXQpPVwic2VuZCgpXCIgW2Zvcm1Hcm91cF09XCJmb3JtR3JvdXBcIiBhdXRvY29tcGxldGU9XCJvZmZcIj5cclxuICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgPGlucHV0IG1hdElucHV0IGZvcm1Db250cm9sTmFtZT1cInZlcmlmQ29kZVwiIFxyXG4gICAgICBuYW1lPVwidmVyaWZDb2RlXCIgcGxhY2Vob2xkZXI9XCJ7eyBsYWJlbHMuaW5wdXQudmVyaWZDb2RlIH19XCIgXHJcbiAgICAgIHBhdHRlcm49XCJcXFxcZHs2fVwiIFxyXG4gICAgICB0eXBlPVwidGV4dFwiLz4gPCEtLSBOT1RFOiBQYXR0ZXJuIG1hdGNoZXMgNiBkaWdpdHMgLS0+XHJcbiAgICA8YnV0dG9uICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnZlcmlmQ29kZS52YWxpZCAmJiBpbnB1dHMuY2xlYXJDb2RlT25NZmFGb3JtXCIgXHJcbiAgICAgIG1hdC1idXR0b24gbWF0U3VmZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiQ2xlYXJcIiBcclxuICAgICAgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cImZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUuc2V0VmFsdWUoJycpXCIgXHJcbiAgICAgIHR5cGU9XCJidXR0b25cIj5cclxuICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gICAgPCEtLSBOT1RFOiBFcnJvciBtZXNzYWdlcyAtLT5cclxuICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudmVyaWZDb2RlLmVycm9ycz8ucmVxdWlyZWQgJiYgZXJyb3JzLm1mYVwiPlxyXG4gICAgICB7eyBsYWJlbHMucG9saWN5LnJlcXVpcmVkIH19XHJcbiAgICA8L21hdC1oaW50PlxyXG4gICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUuZXJyb3JzPy5wYXR0ZXJuICYmIGVycm9ycy5tZmFcIj5cclxuICAgICAge3sgbGFiZWxzLnBvbGljeS5zaXhEaWdpdHMgfX1cclxuICAgIDwvbWF0LWhpbnQ+XHJcbiAgPC9tYXQtZm9ybS1maWVsZD5cclxuICA8ZGl2IGNsYXNzPVwicm93IHctMTAwIG5vLWd1dHRlcnNcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjb2wgdGV4dC1yaWdodFwiPlxyXG4gICAgICA8YnV0dG9uIGNvbG9yPVwicHJpbWFyeVwiIG1hdC1yYWlzZWQtYnV0dG9uIGNsYXNzPVwic21hbGwgdGV4dC11cHBlcmNhc2VcIiB0eXBlPVwic3VibWl0XCIgW2Rpc2FibGVkXT1cIiFmb3JtR3JvdXAudmFsaWRcIj5cclxuICAgICAgICB7eyBsYWJlbHMuYnV0dG9uLnNlbmQgfX1cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9mb3JtPmAsXHJcbiAgc3R5bGVzOiBbYGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNZmFGb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3lcclxue1xyXG4gIHB1YmxpYyAgICBmb3JtR3JvdXAgICAgOiBGb3JtR3JvdXA7XHJcblxyXG4gIC8vIExhYmVsc1xyXG4gIEBJbnB1dCgpICBsYWJlbHMgICAgICAgOiBhbnk7XHJcbiAgLy8gRXJyb3JzXHJcbiAgQElucHV0KCkgIGVycm9ycyAgICAgICA6IGFueTtcclxuICAvLyBJbnB1dHNcclxuICBASW5wdXQoKSAgaW5wdXRzICAgICAgIDogYW55O1xyXG5cclxuICAvLyBFdmVudCBzZW50IHRvIHRoZSBsb2dpbiBmb3JtIGFuZCByZWxheWVkIHBhcmVudHMgKG1vZGFsICYgdGFiKVxyXG4gIEBPdXRwdXQoKSBzZW5kTWZhICAgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgY29uc3RydWN0b3JcclxuICAoXHJcbiAgICBwcml2YXRlIGJ1aWxkZXIgOiBGb3JtQnVpbGRlclxyXG4gIClcclxuICB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmluaXRGb3JtR3JvdXBzKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSA6IHZvaWRcclxuICB7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2VuZCgpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBldmVudCAgICAgOiBhbnkgICAgPSB7fTtcclxuICAgIGxldCB2ZXJpZkNvZGUgOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIHZlcmlmQ29kZSAgPSB0aGlzLmZvcm1Hcm91cC5jb250cm9scy52ZXJpZkNvZGUudmFsdWU7XHJcbiAgICBldmVudC5jb2RlID0gdmVyaWZDb2RlO1xyXG4gICAgdGhpcy5zZW5kTWZhLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0Rm9ybUdyb3VwcygpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuZm9ybUdyb3VwID0gdGhpcy5idWlsZGVyLmdyb3VwKHtcclxuICAgICAgdmVyaWZDb2RlIDogbmV3IEZvcm1Db250cm9sKHtcclxuICAgICAgICB2YWx1ZSAgICAgIDogbnVsbCxcclxuICAgICAgICBkaXNhYmxlZCAgIDogZmFsc2VcclxuICAgICAgfSwgWyBWYWxpZGF0b3JzLnJlcXVpcmVkIF0pLFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufVxyXG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMClcclxuICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZShyZXN1bHQudmFsdWUpOyB9KS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2dlbmVyYXRvcih0aGlzQXJnLCBib2R5KSB7XHJcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xyXG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcclxuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XHJcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcclxuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cclxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBleHBvcnRzKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmICghZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgZXhwb3J0c1twXSA9IG1bcF07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuIiwiaW1wb3J0IHsgUGlwZSB9ICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AUGlwZSh7IG5hbWU6ICdleGlzdHNMYXlvdXQnIH0pXHJcbmV4cG9ydCBjbGFzcyBFeGlzdHNMYXlvdXRQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybVxyXG57XHJcbiAgdHJhbnNmb3JtKHZhbHVlIDogYW55LCBsYXlvdXQgOiBzdHJpbmcpXHJcbiAge1xyXG4gICAgbGV0IGV4aXN0IDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgZm9yICggbGV0IGtleSBvZiBPYmplY3Qua2V5cyh2YWx1ZSkgKVxyXG4gICAgICBpZiAoIHZhbHVlW2tleV0gPT09IGxheW91dCApXHJcbiAgICAgICAgZXhpc3QgPSB0cnVlO1xyXG5cclxuICAgIHJldHVybiBleGlzdDtcclxuICB9XHJcbn1cclxuIiwiLy8gQW5ndWxhciBtb2R1bGVzXHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gICAgICAgICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSAgICAgICAgICAgICBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9ICAgICAgICAgICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSAgICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbi8vIE1hdGVyaWFsIG1vZHVsZXNcclxuLy8gaW1wb3J0IHsgTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRUYWJsZU1vZHVsZSB9ICAgICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdFNvcnRNb2R1bGUgfSAgICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgTWF0QnV0dG9uTW9kdWxlIH0gICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRDaGlwc01vZHVsZSB9ICAgICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdENoZWNrYm94TW9kdWxlIH0gICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0UmFkaW9Nb2R1bGUgfSAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRTZWxlY3RNb2R1bGUgfSAgICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdFNsaWRlVG9nZ2xlTW9kdWxlIH0gICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0TWVudU1vZHVsZSB9ICAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRTaWRlbmF2TW9kdWxlIH0gICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdFRvb2xiYXJNb2R1bGUgfSAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0R3JpZExpc3RNb2R1bGUgfSAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRUb29sdGlwTW9kdWxlIH0gICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdENhcmRNb2R1bGUgfSAgICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9ICAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRQcm9ncmVzc0Jhck1vZHVsZSB9ICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdExpc3RNb2R1bGUgfSAgICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXREYXRlcGlja2VyTW9kdWxlIH0gICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdE5hdGl2ZURhdGVNb2R1bGUgfSAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgTWF0VGFic01vZHVsZSB9ICAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG4vLyBpbXBvcnQgeyBNYXRBdXRvY29tcGxldGVNb2R1bGUgfSAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdFN0ZXBwZXJNb2R1bGUgfSAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0UGFnaW5hdG9yTW9kdWxlIH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBNYXREaWFsb2dNb2R1bGUgfSAgICAgICAgICBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbi8vIGltcG9ydCB7IE1hdFNuYWNrQmFyTW9kdWxlIH0gICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuLy8gaW1wb3J0IHsgTWF0RXhwYW5zaW9uTW9kdWxlIH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5cclxuLy8gSW50ZXJuYWwgbW9kdWxlc1xyXG5pbXBvcnQgeyBMb2dpbkZvcm1Db21wb25lbnQgfSAgICAgICBmcm9tICcuL2xvZ2luLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgTW9kYWxXcmFwcGVyQ29tcG9uZW50IH0gICAgZnJvbSAnLi9sYXlvdXRzL21vZGFsLXdyYXBwZXIvbW9kYWwtd3JhcHBlci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUYWJXcmFwcGVyQ29tcG9uZW50IH0gICAgICBmcm9tICcuL2xheW91dHMvdGFiLXdyYXBwZXIvdGFiLXdyYXBwZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgUHdkRm9ybUNvbXBvbmVudCB9ICAgICAgICAgZnJvbSAnLi9mb3Jtcy9wd2QtZm9ybS9wd2QtZm9ybS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBNZmFTZXR1cEZvcm1Db21wb25lbnQgfSAgICBmcm9tICcuL2Zvcm1zL21mYS1zZXR1cC1mb3JtL21mYS1zZXR1cC1mb3JtLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE1mYUZvcm1Db21wb25lbnQgfSAgICAgICAgIGZyb20gJy4vZm9ybXMvbWZhLWZvcm0vbWZhLWZvcm0uY29tcG9uZW50JztcclxuaW1wb3J0IHsgRXhpc3RzTGF5b3V0UGlwZSB9ICAgICAgICAgZnJvbSAnLi9waXBlcy9leGlzdHMtbGF5b3V0LnBpcGUnO1xyXG5cclxuLy8gRXh0ZXJuYWwgbW9kdWxlc1xyXG5pbXBvcnQgeyBRUkNvZGVNb2R1bGUgfSAgICAgICAgICAgICBmcm9tICdhbmd1bGFyeC1xcmNvZGUnO1xyXG5cclxuLy8gTmdNb2R1bGUgdGhhdCBpbmNsdWRlcyBhbGwgTWF0ZXJpYWwgbW9kdWxlcyB0aGF0IGFyZSByZXF1aXJlZCB0byBzZXJ2ZSB0aGUgYXBwLlxyXG5ATmdNb2R1bGUoe1xyXG4gIGV4cG9ydHM6IFtcclxuICAgIC8vIE1hdGVyaWFsIG1vZHVsZXNcclxuICAgIC8vIE1hdFRhYmxlTW9kdWxlLFxyXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxyXG4gICAgLy8gTWF0Q2hpcHNNb2R1bGUsXHJcbiAgICAvLyBNYXRDaGVja2JveE1vZHVsZSxcclxuICAgIE1hdElucHV0TW9kdWxlLFxyXG4gICAgLy8gTWF0UmFkaW9Nb2R1bGUsXHJcbiAgICAvLyBNYXRTZWxlY3RNb2R1bGUsXHJcbiAgICAvLyBNYXRTbGlkZVRvZ2dsZU1vZHVsZSxcclxuICAgIC8vIE1hdE1lbnVNb2R1bGUsXHJcbiAgICAvLyBNYXRTaWRlbmF2TW9kdWxlLFxyXG4gICAgLy8gTWF0VG9vbGJhck1vZHVsZSxcclxuICAgIC8vIE1hdExpc3RNb2R1bGUsXHJcbiAgICAvLyBNYXRHcmlkTGlzdE1vZHVsZSxcclxuICAgIC8vIE1hdENhcmRNb2R1bGUsXHJcbiAgICBNYXRJY29uTW9kdWxlLFxyXG4gICAgLy8gTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsXHJcbiAgICBNYXREaWFsb2dNb2R1bGUsXHJcbiAgICAvLyBNYXRTbmFja0Jhck1vZHVsZSxcclxuICAgIC8vIE1hdERhdGVwaWNrZXJNb2R1bGUsXHJcbiAgICAvLyBNYXROYXRpdmVEYXRlTW9kdWxlLFxyXG4gICAgLy8gTWF0UHJvZ3Jlc3NTcGlubmVyTW9kdWxlLFxyXG4gICAgLy8gTWF0RGF0ZXBpY2tlck1vZHVsZSxcclxuICAgIE1hdFRhYnNNb2R1bGUsXHJcbiAgICAvLyBNYXRBdXRvY29tcGxldGVNb2R1bGUsXHJcbiAgICAvLyBNYXRFeHBhbnNpb25Nb2R1bGUsXHJcbiAgICAvLyBNYXRUb29sdGlwTW9kdWxlLFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE1hdGVyaWFsTW9kdWxlIHt9XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gIGltcG9ydHM6IFtcclxuICAgIENvbW1vbk1vZHVsZSxcclxuICAgIE1hdGVyaWFsTW9kdWxlLFxyXG4gICAgRm9ybXNNb2R1bGUsXHJcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxyXG4gICAgUVJDb2RlTW9kdWxlXHJcbiAgXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIExvZ2luRm9ybUNvbXBvbmVudCxcclxuICAgIFB3ZEZvcm1Db21wb25lbnQsXHJcbiAgICBNb2RhbFdyYXBwZXJDb21wb25lbnQsXHJcbiAgICBUYWJXcmFwcGVyQ29tcG9uZW50LFxyXG4gICAgTWZhU2V0dXBGb3JtQ29tcG9uZW50LFxyXG4gICAgTWZhRm9ybUNvbXBvbmVudCxcclxuICAgIEV4aXN0c0xheW91dFBpcGVcclxuICBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbIE1vZGFsV3JhcHBlckNvbXBvbmVudCBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIExvZ2luRm9ybUNvbXBvbmVudCxcclxuICAgIFB3ZEZvcm1Db21wb25lbnQsXHJcbiAgICBNb2RhbFdyYXBwZXJDb21wb25lbnQsXHJcbiAgICBUYWJXcmFwcGVyQ29tcG9uZW50LFxyXG4gICAgTWZhU2V0dXBGb3JtQ29tcG9uZW50LFxyXG4gICAgTWZhRm9ybUNvbXBvbmVudCxcclxuICAgIEV4aXN0c0xheW91dFBpcGVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkZvcm1Nb2R1bGUgeyB9XHJcbiJdLCJuYW1lcyI6WyJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJNYXREaWFsb2dSZWYiLCJJbmplY3QiLCJNQVRfRElBTE9HX0RBVEEiLCJWYWxpZGF0b3JzIiwiRm9ybUNvbnRyb2wiLCJNYXREaWFsb2ciLCJEb21TYW5pdGl6ZXIiLCJNYXRJY29uUmVnaXN0cnkiLCJGb3JtQnVpbGRlciIsIklucHV0IiwiT3V0cHV0IiwidHNsaWJfMS5fX3ZhbHVlcyIsIlBpcGUiLCJOZ01vZHVsZSIsIk1hdEJ1dHRvbk1vZHVsZSIsIk1hdElucHV0TW9kdWxlIiwiTWF0SWNvbk1vZHVsZSIsIk1hdERpYWxvZ01vZHVsZSIsIk1hdFRhYnNNb2R1bGUiLCJDb21tb25Nb2R1bGUiLCJGb3Jtc01vZHVsZSIsIlJlYWN0aXZlRm9ybXNNb2R1bGUiLCJRUkNvZGVNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFTQSxJQUFBOzs7Ozs7O1FBRWdCLG1CQUFNOzs7O3NCQUFDLE1BQWU7Z0JBRWxDLHFCQUFJLElBQUksR0FBRyxVQUFDLE9BQXlCO29CQUVuQyxxQkFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3hFLElBQUssQ0FBQyxZQUFhO3dCQUNqQixPQUFPLEVBQUUsTUFBTSxFQUFHLElBQUksRUFBRSxDQUFDO29CQUUzQixPQUFPLElBQUksQ0FBQztpQkFDYixDQUFDO2dCQUNGLE9BQU8sSUFBSSxDQUFDOzs7Ozs7UUFHQSxrQkFBSzs7OztzQkFBQyxPQUFxQjtnQkFFdkMscUJBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLHdDQUF3QyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JHLElBQUssQ0FBQyxPQUFRO29CQUNaLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBRXpCLE9BQU8sSUFBSSxDQUFDOzs7Ozs7UUFHQSxrQkFBSzs7OztzQkFBQyxPQUFxQjtnQkFFdkMscUJBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2RSxJQUFLLENBQUMsT0FBUTtvQkFDWixPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUV6QixPQUFPLElBQUksQ0FBQzs7MkJBdkNoQjtRQTBDQyxDQUFBOzs7Ozs7OztlQ3hDVSxPQUFPO2FBQ1AsS0FBSztnQkFDTCxRQUFROzs7Ozs7Ozs7ZUNGVCxPQUFPO2NBQ1AsTUFBTTs7Ozs7Ozs7O2FDREYsS0FBSzttQkFDTCxVQUFVO2FBQ1YsS0FBSzs7Ozs7Ozs7O2VDRlIsT0FBTztlQUNQLE9BQU87Ozs7Ozs7QUNGbEI7UUE4SEUsK0JBRVUsV0FDd0I7WUFEeEIsY0FBUyxHQUFULFNBQVM7WUFDZSxTQUFJLEdBQUosSUFBSTt5QkFyQ3ZCLEtBQUs7aUNBb0J1QixJQUFJQSxpQkFBWSxFQUFFO2dDQUNsQixJQUFJQSxpQkFBWSxFQUFFO21DQU9oQixJQUFJQSxpQkFBWSxFQUFFO29DQUlqQixJQUFJQSxpQkFBWSxFQUFFO1lBUTlELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztTQUNuQjs7OztRQUVNLHdDQUFROzs7Ozs7OztRQUlSLDJDQUFXOzs7O2dCQUVoQixJQUFHLElBQUksQ0FBQyxRQUFRO29CQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7Ozs7OztRQUd6QixrREFBa0I7Ozs7c0JBQUMsTUFBWTtnQkFFcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7OztRQUczQixpREFBaUI7Ozs7c0JBQUMsTUFBWTtnQkFFbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7OztRQUcxQixvREFBb0I7Ozs7c0JBQUMsTUFBWTtnQkFFdEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7OztRQUc3QixxREFBcUI7Ozs7c0JBQUMsTUFBWTtnQkFFdkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7UUFHN0IsMENBQVU7Ozs7O2dCQUVoQixxQkFBSSxJQUFVLENBQUM7Z0JBQ2YsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBRWpCLElBQUcsSUFBSSxLQUFLLElBQUksRUFDaEI7b0JBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBUyxJQUFJLENBQUMsUUFBUSxDQUFDOzs7b0JBSXBDLElBQUksQ0FBQyxNQUFNLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7b0JBRWxDLElBQUksQ0FBQyxNQUFNLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7b0JBRWxDLElBQUksQ0FBQyxNQUFNLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7O29CQUlsQyxJQUFJLENBQUMsT0FBTyxHQUFVLElBQUksQ0FBQyxPQUFPLENBQUM7O29CQUVuQyxJQUFJLENBQUMsV0FBVyxHQUFNLElBQUksQ0FBQyxXQUFXLENBQUM7OztvQkFJdkMsSUFBSSxDQUFDLElBQUksR0FBYSxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFXLElBQUksQ0FBQyxNQUFNLENBQUM7O29CQUdsQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUMsR0FBRzt3QkFFNUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztxQkFDeEIsQ0FBQyxDQUFDO2lCQUNKOzs7b0JBeExKQyxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFNLG1CQUFtQjt3QkFDakMsUUFBUSxFQUFFLHF0RkFzRVU7d0JBQ3BCLE1BQU0sRUFBRSxDQUFDLHdDQUF3QyxDQUFDO3FCQUNuRDs7Ozs7d0JBbkZRQyxxQkFBWTt3REE0SGhCQyxXQUFNLFNBQUNDLHdCQUFlOzs7b0NBbEkzQjs7Ozs7OztBQ01BOzs7UUFnWkUsNEJBRVUsUUFDQSxXQUNBLGNBQ0E7WUFIQSxXQUFNLEdBQU4sTUFBTTtZQUNOLGNBQVMsR0FBVCxTQUFTO1lBQ1QsaUJBQVksR0FBWixZQUFZO1lBQ1osWUFBTyxHQUFQLE9BQU87OzhCQTNGdUIsS0FBSzs7K0JBRUwsS0FBSzs7K0JBRUwsSUFBSTs7O21DQU9MLElBQUk7OytCQW9CRyxJQUFJSixpQkFBWSxFQUFFOzswQkFFbEIsSUFBSUEsaUJBQVksRUFBRTs7eUJBRWxCLElBQUlBLGlCQUFZLEVBQUU7OytCQUVsQixJQUFJQSxpQkFBWSxFQUFFOzs2QkFFbEIsSUFBSUEsaUJBQVksRUFBRTs7Z0NBRWxCLElBQUlBLGlCQUFZLEVBQUU7O2dDQUVsQixJQUFJQSxpQkFBWSxFQUFFOzs4QkFFbEIsSUFBSUEsaUJBQVksRUFBRTs7K0JBRWxCLElBQUlBLGlCQUFZLEVBQUU7OzJCQUVsQixJQUFJQSxpQkFBWSxFQUFFOzsyQkFFbEIsSUFBSUEsaUJBQVksRUFBRTtnQ0FJNUIsS0FBSztnQ0FFaEIsWUFBWTt5QkFDbkIsS0FBSzsyQkFHYSxLQUFLO3dCQUdMLElBQUk7MEJBQ0osSUFBSTs0QkFLSixJQUFJOzZCQUNKLElBQUk7MkJBR3BCLE9BQU87K0JBQ1UsQ0FBQzttQ0FDYyxJQUFJQSxpQkFBWSxFQUFFOzs7WUFvQnBFLFlBQVksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFJLFNBQVMsQ0FBQyw4QkFBOEIsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7WUFDMUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLDhCQUE4QixDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQztTQUM3Rzs7OztRQUVNLHFDQUFROzs7OztnQkFHYixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7O2dCQUV0QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFFakIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNwQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7Ozs7UUFHYiw0Q0FBZTs7OztnQkFFcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7Ozs7O1FBR25CLHdDQUFXOzs7O3NCQUFDLE9BQXVCO2dCQUV4QyxJQUFHLE9BQU87b0JBQ1IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN4QixJQUFHLE9BQU87b0JBQ1IsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUN6QixJQUFHLE9BQU87b0JBQ1IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUVuQixJQUFHLE9BQU8seUJBQXNCLE9BQU8sbUJBQWdCO29CQUNyRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3RCLElBQUcsT0FBTztvQkFDUixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ25CLElBQUcsT0FBTztvQkFDUixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3JCLElBQUcsT0FBTztvQkFDUixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3BCLElBQUcsT0FBTztvQkFDUixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3BCLElBQUcsT0FBTztvQkFDUixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Ozs7O1FBR2Ysd0NBQVc7Ozs7Z0JBRWhCLElBQUcsSUFBSSxDQUFDLGFBQWE7b0JBQ25CLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25DLElBQUcsSUFBSSxDQUFDLFlBQVk7b0JBQ2xCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ2xDLElBQUcsSUFBSSxDQUFDLGtCQUFrQjtvQkFDeEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN4QyxJQUFHLElBQUksQ0FBQyxtQkFBbUI7b0JBQ3pCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7Ozs7OztRQWVwQyx5Q0FBWTs7Ozs7Ozs7O2dCQUVqQixxQkFBSSxLQUFLLEdBQVMsRUFBRSxDQUFDO2dCQUNyQixLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7UUFXbEIsK0NBQWtCOzs7Ozs7Ozs7O3NCQUFDLE1BQWU7Z0JBRXZDLHFCQUFJLEtBQUssR0FBUyxFQUFFLENBQUM7Z0JBQ3JCLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDaEMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7UUFJeEIsMENBQWE7Ozs7O2dCQUVsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDOzs7Ozs7Ozs7UUFRZCxrREFBcUI7Ozs7Ozs7O2dCQUUxQixxQkFBSSxLQUFLLEdBQVMsRUFBRSxDQUFDO2dCQUNyQixLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7Ozs7UUFTdEIsd0NBQVc7Ozs7OztzQkFBQyxPQUFpQjtnQkFFbEMsSUFBSSxDQUFDLE9BQU8sR0FBSSxPQUFPLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztnQkFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7Ozs7UUFRakMsNkNBQWdCOzs7Ozs7O3NCQUFDLElBQWEsRUFBRSxNQUFlO2dCQUVwRCxJQUFJLENBQUMsSUFBSSxHQUFPLElBQUksQ0FBQztnQkFDckIsSUFBSSxDQUFDLE1BQU0sR0FBSyxNQUFNLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7UUFJdEMsd0NBQVc7Ozs7O2dCQUVoQixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7O1FBSWpDLHdDQUFXOzs7OztnQkFFaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7UUFJdkMsNkNBQWdCOzs7OztnQkFFckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7UUFJdkMsd0NBQVc7Ozs7O2dCQUVoQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7O1FBSWxDLHdDQUFXOzs7Ozs7c0JBQUMsUUFBd0IsRUFBRSxTQUF5QjtnQkFBbkQseUJBQUE7b0JBQUEsZUFBd0I7O2dCQUFFLDBCQUFBO29CQUFBLGdCQUF5Qjs7Z0JBRXBFLElBQUksQ0FBQyxRQUFRLEdBQU0sUUFBUSxDQUFDO2dCQUM1QixJQUFJLENBQUMsU0FBUyxHQUFLLFNBQVMsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7Ozs7OztRQU9oQiw0Q0FBZTs7OztzQkFBQyxXQUFvQjtnQkFFekMsUUFBTyxXQUFXO29CQUVoQixLQUFLLENBQUM7d0JBQ0osSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7d0JBQ3JCLE1BQU07b0JBQ1IsS0FBSyxDQUFDOzt3QkFDSixxQkFBSSxRQUFRLEdBQVMsSUFBSSxDQUFDO3dCQUMxQixRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDNUIsTUFBTTtvQkFDUixLQUFLLENBQUM7O3dCQUNKLHFCQUFJLFFBQVEsR0FBUyxJQUFJLENBQUM7d0JBQzFCLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzt3QkFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQzVCLE1BQU07b0JBQ1I7d0JBQ0UsTUFBTTtpQkFDVDs7Ozs7O1FBR0ksNENBQWU7Ozs7c0JBQUMsV0FBb0I7Z0JBRXpDLFFBQU8sV0FBVztvQkFFaEIsS0FBSyxDQUFDO3dCQUNKLE1BQU07b0JBQ1IsS0FBSyxDQUFDOzt3QkFDSixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQzt3QkFDckIsTUFBTTtvQkFDUixLQUFLLENBQUM7O3dCQUNKLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO3dCQUNyQixNQUFNO29CQUNSO3dCQUNFLE1BQU07aUJBQ1Q7Ozs7Ozs7Ozs7UUFZSSx3Q0FBVzs7Ozs7Ozs7c0JBQUMsTUFBWTtnQkFFN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7Ozs7O1FBUzFCLHVDQUFVOzs7Ozs7Ozs7c0JBQUMsTUFBWTtnQkFFNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7Ozs7UUFRMUIsMENBQWE7Ozs7Ozs7O3NCQUFDLE1BQVk7Z0JBRS9CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7Ozs7O1FBUXhCLDJDQUFjOzs7Ozs7OztzQkFBQyxNQUFZO2dCQUVoQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Ozs7OztRQVl6QiwwQ0FBYTs7Ozs7Ozs7c0JBQUMsU0FBZTs7Z0JBRWxDLElBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFLO29CQUU3RSxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDL0IsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztRQVNFLHlDQUFZOzs7Ozs7Ozs7c0JBQUMsU0FBZTs7Z0JBRWpDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFLO29CQUUzRSxLQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDL0IsQ0FBQyxDQUFDOzs7Ozs7Ozs7O1FBUUUsNENBQWU7Ozs7Ozs7O3NCQUFDLFNBQWU7O2dCQUVwQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFLO29CQUVwRixLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDN0IsQ0FBQyxDQUFDOzs7Ozs7Ozs7O1FBUUUsNkNBQWdCOzs7Ozs7OztzQkFBQyxTQUFlOztnQkFFckMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFLO29CQUV0RixLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDOUIsQ0FBQyxDQUFDOzs7Ozs7UUFPRSw0Q0FBZTs7OztzQkFBQyxNQUFZO2dCQUVqQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Ozs7O1FBT1Ysc0NBQVM7Ozs7O2dCQUVmLHFCQUFJLE1BQU0sR0FBUzs7b0JBRWpCLFFBQVEsRUFBZ0IsSUFBSSxDQUFDLFFBQVE7b0JBQ3JDLE1BQU0sRUFBa0IsSUFBSSxDQUFDLE1BQU07b0JBQ25DLFVBQVUsRUFBYyxJQUFJLENBQUMsZUFBZTtvQkFDNUMsTUFBTSxFQUFrQixJQUFJLENBQUMsTUFBTTtvQkFDbkMsTUFBTSxFQUFrQixJQUFJLENBQUMsTUFBTTs7b0JBRW5DLE9BQU8sRUFBaUIsSUFBSSxDQUFDLE9BQU87b0JBQ3BDLFdBQVcsRUFBYSxJQUFJLENBQUMsV0FBVzs7b0JBRXhDLElBQUksRUFBb0IsSUFBSSxDQUFDLElBQUk7b0JBQ2pDLE1BQU0sRUFBa0IsSUFBSSxDQUFDLE1BQU07aUJBQ3BDLENBQUM7Z0JBRUYscUJBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLEVBQUUsSUFBSSxFQUFHLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0JBRTNFLElBQUcsSUFBSSxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUMsR0FBRyxFQUM5QjtvQkFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUM5QjtnQkFFRCxJQUFHLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLFNBQVM7b0JBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRWxDLElBQUcsSUFBSSxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUMsR0FBRztvQkFDNUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUVuQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtvQkFFdEMsS0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBQ3JCLElBQUcsTUFBTTt3QkFDUCxLQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsYUFBVSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3JELENBQUMsQ0FBQzs7Ozs7O1FBT0csdUNBQVU7Ozs7c0JBQUMsVUFBbUI7Z0JBRXBDLFFBQU8sVUFBVTtvQkFFZixLQUFLLE9BQU8sQ0FBQyxHQUFHO3dCQUNkLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzt3QkFDZixNQUFNO29CQUNSLEtBQUssT0FBTyxDQUFDLEtBQUs7d0JBQ2hCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzt3QkFDakIsTUFBTTtvQkFDUixLQUFLLE9BQU8sQ0FBQyxNQUFNO3dCQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsYUFBVSxPQUFPLEVBQUUsQ0FBQzt3QkFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLGFBQVUsT0FBTyxFQUFFLENBQUM7d0JBQzNDLE1BQU07b0JBQ1I7d0JBQ0UsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNmLE1BQU07aUJBQ1Q7Ozs7OztRQUdLLHdDQUFXOzs7O3NCQUFDLFVBQW1CO2dCQUVyQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztnQkFFckIsUUFBTyxVQUFVO29CQUVmLEtBQUssT0FBTyxDQUFDLEdBQUc7d0JBQ2QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNoQixNQUFNO29CQUNSLEtBQUssT0FBTyxDQUFDLEtBQUs7d0JBQ2hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzt3QkFDbEIsTUFBTTtvQkFDUixLQUFLLE9BQU8sQ0FBQyxNQUFNO3dCQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsYUFBVSxNQUFNLEVBQUUsQ0FBQzt3QkFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLGFBQVUsTUFBTSxFQUFFLENBQUM7d0JBQzFDLE1BQU07b0JBQ1I7d0JBQ0UsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO3dCQUNoQixNQUFNO2lCQUNUOzs7OztRQUdLLHVDQUFVOzs7O2dCQUVoQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDOzs7OztRQUd0QixvQ0FBTzs7OztnQkFFYixJQUFHLElBQUksQ0FBQyxXQUFXO29CQUNqQixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQzs7b0JBRXJCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDOzs7OztRQUdqQixxQ0FBUTs7OztnQkFFZCxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQzs7Ozs7O1FBR2YsNkNBQWdCOzs7O3NCQUFDLE9BQXVCO2dCQUF2Qix3QkFBQTtvQkFBQSxjQUF1Qjs7Z0JBRTlDLHFCQUFJLEtBQUssR0FBZSxFQUFFLENBQUM7Z0JBQzNCLHFCQUFJLFFBQVEsR0FBWSxJQUFJLENBQUM7Z0JBQzdCLHFCQUFJLFFBQVEsR0FBWSxJQUFJLENBQUM7Z0JBRTdCLElBQUcsSUFBSSxDQUFDLFdBQVcsRUFDbkI7b0JBQ0UsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxhQUFVLEtBQUssQ0FBQztvQkFDckQsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxhQUFVLEtBQUssQ0FBQztpQkFDdEQ7cUJBRUQ7b0JBQ0UsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxhQUFVLEtBQUssQ0FBQztvQkFDbEQsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxhQUFVLEtBQUssQ0FBQztpQkFDbkQ7Z0JBRUQsSUFBRyxDQUFDLE9BQU8sRUFDWDtvQkFDRSxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztvQkFDMUIsS0FBSyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7aUJBQzNCO2dCQUNELElBQUcsT0FBTyxJQUFJLE9BQU8sS0FBSyxLQUFLO29CQUM3QixLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDNUIsSUFBRyxPQUFPLElBQUksT0FBTyxLQUFLLEtBQUs7b0JBQzdCLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUU1QixPQUFPLEtBQUssQ0FBQzs7Ozs7UUFPUCw0Q0FBZTs7OztnQkFFckIscUJBQUksa0JBQWtCLEdBQVMsSUFBSSxDQUFDO2dCQUNwQyxxQkFBSSxXQUFXLEdBQWdCLElBQUksQ0FBQzs7Z0JBR3BDLGtCQUFrQixHQUFHO29CQUNuQixHQUFHLEVBQVEsT0FBTyxDQUFDLEdBQUc7b0JBQ3RCLFFBQVEsRUFBRyxPQUFPLENBQUMsR0FBRztvQkFDdEIsR0FBRyxFQUFRLE9BQU8sQ0FBQyxHQUFHO2lCQUN2QixDQUFDO2dCQUVGLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOztnQkFHeEUsSUFBRyxXQUFXLENBQUMsR0FBRyxLQUFLLE9BQU8sQ0FBQyxNQUFNO29CQUNuQyxXQUFXLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQ2hDLElBQUcsV0FBVyxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsTUFBTTtvQkFDeEMsV0FBVyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUNyQyxJQUFHLElBQUksQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsTUFBTTtvQkFDdkQsV0FBVyxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO2dCQUVoQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQzs7Ozs7UUFHekIsc0NBQVM7Ozs7Z0JBRWYscUJBQUksS0FBSyxHQUFZLElBQUksQ0FBQzs7Z0JBRzFCLFFBQU8sSUFBSSxDQUFDLFdBQVc7b0JBRXJCLEtBQUssTUFBTSxDQUFDLEtBQUs7d0JBQ2YsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7d0JBQ3pCLE1BQU07b0JBQ1IsS0FBSyxNQUFNLENBQUMsSUFBSTt3QkFDZCxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzt3QkFDekIsTUFBTTtvQkFDUjt3QkFDRSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQzt3QkFDckIsTUFBTTtpQkFDVDtnQkFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7Ozs7UUFHYixzQ0FBUzs7OztnQkFFZixxQkFBSSxZQUFZLEdBQVMsSUFBSSxDQUFDO2dCQUM5QixxQkFBSSxLQUFLLEdBQWdCLElBQUksQ0FBQzs7Z0JBRzlCLFlBQVksR0FBRztvQkFDYixrQkFBa0IsRUFBRyxJQUFJO29CQUN6QixrQkFBa0IsRUFBRyxJQUFJO2lCQUMxQixDQUFDO2dCQUVGLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOzs7OztRQUdiLHdDQUFXOzs7O2dCQUVqQixxQkFBSSxhQUFhLEdBQVMsSUFBSSxDQUFDO2dCQUMvQixxQkFBSSxPQUFPLEdBQWUsSUFBSSxDQUFDOztnQkFHL0IsYUFBYSxHQUFHO29CQUNkLGNBQWMsRUFBRyxJQUFJO29CQUNyQixNQUFNLEVBQVcsSUFBSTtvQkFDckIsTUFBTSxFQUFXLElBQUk7b0JBQ3JCLFFBQVEsRUFBUyxJQUFJO2lCQUN0QixDQUFDO2dCQUVGLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzNELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzs7OztRQUdqQix1Q0FBVTs7OztnQkFFaEIscUJBQUksYUFBYSxHQUFTLElBQUksQ0FBQztnQkFDL0IscUJBQUksTUFBTSxHQUFnQixJQUFJLENBQUM7O2dCQUcvQixhQUFhLEdBQUc7b0JBQ2QsbUJBQW1CLEVBQUcsSUFBSTtvQkFDMUIsa0JBQWtCLEVBQUksSUFBSTtvQkFDMUIsZ0JBQWdCLEVBQU0sSUFBSTtvQkFDMUIsa0JBQWtCLEVBQUksSUFBSTtvQkFDMUIsa0JBQWtCLEVBQUksSUFBSTtpQkFDM0IsQ0FBQztnQkFFRixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7Ozs7UUFHZix1Q0FBVTs7OztnQkFFaEIscUJBQUksYUFBYSxHQUFTLElBQUksQ0FBQztnQkFDL0IscUJBQUksTUFBTSxHQUFnQixJQUFJLENBQUM7O2dCQUcvQixhQUFhLEdBQUc7b0JBQ2QsS0FBSyxFQUFHLElBQUk7b0JBQ1osR0FBRyxFQUFLLElBQUk7b0JBQ1osR0FBRyxFQUFLLElBQUk7aUJBQ2IsQ0FBQztnQkFFRixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7Ozs7UUFHZix5Q0FBWTs7Ozs7Z0JBR2xCLHFCQUFJLGtCQUFrQixHQUFZLElBQUksQ0FBQztnQkFDdkMscUJBQUksV0FBVyxHQUFtQixJQUFJLENBQUM7Z0JBQ3ZDLHFCQUFJLFVBQVUsR0FBb0IsQ0FBQyxDQUFDO2dCQUNwQyxxQkFBSSxVQUFVLEdBQW9CLEdBQUcsQ0FBQzs7Z0JBR3RDLGtCQUFrQixHQUFHO29CQUNuQixLQUFLLEVBQUc7d0JBQ04sR0FBRyxFQUFHLFVBQVU7d0JBQ2hCLEdBQUcsRUFBRyxVQUFVO3FCQUNqQjtvQkFDRCxJQUFJLEVBQUssSUFBSTtvQkFDYixNQUFNLEVBQUcsSUFBSTtvQkFDYixLQUFLLEVBQUksSUFBSTtvQkFDYixLQUFLLEVBQUksSUFBSTtpQkFDZCxDQUFDO2dCQUVGLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUV4RSxJQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUNoRDtvQkFDRSxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUM7b0JBQ25DLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQztpQkFDcEM7Z0JBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7O2dCQUcvQixJQUFHLENBQUMsSUFBSSxDQUFDLGVBQWU7b0JBQ3RCLE9BQU87Z0JBRVQscUJBQUksVUFBVSxHQUFTLEVBQUUsQ0FBQztnQkFFMUIsUUFBTyxJQUFJLENBQUMsZUFBZTtvQkFFekIsS0FBSyxZQUFZLENBQUMsS0FBSzt3QkFDckIsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3BDLE1BQU07b0JBQ1IsS0FBSyxZQUFZLENBQUMsS0FBSzt3QkFDckIsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3BDLE1BQU07b0JBQ1I7d0JBQ0UscUJBQUksTUFBTSxHQUFZLElBQUksQ0FBQzt3QkFDM0IsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDMUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQzdDLE1BQU07aUJBQ1Q7Z0JBRUQsVUFBVSxDQUFDLElBQUksQ0FBQ0ssZ0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDckMsSUFBRyxJQUFJLENBQUMsV0FBVztvQkFDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLGFBQVUsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztvQkFFOUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLGFBQVUsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7OztRQUd2RCx1Q0FBVTs7OztnQkFFaEIscUJBQUksYUFBYSxHQUFTLEVBQUUsQ0FBQztnQkFDN0IscUJBQUksTUFBTSxHQUFnQixFQUFFLENBQUM7Z0JBRTdCLGFBQWEsQ0FBQyxNQUFNLEdBQUc7b0JBQ3JCLFFBQVEsRUFBVyxlQUFlO29CQUNsQyxXQUFXLEVBQVEsb0NBQW9DO29CQUN2RCxhQUFhLEVBQU0sZ0JBQWdCO29CQUNuQyxnQkFBZ0IsRUFBRyw2QkFBNkI7b0JBQ2hELFFBQVEsRUFBVyxLQUFLO29CQUN4QixXQUFXLEVBQVEsb0NBQW9DO29CQUN2RCxhQUFhLEVBQU0sV0FBVztvQkFDOUIsZ0JBQWdCLEVBQUcsNENBQTRDO2lCQUNoRSxDQUFDO2dCQUNGLGFBQWEsQ0FBQyxLQUFLLEdBQUc7b0JBQ3BCLFFBQVEsRUFBTSxVQUFVO29CQUN4QixRQUFRLEVBQU0sVUFBVTtvQkFDeEIsU0FBUyxFQUFLLG1CQUFtQjtvQkFDakMsV0FBVyxFQUFHLGNBQWM7aUJBQzdCLENBQUM7Z0JBQ0YsYUFBYSxDQUFDLE1BQU0sR0FBRztvQkFDckIsTUFBTSxFQUFXLFNBQVM7b0JBQzFCLE1BQU0sRUFBVyxTQUFTO29CQUMxQixJQUFJLEVBQWEsTUFBTTtvQkFDdkIsSUFBSSxFQUFhLE1BQU07b0JBQ3ZCLElBQUksRUFBYSxNQUFNO29CQUN2QixJQUFJLEVBQWEsTUFBTTtvQkFDdkIsY0FBYyxFQUFHLGlCQUFpQjtvQkFDbEMsWUFBWSxFQUFLLHFCQUFxQjtvQkFDdEMsY0FBYyxFQUFHLHVCQUF1QjtpQkFDekMsQ0FBQztnQkFDRixhQUFhLENBQUMsTUFBTSxHQUFHO29CQUNyQixRQUFRLEVBQVEsd0JBQXdCO29CQUN4QyxhQUFhLEVBQUcsd0NBQXdDO29CQUN4RCxLQUFLLEVBQVcsNkJBQTZCO29CQUM3QyxLQUFLLEVBQVcsbUNBQW1DO29CQUNuRCxTQUFTLEVBQU8scUNBQXFDO29CQUNyRCxXQUFXLEVBQUssaURBQWlEO29CQUNqRSxTQUFTLEVBQU8sOENBQThDO29CQUM5RCxZQUFZLEVBQUksZ0RBQWdEO29CQUNoRSxZQUFZLEVBQUksZ0RBQWdEO29CQUNoRSxTQUFTLEVBQU8sc0NBQXNDO29CQUN0RCxVQUFVLEVBQU0seUZBQXlGO2lCQUMxRyxDQUFDO2dCQUVGLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBRXpELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOzs7OztRQUdmLDJDQUFjOzs7O2dCQUVwQixJQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFDcEI7b0JBQ0UsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQzt3QkFDbEMsUUFBUSxFQUFPLElBQUlDLGlCQUFXLENBQUM7NEJBQzdCLEtBQUssRUFBUSxJQUFJOzRCQUNqQixRQUFRLEVBQUssS0FBSzt5QkFDbkIsRUFBQyxDQUFDRCxnQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUN4QixRQUFRLEVBQU8sSUFBSUMsaUJBQVcsQ0FBQzs0QkFDN0IsS0FBSyxFQUFRLElBQUk7NEJBQ2pCLFFBQVEsRUFBSyxLQUFLO3lCQUNuQixFQUFDLENBQUNELGdCQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQ3pCLENBQUMsQ0FBQztvQkFDSCxPQUFPO2lCQUNSO2dCQUVELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7b0JBQ3JDLFFBQVEsRUFBTyxJQUFJQyxpQkFBVyxDQUFDO3dCQUM3QixLQUFLLEVBQVEsSUFBSTt3QkFDakIsUUFBUSxFQUFLLEtBQUs7cUJBQ25CLEVBQUMsQ0FBQ0QsZ0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDekIsQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7b0JBQ3JDLFFBQVEsRUFBTyxJQUFJQyxpQkFBVyxDQUFDO3dCQUM3QixLQUFLLEVBQVEsSUFBSTt3QkFDakIsUUFBUSxFQUFLLEtBQUs7cUJBQ25CLEVBQUMsQ0FBQ0QsZ0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDekIsQ0FBQyxDQUFDOzs7b0JBNWtDTkosY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBTSxnQkFBZ0I7d0JBQzlCLFFBQVEsRUFBRSx1Z2JBMlFMO3dCQUNMLE1BQU0sRUFBRSxDQUFDLDY2SEFBNjZILENBQUM7cUJBQ3g3SDs7Ozs7d0JBdFNRTSxrQkFBUzt3QkFFVEMsNEJBQVk7d0JBRFpDLHdCQUFlO3dCQUlmQyxpQkFBVzs7OzttQ0FpVGpCQyxVQUFLO29DQUVMQSxVQUFLO29DQUVMQSxVQUFLOzBDQUdMQSxVQUFLO3dDQUlMQSxVQUFLOzBDQUVMQSxVQUFLO29DQUdMQSxVQUFLO3NDQUdMQSxVQUFLO3FDQUdMQSxVQUFLO3FDQUdMQSxVQUFLO3FDQUdMQSxVQUFLO29DQUdMQyxXQUFNOytCQUVOQSxXQUFNOzhCQUVOQSxXQUFNO29DQUVOQSxXQUFNO2tDQUVOQSxXQUFNO3FDQUVOQSxXQUFNO3FDQUVOQSxXQUFNO21DQUVOQSxXQUFNO29DQUVOQSxXQUFNO2dDQUVOQSxXQUFNO2dDQUVOQSxXQUFNOztpQ0FuWFQ7Ozs7Ozs7QUNDQTtRQXdIRTt5QkFsQ2tCLEtBQUs7O2dDQVkyQixJQUFJWixpQkFBWSxFQUFFOztpQ0FRdEIsSUFBSUEsaUJBQVksRUFBRTtnQ0FDbEIsSUFBSUEsaUJBQVksRUFBRTs7bUNBT2hCLElBQUlBLGlCQUFZLEVBQUU7OztvQ0FJakIsSUFBSUEsaUJBQVksRUFBRTtTQU1sRTs7OztRQUVNLHNDQUFROzs7Ozs7OztRQUlSLHlDQUFXOzs7Ozs7OztRQUlYLHlDQUFXOzs7O2dCQUVoQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDOzs7Ozs7UUFHcEIsZ0RBQWtCOzs7O3NCQUFDLE1BQVk7Z0JBRXBDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7UUFHM0IsK0NBQWlCOzs7O3NCQUFDLE1BQVk7Z0JBRW5DLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7UUFHMUIsa0RBQW9COzs7O3NCQUFDLE1BQVk7Z0JBRXRDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7Ozs7UUFHN0IsbURBQXFCOzs7O3NCQUFDLE1BQVk7Z0JBRXZDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7OztvQkFsSnRDQyxjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFNLGlCQUFpQjt3QkFDL0IsUUFBUSxFQUFFLGtvRkFvRUk7d0JBQ2QsTUFBTSxFQUFFLENBQUMsd0NBQXdDLENBQUM7cUJBQ25EOzs7OztpQ0FRRVUsVUFBSzsrQkFFTEEsVUFBSzsrQkFFTEEsVUFBSzsrQkFFTEEsVUFBSztxQ0FFTEMsV0FBTTtnQ0FJTkQsVUFBSztvQ0FFTEEsVUFBSztzQ0FFTEMsV0FBTTtxQ0FDTkEsV0FBTTs2QkFJTkQsVUFBSzsrQkFDTEEsVUFBSzt3Q0FFTEMsV0FBTTt5Q0FJTkEsV0FBTTs7a0NBdkhUOzs7Ozs7O0lDU0EsSUFBQTs7Ozs7Ozs7UUFFZ0IsdUJBQVU7Ozs7O3NCQUFDLEdBQVksRUFBRSxHQUFZO2dCQUVqRCxxQkFBSSxJQUFJLEdBQUcsVUFBQyxPQUF5QjtvQkFFbkMscUJBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUM7b0JBQ3hHLElBQUssQ0FBQyxZQUFhO3dCQUNqQixPQUFPLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDO29CQUU5QixPQUFPLElBQUksQ0FBQztpQkFDYixDQUFDO2dCQUNGLE9BQU8sSUFBSSxDQUFDOzs7Ozs7UUFHQSxtQkFBTTs7OztzQkFBQyxPQUFxQjtnQkFFeEMscUJBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuRSxJQUFLLENBQUMsU0FBVTtvQkFDZCxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDO2dCQUUxQixPQUFPLElBQUksQ0FBQzs7Ozs7O1FBR0Esa0JBQUs7Ozs7c0JBQUMsT0FBcUI7Z0JBRXZDLHFCQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckUsSUFBSyxDQUFDLFFBQVM7b0JBQ2IsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQztnQkFFekIsT0FBTyxJQUFJLENBQUM7Ozs7OztRQUdBLGtCQUFLOzs7O3NCQUFDLE9BQXFCO2dCQUV2QyxxQkFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3JFLElBQUssQ0FBQyxRQUFTO29CQUNiLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBRXpCLE9BQU8sSUFBSSxDQUFDOzs7Ozs7UUFHQSxpQkFBSTs7OztzQkFBQyxPQUFxQjtnQkFFdEMscUJBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLDRCQUE0QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pGLElBQUssQ0FBQyxPQUFRO29CQUNaLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7Z0JBRXhCLE9BQU8sSUFBSSxDQUFDOzsyQkF6RGhCO1FBMkRDLENBQUE7Ozs7OztBQ3ZERDtRQThJRSwwQkFFVTtZQUFBLFlBQU8sR0FBUCxPQUFPO2dDQXBCa0IsS0FBSzs7bUNBZVEsSUFBSVosaUJBQVksRUFBRTtnQ0FDbEIsSUFBSUEsaUJBQVksRUFBRTtTQU9qRTs7OztRQUVNLG1DQUFROzs7O2dCQUViLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7Ozs7O1FBR2pCLHNDQUFXOzs7O3NCQUFDLE9BQXVCO2dCQUV4QyxJQUFHLE9BQU87b0JBQ1IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7UUFHdkIsc0NBQVc7Ozs7Ozs7O1FBSVgsK0JBQUk7Ozs7Z0JBRVQscUJBQUksS0FBSyxHQUFTLEVBQUUsQ0FBQztnQkFFckIscUJBQUksU0FBUyxHQUFjLElBQUksQ0FBQztnQkFDaEMscUJBQUksV0FBVyxHQUFZLElBQUksQ0FBQztnQkFFaEMsU0FBUyxHQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxjQUFXLEtBQUssQ0FBQztnQkFDMUQsV0FBVyxHQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxnQkFBYSxLQUFLLENBQUM7Z0JBRTVELEtBQUssQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUFDOztnQkFHN0IsSUFBRyxJQUFJLENBQUMsT0FBTyxFQUNmO29CQUNFLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNqQyxPQUFPO2lCQUNSO2dCQUVELEtBQUssQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDOztnQkFFdkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7OztRQUd4Qix5Q0FBYzs7OztzQkFBQyxPQUF5QjtnQkFBekIsd0JBQUE7b0JBQUEsZUFBeUI7O2dCQUU5QyxxQkFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDO2dCQUNoQyxxQkFBSSxXQUFXLEdBQVksSUFBSSxDQUFDO2dCQUVoQyxJQUFHLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUM1QjtvQkFDRSxTQUFTLEdBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLGNBQVcsS0FBSyxDQUFDO29CQUN0RCxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLGdCQUFhLEtBQUssQ0FBQztpQkFDekQ7Z0JBRUQscUJBQUksVUFBVSxHQUFTLEVBQUUsQ0FBQztnQkFFMUIsSUFBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7b0JBQ3RCLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxJQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTTtvQkFDeEIsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLO29CQUN2QixVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEMsSUFBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUs7b0JBQ3ZCLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUV0QyxVQUFVLENBQUMsSUFBSSxDQUFDSyxnQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNyQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7O2dCQUdqRyxxQkFBSSxVQUFVLEdBQVksSUFBSSxDQUFDO2dCQUMvQixVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUMxQyxVQUFVLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3ZFLFVBQVUsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdkUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEdBQUcsVUFBVSxDQUFDO2dCQUVsRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO29CQUNsQyxTQUFTLEVBQU0sSUFBSUMsaUJBQVcsQ0FBQzt3QkFDN0IsS0FBSyxFQUFRLFNBQVM7d0JBQ3RCLFFBQVEsRUFBSyxLQUFLO3FCQUNuQixDQUFDO29CQUNGLFdBQVcsRUFBSSxJQUFJQSxpQkFBVyxDQUFDO3dCQUM3QixLQUFLLEVBQVEsV0FBVzt3QkFDeEIsUUFBUSxFQUFLLEtBQUs7cUJBQ25CLEVBQUUsVUFBVSxDQUFDO2lCQUNmLENBQUMsQ0FBQztnQkFFSCxJQUFHLENBQUMsSUFBSSxDQUFDLE9BQU87b0JBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLGNBQVcsYUFBYSxDQUFDLENBQUNELGdCQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7O29CQTNONUVKLGNBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQU0sY0FBYzt3QkFDNUIsUUFBUSxFQUFFLDB0TEF1R0o7d0JBQ04sTUFBTSxFQUFFLENBQUMsK0tBQStLLENBQUM7cUJBQzFMOzs7Ozt3QkFqSFFTLGlCQUFXOzs7OytCQXlIakJDLFVBQUs7K0JBRUxBLFVBQUs7K0JBRUxBLFVBQUs7Z0NBR0xBLFVBQUs7b0NBRUxBLFVBQUs7d0NBRUxDLFdBQU07cUNBQ05BLFdBQU07OytCQWhKVDs7Ozs7OztBQ0VBO1FBK0RFLCtCQUVVO1lBQUEsWUFBTyxHQUFQLE9BQU87OzJCQUo4QixJQUFJWixpQkFBWSxFQUFFO1NBT2hFOzs7O1FBRU0sd0NBQVE7Ozs7Z0JBRWIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOzs7OztRQUdqQiwyQ0FBVzs7Ozs7Ozs7UUFJWCxvQ0FBSTs7OztnQkFFVCxxQkFBSSxLQUFLLEdBQVMsRUFBRSxDQUFDO2dCQUVyQixxQkFBSSxTQUFTLEdBQVksSUFBSSxDQUFDO2dCQUU5QixTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLGNBQVcsS0FBSyxDQUFDO2dCQUVwRCxLQUFLLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQztnQkFFdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7O1FBR25CLDhDQUFjOzs7O2dCQUVwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO29CQUNsQyxTQUFTLEVBQUcsSUFBSU0saUJBQVcsQ0FBQzt3QkFDMUIsS0FBSyxFQUFRLElBQUk7d0JBQ2pCLFFBQVEsRUFBSyxLQUFLO3FCQUNuQixFQUFFLENBQUVELGdCQUFVLENBQUMsUUFBUSxDQUFFLENBQUM7aUJBQzVCLENBQUMsQ0FBQzs7O29CQXpGTkosY0FBUyxTQUFDO3dCQUNULFFBQVEsRUFBTSxvQkFBb0I7d0JBQ2xDLFFBQVEsRUFBRSwrNUNBK0JKO3dCQUNOLE1BQU0sRUFBRSxDQUFDLDhEQUE4RCxDQUFDO3FCQUN6RTs7Ozs7d0JBdENRUyxpQkFBVzs7OzsrQkE0Q2pCQyxVQUFLOytCQUVMQSxVQUFLOytCQUVMQSxVQUFLOytCQUdMQSxVQUFLOzZCQUNMQSxVQUFLO2dDQUVMQyxXQUFNOztvQ0EvRFQ7Ozs7Ozs7QUNFQTtRQXdERSwwQkFFVTtZQUFBLFlBQU8sR0FBUCxPQUFPOzsyQkFKNEIsSUFBSVosaUJBQVksRUFBRTtTQU85RDs7OztRQUVNLG1DQUFROzs7O2dCQUViLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7Ozs7UUFHakIsc0NBQVc7Ozs7Ozs7O1FBSVgsK0JBQUk7Ozs7Z0JBRVQscUJBQUksS0FBSyxHQUFnQixFQUFFLENBQUM7Z0JBQzVCLHFCQUFJLFNBQVMsR0FBWSxJQUFJLENBQUM7Z0JBRTlCLFNBQVMsR0FBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsY0FBVyxLQUFLLENBQUM7Z0JBQ3JELEtBQUssQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO2dCQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs7Ozs7UUFHbkIseUNBQWM7Ozs7Z0JBRXBCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7b0JBQ2xDLFNBQVMsRUFBRyxJQUFJTSxpQkFBVyxDQUFDO3dCQUMxQixLQUFLLEVBQVEsSUFBSTt3QkFDakIsUUFBUSxFQUFLLEtBQUs7cUJBQ25CLEVBQUUsQ0FBRUQsZ0JBQVUsQ0FBQyxRQUFRLENBQUUsQ0FBQztpQkFDNUIsQ0FBQyxDQUFDOzs7b0JBL0VOSixjQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFNLGNBQWM7d0JBQzVCLFFBQVEsRUFBRSx5d0NBMkJKO3dCQUNOLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztxQkFDYjs7Ozs7d0JBbENRUyxpQkFBVzs7OzsrQkF3Q2pCQyxVQUFLOytCQUVMQSxVQUFLOytCQUVMQSxVQUFLO2dDQUdMQyxXQUFNOzsrQkF4RFQ7OztJQ0FBOzs7Ozs7Ozs7Ozs7OztBQWNBLHNCQXNGeUIsQ0FBQztRQUN0QixJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTTtvQkFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO2FBQzNDO1NBQ0osQ0FBQztJQUNOLENBQUM7Ozs7Ozs7Ozs7Ozs7O1FDdkdDLG9DQUFTOzs7OztZQUFULFVBQVUsS0FBVyxFQUFFLE1BQWU7Z0JBRXBDLHFCQUFJLEtBQUssR0FBYSxLQUFLLENBQUM7O29CQUM1QixLQUFpQixJQUFBLEtBQUFDLFNBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQSxnQkFBQTt3QkFBN0IsSUFBSSxHQUFHLFdBQUE7d0JBQ1gsSUFBSyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssTUFBTzs0QkFDekIsS0FBSyxHQUFHLElBQUksQ0FBQztxQkFBQTs7Ozs7Ozs7Ozs7Ozs7O2dCQUVqQixPQUFPLEtBQUssQ0FBQzs7YUFDZDs7b0JBWEZDLFNBQUksU0FBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUU7OytCQUg5Qjs7Ozs7OztBQ0NBOzs7O29CQWdEQ0MsYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFHUEMsd0JBQWU7NEJBR2ZDLHVCQUFjOzRCQVVkQyxzQkFBYTs0QkFFYkMsd0JBQWU7NEJBTWZDLHNCQUFhO3lCQUlkO3FCQUNGOzs2QkEvRUQ7Ozs7OztvQkFrRkNMLGFBQVEsU0FBQzt3QkFDUixPQUFPLEVBQUU7NEJBQ1BNLG1CQUFZOzRCQUNaLGNBQWM7NEJBQ2RDLGlCQUFXOzRCQUNYQyx5QkFBbUI7NEJBQ25CQywyQkFBWTt5QkFDYjt3QkFDRCxZQUFZLEVBQUU7NEJBQ1osa0JBQWtCOzRCQUNsQixnQkFBZ0I7NEJBQ2hCLHFCQUFxQjs0QkFDckIsbUJBQW1COzRCQUNuQixxQkFBcUI7NEJBQ3JCLGdCQUFnQjs0QkFDaEIsZ0JBQWdCO3lCQUNqQjt3QkFDRCxTQUFTLEVBQUUsRUFDVjt3QkFDRCxlQUFlLEVBQUUsQ0FBRSxxQkFBcUIsQ0FBRTt3QkFDMUMsT0FBTyxFQUFFOzRCQUNQLGtCQUFrQjs0QkFDbEIsZ0JBQWdCOzRCQUNoQixxQkFBcUI7NEJBQ3JCLG1CQUFtQjs0QkFDbkIscUJBQXFCOzRCQUNyQixnQkFBZ0I7NEJBQ2hCLGdCQUFnQjt5QkFDakI7cUJBQ0Y7OzhCQS9HRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==