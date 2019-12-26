import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.css']
})
export class CreateEntryComponent implements OnInit {

  newEntryFormControl: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<string>) {
    this.newEntryFormControl = fb.group({
      num: new FormControl('', Validators.required),
      prefix: new FormControl('', Validators.required),
      rtoCode: new FormControl('', Validators.required),
      stateCode: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }


}
