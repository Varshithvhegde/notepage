import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent {
  password: string = '';

  constructor(public dialogRef: MatDialogRef<PasswordInputComponent>) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
