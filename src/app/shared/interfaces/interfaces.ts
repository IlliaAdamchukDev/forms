export interface FieldStyles {
  height: string;
  width: string;
  placeholder: string;
  required: boolean;
  'border-style': string;
  'border-color': string;
  'border-width': string;
  'font-size': string;
  'font-weight': string;
  color: string;
}

export interface FormElement {
  id: number;
  styles: FieldStyles;
  fieldType: string;
}

export interface DraggableElement {
  fieldName: string;
  key: number;
}

export interface FormValues {
  [key: string | number]: string;
}

export interface FieldsState {
  fields: FormElement[];
  fieldType: string;
  checkedId: number;
}

export interface FieldFeature {
  formElement: FieldsState;
}
