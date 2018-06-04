// Angular modules
import { Component }          from '@angular/core';
import { ViewChild }          from '@angular/core';
import { MatSnackBar }        from '@angular/material';

// External modules
import { TranslateService }   from '@ngx-translate/core';

// Services
import { AuthService }        from './auth.service';

// Components
import { LoginFormComponent } from 'login-form';

// Enums
import { AuthError }          from './auth.enum';

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})
export class AppComponent
{

  @ViewChild('loginForm') loginForm : LoginFormComponent;

  constructor
  (
    public  snackBar    : MatSnackBar,
    private authService : AuthService,
    private translate   : TranslateService
  )
  {
  }

  // -------------------------------------------------------------------------------
  // ---- NOTE: Events -------------------------------------------------------------
  // -------------------------------------------------------------------------------

  public login($event : any) : void
  { // NOTE: onClickLogin
    if(!$event)
      return;

    let login    : string = null;
    let password : string = null;
    login    = $event.login;
    password = $event.password;

    // Show loader

    this.authService.fakeAuth(login, password).subscribe(user =>
    {
      alert('success');
    },
    err =>
    {
      // Hide loader

      // First connection
      if(err === -1)
        this.loginForm.openDialog(true);

      // Error
      if(err === -2)
        this.snackBar.open(this.translate.instant('ERROR_LOGIN_FAILED'), 'X');
    });
  }

  public forgottenPassword($event : any) : void
  { // NOTE: onClickForgottenPassword
    if(!$event)
      return;

    let login : string = null;
    login = $event.login;

    if(!login)
    {
      this.snackBar.open(this.translate.instant('ERROR_LOGIN_REQUIRED'), 'X');
      return;
    }

    this.authService.fakeResetPassword(login).subscribe((res : any) =>
    {
      this.loginForm.openDialog(false);
    },
    err =>
    {
      let errorMsg  : string = null;
      let errorCode : string = null;
      errorCode = err.code;

      switch(errorCode)
      { // NOTE: This example use AWS errors
        case AuthError.FORGOT_PASS_VERIF_EMAIL :
          errorMsg = this.translate.instant('ERROR_INCORRECT_EMAIL');
          break;
        case AuthError.FORGOT_PASS_VERIF_INIT :
          errorMsg = this.translate.instant('ERROR_FORGOT_PASS_VERIF_INIT');
          break;
        case AuthError.VERIF_LIMIT :
          errorMsg = this.translate.instant('ERROR_VERIF_LIMIT');
          break;
        case AuthError.VERIF_AUTHORIZATION :
          errorMsg = this.translate.instant('ERROR_VERIF_AUTHORIZATION');
          break;
        default :
          errorMsg = this.translate.instant('ERROR_AMAZON_POLICY');
          break;
      }

      this.snackBar.open(errorMsg, 'X');
    });
  }

  public firstPassword($event : any) : void
  { // NOTE: First connection
    if(!$event)
      return;

    let newPassword : string = null;
    newPassword = $event.newPassword;

    this.authService.fakeInitPassword(newPassword).subscribe(res =>
    {
      this.loginForm.closeDialog();
      this.snackBar.open(this.translate.instant('SUCCESS_UPDATE_PWD'), 'x');
    },
    err =>
    {
      this.snackBar.open(this.translate.instant('ERROR_AMAZON_POLICY'), 'x');
    });
  }

  public lostPassword($event : any) : void
  { // NOTE: Lost password
    if(!$event)
      return;

    let newPassword : string = null;
    let verifCode   : string = null;
    newPassword = $event.newPassword;
    verifCode   = $event.verifCode;

    this.authService.fakeConfirmPassword(newPassword, verifCode).subscribe(res =>
    {
      this.loginForm.closeDialog();
      this.snackBar.open(this.translate.instant('SUCCESS_UPDATE_PWD'), 'x');
    },
    err =>
    {
      let errorMsg  : string = null;
      let errorCode : string = null;
      errorCode = err.code;

      switch(errorCode)
      { // NOTE: This example use AWS errors
        case AuthError.VERIF_CODE :
          errorMsg = this.translate.instant('ERROR_VERIF_CODE');
          break;
        case AuthError.VERIF_LIMIT :
          errorMsg = this.translate.instant('ERROR_VERIF_LIMIT');
          break;
        default :
          errorMsg = this.translate.instant('ERROR_AMAZON_POLICY');
          break;
      }

      this.snackBar.open(errorMsg, 'x');
    });
  }
}
