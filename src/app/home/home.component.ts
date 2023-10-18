import { Component, OnInit } from '@angular/core';
import { query } from '@angular/fire/database';
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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  routeId: string | null;
  text: string | null = null;
  words: number = 0; // Initialize the word count
  characters: number = 0; // Initialize the character count

  constructor(private route: ActivatedRoute) {
    this.routeId = this.route.snapshot.paramMap.get('id');
    this.text = this.route.snapshot.data['content']; // Resolved content
  }

  ngOnInit() {
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
        this.text = snapshot.val() || null;

        // Update word and character counts
        this.updateWordAndCharacterCount();
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
      locked : false
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
        console.log('Document found with text:', text);
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
      set(ref(db, routeID), {
        text: this.text,
      })
        .then(() => {
          console.log('Document created successfully');
        })
        .catch((error) => {
          console.error('Error creating document:', error);
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

      // Insert a tab character into the textarea
      const textarea = event.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Insert a tab character at the current cursor position
      const newText =
        textarea.value.substring(0, start) +
        '\t' +
        textarea.value.substring(end);
      this.text = newText;

      // Update the cursor position
      textarea.selectionStart = textarea.selectionEnd = start + 1;

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
}
