import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  FieldStyles,
  FormElement,
  FieldsState,
} from '../../../shared/interfaces/interfaces';
import {
  selectCheckedId,
  selectFields,
} from '../../reducers/field/field.selectors';
import { Unsubscriber } from './../../../shared/unsubscriber/unsubscriber';
import { startStyles } from '../../../shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AccordionDataService extends Unsubscriber {
  public fields!: FormElement[];
  public id!: number;
  public fieldStyles$ = new Subject<FieldStyles>();
  public id$: Observable<number> = this.store.select(selectCheckedId);
  public fields$: Observable<FormElement[]> = this.store.select(selectFields);

  constructor(private store: Store<FieldsState>) {
    super();
  }

  ngOnInit() {
    this.fields$
      .pipe(takeUntil(this.notifier$))
      .subscribe((newFields) => (this.fields = newFields));
    this.id$.pipe(takeUntil(this.notifier$)).subscribe((id) => {
      this.id = id;

      let el = this.fields.find((field) => field.id === id);
      this.fieldStyles$.next(
        el?.styles ?? JSON.parse(JSON.stringify(startStyles))
      );
    });
  }
}
