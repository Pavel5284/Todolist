import {Provider} from "react-redux";
import * as React from "react";
import {AppRootStateType, store} from "./store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
<<<<<<< HEAD
import {todolistId1, todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
=======
import {todolistsReducer} from "./todolists-reducer";
import {v1} from "uuid";
>>>>>>> c63cd4c7e8abcfaedb972b3ee90da3158e48a524

const rootReducer =  combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

<<<<<<< HEAD
const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0},
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
=======
const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"},
    ],
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
>>>>>>> c63cd4c7e8abcfaedb972b3ee90da3158e48a524
        ]
    }
}

<<<<<<< HEAD
export const storyBookStore = createStore(rootReducer, initialGlobalState)
=======
export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType)
>>>>>>> c63cd4c7e8abcfaedb972b3ee90da3158e48a524

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}