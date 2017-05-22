import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './login/signUp.component';
import { HomePageComponent } from './home/homePage.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { AddFestivalComponent } from './festivales/add-festival.component';
import { AdminFestivalComponent } from './festivales/admin-festival.component';
import { FestivalComponent } from './festivales/festival.component';
import { EditFestivalComponent } from './festivales/edit-festival.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthGuardLogin } from './services/auth-guard-logged.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile.component';
import { ArtistComponent } from './artist/artist.component';
import { SearchArtistComponent } from './artist/search-artist.component';
import { AlbumComponent } from './artist/album.component';
import { AuthGuardData } from './services/auth-guard-data.service';
import { AuthGuardOwner } from './services/auth-guard-owner.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, canActivate: [AuthGuardLogin,AuthGuardData]},
  { path: 'signUp', component: SignUpComponent, canActivate: [AuthGuardLogin,AuthGuardData]},
  { path: 'home', component: HomePageComponent, canActivate: [AuthGuardData]},
  { path: 'news', component: NewsComponent, canActivate: [AuthGuardData]},
  { path: 'contact', component: ContactComponent, canActivate: [AuthGuardData]},
  { path: 'festival/:id', component: FestivalComponent, canActivate: [AuthGuardData]},
  { path: 'edit-festival/:id', component: EditFestivalComponent, canActivate: [AuthGuardData,AuthGuardOwner]},
  { path: 'search-artist', component: SearchArtistComponent, canActivate: [AuthGuardData]},
  { path: 'artist/:id', component: ArtistComponent, canActivate: [AuthGuardData]},
  { path: 'album/:id', component: AlbumComponent, canActivate: [AuthGuardData]},
  { path: 'addFestival', component: AddFestivalComponent, canActivate: [AuthGuard,AuthGuardData]},
  { path: 'adminFestival', component: AdminFestivalComponent, canActivate: [AuthGuardData,AuthGuardAdmin]},
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuardData]},
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard,AuthGuardData]}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
