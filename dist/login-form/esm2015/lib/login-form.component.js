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
export class LoginFormComponent {
    /**
     * @param {?} dialog
     * @param {?} sanitizer
     * @param {?} iconRegistry
     * @param {?} builder
     */
    constructor(dialog, sanitizer, iconRegistry, builder) {
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
    ngOnInit() {
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
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.initialized.emit();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
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
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.modalFirstSub)
            this.modalFirstSub.unsubscribe();
        if (this.modalLostSub)
            this.modalLostSub.unsubscribe();
        if (this.modalSaveMfaKeySub)
            this.modalSaveMfaKeySub.unsubscribe();
        if (this.modalSendMfaCodeSub)
            this.modalSendMfaCodeSub.unsubscribe();
    }
    /**
     * Emit `$event` object containing username and password properties.
     *
     * \@example
     * var username : string = $event.username;
     * var password : string = $event.password;
     * @return {?}
     */
    onClickLogin() {
        let /** @type {?} */ event = {};
        event = this.getEventResponse();
        this.login.emit(event);
    }
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
    onClickLoginSocial(social) {
        let /** @type {?} */ event = {};
        event = this.getEventResponse();
        event.social = social;
        this.loginSocial.emit(event);
    }
    /**
     * Emit a click event on the sign up button.
     * @return {?}
     */
    onClickSignUp() {
        this.signUp.emit();
    }
    /**
     * Emit `$event` object containing username property.
     *
     * \@example
     * var username : string = $event.username;
     * @return {?}
     */
    onClickForgotPassword() {
        let /** @type {?} */ event = {};
        event = this.getEventResponse('usr');
        this.forgotPwd.emit(event);
    }
    /**
     * Show password form either to initialize first password or to reset forgot password.
     *
     * @param {?} isFirst Initialize first password or reset forgot password
     * @return {?}
     */
    showPwdForm(isFirst) {
        this.isFirst = isFirst;
        this.formType = Forms.PWD;
        this.showLayout(this.formLayouts.pwd);
    }
    /**
     * Show MFA setup form to initialize first TOTP (Time-based One-time Password).
     *
     * @param {?} code
     * @param {?} qrCode
     * @return {?}
     */
    showMfaSetupForm(code, qrCode) {
        this.code = code;
        this.qrCode = qrCode;
        this.formType = Forms.MFA_SETUP;
        this.showLayout(this.formLayouts.mfaSetup);
    }
    /**
     * Show MFA form to get verification code.
     * @return {?}
     */
    showMfaForm() {
        this.formType = Forms.MFA;
        this.showLayout(this.formLayouts.mfa);
    }
    /**
     * Hide password form.
     * @return {?}
     */
    hidePwdForm() {
        this.closeLayout(this.formLayouts.password);
    }
    /**
     * Hide MFA setup form.
     * @return {?}
     */
    hideMfaSetupForm() {
        this.closeLayout(this.formLayouts.mfaSetup);
    }
    /**
     * Hide MFA form.
     * @return {?}
     */
    hideMfaForm() {
        this.closeLayout(this.formLayouts.mfa);
    }
    /**
     * Go password step.
     * @param {?=} userInfo
     * @param {?=} userImage
     * @return {?}
     */
    showPwdStep(userInfo = null, userImage = null) {
        this.userInfo = userInfo;
        this.userImage = userImage;
        this.selectedTab = 2;
    }
    /**
     * @param {?} currentStep
     * @return {?}
     */
    onClickNextStep(currentStep) {
        switch (currentStep) {
            case 0:
                this.selectedTab = 1;
                break;
            case 1:
                // Username
                let /** @type {?} */ eventUsr = null;
                eventUsr = this.getEventResponse('usr');
                this.stepUsr.emit(eventUsr);
                break;
            case 2:
                // Password
                let /** @type {?} */ eventPwd = null;
                eventPwd = this.getEventResponse();
                this.stepPwd.emit(eventPwd);
                break;
            default:
                break;
        }
    }
    /**
     * @param {?} currentStep
     * @return {?}
     */
    onClickPrevStep(currentStep) {
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
    }
    /**
     * Emit `$event` object containing password property.
     *
     * \@example
     * var newPassword : string = $event.password;
     * @param {?} $event
     * @return {?}
     */
    tabFirstLog($event) {
        this.sendFirstPwd.emit($event);
    }
    /**
     * Emit `$event` object containing password and code properties.
     *
     * \@example
     * var newPassword      : string = $event.password;
     * var verificationCode : string = $event.code;
     * @param {?} $event
     * @return {?}
     */
    tabLostPwd($event) {
        this.sendResetPwd.emit($event);
    }
    /**
     * Emit `$event` object containing code property.
     *
     * \@example
     * var verificationCode : string = $event.code;
     * @param {?} $event
     * @return {?}
     */
    tabSaveMfaKey($event) {
        this.saveMfaKey.emit($event);
    }
    /**
     * Emit `$event` object containing code property.
     *
     * \@example
     * var verificationCode : string = $event.code;
     * @param {?} $event
     * @return {?}
     */
    tabSendMfaCode($event) {
        this.sendMfaCode.emit($event);
    }
    /**
     * Emit `$event` object containing password property.
     *
     * \@example
     * var newPassword : string = $event.password;
     * @param {?} dialogRef
     * @return {?}
     */
    modalFirstLog(dialogRef) {
        this.modalFirstSub = dialogRef.componentInstance.relayFirstLog.subscribe((event) => {
            this.sendFirstPwd.emit(event);
        });
    }
    /**
     * Emit `$event` object containing password and code properties.
     *
     * \@example
     * var newPassword      : string = $event.password;
     * var verificationCode : string = $event.code;
     * @param {?} dialogRef
     * @return {?}
     */
    modalLostPwd(dialogRef) {
        this.modalLostSub = dialogRef.componentInstance.relayLostPwd.subscribe((event) => {
            this.sendResetPwd.emit(event);
        });
    }
    /**
     * Emit `$event` object containing code property.
     *
     * \@example
     * var verificationCode : string = $event.code;
     * @param {?} dialogRef
     * @return {?}
     */
    modalSaveMfaKey(dialogRef) {
        this.modalSaveMfaKeySub = dialogRef.componentInstance.relaySaveMfaKey.subscribe((event) => {
            this.saveMfaKey.emit(event);
        });
    }
    /**
     * Emit `$event` object containing code property.
     *
     * \@example
     * var verificationCode : string = $event.code;
     * @param {?} dialogRef
     * @return {?}
     */
    modalSendMfaCode(dialogRef) {
        this.modalSendMfaCodeSub = dialogRef.componentInstance.relaySendMfaCode.subscribe((event) => {
            this.sendMfaCode.emit(event);
        });
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onClickCloseTab($event) {
        this.closeTab();
    }
    /**
     * @return {?}
     */
    openModal() {
        let /** @type {?} */ params = {
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
        let /** @type {?} */ dialogRef = this.dialog.open(ModalWrapperComponent, { data: params });
        if (this.formType === Forms.PWD) {
            this.modalFirstLog(dialogRef);
            this.modalLostPwd(dialogRef);
        }
        if (this.formType === Forms.MFA_SETUP)
            this.modalSaveMfaKey(dialogRef);
        if (this.formType === Forms.MFA)
            this.modalSendMfaCode(dialogRef);
        dialogRef.afterClosed().subscribe(result => {
            this.formType = null;
            if (result)
                this.formGroup.controls["password"].setValue(result); // Set password
        });
    }
    /**
     * @param {?} formLayout
     * @return {?}
     */
    showLayout(formLayout) {
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
    }
    /**
     * @param {?} formLayout
     * @return {?}
     */
    closeLayout(formLayout) {
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
    }
    /**
     * @return {?}
     */
    closeModal() {
        this.closeModalEvent.emit();
    }
    /**
     * @return {?}
     */
    openTab() {
        if (this.googleStyle)
            this.selectedTab = 3;
        else
            this.selectedTab = 1;
    }
    /**
     * @return {?}
     */
    closeTab() {
        this.selectedTab = 0;
    }
    /**
     * @param {?=} onlyOne
     * @return {?}
     */
    getEventResponse(onlyOne = null) {
        let /** @type {?} */ event = {};
        let /** @type {?} */ username = null;
        let /** @type {?} */ password = null;
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
    }
    /**
     * @return {?}
     */
    initFormLayouts() {
        let /** @type {?} */ defaultFormLayouts = null;
        let /** @type {?} */ formLayouts = null;
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
    }
    /**
     * @return {?}
     */
    initTheme() {
        let /** @type {?} */ theme = null;
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
    }
    /**
     * @return {?}
     */
    initIcons() {
        let /** @type {?} */ defaultIcons = null;
        let /** @type {?} */ icons = null;
        // Icons
        defaultIcons = {
            iconUsrOnLoginForm: true,
            iconPwdOnLoginForm: true,
        };
        icons = Object.assign(defaultIcons, this.customIcons);
        this.icons = icons;
    }
    /**
     * @return {?}
     */
    initButtons() {
        let /** @type {?} */ defaultButons = null;
        let /** @type {?} */ buttons = null;
        // Buttons
        defaultButons = {
            forgotPassword: true,
            signUp: true,
            google: true,
            facebook: true
        };
        buttons = Object.assign(defaultButons, this.customButtons);
        this.buttons = buttons;
    }
    /**
     * @return {?}
     */
    initInputs() {
        let /** @type {?} */ defaultInputs = null;
        let /** @type {?} */ inputs = null;
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
    }
    /**
     * @return {?}
     */
    initErrors() {
        let /** @type {?} */ defaultErrors = null;
        let /** @type {?} */ errors = null;
        // Errors
        defaultErrors = {
            login: true,
            pwd: true,
            mfa: true
        };
        errors = Object.assign(defaultErrors, this.customErrors);
        this.errors = errors;
    }
    /**
     * @return {?}
     */
    initPolicies() {
        // NOTE: Password
        let /** @type {?} */ defaultPwdPolicies = null;
        let /** @type {?} */ pwdPolicies = null;
        let /** @type {?} */ defaultMin = 8;
        let /** @type {?} */ defaultMax = 128;
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
        let /** @type {?} */ validators = [];
        switch (this.customUsrPolicy) {
            case UserPolicies.EMAIL:
                validators.push(UsrValidator.email);
                break;
            case UserPolicies.PHONE:
                validators.push(UsrValidator.phone);
                break;
            default:
                let /** @type {?} */ regExp = null;
                regExp = new RegExp(this.customUsrPolicy);
                validators.push(UsrValidator.custom(regExp));
                break;
        }
        validators.push(Validators.required);
        if (this.googleStyle)
            this.usrFormGroup.controls["username"].setValidators(validators);
        else
            this.formGroup.controls["username"].setValidators(validators);
    }
    /**
     * @return {?}
     */
    initLabels() {
        let /** @type {?} */ defaultLabels = {};
        let /** @type {?} */ labels = {};
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
    }
    /**
     * @return {?}
     */
    initFormGroups() {
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
    }
}
LoginFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'cal-login-form',
                template: `<div class="{{ fixedWidth ? 'login-wrapper' : '' }}" id="debug-login-form">
  <mat-tab-group id="caliatys-login-form" [selectedIndex]="selectedTab">
    <mat-tab label="login-form">
      <!-- NOTE: Login form -->
      <form (ngSubmit)="onClickLogin()" [formGroup]="formGroup" *ngIf="!googleStyle">
        <div class="row no-gutters">
          <div class="col">
            <div class="row no-gutters">
              <div class="col">
                <!-- NOTE: Username -->
                <mat-form-field class="w-100">
                  <div matPrefix class="mr-2" *ngIf="icons.iconUsrOnLoginForm">
                    <mat-icon class="align-bottom">person</mat-icon>
                  </div>
                  <input matInput formControlName="username" 
                    name="username" autocomplete="username" 
                    placeholder="{{ labels.input.username }}" 
                    type="text"/>
                  <button *ngIf="formGroup.controls.username.value?.length > 0 && inputs.clearUsrOnLoginForm" 
                    mat-button matSuffix mat-icon-button aria-label="Clear" 
                    color="primary" (click)="formGroup.controls.username.setValue('')" 
                    [disabled]="formType === forms.MFA && formLayouts.mfa === layouts.INLINE ? true : false" 
                    type="button">
                    <mat-icon>close</mat-icon>
                  </button>
                  <!-- NOTE: Error message(s) -->
                  <mat-hint align="start" *ngIf="formGroup.controls.username.errors?.required && errors.login">
                    {{ labels.policy.required }}
                  </mat-hint>
                  <mat-hint align="start" *ngIf="formGroup.controls.username.errors?.pattern && errors.login && usrPolicy === userPolicies.EMAIL">
                    {{ labels.policy.email }}
                  </mat-hint>
                  <mat-hint align="start" *ngIf="formGroup.controls.username.errors?.pattern && errors.login && usrPolicy === userPolicies.PHONE">
                    {{ labels.policy.phone }}
                  </mat-hint>
                  <mat-hint align="start" *ngIf="formGroup.controls.username.errors?.pattern && errors.login && usrPolicy && usrPolicy !== userPolicies.EMAIL && usrPolicy !== userPolicies.PHONE">
                    {{ labels.policy.customRegex }}
                  </mat-hint>
                </mat-form-field>
              </div>
            </div>
            <div class="row no-gutters">
              <div class="col">
                <!-- NOTE: Password -->
                <mat-form-field class="w-100">
                  <div matPrefix class="mr-2" *ngIf="icons.iconPwdOnLoginForm">
                    <mat-icon class="align-bottom">lock</mat-icon>
                  </div>
                  <input matInput formControlName="password" 
                    name="password" autocomplete="password" 
                    placeholder="{{ labels.input.password }}" 
                    type="{{ showPassword ? 'text' : 'password' }}"/>
                  <button *ngIf="inputs.showPwdOnLoginForm" 
                    mat-button matSuffix mat-icon-button aria-label="Clear" 
                    color="primary" (click)="showPassword=!showPassword" 
                    [disabled]="formType === forms.MFA && formLayouts.mfa === layouts.INLINE ? true : false" 
                    type="button">
                    <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
                  </button>
                  <!-- NOTE: Error message -->
                  <mat-hint align="start" *ngIf="formGroup.controls.password.errors?.required && errors.login">
                    {{ labels.policy.required }}
                  </mat-hint>
                </mat-form-field>
              </div> 
            </div>
            <!-- NOTE: Buttons -->
            <ng-container *ngIf="!( formType === forms.MFA && formLayouts.mfa === layouts.INLINE )">
              <div class="row no-gutters pb-3">
                <div class="col text-left">
                  <!-- TODO: Remember me -->
                </div>
                <!-- NOTE: Forgot password -->
                <div class="col text-right" *ngIf="buttons.forgotPassword">
                  <a (click)="onClickForgotPassword()" href="#" class="small">
                    {{ labels.button.forgotPassword }}
                  </a>
                </div>
              </div>
              <div class="row no-gutters pb-3">
                <div class="col text-right">
                  <!-- NOTE: Sign up -->
                  <button mat-button (click)="onClickSignUp()" type="button" color="primary" class="small text-uppercase mr-3" *ngIf="buttons.signUp">
                    {{ labels.button.signUp }}
                  </button>
                  <!-- NOTE: Sign in -->
                  <button mat-raised-button type="submit" color="primary" [disabled]="!formGroup.valid" class="small text-uppercase">
                    {{ labels.button.signIn }}
                  </button>
                </div>
              </div>
            </ng-container>
          </div>
        </div>
      </form>
      <!-- NOTE: Login by steps buttons -->
      <div class="row no-gutters mb-3" *ngIf="googleStyle">
        <div class="col text-right" *ngIf="buttons.signUp">
          <!-- NOTE: Sign up -->
          <button mat-button (click)="onClickSignUp()" type="button" color="primary" class="small text-uppercase mr-2">
            {{ labels.button.signUp }}
          </button>
        </div>
        <div class="col {{ buttons.signUp ? 'text-left' : 'text-center'}}">
          <!-- NOTE: Sign in -->
          <button mat-raised-button (click)="onClickNextStep(0)" type="button" color="primary" class="small text-uppercase ml-2">
            {{ labels.button.signIn }}
          </button>
        </div>
      </div>
      <!-- NOTE: Social buttons -->
      <ng-container *ngIf="!( formType === forms.MFA && formLayouts.mfa === layouts.INLINE )">
        <div class="row no-gutters">
          <div class="col text-center">
            <!-- NOTE: Google -->
            <div class="d-block mb-3" *ngIf="buttons.google">
              <button mat-raised-button type="button" class="mat-raised-button cal-btn google {{ theme }}" (click)="onClickLoginSocial('google')">
                <span class="cal-bg-icon">
                  <mat-icon class="align-middle cal-icon" svgIcon="google"></mat-icon>
                </span>
                <span class="cal-label">{{ labels.button.googleSignIn }}</span>
              </button>
            </div>
            <!-- NOTE: Facebook -->
            <div class="d-block mb-3" *ngIf="buttons.facebook">
              <button mat-raised-button type="button" class="cal-btn facebook" (click)="onClickLoginSocial('facebook')">
                <span class="cal-bg-icon">
                  <mat-icon class="align-middle cal-icon" svgIcon="facebook"></mat-icon>
                </span>
                <span class="cal-label">{{ labels.button.facebookSignIn }}</span>
              </button>
            </div>
          </div>
        </div>
      </ng-container>
      <!-- NOTE: Inline MFA -->
      <ng-container *ngIf="formType === forms.MFA && formLayouts.mfa === layouts.INLINE">
        <div class="row no-gutters">
          <div class="col">
            <cal-mfa-form 
              [inputs]="inputs" 
              [labels]="labels" 
              [errors]="errors" 
              (sendMfa)="tabSendMfaCode($event)">
            </cal-mfa-form>
          </div>
        </div>
      </ng-container>
    </mat-tab>
    <mat-tab label="usr-step" *ngIf="googleStyle">
      <!-- NOTE: Back button -->
      <div class="row no-gutters mb-3">
        <div class="col">
          <a href="#" (click)="onClickPrevStep(1)" title="{{ labels.button.back }}">
            <mat-icon class="align-bottom mr-2">keyboard_arrow_left</mat-icon>{{ labels.button.back }}
          </a>
        </div>
      </div>
      <form (ngSubmit)="onClickNextStep(1)" [formGroup]="usrFormGroup">
        <!-- NOTE: Username -->
        <mat-form-field class="w-100">
          <div matPrefix class="mr-2" *ngIf="icons.iconUsrOnLoginForm">
            <mat-icon class="align-bottom">person</mat-icon>
          </div>
          <input matInput formControlName="username" 
            name="username" autocomplete="username" 
            placeholder="{{ labels.input.username }}" 
            type="text"/>
          <button *ngIf="usrFormGroup.controls.username.value?.length > 0 && inputs.clearUsrOnLoginForm" 
            mat-button matSuffix mat-icon-button aria-label="Clear" 
            color="primary" (click)="usrFormGroup.controls.username.setValue('')" 
            [disabled]="formType === forms.MFA && formLayouts.mfa === layouts.INLINE ? true : false" 
            type="button">
            <mat-icon>close</mat-icon>
          </button>
          <!-- NOTE: Error message(s) -->
          <mat-hint align="start" *ngIf="usrFormGroup.controls.username.errors?.required && errors.login">
            {{ labels.policy.required }}
          </mat-hint>
          <mat-hint align="start" *ngIf="usrFormGroup.controls.username.errors?.pattern && errors.login && usrPolicy === userPolicies.EMAIL">
            {{ labels.policy.email }}
          </mat-hint>
          <mat-hint align="start" *ngIf="usrFormGroup.controls.username.errors?.pattern && errors.login && usrPolicy === userPolicies.PHONE">
            {{ labels.policy.phone }}
          </mat-hint>
          <mat-hint align="start" *ngIf="usrFormGroup.controls.username.errors?.pattern && errors.login && usrPolicy && usrPolicy !== userPolicies.EMAIL && usrPolicy !== userPolicies.PHONE">
            {{ labels.policy.customRegex }}
          </mat-hint>
        </mat-form-field>
        <div class="row no-gutters mb-3">
          <!-- NOTE: Forgot password -->
          <div class="col text-left" *ngIf="buttons.forgotPassword">
            <a (click)="onClickForgotPassword()" href="#" class="small">
              {{ labels.button.forgotPassword }}
            </a>
          </div>
          <!-- NOTE: Next button -->
          <div class="col text-right">
            <button mat-raised-button type="submit" color="primary" [disabled]="!usrFormGroup.valid" class="small text-uppercase">
              {{ labels.button.next }}
            </button>
          </div>
        </div>
      </form>
    </mat-tab>
    <mat-tab label="pwd-step" *ngIf="googleStyle">
      <!-- NOTE: Back button -->
      <div class="row no-gutters mb-3">
        <div class="col">
          <a href="#" (click)="onClickPrevStep(2)" title="{{ labels.button.back }}">
            <mat-icon class="align-bottom mr-2">keyboard_arrow_left</mat-icon>{{ labels.button.back }}
          </a>
        </div>
      </div>
      <!-- TODO: User info -->
      <p>{{ userInfo }}</p>
      <form (ngSubmit)="onClickNextStep(2)" [formGroup]="pwdFormGroup">
        <!-- NOTE: Password -->
        <mat-form-field class="w-100">
          <div matPrefix class="mr-2" *ngIf="icons.iconPwdOnLoginForm">
            <mat-icon class="align-bottom">lock</mat-icon>
          </div>
          <input matInput formControlName="password" 
            name="password" autocomplete="password" 
            placeholder="{{ labels.input.password }}" 
            type="{{ showPassword ? 'text' : 'password' }}"/>
          <button *ngIf="inputs.showPwdOnLoginForm" 
            mat-button matSuffix mat-icon-button aria-label="Clear" 
            color="primary" (click)="showPassword=!showPassword" 
            [disabled]="formType === forms.MFA && formLayouts.mfa === layouts.INLINE ? true : false" 
            type="button">
            <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
          </button>
          <!-- NOTE: Error message -->
          <mat-hint align="start" *ngIf="pwdFormGroup.controls.password.errors?.required && errors.login">
            {{ labels.policy.required }}
          </mat-hint>
        </mat-form-field>
        <!-- NOTE: Next button -->
        <div class="row no-gutters mb-3">
          <div class="col text-right">
            <button mat-raised-button type="submit" color="primary" [disabled]="!pwdFormGroup.valid" class="small text-uppercase">
              {{ labels.button.next }}
            </button>
          </div>
        </div>
      </form>
    </mat-tab>
    <mat-tab label="tab-wrapper" *ngIf="(formLayouts | existsLayout: layouts.TAB)">
      <!-- NOTE: Tab form -->
      <cal-tab-wrapper 
        [formType]="formType" 
        [isFirst]="isFirst" 
        [code]   ="code" 
        [qrCode] ="qrCode" 
        [pwdPolicies]="pwdPolicies" 
        [errors]="errors" 
        [labels]="labels" 
        [inputs]="inputs" 
        (sendCloseTab)="onClickCloseTab($event)" 
        (relayFirstLog)="tabFirstLog($event)" 
        (relayLostPwd)="tabLostPwd($event)" 
        (relaySaveMfaKey)="tabSaveMfaKey($event)" 
        (relaySendMfaCode)="tabSendMfaCode($event)">
      </cal-tab-wrapper>
    </mat-tab>
  </mat-tab-group>
</div>`,
                styles: [`/deep/ #caliatys-login-form mat-tab-header{display:none!important}mat-form-field mat-icon{color:grey}.login-wrapper{width:100%;max-width:330px;padding:15px;margin:0 auto}.cal-btn{line-height:35px;border:0!important;padding:1px!important}.cal-btn .cal-bg-icon{padding:8px;width:34px;height:34px;display:inline-block;vertical-align:top!important}.cal-btn .cal-bg-icon .cal-icon{display:inline-block;height:18px;width:18px;margin-top:-4px;vertical-align:top!important}.cal-btn .cal-label{padding-right:8px;padding-left:16px;size:14px;font-family:Roboto,sans-serif}.adn{background-color:#d87a68!important;color:#fff!important}.adn i{color:#fff!important}.adn:hover{background-color:#e29e91!important}.bitbucket{background-color:#205081!important;color:#fff!important}.bitbucket i{color:#fff!important}.bitbucket:hover{background-color:#2a69aa!important}.dropbox{background-color:#1087dd!important;color:#fff!important}.dropbox i{color:#fff!important}.dropbox:hover{background-color:#309ff0!important}.facebook{background-color:#3b5998!important;color:#fff!important}.facebook i{color:#fff!important}.facebook:hover{background-color:#4c70ba!important}.flickr{background-color:#ff0084!important;color:#fff!important}.flickr i{color:#fff!important}.flickr:hover{background-color:#ff339d!important}.foursquare{background-color:#f94877!important;color:#fff!important}.foursquare i{color:#fff!important}.foursquare:hover{background-color:#fb799c!important}.github{background-color:#444!important;color:#fff!important}.github i{color:#fff!important}.github:hover{background-color:#5e5e5e!important}.instagram{background-color:#405de6!important;color:#fff!important}.instagram i{color:#fff!important}.instagram:hover{background-color:#6d83ec!important}.linkedin{background-color:#007bb6!important;color:#fff!important}.linkedin i{color:#fff!important}.linkedin:hover{background-color:#009de9!important}.microsoft{background-color:#2672ec!important;color:#fff!important}.microsoft i{color:#fff!important}.microsoft:hover{background-color:#5590f0!important}.windows{background-color:#2672ec!important;color:#fff!important}.windows i{color:#fff!important}.windows:hover{background-color:#5590f0!important}.odnoklassniki{background-color:#f4731c!important;color:#fff!important}.odnoklassniki i{color:#fff!important}.odnoklassniki:hover{background-color:#f6914d!important}.openid{background-color:#f7931e!important;color:#fff!important}.openid i{color:#fff!important}.openid:hover{background-color:#f9ab4f!important}.pinterest{background-color:#cb2027!important;color:#fff!important}.pinterest i{color:#fff!important}.pinterest:hover{background-color:#e03e44!important}.reddit{background-color:#eff7ff!important;color:#000!important}.reddit i{color:#000!important}.reddit:hover{background-color:#fff!important}.soundcloud{background-color:#f50!important;color:#fff!important}.soundcloud i{color:#fff!important}.soundcloud:hover{background-color:#f73!important}.tumblr{background-color:#2c4762!important;color:#fff!important}.tumblr i{color:#fff!important}.tumblr:hover{background-color:#3c6185!important}.twitter{background-color:#55acee!important;color:#fff!important}.twitter i{color:#fff!important}.twitter:hover{background-color:#83c3f3!important}.vimeo{background-color:#1ab7ea!important;color:#fff!important}.vimeo i{color:#fff!important}.vimeo:hover{background-color:#49c6ee!important}.vk{background-color:#587ea3!important;color:#fff!important}.vk i{color:#fff!important}.vk:hover{background-color:#7897b6!important}.yahoo{background-color:#720e9e!important;color:#fff!important}.yahoo i{color:#fff!important}.yahoo:hover{background-color:#9412cd!important}.google.light{background-color:#fff!important;color:#5f6368!important}.google.light i{color:#5f6368!important}.google.light:hover{background-color:#fff!important}.google.dark{background-color:#4285f4!important;color:#fff!important}.google.dark i{color:#fff!important}.google.dark:hover{background-color:#72a4f7!important}.google.dark .cal-bg-icon{background:#fff}`]
            },] },
];
/** @nocollapse */
LoginFormComponent.ctorParameters = () => [
    { type: MatDialog, },
    { type: DomSanitizer, },
    { type: MatIconRegistry, },
    { type: FormBuilder, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY2FsaWF0eXMvbG9naW4tZm9ybS8iLCJzb3VyY2VzIjpbImxpYi9sb2dpbi1mb3JtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBTUEsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFnQixlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFlLGVBQWUsQ0FBQztBQUNoRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQVksZUFBZSxDQUFDO0FBQ2hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBUyxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFZLG1CQUFtQixDQUFDO0FBQ3BELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQVMsMkJBQTJCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFVLGdCQUFnQixDQUFDO0FBRWpELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBVSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQVcsZ0JBQWdCLENBQUM7QUFNakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFTLDRCQUE0QixDQUFDO0FBRzdELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBYyxzQkFBc0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQWUscUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFnQixvQkFBb0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQVMsNEJBQTRCLENBQUM7QUFHN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saURBQWlELENBQUM7QUFrUnhGLE1BQU07Ozs7Ozs7SUFxR0osWUFFVSxRQUNBLFdBQ0EsY0FDQTtRQUhBLFdBQU0sR0FBTixNQUFNO1FBQ04sY0FBUyxHQUFULFNBQVM7UUFDVCxpQkFBWSxHQUFaLFlBQVk7UUFDWixZQUFPLEdBQVAsT0FBTzs7MEJBM0Z1QixLQUFLOzsyQkFFTCxLQUFLOzsyQkFFTCxJQUFJOzs7K0JBT0wsSUFBSTs7MkJBb0JHLElBQUksWUFBWSxFQUFFOztzQkFFbEIsSUFBSSxZQUFZLEVBQUU7O3FCQUVsQixJQUFJLFlBQVksRUFBRTs7MkJBRWxCLElBQUksWUFBWSxFQUFFOzt5QkFFbEIsSUFBSSxZQUFZLEVBQUU7OzRCQUVsQixJQUFJLFlBQVksRUFBRTs7NEJBRWxCLElBQUksWUFBWSxFQUFFOzswQkFFbEIsSUFBSSxZQUFZLEVBQUU7OzJCQUVsQixJQUFJLFlBQVksRUFBRTs7dUJBRWxCLElBQUksWUFBWSxFQUFFOzt1QkFFbEIsSUFBSSxZQUFZLEVBQUU7NEJBSTVCLEtBQUs7NEJBRWhCLFlBQVk7cUJBQ25CLEtBQUs7dUJBR2EsS0FBSztvQkFHTCxJQUFJO3NCQUNKLElBQUk7d0JBS0osSUFBSTt5QkFDSixJQUFJO3VCQUdwQixPQUFPOzJCQUNVLENBQUM7K0JBQ2MsSUFBSSxZQUFZLEVBQUU7OztRQW9CcEUsWUFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUksU0FBUyxDQUFDLDhCQUE4QixDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztRQUMxRyxZQUFZLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsOEJBQThCLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFDO0tBQzdHOzs7O0lBRU0sUUFBUTs7UUFHYixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7O1FBRXRCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7Ozs7O0lBR2IsZUFBZTtRQUVwQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDOzs7Ozs7SUFHbkIsV0FBVyxDQUFDLE9BQXVCO1FBRXhDLEVBQUUsQ0FBQSxDQUFDLE9BQU87WUFDUixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsRUFBRSxDQUFBLENBQUMsT0FBTztZQUNSLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN6QixFQUFFLENBQUEsQ0FBQyxPQUFPO1lBQ1IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRW5CLEVBQUUsQ0FBQSxDQUFDLE9BQU8seUJBQXNCLE9BQU8sbUJBQWdCLENBQUM7WUFDdEQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLEVBQUUsQ0FBQSxDQUFDLE9BQU87WUFDUixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkIsRUFBRSxDQUFBLENBQUMsT0FBTztZQUNSLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyQixFQUFFLENBQUEsQ0FBQyxPQUFPO1lBQ1IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BCLEVBQUUsQ0FBQSxDQUFDLE9BQU87WUFDUixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEIsRUFBRSxDQUFBLENBQUMsT0FBTztZQUNSLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7Ozs7SUFHZixXQUFXO1FBRWhCLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDcEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbEMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBQ3pCLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN4QyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUM7WUFDMUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsRUFBRSxDQUFDOzs7Ozs7Ozs7O0lBZXBDLFlBQVk7UUFFakIscUJBQUksS0FBSyxHQUFTLEVBQUUsQ0FBQztRQUNyQixLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Ozs7Ozs7Ozs7OztJQVdsQixrQkFBa0IsQ0FBQyxNQUFlO1FBRXZDLHFCQUFJLEtBQUssR0FBUyxFQUFFLENBQUM7UUFDckIsS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2hDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7SUFJeEIsYUFBYTtRQUVsQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDOzs7Ozs7Ozs7SUFRZCxxQkFBcUI7UUFFMUIscUJBQUksS0FBSyxHQUFTLEVBQUUsQ0FBQztRQUNyQixLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Ozs7OztJQVN0QixXQUFXLENBQUMsT0FBaUI7UUFFbEMsSUFBSSxDQUFDLE9BQU8sR0FBSSxPQUFPLENBQUM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7O0lBUWpDLGdCQUFnQixDQUFDLElBQWEsRUFBRSxNQUFlO1FBRXBELElBQUksQ0FBQyxJQUFJLEdBQU8sSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUssTUFBTSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7OztJQUl0QyxXQUFXO1FBRWhCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUMxQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7OztJQUlqQyxXQUFXO1FBRWhCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7Ozs7O0lBSXZDLGdCQUFnQjtRQUVyQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7Ozs7OztJQUl2QyxXQUFXO1FBRWhCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7SUFJbEMsV0FBVyxDQUFDLFdBQW9CLElBQUksRUFBRSxZQUFxQixJQUFJO1FBRXBFLElBQUksQ0FBQyxRQUFRLEdBQU0sUUFBUSxDQUFDO1FBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUssU0FBUyxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7SUFPaEIsZUFBZSxDQUFDLFdBQW9CO1FBRXpDLE1BQU0sQ0FBQSxDQUFDLFdBQVcsQ0FBQyxDQUNuQixDQUFDO1lBQ0MsS0FBSyxDQUFDO2dCQUNKLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQixLQUFLLENBQUM7WUFDUixLQUFLLENBQUM7O2dCQUNKLHFCQUFJLFFBQVEsR0FBUyxJQUFJLENBQUM7Z0JBQzFCLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUM1QixLQUFLLENBQUM7WUFDUixLQUFLLENBQUM7O2dCQUNKLHFCQUFJLFFBQVEsR0FBUyxJQUFJLENBQUM7Z0JBQzFCLFFBQVEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzVCLEtBQUssQ0FBQztZQUNSO2dCQUNFLEtBQUssQ0FBQztTQUNUOzs7Ozs7SUFHSSxlQUFlLENBQUMsV0FBb0I7UUFFekMsTUFBTSxDQUFBLENBQUMsV0FBVyxDQUFDLENBQ25CLENBQUM7WUFDQyxLQUFLLENBQUM7Z0JBQ0osS0FBSyxDQUFDO1lBQ1IsS0FBSyxDQUFDOztnQkFDSixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDckIsS0FBSyxDQUFDO1lBQ1IsS0FBSyxDQUFDOztnQkFDSixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztnQkFDckIsS0FBSyxDQUFDO1lBQ1I7Z0JBQ0UsS0FBSyxDQUFDO1NBQ1Q7Ozs7Ozs7Ozs7SUFZSSxXQUFXLENBQUMsTUFBWTtRQUU3QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFTMUIsVUFBVSxDQUFDLE1BQVk7UUFFNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFRMUIsYUFBYSxDQUFDLE1BQVk7UUFFL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFReEIsY0FBYyxDQUFDLE1BQVk7UUFFaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7Ozs7Ozs7SUFZekIsYUFBYSxDQUFDLFNBQWU7UUFFbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBRWpGLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQy9CLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7SUFTRSxZQUFZLENBQUMsU0FBZTtRQUVqQyxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFFL0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0IsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBUUUsZUFBZSxDQUFDLFNBQWU7UUFFcEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFFeEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0IsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBUUUsZ0JBQWdCLENBQUMsU0FBZTtRQUVyQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBRTFGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlCLENBQUMsQ0FBQzs7Ozs7O0lBT0UsZUFBZSxDQUFDLE1BQVk7UUFFakMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs7OztJQU9WLFNBQVM7UUFFZixxQkFBSSxNQUFNLEdBQVM7O1lBRWpCLFFBQVEsRUFBZ0IsSUFBSSxDQUFDLFFBQVE7WUFDckMsTUFBTSxFQUFrQixJQUFJLENBQUMsTUFBTTtZQUNuQyxVQUFVLEVBQWMsSUFBSSxDQUFDLGVBQWU7WUFDNUMsTUFBTSxFQUFrQixJQUFJLENBQUMsTUFBTTtZQUNuQyxNQUFNLEVBQWtCLElBQUksQ0FBQyxNQUFNOztZQUVuQyxPQUFPLEVBQWlCLElBQUksQ0FBQyxPQUFPO1lBQ3BDLFdBQVcsRUFBYSxJQUFJLENBQUMsV0FBVzs7WUFFeEMsSUFBSSxFQUFvQixJQUFJLENBQUMsSUFBSTtZQUNqQyxNQUFNLEVBQWtCLElBQUksQ0FBQyxNQUFNO1NBQ3BDLENBQUM7UUFFRixxQkFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsRUFBRSxJQUFJLEVBQUcsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUUzRSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDL0IsQ0FBQztZQUNDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM5QjtRQUVELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWxDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFbkMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUV6QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixFQUFFLENBQUEsQ0FBQyxNQUFNLENBQUM7Z0JBQ1IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLGFBQVUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JELENBQUMsQ0FBQzs7Ozs7O0lBT0csVUFBVSxDQUFDLFVBQW1CO1FBRXBDLE1BQU0sQ0FBQSxDQUFDLFVBQVUsQ0FBQyxDQUNsQixDQUFDO1lBQ0MsS0FBSyxPQUFPLENBQUMsR0FBRztnQkFDZCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2YsS0FBSyxDQUFDO1lBQ1IsS0FBSyxPQUFPLENBQUMsS0FBSztnQkFDaEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUNqQixLQUFLLENBQUM7WUFDUixLQUFLLE9BQU8sQ0FBQyxNQUFNO2dCQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsYUFBVSxPQUFPLEVBQUUsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLGFBQVUsT0FBTyxFQUFFLENBQUM7Z0JBQzNDLEtBQUssQ0FBQztZQUNSO2dCQUNFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDZixLQUFLLENBQUM7U0FDVDs7Ozs7O0lBR0ssV0FBVyxDQUFDLFVBQW1CO1FBRXJDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBRXJCLE1BQU0sQ0FBQSxDQUFDLFVBQVUsQ0FBQyxDQUNsQixDQUFDO1lBQ0MsS0FBSyxPQUFPLENBQUMsR0FBRztnQkFDZCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLEtBQUssQ0FBQztZQUNSLEtBQUssT0FBTyxDQUFDLEtBQUs7Z0JBQ2hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDbEIsS0FBSyxDQUFDO1lBQ1IsS0FBSyxPQUFPLENBQUMsTUFBTTtnQkFDakIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLGFBQVUsTUFBTSxFQUFFLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxhQUFVLE1BQU0sRUFBRSxDQUFDO2dCQUMxQyxLQUFLLENBQUM7WUFDUjtnQkFDRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLEtBQUssQ0FBQztTQUNUOzs7OztJQUdLLFVBQVU7UUFFaEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7Ozs7SUFHdEIsT0FBTztRQUViLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSTtZQUNGLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDOzs7OztJQUdqQixRQUFRO1FBRWQsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7Ozs7OztJQUdmLGdCQUFnQixDQUFDLFVBQW1CLElBQUk7UUFFOUMscUJBQUksS0FBSyxHQUFlLEVBQUUsQ0FBQztRQUMzQixxQkFBSSxRQUFRLEdBQVksSUFBSSxDQUFDO1FBQzdCLHFCQUFJLFFBQVEsR0FBWSxJQUFJLENBQUM7UUFFN0IsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUNwQixDQUFDO1lBQ0MsUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxhQUFVLEtBQUssQ0FBQztZQUNyRCxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLGFBQVUsS0FBSyxDQUFDO1NBQ3REO1FBQ0QsSUFBSSxDQUNKLENBQUM7WUFDQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLGFBQVUsS0FBSyxDQUFDO1lBQ2xELFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsYUFBVSxLQUFLLENBQUM7U0FDbkQ7UUFFRCxFQUFFLENBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUNaLENBQUM7WUFDQyxLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUMxQixLQUFLLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUMzQjtRQUNELEVBQUUsQ0FBQSxDQUFDLE9BQU8sSUFBSSxPQUFPLEtBQUssS0FBSyxDQUFDO1lBQzlCLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzVCLEVBQUUsQ0FBQSxDQUFDLE9BQU8sSUFBSSxPQUFPLEtBQUssS0FBSyxDQUFDO1lBQzlCLEtBQUssQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBRTVCLE1BQU0sQ0FBQyxLQUFLLENBQUM7Ozs7O0lBT1AsZUFBZTtRQUVyQixxQkFBSSxrQkFBa0IsR0FBUyxJQUFJLENBQUM7UUFDcEMscUJBQUksV0FBVyxHQUFnQixJQUFJLENBQUM7O1FBR3BDLGtCQUFrQixHQUFHO1lBQ25CLEdBQUcsRUFBUSxPQUFPLENBQUMsR0FBRztZQUN0QixRQUFRLEVBQUcsT0FBTyxDQUFDLEdBQUc7WUFDdEIsR0FBRyxFQUFRLE9BQU8sQ0FBQyxHQUFHO1NBQ3ZCLENBQUM7UUFFRixXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7UUFHeEUsRUFBRSxDQUFBLENBQUMsV0FBVyxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3BDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNoQyxFQUFFLENBQUEsQ0FBQyxXQUFXLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDekMsV0FBVyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3JDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLEdBQUcsS0FBSyxPQUFPLENBQUMsTUFBTSxDQUFDO1lBQ3hELFdBQVcsQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUVoQyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQzs7Ozs7SUFHekIsU0FBUztRQUVmLHFCQUFJLEtBQUssR0FBWSxJQUFJLENBQUM7O1FBRzFCLE1BQU0sQ0FBQSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDeEIsQ0FBQztZQUNDLEtBQUssTUFBTSxDQUFDLEtBQUs7Z0JBQ2YsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ3pCLEtBQUssQ0FBQztZQUNSLEtBQUssTUFBTSxDQUFDLElBQUk7Z0JBQ2QsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQ3pCLEtBQUssQ0FBQztZQUNSO2dCQUNFLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2dCQUNyQixLQUFLLENBQUM7U0FDVDtRQUVELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOzs7OztJQUdiLFNBQVM7UUFFZixxQkFBSSxZQUFZLEdBQVMsSUFBSSxDQUFDO1FBQzlCLHFCQUFJLEtBQUssR0FBZ0IsSUFBSSxDQUFDOztRQUc5QixZQUFZLEdBQUc7WUFDYixrQkFBa0IsRUFBRyxJQUFJO1lBQ3pCLGtCQUFrQixFQUFHLElBQUk7U0FDMUIsQ0FBQztRQUVGLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Ozs7O0lBR2IsV0FBVztRQUVqQixxQkFBSSxhQUFhLEdBQVMsSUFBSSxDQUFDO1FBQy9CLHFCQUFJLE9BQU8sR0FBZSxJQUFJLENBQUM7O1FBRy9CLGFBQWEsR0FBRztZQUNkLGNBQWMsRUFBRyxJQUFJO1lBQ3JCLE1BQU0sRUFBVyxJQUFJO1lBQ3JCLE1BQU0sRUFBVyxJQUFJO1lBQ3JCLFFBQVEsRUFBUyxJQUFJO1NBQ3RCLENBQUM7UUFFRixPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOzs7OztJQUdqQixVQUFVO1FBRWhCLHFCQUFJLGFBQWEsR0FBUyxJQUFJLENBQUM7UUFDL0IscUJBQUksTUFBTSxHQUFnQixJQUFJLENBQUM7O1FBRy9CLGFBQWEsR0FBRztZQUNkLG1CQUFtQixFQUFHLElBQUk7WUFDMUIsa0JBQWtCLEVBQUksSUFBSTtZQUMxQixnQkFBZ0IsRUFBTSxJQUFJO1lBQzFCLGtCQUFrQixFQUFJLElBQUk7WUFDMUIsa0JBQWtCLEVBQUksSUFBSTtTQUMzQixDQUFDO1FBRUYsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7Ozs7SUFHZixVQUFVO1FBRWhCLHFCQUFJLGFBQWEsR0FBUyxJQUFJLENBQUM7UUFDL0IscUJBQUksTUFBTSxHQUFnQixJQUFJLENBQUM7O1FBRy9CLGFBQWEsR0FBRztZQUNkLEtBQUssRUFBRyxJQUFJO1lBQ1osR0FBRyxFQUFLLElBQUk7WUFDWixHQUFHLEVBQUssSUFBSTtTQUNiLENBQUM7UUFFRixNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOzs7OztJQUdmLFlBQVk7O1FBR2xCLHFCQUFJLGtCQUFrQixHQUFZLElBQUksQ0FBQztRQUN2QyxxQkFBSSxXQUFXLEdBQW1CLElBQUksQ0FBQztRQUN2QyxxQkFBSSxVQUFVLEdBQW9CLENBQUMsQ0FBQztRQUNwQyxxQkFBSSxVQUFVLEdBQW9CLEdBQUcsQ0FBQzs7UUFHdEMsa0JBQWtCLEdBQUc7WUFDbkIsS0FBSyxFQUFHO2dCQUNOLEdBQUcsRUFBRyxVQUFVO2dCQUNoQixHQUFHLEVBQUcsVUFBVTthQUNqQjtZQUNELElBQUksRUFBSyxJQUFJO1lBQ2IsTUFBTSxFQUFHLElBQUk7WUFDYixLQUFLLEVBQUksSUFBSTtZQUNiLEtBQUssRUFBSSxJQUFJO1NBQ2QsQ0FBQztRQUVGLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRXhFLEVBQUUsQ0FBQSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQ2pELENBQUM7WUFDQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxVQUFVLENBQUM7WUFDbkMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsVUFBVSxDQUFDO1NBQ3BDO1FBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7O1FBRy9CLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUN2QixNQUFNLENBQUM7UUFFVCxxQkFBSSxVQUFVLEdBQVMsRUFBRSxDQUFDO1FBRTFCLE1BQU0sQ0FBQSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FDNUIsQ0FBQztZQUNDLEtBQUssWUFBWSxDQUFDLEtBQUs7Z0JBQ3JCLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQyxLQUFLLENBQUM7WUFDUixLQUFLLFlBQVksQ0FBQyxLQUFLO2dCQUNyQixVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEMsS0FBSyxDQUFDO1lBQ1I7Z0JBQ0UscUJBQUksTUFBTSxHQUFZLElBQUksQ0FBQztnQkFDM0IsTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDMUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzdDLEtBQUssQ0FBQztTQUNUO1FBRUQsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsYUFBVSxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEUsSUFBSTtZQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxhQUFVLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQzs7Ozs7SUFHdkQsVUFBVTtRQUVoQixxQkFBSSxhQUFhLEdBQVMsRUFBRSxDQUFDO1FBQzdCLHFCQUFJLE1BQU0sR0FBZ0IsRUFBRSxDQUFDO1FBRTdCLGFBQWEsQ0FBQyxNQUFNLEdBQUc7WUFDckIsUUFBUSxFQUFXLGVBQWU7WUFDbEMsV0FBVyxFQUFRLG9DQUFvQztZQUN2RCxhQUFhLEVBQU0sZ0JBQWdCO1lBQ25DLGdCQUFnQixFQUFHLDZCQUE2QjtZQUNoRCxRQUFRLEVBQVcsS0FBSztZQUN4QixXQUFXLEVBQVEsb0NBQW9DO1lBQ3ZELGFBQWEsRUFBTSxXQUFXO1lBQzlCLGdCQUFnQixFQUFHLDRDQUE0QztTQUNoRSxDQUFDO1FBQ0YsYUFBYSxDQUFDLEtBQUssR0FBRztZQUNwQixRQUFRLEVBQU0sVUFBVTtZQUN4QixRQUFRLEVBQU0sVUFBVTtZQUN4QixTQUFTLEVBQUssbUJBQW1CO1lBQ2pDLFdBQVcsRUFBRyxjQUFjO1NBQzdCLENBQUM7UUFDRixhQUFhLENBQUMsTUFBTSxHQUFHO1lBQ3JCLE1BQU0sRUFBVyxTQUFTO1lBQzFCLE1BQU0sRUFBVyxTQUFTO1lBQzFCLElBQUksRUFBYSxNQUFNO1lBQ3ZCLElBQUksRUFBYSxNQUFNO1lBQ3ZCLElBQUksRUFBYSxNQUFNO1lBQ3ZCLElBQUksRUFBYSxNQUFNO1lBQ3ZCLGNBQWMsRUFBRyxpQkFBaUI7WUFDbEMsWUFBWSxFQUFLLHFCQUFxQjtZQUN0QyxjQUFjLEVBQUcsdUJBQXVCO1NBQ3pDLENBQUM7UUFDRixhQUFhLENBQUMsTUFBTSxHQUFHO1lBQ3JCLFFBQVEsRUFBUSx3QkFBd0I7WUFDeEMsYUFBYSxFQUFHLHdDQUF3QztZQUN4RCxLQUFLLEVBQVcsNkJBQTZCO1lBQzdDLEtBQUssRUFBVyxtQ0FBbUM7WUFDbkQsU0FBUyxFQUFPLHFDQUFxQztZQUNyRCxXQUFXLEVBQUssaURBQWlEO1lBQ2pFLFNBQVMsRUFBTyw4Q0FBOEM7WUFDOUQsWUFBWSxFQUFJLGdEQUFnRDtZQUNoRSxZQUFZLEVBQUksZ0RBQWdEO1lBQ2hFLFNBQVMsRUFBTyxzQ0FBc0M7WUFDdEQsVUFBVSxFQUFNLHlGQUF5RjtTQUMxRyxDQUFDO1FBRUYsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV6RCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7Ozs7SUFHZixjQUFjO1FBRXBCLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUNyQixDQUFDO1lBQ0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDbEMsUUFBUSxFQUFPLElBQUksV0FBVyxDQUFDO29CQUM3QixLQUFLLEVBQVEsSUFBSTtvQkFDakIsUUFBUSxFQUFLLEtBQUs7aUJBQ25CLEVBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3hCLFFBQVEsRUFBTyxJQUFJLFdBQVcsQ0FBQztvQkFDN0IsS0FBSyxFQUFRLElBQUk7b0JBQ2pCLFFBQVEsRUFBSyxLQUFLO2lCQUNuQixFQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3pCLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQztTQUNSO1FBRUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUNyQyxRQUFRLEVBQU8sSUFBSSxXQUFXLENBQUM7Z0JBQzdCLEtBQUssRUFBUSxJQUFJO2dCQUNqQixRQUFRLEVBQUssS0FBSzthQUNuQixFQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3pCLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7WUFDckMsUUFBUSxFQUFPLElBQUksV0FBVyxDQUFDO2dCQUM3QixLQUFLLEVBQVEsSUFBSTtnQkFDakIsUUFBUSxFQUFLLEtBQUs7YUFDbkIsRUFBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN6QixDQUFDLENBQUM7Ozs7WUE1a0NOLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQU0sZ0JBQWdCO2dCQUM5QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJRTDtnQkFDTCxNQUFNLEVBQUUsQ0FBQyw2NkhBQTY2SCxDQUFDO2FBQ3g3SDs7OztZQXRTUSxTQUFTO1lBRVQsWUFBWTtZQURaLGVBQWU7WUFJZixXQUFXOzs7MkJBaVRqQixLQUFLOzRCQUVMLEtBQUs7NEJBRUwsS0FBSztrQ0FHTCxLQUFLO2dDQUlMLEtBQUs7a0NBRUwsS0FBSzs0QkFHTCxLQUFLOzhCQUdMLEtBQUs7NkJBR0wsS0FBSzs2QkFHTCxLQUFLOzZCQUdMLEtBQUs7NEJBR0wsTUFBTTt1QkFFTixNQUFNO3NCQUVOLE1BQU07NEJBRU4sTUFBTTswQkFFTixNQUFNOzZCQUVOLE1BQU07NkJBRU4sTUFBTTsyQkFFTixNQUFNOzRCQUVOLE1BQU07d0JBRU4sTUFBTTt3QkFFTixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQW5ndWxhciBtb2R1bGVzXHJcbmltcG9ydCB7IE9uSW5pdCB9ICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBZnRlclZpZXdJbml0IH0gICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT25DaGFuZ2VzIH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFNpbXBsZUNoYW5nZXMgfSAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPbkRlc3Ryb3kgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgSW5wdXQgfSAgICAgICAgICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE91dHB1dCB9ICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gICAgZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE1hdERpYWxvZyB9ICAgICAgIGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcclxuaW1wb3J0IHsgTWF0SWNvblJlZ2lzdHJ5IH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSAgICBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSAgICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBGb3JtR3JvdXAgfSAgICAgICBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZvcm1CdWlsZGVyIH0gICAgIGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgVmFsaWRhdG9ycyB9ICAgICAgZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuLy8gRXh0ZXJuYWwgbW9kdWxlc1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSAgICBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XHJcblxyXG4vLyBJbnRlcm5hbCBtb2R1bGVzXHJcbmltcG9ydCB7IFVzclZhbGlkYXRvciB9ICAgIGZyb20gJy4vdmFsaWRhdG9ycy91c3IudmFsaWRhdG9yJztcclxuXHJcbi8vIEVudW1zXHJcbmltcG9ydCB7IExheW91dHMgfSAgICAgICAgIGZyb20gJy4vZW51bXMvbGF5b3V0cy5lbnVtJztcclxuaW1wb3J0IHsgVGhlbWVzIH0gICAgICAgICAgZnJvbSAnLi9lbnVtcy90aGVtZXMuZW51bSc7XHJcbmltcG9ydCB7IEZvcm1zIH0gICAgICAgICAgIGZyb20gJy4vZW51bXMvZm9ybXMuZW51bSc7XHJcbmltcG9ydCB7IFVzZXJQb2xpY2llcyB9ICAgIGZyb20gJy4vZW51bXMvdXNlci1wb2xpY2llcy5lbnVtJztcclxuXHJcbi8vIENvbXBvbmVudHNcclxuaW1wb3J0IHsgTW9kYWxXcmFwcGVyQ29tcG9uZW50IH0gZnJvbSAnLi9sYXlvdXRzL21vZGFsLXdyYXBwZXIvbW9kYWwtd3JhcHBlci5jb21wb25lbnQnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3IgICAgOiAnY2FsLWxvZ2luLWZvcm0nLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInt7IGZpeGVkV2lkdGggPyAnbG9naW4td3JhcHBlcicgOiAnJyB9fVwiIGlkPVwiZGVidWctbG9naW4tZm9ybVwiPlxyXG4gIDxtYXQtdGFiLWdyb3VwIGlkPVwiY2FsaWF0eXMtbG9naW4tZm9ybVwiIFtzZWxlY3RlZEluZGV4XT1cInNlbGVjdGVkVGFiXCI+XHJcbiAgICA8bWF0LXRhYiBsYWJlbD1cImxvZ2luLWZvcm1cIj5cclxuICAgICAgPCEtLSBOT1RFOiBMb2dpbiBmb3JtIC0tPlxyXG4gICAgICA8Zm9ybSAobmdTdWJtaXQpPVwib25DbGlja0xvZ2luKClcIiBbZm9ybUdyb3VwXT1cImZvcm1Hcm91cFwiICpuZ0lmPVwiIWdvb2dsZVN0eWxlXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBuby1ndXR0ZXJzXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbm8tZ3V0dGVyc1wiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgIDwhLS0gTk9URTogVXNlcm5hbWUgLS0+XHJcbiAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IG1hdFByZWZpeCBjbGFzcz1cIm1yLTJcIiAqbmdJZj1cImljb25zLmljb25Vc3JPbkxvZ2luRm9ybVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImFsaWduLWJvdHRvbVwiPnBlcnNvbjwvbWF0LWljb24+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8aW5wdXQgbWF0SW5wdXQgZm9ybUNvbnRyb2xOYW1lPVwidXNlcm5hbWVcIiBcclxuICAgICAgICAgICAgICAgICAgICBuYW1lPVwidXNlcm5hbWVcIiBhdXRvY29tcGxldGU9XCJ1c2VybmFtZVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3sgbGFiZWxzLmlucHV0LnVzZXJuYW1lIH19XCIgXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIi8+XHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUudmFsdWU/Lmxlbmd0aCA+IDAgJiYgaW5wdXRzLmNsZWFyVXNyT25Mb2dpbkZvcm1cIiBcclxuICAgICAgICAgICAgICAgICAgICBtYXQtYnV0dG9uIG1hdFN1ZmZpeCBtYXQtaWNvbi1idXR0b24gYXJpYS1sYWJlbD1cIkNsZWFyXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cImZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS5zZXRWYWx1ZSgnJylcIiBcclxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZm9ybVR5cGUgPT09IGZvcm1zLk1GQSAmJiBmb3JtTGF5b3V0cy5tZmEgPT09IGxheW91dHMuSU5MSU5FID8gdHJ1ZSA6IGZhbHNlXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj5jbG9zZTwvbWF0LWljb24+XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICA8IS0tIE5PVEU6IEVycm9yIG1lc3NhZ2UocykgLS0+XHJcbiAgICAgICAgICAgICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuZXJyb3JzPy5yZXF1aXJlZCAmJiBlcnJvcnMubG9naW5cIj5cclxuICAgICAgICAgICAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnJlcXVpcmVkIH19XHJcbiAgICAgICAgICAgICAgICAgIDwvbWF0LWhpbnQ+XHJcbiAgICAgICAgICAgICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuZXJyb3JzPy5wYXR0ZXJuICYmIGVycm9ycy5sb2dpbiAmJiB1c3JQb2xpY3kgPT09IHVzZXJQb2xpY2llcy5FTUFJTFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kuZW1haWwgfX1cclxuICAgICAgICAgICAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgICAgICAgICAgICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS5lcnJvcnM/LnBhdHRlcm4gJiYgZXJyb3JzLmxvZ2luICYmIHVzclBvbGljeSA9PT0gdXNlclBvbGljaWVzLlBIT05FXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5waG9uZSB9fVxyXG4gICAgICAgICAgICAgICAgICA8L21hdC1oaW50PlxyXG4gICAgICAgICAgICAgICAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwiZm9ybUdyb3VwLmNvbnRyb2xzLnVzZXJuYW1lLmVycm9ycz8ucGF0dGVybiAmJiBlcnJvcnMubG9naW4gJiYgdXNyUG9saWN5ICYmIHVzclBvbGljeSAhPT0gdXNlclBvbGljaWVzLkVNQUlMICYmIHVzclBvbGljeSAhPT0gdXNlclBvbGljaWVzLlBIT05FXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5jdXN0b21SZWdleCB9fVxyXG4gICAgICAgICAgICAgICAgICA8L21hdC1oaW50PlxyXG4gICAgICAgICAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbm8tZ3V0dGVyc1wiPlxyXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgICAgICAgICAgIDwhLS0gTk9URTogUGFzc3dvcmQgLS0+XHJcbiAgICAgICAgICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IG1hdFByZWZpeCBjbGFzcz1cIm1yLTJcIiAqbmdJZj1cImljb25zLmljb25Qd2RPbkxvZ2luRm9ybVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImFsaWduLWJvdHRvbVwiPmxvY2s8L21hdC1pY29uPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGlucHV0IG1hdElucHV0IGZvcm1Db250cm9sTmFtZT1cInBhc3N3b3JkXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCIgYXV0b2NvbXBsZXRlPVwicGFzc3dvcmRcIiBcclxuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cInt7IGxhYmVscy5pbnB1dC5wYXNzd29yZCB9fVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ7eyBzaG93UGFzc3dvcmQgPyAndGV4dCcgOiAncGFzc3dvcmQnIH19XCIvPlxyXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwiaW5wdXRzLnNob3dQd2RPbkxvZ2luRm9ybVwiIFxyXG4gICAgICAgICAgICAgICAgICAgIG1hdC1idXR0b24gbWF0U3VmZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiQ2xlYXJcIiBcclxuICAgICAgICAgICAgICAgICAgICBjb2xvcj1cInByaW1hcnlcIiAoY2xpY2spPVwic2hvd1Bhc3N3b3JkPSFzaG93UGFzc3dvcmRcIiBcclxuICAgICAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZm9ybVR5cGUgPT09IGZvcm1zLk1GQSAmJiBmb3JtTGF5b3V0cy5tZmEgPT09IGxheW91dHMuSU5MSU5FID8gdHJ1ZSA6IGZhbHNlXCIgXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbj57eyBzaG93UGFzc3dvcmQgPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknIH19PC9tYXQtaWNvbj5cclxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgIDwhLS0gTk9URTogRXJyb3IgbWVzc2FnZSAtLT5cclxuICAgICAgICAgICAgICAgICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cImZvcm1Hcm91cC5jb250cm9scy5wYXNzd29yZC5lcnJvcnM/LnJlcXVpcmVkICYmIGVycm9ycy5sb2dpblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kucmVxdWlyZWQgfX1cclxuICAgICAgICAgICAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgICAgICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XHJcbiAgICAgICAgICAgICAgPC9kaXY+IFxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPCEtLSBOT1RFOiBCdXR0b25zIC0tPlxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiISggZm9ybVR5cGUgPT09IGZvcm1zLk1GQSAmJiBmb3JtTGF5b3V0cy5tZmEgPT09IGxheW91dHMuSU5MSU5FIClcIj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnMgcGItM1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbCB0ZXh0LWxlZnRcIj5cclxuICAgICAgICAgICAgICAgICAgPCEtLSBUT0RPOiBSZW1lbWJlciBtZSAtLT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPCEtLSBOT1RFOiBGb3Jnb3QgcGFzc3dvcmQgLS0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIHRleHQtcmlnaHRcIiAqbmdJZj1cImJ1dHRvbnMuZm9yZ290UGFzc3dvcmRcIj5cclxuICAgICAgICAgICAgICAgICAgPGEgKGNsaWNrKT1cIm9uQ2xpY2tGb3Jnb3RQYXNzd29yZCgpXCIgaHJlZj1cIiNcIiBjbGFzcz1cInNtYWxsXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge3sgbGFiZWxzLmJ1dHRvbi5mb3Jnb3RQYXNzd29yZCB9fVxyXG4gICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnMgcGItM1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbCB0ZXh0LXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgIDwhLS0gTk9URTogU2lnbiB1cCAtLT5cclxuICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtYnV0dG9uIChjbGljayk9XCJvbkNsaWNrU2lnblVwKClcIiB0eXBlPVwiYnV0dG9uXCIgY29sb3I9XCJwcmltYXJ5XCIgY2xhc3M9XCJzbWFsbCB0ZXh0LXVwcGVyY2FzZSBtci0zXCIgKm5nSWY9XCJidXR0b25zLnNpZ25VcFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5idXR0b24uc2lnblVwIH19XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICA8IS0tIE5PVEU6IFNpZ24gaW4gLS0+XHJcbiAgICAgICAgICAgICAgICAgIDxidXR0b24gbWF0LXJhaXNlZC1idXR0b24gdHlwZT1cInN1Ym1pdFwiIGNvbG9yPVwicHJpbWFyeVwiIFtkaXNhYmxlZF09XCIhZm9ybUdyb3VwLnZhbGlkXCIgY2xhc3M9XCJzbWFsbCB0ZXh0LXVwcGVyY2FzZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHt7IGxhYmVscy5idXR0b24uc2lnbkluIH19XHJcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgICAgPCEtLSBOT1RFOiBMb2dpbiBieSBzdGVwcyBidXR0b25zIC0tPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnMgbWItM1wiICpuZ0lmPVwiZ29vZ2xlU3R5bGVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIHRleHQtcmlnaHRcIiAqbmdJZj1cImJ1dHRvbnMuc2lnblVwXCI+XHJcbiAgICAgICAgICA8IS0tIE5PVEU6IFNpZ24gdXAgLS0+XHJcbiAgICAgICAgICA8YnV0dG9uIG1hdC1idXR0b24gKGNsaWNrKT1cIm9uQ2xpY2tTaWduVXAoKVwiIHR5cGU9XCJidXR0b25cIiBjb2xvcj1cInByaW1hcnlcIiBjbGFzcz1cInNtYWxsIHRleHQtdXBwZXJjYXNlIG1yLTJcIj5cclxuICAgICAgICAgICAge3sgbGFiZWxzLmJ1dHRvbi5zaWduVXAgfX1cclxuICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wge3sgYnV0dG9ucy5zaWduVXAgPyAndGV4dC1sZWZ0JyA6ICd0ZXh0LWNlbnRlcid9fVwiPlxyXG4gICAgICAgICAgPCEtLSBOT1RFOiBTaWduIGluIC0tPlxyXG4gICAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiAoY2xpY2spPVwib25DbGlja05leHRTdGVwKDApXCIgdHlwZT1cImJ1dHRvblwiIGNvbG9yPVwicHJpbWFyeVwiIGNsYXNzPVwic21hbGwgdGV4dC11cHBlcmNhc2UgbWwtMlwiPlxyXG4gICAgICAgICAgICB7eyBsYWJlbHMuYnV0dG9uLnNpZ25JbiB9fVxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8IS0tIE5PVEU6IFNvY2lhbCBidXR0b25zIC0tPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiISggZm9ybVR5cGUgPT09IGZvcm1zLk1GQSAmJiBmb3JtTGF5b3V0cy5tZmEgPT09IGxheW91dHMuSU5MSU5FIClcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgdGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgPCEtLSBOT1RFOiBHb29nbGUgLS0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWJsb2NrIG1iLTNcIiAqbmdJZj1cImJ1dHRvbnMuZ29vZ2xlXCI+XHJcbiAgICAgICAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJtYXQtcmFpc2VkLWJ1dHRvbiBjYWwtYnRuIGdvb2dsZSB7eyB0aGVtZSB9fVwiIChjbGljayk9XCJvbkNsaWNrTG9naW5Tb2NpYWwoJ2dvb2dsZScpXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhbC1iZy1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImFsaWduLW1pZGRsZSBjYWwtaWNvblwiIHN2Z0ljb249XCJnb29nbGVcIj48L21hdC1pY29uPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjYWwtbGFiZWxcIj57eyBsYWJlbHMuYnV0dG9uLmdvb2dsZVNpZ25JbiB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwhLS0gTk9URTogRmFjZWJvb2sgLS0+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWJsb2NrIG1iLTNcIiAqbmdJZj1cImJ1dHRvbnMuZmFjZWJvb2tcIj5cclxuICAgICAgICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNhbC1idG4gZmFjZWJvb2tcIiAoY2xpY2spPVwib25DbGlja0xvZ2luU29jaWFsKCdmYWNlYm9vaycpXCI+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhbC1iZy1pY29uXCI+XHJcbiAgICAgICAgICAgICAgICAgIDxtYXQtaWNvbiBjbGFzcz1cImFsaWduLW1pZGRsZSBjYWwtaWNvblwiIHN2Z0ljb249XCJmYWNlYm9va1wiPjwvbWF0LWljb24+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNhbC1sYWJlbFwiPnt7IGxhYmVscy5idXR0b24uZmFjZWJvb2tTaWduSW4gfX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8IS0tIE5PVEU6IElubGluZSBNRkEgLS0+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBICYmIGZvcm1MYXlvdXRzLm1mYSA9PT0gbGF5b3V0cy5JTkxJTkVcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwicm93IG5vLWd1dHRlcnNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2xcIj5cclxuICAgICAgICAgICAgPGNhbC1tZmEtZm9ybSBcclxuICAgICAgICAgICAgICBbaW5wdXRzXT1cImlucHV0c1wiIFxyXG4gICAgICAgICAgICAgIFtsYWJlbHNdPVwibGFiZWxzXCIgXHJcbiAgICAgICAgICAgICAgW2Vycm9yc109XCJlcnJvcnNcIiBcclxuICAgICAgICAgICAgICAoc2VuZE1mYSk9XCJ0YWJTZW5kTWZhQ29kZSgkZXZlbnQpXCI+XHJcbiAgICAgICAgICAgIDwvY2FsLW1mYS1mb3JtPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPC9tYXQtdGFiPlxyXG4gICAgPG1hdC10YWIgbGFiZWw9XCJ1c3Itc3RlcFwiICpuZ0lmPVwiZ29vZ2xlU3R5bGVcIj5cclxuICAgICAgPCEtLSBOT1RFOiBCYWNrIGJ1dHRvbiAtLT5cclxuICAgICAgPGRpdiBjbGFzcz1cInJvdyBuby1ndXR0ZXJzIG1iLTNcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sXCI+XHJcbiAgICAgICAgICA8YSBocmVmPVwiI1wiIChjbGljayk9XCJvbkNsaWNrUHJldlN0ZXAoMSlcIiB0aXRsZT1cInt7IGxhYmVscy5idXR0b24uYmFjayB9fVwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24gY2xhc3M9XCJhbGlnbi1ib3R0b20gbXItMlwiPmtleWJvYXJkX2Fycm93X2xlZnQ8L21hdC1pY29uPnt7IGxhYmVscy5idXR0b24uYmFjayB9fVxyXG4gICAgICAgICAgPC9hPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGZvcm0gKG5nU3VibWl0KT1cIm9uQ2xpY2tOZXh0U3RlcCgxKVwiIFtmb3JtR3JvdXBdPVwidXNyRm9ybUdyb3VwXCI+XHJcbiAgICAgICAgPCEtLSBOT1RFOiBVc2VybmFtZSAtLT5cclxuICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgICAgICAgPGRpdiBtYXRQcmVmaXggY2xhc3M9XCJtci0yXCIgKm5nSWY9XCJpY29ucy5pY29uVXNyT25Mb2dpbkZvcm1cIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWxpZ24tYm90dG9tXCI+cGVyc29uPC9tYXQtaWNvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGlucHV0IG1hdElucHV0IGZvcm1Db250cm9sTmFtZT1cInVzZXJuYW1lXCIgXHJcbiAgICAgICAgICAgIG5hbWU9XCJ1c2VybmFtZVwiIGF1dG9jb21wbGV0ZT1cInVzZXJuYW1lXCIgXHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwie3sgbGFiZWxzLmlucHV0LnVzZXJuYW1lIH19XCIgXHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCIvPlxyXG4gICAgICAgICAgPGJ1dHRvbiAqbmdJZj1cInVzckZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS52YWx1ZT8ubGVuZ3RoID4gMCAmJiBpbnB1dHMuY2xlYXJVc3JPbkxvZ2luRm9ybVwiIFxyXG4gICAgICAgICAgICBtYXQtYnV0dG9uIG1hdFN1ZmZpeCBtYXQtaWNvbi1idXR0b24gYXJpYS1sYWJlbD1cIkNsZWFyXCIgXHJcbiAgICAgICAgICAgIGNvbG9yPVwicHJpbWFyeVwiIChjbGljayk9XCJ1c3JGb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuc2V0VmFsdWUoJycpXCIgXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBICYmIGZvcm1MYXlvdXRzLm1mYSA9PT0gbGF5b3V0cy5JTkxJTkUgPyB0cnVlIDogZmFsc2VcIiBcclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24+Y2xvc2U8L21hdC1pY29uPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8IS0tIE5PVEU6IEVycm9yIG1lc3NhZ2UocykgLS0+XHJcbiAgICAgICAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwidXNyRm9ybUdyb3VwLmNvbnRyb2xzLnVzZXJuYW1lLmVycm9ycz8ucmVxdWlyZWQgJiYgZXJyb3JzLmxvZ2luXCI+XHJcbiAgICAgICAgICAgIHt7IGxhYmVscy5wb2xpY3kucmVxdWlyZWQgfX1cclxuICAgICAgICAgIDwvbWF0LWhpbnQ+XHJcbiAgICAgICAgICA8bWF0LWhpbnQgYWxpZ249XCJzdGFydFwiICpuZ0lmPVwidXNyRm9ybUdyb3VwLmNvbnRyb2xzLnVzZXJuYW1lLmVycm9ycz8ucGF0dGVybiAmJiBlcnJvcnMubG9naW4gJiYgdXNyUG9saWN5ID09PSB1c2VyUG9saWNpZXMuRU1BSUxcIj5cclxuICAgICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5lbWFpbCB9fVxyXG4gICAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJ1c3JGb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuZXJyb3JzPy5wYXR0ZXJuICYmIGVycm9ycy5sb2dpbiAmJiB1c3JQb2xpY3kgPT09IHVzZXJQb2xpY2llcy5QSE9ORVwiPlxyXG4gICAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LnBob25lIH19XHJcbiAgICAgICAgICA8L21hdC1oaW50PlxyXG4gICAgICAgICAgPG1hdC1oaW50IGFsaWduPVwic3RhcnRcIiAqbmdJZj1cInVzckZvcm1Hcm91cC5jb250cm9scy51c2VybmFtZS5lcnJvcnM/LnBhdHRlcm4gJiYgZXJyb3JzLmxvZ2luICYmIHVzclBvbGljeSAmJiB1c3JQb2xpY3kgIT09IHVzZXJQb2xpY2llcy5FTUFJTCAmJiB1c3JQb2xpY3kgIT09IHVzZXJQb2xpY2llcy5QSE9ORVwiPlxyXG4gICAgICAgICAgICB7eyBsYWJlbHMucG9saWN5LmN1c3RvbVJlZ2V4IH19XHJcbiAgICAgICAgICA8L21hdC1oaW50PlxyXG4gICAgICAgIDwvbWF0LWZvcm0tZmllbGQ+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBuby1ndXR0ZXJzIG1iLTNcIj5cclxuICAgICAgICAgIDwhLS0gTk9URTogRm9yZ290IHBhc3N3b3JkIC0tPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbCB0ZXh0LWxlZnRcIiAqbmdJZj1cImJ1dHRvbnMuZm9yZ290UGFzc3dvcmRcIj5cclxuICAgICAgICAgICAgPGEgKGNsaWNrKT1cIm9uQ2xpY2tGb3Jnb3RQYXNzd29yZCgpXCIgaHJlZj1cIiNcIiBjbGFzcz1cInNtYWxsXCI+XHJcbiAgICAgICAgICAgICAge3sgbGFiZWxzLmJ1dHRvbi5mb3Jnb3RQYXNzd29yZCB9fVxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwhLS0gTk9URTogTmV4dCBidXR0b24gLS0+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sIHRleHQtcmlnaHRcIj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBtYXQtcmFpc2VkLWJ1dHRvbiB0eXBlPVwic3VibWl0XCIgY29sb3I9XCJwcmltYXJ5XCIgW2Rpc2FibGVkXT1cIiF1c3JGb3JtR3JvdXAudmFsaWRcIiBjbGFzcz1cInNtYWxsIHRleHQtdXBwZXJjYXNlXCI+XHJcbiAgICAgICAgICAgICAge3sgbGFiZWxzLmJ1dHRvbi5uZXh0IH19XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgIDwvbWF0LXRhYj5cclxuICAgIDxtYXQtdGFiIGxhYmVsPVwicHdkLXN0ZXBcIiAqbmdJZj1cImdvb2dsZVN0eWxlXCI+XHJcbiAgICAgIDwhLS0gTk9URTogQmFjayBidXR0b24gLS0+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3cgbm8tZ3V0dGVycyBtYi0zXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbFwiPlxyXG4gICAgICAgICAgPGEgaHJlZj1cIiNcIiAoY2xpY2spPVwib25DbGlja1ByZXZTdGVwKDIpXCIgdGl0bGU9XCJ7eyBsYWJlbHMuYnV0dG9uLmJhY2sgfX1cIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWxpZ24tYm90dG9tIG1yLTJcIj5rZXlib2FyZF9hcnJvd19sZWZ0PC9tYXQtaWNvbj57eyBsYWJlbHMuYnV0dG9uLmJhY2sgfX1cclxuICAgICAgICAgIDwvYT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDwhLS0gVE9ETzogVXNlciBpbmZvIC0tPlxyXG4gICAgICA8cD57eyB1c2VySW5mbyB9fTwvcD5cclxuICAgICAgPGZvcm0gKG5nU3VibWl0KT1cIm9uQ2xpY2tOZXh0U3RlcCgyKVwiIFtmb3JtR3JvdXBdPVwicHdkRm9ybUdyb3VwXCI+XHJcbiAgICAgICAgPCEtLSBOT1RFOiBQYXNzd29yZCAtLT5cclxuICAgICAgICA8bWF0LWZvcm0tZmllbGQgY2xhc3M9XCJ3LTEwMFwiPlxyXG4gICAgICAgICAgPGRpdiBtYXRQcmVmaXggY2xhc3M9XCJtci0yXCIgKm5nSWY9XCJpY29ucy5pY29uUHdkT25Mb2dpbkZvcm1cIj5cclxuICAgICAgICAgICAgPG1hdC1pY29uIGNsYXNzPVwiYWxpZ24tYm90dG9tXCI+bG9jazwvbWF0LWljb24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxpbnB1dCBtYXRJbnB1dCBmb3JtQ29udHJvbE5hbWU9XCJwYXNzd29yZFwiIFxyXG4gICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIiBhdXRvY29tcGxldGU9XCJwYXNzd29yZFwiIFxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cInt7IGxhYmVscy5pbnB1dC5wYXNzd29yZCB9fVwiIFxyXG4gICAgICAgICAgICB0eXBlPVwie3sgc2hvd1Bhc3N3b3JkID8gJ3RleHQnIDogJ3Bhc3N3b3JkJyB9fVwiLz5cclxuICAgICAgICAgIDxidXR0b24gKm5nSWY9XCJpbnB1dHMuc2hvd1B3ZE9uTG9naW5Gb3JtXCIgXHJcbiAgICAgICAgICAgIG1hdC1idXR0b24gbWF0U3VmZml4IG1hdC1pY29uLWJ1dHRvbiBhcmlhLWxhYmVsPVwiQ2xlYXJcIiBcclxuICAgICAgICAgICAgY29sb3I9XCJwcmltYXJ5XCIgKGNsaWNrKT1cInNob3dQYXNzd29yZD0hc2hvd1Bhc3N3b3JkXCIgXHJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJmb3JtVHlwZSA9PT0gZm9ybXMuTUZBICYmIGZvcm1MYXlvdXRzLm1mYSA9PT0gbGF5b3V0cy5JTkxJTkUgPyB0cnVlIDogZmFsc2VcIiBcclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiPlxyXG4gICAgICAgICAgICA8bWF0LWljb24+e3sgc2hvd1Bhc3N3b3JkID8gJ3Zpc2liaWxpdHlfb2ZmJyA6ICd2aXNpYmlsaXR5JyB9fTwvbWF0LWljb24+XHJcbiAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwhLS0gTk9URTogRXJyb3IgbWVzc2FnZSAtLT5cclxuICAgICAgICAgIDxtYXQtaGludCBhbGlnbj1cInN0YXJ0XCIgKm5nSWY9XCJwd2RGb3JtR3JvdXAuY29udHJvbHMucGFzc3dvcmQuZXJyb3JzPy5yZXF1aXJlZCAmJiBlcnJvcnMubG9naW5cIj5cclxuICAgICAgICAgICAge3sgbGFiZWxzLnBvbGljeS5yZXF1aXJlZCB9fVxyXG4gICAgICAgICAgPC9tYXQtaGludD5cclxuICAgICAgICA8L21hdC1mb3JtLWZpZWxkPlxyXG4gICAgICAgIDwhLS0gTk9URTogTmV4dCBidXR0b24gLS0+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInJvdyBuby1ndXR0ZXJzIG1iLTNcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wgdGV4dC1yaWdodFwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIG1hdC1yYWlzZWQtYnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjb2xvcj1cInByaW1hcnlcIiBbZGlzYWJsZWRdPVwiIXB3ZEZvcm1Hcm91cC52YWxpZFwiIGNsYXNzPVwic21hbGwgdGV4dC11cHBlcmNhc2VcIj5cclxuICAgICAgICAgICAgICB7eyBsYWJlbHMuYnV0dG9uLm5leHQgfX1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgPC9tYXQtdGFiPlxyXG4gICAgPG1hdC10YWIgbGFiZWw9XCJ0YWItd3JhcHBlclwiICpuZ0lmPVwiKGZvcm1MYXlvdXRzIHwgZXhpc3RzTGF5b3V0OiBsYXlvdXRzLlRBQilcIj5cclxuICAgICAgPCEtLSBOT1RFOiBUYWIgZm9ybSAtLT5cclxuICAgICAgPGNhbC10YWItd3JhcHBlciBcclxuICAgICAgICBbZm9ybVR5cGVdPVwiZm9ybVR5cGVcIiBcclxuICAgICAgICBbaXNGaXJzdF09XCJpc0ZpcnN0XCIgXHJcbiAgICAgICAgW2NvZGVdICAgPVwiY29kZVwiIFxyXG4gICAgICAgIFtxckNvZGVdID1cInFyQ29kZVwiIFxyXG4gICAgICAgIFtwd2RQb2xpY2llc109XCJwd2RQb2xpY2llc1wiIFxyXG4gICAgICAgIFtlcnJvcnNdPVwiZXJyb3JzXCIgXHJcbiAgICAgICAgW2xhYmVsc109XCJsYWJlbHNcIiBcclxuICAgICAgICBbaW5wdXRzXT1cImlucHV0c1wiIFxyXG4gICAgICAgIChzZW5kQ2xvc2VUYWIpPVwib25DbGlja0Nsb3NlVGFiKCRldmVudClcIiBcclxuICAgICAgICAocmVsYXlGaXJzdExvZyk9XCJ0YWJGaXJzdExvZygkZXZlbnQpXCIgXHJcbiAgICAgICAgKHJlbGF5TG9zdFB3ZCk9XCJ0YWJMb3N0UHdkKCRldmVudClcIiBcclxuICAgICAgICAocmVsYXlTYXZlTWZhS2V5KT1cInRhYlNhdmVNZmFLZXkoJGV2ZW50KVwiIFxyXG4gICAgICAgIChyZWxheVNlbmRNZmFDb2RlKT1cInRhYlNlbmRNZmFDb2RlKCRldmVudClcIj5cclxuICAgICAgPC9jYWwtdGFiLXdyYXBwZXI+XHJcbiAgICA8L21hdC10YWI+XHJcbiAgPC9tYXQtdGFiLWdyb3VwPlxyXG48L2Rpdj5gLFxyXG4gIHN0eWxlczogW2AvZGVlcC8gI2NhbGlhdHlzLWxvZ2luLWZvcm0gbWF0LXRhYi1oZWFkZXJ7ZGlzcGxheTpub25lIWltcG9ydGFudH1tYXQtZm9ybS1maWVsZCBtYXQtaWNvbntjb2xvcjpncmV5fS5sb2dpbi13cmFwcGVye3dpZHRoOjEwMCU7bWF4LXdpZHRoOjMzMHB4O3BhZGRpbmc6MTVweDttYXJnaW46MCBhdXRvfS5jYWwtYnRue2xpbmUtaGVpZ2h0OjM1cHg7Ym9yZGVyOjAhaW1wb3J0YW50O3BhZGRpbmc6MXB4IWltcG9ydGFudH0uY2FsLWJ0biAuY2FsLWJnLWljb257cGFkZGluZzo4cHg7d2lkdGg6MzRweDtoZWlnaHQ6MzRweDtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjp0b3AhaW1wb3J0YW50fS5jYWwtYnRuIC5jYWwtYmctaWNvbiAuY2FsLWljb257ZGlzcGxheTppbmxpbmUtYmxvY2s7aGVpZ2h0OjE4cHg7d2lkdGg6MThweDttYXJnaW4tdG9wOi00cHg7dmVydGljYWwtYWxpZ246dG9wIWltcG9ydGFudH0uY2FsLWJ0biAuY2FsLWxhYmVse3BhZGRpbmctcmlnaHQ6OHB4O3BhZGRpbmctbGVmdDoxNnB4O3NpemU6MTRweDtmb250LWZhbWlseTpSb2JvdG8sc2Fucy1zZXJpZn0uYWRue2JhY2tncm91bmQtY29sb3I6I2Q4N2E2OCFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmFkbiBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5hZG46aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZTI5ZTkxIWltcG9ydGFudH0uYml0YnVja2V0e2JhY2tncm91bmQtY29sb3I6IzIwNTA4MSFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmJpdGJ1Y2tldCBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5iaXRidWNrZXQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojMmE2OWFhIWltcG9ydGFudH0uZHJvcGJveHtiYWNrZ3JvdW5kLWNvbG9yOiMxMDg3ZGQhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS5kcm9wYm94IGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmRyb3Bib3g6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojMzA5ZmYwIWltcG9ydGFudH0uZmFjZWJvb2t7YmFja2dyb3VuZC1jb2xvcjojM2I1OTk4IWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0uZmFjZWJvb2sgaXtjb2xvcjojZmZmIWltcG9ydGFudH0uZmFjZWJvb2s6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNGM3MGJhIWltcG9ydGFudH0uZmxpY2tye2JhY2tncm91bmQtY29sb3I6I2ZmMDA4NCFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmZsaWNrciBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5mbGlja3I6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZmYzMzlkIWltcG9ydGFudH0uZm91cnNxdWFyZXtiYWNrZ3JvdW5kLWNvbG9yOiNmOTQ4NzchaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS5mb3Vyc3F1YXJlIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmZvdXJzcXVhcmU6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZmI3OTljIWltcG9ydGFudH0uZ2l0aHVie2JhY2tncm91bmQtY29sb3I6IzQ0NCFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LmdpdGh1YiBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5naXRodWI6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNWU1ZTVlIWltcG9ydGFudH0uaW5zdGFncmFte2JhY2tncm91bmQtY29sb3I6IzQwNWRlNiFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9Lmluc3RhZ3JhbSBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5pbnN0YWdyYW06aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNmQ4M2VjIWltcG9ydGFudH0ubGlua2VkaW57YmFja2dyb3VuZC1jb2xvcjojMDA3YmI2IWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0ubGlua2VkaW4gaXtjb2xvcjojZmZmIWltcG9ydGFudH0ubGlua2VkaW46aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojMDA5ZGU5IWltcG9ydGFudH0ubWljcm9zb2Z0e2JhY2tncm91bmQtY29sb3I6IzI2NzJlYyFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9Lm1pY3Jvc29mdCBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5taWNyb3NvZnQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNTU5MGYwIWltcG9ydGFudH0ud2luZG93c3tiYWNrZ3JvdW5kLWNvbG9yOiMyNjcyZWMhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS53aW5kb3dzIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LndpbmRvd3M6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNTU5MGYwIWltcG9ydGFudH0ub2Rub2tsYXNzbmlraXtiYWNrZ3JvdW5kLWNvbG9yOiNmNDczMWMhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS5vZG5va2xhc3NuaWtpIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9Lm9kbm9rbGFzc25pa2k6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZjY5MTRkIWltcG9ydGFudH0ub3Blbmlke2JhY2tncm91bmQtY29sb3I6I2Y3OTMxZSFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9Lm9wZW5pZCBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5vcGVuaWQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZjlhYjRmIWltcG9ydGFudH0ucGludGVyZXN0e2JhY2tncm91bmQtY29sb3I6I2NiMjAyNyFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LnBpbnRlcmVzdCBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS5waW50ZXJlc3Q6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZTAzZTQ0IWltcG9ydGFudH0ucmVkZGl0e2JhY2tncm91bmQtY29sb3I6I2VmZjdmZiFpbXBvcnRhbnQ7Y29sb3I6IzAwMCFpbXBvcnRhbnR9LnJlZGRpdCBpe2NvbG9yOiMwMDAhaW1wb3J0YW50fS5yZWRkaXQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZmZmIWltcG9ydGFudH0uc291bmRjbG91ZHtiYWNrZ3JvdW5kLWNvbG9yOiNmNTAhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS5zb3VuZGNsb3VkIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LnNvdW5kY2xvdWQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZjczIWltcG9ydGFudH0udHVtYmxye2JhY2tncm91bmQtY29sb3I6IzJjNDc2MiFpbXBvcnRhbnQ7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LnR1bWJsciBpe2NvbG9yOiNmZmYhaW1wb3J0YW50fS50dW1ibHI6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojM2M2MTg1IWltcG9ydGFudH0udHdpdHRlcntiYWNrZ3JvdW5kLWNvbG9yOiM1NWFjZWUhaW1wb3J0YW50O2NvbG9yOiNmZmYhaW1wb3J0YW50fS50d2l0dGVyIGl7Y29sb3I6I2ZmZiFpbXBvcnRhbnR9LnR3aXR0ZXI6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojODNjM2YzIWltcG9ydGFudH0udmltZW97YmFja2dyb3VuZC1jb2xvcjojMWFiN2VhIWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0udmltZW8gaXtjb2xvcjojZmZmIWltcG9ydGFudH0udmltZW86aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNDljNmVlIWltcG9ydGFudH0udmt7YmFja2dyb3VuZC1jb2xvcjojNTg3ZWEzIWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0udmsgaXtjb2xvcjojZmZmIWltcG9ydGFudH0udms6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNzg5N2I2IWltcG9ydGFudH0ueWFob297YmFja2dyb3VuZC1jb2xvcjojNzIwZTllIWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0ueWFob28gaXtjb2xvcjojZmZmIWltcG9ydGFudH0ueWFob286aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojOTQxMmNkIWltcG9ydGFudH0uZ29vZ2xlLmxpZ2h0e2JhY2tncm91bmQtY29sb3I6I2ZmZiFpbXBvcnRhbnQ7Y29sb3I6IzVmNjM2OCFpbXBvcnRhbnR9Lmdvb2dsZS5saWdodCBpe2NvbG9yOiM1ZjYzNjghaW1wb3J0YW50fS5nb29nbGUubGlnaHQ6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZmZmIWltcG9ydGFudH0uZ29vZ2xlLmRhcmt7YmFja2dyb3VuZC1jb2xvcjojNDI4NWY0IWltcG9ydGFudDtjb2xvcjojZmZmIWltcG9ydGFudH0uZ29vZ2xlLmRhcmsgaXtjb2xvcjojZmZmIWltcG9ydGFudH0uZ29vZ2xlLmRhcms6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojNzJhNGY3IWltcG9ydGFudH0uZ29vZ2xlLmRhcmsgLmNhbC1iZy1pY29ue2JhY2tncm91bmQ6I2ZmZn1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9naW5Gb3JtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveVxyXG57XHJcbiAgcHVibGljICAgIGZvcm1MYXlvdXRzICAgIDogYW55O1xyXG4gIHB1YmxpYyAgICB0aGVtZSAgICAgICAgICA6IHN0cmluZztcclxuXHJcbiAgcHVibGljICAgIHVzclBvbGljeSAgICAgIDogc3RyaW5nO1xyXG4gIHB1YmxpYyAgICBwd2RQb2xpY2llcyAgICA6IGFueTtcclxuXHJcbiAgcHVibGljICAgIGljb25zICAgICAgICAgIDogYW55O1xyXG4gIHB1YmxpYyAgICBidXR0b25zICAgICAgICA6IGFueTtcclxuICBwdWJsaWMgICAgaW5wdXRzICAgICAgICAgOiBhbnk7XHJcbiAgcHVibGljICAgIGVycm9ycyAgICAgICAgIDogYW55O1xyXG4gIHB1YmxpYyAgICBsYWJlbHMgICAgICAgICA6IGFueTtcclxuXHJcbiAgLy8gRGlzcGxheSBsb2dpbiBmb3JtIGluc2lkZSBhIGNvbnRhaW5lclxyXG4gIEBJbnB1dCgpICBmaXhlZFdpZHRoICAgICAgICA6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAvLyBEaXNwbGF5IGxvZ2luIGZvcm0gbGlrZSBHb29nbGUgJiBNaWNyb3NvZnQgKHN0ZXAgYnkgc3RlcClcclxuICBASW5wdXQoKSAgZ29vZ2xlU3R5bGUgICAgICAgOiBib29sZWFuID0gZmFsc2U7XHJcbiAgLy8gRGlzcGxheSBHb29nbGUgYnV0dG9uIHdpdGggdGhlIHN1cHBsaWVkIHRoZW1lIDogbGlnaHQgLyBkYXJrXHJcbiAgQElucHV0KCkgIGdvb2dsZVRoZW1lICAgICAgIDogc3RyaW5nICA9IG51bGw7XHJcbiAgLy8gRGlzcGxheSBmb3JtcyBpbnNpZGUgYSBsYXlvdXQgOiB0YWIgKGJ5IGRlZmF1bHQpIC8gbW9kYWwgLyBpbmxpbmVcclxuICAvLyBUaGUgaW5saW5lIGxheW91dCBpcyBvbmx5IGF2YWlsYWJsZSBmb3IgdGhlIE1GQSBmb3JtXHJcbiAgQElucHV0KCkgIGN1c3RvbUZvcm1MYXlvdXRzIDogYW55O1xyXG5cclxuICAvLyBPcHRpb25hbCBwb2xpY3kgYXBwbGllZCBvbiB0aGUgdXNlcm5hbWUgaW5wdXQgOiBlbWFpbCAvIHBob25lIC8gcmVnZXhcclxuICAvLyBCZSBjYXJlZnVsLCB5b3UgbXVzdCBkb3VibGUgYWxsIHRoZSBiYWNrc2xhc2hlcyB1c2VkIGluIHRoZSBzdXBwbGllZCByZWdleFxyXG4gIEBJbnB1dCgpICBjdXN0b21Vc3JQb2xpY3kgICA6IHN0cmluZyA9IG51bGw7XHJcbiAgLy8gUG9saWNpZXMgYXBwbGllZCBvbiB0aGUgcGFzc3dvcmQgaW5wdXRcclxuICBASW5wdXQoKSAgY3VzdG9tUHdkUG9saWNpZXMgOiBhbnk7XHJcblxyXG4gIC8vIERpc2xheSBpY29uIGluc2lkZSBpbnB1dHMgb24gdGhlIGxvZ2luIGZvcm1cclxuICBASW5wdXQoKSAgY3VzdG9tSWNvbnMgICA6IGFueTtcclxuXHJcbiAgLy8gRGlzcGxheSBidXR0b25zIHdpdGggZXZlbnRzXHJcbiAgQElucHV0KCkgIGN1c3RvbUJ1dHRvbnMgOiBhbnk7XHJcblxyXG4gIC8vIERpc3BsYXkgY2xlYXIgJiBzaG93L2hpZGUgYnV0dG9ucyBpbnNpZGUgaW5wdXRzXHJcbiAgQElucHV0KCkgIGN1c3RvbUlucHV0cyAgOiBhbnk7XHJcblxyXG4gIC8vIERpc3BsYXkgZXJyb3IgbWVzc2FnZXNcclxuICBASW5wdXQoKSAgY3VzdG9tRXJyb3JzICA6IGFueTtcclxuXHJcbiAgLy8gTGFiZWxzXHJcbiAgQElucHV0KCkgIGN1c3RvbUxhYmVscyAgOiBhbnk7XHJcblxyXG4gIC8vIEV2ZW50IHRyaWdnZXJlZCBhZnRlciBjcmVhdGluZyB0aGUgbG9naW4gZm9ybSAoQWZ0ZXJWaWV3SW5pdClcclxuICBAT3V0cHV0KCkgaW5pdGlhbGl6ZWQgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8vIEV2ZW50IHRyaWdnZXJlZCBhZnRlciBjbGlja2luZyBvbiB0aGUgc2lnbiB1cCBidXR0b24uXHJcbiAgQE91dHB1dCgpIHNpZ25VcCAgICAgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvLyBFdmVudCBvYmplY3QgY29udGFpbmluZyB1c2VybmFtZSBhbmQgcGFzc3dvcmQgcHJvcGVydGllc1xyXG4gIEBPdXRwdXQoKSBsb2dpbiAgICAgICAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLy8gRXZlbnQgb2JqZWN0IGNvbnRhaW5pbmcgdXNlcm5hbWUsIHBhc3N3b3JkIGFuZCBzb2NpYWwgcHJvcGVydGllc1xyXG4gIEBPdXRwdXQoKSBsb2dpblNvY2lhbCAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLy8gRXZlbnQgb2JqZWN0IGNvbnRhaW5pbmcgdXNlcm5hbWUgcHJvcGVydHlcclxuICBAT3V0cHV0KCkgZm9yZ290UHdkICAgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8vIEV2ZW50IG9iamVjdCBjb250YWluaW5nIHBhc3N3b3JkIGFuZCBjb2RlIHByb3BlcnRpZXNcclxuICBAT3V0cHV0KCkgc2VuZFJlc2V0UHdkICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIC8vIEV2ZW50IG9iamVjdCBjb250YWluaW5nIHBhc3N3b3JkIHByb3BlcnR5XHJcbiAgQE91dHB1dCgpIHNlbmRGaXJzdFB3ZCAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvLyBFdmVudCBvYmplY3QgY29udGFpbmluZyBjb2RlIHByb3BlcnR5XHJcbiAgQE91dHB1dCgpIHNhdmVNZmFLZXkgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvLyBFdmVudCBvYmplY3QgY29udGFpbmluZyBjb2RlIHByb3BlcnR5XHJcbiAgQE91dHB1dCgpIHNlbmRNZmFDb2RlICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvLyBFdmVudCBvYmplY3QgY29udGFpbmluZyB1c2VybmFtZSBwcm9wZXJ0eVxyXG4gIEBPdXRwdXQoKSBzdGVwVXNyICAgICAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLy8gRXZlbnQgb2JqZWN0IGNvbnRhaW5pbmcgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIHByb3BlcnR5XHJcbiAgQE91dHB1dCgpIHN0ZXBQd2QgICAgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgLy8gTk9URTogRm9ybVxyXG4gIHB1YmxpYyAgICBmb3JtR3JvdXAgICAgIDogRm9ybUdyb3VwO1xyXG4gIHB1YmxpYyAgICBzaG93UGFzc3dvcmQgIDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHB1YmxpYyAgICBmb3JtVHlwZSAgICAgIDogc3RyaW5nO1xyXG4gIHB1YmxpYyAgICB1c2VyUG9saWNpZXMgPSBVc2VyUG9saWNpZXM7XHJcbiAgcHVibGljICAgIGZvcm1zID0gRm9ybXM7XHJcblxyXG4gIC8vIE5PVEU6IFBhc3N3b3JkXHJcbiAgcHVibGljICAgIGlzRmlyc3QgICAgICAgOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8vIE5PVEU6IE1GQVxyXG4gIHB1YmxpYyAgICBjb2RlICAgICAgICAgIDogc3RyaW5nICA9IG51bGw7XHJcbiAgcHVibGljICAgIHFyQ29kZSAgICAgICAgOiBzdHJpbmcgID0gbnVsbDtcclxuXHJcbiAgLy8gTk9URTogU3RlcHNcclxuICBwdWJsaWMgICAgdXNyRm9ybUdyb3VwICA6IEZvcm1Hcm91cDtcclxuICBwdWJsaWMgICAgcHdkRm9ybUdyb3VwICA6IEZvcm1Hcm91cDtcclxuICBwdWJsaWMgICAgdXNlckluZm8gICAgICA6IHN0cmluZyAgPSBudWxsO1xyXG4gIHB1YmxpYyAgICB1c2VySW1hZ2UgICAgIDogc3RyaW5nICA9IG51bGw7XHJcblxyXG4gIC8vIE5PVEU6IFdyYXBwZXJcclxuICBwdWJsaWMgICAgbGF5b3V0cyA9IExheW91dHM7XHJcbiAgcHVibGljICAgIHNlbGVjdGVkVGFiICAgICA6IG51bWJlciA9IDA7XHJcbiAgcHVibGljICAgIGNsb3NlTW9kYWxFdmVudCA6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuXHJcbiAgcHJpdmF0ZSAgIG1vZGFsRmlyc3RTdWIgICAgICAgOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSAgIG1vZGFsTG9zdFN1YiAgICAgICAgOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSAgIG1vZGFsU2F2ZU1mYUtleVN1YiAgOiBTdWJzY3JpcHRpb247XHJcbiAgcHJpdmF0ZSAgIG1vZGFsU2VuZE1mYUNvZGVTdWIgOiBTdWJzY3JpcHRpb247XHJcblxyXG4gIC8vIFRPRE86IENhcHRjaGFcclxuICAvLyBASW5wdXQoKSAgcmVtZW1iZXJNZSAgICA6IGJvb2xlYW4gPSB0cnVlOyAvLyBUT0RPOiBjaGVjayBib3hcclxuXHJcbiAgY29uc3RydWN0b3JcclxuICAoXHJcbiAgICBwdWJsaWMgIGRpYWxvZyAgICAgICA6IE1hdERpYWxvZyxcclxuICAgIHB1YmxpYyAgc2FuaXRpemVyICAgIDogRG9tU2FuaXRpemVyLFxyXG4gICAgcHVibGljICBpY29uUmVnaXN0cnkgOiBNYXRJY29uUmVnaXN0cnksXHJcbiAgICBwcml2YXRlIGJ1aWxkZXIgICAgICA6IEZvcm1CdWlsZGVyXHJcbiAgKVxyXG4gIHtcclxuICAgIC8vIFNvY2lhbCBpY29uc1xyXG4gICAgLy8gVE9ETzogRml4IEFuZ3VsYXIgNiBMaWJyYXJ5IGFzc2V0cyA6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXItY2xpL2lzc3Vlcy8xMTA3MVxyXG4gICAgaWNvblJlZ2lzdHJ5LmFkZFN2Z0ljb24oJ2dvb2dsZScsICAgc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCgnLi4vYXNzZXRzL2ltZy9nb29nbGUuc3ZnJykpO1xyXG4gICAgaWNvblJlZ2lzdHJ5LmFkZFN2Z0ljb24oJ2ZhY2Vib29rJywgc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCgnLi4vYXNzZXRzL2ltZy9mYWNlYm9vay5zdmcnKSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkluaXQoKSA6IHZvaWRcclxuICB7XHJcbiAgICAvLyBMb2dpbiBmb3JtXHJcbiAgICB0aGlzLmluaXRGb3JtR3JvdXBzKCk7XHJcbiAgICAvLyBTdHlsZSAoY29udGFpbmVyLCBzdGVwLCB0aGVtZSAmIGxheW91dClcclxuICAgIHRoaXMuaW5pdEZvcm1MYXlvdXRzKCk7XHJcbiAgICB0aGlzLmluaXRUaGVtZSgpO1xyXG5cclxuICAgIHRoaXMuaW5pdFBvbGljaWVzKCk7XHJcbiAgICB0aGlzLmluaXRJY29ucygpO1xyXG4gICAgdGhpcy5pbml0QnV0dG9ucygpO1xyXG4gICAgdGhpcy5pbml0SW5wdXRzKCk7XHJcbiAgICB0aGlzLmluaXRFcnJvcnMoKTtcclxuICAgIHRoaXMuaW5pdExhYmVscygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZWQuZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25DaGFuZ2VzKGNoYW5nZXMgOiBTaW1wbGVDaGFuZ2VzKSA6IHZvaWRcclxuICB7XHJcbiAgICBpZihjaGFuZ2VzLmdvb2dsZVN0eWxlKVxyXG4gICAgICB0aGlzLmluaXRGb3JtR3JvdXBzKCk7XHJcbiAgICBpZihjaGFuZ2VzLmN1c3RvbUZvcm1MYXlvdXRzKVxyXG4gICAgICB0aGlzLmluaXRGb3JtTGF5b3V0cygpO1xyXG4gICAgaWYoY2hhbmdlcy5nb29nbGVUaGVtZSlcclxuICAgICAgdGhpcy5pbml0VGhlbWUoKTtcclxuXHJcbiAgICBpZihjaGFuZ2VzLmN1c3RvbVB3ZFBvbGljaWVzIHx8IGNoYW5nZXMuY3VzdG9tVXNyUG9saWN5KVxyXG4gICAgICB0aGlzLmluaXRQb2xpY2llcygpO1xyXG4gICAgaWYoY2hhbmdlcy5jdXN0b21JY29ucylcclxuICAgICAgdGhpcy5pbml0SWNvbnMoKTtcclxuICAgIGlmKGNoYW5nZXMuY3VzdG9tQnV0dG9ucylcclxuICAgICAgdGhpcy5pbml0QnV0dG9ucygpO1xyXG4gICAgaWYoY2hhbmdlcy5jdXN0b21JbnB1dHMpXHJcbiAgICAgIHRoaXMuaW5pdElucHV0cygpO1xyXG4gICAgaWYoY2hhbmdlcy5jdXN0b21FcnJvcnMpXHJcbiAgICAgIHRoaXMuaW5pdEVycm9ycygpO1xyXG4gICAgaWYoY2hhbmdlcy5jdXN0b21MYWJlbHMpXHJcbiAgICAgIHRoaXMuaW5pdExhYmVscygpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCkgOiB2b2lkXHJcbiAge1xyXG4gICAgaWYodGhpcy5tb2RhbEZpcnN0U3ViKVxyXG4gICAgICB0aGlzLm1vZGFsRmlyc3RTdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIGlmKHRoaXMubW9kYWxMb3N0U3ViKVxyXG4gICAgICB0aGlzLm1vZGFsTG9zdFN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgaWYodGhpcy5tb2RhbFNhdmVNZmFLZXlTdWIpXHJcbiAgICAgIHRoaXMubW9kYWxTYXZlTWZhS2V5U3ViLnVuc3Vic2NyaWJlKCk7XHJcbiAgICBpZih0aGlzLm1vZGFsU2VuZE1mYUNvZGVTdWIpXHJcbiAgICAgIHRoaXMubW9kYWxTZW5kTWZhQ29kZVN1Yi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5PVEU6IEV2ZW50IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8vIE5PVEU6IEZyb20gY29tcG9uZW50IHRvIHVzZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgLyoqIEVtaXQgYCRldmVudGAgb2JqZWN0IGNvbnRhaW5pbmcgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIHByb3BlcnRpZXMuXHJcbiAgKlxyXG4gICogQGV4YW1wbGVcclxuICAqIHZhciB1c2VybmFtZSA6IHN0cmluZyA9ICRldmVudC51c2VybmFtZTtcclxuICAqIHZhciBwYXNzd29yZCA6IHN0cmluZyA9ICRldmVudC5wYXNzd29yZDtcclxuICAqL1xyXG4gIHB1YmxpYyBvbkNsaWNrTG9naW4oKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZXZlbnQgOiBhbnkgPSB7fTtcclxuICAgIGV2ZW50ID0gdGhpcy5nZXRFdmVudFJlc3BvbnNlKCk7XHJcbiAgICB0aGlzLmxvZ2luLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEVtaXQgYCRldmVudGAgb2JqZWN0IGNvbnRhaW5pbmcgdXNlcm5hbWUsIHBhc3N3b3JkIGFuZCBzb2NpYWwgcHJvcGVydGllcy5cclxuICAqXHJcbiAgKiBAcGFyYW0gc29jaWFsIE5hbWUgb2YgdGhlIHNvY2lhbCBwcm92aWRlclxyXG4gICogQGV4YW1wbGVcclxuICAqIHZhciB1c2VybmFtZSA6IHN0cmluZyA9ICRldmVudC51c2VybmFtZTtcclxuICAqIHZhciBwYXNzd29yZCA6IHN0cmluZyA9ICRldmVudC5wYXNzd29yZDtcclxuICAqIHZhciBzb2NpYWwgICA6IHN0cmluZyA9ICRldmVudC5zb2NpYWw7XHJcbiAgKi9cclxuICBwdWJsaWMgb25DbGlja0xvZ2luU29jaWFsKHNvY2lhbCA6IHN0cmluZykgOiB2b2lkXHJcbiAge1xyXG4gICAgbGV0IGV2ZW50IDogYW55ID0ge307XHJcbiAgICBldmVudCA9IHRoaXMuZ2V0RXZlbnRSZXNwb25zZSgpO1xyXG4gICAgZXZlbnQuc29jaWFsID0gc29jaWFsO1xyXG4gICAgdGhpcy5sb2dpblNvY2lhbC5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8qKiBFbWl0IGEgY2xpY2sgZXZlbnQgb24gdGhlIHNpZ24gdXAgYnV0dG9uLiAqL1xyXG4gIHB1YmxpYyBvbkNsaWNrU2lnblVwKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zaWduVXAuZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEVtaXQgYCRldmVudGAgb2JqZWN0IGNvbnRhaW5pbmcgdXNlcm5hbWUgcHJvcGVydHkuXHJcbiAgKlxyXG4gICogQGV4YW1wbGVcclxuICAqIHZhciB1c2VybmFtZSA6IHN0cmluZyA9ICRldmVudC51c2VybmFtZTtcclxuICAqL1xyXG4gIHB1YmxpYyBvbkNsaWNrRm9yZ290UGFzc3dvcmQoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZXZlbnQgOiBhbnkgPSB7fTtcclxuICAgIGV2ZW50ID0gdGhpcy5nZXRFdmVudFJlc3BvbnNlKCd1c3InKTtcclxuICAgIHRoaXMuZm9yZ290UHdkLmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLy8gTk9URTogRnJvbSB1c2VyIHRvIGNvbXBvbmVudCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKiogU2hvdyBwYXNzd29yZCBmb3JtIGVpdGhlciB0byBpbml0aWFsaXplIGZpcnN0IHBhc3N3b3JkIG9yIHRvIHJlc2V0IGZvcmdvdCBwYXNzd29yZC5cclxuICAqXHJcbiAgKiBAcGFyYW0gaXNGaXJzdCBJbml0aWFsaXplIGZpcnN0IHBhc3N3b3JkIG9yIHJlc2V0IGZvcmdvdCBwYXNzd29yZFxyXG4gICovXHJcbiAgcHVibGljIHNob3dQd2RGb3JtKGlzRmlyc3QgOiBib29sZWFuKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmlzRmlyc3QgID0gaXNGaXJzdDtcclxuICAgIHRoaXMuZm9ybVR5cGUgPSBGb3Jtcy5QV0Q7XHJcbiAgICB0aGlzLnNob3dMYXlvdXQodGhpcy5mb3JtTGF5b3V0cy5wd2QpO1xyXG4gIH1cclxuXHJcbiAgLyoqIFNob3cgTUZBIHNldHVwIGZvcm0gdG8gaW5pdGlhbGl6ZSBmaXJzdCBUT1RQIChUaW1lLWJhc2VkIE9uZS10aW1lIFBhc3N3b3JkKS5cclxuICAqXHJcbiAgKiBAcGFyYW0gY29kZSAgIFxyXG4gICogQHBhcmFtIHFyQ29kZSBcclxuICAqL1xyXG4gIHB1YmxpYyBzaG93TWZhU2V0dXBGb3JtKGNvZGUgOiBzdHJpbmcsIHFyQ29kZSA6IHN0cmluZykgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5jb2RlICAgICA9IGNvZGU7XHJcbiAgICB0aGlzLnFyQ29kZSAgID0gcXJDb2RlO1xyXG4gICAgdGhpcy5mb3JtVHlwZSA9IEZvcm1zLk1GQV9TRVRVUDtcclxuICAgIHRoaXMuc2hvd0xheW91dCh0aGlzLmZvcm1MYXlvdXRzLm1mYVNldHVwKTtcclxuICB9XHJcblxyXG4gIC8qKiBTaG93IE1GQSBmb3JtIHRvIGdldCB2ZXJpZmljYXRpb24gY29kZS4gKi9cclxuICBwdWJsaWMgc2hvd01mYUZvcm0oKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmZvcm1UeXBlID0gRm9ybXMuTUZBO1xyXG4gICAgdGhpcy5zaG93TGF5b3V0KHRoaXMuZm9ybUxheW91dHMubWZhKTtcclxuICB9XHJcblxyXG4gIC8qKiBIaWRlIHBhc3N3b3JkIGZvcm0uICovXHJcbiAgcHVibGljIGhpZGVQd2RGb3JtKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5jbG9zZUxheW91dCh0aGlzLmZvcm1MYXlvdXRzLnBhc3N3b3JkKTtcclxuICB9XHJcblxyXG4gIC8qKiBIaWRlIE1GQSBzZXR1cCBmb3JtLiAqL1xyXG4gIHB1YmxpYyBoaWRlTWZhU2V0dXBGb3JtKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5jbG9zZUxheW91dCh0aGlzLmZvcm1MYXlvdXRzLm1mYVNldHVwKTtcclxuICB9XHJcblxyXG4gIC8qKiBIaWRlIE1GQSBmb3JtLiAqL1xyXG4gIHB1YmxpYyBoaWRlTWZhRm9ybSgpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuY2xvc2VMYXlvdXQodGhpcy5mb3JtTGF5b3V0cy5tZmEpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEdvIHBhc3N3b3JkIHN0ZXAuICovXHJcbiAgcHVibGljIHNob3dQd2RTdGVwKHVzZXJJbmZvIDogc3RyaW5nID0gbnVsbCwgdXNlckltYWdlIDogc3RyaW5nID0gbnVsbCkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy51c2VySW5mbyAgICA9IHVzZXJJbmZvO1xyXG4gICAgdGhpcy51c2VySW1hZ2UgICA9IHVzZXJJbWFnZTtcclxuICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSAyO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5PVEU6IFN0ZXBzIGV2ZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIHB1YmxpYyBvbkNsaWNrTmV4dFN0ZXAoY3VycmVudFN0ZXAgOiBudW1iZXIpIDogdm9pZFxyXG4gIHtcclxuICAgIHN3aXRjaChjdXJyZW50U3RlcClcclxuICAgIHtcclxuICAgICAgY2FzZSAwIDpcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxIDogLy8gVXNlcm5hbWVcclxuICAgICAgICBsZXQgZXZlbnRVc3IgOiBhbnkgPSBudWxsO1xyXG4gICAgICAgIGV2ZW50VXNyID0gdGhpcy5nZXRFdmVudFJlc3BvbnNlKCd1c3InKTtcclxuICAgICAgICB0aGlzLnN0ZXBVc3IuZW1pdChldmVudFVzcik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgMiA6IC8vIFBhc3N3b3JkXHJcbiAgICAgICAgbGV0IGV2ZW50UHdkIDogYW55ID0gbnVsbDtcclxuICAgICAgICBldmVudFB3ZCA9IHRoaXMuZ2V0RXZlbnRSZXNwb25zZSgpO1xyXG4gICAgICAgIHRoaXMuc3RlcFB3ZC5lbWl0KGV2ZW50UHdkKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkNsaWNrUHJldlN0ZXAoY3VycmVudFN0ZXAgOiBudW1iZXIpIDogdm9pZFxyXG4gIHtcclxuICAgIHN3aXRjaChjdXJyZW50U3RlcClcclxuICAgIHtcclxuICAgICAgY2FzZSAwIDpcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAxIDogLy8gVXNlcm5hbWVcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gMDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAyIDogLy8gUGFzc3dvcmRcclxuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBOT1RFOiBUYWIgZXZlbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICAvKiogRW1pdCBgJGV2ZW50YCBvYmplY3QgY29udGFpbmluZyBwYXNzd29yZCBwcm9wZXJ0eS5cclxuICAqXHJcbiAgKiBAZXhhbXBsZVxyXG4gICogdmFyIG5ld1Bhc3N3b3JkIDogc3RyaW5nID0gJGV2ZW50LnBhc3N3b3JkO1xyXG4gICovXHJcbiAgcHVibGljIHRhYkZpcnN0TG9nKCRldmVudCA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5zZW5kRmlyc3RQd2QuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEVtaXQgYCRldmVudGAgb2JqZWN0IGNvbnRhaW5pbmcgcGFzc3dvcmQgYW5kIGNvZGUgcHJvcGVydGllcy5cclxuICAqXHJcbiAgKiBAZXhhbXBsZVxyXG4gICogdmFyIG5ld1Bhc3N3b3JkICAgICAgOiBzdHJpbmcgPSAkZXZlbnQucGFzc3dvcmQ7XHJcbiAgKiB2YXIgdmVyaWZpY2F0aW9uQ29kZSA6IHN0cmluZyA9ICRldmVudC5jb2RlO1xyXG4gICovXHJcbiAgcHVibGljIHRhYkxvc3RQd2QoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnNlbmRSZXNldFB3ZC5lbWl0KCRldmVudCk7XHJcbiAgfVxyXG5cclxuICAvKiogRW1pdCBgJGV2ZW50YCBvYmplY3QgY29udGFpbmluZyBjb2RlIHByb3BlcnR5LlxyXG4gICpcclxuICAqIEBleGFtcGxlXHJcbiAgKiB2YXIgdmVyaWZpY2F0aW9uQ29kZSA6IHN0cmluZyA9ICRldmVudC5jb2RlO1xyXG4gICovXHJcbiAgcHVibGljIHRhYlNhdmVNZmFLZXkoJGV2ZW50IDogYW55KSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnNhdmVNZmFLZXkuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLyoqIEVtaXQgYCRldmVudGAgb2JqZWN0IGNvbnRhaW5pbmcgY29kZSBwcm9wZXJ0eS5cclxuICAqXHJcbiAgKiBAZXhhbXBsZVxyXG4gICogdmFyIHZlcmlmaWNhdGlvbkNvZGUgOiBzdHJpbmcgPSAkZXZlbnQuY29kZTtcclxuICAqL1xyXG4gIHB1YmxpYyB0YWJTZW5kTWZhQ29kZSgkZXZlbnQgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuc2VuZE1mYUNvZGUuZW1pdCgkZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5PVEU6IE1vZGFsIGV2ZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIC8qKiBFbWl0IGAkZXZlbnRgIG9iamVjdCBjb250YWluaW5nIHBhc3N3b3JkIHByb3BlcnR5LlxyXG4gICpcclxuICAqIEBleGFtcGxlXHJcbiAgKiB2YXIgbmV3UGFzc3dvcmQgOiBzdHJpbmcgPSAkZXZlbnQucGFzc3dvcmQ7XHJcbiAgKi9cclxuICBwdWJsaWMgbW9kYWxGaXJzdExvZyhkaWFsb2dSZWYgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMubW9kYWxGaXJzdFN1YiA9IGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5yZWxheUZpcnN0TG9nLnN1YnNjcmliZSgoZXZlbnQpID0+XHJcbiAgICB7XHJcbiAgICAgIHRoaXMuc2VuZEZpcnN0UHdkLmVtaXQoZXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogRW1pdCBgJGV2ZW50YCBvYmplY3QgY29udGFpbmluZyBwYXNzd29yZCBhbmQgY29kZSBwcm9wZXJ0aWVzLlxyXG4gICpcclxuICAqIEBleGFtcGxlXHJcbiAgKiB2YXIgbmV3UGFzc3dvcmQgICAgICA6IHN0cmluZyA9ICRldmVudC5wYXNzd29yZDtcclxuICAqIHZhciB2ZXJpZmljYXRpb25Db2RlIDogc3RyaW5nID0gJGV2ZW50LmNvZGU7XHJcbiAgKi9cclxuICBwdWJsaWMgbW9kYWxMb3N0UHdkKGRpYWxvZ1JlZiA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5tb2RhbExvc3RTdWIgPSBkaWFsb2dSZWYuY29tcG9uZW50SW5zdGFuY2UucmVsYXlMb3N0UHdkLnN1YnNjcmliZSgoZXZlbnQpID0+XHJcbiAgICB7XHJcbiAgICAgIHRoaXMuc2VuZFJlc2V0UHdkLmVtaXQoZXZlbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogRW1pdCBgJGV2ZW50YCBvYmplY3QgY29udGFpbmluZyBjb2RlIHByb3BlcnR5LlxyXG4gICpcclxuICAqIEBleGFtcGxlXHJcbiAgKiB2YXIgdmVyaWZpY2F0aW9uQ29kZSA6IHN0cmluZyA9ICRldmVudC5jb2RlO1xyXG4gICovXHJcbiAgcHVibGljIG1vZGFsU2F2ZU1mYUtleShkaWFsb2dSZWYgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMubW9kYWxTYXZlTWZhS2V5U3ViID0gZGlhbG9nUmVmLmNvbXBvbmVudEluc3RhbmNlLnJlbGF5U2F2ZU1mYUtleS5zdWJzY3JpYmUoKGV2ZW50KSA9PlxyXG4gICAge1xyXG4gICAgICB0aGlzLnNhdmVNZmFLZXkuZW1pdChldmVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKiBFbWl0IGAkZXZlbnRgIG9iamVjdCBjb250YWluaW5nIGNvZGUgcHJvcGVydHkuXHJcbiAgKlxyXG4gICogQGV4YW1wbGVcclxuICAqIHZhciB2ZXJpZmljYXRpb25Db2RlIDogc3RyaW5nID0gJGV2ZW50LmNvZGU7XHJcbiAgKi9cclxuICBwdWJsaWMgbW9kYWxTZW5kTWZhQ29kZShkaWFsb2dSZWYgOiBhbnkpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMubW9kYWxTZW5kTWZhQ29kZVN1YiA9IGRpYWxvZ1JlZi5jb21wb25lbnRJbnN0YW5jZS5yZWxheVNlbmRNZmFDb2RlLnN1YnNjcmliZSgoZXZlbnQpID0+XHJcbiAgICB7XHJcbiAgICAgIHRoaXMuc2VuZE1mYUNvZGUuZW1pdChldmVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyBOT1RFOiBUYWIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuICBwdWJsaWMgb25DbGlja0Nsb3NlVGFiKCRldmVudCA6IGFueSkgOiB2b2lkXHJcbiAge1xyXG4gICAgdGhpcy5jbG9zZVRhYigpO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5PVEU6IE1vZGFsIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIHByaXZhdGUgb3Blbk1vZGFsKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgbGV0IHBhcmFtcyA6IGFueSA9IHtcclxuICAgICAgLy8gQ29tbW9uXHJcbiAgICAgIGZvcm1UeXBlICAgICAgICAgICAgICA6IHRoaXMuZm9ybVR5cGUsXHJcbiAgICAgIGxhYmVscyAgICAgICAgICAgICAgICA6IHRoaXMubGFiZWxzLFxyXG4gICAgICBjbG9zZUV2ZW50ICAgICAgICAgICAgOiB0aGlzLmNsb3NlTW9kYWxFdmVudCxcclxuICAgICAgZXJyb3JzICAgICAgICAgICAgICAgIDogdGhpcy5lcnJvcnMsXHJcbiAgICAgIGlucHV0cyAgICAgICAgICAgICAgICA6IHRoaXMuaW5wdXRzLFxyXG4gICAgICAvLyBQYXNzd29yZCBmb3JtXHJcbiAgICAgIGlzRmlyc3QgICAgICAgICAgICAgICA6IHRoaXMuaXNGaXJzdCxcclxuICAgICAgcHdkUG9saWNpZXMgICAgICAgICAgIDogdGhpcy5wd2RQb2xpY2llcyxcclxuICAgICAgLy8gTWZhIGZvcm1cclxuICAgICAgY29kZSAgICAgICAgICAgICAgICAgIDogdGhpcy5jb2RlLFxyXG4gICAgICBxckNvZGUgICAgICAgICAgICAgICAgOiB0aGlzLnFyQ29kZVxyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihNb2RhbFdyYXBwZXJDb21wb25lbnQsIHsgZGF0YSA6IHBhcmFtcyB9KTtcclxuXHJcbiAgICBpZih0aGlzLmZvcm1UeXBlID09PSBGb3Jtcy5QV0QpXHJcbiAgICB7XHJcbiAgICAgIHRoaXMubW9kYWxGaXJzdExvZyhkaWFsb2dSZWYpO1xyXG4gICAgICB0aGlzLm1vZGFsTG9zdFB3ZChkaWFsb2dSZWYpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHRoaXMuZm9ybVR5cGUgPT09IEZvcm1zLk1GQV9TRVRVUClcclxuICAgICAgdGhpcy5tb2RhbFNhdmVNZmFLZXkoZGlhbG9nUmVmKTtcclxuXHJcbiAgICBpZih0aGlzLmZvcm1UeXBlID09PSBGb3Jtcy5NRkEpXHJcbiAgICAgIHRoaXMubW9kYWxTZW5kTWZhQ29kZShkaWFsb2dSZWYpO1xyXG5cclxuICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZShyZXN1bHQgPT5cclxuICAgIHtcclxuICAgICAgdGhpcy5mb3JtVHlwZSA9IG51bGw7XHJcbiAgICAgIGlmKHJlc3VsdClcclxuICAgICAgICB0aGlzLmZvcm1Hcm91cC5jb250cm9scy5wYXNzd29yZC5zZXRWYWx1ZShyZXN1bHQpOyAvLyBTZXQgcGFzc3dvcmRcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIE5PVEU6IFByaXZhdGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4gIHByaXZhdGUgc2hvd0xheW91dChmb3JtTGF5b3V0IDogc3RyaW5nKSA6IHZvaWRcclxuICB7XHJcbiAgICBzd2l0Y2goZm9ybUxheW91dClcclxuICAgIHtcclxuICAgICAgY2FzZSBMYXlvdXRzLlRBQiAgICA6XHJcbiAgICAgICAgdGhpcy5vcGVuVGFiKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgTGF5b3V0cy5NT0RBTCAgOlxyXG4gICAgICAgIHRoaXMub3Blbk1vZGFsKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgTGF5b3V0cy5JTkxJTkUgOlxyXG4gICAgICAgIHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzLnVzZXJuYW1lLmRpc2FibGUoKTtcclxuICAgICAgICB0aGlzLmZvcm1Hcm91cC5jb250cm9scy5wYXNzd29yZC5kaXNhYmxlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgIHRoaXMub3BlblRhYigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbG9zZUxheW91dChmb3JtTGF5b3V0IDogc3RyaW5nKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLmZvcm1UeXBlID0gbnVsbDtcclxuXHJcbiAgICBzd2l0Y2goZm9ybUxheW91dClcclxuICAgIHtcclxuICAgICAgY2FzZSBMYXlvdXRzLlRBQiAgICA6XHJcbiAgICAgICAgdGhpcy5jbG9zZVRhYigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIExheW91dHMuTU9EQUwgIDpcclxuICAgICAgICB0aGlzLmNsb3NlTW9kYWwoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBMYXlvdXRzLklOTElORSA6XHJcbiAgICAgICAgdGhpcy5mb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuZW5hYmxlKCk7XHJcbiAgICAgICAgdGhpcy5mb3JtR3JvdXAuY29udHJvbHMucGFzc3dvcmQuZW5hYmxlKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQgOlxyXG4gICAgICAgIHRoaXMuY2xvc2VUYWIoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xvc2VNb2RhbCgpIDogdm9pZFxyXG4gIHtcclxuICAgIHRoaXMuY2xvc2VNb2RhbEV2ZW50LmVtaXQoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb3BlblRhYigpIDogdm9pZFxyXG4gIHtcclxuICAgIGlmKHRoaXMuZ29vZ2xlU3R5bGUpXHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSAzO1xyXG4gICAgZWxzZVxyXG4gICAgICB0aGlzLnNlbGVjdGVkVGFiID0gMTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xvc2VUYWIoKSA6IHZvaWRcclxuICB7XHJcbiAgICB0aGlzLnNlbGVjdGVkVGFiID0gMDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0RXZlbnRSZXNwb25zZShvbmx5T25lIDogc3RyaW5nID0gbnVsbCkgOiBhbnlcclxuICB7XHJcbiAgICBsZXQgZXZlbnQgICAgOiBhbnkgICAgPSB7fTtcclxuICAgIGxldCB1c2VybmFtZSA6IHN0cmluZyA9IG51bGw7XHJcbiAgICBsZXQgcGFzc3dvcmQgOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIGlmKHRoaXMuZ29vZ2xlU3R5bGUpXHJcbiAgICB7XHJcbiAgICAgIHVzZXJuYW1lID0gdGhpcy51c3JGb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUudmFsdWU7XHJcbiAgICAgIHBhc3N3b3JkID0gdGhpcy5wd2RGb3JtR3JvdXAuY29udHJvbHMucGFzc3dvcmQudmFsdWU7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgIHVzZXJuYW1lID0gdGhpcy5mb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUudmFsdWU7XHJcbiAgICAgIHBhc3N3b3JkID0gdGhpcy5mb3JtR3JvdXAuY29udHJvbHMucGFzc3dvcmQudmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoIW9ubHlPbmUpXHJcbiAgICB7XHJcbiAgICAgIGV2ZW50LnVzZXJuYW1lID0gdXNlcm5hbWU7XHJcbiAgICAgIGV2ZW50LnBhc3N3b3JkID0gcGFzc3dvcmQ7XHJcbiAgICB9XHJcbiAgICBpZihvbmx5T25lICYmIG9ubHlPbmUgPT09ICd1c3InKVxyXG4gICAgICBldmVudC51c2VybmFtZSA9IHVzZXJuYW1lO1xyXG4gICAgaWYob25seU9uZSAmJiBvbmx5T25lID09PSAncHdkJylcclxuICAgICAgZXZlbnQucGFzc3dvcmQgPSBwYXNzd29yZDtcclxuXHJcbiAgICByZXR1cm4gZXZlbnQ7XHJcbiAgfVxyXG5cclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgLy8gTk9URTogSW5pdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbiAgcHJpdmF0ZSBpbml0Rm9ybUxheW91dHMoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZGVmYXVsdEZvcm1MYXlvdXRzIDogYW55ID0gbnVsbDtcclxuICAgIGxldCBmb3JtTGF5b3V0cyAgICAgICAgOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIC8vIEZvcm0gbGF5b3V0c1xyXG4gICAgZGVmYXVsdEZvcm1MYXlvdXRzID0ge1xyXG4gICAgICBwd2QgICAgICA6IExheW91dHMuVEFCLFxyXG4gICAgICBtZmFTZXR1cCA6IExheW91dHMuVEFCLFxyXG4gICAgICBtZmEgICAgICA6IExheW91dHMuVEFCLFxyXG4gICAgfTtcclxuXHJcbiAgICBmb3JtTGF5b3V0cyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdEZvcm1MYXlvdXRzLCB0aGlzLmN1c3RvbUZvcm1MYXlvdXRzKTtcclxuXHJcbiAgICAvLyBDb3JyZWN0aW9uc1xyXG4gICAgaWYoZm9ybUxheW91dHMucHdkID09PSBMYXlvdXRzLklOTElORSlcclxuICAgICAgZm9ybUxheW91dHMucHdkID0gTGF5b3V0cy5UQUI7XHJcbiAgICBpZihmb3JtTGF5b3V0cy5tZmFTZXR1cCA9PT0gTGF5b3V0cy5JTkxJTkUpXHJcbiAgICAgIGZvcm1MYXlvdXRzLm1mYVNldHVwID0gTGF5b3V0cy5UQUI7XHJcbiAgICBpZih0aGlzLmdvb2dsZVN0eWxlICYmIGZvcm1MYXlvdXRzLm1mYSA9PT0gTGF5b3V0cy5JTkxJTkUpXHJcbiAgICAgIGZvcm1MYXlvdXRzLm1mYSA9IExheW91dHMuVEFCO1xyXG5cclxuICAgIHRoaXMuZm9ybUxheW91dHMgPSBmb3JtTGF5b3V0cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFRoZW1lKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgbGV0IHRoZW1lIDogc3RyaW5nID0gbnVsbDtcclxuXHJcbiAgICAvLyBUaGVtZVxyXG4gICAgc3dpdGNoKHRoaXMuZ29vZ2xlVGhlbWUpXHJcbiAgICB7XHJcbiAgICAgIGNhc2UgVGhlbWVzLkxJR0hUIDpcclxuICAgICAgICB0aGVtZSA9IHRoaXMuZ29vZ2xlVGhlbWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgVGhlbWVzLkRBUksgOlxyXG4gICAgICAgIHRoZW1lID0gdGhpcy5nb29nbGVUaGVtZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgdGhlbWUgPSBUaGVtZXMuTElHSFQ7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50aGVtZSA9IHRoZW1lO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0SWNvbnMoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZGVmYXVsdEljb25zIDogYW55ID0gbnVsbDtcclxuICAgIGxldCBpY29ucyAgICAgICAgOiBhbnkgPSBudWxsO1xyXG5cclxuICAgIC8vIEljb25zXHJcbiAgICBkZWZhdWx0SWNvbnMgPSB7XHJcbiAgICAgIGljb25Vc3JPbkxvZ2luRm9ybSA6IHRydWUsXHJcbiAgICAgIGljb25Qd2RPbkxvZ2luRm9ybSA6IHRydWUsXHJcbiAgICB9O1xyXG5cclxuICAgIGljb25zID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0SWNvbnMsIHRoaXMuY3VzdG9tSWNvbnMpO1xyXG4gICAgdGhpcy5pY29ucyA9IGljb25zO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpbml0QnV0dG9ucygpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBkZWZhdWx0QnV0b25zIDogYW55ID0gbnVsbDtcclxuICAgIGxldCBidXR0b25zICAgICAgIDogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvLyBCdXR0b25zXHJcbiAgICBkZWZhdWx0QnV0b25zID0ge1xyXG4gICAgICBmb3Jnb3RQYXNzd29yZCA6IHRydWUsXHJcbiAgICAgIHNpZ25VcCAgICAgICAgIDogdHJ1ZSxcclxuICAgICAgZ29vZ2xlICAgICAgICAgOiB0cnVlLFxyXG4gICAgICBmYWNlYm9vayAgICAgICA6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgYnV0dG9ucyA9IE9iamVjdC5hc3NpZ24oZGVmYXVsdEJ1dG9ucywgdGhpcy5jdXN0b21CdXR0b25zKTtcclxuICAgIHRoaXMuYnV0dG9ucyA9IGJ1dHRvbnM7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluaXRJbnB1dHMoKSA6IHZvaWRcclxuICB7XHJcbiAgICBsZXQgZGVmYXVsdElucHV0cyA6IGFueSA9IG51bGw7XHJcbiAgICBsZXQgaW5wdXRzICAgICAgICA6IGFueSA9IG51bGw7XHJcblxyXG4gICAgLy8gSW5wdXRzXHJcbiAgICBkZWZhdWx0SW5wdXRzID0ge1xyXG4gICAgICBjbGVhclVzck9uTG9naW5Gb3JtIDogdHJ1ZSxcclxuICAgICAgc2hvd1B3ZE9uTG9naW5Gb3JtICA6IHRydWUsXHJcbiAgICAgIHNob3dQd2RPblB3ZEZvcm0gICAgOiB0cnVlLFxyXG4gICAgICBjbGVhckNvZGVPblB3ZEZvcm0gIDogdHJ1ZSxcclxuICAgICAgY2xlYXJDb2RlT25NZmFGb3JtICA6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgaW5wdXRzID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0SW5wdXRzLCB0aGlzLmN1c3RvbUlucHV0cyk7XHJcbiAgICB0aGlzLmlucHV0cyA9IGlucHV0cztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEVycm9ycygpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBkZWZhdWx0RXJyb3JzIDogYW55ID0gbnVsbDtcclxuICAgIGxldCBlcnJvcnMgICAgICAgIDogYW55ID0gbnVsbDtcclxuXHJcbiAgICAvLyBFcnJvcnNcclxuICAgIGRlZmF1bHRFcnJvcnMgPSB7XHJcbiAgICAgIGxvZ2luIDogdHJ1ZSxcclxuICAgICAgcHdkICAgOiB0cnVlLFxyXG4gICAgICBtZmEgICA6IHRydWVcclxuICAgIH07XHJcblxyXG4gICAgZXJyb3JzID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0RXJyb3JzLCB0aGlzLmN1c3RvbUVycm9ycyk7XHJcbiAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdFBvbGljaWVzKCkgOiB2b2lkXHJcbiAge1xyXG4gICAgLy8gTk9URTogUGFzc3dvcmRcclxuICAgIGxldCBkZWZhdWx0UHdkUG9saWNpZXMgOiBhbnkgICAgPSBudWxsO1xyXG4gICAgbGV0IHB3ZFBvbGljaWVzICAgICAgICA6IGFueSAgICA9IG51bGw7XHJcbiAgICBsZXQgZGVmYXVsdE1pbiAgICAgICAgIDogbnVtYmVyID0gODtcclxuICAgIGxldCBkZWZhdWx0TWF4ICAgICAgICAgOiBudW1iZXIgPSAxMjg7XHJcblxyXG4gICAgLy8gUGFzc3dvcmQgcG9saWNpZXNcclxuICAgIGRlZmF1bHRQd2RQb2xpY2llcyA9IHtcclxuICAgICAgcmFuZ2UgOiB7XHJcbiAgICAgICAgbWluIDogZGVmYXVsdE1pbixcclxuICAgICAgICBtYXggOiBkZWZhdWx0TWF4LFxyXG4gICAgICB9LFxyXG4gICAgICBjaGFyICAgOiB0cnVlLFxyXG4gICAgICBudW1iZXIgOiB0cnVlLFxyXG4gICAgICBsb3dlciAgOiB0cnVlLFxyXG4gICAgICB1cHBlciAgOiB0cnVlXHJcbiAgICB9O1xyXG5cclxuICAgIHB3ZFBvbGljaWVzID0gT2JqZWN0LmFzc2lnbihkZWZhdWx0UHdkUG9saWNpZXMsIHRoaXMuY3VzdG9tUHdkUG9saWNpZXMpO1xyXG5cclxuICAgIGlmKHB3ZFBvbGljaWVzLnJhbmdlLm1pbiA+IHB3ZFBvbGljaWVzLnJhbmdlLm1heClcclxuICAgIHtcclxuICAgICAgcHdkUG9saWNpZXMucmFuZ2UubWluID0gZGVmYXVsdE1pbjtcclxuICAgICAgcHdkUG9saWNpZXMucmFuZ2UubWF4ID0gZGVmYXVsdE1heDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnB3ZFBvbGljaWVzID0gcHdkUG9saWNpZXM7XHJcblxyXG4gICAgLy8gTk9URTogVXNlcm5hbWVcclxuICAgIGlmKCF0aGlzLmN1c3RvbVVzclBvbGljeSlcclxuICAgICAgcmV0dXJuO1xyXG5cclxuICAgIGxldCB2YWxpZGF0b3JzIDogYW55ID0gW107XHJcblxyXG4gICAgc3dpdGNoKHRoaXMuY3VzdG9tVXNyUG9saWN5KVxyXG4gICAge1xyXG4gICAgICBjYXNlIFVzZXJQb2xpY2llcy5FTUFJTCA6XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFVzclZhbGlkYXRvci5lbWFpbCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgVXNlclBvbGljaWVzLlBIT05FIDpcclxuICAgICAgICB2YWxpZGF0b3JzLnB1c2goVXNyVmFsaWRhdG9yLnBob25lKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdCA6XHJcbiAgICAgICAgbGV0IHJlZ0V4cCA6IFJlZ0V4cCA9IG51bGw7XHJcbiAgICAgICAgcmVnRXhwID0gbmV3IFJlZ0V4cCh0aGlzLmN1c3RvbVVzclBvbGljeSk7XHJcbiAgICAgICAgdmFsaWRhdG9ycy5wdXNoKFVzclZhbGlkYXRvci5jdXN0b20ocmVnRXhwKSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWRhdG9ycy5wdXNoKFZhbGlkYXRvcnMucmVxdWlyZWQpO1xyXG4gICAgaWYodGhpcy5nb29nbGVTdHlsZSlcclxuICAgICAgdGhpcy51c3JGb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuc2V0VmFsaWRhdG9ycyh2YWxpZGF0b3JzKTtcclxuICAgIGVsc2VcclxuICAgICAgdGhpcy5mb3JtR3JvdXAuY29udHJvbHMudXNlcm5hbWUuc2V0VmFsaWRhdG9ycyh2YWxpZGF0b3JzKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdExhYmVscygpIDogdm9pZFxyXG4gIHtcclxuICAgIGxldCBkZWZhdWx0TGFiZWxzIDogYW55ID0ge307XHJcbiAgICBsZXQgbGFiZWxzICAgICAgICA6IGFueSA9IHt9O1xyXG5cclxuICAgIGRlZmF1bHRMYWJlbHMuaGVhZGVyID0ge1xyXG4gICAgICB0aXRsZVB3ZCAgICAgICAgIDogJ0xvc3QgcGFzc3dvcmQnLFxyXG4gICAgICBzdWJ0aXRsZVB3ZCAgICAgIDogJ1BsZWFzZSBlbnRlciB0aGUgY29uZmlybWF0aW9uIGNvZGUnLFxyXG4gICAgICB0aXRsZVB3ZFNldHVwICAgIDogJ1Bhc3N3b3JkIHNldHVwJyxcclxuICAgICAgc3VidGl0bGVQd2RTZXR1cCA6ICdQbGVhc2UgZW50ZXIgYSBuZXcgcGFzc3dvcmQnLFxyXG4gICAgICB0aXRsZU1mYSAgICAgICAgIDogJ01GQScsXHJcbiAgICAgIHN1YnRpdGxlTWZhICAgICAgOiAnUGxlYXNlIGVudGVyIHRoZSBjb25maXJtYXRpb24gY29kZScsXHJcbiAgICAgIHRpdGxlTWZhU2V0dXAgICAgOiAnTUZBIHNldHVwJyxcclxuICAgICAgc3VidGl0bGVNZmFTZXR1cCA6ICdTYXZlIHRoaXMgc2VjcmV0IGtleSBmb3IgZnV0dXJlIGNvbm5lY3Rpb24nXHJcbiAgICB9O1xyXG4gICAgZGVmYXVsdExhYmVscy5pbnB1dCA9IHtcclxuICAgICAgdXNlcm5hbWUgICAgOiAnVXNlcm5hbWUnLFxyXG4gICAgICBwYXNzd29yZCAgICA6ICdQYXNzd29yZCcsXHJcbiAgICAgIHZlcmlmQ29kZSAgIDogJ1ZlcmlmaWNhdGlvbiBjb2RlJyxcclxuICAgICAgbmV3UGFzc3dvcmQgOiAnTmV3IHBhc3N3b3JkJ1xyXG4gICAgfTtcclxuICAgIGRlZmF1bHRMYWJlbHMuYnV0dG9uID0ge1xyXG4gICAgICBzaWduSW4gICAgICAgICA6ICdTaWduIGluJyxcclxuICAgICAgc2lnblVwICAgICAgICAgOiAnU2lnbiB1cCcsXHJcbiAgICAgIG5leHQgICAgICAgICAgIDogJ05leHQnLFxyXG4gICAgICBiYWNrICAgICAgICAgICA6ICdCYWNrJyxcclxuICAgICAgc2VuZCAgICAgICAgICAgOiAnU2VuZCcsXHJcbiAgICAgIHNhdmUgICAgICAgICAgIDogJ1NhdmUnLFxyXG4gICAgICBmb3Jnb3RQYXNzd29yZCA6ICdGb3Jnb3QgcGFzc3dvcmQnLFxyXG4gICAgICBnb29nbGVTaWduSW4gICA6ICdTaWduIGluIHdpdGggR29vZ2xlJyxcclxuICAgICAgZmFjZWJvb2tTaWduSW4gOiAnU2lnbiBpbiB3aXRoIEZhY2Vib29rJ1xyXG4gICAgfTtcclxuICAgIGRlZmF1bHRMYWJlbHMucG9saWN5ID0ge1xyXG4gICAgICByZXF1aXJlZCAgICAgIDogJ1RoaXMgZmllbGQgaXMgcmVxdWlyZWQnLFxyXG4gICAgICBub25XaGl0ZXNwYWNlIDogJ1RoaXMgdmFsdWUgbXVzdCBub3QgY29udGFpbiBhbnkgc3BhY2VzJyxcclxuICAgICAgZW1haWwgICAgICAgICA6ICdUaGlzIHZhbHVlIG11c3QgYmUgYW4gZW1haWwnLFxyXG4gICAgICBwaG9uZSAgICAgICAgIDogJ1RoaXMgdmFsdWUgbXVzdCBiZSBhIHBob25lIG51bWJlcicsXHJcbiAgICAgIHNpeERpZ2l0cyAgICAgOiAnVGhpcyB2YWx1ZSBtdXN0IGNvbnRhaW5zIHNpeCBkaWdpdHMnLFxyXG4gICAgICBjdXN0b21SZWdleCAgIDogJ1RoaXMgdmFsdWUgbXVzdCBtYXRjaCB0aGUgY3VzdG9tIHJlZ2V4IHByb3ZpZGVkJyxcclxuICAgICAgcHdkTGVuZ3RoICAgICA6ICdNaW5pbXVtIHBhc3N3b3JkIGxlbmd0aCAoe3ttaW59fSB0byB7e21heH19KScsXHJcbiAgICAgIHB3ZFVwcGVyY2FzZSAgOiAnUmVxdWlyZSBhdCBsZWFzdCBvbmUgdXBwZXJjYXNlIGxldHRlciAoQSB0byBaKScsXHJcbiAgICAgIHB3ZExvd2VyY2FzZSAgOiAnUmVxdWlyZSBhdCBsZWFzdCBvbmUgbG93ZXJjYXNlIGxldHRlciAoYSB0byB6KScsXHJcbiAgICAgIHB3ZE51bWJlciAgICAgOiAnUmVxdWlyZSBhdCBsZWFzdCBvbmUgbnVtYmVyICgwIHRvIDkpJyxcclxuICAgICAgcHdkU3BlY2lhbCAgICA6ICdSZXF1aXJlIGF0IGxlYXN0IG9uZSBub25hbHBoYW51bWVyaWMgY2hhcmFjdGVyICEgQCAjICQgJSBeICYgKiAoICkgXyArIC0gPSBbIF0geyB9IHwgXFwnJ1xyXG4gICAgfTtcclxuXHJcbiAgICBsYWJlbHMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRMYWJlbHMsIHRoaXMuY3VzdG9tTGFiZWxzKTtcclxuXHJcbiAgICB0aGlzLmxhYmVscyA9IGxhYmVscztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5pdEZvcm1Hcm91cHMoKSA6IHZvaWRcclxuICB7XHJcbiAgICBpZighdGhpcy5nb29nbGVTdHlsZSlcclxuICAgIHtcclxuICAgICAgdGhpcy5mb3JtR3JvdXAgPSB0aGlzLmJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICAgIHVzZXJuYW1lICAgICA6IG5ldyBGb3JtQ29udHJvbCh7XHJcbiAgICAgICAgICB2YWx1ZSAgICAgIDogbnVsbCxcclxuICAgICAgICAgIGRpc2FibGVkICAgOiBmYWxzZVxyXG4gICAgICAgIH0sW1ZhbGlkYXRvcnMucmVxdWlyZWRdKSxcclxuICAgICAgICBwYXNzd29yZCAgICAgOiBuZXcgRm9ybUNvbnRyb2woe1xyXG4gICAgICAgICAgdmFsdWUgICAgICA6IG51bGwsXHJcbiAgICAgICAgICBkaXNhYmxlZCAgIDogZmFsc2VcclxuICAgICAgICB9LFtWYWxpZGF0b3JzLnJlcXVpcmVkXSksXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy51c3JGb3JtR3JvdXAgPSB0aGlzLmJ1aWxkZXIuZ3JvdXAoe1xyXG4gICAgICB1c2VybmFtZSAgICAgOiBuZXcgRm9ybUNvbnRyb2woe1xyXG4gICAgICAgIHZhbHVlICAgICAgOiBudWxsLFxyXG4gICAgICAgIGRpc2FibGVkICAgOiBmYWxzZVxyXG4gICAgICB9LFtWYWxpZGF0b3JzLnJlcXVpcmVkXSlcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMucHdkRm9ybUdyb3VwID0gdGhpcy5idWlsZGVyLmdyb3VwKHtcclxuICAgICAgcGFzc3dvcmQgICAgIDogbmV3IEZvcm1Db250cm9sKHtcclxuICAgICAgICB2YWx1ZSAgICAgIDogbnVsbCxcclxuICAgICAgICBkaXNhYmxlZCAgIDogZmFsc2VcclxuICAgICAgfSxbVmFsaWRhdG9ycy5yZXF1aXJlZF0pXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==