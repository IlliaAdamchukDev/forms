import { createFeatureSelector, createSelector } from '@ngrx/store';
import { formElementNode } from './form.reducer';
import {
  IFormElement,
  IFormElementFeature,
} from '../../../shared/interfaces/interfaces';

export const selectFormElementFeature =
  createFeatureSelector<IFormElementFeature>(formElementNode);

export const selectType = createSelector(
  selectFormElementFeature,
  (state: IFormElementFeature): string => {
    return state.formElement.fieldType;
  }
);

export const selectCheckedId = createSelector(
  selectFormElementFeature,
  (state: IFormElementFeature): number => {
    return state.formElement.checkedId;
  }
);

export const selectFormElements = createSelector(
  selectFormElementFeature,
  (state: IFormElementFeature): IFormElement[] => {
    return state.formElement.fields;
  }
);
