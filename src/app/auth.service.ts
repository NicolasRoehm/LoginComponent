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

    let user : any = {};

    return Observable.fromPromise(new Promise((resolve, reject) =>
    {
      switch(response)
      {
        case 'newPasswordRequired' :
          reject(1);
          break;
        case 'onSuccess' :
          resolve(user);
          break;
        case 'onFailure' :
          reject(2);
          break;
        case 'mfaSetup' :
          reject(3);
          break;
      }
    }));
  }

  // public fakeAuthGoogle();

  public fakeResetPassword(username : string, response? : string) : Observable<any>
  {
    if(!response)
      response = 'onSuccess';

    return Observable.fromPromise(new Promise((resolve, reject) =>
    {
      switch(response)
      {
        case 'inputVerificationCode' :
          resolve(1);
          break;
        case 'onSuccess' :
          resolve();
          break;
        case 'onFailure' :
          reject(-2);
          break;
      }
    }));
  }

  public fakeInitPassword(newPassword : string, response? : string) : Observable<any>
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
      case Credentials.LOGIN_1 :
        response = 'onSuccess';
        break;
      case Credentials.LOGIN_3 :
        response = 'newPasswordRequired';
        break;
      case Credentials.LOGIN_4 :
        response = 'mfaSetup';
        break;
    }

    return response;
  }
}
