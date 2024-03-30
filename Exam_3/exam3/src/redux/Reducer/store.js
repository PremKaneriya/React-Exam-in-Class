import { rootReducer } from "./counter.index"
import { createStore, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"

export const configureStore = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk))

    return store
} 