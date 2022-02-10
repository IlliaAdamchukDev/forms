import { ActionReducerMap} from '@ngrx/store';
import { fieldNode, FieldsState, fieldReducer } from './field/field.reducer';
import { MetaReducer } from '@ngrx/store';
import { environment } from '../../../environments/environment';

export interface State {
    [fieldNode] : FieldsState;
}

export const reducers: ActionReducerMap<State,any> = {
    [fieldNode] : fieldReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];