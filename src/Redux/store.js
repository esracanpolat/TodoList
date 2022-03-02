import { createStore, applyMiddleware } from "redux";
//import { persistStore, persistReducer } from 'redux-persist'
//import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import { todoReducers } from "./reducer";


// const persistConfig = {
//     key: 'root',
//     storage: storage,
//     whitelist: ['nuevo'] 
// };
// const persistedReducer = persistReducer(persistConfig, reducers)
export default function configureStore(initialState = {}) {
    return createStore(todoReducers, initialState, applyMiddleware(thunk))
}