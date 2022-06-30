import { ActionReducerMap } from '@ngrx/store';
import { formElementNode, formElementReducer } from './form/form.reducer';
import { IFormElementsState } from '../../shared/interfaces/interfaces';

export interface State {
  [formElementNode]: IFormElementsState;
}

export const reducers: ActionReducerMap<State, any> = {
  [formElementNode]: formElementReducer,
};
