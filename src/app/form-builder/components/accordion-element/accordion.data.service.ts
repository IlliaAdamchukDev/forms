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
  selectFields,
} from '../../reducers/field/field.selectors';
import { Unsubscriber } from '../../../shared/unsubscriber/unsubscriber';
import { startStyles } from '../../../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AccordionDataService extends Unsubscriber {
  public formElements!: IFormElement[];
  public id!: number;
  public formElementStyles$ = new Subject<IFormElementStyles>();
  public id$: Observable<number> = this.store.select(selectCheckedId);
  public formElements$: Observable<IFormElement[]> = this.store.select(selectFields);

  constructor(private store: Store<IFormElementsState>) {
    super(); 
  }

  ngOnInit() {
    this.formElements$
      .pipe(takeUntil(this.notifier$))
      .subscribe((newFormElements) => (this.formElements = newFormElements));

    this.id$.pipe(takeUntil(this.notifier$)).subscribe((id) => {
      this.id = id;
      let el = this.formElements.find((formElement) => formElement.id === id);
      this.formElementStyles$.next(
        el?.styles ?? JSON.parse(JSON.stringify(startStyles))
      );
    });
  }
}
