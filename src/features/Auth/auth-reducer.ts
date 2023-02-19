import {authAPI,} from "../../api/todolists-api";

import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FieldErrorType, LoginParamsType} from "../../api/types";
import {appActions} from "../CommonActions/App";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";

const {setAppStatus} = appActions

export const login = createAsyncThunk<undefined, LoginParamsType, {
    rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }
}>('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await authAPI.login(param)
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error as AxiosError, thunkAPI);
    }
})

export const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatus({status: 'loading'}))
    const res = await authAPI.logout()
    try {
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatus({status: 'succeeded'}))
            return {value: false}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error as AxiosError, thunkAPI);
    }
})

export const asyncActions = {
    login,
    logout
}

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false
            })
    }
})
export const authReducer = slice.reducer



