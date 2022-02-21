import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export abstract class Unsubscriber {
  public notifier$ = new Subject();
  ngOnDestroy(): void {
    this.notifier$.next(false);
    this.notifier$.complete();
  }
}
