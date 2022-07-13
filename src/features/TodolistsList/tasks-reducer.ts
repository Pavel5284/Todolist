import {TasksStateType} from "../../app/App";
import {v1} from "uuid";
import {
    AddTodolistACType,
    RemoveTodolistsReducerType,
    SetTodolistsACType,
    todolistId1,
    todolistId2
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {
    setAppErrorAC,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";





const initialState: TasksStateType = {
    [todolistId1]: [
        {
            id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todolistId1,
            description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        },
        {
            id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistId1,
            description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        }
    ],
    [todolistId2]: [
        {
            id: v1(), title: "Milk", status: TaskStatuses.Completed, todoListId: todolistId2,
            description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        },
        {
            id: v1(), title: "React Book", status: TaskStatuses.Completed, todoListId: todolistId2,
            description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
        }
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case'REMOVE-TASK':
            return {...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
        case 'UPDATE-TASK':
            return {...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                    ? {...task, ...action.model}
                    : task)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.payload.todolist.id] : []}
        case 'REMOVE-TODOLIST':
            const copyState = {...state};
            delete copyState[action.id]
            return copyState
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.payload.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
            case 'SET-TASKS':
                return {...state, [action.todolistId]: action.tasks}
        default:
            return state;
    }
}
//Actions creaters
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistId
    } as const
}
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        task
    } as const
}
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return {
        type: 'UPDATE-TASK',
        model,
        todolistId,
        taskId,

    } as const
}
export type SetTasksActionType = ReturnType<typeof setTasksAC>
export const setTasksAC = (tasks: TaskType[], todolistId: string) => {
    return {
        type: 'SET-TASKS',
        tasks,
        todolistId
    } as const
}
//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'));
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            })
    }

export const removeTaskTC = (taskId:string, todolistId:string) => (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                const action = removeTaskAC(taskId, todolistId)
                dispatch(action)
            })
    }

export const addTaskTC = (taskTitle:string, todolistId:string) => (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTask(todolistId, taskTitle)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = addTaskAC(res.data.data.item)
                    dispatch(action)
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch);
                }

            })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
    }

export const changeTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId);
        if (!task) {
            console.warn("task not found in the state")
            return;
        }

        const  model: UpdateTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: status,
            title: task.title
        }
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then(res => {
                const action = updateTaskAC(taskId, model, todolistId)
                dispatch(action)
            })
    }


export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state. tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn("task not found in the state")
            return;
        }

        const apiModel: UpdateTaskType = {
            title: task.title,
            status: task.status,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            ...domainModel
        }
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC(taskId, domainModel, todolistId)
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch);

                }
            })
            .catch(error => {
               handleServerNetworkError(error, dispatch);

            })
    }
//types
type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | AddTodolistACType
    | RemoveTodolistsReducerType
    | SetTodolistsACType
    | SetTasksActionType

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>