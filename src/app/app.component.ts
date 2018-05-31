// Angular modules
import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';

// Components
import { LoginFormComponent } from 'login-form';

@Component({
  selector    : 'app-root',
  templateUrl : './app.component.html',
  styleUrls   : ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('loginForm') loginForm : LoginFormComponent;

  public login($event : any) : void
  {
    if(!$event)
      return;

    console.log($event.login);
    console.log($event.password);

    // If first connection
    //   this.loginForm.openDialog(true);
  }

  public forgottenPassword($event : any) : void
  {
    if(!$event)
      return;

    console.log($event.login);

    this.loginForm.openDialog(false);
  }

  public firstPassword() : void
  {
    console.log('firstPassword');

    // this.loginForm.closeDialog();
    // Close dialog on ok
    // Else snack bar
  }

  public lostPassword() : void
  {
    console.log('lostPassword');

    // this.loginForm.closeDialog();
    // Close dialog on ok
    // Else snack bar
  }
}
