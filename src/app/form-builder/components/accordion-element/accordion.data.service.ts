import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FieldsState } from '../../reducers/field/field.reducer';
import { FieldStyles, Field } from 'src/app/shared/interfaces/interfaces';
import {
  selectCheckedId,
  selectFields,
} from '../../reducers/field/field.selectors';
import { Unsubscriber } from '../../../shared/Unsubscriber/Unsubscriber';
import { startStyles } from 'src/app/shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AccordionDataService extends Unsubscriber {
  public fields!: Field[];
  public id!: number;
  public fieldStyles$ = new Subject<FieldStyles>();

  public id$: Observable<number> = this.store$.pipe(select(selectCheckedId));
  public fields$: Observable<Field[]> = this.store$.pipe(select(selectFields));

  public override notifier = new Subject();
  constructor(private store$: Store<FieldsState>) {
    super();
    this.fields$
      .pipe(takeUntil(this.notifier))
      .subscribe((newFields) => (this.fields = newFields));
    this.id$.pipe(takeUntil(this.notifier)).subscribe((id) => {
      this.id = id;

      let el = this.fields.find((field) => field.id === id);
      this.fieldStyles$.next(
        el?.styles ?? JSON.parse(JSON.stringify(startStyles))
      );
    });
  }
}
