import { createReducer, on } from '@ngrx/store';
import { startStyles } from '../../../shared/constants/constants';
import {
  IFormElement,
  IFormElementsState,
  IFormElementStyles,
} from '../../../shared/interfaces/interfaces';
import {
  changeType,
  changeChecked,
  addFormElement,
  deleteFormElement,
  changeStyles,
  changeFormStyles,
  setStateToInitial,
} from './form.actions';

export const formElementNode = 'formElement';

export const initialState: IFormElementsState = {
  fields: [
    {
      id: -1,
      styles: JSON.parse(JSON.stringify(startStyles)),
      fieldType: 'form',
    },
  ],
  fieldType: '',
  checkedId: -1,
};

export const formElementReducer = createReducer(
  initialState,
  on(
    changeType,
    (
      state: IFormElementsState,
      data: { fieldType: string }
    ): IFormElementsState => ({
      ...state,
      fieldType: data.fieldType,
    })
  ),
  on(
    changeChecked,
    (state: IFormElementsState, data: { id: number }): IFormElementsState => ({
      ...state,
      checkedId: data.id,
    })
  ),
  on(
    addFormElement,
    (state: IFormElementsState, data: IFormElement): IFormElementsState => {
      let newStateAdd = JSON.parse(JSON.stringify(state));
      newStateAdd.fields.push(data);
      return newStateAdd;
    }
  ),
  on(
    deleteFormElement,
    (state: IFormElementsState, data: { id: number }): IFormElementsState => {
      let newStateDel = JSON.parse(JSON.stringify(state));
      newStateDel.fields.splice(
        newStateDel.fields.findIndex((el: IFormElement) => el.id === data.id),
        1
      );
      return newStateDel;
    }
  ),
  on(
    changeStyles,
    (
      state: IFormElementsState,
      data: { styles: IFormElementStyles }
    ): IFormElementsState => {
      let newStateStyles = JSON.parse(JSON.stringify(state));
      newStateStyles.fields[
        newStateStyles.fields.findIndex(
          (el: IFormElement) => el.id === newStateStyles.checkedId
        )
      ].styles = data.styles;
      return newStateStyles;
    }
  ),
  on(
    changeFormStyles,
    (
      state: IFormElementsState,
      data: { styles: IFormElementStyles }
    ): IFormElementsState => {
      let newState = JSON.parse(JSON.stringify(state));
      newState.fields[0].styles = data.styles;
      return newState;
    }
  ),
  on(setStateToInitial, () => ({ ...initialState }))
);
