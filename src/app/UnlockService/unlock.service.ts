import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UnlockService {

  private unlockRequest = new Subject<void>();

  unlockRequest$ = this.unlockRequest.asObservable();

  requestUnlock() {
    this.unlockRequest.next();
  }
}
