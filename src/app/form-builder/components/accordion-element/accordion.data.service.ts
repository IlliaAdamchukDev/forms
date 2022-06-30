import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  IFormElementStyles,
  IFormElement,
  IFormElementsState,
} from '../../../shared/interfaces/interfaces';
import {
  selectCheckedId,
  selectFormElements,
} from '../../reducers/form/form.selectors';
import { Unsubscriber } from '../../../shared/unsubscriber/unsubscriber';
import { startStyles } from '../../../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AccordionDataService extends Unsubscriber {
  public formElements!: IFormElement[];
  public formElementStyles$ = new Subject<IFormElementStyles>();
  public id$: Observable<number> = this.store.select(selectCheckedId);
  public formElements$: Observable<IFormElement[]> =
    this.store.select(selectFormElements);

  constructor(private store: Store<IFormElementsState>) {
    super();
    this.formElements$
      .pipe(takeUntil(this.notifier$))
      .subscribe((newFormElements) => (this.formElements = newFormElements));

    this.id$.pipe(takeUntil(this.notifier$)).subscribe((id) => {
      let el = this.formElements.find((formElement) => formElement.id === id);
      this.formElementStyles$.next(
        el?.styles ?? JSON.parse(JSON.stringify(startStyles))
      );
    });
  }
}
