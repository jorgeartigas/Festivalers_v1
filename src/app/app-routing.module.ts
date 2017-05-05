import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './login/signUp.component';
import { HomePageComponent } from './home/homePage.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { AddFestivalComponent } from './festivales/add-festival.component';
import { AdminFestivalComponent } from './festivales/admin-festival.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthGuardLogin } from './services/auth-guard-logged.service';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardLogin] },
  { path: 'signUp', component: SignUpComponent, canActivate: [AuthGuardLogin]},
  { path: 'home', component: HomePageComponent},
  { path: 'news', component: NewsComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'addFestival', component: AddFestivalComponent, canActivate: [AuthGuard]},
  { path: 'adminFestival', component: AdminFestivalComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
