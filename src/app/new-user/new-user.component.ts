import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  helloWorld: (data: any) => Observable<any>;

  constructor(private fns: AngularFireFunctions) {
    this.helloWorld = fns.httpsCallable<any, any>('helloWorld');
    // callable({ name: 'some-data' }).subscribe((data) => {
    //   console.log(data);
    // });
  }

  ngOnInit() {
  }

  callHelloWorld() {
    this.helloWorld({ name: 'some-data' }).toPromise()
      .then((data) => console.log('data', data))
      .catch((error) => console.error('error', error))
      .finally(() => {
        console.log('fininshed');
      });
  }
}
