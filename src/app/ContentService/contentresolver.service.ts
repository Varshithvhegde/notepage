import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { getDatabase, ref, get, DataSnapshot } from 'firebase/database';

@Injectable()
export class ContentResolver implements Resolve<string | null> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot) {
    const routeId = route.paramMap.get('id');

    if (routeId) {
      const db = getDatabase();
      const docRef = ref(db, routeId);

      return get(docRef)
        .then((snapshot: DataSnapshot) => {
          if (snapshot.exists()) {
            return snapshot.val().text || null;
          } else {
            return null;
          }
        })
        .catch((error) => {
          console.error('Error fetching content:', error);
          return null;
        });
    } else {
      return null;
    }
  }
}
