import { Component, OnInit } from '@angular/core';
import { query, update } from '@angular/fire/database';
import { ActivatedRoute } from '@angular/router';
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
import { PasswordInputComponent } from '../password-input/password-input.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  routeId: string | null;
  text: string | null = null;
  locked: boolean = false;
  words: number = 0; // Initialize the word count
  characters: number = 0; // Initialize the character count
  password: string = '';
  isPasswordIncorrect: boolean = false;

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {
    this.routeId = this.route.snapshot.paramMap.get('id');
    this.locked = this.route.snapshot.data['content'].locked; // Resolved content
    this.text = this.locked ? '' : this.route.snapshot.data['content'].text;
  }

  ngOnInit() {
    // if (this.locked) {
    //   this.openPasswordInputDialog();
    // }
    console.log(this.routeId);
    this.updateWordAndCharacterCount();
    if (this.routeId) {
      this.checkIfRouteIdExistsInRealtimeDatabase(this.routeId)
        .then((foundText) => {
          if (foundText !== null) {
            this.text = foundText;
            console.log('Route ID exists in Realtime Database');
          } else {
            console.log('Route ID does not exist in Realtime Database');
            this.createADocumentUsingRouteIdInRealtimeDatabase(this.routeId);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      // Set up a real-time listener for changes in the database
      const db = getDatabase();
      const docRef = ref(db, this.routeId);

      // Listen for changes in a specific child ('text' in this case)
      onChildChanged(docRef, (snapshot) => {
        // console.log('Child changed:', snapshot.val());
        if (snapshot.key === 'text') {
          this.text = snapshot.val() || null;

          // Update word and character counts
          this.updateWordAndCharacterCount();
        }
      });
    } else {
      console.error('Route ID is null or undefined');
    }
  }

  createADocumentUsingRouteIdInRealtimeDatabase(routeId: string | null) {
    if (!routeId) {
      console.error('Route ID is null or undefined');
      return;
    }

    // Upload Text to the document with the given 'routeId'
    const db = getDatabase();
    set(ref(db, routeId), {
      text: this.text || '', // Set text to the current value or an empty string
      locked: false,
    })
      .then(() => {
        console.log('Document created successfully');
      })
      .catch((error) => {
        console.error('Error creating document:', error);
      });
  }

  async checkIfRouteIdExistsInRealtimeDatabase(
    routeId: string
  ): Promise<string | null> {
    const db = getDatabase();
    const docRef = ref(db, routeId);

    try {
      const snapshot: DataSnapshot = await get(docRef);
      if (snapshot.exists()) {
        const text = snapshot.val().text || null;
        // console.log('Document found with text:', text);
        return text;
      } else {
        console.log('No such document!');
        return null;
      }
    } catch (error) {
      console.error('Error checking document existence:', error);
      return null;
    }
  }

  uploadText() {
    this.updateWordAndCharacterCount();
    // Upload Text to document with id 'routeId' inside the 'text' collection
    //routeId-> text-> text
    const routeID = this.route.snapshot.paramMap.get('id');
    const db = getDatabase();
    if (routeID) {
      update(ref(db, `${routeID}`), { text: this.text || '' })
        .then(() => {
          console.log('Text updated successfully');
        })
        .catch((error) => {
          console.error('Error updating text:', error);
        });
    } else {
      console.error('Route ID is null or undefined');
    }
  }

  // Tab key functionality
  onTextareaKeydown(event: KeyboardEvent) {
    // Check if the pressed key is Tab
    if (event.key === 'Tab') {
      // Prevent the default Tab behavior (e.g., moving focus to the next element)
      event.preventDefault();

      // Insert a tab character at the current cursor position
      const textarea = event.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Get the text before and after the cursor position
      const textBeforeCursor = textarea.value.substring(0, start);
      const textAfterCursor = textarea.value.substring(end);

      // Combine the text with a tab character at the cursor position
      const newText = textBeforeCursor + '\t' + textAfterCursor;

      // Update the textarea value
      textarea.value = newText;

      // Update the cursor position
      const newCursorPos = start + 1;
      textarea.setSelectionRange(newCursorPos, newCursorPos);

      // Update word and character counts
      this.updateWordAndCharacterCount();
    }
  }

  updateWordAndCharacterCount() {
    if (this.text) {
      // Split the text into words (using spaces as word separators)
      const words = this.text.split(/\s+/).filter((word) => word.trim() !== '');

      // Update the word count
      this.words = words.length;

      // Update the character count
      this.characters = this.text.length;
    } else {
      this.words = 0;
      this.characters = 0;
    }
  }

  openPasswordInputDialog() {
    const dialogRef = this.dialog.open(PasswordInputComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Check the password against the one from ContentResolver
        if (result === this.route.snapshot.data['content'].password) {
          // Password matched, set the text
          this.text = this.route.snapshot.data['content'].text;
          this.locked = false;
          console.log('Password matched');
        } else {
          // Password did not match, display an error or handle as needed
          console.error('Password does not match');
        }
      } else {
        // Handle cancel action
        console.log('Password input dialog canceled');
      }
    });
  }
  checkPassword() {
    const passwordFromResolver = this.route.snapshot.data['content'].password;
    if (this.password === passwordFromResolver) {
      // Password matched, set the text
      this.text = this.route.snapshot.data['content'].text;
      this.locked = false;
    } else {
      // Password did not match, display an error or handle as needed
      this.isPasswordIncorrect = true;
      console.error('Password does not match');
    }
  }
}
