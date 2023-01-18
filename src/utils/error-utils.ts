import {appActions} from "../features/CommonActions/App";
import {ResponseType} from '../api/types'
import {AxiosError} from "axios";

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}

export const handleAsyncServerAppError = <D>(data: ResponseType<D>, thunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(appActions.setAppError({error:data.messages.length ? data.messages[0] : 'Some error occured'}))
    }
    thunkAPI.dispatch(appActions.setAppStatus({status:'failed'}))
    return thunkAPI.rejectWithValue({error: data.messages, fieldsErrors: data.fieldsErrors})
}

export const handleAsyncServerNetworkError = (error: AxiosError, thunkAPI: ThunkAPIType, showError = true) => {
    if (showError) {
        thunkAPI.dispatch(appActions.setAppError({error: error.message ? error.message : 'Some error occured'}))
    }
    thunkAPI.dispatch(appActions.setAppStatus({status:'failed'}))
    return thunkAPI.rejectWithValue({ errors: [error.message], fieldsErrors: undefined})
}