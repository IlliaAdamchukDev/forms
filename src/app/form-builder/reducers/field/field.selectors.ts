import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fieldNode, FieldsState } from './field.reducer';

export const selectFieldFeature =
  createFeatureSelector<{ field: FieldsState }>(fieldNode);

export const selectType = createSelector(selectFieldFeature, (state) => {
  return state.field.type;
});

export const selectCheckedId = createSelector(selectFieldFeature, (state) => {
  return state.field.checkedId;
});

export const selectFields = createSelector(selectFieldFeature, (state) => {
  return state.field.fields;
});
