import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
import { map, take } from 'rxjs';
import { IFormElement, IFormElementsState } from '../shared/interfaces/interfaces';
import { changeChecked, changeType } from './reducers/field/field.actions';
import { selectFields } from './reducers/field/field.selectors';

@Injectable()
export class FormBuilderEffects {
  constructor(private actions$: Actions, private store: Store<IFormElementsState>) {}
  changedId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeChecked),
      map((data): Action => {
        let fields!: IFormElement[];
        this.store.pipe(select(selectFields), take(1)).subscribe((val) => {
          fields = val;
        });
        let fieldType = fields.find((el) => el.id === data.id)?.fieldType;
        return changeType({ fieldType: fieldType ?? '' });
      })
    )
  );
}
