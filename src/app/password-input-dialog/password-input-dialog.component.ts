import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-password-input-dialog',
  templateUrl: './password-input-dialog.component.html',
  styleUrls: ['./password-input-dialog.component.css']
})
export class PasswordInputDialogComponent {
  password: string = '';

  constructor(public dialogRef: MatDialogRef<PasswordInputDialogComponent>) {}
}
