import { ActionReducerMap } from '@ngrx/store';
import { formElementNode, fieldReducer } from './field/field.reducer';
import { FieldsState } from '../../shared/interfaces/interfaces';

export interface State {
  [formElementNode]: FieldsState;
}

export const reducers: ActionReducerMap<State, any> = {
  [formElementNode]: fieldReducer,
};
