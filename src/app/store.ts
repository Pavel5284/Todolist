import {AnyAction, combineReducers} from "redux";
import {todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {ThunkDispatch} from "redux-thunk"
import {useDispatch} from "react-redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type RootReducerType = typeof rootReducer

export type AppRootStateType = ReturnType<RootReducerType>

export const store = configureStore({
    reducer: rootReducer,
})

export type AppDispatch_ = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch

// @ts-ignore
window.store = store