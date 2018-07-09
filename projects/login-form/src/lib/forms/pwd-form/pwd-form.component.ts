// Angular modules
import { OnInit }         from '@angular/core';
import { Component }      from '@angular/core';
import { Input }          from '@angular/core';
import { Output }         from '@angular/core';
import { EventEmitter }   from '@angular/core';

// Enums
import { FieldIds }       from '../../enums/field-ids.enum';
import { FieldTypes }     from '../../enums/field-types.enum';

@Component({
  selector    : 'cal-pwd-form',
  templateUrl : './pwd-form.component.html',
  styleUrls   : ['./pwd-form.component.scss']
})
export class PwdFormComponent implements OnInit
{
  public    formProperties  : any   = {};
  public    pwdParams       : any   = {};
  public    pwdFields       : any[] = [];
  // public captchaToken : string; // TODO:

  // Labels
  @Input()  labels          : any;
  // Errors
  @Input()  errors          : any;
  // Actions
  @Input()  actions         : any;

  // First connection or Forgot password
  @Input()  isFirst         : boolean;
  // Password policies
  @Input()  pwdPolicies     : any;
  // Event sent to the login form and relayed parents (modal & tab)
  @Output() firstConnection : EventEmitter<any> = new EventEmitter();
  @Output() lostPassword    : EventEmitter<any> = new EventEmitter();

  constructor() { }

  public ngOnInit() : void
  {
    // Pwd form
    this.initFormProperties();
    this.initPwdParameters();
    this.initPwdForm();
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Dynamic form ------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  public send($event) : void
  {
    // First connection
    if(this.isFirst)
    {
      this.firstConnection.emit($event);
      return;
    }
    this.lostPassword.emit($event);
  }

  private initFormProperties() : void
  {
    // NOTE: Form properties
    // this.formProperties.layouts = this.layouts;
    this.formProperties.labels  = this.labels;
    // this.formProperties.formId  = this.formId;
  }

  private initPwdParameters() : void
  {
    // NOTE: Pwd parameters
    this.pwdParams.errors       = this.errors.pwd;
    this.pwdParams.autocomplete = false;
  }

  private initPwdForm() : void
  {
    // NOTE: Get fields
    let pwdField  : any = null;
    let codeField : any = null;
    pwdField  = this.initPasswordField();
    codeField = this.initVerificationCodeField();
    // NOTE: Mfa fields
    this.pwdFields = [];
    if(!this.isFirst)
      this.pwdFields.push(codeField);
    this.pwdFields.push(pwdField);
  }

  // -------------------------------------------------------------------------------------------
  // NOTE: Field -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------

  private initPasswordField() : any
  {
    let field : any = {};
    field.type      = FieldTypes.PASSWORD;
    field.name      = FieldIds.PWD;
    field.id        = 'new' + FieldIds.PWD;
    field.policies  = this.pwdPolicies;
    field.action    = this.actions.showPwd;
    field.icon      = null;
    if(this.isFirst) // display pwd policies
      field.showPolicies = true;
    else
      field.showPolicies = false;
    field.disabled  = false;
    return field;
  }

  private initVerificationCodeField() : any
  {
    let field : any = {};
    field.type      = FieldTypes.TEXT;
    field.name      = FieldIds.VERIF_CODE;
    field.id        = 'pwd' + FieldIds.VERIF_CODE;
    // field.policies  = this.pwdPolicies;
    field.action    = this.actions.clearCode;
    field.icon      = null;
    field.disabled  = false;
    return field;
  }

}
