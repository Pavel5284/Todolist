import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: TodolistDomainType[] = []

const slice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{todolistId: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{todolist: TodolistType}>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{id: string, title: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{filter: FilterValuesType, id: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{status: RequestStatusType, id: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        setTodolistsAC(state, action: PayloadAction<{todolists: TodolistType[]}>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
    }
})

//reducer
export const todolistsReducer = slice.reducer

//Action creators

export const {removeTodolistAC, addTodolistAC, changeTodolistTitleAC,
    changeTodolistFilterAC, changeTodolistEntityStatusAC, setTodolistsAC} = slice.actions

//thunks
export const fetchTodolistTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC({todolists:res.data}))
            dispatch(setAppStatusAC({status:'succeeded'}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    dispatch(changeTodolistEntityStatusAC( {status:'loading', id: todolistId}))
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC({todolistId:todolistId}))
            dispatch(setAppStatusAC({status:'succeeded'}))
        })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res. data.resultCode === 0) {
                dispatch(addTodolistAC({todolist:res.data.data.item}))
                dispatch(setAppStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);
        })
}
export const changeTodolistTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.updateTodolist(id, title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC({id: id, title: title}))
                dispatch(setAppStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch);

        })
}

//types
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
