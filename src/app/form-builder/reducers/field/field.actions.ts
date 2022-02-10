import { Action } from '@ngrx/store';
import { FieldStyles } from './field.reducer';

export enum fieldActionsType {
    inputClick = "[FIELD] input clicked",
    areaClick = "[FIELD] area clicked",
    buttonClick = "[FIELD] button click",
    checkboxClick = "[FIELD] checkbox click",
    selectClick = "[FIELD] select click",
    addField = "[FIELD] add field",
    deleteField = "[FIELD] delete field",
    changeStyles = "[FIELD] change styles",
    changeFormStyles = "[FIELD] change form styles"
}

export class inputClickAction implements Action {
    readonly type = fieldActionsType.inputClick;
    constructor (public payload : {
        id : number;
    }) {}
}

export class buttonClickAction implements Action {
    readonly type = fieldActionsType.buttonClick;
    constructor (public payload : {
        id : number;
    }) {}
}

export class areaClickAction implements Action {
    readonly type = fieldActionsType.areaClick;
    constructor (public payload : {
        id : number;
    }) {}
}

export class checkboxClickAction implements Action {
    readonly type = fieldActionsType.checkboxClick;
    constructor (public payload : {
        id : number;
    }) {}
}

export class selectClickAction implements Action {
    readonly type = fieldActionsType.selectClick;
    constructor (public payload : {
        id : number;
    }) {}
}

export class addFieldAction implements Action {
    readonly type = fieldActionsType.addField;
    constructor (
        public payload : {
            id : number;
            styles : FieldStyles;
            type : string;
        }
    ) {}
}

export class deleteFieldAction implements Action {
    readonly type = fieldActionsType.deleteField;
    constructor (
        public payload : {
            id : number;
        }
    ) {}
}

export class changeStylesAction implements Action {
    readonly type = fieldActionsType.changeStyles;
    constructor (
        public payload : {
            styles : FieldStyles
        }
    ) {}
}

export class changeFormStylesAction implements Action {
    readonly type = fieldActionsType.changeFormStyles;
    constructor (
        public payload : {
            styles : FieldStyles
        }
    ) {}
}


export type FieldActions = inputClickAction 
    | buttonClickAction 
    | areaClickAction 
    | checkboxClickAction 
    | selectClickAction 
    | changeStylesAction
    | addFieldAction
    | deleteFieldAction
    | changeFormStylesAction