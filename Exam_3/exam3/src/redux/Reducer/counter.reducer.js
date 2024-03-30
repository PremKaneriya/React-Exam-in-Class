import { DECREMENT, INCREMENT } from "../ActionType"

const initialState = {
    count: 0,
    isLoading: false,
    error: null
}

export const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + 1
            }
        case DECREMENT:
            return {
                count: state.count - 1
            }
        default:
            return state
    }
}