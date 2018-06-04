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

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  public fakeAuth(login : string, password : string, response? : string) : Observable<any>
  {
    if(!response)
      response = 'onSuccess';

    let user : any = {};

    return Observable.fromPromise(new Promise((resolve, reject) =>
    {
      switch(response)
      {
        case 'newPasswordRequired' :
          reject(-1);
          break;
        case 'onSuccess' :
          resolve(user);
          break;
        case 'onFailure' :
          reject(-2);
          break;
      }
    }));
  }

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

}
