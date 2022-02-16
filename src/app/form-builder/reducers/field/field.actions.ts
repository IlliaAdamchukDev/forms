import { createAction, props } from "@ngrx/store"
import { FieldStyles } from 'src/app/shared/interfaces/interfaces';

export enum fieldActionsType {
  changeType = '[FIELD] change type',
  changeChecked = '[FIELD] change checked id',
  addField = '[FIELD] add field',
  deleteField = '[FIELD] delete field',
  changeStyles = '[FIELD] change styles',
  changeFormStyles = '[FIELD] change form styles',
  setStateToInitial = '[FIELD] set state to initial',
}

// export class changeTypeAction implements Action {
//   readonly type = fieldActionsType.changeType;
//   constructor(
//     public payload: {
//       type: string;
//     }
//   ) {}
// }

// export class changeCheckedAction implements Action {
//   readonly type = fieldActionsType.changeChecked;
//   constructor(
//     public payload: {
//       id: number;
//     }
//   ) {}
// }

// export class addFieldAction implements Action {
//   readonly type = fieldActionsType.addField;
//   constructor(
//     public payload: {
//       id: number;
//       styles: FieldStyles;
//       type: string;
//     }
//   ) {}
// }

// export class deleteFieldAction implements Action {
//   readonly type = fieldActionsType.deleteField;
//   constructor(
//     public payload: {
//       id: number;
//     }
//   ) {}
// }

// export class changeStylesAction implements Action {
//   readonly type = fieldActionsType.changeStyles;
//   constructor(
//     public payload: {
//       styles: FieldStyles;
//     }
//   ) {}
// }

// export class changeFormStylesAction implements Action {
//   readonly type = fieldActionsType.changeFormStyles;
//   constructor(
//     public payload: {
//       styles: FieldStyles;
//     }
//   ) {}
// }

// export class setStateToInitialAction implements Action {
//   readonly type = fieldActionsType.setStateToInitial;
// }

export const changeType = createAction(
  fieldActionsType.changeType,
  props<{fieldType: string}>()
);

export const changeChecked = createAction(
  fieldActionsType.changeChecked,
  props<{id:number}>()
)

export const addField = createAction(
  fieldActionsType.addField,
  props<{
    id: number,
    styles: FieldStyles,
    fieldType: string
  }>()
)

export const deleteField = createAction(
  fieldActionsType.deleteField,
  props<{id:number}>()
)

export const changeStyles = createAction(
  fieldActionsType.changeStyles,
  props<{styles: FieldStyles}>()
)

export const changeFormStyles = createAction(
  fieldActionsType.changeFormStyles,
  props<{styles: FieldStyles}>()
)

export const setStateToInitial = createAction(
  fieldActionsType.setStateToInitial
)
