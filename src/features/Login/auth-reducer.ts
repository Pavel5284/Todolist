import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError} from "../../utils/error-utils";


const initialState: AuthInitialStateType = {
    isLoggedIn: false
}
export type AuthInitialStateType = {
    isLoggedIn: boolean
}

export const authReducer = (state: AuthInitialStateType = initialState, action: ActionsType): AuthInitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state;
    }
}
//Actions creaters
export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN',
        value
    } as const
}
//thunks
export const loginTC = (data: LoginParamsType) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
              handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerAppError(error, dispatch)
        })
}
export const logoutTC = () => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
              handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerAppError(error, dispatch)
        })
}

//types
type ActionsType = SetIsLoggedInActionType

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>
