import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
    isLoggedIn: false
}
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{error: string | null}>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{status:RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppInitializedAC(state, action: PayloadAction<{isInitialized:boolean}>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer

export const {setAppErrorAC, setAppStatusAC, setAppInitializedAC} = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    //происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType,
    // если произойдёт глобальная ошибка, текст ошибки запишется сюда
    error: string | null,
    //true когда приложение проинициализировалось
    isInitialized: boolean,
    isLoggedIn: boolean
}


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value:true}))
            } else {

            }
            dispatch(setAppInitializedAC({isInitialized:true}))
        })
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>