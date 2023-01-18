import {v1} from "uuid";
import {todolistsAPI} from "../../api/todolists-api";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError,
} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {ThunkError} from "../../utils/types";
import {appActions} from "../CommonActions/App";
import { TodolistType } from "../../api/types";
import { RequestStatusType } from "../Application";


export let todolistId1 = v1();
export let todolistId2 = v1();

const {setAppStatus} = appActions

export const fetchTodolists = createAsyncThunk<{ todolists: TodolistType[] }, undefined, ThunkError>
('todolists/fetchTodolists', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTodolists()
        thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
        return {todolists: res.data}
    } catch (error) {
        return handleAsyncServerNetworkError(error as AxiosError, thunkAPI)
    }
})

export const removeTodolist = createAsyncThunk<{ todolistId: string }, string, ThunkError>
('todolists/removeTodolist', async (todolistId, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatus({id: todolistId, status: 'loading'}))
    const res = await todolistsAPI.deleteTodolist(todolistId)
    thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
    return {todolistId: todolistId}
})

export const addTodolist = createAsyncThunk<{ todolist: TodolistType }, string, ThunkError>
('todolists/addTodolist', async (title, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(title)

        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {todolist: res.data.data.item}
        } else {
           return handleAsyncServerAppError(res.data, thunkAPI, false);
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error as AxiosError, thunkAPI, false)
    }
})

export const changeTodolistTitle = createAsyncThunk
('todolists/changeTodolistTitle', async (param: { id: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.updateTodolist(param.id, param.title)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {id: param.id, title: param.title}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error as AxiosError, thunkAPI, false);
    }
})

export const asyncActions = {
    fetchTodolists,
    removeTodolist,
    addTodolist,
    changeTodolistTitle
}


export const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilter(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
            return state
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ status: RequestStatusType, id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
            return state
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.todolistId)
                if (index > -1) {
                    state.splice(index, 1)
                }
                return state
            })
            .addCase(addTodolist.fulfilled, (state, action) => {
                 state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
                return state
            })
            .addCase(changeTodolistTitle.fulfilled, (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].title = action.payload.title
                return state
            })
    }
})

export const {
    changeTodolistFilter, changeTodolistEntityStatus
} = slice.actions


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
