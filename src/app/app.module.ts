import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PrimengModule } from './primeng/primeng.module';
import { MaterialModule } from './material/material.module';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './resource/auth/login/login.component';
import { NavbarComponent } from './resource/layout/navbar/navbar.component';
import { RegisterComponent } from './resource/auth/register/register.component';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './services/authGuard/auth.guard';
import { HomeComponent } from './resource/home/home.component';
import { EdituserComponent } from './resource/user/edituser/edituser.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';
import { UserService } from './services/user/user.service';
import { PersonalComponent } from './resource/user/personal/personal.component';
import { StaffComponent } from './resource/staff/staff/staff.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    EdituserComponent,
    PersonalComponent,
    StaffComponent
   ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    MessageService,
    AuthGuard,
    UserService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
