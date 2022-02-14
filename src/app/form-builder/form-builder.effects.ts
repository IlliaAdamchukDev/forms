import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, createAction, select } from '@ngrx/store';
import { map, take } from 'rxjs';
import { Field } from '../shared/interfaces/interfaces';
import {
  changeTypeAction,
  fieldActionsType,
} from './reducers/field/field.actions';
import { FieldsState } from './reducers/field/field.reducer';
import { selectFields } from './reducers/field/field.selectors';

@Injectable()
export class FormBuilderEffects {
  constructor(private actions$: Actions, private store$: Store<FieldsState>) {}
  changedId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        createAction(
          fieldActionsType.changeChecked,
          function prepare(id: number) {
            return {
              payload: {
                id: id,
              },
            };
          }
        )
      ),
      map((action) => {
        let fields!: Field[];
        this.store$.pipe(select(selectFields), take(1)).subscribe((val) => {
          fields = val;
        });
        let fieldType = fields.find((el) => el.id === action.payload.id)?.type;
        return new changeTypeAction({ type: fieldType ?? '' });
      })
    )
  );
}
