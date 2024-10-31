import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"recetario-99e37","appId":"1:925581215681:web:a445e56209bf7f756c9140","storageBucket":"recetario-99e37.appspot.com","apiKey":"AIzaSyBYtonlC4hAwQbGpkDKWq1saR269B7Okpk","authDomain":"recetario-99e37.firebaseapp.com","messagingSenderId":"925581215681","measurementId":"G-XGJNF80Q8C"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
