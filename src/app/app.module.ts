import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/fixed/header/header.component';
import { FooterComponent } from './pages/fixed/footer/footer.component';
import { HomeComponent } from './pages/pages/home/home.component';
import { LoginComponent } from './pages/pages/login/login.component';
import { RegisterComponent } from './pages/pages/register/register.component';
import { ActivationUserComponent } from './pages/pages/activation-user/activation-user.component';
import { ContactComponent } from './pages/pages/contact/contact.component';
import { SingleComponent } from './pages/pages/single/single.component';
import { AuthInterceptor } from './services/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ActivationUserComponent,
    ContactComponent,
    SingleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
