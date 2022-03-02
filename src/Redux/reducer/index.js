import { combineReducers } from "@reduxjs/toolkit";
import { todoReducer } from "./todoReducer";

export const todoReducers = combineReducers({
    todoReducer: todoReducer
});