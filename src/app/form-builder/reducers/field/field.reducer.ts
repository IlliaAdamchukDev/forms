import { createReducer, on } from '@ngrx/store';
import { startStyles } from 'src/app/shared/constants/constants';
import { FieldStyles, Element } from 'src/app/shared/interfaces/interfaces';
import { changeType, changeChecked, addField, deleteField, changeStyles, changeFormStyles, setStateToInitial } from './field.actions';

export const fieldNode = 'field';

export interface FieldsState {
  fields: Element[];
  type: string;
  checkedId: number;
}

export const initialState: FieldsState = {
  fields: [
    {
      id: -1,
      styles: JSON.parse(JSON.stringify(startStyles)),
      type: 'form',
    },
  ],
  type: '',
  checkedId: -1,
};

export const fieldReducer = createReducer(
    initialState, 
    on(
      changeType,
      (state, data) => ({...state, type: data.fieldType})
    ),
    on(
      changeChecked,
      (state, data) => ({...state, checkedId: data.id})
    ),
    on(
      addField,
      (state, data) => {
        let newStateAdd = JSON.parse(JSON.stringify(state));
        newStateAdd.fields.push(data);
        return newStateAdd;
      }
    ),
    on (
      deleteField,
      (state, data) => {
        let newStateDel = JSON.parse(JSON.stringify(state));
        newStateDel.fields.splice(
          newStateDel.fields.findIndex(
            (el: { id: number; styles: FieldStyles }) =>
              el.id === data.id
          ),
          1
        );
        return newStateDel;
      }
    ),
    on(
      changeStyles,
      (state, data) => {
        let newStateStyles = JSON.parse(JSON.stringify(state));
        newStateStyles.fields[
          newStateStyles.fields.findIndex(
            (el: { id: number; styles: FieldStyles }) =>
              el.id === newStateStyles.checkedId
          )
        ].styles = data.styles;
        return newStateStyles;
      }
    ),
    on(
      changeFormStyles,
      (state, data) => {
        let newState = JSON.parse(JSON.stringify(state));
        newState.fields[0].styles = data.styles;
        return newState;
      }
    ),
    on(
      setStateToInitial,
      (state) => ({...initialState})
    )
  )

// export const fieldReducer = (state = initialState, action: Actions) => {
//   switch (action.type) {
//     case fieldActionsType.changeType:
//       return {
//         ...state,
//         type: action.props.type,
//       };
//     case fieldActionsType.changeChecked:
//       return {
//         ...state,
//         checkedId: action.payload.id,
//       };
//     case fieldActionsType.addField:
//       let newStateAdd = JSON.parse(JSON.stringify(state));
//       newStateAdd.fields.push(action.payload);
//       return newStateAdd;
//     case fieldActionsType.deleteField:
//       let newStateDel = JSON.parse(JSON.stringify(state));
//       newStateDel.fields.splice(
//         newStateDel.fields.findIndex(
//           (el: { id: number; styles: FieldStyles }) =>
//             el.id === action.payload.id
//         ),
//         1
//       );
//       return newStateDel;
//     case fieldActionsType.changeStyles:
//       let newStateStyles = JSON.parse(JSON.stringify(state));
//       newStateStyles.fields[
//         newStateStyles.fields.findIndex(
//           (el: { id: number; styles: FieldStyles }) =>
//             el.id === newStateStyles.checkedId
//         )
//       ].styles = action.payload.styles;
//       return newStateStyles;
//     case fieldActionsType.changeFormStyles:
//       let newState = JSON.parse(JSON.stringify(state));
//       newState.fields[0].styles = action.payload.styles;
//       return newState;
//     case fieldActionsType.setStateToInitial:
//       return JSON.parse(JSON.stringify(initialState));
//     default:
//       return {
//         ...state,
//       };
//   }
// };
