import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class Unsubscriber {
  notifier = new Subject();
  ngOnDestroy() {
    this.notifier.next(false);
    this.notifier.complete();
  }
}
