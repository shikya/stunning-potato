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

  classNameAuthorized: string;

  filteredStates: Observable<string[]>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
  }
}
