import { ActionReducerMap } from '@ngrx/store';
import { formElementNode, fieldReducer } from './field/field.reducer';
import { IFormElementsState } from '../../shared/interfaces/interfaces';

export interface State {
  [formElementNode]: IFormElementsState;
}

export const reducers: ActionReducerMap<State, any> = {
  [formElementNode]: fieldReducer,
};
