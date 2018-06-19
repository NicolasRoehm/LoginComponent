import { OnInit } from '@angular/core';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
export declare class PwdFormComponent implements OnInit, OnChanges, OnDestroy {
    private builder;
    formGroup: FormGroup;
    showPassword: boolean;
    labels: any;
    errors: any;
    inputs: any;
    isFirst: boolean;
    pwdPolicies: any;
    firstConnection: EventEmitter<any>;
    lostPassword: EventEmitter<any>;
    constructor(builder: FormBuilder);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    send(): void;
    private initFormGroups(refresh?);
}
