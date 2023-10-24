// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
// import { getDatabase, ref, get, DataSnapshot } from 'firebase/database';

// @Injectable()
// export class ContentResolver implements Resolve<string | null> {
//   constructor() {}

//   resolve(route: ActivatedRouteSnapshot) {
//     const routeId = route.paramMap.get('id');
//     if (routeId) {
//       const db = getDatabase();
//       const docRef = ref(db, routeId);

//       return get(docRef)
//         .then((snapshot: DataSnapshot) => {
//           if (snapshot.exists()) {
//             return snapshot.val().text || null;
//           } else {
//             return null;
//           }
//         })
//         .catch((error) => {
//           console.error('Error fetching content:', error);
//           return null;
//         });
//     } else {
//       return null;
//     }
//   }
// }


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { getDatabase, ref, get, DataSnapshot } from 'firebase/database';

@Injectable()
export class ContentResolver implements Resolve<{ text: string | null, locked: boolean, password: string | null }> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot) {
    const routeId = route.paramMap.get('id');
    if (routeId) {
      const db = getDatabase();
      const docRef = ref(db, routeId);

      return get(docRef)
        .then((snapshot: DataSnapshot) => {
          if (snapshot.exists()) {
            const text = snapshot.val().text || null;
            const locked = snapshot.val().locked || false;
            const password = snapshot.val().password || null; // Assuming a 'password' field

            return { text, locked, password };
          } else {
            return { text: null, locked: false, password: null };
          }
        })
        .catch((error) => {
          console.error('Error fetching content:', error);
          return { text: null, locked: false, password: null };
        });
    } else {
      return { text: null, locked: false, password: null };
    }
  }
}


