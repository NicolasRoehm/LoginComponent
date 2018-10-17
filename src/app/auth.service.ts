// Angular modules
import { Injectable }  from '@angular/core';

// External modules
import { Observable }  from 'rxjs';
import { from }        from 'rxjs';

// Enums
import { Credentials } from './credentials.enum';
import { RespType }    from './resp-type.enum';

@Injectable({
  providedIn : 'root'
})
export class AuthService
{
  public fakeAuth(username : string, password : string, response? : string) : Observable<any>
  {
    if(!response)
      response = this.getResponseByCredentials(username, password);

    return from(new Promise((resolve, reject) =>
    {
      switch(response)
      {
        case 'newPasswordRequired' :
          resolve({ type : RespType.NEW_PASSWORD_REQUIRED, data : '' });
          break;
        case 'onSuccess' :
          resolve({ type : RespType.ON_SUCCESS, data : '' });
          break;
        case 'mfaRequired' :
          resolve({ type : RespType.MFA_REQUIRED, data : '' });
          break;
        case 'mfaSetup' :
          resolve({ type : RespType.MFA_SETUP_ASSOCIATE_SECRETE_CODE, data : '' });
          break;

        case 'onFailure' :
          reject({ type : RespType.ON_FAILURE, data : { message : 'Auth failed' } });
          break;
      }
    }));
  }

  // public fakeAuthGoogle();

  public fakeForgotPassword(username : string, response? : string) : Observable<any>
  {
    if(!response)
      response = 'inputVerificationCode';

    return from(new Promise((resolve, reject) =>
    {
      switch(response)
      {
        case 'onSuccess' :
          resolve({ type : RespType.ON_SUCCESS, data : '' });
          break;
        case 'inputVerificationCode' :
          resolve({ type : RespType.INPUT_VERIFICATION_CODE, data : '' });
          break;

        case 'onFailure' :
          reject({ type : RespType.ON_FAILURE, data : { message : 'ForgotPassword failed' } });
          break;
      }
    }));
  }

  public fakeNewPasswordRequired(newPassword : string, response? : string) : Observable<any>
  {
    if(!response)
      response = 'onSuccess';

    return from(new Promise((resolve, reject) =>
    {
      switch(response)
      {
        case 'onSuccess' :
          resolve({ type : RespType.ON_SUCCESS, data : '' });
          break;
        case 'mfaRequired' :
          resolve({ type : RespType.MFA_REQUIRED, data : '' });
          break;

        case 'onFailure' :
          reject({ type : RespType.ON_FAILURE, data : { message : 'NewPasswordRequired failed' } });
          break;
      }
    }));
  }

  public fakeConfirmPassword(newPassword : string, verificationCode : string, response? : string) : Observable<any>
  {
    if(!response)
      response = 'onSuccess';

    return from(new Promise((resolve, reject) =>
    {
      switch(response)
      {
        case 'onSuccess' :
          resolve({ type : RespType.ON_SUCCESS, data : '' });
          break;

        case 'onFailure' :
          reject({ type : RespType.ON_FAILURE, data : { message : 'ConfirmPassword failed' } });
          break;
      }
    }));
  }

  private getResponseByCredentials(username? : string, password? : string, verificationCode? : string) : string
  {
    let response : string = null;

    switch(username)
    {
      case Credentials.USR_1 :
        response = 'onSuccess';
        break;
      case Credentials.USR_2 :
        response = 'mfaRequired';
        break;
      case Credentials.USR_3 :
        response = 'newPasswordRequired';
        break;
      case Credentials.USR_4 :
        response = 'mfaSetup';
        break;
    }

    return response;
  }
}
