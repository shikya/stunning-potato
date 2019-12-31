import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-create-entry',
  templateUrl: './create-entry.component.html',
  styleUrls: ['./create-entry.component.css']
})
export class CreateEntryComponent implements OnInit {

  newEntryFormControl: FormGroup;
  states = ['MH', 'AP', 'TN'];
  filteredStates: Observable<string[]>;

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

  public onSubmitNewEntryFormControl() { }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(option => option.toLowerCase().includes(filterValue));
  }
}
