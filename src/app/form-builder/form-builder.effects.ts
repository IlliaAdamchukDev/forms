import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
import { map, take } from 'rxjs';
import { Element } from '../shared/interfaces/interfaces';
import {
  changeChecked,
  changeType
} from './reducers/field/field.actions';
import { FieldsState } from './reducers/field/field.reducer';
import { selectFields } from './reducers/field/field.selectors';

@Injectable()
export class FormBuilderEffects {
  constructor(private actions$: Actions, private store: Store<FieldsState>) {}
  changedId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        changeChecked
      ),
      map((data): Action => {
        let fields!: Element[];
        this.store.pipe(select(selectFields), take(1)).subscribe((val) => {
          fields = val;
        });
        let fieldType = fields.find((el) => el.id === data.id)?.type;
        return changeType({ fieldType: fieldType ?? '' });
      })
    )
  );
}
