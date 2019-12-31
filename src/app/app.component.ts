import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Router, GuardsCheckStart, GuardsCheckEnd } from '@angular/router';
import { AuthService } from './core/auth.service';

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
  isAuthOnGoing = true;
  classNameAuthorized: string;

  filteredStates: Observable<string[]>;

  constructor(private router: Router, private as: AuthService) {
    router.events.subscribe(e => {
      if (e instanceof GuardsCheckStart) {
        this.isAuthOnGoing = true;
      } else if (e instanceof GuardsCheckEnd) {
        this.isAuthOnGoing = false;
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.as.signOut();
  }
}
