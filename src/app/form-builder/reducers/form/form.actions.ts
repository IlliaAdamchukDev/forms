import { createAction, props } from '@ngrx/store';
import {
  IFormElementStyles,
  IFormElement,
} from '../../../shared/interfaces/interfaces';

export enum formElementsActionsType {
  changeCheckedElementType = '[FIELD] change type',
  changeCheckedElementId = '[FIELD] change checked id',
  addFormElement = '[FIELD] add field',
  deleteFormElement = '[FIELD] delete field',
  changeFormElementStyles = '[FIELD] change styles',
  changeFormSectionStyles = '[FIELD] change form styles',
  setStoreStateToInitial = '[FIELD] set state to initial',
}

export const changeCheckedElementType = createAction(
  formElementsActionsType.changeCheckedElementType,
  props<{ fieldType: string }>()
);

export const changeCheckedElementId = createAction(
  formElementsActionsType.changeCheckedElementId,
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

export const changeFormElementStyles = createAction(
  formElementsActionsType.changeFormElementStyles,
  props<{ styles: IFormElementStyles }>()
);

export const changeFormSectionStyles = createAction(
  formElementsActionsType.changeFormSectionStyles,
  props<{ styles: IFormElementStyles }>()
);

export const setStoreStateToInitial = createAction(
  formElementsActionsType.setStoreStateToInitial
);
