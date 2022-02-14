import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class Unsubscriber {
  public notifier = new Subject();
  ngOnDestroy():void {
    this.notifier.next(false);
    this.notifier.complete();
  }
}
