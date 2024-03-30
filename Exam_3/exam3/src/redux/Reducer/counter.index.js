import { counterReducer } from "./counter.reducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers ({
    counter: counterReducer
})