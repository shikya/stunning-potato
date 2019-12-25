import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Entry } from './entry.model';
import { VehicleNumber } from './vehicle-number.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'stunning-potato';
  isLoggedIn = false;
  entires: Entry[] = [];
  newEntryFormControl: FormGroup;

  filteredStates: Observable<string[]>;

  constructor(public afAuth: AngularFireAuth, fb: FormBuilder) {

    this.entires.push(new Entry(new VehicleNumber('MH', 30, 'X', 7117), 0));

    afAuth.user.subscribe((user: User) => {
      // console.log(user.displayName);
      if (user) {
        this.isLoggedIn = true;
      } else {
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
