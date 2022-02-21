import { IFormElementStyles, IDraggableElement } from '../interfaces/interfaces';

export const startStyles: IFormElementStyles = {
  height: '',
  width: '',
  placeholder: '',
  required: false,
  'border-style': '',
  'border-color': '',
  'border-width': '',
  'font-size': '',
  'font-weight': '',
  color: '',
};

export const formElementsArr: IDraggableElement[] = [
  { fieldName: 'input', key: 0 },
  { fieldName: 'textarea', key: 1 },
  { fieldName: 'button', key: 2 },
  { fieldName: 'checkbox', key: 3 },
  { fieldName: 'select', key: 4 },
];
