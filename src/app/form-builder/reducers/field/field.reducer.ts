import { createReducer, on } from '@ngrx/store';
import { startStyles } from 'src/app/shared/constants/constants';
import { FieldStyles, FormElement } from 'src/app/shared/interfaces/interfaces';
import {
  changeType,
  changeChecked,
  addField,
  deleteField,
  changeStyles,
  changeFormStyles,
  setStateToInitial,
} from './field.actions';

export const fieldNode = 'field';

export interface FieldsState {
  fields: FormElement[];
  fieldType: string;
  checkedId: number;
}

export const initialState: FieldsState = {
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

export const fieldReducer = createReducer(
  initialState,
  on(changeType, (state, data) => ({ ...state, fieldType: data.fieldType })),
  on(changeChecked, (state, data) => ({ ...state, checkedId: data.id })),
  on(addField, (state, data) => {
    let newStateAdd = JSON.parse(JSON.stringify(state));
    newStateAdd.fields.push(data);
    return newStateAdd;
  }),
  on(deleteField, (state, data) => {
    let newStateDel = JSON.parse(JSON.stringify(state));
    newStateDel.fields.splice(
      newStateDel.fields.findIndex(
        (el: { id: number; styles: FieldStyles }) => el.id === data.id
      ),
      1
    );
    return newStateDel;
  }),
  on(changeStyles, (state, data) => {
    let newStateStyles = JSON.parse(JSON.stringify(state));
    newStateStyles.fields[
      newStateStyles.fields.findIndex(
        (el: { id: number; styles: FieldStyles }) =>
          el.id === newStateStyles.checkedId
      )
    ].styles = data.styles;
    return newStateStyles;
  }),
  on(changeFormStyles, (state, data) => {
    let newState = JSON.parse(JSON.stringify(state));
    newState.fields[0].styles = data.styles;
    return newState;
  }),
  on(setStateToInitial, () => ({ ...initialState }))
);
