import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

export const initialState: InitialStateType = {
    status: 'idle',
    error: '',
    isInitialized: false,
    isLoggedIn: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    //происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType,
    // если произойдёт глобальная ошибка, текст ошибки запишется сюда
    error: string | null,
    //true когда приложение проинициализировалось
    isInitialized: boolean,
    //true когда пользователь залогинен
    isLoggedIn: boolean
}

export const setAppErrorAC = (error: string | null) => ({type:'APP/SET-ERROR', error} as const)
export const setAppStatusAC = (status:RequestStatusType) => ({type:'APP/SET-STATUS', status}as const)
export const setAppInitializedAC = (value:boolean) => ({type:'APP/SET-IS-INITIALIZED', value}as const)

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            } else {

            }
            dispatch(setAppInitializedAC(true))
        })
}

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setAppInitializedActionType = ReturnType<typeof setAppInitializedAC>
type ActionsType = SetAppErrorActionType |  SetAppStatusActionType | setAppInitializedActionType