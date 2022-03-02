

export const createTodo = (data) => {
    console.log(data, "data");
    return {
        type: "ADD_TODO",
        payload: data,
    }
}
export const editTodo = (data) => {
    console.log(data, "data");
    return {
        type: "EDIT_TODO",
        payload: data,
    }
}

export const deleteTodo = (id) => {
    return {
        type: "DELETE_TODO",
        payload: id,
    }
}



