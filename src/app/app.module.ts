import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { RedirectionComponent } from './redirection/redirection.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ContentResolver } from './ContentService/contentresolver.service';
import { NavigationComponent } from './navigation/navigation.component';
import { PasswordComponent } from './password/password.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PasswordInputDialogComponent } from './password-input-dialog/password-input-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PasswordInputComponent } from './password-input/password-input.component';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { NgToastModule } from 'ng-angular-popup';
@NgModule({
  declarations: [
    AppComponent,
    RedirectionComponent,
    HomeComponent,
    NavigationComponent,
    PasswordComponent,
    PasswordInputDialogComponent,
    PasswordInputComponent,
  ],
  imports: [
    BrowserModule,
    NgToastModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: environment.FIREBASE_PROJECT_ID,
        appId: environment.FIREBASE_APP_ID,
        databaseURL: environment.FIREBASE_DATABASE_URL,
        storageBucket: environment.FIREBASE_STORAGE_BUCKET,
        apiKey: environment.FIREBASE_API_KEY,
        authDomain: environment.FIREBASE_AUTH_DOMAIN,
        messagingSenderId: environment.FIREBASE_MESSAGING_SENDER_ID,
        measurementId: environment.FIREBASE_MEASUREMENT_ID,
      })
    ),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideAnalytics(() => getAnalytics()),
    BrowserAnimationsModule,
    // provideFunctions(() => getFunctions())
  ],
  providers: [ScreenTrackingService, UserTrackingService, ContentResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
