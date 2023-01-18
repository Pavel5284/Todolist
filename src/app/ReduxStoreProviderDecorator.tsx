import {Provider} from "react-redux";
import * as React from "react";
import {combineReducers} from "redux";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {todolistId1} from "../features/TodolistsList/todolists-reducer";
import {v1} from "uuid";
import {applicationReducer} from "../features/Application/application-reducer";
import {authReducer} from "../features/Auth/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {HashRouter} from "react-router-dom";
import {AppRootStateType, RootReducerType} from "../utils/types";
import { todolistsReducer } from "../features/TodolistsList";
import {TaskPriorities, TaskStatuses} from "../api/types";

const rootReducer: RootReducerType =  combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: applicationReducer,
    auth: authReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'loading'},
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.New,
                todoListId: "todolistId1",
                description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "JS", status: TaskStatuses.New,
                todoListId: "todolistId1",
                description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.New,
                todoListId: "todolistId2",
                description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: v1(), title: "Beer", status: TaskStatuses.New,
                todoListId: "todolistId2",
                description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        ]
    },
    app: {
        error: null,
        status: 'succeeded',
        isInitialized: true
    },
    auth: {
         isLoggedIn: true
    },
}

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState
})

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}

export const BrowserRouterDecorator = (storyFn: any) => (
    <HashRouter>{storyFn()}
    </HashRouter>
)