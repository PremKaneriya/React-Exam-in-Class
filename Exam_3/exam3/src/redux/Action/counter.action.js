import { DECREMENT, INCREMENT } from "../ActionType"

export const increment = () => (dispatch) => {
    dispatch({type: INCREMENT})
}

export const decrement = () => (dispatch) => {
    dispatch({type: DECREMENT})
}