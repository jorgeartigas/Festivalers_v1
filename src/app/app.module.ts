// CORE IMPORTS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
// IMPORTS FOR COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './login/signUp.component';
import { HomePageComponent } from './home/homePage.component';
import { MainNavComponent } from './nav-bar/main-nav.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { AppRoutingModule } from './app-routing.module';
import { AddFestivalComponent } from './festivales/add-festival.component';
import { AdminFestivalComponent } from './festivales/admin-festival.component';
import { ProfileComponent } from './profile/profile.component';
// IMPORTS FOR SERVICES
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthGuardLogin } from './services/auth-guard-logged.service';
import { StorageService } from './services/storage.service';

// CONNECTION DATA TO FIREBASE
export const firebaseConfig = {
    apiKey: "AIzaSyBPOtZShsH1rXquwC7le2BS64typZ0CXtw",
    authDomain: "festivalers-10001.firebaseapp.com",
    databaseURL: "https://festivalers-10001.firebaseio.com",
    projectId: "festivalers-10001",
    storageBucket: "festivalers-10001.appspot.com",
    messagingSenderId: "323511618733"
};
// AUTH METHODS FOR FIREBASE
const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    MainNavComponent,
    NewsComponent,
    ContactComponent,
    AddFestivalComponent,
    AdminFestivalComponent,
    SignUpComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig,myFirebaseAuthConfig),
  ],
  providers: [ UserService,AuthGuard,StorageService,AuthGuardLogin],
  bootstrap: [AppComponent]
})
export class AppModule { }
