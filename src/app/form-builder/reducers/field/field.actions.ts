import { Action } from '@ngrx/store';
import { FieldStyles } from 'src/app/shared/interfaces/interfaces';

export enum fieldActionsType {
  changeType = '[FIELD] change type',
  changeChecked = '[FIELD] change checked id',
  addField = '[FIELD] add field',
  deleteField = '[FIELD] delete field',
  changeStyles = '[FIELD] change styles',
  changeFormStyles = '[FIELD] change form styles',
}

export class changeTypeAction implements Action {
  readonly type = fieldActionsType.changeType;
  constructor(
    public payload: {
      type: string;
    }
  ) {}
}

export class changeCheckedAction implements Action {
  readonly type = fieldActionsType.changeChecked;
  constructor(
    public payload: {
      id: number;
    }
  ) {}
}

export class addFieldAction implements Action {
  readonly type = fieldActionsType.addField;
  constructor(
    public payload: {
      id: number;
      styles: FieldStyles;
      type: string;
    }
  ) {}
}

export class deleteFieldAction implements Action {
  readonly type = fieldActionsType.deleteField;
  constructor(
    public payload: {
      id: number;
    }
  ) {}
}

export class changeStylesAction implements Action {
  readonly type = fieldActionsType.changeStyles;
  constructor(
    public payload: {
      styles: FieldStyles;
    }
  ) {}
}

export class changeFormStylesAction implements Action {
  readonly type = fieldActionsType.changeFormStyles;
  constructor(
    public payload: {
      styles: FieldStyles;
    }
  ) {}
}

export type FieldActions =
  | changeTypeAction
  | changeStylesAction
  | addFieldAction
  | deleteFieldAction
  | changeFormStylesAction
  | changeCheckedAction;
