import { Component, Input , Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UnlockService } from '../UnlockService/unlock.service';
@Component({
  selector: 'app-password-input-dialog',
  templateUrl: './password-input-dialog.component.html',
  styleUrls: ['./password-input-dialog.component.css']
})
export class PasswordInputDialogComponent {
  // @Input()
  password: string = '';
  passwordFieldType: string = 'password';
  showPasswordIcon: string = 'visibility';
  // @Input()
  locked : boolean = false;
  constructor(public dialogRef: MatDialogRef<PasswordInputDialogComponent>, @Inject(MAT_DIALOG_DATA) public data  : {locked : boolean,password : string},private passwordService: UnlockService) {
    this.locked = data.locked;
    this.password = data.password;
  }
  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    this.showPasswordIcon = this.showPasswordIcon === 'visibility' ? 'visibility_off' : 'visibility';
  }
  unlock() {
    // Call the unlock request when the "unlock" icon is clicked
    this.passwordService.requestUnlock();
  }
}
