import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Forms } from '../../enums/forms.enum';
export declare class TabWrapperComponent implements OnInit, OnDestroy {
    forms: typeof Forms;
    formType: string;
    labels: any;
    errors: any;
    inputs: any;
    sendCloseTab: EventEmitter<boolean>;
    isFirst: boolean;
    pwdPolicies: any;
    relayFirstLog: EventEmitter<any>;
    relayLostPwd: EventEmitter<any>;
    code: string;
    qrCode: string;
    relaySaveMfaKey: EventEmitter<any>;
    relaySendMfaCode: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    backToLogin(): void;
    relayFirstLogEvent($event: any): void;
    relayLostPwdEvent($event: any): void;
    relaySaveMfaKeyEvent($event: any): void;
    relaySendMfaCodeEvent($event: any): void;
}
