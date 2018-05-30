// Angular modules
import { BrowserModule }   from '@angular/platform-browser';
import { NgModule }        from '@angular/core';

// Components
import { AppComponent }    from './app.component';

// Modules
import { LoginFormModule } from 'login-form';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginFormModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
