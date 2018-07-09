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
  selector    : 'cal-mfa-form',
  templateUrl : './mfa-form.component.html',
  styleUrls   : ['./mfa-form.component.scss']
})
export class MfaFormComponent implements OnInit
{
  public    formProperties : any   = {};
  public    mfaParams      : any   = {};
  public    mfaFields      : any[] = [];

  // Labels
  @Input()  labels       : any;
  // Errors
  @Input()  errors       : any;
  // Actions
  @Input()  actions      : any;

  // Event sent to the login form and relayed parents (modal & tab)
  @Output() sendMfa      : EventEmitter<any> = new EventEmitter();

  constructor() { }

  public ngOnInit() : void
  {
    // Mfa setup form
    this.initFormProperties();
    this.initMfaParameters();
    this.initMfaForm();
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Dynamic form ------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  public send($event) : void
  {
    this.sendMfa.emit($event);
  }

  private initFormProperties() : void
  {
    // NOTE: Form properties
    // this.formProperties.layouts = this.layouts;
    this.formProperties.labels  = this.labels;
    // this.formProperties.formId  = this.formId;
  }

  private initMfaParameters() : void
  {
    // NOTE: Mfa parameters
    this.mfaParams.errors       = this.errors.mfa;
    this.mfaParams.autocomplete = false;
  }

  private initMfaForm() : void
  {
    // NOTE: Get field
    let codeField : any = null;
    codeField = this.initVerificationCodeField();
    // NOTE: Mfa field
    this.mfaFields = [];
    this.mfaFields.push(codeField);
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Field -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  private initVerificationCodeField() : any
  {
    let field : any = {};
    field.type      = FieldTypes.TEXT;
    field.name      = FieldIds.VERIF_CODE;
    field.id        = 'mfa' + FieldIds.VERIF_CODE;
    // field.policies  = this.pwdPolicies;
    field.action    = this.actions.clearCode;
    field.icon      = null;
    field.disabled  = false;
    return field;
  }

}
