// Angular modules
import { OnInit }       from '@angular/core';
import { Component }    from '@angular/core';
import { Input }        from '@angular/core';
import { Output }       from '@angular/core';
import { EventEmitter } from '@angular/core';

// Enums
import { FieldIds }     from '../../enums/field-ids.enum';
import { FieldTypes }   from '../../enums/field-types.enum';

@Component({
  selector    : 'cal-mfa-setup-form',
  templateUrl : './mfa-setup-form.component.html',
  styleUrls   : ['./mfa-setup-form.component.scss']
})
export class MfaSetupFormComponent implements OnInit
{
  public    formProperties : any   = {};
  public    mfaSetupParams : any   = {};
  public    mfaSetupFields : any[] = [];

  // Labels
  @Input()  labels         : any;
  // Errors
  @Input()  errors         : any;
  // Actions
  @Input()  actions        : any;

  // MFA secret key
  @Input()  qrCode         : string;
  @Input()  code           : string;
  // Event sent to the login form and relayed parents (modal & tab)
  @Output() saveMfa        : EventEmitter<any> = new EventEmitter();

  constructor() { }

  public ngOnInit() : void
  {
    // Mfa setup form
    this.initFormProperties();
    this.initMfaSetupParameters();
    this.initMfaSetupForm();
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Dynamic form ------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  public send($event) : void
  {
    this.saveMfa.emit($event);
  }

  private initFormProperties() : void
  {
    // NOTE: Form properties
    // this.formProperties.layouts = this.layouts;
    this.formProperties.labels  = this.labels;
    // this.formProperties.formId  = this.formId;
  }

  private initMfaSetupParameters() : void
  {
    // NOTE: Mfa setup parameters
    this.mfaSetupParams.errors       = this.errors.mfa;
    this.mfaSetupParams.autocomplete = false;
  }

  private initMfaSetupForm() : void
  {
    // NOTE: Get field
    let codeField : any = null;
    codeField = this.initVerificationCodeField();
    // NOTE: Mfa setup field
    this.mfaSetupFields = [];
    this.mfaSetupFields.push(codeField);
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Field -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  private initVerificationCodeField() : any
  {
    let field : any = {};
    field.type      = FieldTypes.TEXT;
    field.name      = FieldIds.VERIF_CODE;
    field.id        = 'mfaSetup' + FieldIds.VERIF_CODE;
    // field.policies  = this.pwdPolicies;
    field.action    = this.actions.clearCode;
    field.icon      = null;
    field.disabled  = false;
    return field;
  }

}
