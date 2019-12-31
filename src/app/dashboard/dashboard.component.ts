import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateEntryComponent } from '../create-entry/create-entry.component';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  newUser: boolean;

  constructor(public dialog: MatDialog, private _as: AuthService) {
    _as.user$.subscribe(data => console.log('AppUser', data));
  }

  ngOnInit() {
  }

  openCreateEntry() {
    const dialogRef = this.dialog.open(CreateEntryComponent, {
      width: '100vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
