import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Entry } from './entry.model';
import { VehicleNumber } from './vehicle-number.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stunning-potato';
  isLoggedIn = false;
  entires: Entry[] = [];

  constructor(public afAuth: AngularFireAuth) {
    this.entires.push(new Entry(new VehicleNumber('MH', 30, 'X', 7117), 0));
  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  uploadImage() {

  }
}
