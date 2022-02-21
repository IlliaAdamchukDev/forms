import { createFeatureSelector, createSelector } from '@ngrx/store';
import { fieldNode } from 'src/app/form-builder/reducers/field/field.reducer';
import {
  FormElement,
  FieldFeature,
} from 'src/app/shared/interfaces/interfaces';

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
