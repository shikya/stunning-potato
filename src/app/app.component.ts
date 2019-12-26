import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth, User } from 'firebase/app';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';

export interface VehicleEntry { num: number; prefix: string; rtoCode: number; stateCode: string; }
export interface Preference { classAuthorized: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'stunning-potato';
  isLoggedIn = false;
  newEntryFormControl: FormGroup;
  classNameAuthorized: string;

  filteredStates: Observable<string[]>;

  constructor(public afAuth: AngularFireAuth, fb: FormBuilder, private afs: AngularFirestore) {

    afAuth.user.subscribe((user: User) => {
      console.log(user.uid);
      if (user) {
        this.isLoggedIn = true;
        // afs.doc<Preference>(`users/${user.uid}`).valueChanges().subscribe(data => console.log('123', data));
        afs.doc<Preference>(`users/${user.uid}`).ref.get().then(doc => console.log(doc.data()));
        this.isLoggedIn = false;
      }
    });

    this.newEntryFormControl = fb.group({
      num: new FormControl('', Validators.required),
      prefix: new FormControl('', Validators.required),
      rtoCode: new FormControl('', Validators.required),
      stateCode: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    // this.filteredStates = this.newEntryFormControl.valueChanges
    // .pipe(
    //   startWith(''),
    //   map(value => typeof value === 'string' ? value : value.name),
    //   map(name => name ? this._filter(name) : this.options.slice())
    // );
  }

  onSubmitNewEntryFormControl() {
    console.log('hello');
    console.log(this.newEntryFormControl);
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
