import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fieldNode, FieldsState } from './field.reducer';

export const selectFieldFeature = createFeatureSelector<FieldsState>(fieldNode);

export const selectType = createSelector(
  selectFieldFeature,
  (state: FieldsState) => {
    return state.type;
  }
);

export const selectCheckedId = createSelector(
  selectFieldFeature,
  (state: FieldsState) => {
    return state.checkedId;
  }
);

export const selectFields = createSelector(
  selectFieldFeature,
  (state: FieldsState) => {
    return state.fields;
  }
);
