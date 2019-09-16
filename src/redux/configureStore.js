import {createStore, combineReducers} from 'redux';
import { confusionReducer } from './reducer';
import { reducer as modal } from 'redux-modal';

const allReducers = combineReducers({
    confusionReducer: confusionReducer,
    modal: modal
})

export const ConfigureStore = () => {
    const store = createStore(
        allReducers, // reducers
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}