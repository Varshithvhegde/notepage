import { Component, Inject, inject } from '@angular/core';
import { Analytics, logEvent } from '@angular/fire/analytics';
import { Database, onValue, ref } from '@angular/fire/database';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'notecode';
  // console.log('Hello world');
  // Get a data with key "hello" from firebase realtime database
  itemValue = '';
  private analytics: Analytics = inject(Analytics);
  // items: Observable<any[]>;
  constructor(public database: Database) {
    // log event to firebase analytics
    logEvent(this.analytics, 'app_component_loaded');
  }
  getData() {
    // Get a data with key "hello" from firebase realtime database
    // this.database.app.name = "hello";
    const newref = ref(this.database, 'hello');
    onValue(newref, (snapshot) => {
      console.log(snapshot.val());
    });
  }
  ngOnInit(){
    // this.getData();
  }
}
