import { FieldActions, fieldActionsType } from "./field.actions";

export const fieldNode = 'field';

export interface FieldStyles {
    'height' : string,
    'width' : string,
    'placeholder' : string,
    'required' : boolean,
    'border-style' : string,
    'border-color' : string,
    'border-width' : string,
    'font-size' : string,
    'font-weight' : string,
    'color' : string
}

export interface FieldsState {
    fields : [{
        id : number;
        styles : FieldStyles;
        type : string;
    }]
    type : string;
    checkedId : number;
} 

export const initialState:FieldsState = {
    fields : [
        {
            id : -1,
            styles : {
                'height' : "",
                'width' : "",
                'placeholder' : "",
                'required' : false,
                'border-style' : "",
                'border-color' : "",
                'border-width' : "",
                'font-size' : "",
                'font-weight' : "",
                'color' : ""
            },
            type : "form"
        }
    ],
    type : "",
    checkedId: -1
}

export const fieldReducer = (state = initialState, action: FieldActions) => {
    switch (action.type) {
        case fieldActionsType.inputClick:
            return {
                ...state,
                type: 'input',
                checkedId: action.payload.id
            }
        case fieldActionsType.areaClick:
            return {
                ...state,
                type: 'textarea',
                checkedId: action.payload.id
            }
        case fieldActionsType.buttonClick:
            return {
                ...state,
                type: 'button',
                checkedId: action.payload.id
            }
        case fieldActionsType.checkboxClick:
            return {
                ...state,
                type: 'checkbox',
                checkedId: action.payload.id
            }
        case fieldActionsType.selectClick:
            return {
                ...state,
                type: 'select',
                checkedId: action.payload.id
            }
        case fieldActionsType.addField:
            let newStateAdd = JSON.parse(JSON.stringify(state));
            newStateAdd.fields.push(action.payload);
            return newStateAdd
        case fieldActionsType.deleteField:
            let newStateDel = JSON.parse(JSON.stringify(state));
            newStateDel.fields.splice(newStateDel.fields.findIndex((el : {id : number, styles : FieldStyles})=>(el.id === action.payload.id)),1);
            return newStateDel
        case fieldActionsType.changeStyles:
            let newStateStyles = JSON.parse(JSON.stringify(state));
            newStateStyles.fields[
                newStateStyles.fields.findIndex(
                    (el : {id : number, styles : FieldStyles}) => el.id === newStateStyles.checkedId
                )
            ].styles = action.payload.styles;
            return newStateStyles
        case fieldActionsType.changeFormStyles:
            let newState = JSON.parse(JSON.stringify(state));
            newState.fields[0].styles = action.payload.styles;
            return newState   
        default:
            return { 
                ...state
            }
    }
}