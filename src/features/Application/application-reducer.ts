import {authAPI} from "../../api/todolists-api";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authActions} from "../Auth";
import {appActions} from "../CommonActions/App";


export const initializeApp = createAsyncThunk('app/initializeApp', async (param, thunkAPI) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        thunkAPI.dispatch(authActions.setIsLoggedIn({value: true}))
    } else {

    }
})

export const asyncActions = {
    initializeApp
}


export const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isInitialized = true
            })
            .addCase(appActions.setAppStatus, (state, action) => {
                state.status = action.payload.status
            })
            .addCase(appActions.setAppError, (state, action) => {
                state.error = action.payload.error
            })
    }
})

export const applicationReducer = slice.reducer

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    //происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType,
    // если произойдёт глобальная ошибка, текст ошибки запишется сюда
    error: string | null,
    //true когда приложение проинициализировалось
    isInitialized: boolean
}


