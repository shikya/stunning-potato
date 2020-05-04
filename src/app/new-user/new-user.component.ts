import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  // helloWorld: (data: any) => Observable<any>;

  constructor(private fns: AngularFireFunctions, private as: AuthService, private router: Router) {
    // this.helloWorld = fns.httpsCallable<any, any>('helloWorld');
    // callable({ name: 'some-data' }).subscribe((data) => {
    //   console.log(data);
    // });
  }

  ngOnInit() {
  }

  // callHelloWorld() {
  //   this.helloWorld({ name: 'some-data' }).toPromise()
  //     .then((data) => console.log('data', data))
  //     .catch((error) => console.error('error', error))
  //     .finally(() => {
  //       console.log('fininshed');
  //     });
  // }

  logout() {
    this.as.signOut();
    this.router.navigateByUrl('/');
  }

  removeClaims() {
    // // Add blank claims to process in future

    // const claimsRef: AngularFirestoreDocument<Authorized> = this.afs.doc(`users/${user.uid}/authorized`);

    // claimsRef.set({
    //   admin: [],
    //   employee: []
    // }, { merge: true });

  }
}
