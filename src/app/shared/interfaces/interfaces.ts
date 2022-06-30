export interface IFormElementStyles {
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

export interface IFormElement {
  id: number;
  styles: IFormElementStyles;
  fieldType: string;
}

export interface IDraggableElement {
  fieldName: string;
  key: number;
}

export interface IFormValues {
  [key: string | number]: string;
}

export interface IFormElementsState {
  fields: IFormElement[];
  fieldType: string;
  checkedId: number;
}

export interface IFormElementFeature {
  formElement: IFormElementsState;
}
