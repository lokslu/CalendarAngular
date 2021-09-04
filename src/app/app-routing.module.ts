import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { AutorizateGuard } from './Guards/AutorizateGuard';

const routes: Routes = [
  {path:"",component:HomeComponent ,canActivate:[AutorizateGuard]},
  {path:"registration",component:RegistrationComponent},
  {path:"login",component:LoginComponent},
  {path:"**",redirectTo:'/'}
 ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
