import {createStore,applyMiddleware} from "redux"
//import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import RootReducers from "./components/Redux/Reducers/Main"

const middleware = [thunk];

const store = createStore(
    RootReducers,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;