import { getProductsReducers } from "./ProductReducers";
import {combineReducers} from "redux";

const RootReducers = combineReducers({
    getProductsData : getProductsReducers
})

export default RootReducers;