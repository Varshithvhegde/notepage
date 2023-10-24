import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PasswordInputDialogComponent } from '../password-input-dialog/password-input-dialog.component';
import {
  getDatabase,
  ref,
  set,
  get,
  DataSnapshot,
  Database,
  onChildChanged,
  Query,
} from 'firebase/database';
import { query, update } from '@angular/fire/database';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  routeId: string | null | undefined;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Subscribe to route parameter changes and update routeId
        this.routeId = this.route.snapshot.paramMap.get('id');
        console.log('Route ID: ' + this.routeId);
      }
    });
  }
  ngOnInit() {
    // Subscribe to route parameter changes and update routeId
    this.route.paramMap.subscribe((params) => {
      this.routeId = params.get('id');
    });
  }

  sharePage() {
    // OPen share menu of the browser when the share button is clicked
    navigator
      .share({
        title: 'Note Page',
        text: 'Check out this note page',
        url: window.location.href,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  }
  openPasswordInputDialog() {
    const dialogRef = this.dialog.open(PasswordInputDialogComponent, {
      width: '300px', // Set the desired width
    });

    dialogRef.afterClosed().subscribe((result) => {

      // if result == cancel then return
      if (result == 'cancel') {
        return;
      }
      // Handle the result (password input) here
      if (result) {
        // Store the password to realtime db i mean update it
        this.updatePassword(result);
      }
    });
  }
  updatePassword(newPassword: string) {
    console.log('Updating password to: ' + newPassword);
    // Get the route ID
    const routeID = this.routeId;

    // Check if the route ID exists
    if (routeID) {
      // Create a reference to the Firebase Realtime Database
      const db = getDatabase();

      // Define the data object to update the password
      const dataToUpdate = {
        password: newPassword,
        locked : true
      };

      // Update the password in the database
      update(ref(db, routeID), dataToUpdate)
        .then(() => {
          console.log('Password updated successfully');
        })
        .catch((error) => {
          console.error('Error updating password:', error);
        });
    } else {
      console.error('Route ID is null or undefined');
    }
  }
}
