import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FieldsState } from '../../reducers/field/field.reducer';
import { FieldStyles } from 'src/app/shared/interfaces/interfaces';
import {
  selectCheckedId,
  selectFields,
} from '../../reducers/field/field.selectors';

@Injectable({
  providedIn: 'root',
})
export class AccordionDataService {
  fields!: [{ id: number; styles: FieldStyles; type: string }];
  id!: number;
  fieldStyles$ = new Subject<FieldStyles>();

  id$: Observable<number> = this.store$.pipe(select(selectCheckedId));
  fields$: Observable<[{ id: number; styles: FieldStyles; type: string }]> =
    this.store$.pipe(select(selectFields));

  notifier = new Subject();
  constructor(private store$: Store<FieldsState>) {
    this.fields$
      .pipe(takeUntil(this.notifier))
      .subscribe((newFields) => (this.fields = newFields));
    this.id$.pipe(takeUntil(this.notifier)).subscribe((id) => {
      this.id = id;

      let el = this.fields.find((field) => field.id === id);
      this.fieldStyles$.next(
        el?.styles ?? {
          height: '',
          width: '',
          placeholder: '',
          required: false,
          'border-style': '',
          'border-color': '#000',
          'border-width': '',
          'font-size': '',
          'font-weight': '',
          color: '',
        }
      );
    });
  }

  ngOnDestroy() {
    this.notifier.next(false);
    this.notifier.complete();
  }
}
