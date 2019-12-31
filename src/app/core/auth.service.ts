import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { auth } from 'firebase';
import { switchMap } from 'rxjs/internal/operators/switchMap';

export interface Claims {
  name: string;
  picture: string;
  iss: string;
  aud: string;
  auth_time: string;
  user_id: string;
  sub: string;
  email: string;
  identities: string;
  isAdmin: number;
  isPark: number;
  isAttend: number;
  classAuth: string;
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
        user.getIdTokenResult().then((data: firebase.auth.IdTokenResult) => {
          this.claims = {
            name: data.claims.name,
            picture: data.claims.picture,
            iss: data.claims.iss,
            aud: data.claims.aud,
            auth_time: data.claims.auth_time,
            user_id: data.claims.user_id,
            sub: data.claims.sub,
            email: data.claims.email,
            identities: data.claims.identities,
            isAdmin: data.claims.isAdmin ? 1 : 0,
            isPark: data.claims.isPark ? 1 : 0,
            isAttend: data.claims.isAttend ? 1 : 0,
            classAuth: data.claims.classAuth
          };
          console.log('claims', JSON.stringify(this.claims), this.claims);
          console.log(data);
        });
          // Logged in
        if (user) {
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
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
