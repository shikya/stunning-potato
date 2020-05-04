import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { auth } from 'firebase';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { merge } from 'rxjs/operators';

export interface Claims {
  name: string;
  picture: string;
  user_id: string;
  email: string;
  authorized: Authorized;
}

export interface Authorized {
  admin: string[];
  employee: string[];
}

export interface AppUser {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  myCustomData?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<AppUser>;
  claims: Claims;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router ) {
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // Logged in
          user.getIdTokenResult().then((data: firebase.auth.IdTokenResult) => {
            console.log('data', data);
            this.claims = {
              name: data.claims.name,
              picture: data.claims.picture,
              user_id: data.claims.user_id,
              email: data.claims.email,
              authorized: data.claims.authorized
            };
          });
          return this.afs.doc<AppUser>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      }));
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);
    this.router.navigateByUrl('/');
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<AppUser> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    userRef.set(data, { merge: true });

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
