import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { withFetch } from '@angular/common/http';
import { PrimengModule } from './primeng/primeng.module';
import { MaterialModule } from './material/material.module';

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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    HomeComponent,
    EdituserComponent
   ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    MessageService,
    AuthGuard,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
