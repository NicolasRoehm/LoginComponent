// Angular modules
import { NgModule }                from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule }           from '@angular/platform-browser';

// Components
import { AppComponent }    from './app.component';

// Modules
import { LoginFormModule } from 'login-form';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    LoginFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
