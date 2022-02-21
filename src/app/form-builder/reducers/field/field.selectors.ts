import { createFeatureSelector, createSelector } from '@ngrx/store';
import { formElementNode } from './field.reducer';
import {
  IFormElement,
  IFormElementFeature,
} from '../../../shared/interfaces/interfaces';

export const selectFieldFeature =
  createFeatureSelector<IFormElementFeature>(formElementNode);

export const selectType = createSelector(
  selectFieldFeature,
  (state: IFormElementFeature): string => {
    return state.formElement.fieldType;
  }
);

export const selectCheckedId = createSelector(
  selectFieldFeature,
  (state: IFormElementFeature): number => {
    return state.formElement.checkedId;
  }
);

export const selectFields = createSelector(
  selectFieldFeature,
  (state: IFormElementFeature): IFormElement[] => {
    return state.formElement.fields;
  }
);
