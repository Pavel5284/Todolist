import {TasksStateType} from "../App";
import {v1} from "uuid";
import {
    AddTodolistACType,
    RemoveTodolistsReducerType,
    SetTodolistsACType,
    todolistId1,
    todolistId2
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}

export type  AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}
export type  UpdateTaskActionType = {
    type: 'UPDATE-TASK',
    model: UpdateDomainTaskModelType,
    todolistId: string,
    taskId: string
}
export type  ChangeTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    title: string,
    todolistId: string,
    taskId: string
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: TaskType[]
    todolistId: string
}

type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | ChangeTitleActionType
    | AddTodolistACType
    | RemoveTodolistsReducerType
    | SetTodolistsACType
    | SetTasksActionType

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

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        }
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }

        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                    ? {...task, ...action.model}
                    : task),
            }


        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                    ? {...task, title: action.title}
                    : task)
            }

        }
        case 'ADD-TODOLIST': {
           return {
               ...state,
               [action.payload.todolist.id] : []
           }
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state}
            action.payload.todolists.forEach(tl => {
                copyState[tl.id] = []
            })

            return copyState
        }
            case 'SET-TASKS': {
                const copyState = {...state}
                copyState[action.todolistId] = action.tasks

                return copyState
            }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTasksAC = (tasks: TaskType[], todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId}
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}
export const removeTaskTC = (taskId:string, todolistId:string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                const action = removeTaskAC(taskId, todolistId)
                dispatch(action)
            })
    }
}
export const addTaskTC = (taskTitle:string, todolistId:string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then(res => {
                const action = addTaskAC(res.data.data.item)
                dispatch(action)
            })
    }
}
export const changeTaskStatusTC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
                const action = updateTaskAC(taskId, domainModel, todolistId)
                dispatch(action)
            })
    }

}