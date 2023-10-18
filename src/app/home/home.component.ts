import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getDatabase, ref, set, get, DataSnapshot } from 'firebase/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  routeId: string | null;
  text: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.routeId = this.route.snapshot.paramMap.get('id');
    this.text = this.route.snapshot.data['content']; // Resolved content
  }

  ngOnInit() {
    console.log(this.routeId);

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
    })
      .then(() => {
        console.log('Document created successfully');
      })
      .catch((error) => {
        console.error('Error creating document:', error);
      });
  }

  async checkIfRouteIdExistsInRealtimeDatabase(routeId: string): Promise<string | null> {
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
}
