import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store, select, Action } from '@ngrx/store';
import { tap, take } from 'rxjs';
import { FormElement, FieldsState } from 'src/app/shared/interfaces/interfaces';
import { changeChecked, changeType } from 'src/app/form-builder/reducers/field/field.actions';
import { selectFields } from 'src/app/form-builder/reducers/field/field.selectors';

@Injectable()
export class FormBuilderEffects {
  constructor(private actions$: Actions, private store: Store<FieldsState>) {}
  changedId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeChecked),
      tap((data): Action => {
        let fields!: FormElement[];
        this.store.pipe(select(selectFields), take(1)).subscribe((val) => {
          fields = val;
        });
        let fieldType = fields.find((el) => el.id === data.id)?.fieldType;
        return changeType({ fieldType: fieldType ?? '' });
      })
    )
  );
}
