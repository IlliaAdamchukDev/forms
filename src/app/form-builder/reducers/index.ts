import { ActionReducerMap } from '@ngrx/store';
import { fieldNode, fieldReducer } from 'src/app/form-builder/reducers/field/field.reducer';
import { FieldsState } from 'src/app/shared/interfaces/interfaces';

export interface State {
  [fieldNode]: FieldsState;
}

export const reducers: ActionReducerMap<State, any> = {
  [fieldNode]: fieldReducer,
};
