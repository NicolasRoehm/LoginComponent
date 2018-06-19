import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
export declare class PassFormComponent implements OnInit, OnDestroy {
    private builder;
    formGroup: FormGroup;
    showPassword: boolean;
    isFirst: boolean;
    passLabels: any;
    passPolicies: any;
    btnShowPass: boolean;
    btnClearCode: boolean;
    err: boolean;
    firstConnection: EventEmitter<any>;
    lostPassword: EventEmitter<any>;
    constructor(builder: FormBuilder);
    ngOnInit(): void;
    ngOnDestroy(): void;
    send(): void;
    private initFormsGroups();
}
