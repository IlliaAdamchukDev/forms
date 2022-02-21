import { ActionReducerMap } from '@ngrx/store';
import { fieldNode, fieldReducer } from './field/field.reducer';
import { FieldsState } from '../../shared/interfaces/interfaces';

export interface State {
  [fieldNode]: FieldsState;
}

export const reducers: ActionReducerMap<State, any> = {
  [fieldNode]: fieldReducer,
};
