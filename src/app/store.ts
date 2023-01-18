import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {todolistsReducer, tasksReducer} from "../features/TodolistsList";
import { appReducer } from "../features/Application";
import { authReducer } from "../features/Auth";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})


// @ts-ignore
window.store = store