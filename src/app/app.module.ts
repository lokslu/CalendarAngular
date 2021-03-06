import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';

import { ValidateService } from './Services/ValidateService';
import { AuthService } from 'src/Api/AuthServise';
import { EventService } from 'src/Api/EventServise';

import { HeaderInterceptor } from './HaederInterceptor';
import { AutorizateGuard } from './Guards/AutorizateGuard';
import { DayComponent } from './Components/day/day.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangeEventDayModalComponent } from './Components/change-event-day-modal/change-event-day-modal.component';
import { NewEventDayModalComponent } from './Components/new-event-day-modal/new-event-day-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    DayComponent,
    ChangeEventDayModalComponent,
    NewEventDayModalComponent
  ],
  imports: [
    MatSnackBarModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    EventService,
    AutorizateGuard,
    ValidateService,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
