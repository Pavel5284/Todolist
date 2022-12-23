import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import  {AnyAction} from 'redux'
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = configureStore({
    reducer: rootReducer,
})

//export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export const useAppDispatch: () => AppDispatch = useDispatch

// @ts-ignore
window.store = store