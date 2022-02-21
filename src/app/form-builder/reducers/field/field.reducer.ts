import { createReducer, on } from '@ngrx/store';
import { startStyles } from 'src/app/shared/constants/constants';
import {
  FormElement,
  FieldsState,
  FieldStyles,
} from 'src/app/shared/interfaces/interfaces';
import {
  changeType,
  changeChecked,
  addField,
  deleteField,
  changeStyles,
  changeFormStyles,
  setStateToInitial,
} from 'src/app/form-builder/reducers/field/field.actions';

export const fieldNode = 'field';

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
  on(
    changeType,
    (state: FieldsState, data: { fieldType: string }): FieldsState => ({
      ...state,
      fieldType: data.fieldType,
    })
  ),
  on(
    changeChecked,
    (state: FieldsState, data: { id: number }): FieldsState => ({
      ...state,
      checkedId: data.id,
    })
  ),
  on(addField, (state: FieldsState, data: FormElement): FieldsState => {
    let newStateAdd = JSON.parse(JSON.stringify(state));
    newStateAdd.fields.push(data);
    return newStateAdd;
  }),
  on(deleteField, (state: FieldsState, data: { id: number }): FieldsState => {
    let newStateDel = JSON.parse(JSON.stringify(state));
    newStateDel.fields.splice(
      newStateDel.fields.findIndex((el: FormElement) => el.id === data.id),
      1
    );
    return newStateDel;
  }),
  on(
    changeStyles,
    (state: FieldsState, data: { styles: FieldStyles }): FieldsState => {
      let newStateStyles = JSON.parse(JSON.stringify(state));
      newStateStyles.fields[
        newStateStyles.fields.findIndex(
          (el: FormElement) => el.id === newStateStyles.checkedId
        )
      ].styles = data.styles;
      return newStateStyles;
    }
  ),
  on(
    changeFormStyles,
    (state: FieldsState, data: { styles: FieldStyles }): FieldsState => {
      let newState = JSON.parse(JSON.stringify(state));
      newState.fields[0].styles = data.styles;
      return newState;
    }
  ),
  on(setStateToInitial, () => ({ ...initialState }))
);
