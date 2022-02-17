import { createAction, props } from '@ngrx/store';
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

export const changeType = createAction(
  fieldActionsType.changeType,
  props<{ fieldType: string }>()
);

export const changeChecked = createAction(
  fieldActionsType.changeChecked,
  props<{ id: number }>()
);

export const addField = createAction(
  fieldActionsType.addField,
  props<{
    id: number;
    styles: FieldStyles;
    fieldType: string;
  }>()
);

export const deleteField = createAction(
  fieldActionsType.deleteField,
  props<{ id: number }>()
);

export const changeStyles = createAction(
  fieldActionsType.changeStyles,
  props<{ styles: FieldStyles }>()
);

export const changeFormStyles = createAction(
  fieldActionsType.changeFormStyles,
  props<{ styles: FieldStyles }>()
);

export const setStateToInitial = createAction(
  fieldActionsType.setStateToInitial
);
