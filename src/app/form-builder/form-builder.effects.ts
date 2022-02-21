import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
import { map, take, switchMap } from 'rxjs';
import {
  IFormElement,
  IFormElementsState,
} from '../shared/interfaces/interfaces';
import {
  changeCheckedElementId,
  changeCheckedElementType,
} from './reducers/form/form.actions';
import { selectFormElements } from './reducers/form/form.selectors';

@Injectable()
export class FormBuilderEffects {
  constructor(
    private actions$: Actions,
    private store: Store<IFormElementsState>
  ) {}
  changedId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeCheckedElementId),
      switchMap((payload) =>
        this.store.select(selectFormElements).pipe(
          map((formElements: IFormElement[]) => {
            return { payload, formElements };
          })
        )
      ),
      map((data): Action => {
        let fieldType = data.formElements.find(
          (el) => el.id === data.payload.id
        )?.fieldType;
        return changeCheckedElementType({ fieldType: fieldType ?? '' });
      })
    )
  );
}
