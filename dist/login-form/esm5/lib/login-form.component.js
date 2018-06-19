/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UsrValidator } from './validators/usr.validator';
import { Layouts } from './enums/layouts.enum';
import { Themes } from './enums/themes.enum';
import { Forms } from './enums/forms.enum';
import { UserPolicies } from './enums/user-policies.enum';
import { ModalWrapperComponent } from './layouts/modal-wrapper/modal-wrapper.component';
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
export { LoginFormComponent };
function LoginFormComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    LoginFormComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    LoginFormComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    LoginFormComponent.propDecorators;
    /** @type {?} */
    LoginFormComponent.prototype.formLayouts;
    /** @type {?} */
    LoginFormComponent.prototype.theme;
    /** @type {?} */
    LoginFormComponent.prototype.usrPolicy;
    /** @type {?} */
    LoginFormComponent.prototype.pwdPolicies;
    /** @type {?} */
    LoginFormComponent.prototype.icons;
    /** @type {?} */
    LoginFormComponent.prototype.buttons;
    /** @type {?} */
    LoginFormComponent.prototype.inputs;
    /** @type {?} */
    LoginFormComponent.prototype.errors;
    /** @type {?} */
    LoginFormComponent.prototype.labels;
    /** @type {?} */
    LoginFormComponent.prototype.fixedWidth;
    /** @type {?} */
    LoginFormComponent.prototype.googleStyle;
    /** @type {?} */
    LoginFormComponent.prototype.googleTheme;
    /** @type {?} */
    LoginFormComponent.prototype.customFormLayouts;
    /** @type {?} */
    LoginFormComponent.prototype.customUsrPolicy;
    /** @type {?} */
    LoginFormComponent.prototype.customPwdPolicies;
    /** @type {?} */
    LoginFormComponent.prototype.customIcons;
    /** @type {?} */
    LoginFormComponent.prototype.customButtons;
    /** @type {?} */
    LoginFormComponent.prototype.customInputs;
    /** @type {?} */
    LoginFormComponent.prototype.customErrors;
    /** @type {?} */
    LoginFormComponent.prototype.customLabels;
    /** @type {?} */
    LoginFormComponent.prototype.initialized;
    /** @type {?} */
    LoginFormComponent.prototype.signUp;
    /** @type {?} */
    LoginFormComponent.prototype.login;
    /** @type {?} */
    LoginFormComponent.prototype.loginSocial;
    /** @type {?} */
    LoginFormComponent.prototype.forgotPwd;
    /** @type {?} */
    LoginFormComponent.prototype.sendResetPwd;
    /** @type {?} */
    LoginFormComponent.prototype.sendFirstPwd;
    /** @type {?} */
    LoginFormComponent.prototype.saveMfaKey;
    /** @type {?} */
    LoginFormComponent.prototype.sendMfaCode;
    /** @type {?} */
    LoginFormComponent.prototype.stepUsr;
    /** @type {?} */
    LoginFormComponent.prototype.stepPwd;
    /** @type {?} */
    LoginFormComponent.prototype.formGroup;
    /** @type {?} */
    LoginFormComponent.prototype.showPassword;
    /** @type {?} */
    LoginFormComponent.prototype.formType;
    /** @type {?} */
    LoginFormComponent.prototype.userPolicies;
    /** @type {?} */
    LoginFormComponent.prototype.forms;
    /** @type {?} */
    LoginFormComponent.prototype.isFirst;
    /** @type {?} */
    LoginFormComponent.prototype.code;
    /** @type {?} */
    LoginFormComponent.prototype.qrCode;
    /** @type {?} */
    LoginFormComponent.prototype.usrFormGroup;
    /** @type {?} */
    LoginFormComponent.prototype.pwdFormGroup;
    /** @type {?} */
    LoginFormComponent.prototype.userInfo;
    /** @type {?} */
    LoginFormComponent.prototype.userImage;
    /** @type {?} */
    LoginFormComponent.prototype.layouts;
    /** @type {?} */
    LoginFormComponent.prototype.selectedTab;
    /** @type {?} */
    LoginFormComponent.prototype.closeModalEvent;
    /** @type {?} */
    LoginFormComponent.prototype.modalFirstSub;
    /** @type {?} */
    LoginFormComponent.prototype.modalLostSub;
    /** @type {?} */
    LoginFormComponent.prototype.modalSaveMfaKeySub;
    /** @type {?} */
    LoginFormComponent.prototype.modalSendMfaCodeSub;
    /** @type {?} */
    LoginFormComponent.prototype.dialog;
    /** @type {?} */
    LoginFormComponent.prototype.sanitizer;
    /** @type {?} */
    LoginFormComponent.prototype.iconRegistry;
    /** @type {?} */
    LoginFormComponent.prototype.builder;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2FsaWF0eXMvbG9naW4tZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9sb2dpbi1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBTUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFnQixlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFlLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQVksZUFBZSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBUyxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFZLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQVMsMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFVLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBVSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQVcsZ0JBQWdCLENBQUM7QUFNakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFTLDRCQUE0QixDQUFDO0FBRzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBYyxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQWUscUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFnQixvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQVMsNEJBQTRCLENBQUM7QUFHN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saURBQWlELENBQUM7O0lBb1h0RixnQkFBZ0I7SUFDaEIsK0RBQStEO0lBRS9ELDRCQUVVLFFBQ0EsV0FDQSxjQUNBO1FBSEEs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QUFVLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDekIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNyQyxRQUFRLEVBQU8sSUFBSSxXQUFXLENBQUM7Z0JBQzdCLEtBQUssRUFBUSxJQUFJO2dCQUNqQixRQUFRLEVBQUssS0FBSzthQUNuQixFQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3pCLENBQUMsQ0FBQzs7O2dCQTVrQ04sU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBTSxnQkFBZ0I7b0JBQzlCLFFBQVEsRUFBRSx1Z2JBMlFMO29CQUNMLE1BQU0sRUFBRSxDQUFDLDY2SEFBNjZILENBQUM7aUJBQ3g3SDs7OztnQkF0U1EsU0FBUztnQkFFVCxZQUFZO2dCQURaLGVBQWU7Z0JBSWYsV0FBVzs7OytCQWlUakIsS0FBSztnQ0FFTCxLQUFLO2dDQUVMLEtBQUs7c0NBR0wsS0FBSztvQ0FJTCxLQUFLO3NDQUVMLEtBQUs7Z0NBR0wsS0FBSztrQ0FHTCxLQUFLO2lDQUdMLEtBQUs7aUNBR0wsS0FBSztpQ0FHTCxLQUFLO2dDQUdMLE1BQU07MkJBRU4sTUFBTTswQkFFTixNQUFNO2dDQUVOLE1BQU07OEJBRU4sTUFBTTtpQ0FFTixNQUFNO2lDQUVOLE1BQU07K0JBRU4sTUFBTTtnQ0FFTixNQUFNOzRCQUVOLE1BQU07NEJBRU4sTUFBTTs7NkJBblhUOztTQWlUYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBBbmd1bGFyIG1vZHVsZXNcclxuaW1wb3J0IHsgT25Jbml0IH0gICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFmdGVyVmlld0luaXQgfSAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPbkNoYW5nZXMgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU2ltcGxlQ2hhbmdlcyB9ICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9uRGVzdHJveSB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBJbnB1dCB9ICAgICAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT3V0cHV0IH0gICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWF0RGlhbG9nIH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBNYXRJY29uUmVnaXN0cnkgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XHJcbmltcG9ydCB7IERvbVNhbml0aXplciB9ICAgIGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9ICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZvcm1Hcm91cCB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSAgICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBWYWxpZGF0b3JzIH0gICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG4vLyBFeHRlcm5hbCBtb2R1bGVzXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9ICAgIGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcclxuXHJcbi8vIEludGVybmFsIG1vZHVsZXNcclxuaW1wb3J0IHsgVXNyVmFsaWRhdG9yIH0gICAgZnJvbSAnLi92YWxpZGF0b3JzL3Vzci52YWxpZGF0b3InO1xyXG5cclxuLy8gRW51bXNcclxuaW1wb3J0IHsgTGF5b3V0cyB9ICAgICAgICAgZnJvbSAnLi9lbnVtcy9sYXlvdXRzLmVudW0nO1xyXG5pbXBvcnQgeyBUaGVtZXMgfSAgICAgICAgICBmcm9tICcuL2VudW1zL3RoZW1lcy5lbnVtJztcclxuaW1wb3J0IHsgRm9ybXMgfSAgICAgICAgICAgZnJvbSAnLi9lbnVtcy9mb3Jtcy5lbnVtJztcclxuaW1wb3J0IHsgVXNlclBvbGljaWVzIH0gICAgZnJvbSAnLi9lbnVtcy91c2VyLXBvbGljaWVzLmVudW0nO1xyXG5cclxuLy8gQ29tcG9uZW50c1xyXG5pbXBvcnQgeyBNb2RhbFdyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL2xheW91dHMvbW9kYWwtd3JhcHBlci9tb2RhbC13cmFwcGVyLmNvbXBvbmVudCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvciAgICA6ICdjYWwtbG9naW4tZm9ybScsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwie3sgZml4ZWRXaWR0aCA/ICdsb2dpbi13cmFwcGVyJyA6ICcnIH19XCIgaWQ9XCJkZWJ1Zy1sb2dpbi1mb3JtXCI+XHJcbiAgPG1hdC10YWItZ3JvdXAgaWQ9XCJjYWxpYXR5cy1sb2dpbi1mb3JtXCIgW3NlbGVjdGVkSW5kZXhdPVwic2VsZWN0ZWRUYWJcIj5cclxuICAgIDxtYXQtdGFiIGxhYmVsPVwibG9naW4tZm9ybVwiPlxyXG4gICAgICA8IS0tIE5PVEU6IExvZ2luIGZvcm0gLS0+XHJcbiAgICAgIDxmb3JtIChuZ1N1Ym1pdCk9XCJvbkNsaWNrTG9naW4oKVwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCIgKm5nSWY9XCIhZ29vZ2xlU3R5bGVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBuby1ndXR0ZXJzXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgPCEtLSBOT1RFOiBVc2VybmFtZSAtLT5cclxuICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cInctMTAwXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgbWF0UHJlZml4IGNsYXNzPVwibXItMlwiICpuZ0lmPVwiaWNvbnMuaWNvblVzck9uTG9naW5Gb3JtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWxpZ24tYm90dG9tXCI+cGVyc29uPC9tYXQtaWNvbj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJ1c2VybmFtZVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU9XCJ1c2VybmFtZVwiIGF1dG9jb21wbGV0ZT1cInVzZXJuYW1lXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eyBsYWJlbHMuaW5wdXQudXNlcm5hbWUgfX1cIiBcclxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiLz5cclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS52YWx1ZT8ubGVuZ3RoID4gMCAmJiBpbnB1dHMuY2xlYXJVc3JPbkxvZ2luRm9ybVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIG1hdC1idXR0b24gbWF0U3VmZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiQ2xlYXJcIiBcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnVzZXJuYW1lLnNldFZhbHVlKCcnKVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBICYmIGZvcm1MYXlvdXRzLm1mYSA9PT0gbGF5b3V0cy5JTkxJTkUgPyB0cnVlIDogZmFsc2VcIiBcclxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIDwhLS0gTk9URTogRXJyb3IgbWVzc2FnZShzKSAtLT5cclxuICAgICAgICAgICAgICAgICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS5lcnJvcnM/LnJlcXVpcmVkICYmIGVycm9ycy5sb2dpblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kucmVxdWlyZWQgfX1cclxuICAgICAgICAgICAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgICAgICAgICAgICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS5lcnJvcnM/LnBhdHRlcm4gJiYgZXJyb3JzLmxvZ2luICYmIHVzclBvbGljeSA9PT0gdXNlclBvbGljaWVzLkVNQUlMXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5lbWFpbCB9fVxyXG4gICAgICAgICAgICAgICAgICA8L21hdC1oaW50PlxyXG4gICAgICAgICAgICAgICAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnVzZXJuYW1lLmVycm9ycz8ucGF0dGVybiAmJiBlcnJvcnMubG9naW4gJiYgdXNyUG9saWN5ID09PSB1c2VyUG9saWNpZXMuUEhPTkVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnBob25lIH19XHJcbiAgICAgICAgICAgICAgICAgIDwvbWF0LWhpbnQ+XHJcbiAgICAgICAgICAgICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuZXJyb3JzPy5wYXR0ZXJuICYmIGVycm9ycy5sb2dpbiAmJiB1c3JQb2xpY3kgJiYgdXNyUG9saWN5ICE9PSB1c2VyUG9saWNpZXMuRU1BSUwgJiYgdXNyUG9saWN5ICE9PSB1c2VyUG9saWNpZXMuUEhPTkVcIj5cclxuICAgICAgICAgICAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LmN1c3RvbVJlZ2V4IH19XHJcbiAgICAgICAgICAgICAgICAgIDwvbWF0LWhpbnQ+XHJcbiAgICAgICAgICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBuby1ndXR0ZXJzXCI+XHJcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICAgICAgICAgICAgPCEtLSBOT1RFOiBQYXNzd29yZCAtLT5cclxuICAgICAgICAgICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cInctMTAwXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgbWF0UHJlZml4IGNsYXNzPVwibXItMlwiICpuZ0lmPVwiaWNvbnMuaWNvblB3ZE9uTG9naW5Gb3JtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWxpZ24tYm90dG9tXCI+bG9jazwvbWF0LWljb24+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwicGFzc3dvcmRcIiBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIiBhdXRvY29tcGxldGU9XCJwYXNzd29yZFwiIFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3sgbGFiZWxzLmlucHV0LnBhc3N3b3JkIH19XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInt7IHNob3dQYXNzd29yZCA/ICd0ZXh0JyA6ICdwYXNzd29yZCcgfX1cIi8+XHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJpbnB1dHMuc2hvd1B3ZE9uTG9naW5Gb3JtXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgbWF0LWJ1dHRvbiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJDbGVhclwiIFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJzaG93UGFzc3dvcmQ9IXNob3dQYXNzd29yZFwiIFxyXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBICYmIGZvcm1MYXlvdXRzLm1mYSA9PT0gbGF5b3V0cy5JTkxJTkUgPyB0cnVlIDogZmFsc2VcIiBcclxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPG1hdC1pY29uPnt7IHNob3dQYXNzd29yZCA/ICd2aXNpYmlsaXR5X29mZicgOiAndmlzaWJpbGl0eScgfX08L21hdC1pY29uPlxyXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgPCEtLSBOT1RFOiBFcnJvciBtZXNzYWdlIC0tPlxyXG4gICAgICAgICAgICAgICAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnBhc3N3b3JkLmVycm9ycz8ucmVxdWlyZWQgJiYgZXJyb3JzLmxvZ2luXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5yZXF1aXJlZCB9fVxyXG4gICAgICAgICAgICAgICAgICA8L21hdC1oaW50PlxyXG4gICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgICAgICAgICAgICA8L2Rpdj4gXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8IS0tIE5PVEU6IEJ1dHRvbnMgLS0+XHJcbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhKCBmb3JtVHlwZSA9PT0gZm9ybXMuTUZBICYmIGZvcm1MYXlvdXRzLm1mYSA9PT0gbGF5b3V0cy5JTkxJTkUgKVwiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbm8tZ3V0dGVycyBwYi0zXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIHRleHQtbGVmdFwiPlxyXG4gICAgICAgICAgICAgICAgICA8IS0tIFRPRE86IFJlbWVtYmVyIG1lIC0tPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8IS0tIE5PVEU6IEZvcmdvdCBwYXNzd29yZCAtLT5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgdGV4dC1yaWdodFwiICpuZ0lmPVwiYnV0dG9ucy5mb3Jnb3RQYXNzd29yZFwiPlxyXG4gICAgICAgICAgICAgICAgICA8YSAoY2xpY2spPVwib25DbGlja0ZvcmdvdFBhc3N3b3JkKClcIiBocmVmPVwiI1wiIGNsYXNzPVwic21hbGxcIj5cclxuICAgICAgICAgICAgICAgICAgICB7eyBsYWJlbHMuYnV0dG9uLmZvcmdvdFBhc3N3b3JkIH19XHJcbiAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbm8tZ3V0dGVycyBwYi0zXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIHRleHQtcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgPCEtLSBOT1RFOiBTaWduIHVwIC0tPlxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gKGNsaWNrKT1cIm9uQ2xpY2tTaWduVXAoKVwiIHR5cGU9XCJidXR0b25cIiBjb2xvcj1cInByaW1hcnlcIiBjbGFzcz1cInNtYWxsIHRleHQtdXBwZXJjYXNlIG1yLTNcIiAqbmdJZj1cImJ1dHRvbnMuc2lnblVwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLmJ1dHRvbi5zaWduVXAgfX1cclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIDwhLS0gTk9URTogU2lnbiBpbiAtLT5cclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY29sb3I9XCJwcmltYXJ5XCIgW2Rpc2FibGVkXT1cIiFmb3JtR3JvdXAudmFsaWRcIiBjbGFzcz1cInNtYWxsIHRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLmJ1dHRvbi5zaWduSW4gfX1cclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgICA8IS0tIE5PVEU6IExvZ2luIGJ5IHN0ZXBzIGJ1dHRvbnMgLS0+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbm8tZ3V0dGVycyBtYi0zXCIgKm5nSWY9XCJnb29nbGVTdHlsZVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgdGV4dC1yaWdodFwiICpuZ0lmPVwiYnV0dG9ucy5zaWduVXBcIj5cclxuICAgICAgICAgIDwhLS0gTk9URTogU2lnbiB1cCAtLT5cclxuICAgICAgICAgIDxidXR0b24gbWF0LWJ1dHRvbiAoY2xpY2spPVwib25DbGlja1NpZ25VcCgpXCIgdHlwZT1cImJ1dHRvblwiIGNvbG9yPVwicHJpbWFyeVwiIGNsYXNzPVwic21hbGwgdGV4dC11cHBlcmNhc2UgbXItMlwiPlxyXG4gICAgICAgICAgICB7eyBsYWJlbHMuYnV0dG9uLnNpZ25VcCB9fVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbCB7eyBidXR0b25zLnNpZ25VcCA/ICd0ZXh0LWxlZnQnIDogJ3RleHQtY2VudGVyJ319XCI+XHJcbiAgICAgICAgICA8IS0tIE5PVEU6IFNpZ24gaW4gLS0+XHJcbiAgICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIChjbGljayk9XCJvbkNsaWNrTmV4dFN0ZXAoMClcIiB0eXBlPVwiYnV0dG9uXCIgY29sb3I9XCJwcmltYXJ5XCIgY2xhc3M9XCJzbWFsbCB0ZXh0LXVwcGVyY2FzZSBtbC0yXCI+XHJcbiAgICAgICAgICAgIHt7IGxhYmVscy5idXR0b24uc2lnbkluIH19XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDwhLS0gTk9URTogU29jaWFsIGJ1dHRvbnMgLS0+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhKCBmb3JtVHlwZSA9PT0gZm9ybXMuTUZBICYmIGZvcm1MYXlvdXRzLm1mYSA9PT0gbGF5b3V0cy5JTkxJTkUgKVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbm8tZ3V0dGVyc1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbCB0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICA8IS0tIE5PVEU6IEdvb2dsZSAtLT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtYmxvY2sgbWItM1wiICpuZ0lmPVwiYnV0dG9ucy5nb29nbGVcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm1hdC1yYWlzZWQtYnV0dG9uIGNhbC1idG4gZ29vZ2xlIHt7IHRoZW1lIH19XCIgKGNsaWNrKT1cIm9uQ2xpY2tMb2dpblNvY2lhbCgnZ29vZ2xlJylcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2FsLWJnLWljb25cIj5cclxuICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWxpZ24tbWlkZGxlIGNhbC1pY29uXCIgc3ZnSWNvbj1cImdvb2dsZVwiPjwvbWF0LWljb24+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhbC1sYWJlbFwiPnt7IGxhYmVscy5idXR0b24uZ29vZ2xlU2lnbkluIH19PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPCEtLSBOT1RFOiBGYWNlYm9vayAtLT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtYmxvY2sgbWItM1wiICpuZ0lmPVwiYnV0dG9ucy5mYWNlYm9va1wiPlxyXG4gICAgICAgICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2FsLWJ0biBmYWNlYm9va1wiIChjbGljayk9XCJvbkNsaWNrTG9naW5Tb2NpYWwoJ2ZhY2Vib29rJylcIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2FsLWJnLWljb25cIj5cclxuICAgICAgICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWxpZ24tbWlkZGxlIGNhbC1pY29uXCIgc3ZnSWNvbj1cImZhY2Vib29rXCI+PC9tYXQtaWNvbj5cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2FsLWxhYmVsXCI+e3sgbGFiZWxzLmJ1dHRvbi5mYWNlYm9va1NpZ25JbiB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwhLS0gTk9URTogSW5saW5lIE1GQSAtLT5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImZvcm1UeXBlID09PSBmb3Jtcy5NRkEgJiYgZm9ybUxheW91dHMubWZhID09PSBsYXlvdXRzLklOTElORVwiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbm8tZ3V0dGVyc1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICAgICAgICA8Y2FsLW1mYS1mb3JtIFxyXG4gICAgICAgICAgICAgIFtpbnB1dHNdPVwiaW5wdXRzXCIgXHJcbiAgICAgICAgICAgICAgW2xhYmVsc109XCJsYWJlbHNcIiBcclxuICAgICAgICAgICAgICBbZXJyb3JzXT1cImVycm9yc1wiIFxyXG4gICAgICAgICAgICAgIChzZW5kTWZhKT1cInRhYlNlbmRNZmFDb2RlKCRldmVudClcIj5cclxuICAgICAgICAgICAgPC9jYWwtbWZhLWZvcm0+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L21hdC10YWI+XHJcbiAgICA8bWF0LXRhYiBsYWJlbD1cInVzci1zdGVwXCIgKm5nSWY9XCJnb29nbGVTdHlsZVwiPlxyXG4gICAgICA8IS0tIE5PVEU6IEJhY2sgYnV0dG9uIC0tPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnMgbWItM1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgICAgIDxhIGhyZWY9XCIjXCIgKGNsaWNrKT1cIm9uQ2xpY2tQcmV2U3RlcCgxKVwiIHRpdGxlPVwie3sgbGFiZWxzLmJ1dHRvbi5iYWNrIH19XCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImFsaWduLWJvdHRvbSBtci0yXCI+a2V5Ym9hcmRfYXJyb3dfbGVmdDwvbWF0LWljb24+e3sgbGFiZWxzLmJ1dHRvbi5iYWNrIH19XHJcbiAgICAgICAgICA8L2E+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8Zm9ybSAobmdTdWJtaXQpPVwib25DbGlja05leHRTdGVwKDEpXCIgW2Zvcm1Hcm91cF09XCJ1c3JGb3JtR3JvdXBcIj5cclxuICAgICAgICA8IS0tIE5PVEU6IFVzZXJuYW1lIC0tPlxyXG4gICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cInctMTAwXCI+XHJcbiAgICAgICAgICA8ZGl2IG1hdFByZWZpeCBjbGFzcz1cIm1yLTJcIiAqbmdJZj1cImljb25zLmljb25Vc3JPbkxvZ2luRm9ybVwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJhbGlnbi1ib3R0b21cIj5wZXJzb248L21hdC1pY29uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwidXNlcm5hbWVcIiBcclxuICAgICAgICAgICAgbmFtZT1cInVzZXJuYW1lXCIgYXV0b2NvbXBsZXRlPVwidXNlcm5hbWVcIiBcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eyBsYWJlbHMuaW5wdXQudXNlcm5hbWUgfX1cIiBcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIi8+XHJcbiAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwidXNyRm9ybUdyb3VwLmNvbnRyb2xzLnVzZXJuYW1lLnZhbHVlPy5sZW5ndGggPiAwICYmIGlucHV0cy5jbGVhclVzck9uTG9naW5Gb3JtXCIgXHJcbiAgICAgICAgICAgIG1hdC1idXR0b24gbWF0U3VmZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiQ2xlYXJcIiBcclxuICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cInVzckZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS5zZXRWYWx1ZSgnJylcIiBcclxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImZvcm1UeXBlID09PSBmb3Jtcy5NRkEgJiYgZm9ybUxheW91dHMubWZhID09PSBsYXlvdXRzLklOTElORSA/IHRydWUgOiBmYWxzZVwiIFxyXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwhLS0gTk9URTogRXJyb3IgbWVzc2FnZShzKSAtLT5cclxuICAgICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJ1c3JGb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuZXJyb3JzPy5yZXF1aXJlZCAmJiBlcnJvcnMubG9naW5cIj5cclxuICAgICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5yZXF1aXJlZCB9fVxyXG4gICAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJ1c3JGb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuZXJyb3JzPy5wYXR0ZXJuICYmIGVycm9ycy5sb2dpbiAmJiB1c3JQb2xpY3kgPT09IHVzZXJQb2xpY2llcy5FTUFJTFwiPlxyXG4gICAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LmVtYWlsIH19XHJcbiAgICAgICAgICA8L21hdC1oaW50PlxyXG4gICAgICAgICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cInVzckZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS5lcnJvcnM/LnBhdHRlcm4gJiYgZXJyb3JzLmxvZ2luICYmIHVzclBvbGljeSA9PT0gdXNlclBvbGljaWVzLlBIT05FXCI+XHJcbiAgICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kucGhvbmUgfX1cclxuICAgICAgICAgIDwvbWF0LWhpbnQ+XHJcbiAgICAgICAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwidXNyRm9ybUdyb3VwLmNvbnRyb2xzLnVzZXJuYW1lLmVycm9ycz8ucGF0dGVybiAmJiBlcnJvcnMubG9naW4gJiYgdXNyUG9saWN5ICYmIHVzclBvbGljeSAhPT0gdXNlclBvbGljaWVzLkVNQUlMICYmIHVzclBvbGljeSAhPT0gdXNlclBvbGljaWVzLlBIT05FXCI+XHJcbiAgICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kuY3VzdG9tUmVnZXggfX1cclxuICAgICAgICAgIDwvbWF0LWhpbnQ+XHJcbiAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnMgbWItM1wiPlxyXG4gICAgICAgICAgPCEtLSBOT1RFOiBGb3Jnb3QgcGFzc3dvcmQgLS0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIHRleHQtbGVmdFwiICpuZ0lmPVwiYnV0dG9ucy5mb3Jnb3RQYXNzd29yZFwiPlxyXG4gICAgICAgICAgICA8YSAoY2xpY2spPVwib25DbGlja0ZvcmdvdFBhc3N3b3JkKClcIiBocmVmPVwiI1wiIGNsYXNzPVwic21hbGxcIj5cclxuICAgICAgICAgICAgICB7eyBsYWJlbHMuYnV0dG9uLmZvcmdvdFBhc3N3b3JkIH19XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPCEtLSBOT1RFOiBOZXh0IGJ1dHRvbiAtLT5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgdGV4dC1yaWdodFwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjb2xvcj1cInByaW1hcnlcIiBbZGlzYWJsZWRdPVwiIXVzckZvcm1Hcm91cC52YWxpZFwiIGNsYXNzPVwic21hbGwgdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICAgICAgICB7eyBsYWJlbHMuYnV0dG9uLm5leHQgfX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgPC9tYXQtdGFiPlxyXG4gICAgPG1hdC10YWIgbGFiZWw9XCJwd2Qtc3RlcFwiICpuZ0lmPVwiZ29vZ2xlU3R5bGVcIj5cclxuICAgICAgPCEtLSBOT1RFOiBCYWNrIGJ1dHRvbiAtLT5cclxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBuby1ndXR0ZXJzIG1iLTNcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XHJcbiAgICAgICAgICA8YSBocmVmPVwiI1wiIChjbGljayk9XCJvbkNsaWNrUHJldlN0ZXAoMilcIiB0aXRsZT1cInt7IGxhYmVscy5idXR0b24uYmFjayB9fVwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJhbGlnbi1ib3R0b20gbXItMlwiPmtleWJvYXJkX2Fycm93X2xlZnQ8L21hdC1pY29uPnt7IGxhYmVscy5idXR0b24uYmFjayB9fVxyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPCEtLSBUT0RPOiBVc2VyIGluZm8gLS0+XHJcbiAgICAgIDxwPnt7IHVzZXJJbmZvIH19PC9wPlxyXG4gICAgICA8Zm9ybSAobmdTdWJtaXQpPVwib25DbGlja05leHRTdGVwKDIpXCIgW2Zvcm1Hcm91cF09XCJwd2RGb3JtR3JvdXBcIj5cclxuICAgICAgICA8IS0tIE5PVEU6IFBhc3N3b3JkIC0tPlxyXG4gICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cInctMTAwXCI+XHJcbiAgICAgICAgICA8ZGl2IG1hdFByZWZpeCBjbGFzcz1cIm1yLTJcIiAqbmdJZj1cImljb25zLmljb25Qd2RPbkxvZ2luRm9ybVwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJhbGlnbi1ib3R0b21cIj5sb2NrPC9tYXQtaWNvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGlucHV0IG1hdElucHV0IGZvcm1Db250cm9sTmFtZT1cInBhc3N3b3JkXCIgXHJcbiAgICAgICAgICAgIG5hbWU9XCJwYXNzd29yZFwiIGF1dG9jb21wbGV0ZT1cInBhc3N3b3JkXCIgXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3sgbGFiZWxzLmlucHV0LnBhc3N3b3JkIH19XCIgXHJcbiAgICAgICAgICAgIHR5cGU9XCJ7eyBzaG93UGFzc3dvcmQgPyAndGV4dCcgOiAncGFzc3dvcmQnIH19XCIvPlxyXG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cImlucHV0cy5zaG93UHdkT25Mb2dpbkZvcm1cIiBcclxuICAgICAgICAgICAgbWF0LWJ1dHRvbiBtYXRTdWZmaXggbWF0LWljb24tYnV0dG9uIGFyaWEtbGFiZWw9XCJDbGVhclwiIFxyXG4gICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwic2hvd1Bhc3N3b3JkPSFzaG93UGFzc3dvcmRcIiBcclxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImZvcm1UeXBlID09PSBmb3Jtcy5NRkEgJiYgZm9ybUxheW91dHMubWZhID09PSBsYXlvdXRzLklOTElORSA/IHRydWUgOiBmYWxzZVwiIFxyXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCI+XHJcbiAgICAgICAgICAgIDxtYXQtaWNvbj57eyBzaG93UGFzc3dvcmQgPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknIH19PC9tYXQtaWNvbj5cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPCEtLSBOT1RFOiBFcnJvciBtZXNzYWdlIC0tPlxyXG4gICAgICAgICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cInB3ZEZvcm1Hcm91cC5jb250cm9scy5wYXNzd29yZC5lcnJvcnM/LnJlcXVpcmVkICYmIGVycm9ycy5sb2dpblwiPlxyXG4gICAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnJlcXVpcmVkIH19XHJcbiAgICAgICAgICA8L21hdC1oaW50PlxyXG4gICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XHJcbiAgICAgICAgPCEtLSBOT1RFOiBOZXh0IGJ1dHRvbiAtLT5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnMgbWItM1wiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbCB0ZXh0LXJpZ2h0XCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gdHlwZT1cInN1Ym1pdFwiIGNvbG9yPVwicHJpbWFyeVwiIFtkaXNhYmxlZF09XCIhcHdkRm9ybUdyb3VwLnZhbGlkXCIgY2xhc3M9XCJzbWFsbCB0ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgICAgICAgIHt7IGxhYmVscy5idXR0b24ubmV4dCB9fVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Zvcm0+XHJcbiAgICA8L21hdC10YWI+XHJcbiAgICA8bWF0LXRhYiBsYWJlbD1cInRhYi13cmFwcGVyXCIgKm5nSWY9XCIoZm9ybUxheW91dHMgfCBleGlzdHNMYXlvdXQ6IGxheW91dHMuVEFCKVwiPlxyXG4gICAgICA8IS0tIE5PVEU6IFRhYiBmb3JtIC0tPlxyXG4gICAgICA8Y2FsLXRhYi13cmFwcGVyIFxyXG4gICAgICAgIFtmb3JtVHlwZV09XCJmb3JtVHlwZVwiIFxyXG4gICAgICAgIFtpc0ZpcnN0XT1cImlzRmlyc3RcIiBcclxuICAgICAgICBbY29kZV0gICA9XCJjb2RlXCIgXHJcbiAgICAgICAgW3FyQ29kZV0gPVwicXJDb2RlXCIgXHJcbiAgICAgICAgW3B3ZFBvbGljaWVzXT1cInB3ZFBvbGljaWVzXCIgXHJcbiAgICAgICAgW2Vycm9yc109XCJlcnJvcnNcIiBcclxuICAgICAgICBbbGFiZWxzXT1cImxhYmVsc1wiIFxyXG4gICAgICAgIFtpbnB1dHNdPVwiaW5wdXRzXCIgXHJcbiAgICAgICAgKHNlbmRDbG9zZVRhYik9XCJvbkNsaWNrQ2xvc2VUYWIoJGV2ZW50KVwiIFxyXG4gICAgICAgIChyZWxheUZpcnN0TG9nKT1cInRhYkZpcnN0TG9nKCRldmVudClcIiBcclxuICAgICAgICAocmVsYXlMb3N0UHdkKT1cInRhYkxvc3RQd2QoJGV2ZW50KVwiIFxyXG4gICAgICAgIChyZWxheVNhdmVNZmFLZXkpPVwidGFiU2F2ZU1mYUtleSgkZXZlbnQpXCIgXHJcbiAgICAgICAgKHJlbGF5U2VuZE1mYUNvZGUpPVwidGFiU2VuZE1mYUNvZGUoJGV2ZW50KVwiPlxyXG4gICAgICA8L2NhbC10YWItd3JhcHBlcj5cclxuICAgIDwvbWF0LXRhYj5cclxuICA8L21hdC10YWItZ3JvdXA+XHJcbjwvZGl2PmAsXHJcbiAgc3R5bGVzOiBbYC9kZWVwLyAjY2FsaWF0eXMtbG9naW4tZm9ybSBtYXQtdGFiLWhlYWRlcntkaXNwbGF5Om5vbmUhaW1wb3J0YW50fW1hdC1mb3JtLWZpZWxkIG1hdC1pY29ue2NvbG9yOmdyZXl9LmxvZ2luLXdyYXBwZXJ7d2lkdGg6MTAwJTttYXgtd2lkdGg6MzMwcHg7cGFkZGluZzoxNXB4O21hcmdpbjowIGF1dG99LmNhbC1idG57bGluZS1oZWlnaHQ6MzVweDtib3JkZXI6MCFpbXBvcnRhbnQ7cGFkZGluZzoxcHghaW1wb3J0YW50fS5jYWwtYnRuIC5jYWwtYmctaWNvbntwYWRkaW5nOjhweDt3aWR0aDozNHB4O2hlaWdodDozNHB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOnRvcCFpbXBvcnRhbnR9LmNhbC1idG4gLmNhbC1iZy1pY29uIC5jYWwtaWNvbntkaXNwbGF5OmlubGluZS1ibG9jaztoZWlnaHQ6MThweDt3aWR0aDoxOHB4O21hcmdpbi10b3A6LTRweDt2ZXJ0aWNhbC1hbGlnbjp0b3AhaW1wb3J0YW50fS5jYWwtYnRuIC5jYWwtbGFiZWx7cGFkZGluZy1yaWdodDo4cHg7cGFkZGluZy1sZWZ0OjE2cHg7c2l6ZToxNHB4O2ZvbnQtZmFtaWx5OlJvYm90byxzYW5zLXNlcmlmfS5hZG57YmFja2dyb3VuZC1jb2xvcjojZDg3YTY4IWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0uYWRuIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmFkbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNlMjllOTEhaW1wb3J0YW50fS5iaXRidWNrZXR7YmFja2dyb3VuZC1jb2xvcjojMjA1MDgxIWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0uYml0YnVja2V0IGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmJpdGJ1Y2tldDpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiMyYTY5YWEhaW1wb3J0YW50fS5kcm9wYm94e2JhY2tncm91bmQtY29sb3I6IzEwODdkZCFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmRyb3Bib3ggaXtjb2xvcjojZmZmIWltcG9ydGFudH0uZHJvcGJveDpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiMzMDlmZjAhaW1wb3J0YW50fS5mYWNlYm9va3tiYWNrZ3JvdW5kLWNvbG9yOiMzYjU5OTghaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS5mYWNlYm9vayBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5mYWNlYm9vazpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiM0YzcwYmEhaW1wb3J0YW50fS5mbGlja3J7YmFja2dyb3VuZC1jb2xvcjojZmYwMDg0IWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0uZmxpY2tyIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmZsaWNrcjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmZjMzOWQhaW1wb3J0YW50fS5mb3Vyc3F1YXJle2JhY2tncm91bmQtY29sb3I6I2Y5NDg3NyFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmZvdXJzcXVhcmUgaXtjb2xvcjojZmZmIWltcG9ydGFudH0uZm91cnNxdWFyZTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmYjc5OWMhaW1wb3J0YW50fS5naXRodWJ7YmFja2dyb3VuZC1jb2xvcjojNDQ0IWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0uZ2l0aHViIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmdpdGh1Yjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiM1ZTVlNWUhaW1wb3J0YW50fS5pbnN0YWdyYW17YmFja2dyb3VuZC1jb2xvcjojNDA1ZGU2IWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0uaW5zdGFncmFtIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9Lmluc3RhZ3JhbTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiM2ZDgzZWMhaW1wb3J0YW50fS5saW5rZWRpbntiYWNrZ3JvdW5kLWNvbG9yOiMwMDdiYjYhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS5saW5rZWRpbiBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5saW5rZWRpbjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiMwMDlkZTkhaW1wb3J0YW50fS5taWNyb3NvZnR7YmFja2dyb3VuZC1jb2xvcjojMjY3MmVjIWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0ubWljcm9zb2Z0IGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9Lm1pY3Jvc29mdDpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiM1NTkwZjAhaW1wb3J0YW50fS53aW5kb3dze2JhY2tncm91bmQtY29sb3I6IzI2NzJlYyFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LndpbmRvd3MgaXtjb2xvcjojZmZmIWltcG9ydGFudH0ud2luZG93czpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiM1NTkwZjAhaW1wb3J0YW50fS5vZG5va2xhc3NuaWtpe2JhY2tncm91bmQtY29sb3I6I2Y0NzMxYyFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9Lm9kbm9rbGFzc25pa2kgaXtjb2xvcjojZmZmIWltcG9ydGFudH0ub2Rub2tsYXNzbmlraTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmNjkxNGQhaW1wb3J0YW50fS5vcGVuaWR7YmFja2dyb3VuZC1jb2xvcjojZjc5MzFlIWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0ub3BlbmlkIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9Lm9wZW5pZDpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmOWFiNGYhaW1wb3J0YW50fS5waW50ZXJlc3R7YmFja2dyb3VuZC1jb2xvcjojY2IyMDI3IWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0ucGludGVyZXN0IGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LnBpbnRlcmVzdDpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNlMDNlNDQhaW1wb3J0YW50fS5yZWRkaXR7YmFja2dyb3VuZC1jb2xvcjojZWZmN2ZmIWltcG9ydGFudDtjb2xvcjojMDAwIWltcG9ydGFudH0ucmVkZGl0IGl7Y29sb3I6IzAwMCFpbXBvcnRhbnR9LnJlZGRpdDpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmZmYhaW1wb3J0YW50fS5zb3VuZGNsb3Vke2JhY2tncm91bmQtY29sb3I6I2Y1MCFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LnNvdW5kY2xvdWQgaXtjb2xvcjojZmZmIWltcG9ydGFudH0uc291bmRjbG91ZDpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmNzMhaW1wb3J0YW50fS50dW1ibHJ7YmFja2dyb3VuZC1jb2xvcjojMmM0NzYyIWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0udHVtYmxyIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LnR1bWJscjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiMzYzYxODUhaW1wb3J0YW50fS50d2l0dGVye2JhY2tncm91bmQtY29sb3I6IzU1YWNlZSFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LnR3aXR0ZXIgaXtjb2xvcjojZmZmIWltcG9ydGFudH0udHdpdHRlcjpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiM4M2MzZjMhaW1wb3J0YW50fS52aW1lb3tiYWNrZ3JvdW5kLWNvbG9yOiMxYWI3ZWEhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS52aW1lbyBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS52aW1lbzpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiM0OWM2ZWUhaW1wb3J0YW50fS52a3tiYWNrZ3JvdW5kLWNvbG9yOiM1ODdlYTMhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS52ayBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS52azpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiM3ODk3YjYhaW1wb3J0YW50fS55YWhvb3tiYWNrZ3JvdW5kLWNvbG9yOiM3MjBlOWUhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS55YWhvbyBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS55YWhvbzpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiM5NDEyY2QhaW1wb3J0YW50fS5nb29nbGUubGlnaHR7YmFja2dyb3VuZC1jb2xvcjojZmZmIWltcG9ydGFudDtjb2xvcjojNWY2MzY4IWltcG9ydGFudH0uZ29vZ2xlLmxpZ2h0IGl7Y29sb3I6IzVmNjM2OCFpbXBvcnRhbnR9Lmdvb2dsZS5saWdodDpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmZmYhaW1wb3J0YW50fS5nb29nbGUuZGFya3tiYWNrZ3JvdW5kLWNvbG9yOiM0Mjg1ZjQhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS5nb29nbGUuZGFyayBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5nb29nbGUuZGFyazpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiM3MmE0ZjchaW1wb3J0YW50fS5nb29nbGUuZGFyayAuY2FsLWJnLWljb257YmFja2dyb3VuZDojZmZmfWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkZvcm1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95XHJcbntcclxuICBwdWJsaWMgICAgZm9ybUxheW91dHMgICAgOiBhbnk7XHJcbiAgcHVibGljICAgIHRoZW1lICAgICAgICAgIDogc3RyaW5nO1xyXG5cclxuICBwdWJsaWMgICAgdXNyUG9saWN5ICAgICAgOiBzdHJpbmc7XHJcbiAgcHVibGljICAgIHB3ZFBvbGljaWVzICAgIDogYW55O1xyXG5cclxuICBwdWJsaWMgICAgaWNvbnMgICAgICAgICAgOiBhbnk7XHJcbiAgcHVibGljICAgIGJ1dHRvbnMgICAgICAgIDogYW55O1xyXG4gIHB1YmxpYyAgICBpbnB1dHMgICAgICAgICA6IGFueTtcclxuICBwdWJsaWMgICAgZXJyb3JzICAgICAgICAgOiBhbnk7XHJcbiAgcHVibGljICAgIGxhYmVscyAgICAgICAgIDogYW55O1xyXG5cclxuICAvLyBEaXNwbGF5IGxvZ2luIGZvcm0gaW5zaWRlIGEgY29udGFpbmVyXHJcbiAgQElucHV0KCkgIGZpeGVkV2lkdGggICAgICAgIDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIC8vIERpc3BsYXkgbG9naW4gZm9ybSBsaWtlIEdvb2dsZSAmIE1pY3Jvc29mdCAoc3RlcCBieSBzdGVwKVxyXG4gIEBJbnB1dCgpICBnb29nbGVTdHlsZSAgICAgICA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAvLyBEaXNwbGF5IEdvb2dsZSBidXR0b24gd2l0aCB0aGUgc3VwcGxpZWQgdGhlbWUgOiBsaWdodCAvIGRhcmtcclxuICBASW5wdXQoKSAgZ29vZ2xlVGhlbWUgICAgICAgOiBzdHJpbmcgID0gbnVsbDtcclxuICAvLyBEaXNwbGF5IGZvcm1zIGluc2lkZSBhIGxheW91dCA6IHRhYiAoYnkgZGVmYXVsdCkgLyBtb2RhbCAvIGlubGluZVxyXG4gIC8vIFRoZSBpbmxpbmUgbGF5b3V0IGlzIG9ubHkgYXZhaWxhYmxlIGZvciB0aGUgTUZBIGZvcm1cclxuICBASW5wdXQoKSAgY3VzdG9tRm9ybUxheW91dHMgOiBhbnk7XHJcblxyXG4gIC8vIE9wdGlvbmFsIHBvbGljeSBhcHBsaWVkIG9uIHRoZSB1c2VybmFtZSBpbnB1dCA6IGVtYWlsIC8gcGhvbmUgLyByZWdleFxyXG4gIC8vIEJlIGNhcmVmdWwsIHlvdSBtdXN0IGRvdWJsZSBhbGwgdGhlIGJhY2tzbGFzaGVzIHVzZWQgaW4gdGhlIHN1cHBsaWVkIHJlZ2V4XHJcbiAgQElucHV0KCkgIGN1c3RvbVVzclBvbGljeSAgIDogc3RyaW5nID0gbnVsbDtcclxuICAvLyBQb2xpY2llcyBhcHBsaWVkIG9uIHRoZSBwYXNzd29yZCBpbnB1dFxyXG4gIEBJbnB1dCgpICBjdXN0b21Qd2RQb2xpY2llcyA6IGFueTtcclxuXHJcbiAgLy8gRGlzbGF5IGljb24gaW5zaWRlIGlucHV0cyBvbiB0aGUgbG9naW4gZm9ybVxyXG4gIEBJbnB1dCgpICBjdXN0b21JY29ucyAgIDogYW55O1xyXG5cclxuICAvLyBEaXNwbGF5IGJ1dHRvbnMgd2l0aCBldmVudHNcclxuICBASW5wdXQoKSAgY3VzdG9tQnV0dG9ucyA6IGFueTtcclxuXHJcbiAgLy8gRGlzcGxheSBjbGVhciAmIHNob3cvaGlkZSBidXR0b25zIGluc2lkZSBpbnB1dHNcclxuICBASW5wdXQoKSAgY3VzdG9tSW5wdXRzICA6IGFueTtcclxuXHJcbiAgLy8gRGlzcGxheSBlcnJvciBtZXNzYWdlc1xyXG4gIEBJbnB1dCgpICBjdXN0b21FcnJvcnMgIDogYW55O1xyXG5cclxuICAvLyBMYWJlbHNcclxuICBASW5wdXQoKSAgY3VzdG9tTGFiZWxzICA6IGFueTtcclxuXHJcbiAgLy8gRXZlbnQgdHJpZ2dlcmVkIGFmdGVyIGNyZWF0aW5nIHRoZSBsb2dpbiBmb3JtIChBZnRlclZpZXdJbml0KVxyXG4gIEBPdXRwdXQoKSBpbml0aWFsaXplZCAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLy8gRXZlbnQgdHJpZ2dlcmVkIGFmdGVyIGNsaWNraW5nIG9uIHRoZSBzaWduIHVwIGJ1dHRvbi5cclxuICBAT3V0cHV0KCkgc2lnblVwICAgICAgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8vIEV2ZW50IG9iamVjdCBjb250YWluaW5nIHVzZXJuYW1lIGFuZCBwYXNzd29yZCBwcm9wZXJ0aWVzXHJcbiAgQE91dHB1dCgpIGxvZ2luICAgICAgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvLyBFdmVudCBvYmplY3QgY29udGFpbmluZyB1c2VybmFtZSwgcGFzc3dvcmQgYW5kIHNvY2lhbCBwcm9wZXJ0aWVzXHJcbiAgQE91dHB1dCgpIGxvZ2luU29jaWFsICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvLyBFdmVudCBvYmplY3QgY29udGFpbmluZyB1c2VybmFtZSBwcm9wZXJ0eVxyXG4gIEBPdXRwdXQoKSBmb3Jnb3RQd2QgICAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLy8gRXZlbnQgb2JqZWN0IGNvbnRhaW5pbmcgcGFzc3dvcmQgYW5kIGNvZGUgcHJvcGVydGllc1xyXG4gIEBPdXRwdXQoKSBzZW5kUmVzZXRQd2QgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLy8gRXZlbnQgb2JqZWN0IGNvbnRhaW5pbmcgcGFzc3dvcmQgcHJvcGVydHlcclxuICBAT3V0cHV0KCkgc2VuZEZpcnN0UHdkICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8vIEV2ZW50IG9iamVjdCBjb250YWluaW5nIGNvZGUgcHJvcGVydHlcclxuICBAT3V0cHV0KCkgc2F2ZU1mYUtleSAgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8vIEV2ZW50IG9iamVjdCBjb250YWluaW5nIGNvZGUgcHJvcGVydHlcclxuICBAT3V0cHV0KCkgc2VuZE1mYUNvZGUgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8vIEV2ZW50IG9iamVjdCBjb250YWluaW5nIHVzZXJuYW1lIHByb3BlcnR5XHJcbiAgQE91dHB1dCgpIHN0ZXBVc3IgICAgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvLyBFdmVudCBvYmplY3QgY29udGFpbmluZyB1c2VybmFtZSBhbmQgcGFzc3dvcmQgcHJvcGVydHlcclxuICBAT3V0cHV0KCkgc3RlcFB3ZCAgICAgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvLyBOT1RFOiBGb3JtXHJcbiAgcHVibGljICAgIGZvcm1Hcm91cCAgICAgOiBGb3JtR3JvdXA7XHJcbiAgcHVibGljICAgIHNob3dQYXNzd29yZCAgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgcHVibGljICAgIGZvcm1UeXBlICAgICAgOiBzdHJpbmc7XHJcbiAgcHVibGljICAgIHVzZXJQb2xpY2llcyA9IFVzZXJQb2xpY2llcztcclxuICBwdWJsaWMgICAgZm9ybXMgPSBGb3JtcztcclxuXHJcbiAgLy8gTk9URTogUGFzc3dvcmRcclxuICBwdWJsaWMgICAgaXNGaXJzdCAgICAgICA6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLy8gTk9URTogTUZBXHJcbiAgcHVibGljICAgIGNvZGUgICAgICAgICAgOiBzdHJpbmcgID0gbnVsbDtcclxuICBwdWJsaWMgICAgcXJDb2RlICAgICAgICA6IHN0cmluZyAgPSBudWxsO1xyXG5cclxuICAvLyBOT1RFOiBTdGVwc1xyXG4gIHB1YmxpYyAgICB1c3JGb3JtR3JvdXAgIDogRm9ybUdyb3VwO1xyXG4gIHB1YmxpYyAgICBwd2RGb3JtR3JvdXAgIDogRm9ybUdyb3VwO1xyXG4gIHB1YmxpYyAgICB1c2VySW5mbyAgICAgIDogc3RyaW5nICA9IG51bGw7XHJcbiAgcHVibGljICAgIHVzZXJJbWFnZSAgICAgOiBzdHJpbmcgID0gbnVsbDtcclxuXHJcbiAgLy8gTk9URTogV3JhcHBlclxyXG4gIHB1YmxpYyAgICBsYXlvdXRzID0gTGF5b3V0cztcclxuICBwdWJsaWMgICAgc2VsZWN0ZWRUYWIgICAgIDogbnVtYmVyID0gMDtcclxuICBwdWJsaWMgICAgY2xvc2VNb2RhbEV2ZW50IDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBwcml2YXRlICAgbW9kYWxGaXJzdFN1YiAgICAgICA6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlICAgbW9kYWxMb3N0U3ViICAgICAgICA6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlICAgbW9kYWxTYXZlTWZhS2V5U3ViICA6IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlICAgbW9kYWxTZW5kTWZhQ29kZVN1YiA6IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgLy8gVE9ETzogQ2FwdGNoYVxyXG4gIC8vIEBJbnB1dCgpICByZW1lbWJlck1lICAgIDogYm9vbGVhbiA9IHRydWU7IC8vIFRPRE86IGNoZWNrIGJveFxyXG5cclxuICBjb25zdHJ1Y3RvclxyXG4gIChcclxuICAgIHB1YmxpYyAgZGlhbG9nICAgICAgIDogTWF0RGlhbG9nLFxyXG4gICAgcHVibGljICBzYW5pdGl6ZXIgICAgOiBEb21TYW5pdGl6ZXIsXHJcbiAgICBwdWJsaWMgIGljb25SZWdpc3RyeSA6IE1hdEljb25SZWdpc3RyeSxcclxuICAgIHByaXZhdGUgYnVpbGRlciAgICAgIDogRm9ybUJ1aWxkZXJcclxuICApXHJcbiAge1xyXG4gICAgLy8gU29jaWFsIGljb25zXHJcbiAgICAvLyBUT0RPOiBGaXggQW5ndWxhciA2IExpYnJhcnkgYXNzZXRzIDogaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci1jbGkvaXNzdWVzLzExMDcxXHJcbiAgICBpY29uUmVnaXN0cnkuYWRkU3ZnSWNvbignZ29vZ2xlJywgICBzYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKCcuLi9hc3NldHMvaW1nL2dvb2dsZS5zdmcnKSk7XHJcbiAgICBpY29uUmVnaXN0cnkuYWRkU3ZnSWNvbignZmFjZWJvb2snLCBzYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKCcuLi9hc3NldHMvaW1nL2ZhY2Vib29rLnN2ZycpKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uSW5pdCgpIDogdm9pZFxyXG4gIHtcclxuICAgIC8vIExvZ2luIGZvcm1cclxuICAgIHRoaXMuaW5pdEZvcm1Hcm91cHMoKTtcclxuICAgIC8vIFN0eWxlIChjb250YWluZXIsIHN0ZXAsIHRoZW1lICYgbGF5b3V0KVxyXG4gICAgdGhpcy5pbml0Rm9ybUxheW91dHMoKTtcclxuICAgIHRoaXMuaW5pdFRoZW1lKCk7XHJcblxyXG4gICAgdGhpcy5pbml0UG9saWNpZXMoKTtcclxuICAgIHRoaXMuaW5pdEljb25zKCk7XHJcbiAgICB0aGlzLmluaXRCdXR0b25zKCk7XHJcbiAgICB0aGlzLmluaXRJbnB1dHMoKTtcclxuICAgIHRoaXMuaW5pdEVycm9ycygpO1xyXG4gICAgdGhpcy5pbml0TGFiZWxzKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5pbml0aWFsaXplZC5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkNoYW5nZXMoY2hhbmdlcyA6IFNpbXBsZUNoYW5nZXMpIDogdm9pZFxyXG4gIHtcclxuICAgIGlmKGNoYW5nZXMuZ29vZ2xlU3R5bGUpXHJcbiAgICAgIHRoaXMuaW5pdEZvcm1Hcm91cHMoKTtcclxuICAgIGlmKGNoYW5nZXMuY3VzdG9tRm9ybUxheW91dHMpXHJcbiAgICAgIHRoaXMuaW5pdEZvcm1MYXlvdXRzKCk7XHJcbiAgICBpZihjaGFuZ2VzLmdvb2dsZVRoZW1lKVxyXG4gICAgICB0aGlzLmluaXRUaGVtZSgpO1xyXG5cclxuICAgIGlmKGNoYW5nZXMuY3VzdG9tUHdkUG9saWNpZXMgfHwgY2hhbmdlcy5jdXN0b21Vc3JQb2xpY3kpXHJcbiAgICAgIHRoaXMuaW5pdFBvbGljaWVzKCk7XHJcbiAgICBpZihjaGFuZ2VzLmN1c3RvbUljb25zKVxyXG4gICAgICB0aGlzLmluaXRJY29ucygpO1xyXG4gICAgaWYoY2hhbmdlcy5jdXN0b21CdXR0b25zKVxyXG4gICAgICB0aGlzLmluaXRCdXR0b25zKCk7XHJcbiAgICBpZihjaGFuZ2VzLmN1c3RvbUlucHV0cylcclxuICAgICAgdGhpcy5pbml0SW5wdXRzKCk7XHJcbiAgICBpZihjaGFuZ2VzLmN1c3RvbUVycm9ycylcclxuICAgICAgdGhpcy5pbml0RXJyb3JzKCk7XHJcbiAgICBpZihjaGFuZ2VzLmN1c3RvbUxhYmVscylcclxuICAgICAgdGhpcy5pbml0TGFiZWxzKCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSA6IHZvaWRcclxuICB7XHJcbiAgICBpZih0aGlzLm1vZGFsRmlyc3RTdWIpXHJcbiAgICAgIHRoaXMubW9kYWxGaXJzdFN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgaWYodGhpcy5tb2RhbExvc3RTdWIpXHJcbiAgICAgIHRoaXMubW9kYWxMb3N0U3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICBpZih0aGlzLm1vZGFsU2F2ZU1mYUtleVN1YilcclxuICAgICAgdGhpcy5tb2RhbFNhdmVNZmFLZXlTdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIGlmKHRoaXMubW9kYWxTZW5kTWZhQ29kZVN1YilcclxuICAgICAgdGhpcy5tb2RhbFNlbmRNZmFDb2RlU3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gTk9URTogRXZlbnQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLy8gTk9URTogRnJvbSBjb21wb25lbnQgdG8gdXNlciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKiogRW1pdCBgJGV2ZW50YCBvYmplY3QgY29udGFpbmluZyB1c2VybmFtZSBhbmQgcGFzc3dvcmQgcHJvcGVydGllcy5cclxuICAqXHJcbiAgKiBAZXhhbXBsZVxyXG4gICogdmFyIHVzZXJuYW1lIDogc3RyaW5nID0gJGV2ZW50LnVzZXJuYW1lO1xyXG4gICogdmFyIHBhc3N3b3JkIDogc3RyaW5nID0gJGV2ZW50LnBhc3N3b3JkO1xyXG4gICovXHJcbiAgcHVibGljIG9uQ2xpY2tMb2dpbigpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBldmVudCA6IGFueSA9IHt9O1xyXG4gICAgZXZlbnQgPSB0aGlzLmdldEV2ZW50UmVzcG9uc2UoKTtcclxuICAgIHRoaXMubG9naW4uZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKiogRW1pdCBgJGV2ZW50YCBvYmplY3QgY29udGFpbmluZyB1c2VybmFtZSwgcGFzc3dvcmQgYW5kIHNvY2lhbCBwcm9wZXJ0aWVzLlxyXG4gICpcclxuICAqIEBwYXJhbSBzb2NpYWwgTmFtZSBvZiB0aGUgc29jaWFsIHByb3ZpZGVyXHJcbiAgKiBAZXhhbXBsZVxyXG4gICogdmFyIHVzZXJuYW1lIDogc3RyaW5nID0gJGV2ZW50LnVzZXJuYW1lO1xyXG4gICogdmFyIHBhc3N3b3JkIDogc3RyaW5nID0gJGV2ZW50LnBhc3N3b3JkO1xyXG4gICogdmFyIHNvY2lhbCAgIDogc3RyaW5nID0gJGV2ZW50LnNvY2lhbDtcclxuICAqL1xyXG4gIHB1YmxpYyBvbkNsaWNrTG9naW5Tb2NpYWwoc29jaWFsIDogc3RyaW5nKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZXZlbnQgOiBhbnkgPSB7fTtcclxuICAgIGV2ZW50ID0gdGhpcy5nZXRFdmVudFJlc3BvbnNlKCk7XHJcbiAgICBldmVudC5zb2NpYWwgPSBzb2NpYWw7XHJcbiAgICB0aGlzLmxvZ2luU29jaWFsLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEVtaXQgYSBjbGljayBldmVudCBvbiB0aGUgc2lnbiB1cCBidXR0b24uICovXHJcbiAgcHVibGljIG9uQ2xpY2tTaWduVXAoKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnNpZ25VcC5lbWl0KCk7XHJcbiAgfVxyXG5cclxuICAvKiogRW1pdCBgJGV2ZW50YCBvYmplY3QgY29udGFpbmluZyB1c2VybmFtZSBwcm9wZXJ0eS5cclxuICAqXHJcbiAgKiBAZXhhbXBsZVxyXG4gICogdmFyIHVzZXJuYW1lIDogc3RyaW5nID0gJGV2ZW50LnVzZXJuYW1lO1xyXG4gICovXHJcbiAgcHVibGljIG9uQ2xpY2tGb3Jnb3RQYXNzd29yZCgpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBldmVudCA6IGFueSA9IHt9O1xyXG4gICAgZXZlbnQgPSB0aGlzLmdldEV2ZW50UmVzcG9uc2UoJ3VzcicpO1xyXG4gICAgdGhpcy5mb3Jnb3RQd2QuZW1pdChldmVudCk7XHJcbiAgfVxyXG5cclxuICAvLyBOT1RFOiBGcm9tIHVzZXIgdG8gY29tcG9uZW50IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKiBTaG93IHBhc3N3b3JkIGZvcm0gZWl0aGVyIHRvIGluaXRpYWxpemUgZmlyc3QgcGFzc3dvcmQgb3IgdG8gcmVzZXQgZm9yZ290IHBhc3N3b3JkLlxyXG4gICpcclxuICAqIEBwYXJhbSBpc0ZpcnN0IEluaXRpYWxpemUgZmlyc3QgcGFzc3dvcmQgb3IgcmVzZXQgZm9yZ290IHBhc3N3b3JkXHJcbiAgKi9cclxuICBwdWJsaWMgc2hvd1B3ZEZvcm0oaXNGaXJzdCA6IGJvb2xlYW4pIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuaXNGaXJzdCAgPSBpc0ZpcnN0O1xyXG4gICAgdGhpcy5mb3JtVHlwZSA9IEZvcm1zLlBXRDtcclxuICAgIHRoaXMuc2hvd0xheW91dCh0aGlzLmZvcm1MYXlvdXRzLnB3ZCk7XHJcbiAgfVxyXG5cclxuICAvKiogU2hvdyBNRkEgc2V0dXAgZm9ybSB0byBpbml0aWFsaXplIGZpcnN0IFRPVFAgKFRpbWUtYmFzZWQgT25lLXRpbWUgUGFzc3dvcmQpLlxyXG4gICpcclxuICAqIEBwYXJhbSBjb2RlICAgXHJcbiAgKiBAcGFyYW0gcXJDb2RlIFxyXG4gICovXHJcbiAgcHVibGljIHNob3dNZmFTZXR1cEZvcm0oY29kZSA6IHN0cmluZywgcXJDb2RlIDogc3RyaW5nKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmNvZGUgICAgID0gY29kZTtcclxuICAgIHRoaXMucXJDb2RlICAgPSBxckNvZGU7XHJcbiAgICB0aGlzLmZvcm1UeXBlID0gRm9ybXMuTUZBX1NFVFVQO1xyXG4gICAgdGhpcy5zaG93TGF5b3V0KHRoaXMuZm9ybUxheW91dHMubWZhU2V0dXApO1xyXG4gIH1cclxuXHJcbiAgLyoqIFNob3cgTUZBIGZvcm0gdG8gZ2V0IHZlcmlmaWNhdGlvbiBjb2RlLiAqL1xyXG4gIHB1YmxpYyBzaG93TWZhRm9ybSgpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuZm9ybVR5cGUgPSBGb3Jtcy5NRkE7XHJcbiAgICB0aGlzLnNob3dMYXlvdXQodGhpcy5mb3JtTGF5b3V0cy5tZmEpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhpZGUgcGFzc3dvcmQgZm9ybS4gKi9cclxuICBwdWJsaWMgaGlkZVB3ZEZvcm0oKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmNsb3NlTGF5b3V0KHRoaXMuZm9ybUxheW91dHMucGFzc3dvcmQpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhpZGUgTUZBIHNldHVwIGZvcm0uICovXHJcbiAgcHVibGljIGhpZGVNZmFTZXR1cEZvcm0oKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmNsb3NlTGF5b3V0KHRoaXMuZm9ybUxheW91dHMubWZhU2V0dXApO1xyXG4gIH1cclxuXHJcbiAgLyoqIEhpZGUgTUZBIGZvcm0uICovXHJcbiAgcHVibGljIGhpZGVNZmFGb3JtKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5jbG9zZUxheW91dCh0aGlzLmZvcm1MYXlvdXRzLm1mYSk7XHJcbiAgfVxyXG5cclxuICAvKiogR28gcGFzc3dvcmQgc3RlcC4gKi9cclxuICBwdWJsaWMgc2hvd1B3ZFN0ZXAodXNlckluZm8gOiBzdHJpbmcgPSBudWxsLCB1c2VySW1hZ2UgOiBzdHJpbmcgPSBudWxsKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnVzZXJJbmZvICAgID0gdXNlckluZm87XHJcbiAgICB0aGlzLnVzZXJJbWFnZSAgID0gdXNlckltYWdlO1xyXG4gICAgdGhpcy5zZWxlY3RlZFRhYiA9IDI7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gTk9URTogU3RlcHMgZXZlbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgcHVibGljIG9uQ2xpY2tOZXh0U3RlcChjdXJyZW50U3RlcCA6IG51bWJlcikgOiB2b2lkXHJcbiAge1xyXG4gICAgc3dpdGNoKGN1cnJlbnRTdGVwKVxyXG4gICAge1xyXG4gICAgICBjYXNlIDAgOlxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSAxO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDEgOiAvLyBVc2VybmFtZVxyXG4gICAgICAgIGxldCBldmVudFVzciA6IGFueSA9IG51bGw7XHJcbiAgICAgICAgZXZlbnRVc3IgPSB0aGlzLmdldEV2ZW50UmVzcG9uc2UoJ3VzcicpO1xyXG4gICAgICAgIHRoaXMuc3RlcFVzci5lbWl0KGV2ZW50VXNyKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyIDogLy8gUGFzc3dvcmRcclxuICAgICAgICBsZXQgZXZlbnRQd2QgOiBhbnkgPSBudWxsO1xyXG4gICAgICAgIGV2ZW50UHdkID0gdGhpcy5nZXRFdmVudFJlc3BvbnNlKCk7XHJcbiAgICAgICAgdGhpcy5zdGVwUHdkLmVtaXQoZXZlbnRQd2QpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uQ2xpY2tQcmV2U3RlcChjdXJyZW50U3RlcCA6IG51bWJlcikgOiB2b2lkXHJcbiAge1xyXG4gICAgc3dpdGNoKGN1cnJlbnRTdGVwKVxyXG4gICAge1xyXG4gICAgICBjYXNlIDAgOlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDEgOiAvLyBVc2VybmFtZVxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSAwO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIDIgOiAvLyBQYXNzd29yZFxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSAxO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5PVEU6IFRhYiBldmVudHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKiBFbWl0IGAkZXZlbnRgIG9iamVjdCBjb250YWluaW5nIHBhc3N3b3JkIHByb3BlcnR5LlxyXG4gICpcclxuICAqIEBleGFtcGxlXHJcbiAgKiB2YXIgbmV3UGFzc3dvcmQgOiBzdHJpbmcgPSAkZXZlbnQucGFzc3dvcmQ7XHJcbiAgKi9cclxuICBwdWJsaWMgdGFiRmlyc3RMb2coJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnNlbmRGaXJzdFB3ZC5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKiogRW1pdCBgJGV2ZW50YCBvYmplY3QgY29udGFpbmluZyBwYXNzd29yZCBhbmQgY29kZSBwcm9wZXJ0aWVzLlxyXG4gICpcclxuICAqIEBleGFtcGxlXHJcbiAgKiB2YXIgbmV3UGFzc3dvcmQgICAgICA6IHN0cmluZyA9ICRldmVudC5wYXNzd29yZDtcclxuICAqIHZhciB2ZXJpZmljYXRpb25Db2RlIDogc3RyaW5nID0gJGV2ZW50LmNvZGU7XHJcbiAgKi9cclxuICBwdWJsaWMgdGFiTG9zdFB3ZCgkZXZlbnQgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuc2VuZFJlc2V0UHdkLmVtaXQoJGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKiBFbWl0IGAkZXZlbnRgIG9iamVjdCBjb250YWluaW5nIGNvZGUgcHJvcGVydHkuXHJcbiAgKlxyXG4gICogQGV4YW1wbGVcclxuICAqIHZhciB2ZXJpZmljYXRpb25Db2RlIDogc3RyaW5nID0gJGV2ZW50LmNvZGU7XHJcbiAgKi9cclxuICBwdWJsaWMgdGFiU2F2ZU1mYUtleSgkZXZlbnQgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuc2F2ZU1mYUtleS5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKiogRW1pdCBgJGV2ZW50YCBvYmplY3QgY29udGFpbmluZyBjb2RlIHByb3BlcnR5LlxyXG4gICpcclxuICAqIEBleGFtcGxlXHJcbiAgKiB2YXIgdmVyaWZpY2F0aW9uQ29kZSA6IHN0cmluZyA9ICRldmVudC5jb2RlO1xyXG4gICovXHJcbiAgcHVibGljIHRhYlNlbmRNZmFDb2RlKCRldmVudCA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zZW5kTWZhQ29kZS5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gTk9URTogTW9kYWwgZXZlbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLyoqIEVtaXQgYCRldmVudGAgb2JqZWN0IGNvbnRhaW5pbmcgcGFzc3dvcmQgcHJvcGVydHkuXHJcbiAgKlxyXG4gICogQGV4YW1wbGVcclxuICAqIHZhciBuZXdQYXNzd29yZCA6IHN0cmluZyA9ICRldmVudC5wYXNzd29yZDtcclxuICAqL1xyXG4gIHB1YmxpYyBtb2RhbEZpcnN0TG9nKGRpYWxvZ1JlZiA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5tb2RhbEZpcnN0U3ViID0gZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnJlbGF5Rmlyc3RMb2cuc3Vic2NyaWJlKChldmVudCkgPT5cclxuICAgIHtcclxuICAgICAgdGhpcy5zZW5kRmlyc3RQd2QuZW1pdChldmVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBFbWl0IGAkZXZlbnRgIG9iamVjdCBjb250YWluaW5nIHBhc3N3b3JkIGFuZCBjb2RlIHByb3BlcnRpZXMuXHJcbiAgKlxyXG4gICogQGV4YW1wbGVcclxuICAqIHZhciBuZXdQYXNzd29yZCAgICAgIDogc3RyaW5nID0gJGV2ZW50LnBhc3N3b3JkO1xyXG4gICogdmFyIHZlcmlmaWNhdGlvbkNvZGUgOiBzdHJpbmcgPSAkZXZlbnQuY29kZTtcclxuICAqL1xyXG4gIHB1YmxpYyBtb2RhbExvc3RQd2QoZGlhbG9nUmVmIDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLm1vZGFsTG9zdFN1YiA9IGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5yZWxheUxvc3RQd2Quc3Vic2NyaWJlKChldmVudCkgPT5cclxuICAgIHtcclxuICAgICAgdGhpcy5zZW5kUmVzZXRQd2QuZW1pdChldmVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBFbWl0IGAkZXZlbnRgIG9iamVjdCBjb250YWluaW5nIGNvZGUgcHJvcGVydHkuXHJcbiAgKlxyXG4gICogQGV4YW1wbGVcclxuICAqIHZhciB2ZXJpZmljYXRpb25Db2RlIDogc3RyaW5nID0gJGV2ZW50LmNvZGU7XHJcbiAgKi9cclxuICBwdWJsaWMgbW9kYWxTYXZlTWZhS2V5KGRpYWxvZ1JlZiA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5tb2RhbFNhdmVNZmFLZXlTdWIgPSBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UucmVsYXlTYXZlTWZhS2V5LnN1YnNjcmliZSgoZXZlbnQpID0+XHJcbiAgICB7XHJcbiAgICAgIHRoaXMuc2F2ZU1mYUtleS5lbWl0KGV2ZW50KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIEVtaXQgYCRldmVudGAgb2JqZWN0IGNvbnRhaW5pbmcgY29kZSBwcm9wZXJ0eS5cclxuICAqXHJcbiAgKiBAZXhhbXBsZVxyXG4gICogdmFyIHZlcmlmaWNhdGlvbkNvZGUgOiBzdHJpbmcgPSAkZXZlbnQuY29kZTtcclxuICAqL1xyXG4gIHB1YmxpYyBtb2RhbFNlbmRNZmFDb2RlKGRpYWxvZ1JlZiA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5tb2RhbFNlbmRNZmFDb2RlU3ViID0gZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnJlbGF5U2VuZE1mYUNvZGUuc3Vic2NyaWJlKChldmVudCkgPT5cclxuICAgIHtcclxuICAgICAgdGhpcy5zZW5kTWZhQ29kZS5lbWl0KGV2ZW50KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5PVEU6IFRhYiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIHB1YmxpYyBvbkNsaWNrQ2xvc2VUYWIoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmNsb3NlVGFiKCk7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gTk9URTogTW9kYWwgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgcHJpdmF0ZSBvcGVuTW9kYWwoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgcGFyYW1zIDogYW55ID0ge1xyXG4gICAgICAvLyBDb21tb25cclxuICAgICAgZm9ybVR5cGUgICAgICAgICAgICAgIDogdGhpcy5mb3JtVHlwZSxcclxuICAgICAgbGFiZWxzICAgICAgICAgICAgICAgIDogdGhpcy5sYWJlbHMsXHJcbiAgICAgIGNsb3NlRXZlbnQgICAgICAgICAgICA6IHRoaXMuY2xvc2VNb2RhbEV2ZW50LFxyXG4gICAgICBlcnJvcnMgICAgICAgICAgICAgICAgOiB0aGlzLmVycm9ycyxcclxuICAgICAgaW5wdXRzICAgICAgICAgICAgICAgIDogdGhpcy5pbnB1dHMsXHJcbiAgICAgIC8vIFBhc3N3b3JkIGZvcm1cclxuICAgICAgaXNGaXJzdCAgICAgICAgICAgICAgIDogdGhpcy5pc0ZpcnN0LFxyXG4gICAgICBwd2RQb2xpY2llcyAgICAgICAgICAgOiB0aGlzLnB3ZFBvbGljaWVzLFxyXG4gICAgICAvLyBNZmEgZm9ybVxyXG4gICAgICBjb2RlICAgICAgICAgICAgICAgICAgOiB0aGlzLmNvZGUsXHJcbiAgICAgIHFyQ29kZSAgICAgICAgICAgICAgICA6IHRoaXMucXJDb2RlXHJcbiAgICB9O1xyXG5cclxuICAgIGxldCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKE1vZGFsV3JhcHBlckNvbXBvbmVudCwgeyBkYXRhIDogcGFyYW1zIH0pO1xyXG5cclxuICAgIGlmKHRoaXMuZm9ybVR5cGUgPT09IEZvcm1zLlBXRClcclxuICAgIHtcclxuICAgICAgdGhpcy5tb2RhbEZpcnN0TG9nKGRpYWxvZ1JlZik7XHJcbiAgICAgIHRoaXMubW9kYWxMb3N0UHdkKGRpYWxvZ1JlZik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYodGhpcy5mb3JtVHlwZSA9PT0gRm9ybXMuTUZBX1NFVFVQKVxyXG4gICAgICB0aGlzLm1vZGFsU2F2ZU1mYUtleShkaWFsb2dSZWYpO1xyXG5cclxuICAgIGlmKHRoaXMuZm9ybVR5cGUgPT09IEZvcm1zLk1GQSlcclxuICAgICAgdGhpcy5tb2RhbFNlbmRNZmFDb2RlKGRpYWxvZ1JlZik7XHJcblxyXG4gICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKHJlc3VsdCA9PlxyXG4gICAge1xyXG4gICAgICB0aGlzLmZvcm1UeXBlID0gbnVsbDtcclxuICAgICAgaWYocmVzdWx0KVxyXG4gICAgICAgIHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzLnBhc3N3b3JkLnNldFZhbHVlKHJlc3VsdCk7IC8vIFNldCBwYXNzd29yZFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gTk9URTogUHJpdmF0ZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgcHJpdmF0ZSBzaG93TGF5b3V0KGZvcm1MYXlvdXQgOiBzdHJpbmcpIDogdm9pZFxyXG4gIHtcclxuICAgIHN3aXRjaChmb3JtTGF5b3V0KVxyXG4gICAge1xyXG4gICAgICBjYXNlIExheW91dHMuVEFCICAgIDpcclxuICAgICAgICB0aGlzLm9wZW5UYWIoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBMYXlvdXRzLk1PREFMICA6XHJcbiAgICAgICAgdGhpcy5vcGVuTW9kYWwoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBMYXlvdXRzLklOTElORSA6XHJcbiAgICAgICAgdGhpcy5mb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuZGlzYWJsZSgpO1xyXG4gICAgICAgIHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzLnBhc3N3b3JkLmRpc2FibGUoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgdGhpcy5vcGVuVGFiKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsb3NlTGF5b3V0KGZvcm1MYXlvdXQgOiBzdHJpbmcpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuZm9ybVR5cGUgPSBudWxsO1xyXG5cclxuICAgIHN3aXRjaChmb3JtTGF5b3V0KVxyXG4gICAge1xyXG4gICAgICBjYXNlIExheW91dHMuVEFCICAgIDpcclxuICAgICAgICB0aGlzLmNsb3NlVGFiKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgTGF5b3V0cy5NT0RBTCAgOlxyXG4gICAgICAgIHRoaXMuY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIExheW91dHMuSU5MSU5FIDpcclxuICAgICAgICB0aGlzLmZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS5lbmFibGUoKTtcclxuICAgICAgICB0aGlzLmZvcm1Hcm91cC5jb250cm9scy5wYXNzd29yZC5lbmFibGUoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgdGhpcy5jbG9zZVRhYigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbG9zZU1vZGFsKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5jbG9zZU1vZGFsRXZlbnQuZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvcGVuVGFiKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgaWYodGhpcy5nb29nbGVTdHlsZSlcclxuICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IDM7XHJcbiAgICBlbHNlXHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSAxO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbG9zZVRhYigpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSAwO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnZXRFdmVudFJlc3BvbnNlKG9ubHlPbmUgOiBzdHJpbmcgPSBudWxsKSA6IGFueVxyXG4gIHtcclxuICAgIGxldCBldmVudCAgICA6IGFueSAgICA9IHt9O1xyXG4gICAgbGV0IHVzZXJuYW1lIDogc3RyaW5nID0gbnVsbDtcclxuICAgIGxldCBwYXNzd29yZCA6IHN0cmluZyA9IG51bGw7XHJcblxyXG4gICAgaWYodGhpcy5nb29nbGVTdHlsZSlcclxuICAgIHtcclxuICAgICAgdXNlcm5hbWUgPSB0aGlzLnVzckZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS52YWx1ZTtcclxuICAgICAgcGFzc3dvcmQgPSB0aGlzLnB3ZEZvcm1Hcm91cC5jb250cm9scy5wYXNzd29yZC52YWx1ZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgdXNlcm5hbWUgPSB0aGlzLmZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS52YWx1ZTtcclxuICAgICAgcGFzc3dvcmQgPSB0aGlzLmZvcm1Hcm91cC5jb250cm9scy5wYXNzd29yZC52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZighb25seU9uZSlcclxuICAgIHtcclxuICAgICAgZXZlbnQudXNlcm5hbWUgPSB1c2VybmFtZTtcclxuICAgICAgZXZlbnQucGFzc3dvcmQgPSBwYXNzd29yZDtcclxuICAgIH1cclxuICAgIGlmKG9ubHlPbmUgJiYgb25seU9uZSA9PT0gJ3VzcicpXHJcbiAgICAgIGV2ZW50LnVzZXJuYW1lID0gdXNlcm5hbWU7XHJcbiAgICBpZihvbmx5T25lICYmIG9ubHlPbmUgPT09ICdwd2QnKVxyXG4gICAgICBldmVudC5wYXNzd29yZCA9IHBhc3N3b3JkO1xyXG5cclxuICAgIHJldHVybiBldmVudDtcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBOT1RFOiBJbml0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBwcml2YXRlIGluaXRGb3JtTGF5b3V0cygpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBkZWZhdWx0Rm9ybUxheW91dHMgOiBhbnkgPSBudWxsO1xyXG4gICAgbGV0IGZvcm1MYXlvdXRzICAgICAgICA6IGFueSA9IG51bGw7XHJcblxyXG4gICAgLy8gRm9ybSBsYXlvdXRzXHJcbiAgICBkZWZhdWx0Rm9ybUxheW91dHMgPSB7XHJcbiAgICAgIHB3ZCAgICAgIDogTGF5b3V0cy5UQUIsXHJcbiAgICAgIG1mYVNldHVwIDogTGF5b3V0cy5UQUIsXHJcbiAgICAgIG1mYSAgICAgIDogTGF5b3V0cy5UQUIsXHJcbiAgICB9O1xyXG5cclxuICAgIGZvcm1MYXlvdXRzID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0Rm9ybUxheW91dHMsIHRoaXMuY3VzdG9tRm9ybUxheW91dHMpO1xyXG5cclxuICAgIC8vIENvcnJlY3Rpb25zXHJcbiAgICBpZihmb3JtTGF5b3V0cy5wd2QgPT09IExheW91dHMuSU5MSU5FKVxyXG4gICAgICBmb3JtTGF5b3V0cy5wd2QgPSBMYXlvdXRzLlRBQjtcclxuICAgIGlmKGZvcm1MYXlvdXRzLm1mYVNldHVwID09PSBMYXlvdXRzLklOTElORSlcclxuICAgICAgZm9ybUxheW91dHMubWZhU2V0dXAgPSBMYXlvdXRzLlRBQjtcclxuICAgIGlmKHRoaXMuZ29vZ2xlU3R5bGUgJiYgZm9ybUxheW91dHMubWZhID09PSBMYXlvdXRzLklOTElORSlcclxuICAgICAgZm9ybUxheW91dHMubWZhID0gTGF5b3V0cy5UQUI7XHJcblxyXG4gICAgdGhpcy5mb3JtTGF5b3V0cyA9IGZvcm1MYXlvdXRzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0VGhlbWUoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgdGhlbWUgOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIC8vIFRoZW1lXHJcbiAgICBzd2l0Y2godGhpcy5nb29nbGVUaGVtZSlcclxuICAgIHtcclxuICAgICAgY2FzZSBUaGVtZXMuTElHSFQgOlxyXG4gICAgICAgIHRoZW1lID0gdGhpcy5nb29nbGVUaGVtZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBUaGVtZXMuREFSSyA6XHJcbiAgICAgICAgdGhlbWUgPSB0aGlzLmdvb2dsZVRoZW1lO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0IDpcclxuICAgICAgICB0aGVtZSA9IFRoZW1lcy5MSUdIVDtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRoZW1lID0gdGhlbWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRJY29ucygpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBkZWZhdWx0SWNvbnMgOiBhbnkgPSBudWxsO1xyXG4gICAgbGV0IGljb25zICAgICAgICA6IGFueSA9IG51bGw7XHJcblxyXG4gICAgLy8gSWNvbnNcclxuICAgIGRlZmF1bHRJY29ucyA9IHtcclxuICAgICAgaWNvblVzck9uTG9naW5Gb3JtIDogdHJ1ZSxcclxuICAgICAgaWNvblB3ZE9uTG9naW5Gb3JtIDogdHJ1ZSxcclxuICAgIH07XHJcblxyXG4gICAgaWNvbnMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRJY29ucywgdGhpcy5jdXN0b21JY29ucyk7XHJcbiAgICB0aGlzLmljb25zID0gaWNvbnM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRCdXR0b25zKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgbGV0IGRlZmF1bHRCdXRvbnMgOiBhbnkgPSBudWxsO1xyXG4gICAgbGV0IGJ1dHRvbnMgICAgICAgOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIC8vIEJ1dHRvbnNcclxuICAgIGRlZmF1bHRCdXRvbnMgPSB7XHJcbiAgICAgIGZvcmdvdFBhc3N3b3JkIDogdHJ1ZSxcclxuICAgICAgc2lnblVwICAgICAgICAgOiB0cnVlLFxyXG4gICAgICBnb29nbGUgICAgICAgICA6IHRydWUsXHJcbiAgICAgIGZhY2Vib29rICAgICAgIDogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBidXR0b25zID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0QnV0b25zLCB0aGlzLmN1c3RvbUJ1dHRvbnMpO1xyXG4gICAgdGhpcy5idXR0b25zID0gYnV0dG9ucztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdElucHV0cygpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBkZWZhdWx0SW5wdXRzIDogYW55ID0gbnVsbDtcclxuICAgIGxldCBpbnB1dHMgICAgICAgIDogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvLyBJbnB1dHNcclxuICAgIGRlZmF1bHRJbnB1dHMgPSB7XHJcbiAgICAgIGNsZWFyVXNyT25Mb2dpbkZvcm0gOiB0cnVlLFxyXG4gICAgICBzaG93UHdkT25Mb2dpbkZvcm0gIDogdHJ1ZSxcclxuICAgICAgc2hvd1B3ZE9uUHdkRm9ybSAgICA6IHRydWUsXHJcbiAgICAgIGNsZWFyQ29kZU9uUHdkRm9ybSAgOiB0cnVlLFxyXG4gICAgICBjbGVhckNvZGVPbk1mYUZvcm0gIDogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBpbnB1dHMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRJbnB1dHMsIHRoaXMuY3VzdG9tSW5wdXRzKTtcclxuICAgIHRoaXMuaW5wdXRzID0gaW5wdXRzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0RXJyb3JzKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgbGV0IGRlZmF1bHRFcnJvcnMgOiBhbnkgPSBudWxsO1xyXG4gICAgbGV0IGVycm9ycyAgICAgICAgOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIC8vIEVycm9yc1xyXG4gICAgZGVmYXVsdEVycm9ycyA9IHtcclxuICAgICAgbG9naW4gOiB0cnVlLFxyXG4gICAgICBwd2QgICA6IHRydWUsXHJcbiAgICAgIG1mYSAgIDogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBlcnJvcnMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRFcnJvcnMsIHRoaXMuY3VzdG9tRXJyb3JzKTtcclxuICAgIHRoaXMuZXJyb3JzID0gZXJyb3JzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0UG9saWNpZXMoKSA6IHZvaWRcclxuICB7XHJcbiAgICAvLyBOT1RFOiBQYXNzd29yZFxyXG4gICAgbGV0IGRlZmF1bHRQd2RQb2xpY2llcyA6IGFueSAgICA9IG51bGw7XHJcbiAgICBsZXQgcHdkUG9saWNpZXMgICAgICAgIDogYW55ICAgID0gbnVsbDtcclxuICAgIGxldCBkZWZhdWx0TWluICAgICAgICAgOiBudW1iZXIgPSA4O1xyXG4gICAgbGV0IGRlZmF1bHRNYXggICAgICAgICA6IG51bWJlciA9IDEyODtcclxuXHJcbiAgICAvLyBQYXNzd29yZCBwb2xpY2llc1xyXG4gICAgZGVmYXVsdFB3ZFBvbGljaWVzID0ge1xyXG4gICAgICByYW5nZSA6IHtcclxuICAgICAgICBtaW4gOiBkZWZhdWx0TWluLFxyXG4gICAgICAgIG1heCA6IGRlZmF1bHRNYXgsXHJcbiAgICAgIH0sXHJcbiAgICAgIGNoYXIgICA6IHRydWUsXHJcbiAgICAgIG51bWJlciA6IHRydWUsXHJcbiAgICAgIGxvd2VyICA6IHRydWUsXHJcbiAgICAgIHVwcGVyICA6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgcHdkUG9saWNpZXMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRQd2RQb2xpY2llcywgdGhpcy5jdXN0b21Qd2RQb2xpY2llcyk7XHJcblxyXG4gICAgaWYocHdkUG9saWNpZXMucmFuZ2UubWluID4gcHdkUG9saWNpZXMucmFuZ2UubWF4KVxyXG4gICAge1xyXG4gICAgICBwd2RQb2xpY2llcy5yYW5nZS5taW4gPSBkZWZhdWx0TWluO1xyXG4gICAgICBwd2RQb2xpY2llcy5yYW5nZS5tYXggPSBkZWZhdWx0TWF4O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHdkUG9saWNpZXMgPSBwd2RQb2xpY2llcztcclxuXHJcbiAgICAvLyBOT1RFOiBVc2VybmFtZVxyXG4gICAgaWYoIXRoaXMuY3VzdG9tVXNyUG9saWN5KVxyXG4gICAgICByZXR1cm47XHJcblxyXG4gICAgbGV0IHZhbGlkYXRvcnMgOiBhbnkgPSBbXTtcclxuXHJcbiAgICBzd2l0Y2godGhpcy5jdXN0b21Vc3JQb2xpY3kpXHJcbiAgICB7XHJcbiAgICAgIGNhc2UgVXNlclBvbGljaWVzLkVNQUlMIDpcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVXNyVmFsaWRhdG9yLmVtYWlsKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBVc2VyUG9saWNpZXMuUEhPTkUgOlxyXG4gICAgICAgIHZhbGlkYXRvcnMucHVzaChVc3JWYWxpZGF0b3IucGhvbmUpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0IDpcclxuICAgICAgICBsZXQgcmVnRXhwIDogUmVnRXhwID0gbnVsbDtcclxuICAgICAgICByZWdFeHAgPSBuZXcgUmVnRXhwKHRoaXMuY3VzdG9tVXNyUG9saWN5KTtcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVXNyVmFsaWRhdG9yLmN1c3RvbShyZWdFeHApKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICB2YWxpZGF0b3JzLnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCk7XHJcbiAgICBpZih0aGlzLmdvb2dsZVN0eWxlKVxyXG4gICAgICB0aGlzLnVzckZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS5zZXRWYWxpZGF0b3JzKHZhbGlkYXRvcnMpO1xyXG4gICAgZWxzZVxyXG4gICAgICB0aGlzLmZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS5zZXRWYWxpZGF0b3JzKHZhbGlkYXRvcnMpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0TGFiZWxzKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgbGV0IGRlZmF1bHRMYWJlbHMgOiBhbnkgPSB7fTtcclxuICAgIGxldCBsYWJlbHMgICAgICAgIDogYW55ID0ge307XHJcblxyXG4gICAgZGVmYXVsdExhYmVscy5oZWFkZXIgPSB7XHJcbiAgICAgIHRpdGxlUHdkICAgICAgICAgOiAnTG9zdCBwYXNzd29yZCcsXHJcbiAgICAgIHN1YnRpdGxlUHdkICAgICAgOiAnUGxlYXNlIGVudGVyIHRoZSBjb25maXJtYXRpb24gY29kZScsXHJcbiAgICAgIHRpdGxlUHdkU2V0dXAgICAgOiAnUGFzc3dvcmQgc2V0dXAnLFxyXG4gICAgICBzdWJ0aXRsZVB3ZFNldHVwIDogJ1BsZWFzZSBlbnRlciBhIG5ldyBwYXNzd29yZCcsXHJcbiAgICAgIHRpdGxlTWZhICAgICAgICAgOiAnTUZBJyxcclxuICAgICAgc3VidGl0bGVNZmEgICAgICA6ICdQbGVhc2UgZW50ZXIgdGhlIGNvbmZpcm1hdGlvbiBjb2RlJyxcclxuICAgICAgdGl0bGVNZmFTZXR1cCAgICA6ICdNRkEgc2V0dXAnLFxyXG4gICAgICBzdWJ0aXRsZU1mYVNldHVwIDogJ1NhdmUgdGhpcyBzZWNyZXQga2V5IGZvciBmdXR1cmUgY29ubmVjdGlvbidcclxuICAgIH07XHJcbiAgICBkZWZhdWx0TGFiZWxzLmlucHV0ID0ge1xyXG4gICAgICB1c2VybmFtZSAgICA6ICdVc2VybmFtZScsXHJcbiAgICAgIHBhc3N3b3JkICAgIDogJ1Bhc3N3b3JkJyxcclxuICAgICAgdmVyaWZDb2RlICAgOiAnVmVyaWZpY2F0aW9uIGNvZGUnLFxyXG4gICAgICBuZXdQYXNzd29yZCA6ICdOZXcgcGFzc3dvcmQnXHJcbiAgICB9O1xyXG4gICAgZGVmYXVsdExhYmVscy5idXR0b24gPSB7XHJcbiAgICAgIHNpZ25JbiAgICAgICAgIDogJ1NpZ24gaW4nLFxyXG4gICAgICBzaWduVXAgICAgICAgICA6ICdTaWduIHVwJyxcclxuICAgICAgbmV4dCAgICAgICAgICAgOiAnTmV4dCcsXHJcbiAgICAgIGJhY2sgICAgICAgICAgIDogJ0JhY2snLFxyXG4gICAgICBzZW5kICAgICAgICAgICA6ICdTZW5kJyxcclxuICAgICAgc2F2ZSAgICAgICAgICAgOiAnU2F2ZScsXHJcbiAgICAgIGZvcmdvdFBhc3N3b3JkIDogJ0ZvcmdvdCBwYXNzd29yZCcsXHJcbiAgICAgIGdvb2dsZVNpZ25JbiAgIDogJ1NpZ24gaW4gd2l0aCBHb29nbGUnLFxyXG4gICAgICBmYWNlYm9va1NpZ25JbiA6ICdTaWduIGluIHdpdGggRmFjZWJvb2snXHJcbiAgICB9O1xyXG4gICAgZGVmYXVsdExhYmVscy5wb2xpY3kgPSB7XHJcbiAgICAgIHJlcXVpcmVkICAgICAgOiAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZCcsXHJcbiAgICAgIG5vbldoaXRlc3BhY2UgOiAnVGhpcyB2YWx1ZSBtdXN0IG5vdCBjb250YWluIGFueSBzcGFjZXMnLFxyXG4gICAgICBlbWFpbCAgICAgICAgIDogJ1RoaXMgdmFsdWUgbXVzdCBiZSBhbiBlbWFpbCcsXHJcbiAgICAgIHBob25lICAgICAgICAgOiAnVGhpcyB2YWx1ZSBtdXN0IGJlIGEgcGhvbmUgbnVtYmVyJyxcclxuICAgICAgc2l4RGlnaXRzICAgICA6ICdUaGlzIHZhbHVlIG11c3QgY29udGFpbnMgc2l4IGRpZ2l0cycsXHJcbiAgICAgIGN1c3RvbVJlZ2V4ICAgOiAnVGhpcyB2YWx1ZSBtdXN0IG1hdGNoIHRoZSBjdXN0b20gcmVnZXggcHJvdmlkZWQnLFxyXG4gICAgICBwd2RMZW5ndGggICAgIDogJ01pbmltdW0gcGFzc3dvcmQgbGVuZ3RoICh7e21pbn19IHRvIHt7bWF4fX0pJyxcclxuICAgICAgcHdkVXBwZXJjYXNlICA6ICdSZXF1aXJlIGF0IGxlYXN0IG9uZSB1cHBlcmNhc2UgbGV0dGVyIChBIHRvIFopJyxcclxuICAgICAgcHdkTG93ZXJjYXNlICA6ICdSZXF1aXJlIGF0IGxlYXN0IG9uZSBsb3dlcmNhc2UgbGV0dGVyIChhIHRvIHopJyxcclxuICAgICAgcHdkTnVtYmVyICAgICA6ICdSZXF1aXJlIGF0IGxlYXN0IG9uZSBudW1iZXIgKDAgdG8gOSknLFxyXG4gICAgICBwd2RTcGVjaWFsICAgIDogJ1JlcXVpcmUgYXQgbGVhc3Qgb25lIG5vbmFscGhhbnVtZXJpYyBjaGFyYWN0ZXIgISBAICMgJCAlIF4gJiAqICggKSBfICsgLSA9IFsgXSB7IH0gfCBcXCcnXHJcbiAgICB9O1xyXG5cclxuICAgIGxhYmVscyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdExhYmVscywgdGhpcy5jdXN0b21MYWJlbHMpO1xyXG5cclxuICAgIHRoaXMubGFiZWxzID0gbGFiZWxzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0Rm9ybUdyb3VwcygpIDogdm9pZFxyXG4gIHtcclxuICAgIGlmKCF0aGlzLmdvb2dsZVN0eWxlKVxyXG4gICAge1xyXG4gICAgICB0aGlzLmZvcm1Hcm91cCA9IHRoaXMuYnVpbGRlci5ncm91cCh7XHJcbiAgICAgICAgdXNlcm5hbWUgICAgIDogbmV3IEZvcm1Db250cm9sKHtcclxuICAgICAgICAgIHZhbHVlICAgICAgOiBudWxsLFxyXG4gICAgICAgICAgZGlzYWJsZWQgICA6IGZhbHNlXHJcbiAgICAgICAgfSxbVmFsaWRhdG9ycy5yZXF1aXJlZF0pLFxyXG4gICAgICAgIHBhc3N3b3JkICAgICA6IG5ldyBGb3JtQ29udHJvbCh7XHJcbiAgICAgICAgICB2YWx1ZSAgICAgIDogbnVsbCxcclxuICAgICAgICAgIGRpc2FibGVkICAgOiBmYWxzZVxyXG4gICAgICAgIH0sW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVzckZvcm1Hcm91cCA9IHRoaXMuYnVpbGRlci5ncm91cCh7XHJcbiAgICAgIHVzZXJuYW1lICAgICA6IG5ldyBGb3JtQ29udHJvbCh7XHJcbiAgICAgICAgdmFsdWUgICAgICA6IG51bGwsXHJcbiAgICAgICAgZGlzYWJsZWQgICA6IGZhbHNlXHJcbiAgICAgIH0sW1ZhbGlkYXRvcnMucmVxdWlyZWRdKVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5wd2RGb3JtR3JvdXAgPSB0aGlzLmJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICBwYXNzd29yZCAgICAgOiBuZXcgRm9ybUNvbnRyb2woe1xyXG4gICAgICAgIHZhbHVlICAgICAgOiBudWxsLFxyXG4gICAgICAgIGRpc2FibGVkICAgOiBmYWxzZVxyXG4gICAgICB9LFtWYWxpZGF0b3JzLnJlcXVpcmVkXSlcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbn1cclxuIl19