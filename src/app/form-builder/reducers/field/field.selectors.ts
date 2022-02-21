import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fieldNode } from './field.reducer';
import {
  FormElement,
  FieldFeature,
} from '../../../shared/interfaces/interfaces';

export const selectFieldFeature =
  createFeatureSelector<FieldFeature>(fieldNode);

export const selectType = createSelector(
  selectFieldFeature,
  (state: FieldFeature): string => {
    return state.field.fieldType;
  }
);

export const selectCheckedId = createSelector(
  selectFieldFeature,
  (state: FieldFeature): number => {
    return state.field.checkedId;
  }
);

export const selectFields = createSelector(
  selectFieldFeature,
  (state: FieldFeature): FormElement[] => {
    return state.field.fields;
  }
);
