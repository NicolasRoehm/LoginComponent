import { OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Layouts } from './enums/layouts.enum';
import { Forms } from './enums/forms.enum';
import { UserPolicies } from './enums/user-policies.enum';
export declare class LoginFormComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    dialog: MatDialog;
    sanitizer: DomSanitizer;
    iconRegistry: MatIconRegistry;
    private builder;
    formLayouts: any;
    theme: string;
    usrPolicy: string;
    pwdPolicies: any;
    icons: any;
    buttons: any;
    inputs: any;
    errors: any;
    labels: any;
    fixedWidth: boolean;
    googleStyle: boolean;
    googleTheme: string;
    customFormLayouts: any;
    customUsrPolicy: string;
    customPwdPolicies: any;
    customIcons: any;
    customButtons: any;
    customInputs: any;
    customErrors: any;
    customLabels: any;
    initialized: EventEmitter<any>;
    signUp: EventEmitter<any>;
    login: EventEmitter<any>;
    loginSocial: EventEmitter<any>;
    forgotPwd: EventEmitter<any>;
    sendResetPwd: EventEmitter<any>;
    sendFirstPwd: EventEmitter<any>;
    saveMfaKey: EventEmitter<any>;
    sendMfaCode: EventEmitter<any>;
    stepUsr: EventEmitter<any>;
    stepPwd: EventEmitter<any>;
    formGroup: FormGroup;
    showPassword: boolean;
    formType: string;
    userPolicies: typeof UserPolicies;
    forms: typeof Forms;
    isFirst: boolean;
    code: string;
    qrCode: string;
    usrFormGroup: FormGroup;
    pwdFormGroup: FormGroup;
    userInfo: string;
    userImage: string;
    layouts: typeof Layouts;
    selectedTab: number;
    closeModalEvent: EventEmitter<boolean>;
    private modalFirstSub;
    private modalLostSub;
    private modalSaveMfaKeySub;
    private modalSendMfaCodeSub;
    constructor(dialog: MatDialog, sanitizer: DomSanitizer, iconRegistry: MatIconRegistry, builder: FormBuilder);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /** Emit `$event` object containing username and password properties.
    *
    * @example
    * var username : string = $event.username;
    * var password : string = $event.password;
    */
    onClickLogin(): void;
    /** Emit `$event` object containing username, password and social properties.
    *
    * @param social Name of the social provider
    * @example
    * var username : string = $event.username;
    * var password : string = $event.password;
    * var social   : string = $event.social;
    */
    onClickLoginSocial(social: string): void;
    /** Emit a click event on the sign up button. */
    onClickSignUp(): void;
    /** Emit `$event` object containing username property.
    *
    * @example
    * var username : string = $event.username;
    */
    onClickForgotPassword(): void;
    /** Show password form either to initialize first password or to reset forgot password.
    *
    * @param isFirst Initialize first password or reset forgot password
    */
    showPwdForm(isFirst: boolean): void;
    /** Show MFA setup form to initialize first TOTP (Time-based One-time Password).
    *
    * @param code
    * @param qrCode
    */
    showMfaSetupForm(code: string, qrCode: string): void;
    /** Show MFA form to get verification code. */
    showMfaForm(): void;
    /** Hide password form. */
    hidePwdForm(): void;
    /** Hide MFA setup form. */
    hideMfaSetupForm(): void;
    /** Hide MFA form. */
    hideMfaForm(): void;
    /** Go password step. */
    showPwdStep(userInfo?: string, userImage?: string): void;
    onClickNextStep(currentStep: number): void;
    onClickPrevStep(currentStep: number): void;
    /** Emit `$event` object containing password property.
    *
    * @example
    * var newPassword : string = $event.password;
    */
    tabFirstLog($event: any): void;
    /** Emit `$event` object containing password and code properties.
    *
    * @example
    * var newPassword      : string = $event.password;
    * var verificationCode : string = $event.code;
    */
    tabLostPwd($event: any): void;
    /** Emit `$event` object containing code property.
    *
    * @example
    * var verificationCode : string = $event.code;
    */
    tabSaveMfaKey($event: any): void;
    /** Emit `$event` object containing code property.
    *
    * @example
    * var verificationCode : string = $event.code;
    */
    tabSendMfaCode($event: any): void;
    /** Emit `$event` object containing password property.
    *
    * @example
    * var newPassword : string = $event.password;
    */
    modalFirstLog(dialogRef: any): void;
    /** Emit `$event` object containing password and code properties.
    *
    * @example
    * var newPassword      : string = $event.password;
    * var verificationCode : string = $event.code;
    */
    modalLostPwd(dialogRef: any): void;
    /** Emit `$event` object containing code property.
    *
    * @example
    * var verificationCode : string = $event.code;
    */
    modalSaveMfaKey(dialogRef: any): void;
    /** Emit `$event` object containing code property.
    *
    * @example
    * var verificationCode : string = $event.code;
    */
    modalSendMfaCode(dialogRef: any): void;
    onClickCloseTab($event: any): void;
    private openModal();
    private showLayout(formLayout);
    private closeLayout(formLayout);
    private closeModal();
    private openTab();
    private closeTab();
    private getEventResponse(onlyOne?);
    private initFormLayouts();
    private initTheme();
    private initIcons();
    private initButtons();
    private initInputs();
    private initErrors();
    private initPolicies();
    private initLabels();
    private initFormGroups();
}
