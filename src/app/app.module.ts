import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

// Custom
import { AuthService } from './core/auth.service';
import { environment } from '../environments/environment';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

// small modules
import { RoutingModule } from './small-modules/routing.module';
import { MatModulesModule } from './small-modules/mat-modules.module';

import { EntryCardComponent } from './entry-card/entry-card.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CreateEntryComponent } from './create-entry/create-entry.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserProfileComponent,
    EntryCardComponent,
    DashboardComponent,
    LoginComponent,
    CreateEntryComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    MatModulesModule,
    AngularFireModule.initializeApp(environment.firebase, 'bookish-pancake'),
    BrowserAnimationsModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularFirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    RoutingModule,
  ],
  entryComponents: [
    CreateEntryComponent
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
