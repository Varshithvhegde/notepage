import { Component, Inject } from '@angular/core';
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
  // items: Observable<any[]>;
  constructor(public database: Database) {}
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
