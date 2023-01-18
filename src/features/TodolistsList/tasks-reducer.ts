import {asyncActions as asyncTodolistsActions} from "./todolists-reducer";
import {todolistsAPI} from "../../api/todolists-api";
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TaskPriorities, TaskStatuses, TaskType, UpdateTaskType} from "../../api/types";
import {AppRootStateType, ThunkError} from "../../utils/types";
import {appActions} from "../CommonActions/App";
import {AxiosError} from "axios";

const initialState: TasksStateType = {}

export const fetchTasks = createAsyncThunk<{ tasks: TaskType[], todolistId: string }, string, ThunkError>('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTasks(todolistId)
        const tasks = res.data.items
        thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {tasks, todolistId}
    } catch (error) {
        return handleAsyncServerNetworkError(error as AxiosError, thunkAPI)
    }

})

export const removeTask = createAsyncThunk<{ taskId: string, todolistId: string }, { taskId: string, todolistId: string }, ThunkError>('tasks/removeTask',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)
        thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
        return {taskId: param.taskId, todolistId: param.todolistId}
    })

export const addTask = createAsyncThunk<TaskType, { taskTitle: string, todolistId: string }, ThunkError>('tasks/addTask',
    async (param, thunkAPI) => {
        thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
        const res = await todolistsAPI.createTask(param.todolistId, param.taskTitle)
        try {
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
                return res.data.data.item
            } else {
                handleAsyncServerAppError(res.data, thunkAPI, false)
                return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (err) {
            return handleAsyncServerNetworkError(err as AxiosError, thunkAPI, false)
        }
    })

export const updateTask = createAsyncThunk('tasks/updateTask', async (param: { taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string }, thunkAPI) => {
    const state = thunkAPI.getState() as AppRootStateType;
    const task = state.tasks[param.todolistId].find(t => t.id === param.taskId)
    if (!task) {
        return thunkAPI.rejectWithValue('task not found in the state')
    }

    const apiModel: UpdateTaskType = {
        title: task.title,
        status: task.status,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        ...param.domainModel
    }
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return param
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI);
        }
    } catch (error) {
        return handleAsyncServerNetworkError(error as AxiosError, thunkAPI);
    }
})

export const asyncActions = {
    fetchTasks,
    removeTask,
    addTask,
    updateTask
}


export const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(asyncTodolistsActions.addTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        .addCase(asyncTodolistsActions.removeTodolist.fulfilled, (state, action) => {
            delete state[action.payload.todolistId]
        })
        .addCase(asyncTodolistsActions.fetchTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
        .addCase(removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
        .addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload)
        })
        .addCase(updateTask.fulfilled, (state, action) => {
            if (action.payload) {
                const tasks = state[action.payload.todolistId]
                const index = tasks.findIndex(t => t.id === action.payload!.taskId)
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel}
                }
            }

        })
    }
})

export const tasksReducer = slice.reducer

//types

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}