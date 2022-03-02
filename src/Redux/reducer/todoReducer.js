
const initialState = {
    Todo: []
}
export const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case "DELETE_TODO":
            debugger;
            const deleteTodo = state.Todo.filter(todo => todo.id !== action.payload)
            return {
                ...state,
                Todo: deleteTodo
            }
        case "EDIT_TODO":
            let index = state.Todo.findIndex(todo => todo.id === action.payload.id);
            return {
                ...state,
                Todo: [
                    ...state.Todo.slice(0, index),
                    action.payload,
                    ...state.Todo.slice(index + 1)
                ]
            }

        case "ADD_TODO":
            return {
                ...state,
                Todo: [action.payload, ...state.Todo]
            }
        default:
            return state;
    }
};
