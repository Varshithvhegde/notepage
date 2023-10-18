import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { RedirectionComponent } from './redirection/redirection.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ContentResolver } from './ContentService/contentresolver.service';
// import {c}

@NgModule({
  declarations: [
    AppComponent,
    RedirectionComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    provideFirebaseApp(() => initializeApp({
      projectId: environment.FIREBASE_PROJECT_ID,
      appId: environment.FIREBASE_APP_ID,
      databaseURL: environment.FIREBASE_DATABASE_URL,
      storageBucket: environment.FIREBASE_STORAGE_BUCKET,
      apiKey: environment.FIREBASE_API_KEY,
      authDomain: environment.FIREBASE_AUTH_DOMAIN,
      messagingSenderId: environment.FIREBASE_MESSAGING_SENDER_ID,
      measurementId: environment.FIREBASE_MEASUREMENT_ID
    })),
    // provideAnalytics(() => getAnalytics()),
    provideDatabase(() => getDatabase()),
    BrowserAnimationsModule,
    // provideFunctions(() => getFunctions())
    
  ],
  providers: [
    ScreenTrackingService,UserTrackingService,ContentResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
