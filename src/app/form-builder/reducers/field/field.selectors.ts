import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fieldNode, FieldsState } from './field.reducer';
import { FormElement } from '../../../shared/interfaces/interfaces';

export const selectFieldFeature =
  createFeatureSelector<{ field: FieldsState }>(fieldNode);

export const selectType = createSelector(
  selectFieldFeature,
  (state: { field: FieldsState }): string => {
    return state.field.fieldType;
  }
);

export const selectCheckedId = createSelector(
  selectFieldFeature,
  (state: { field: FieldsState }): number => {
    return state.field.checkedId;
  }
);

export const selectFields = createSelector(
  selectFieldFeature,
  (state: { field: FieldsState }): FormElement[] => {
    return state.field.fields;
  }
);
