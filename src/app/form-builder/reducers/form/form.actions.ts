import { createAction, props } from '@ngrx/store';
import {
  IFormElementStyles,
  IFormElement,
} from '../../../shared/interfaces/interfaces';

export enum formElementsActionsType {
  changeType = '[FIELD] change type',
  changeChecked = '[FIELD] change checked id',
  addFormElement = '[FIELD] add field',
  deleteFormElement = '[FIELD] delete field',
  changeStyles = '[FIELD] change styles',
  changeFormStyles = '[FIELD] change form styles',
  setStateToInitial = '[FIELD] set state to initial',
}

export const changeType = createAction(
  formElementsActionsType.changeType,
  props<{ fieldType: string }>()
);

export const changeChecked = createAction(
  formElementsActionsType.changeChecked,
  props<{ id: number }>()
);

export const addFormElement = createAction(
  formElementsActionsType.addFormElement,
  props<IFormElement>()
);

export const deleteFormElement = createAction(
  formElementsActionsType.deleteFormElement,
  props<{ id: number }>()
);

export const changeStyles = createAction(
  formElementsActionsType.changeStyles,
  props<{ styles: IFormElementStyles }>()
);

export const changeFormStyles = createAction(
  formElementsActionsType.changeFormStyles,
  props<{ styles: IFormElementStyles }>()
);

export const setStateToInitial = createAction(
  formElementsActionsType.setStateToInitial
);
