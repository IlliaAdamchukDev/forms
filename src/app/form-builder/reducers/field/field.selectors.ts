import { createFeatureSelector, createSelector } from '@ngrx/store';
import { formElementNode } from './field.reducer';
import {
  FormElement,
  FieldFeature,
} from '../../../shared/interfaces/interfaces';

export const selectFieldFeature =
  createFeatureSelector<FieldFeature>(formElementNode);

export const selectType = createSelector(
  selectFieldFeature,
  (state: FieldFeature): string => {
    return state.formElement.fieldType;
  }
);

export const selectCheckedId = createSelector(
  selectFieldFeature,
  (state: FieldFeature): number => {
    return state.formElement.checkedId;
  }
);

export const selectFields = createSelector(
  selectFieldFeature,
  (state: FieldFeature): FormElement[] => {
    return state.formElement.fields;
  }
);
