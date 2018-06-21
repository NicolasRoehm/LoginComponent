// Angular modules
import { Injectable } from '@angular/core';

// External modules
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/fromPromise';

// Enums
import { Credentials } from './credentials.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  public fakeAuth(username : string, password : string, response? : string) : Observable<any>
  {
    if(!response)
      response = this.getResponseByCredentials(username, password);

    return Observable.fromPromise(new Promise((resolve, reject) =>
    {
      switch(response)
      {
        case 'onSuccess' :
          resolve({ code : 1 });
          break;
        case 'mfaRequired' :
          resolve({ code : 2 });
          break;

        case 'newPasswordRequired' :
          reject({ code : 1 });
          break;
        case 'onFailure' :
          reject({ code : 2 });
          break;
        case 'mfaSetup' :
          reject({ code : 3 });
          break;
      }
    }));
  }

  // public fakeAuthGoogle();

  public fakeForgotPassword(username : string, response? : string) : Observable<any>
  {
    if(!response)
      response = 'onSuccess';

    return Observable.fromPromise(new Promise((resolve, reject) =>
    {
      switch(response)
      {
        case 'onSuccess' :
          resolve({ code : 1 });
          break;
        case 'inputVerificationCode' :
          resolve({ code : 2 });
          break;

        case 'onFailure' :
          reject();
          break;
      }
    }));
  }

  public fakeChangePassword(newPassword : string, response? : string) : Observable<any>
  {
    if(!response)
      response = 'onSuccess';

    return Observable.fromPromise(new Promise((resolve, reject) =>
    {
      switch(response)
      {
        case 'onSuccess' :
          resolve({ code : 1 });
          break;
        case 'mfaRequired' :
          resolve({ code : 2 });
          break;

        case 'onFailure' :
          reject();
          break;
      }
    }));
  }

  public fakeConfirmPassword(newPassword : string, verificationCode : string, response? : string) : Observable<any>
  {
    if(!response)
      response = 'onSuccess';

    return Observable.fromPromise(new Promise((resolve, reject) =>
    {
      switch(response)
      {
        case 'onSuccess' :
          resolve();
          break;

        case 'onFailure' :
          reject();
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
