import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistsReducerType, todolistId1, todolistId2} from "./todolists-reducer";

export type RemoveTaskActionType={
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}

export type  AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistId: string
}
export type  ChangeTaskActionType = {
    type: 'CHANGE-TASK-STATUS',
    isDone: boolean,
    todolistId: string,
    taskId: string
}
export type  ChangeTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    title: string,
    todolistId: string,
    taskId: string
}

type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskActionType | ChangeTitleActionType | AddTodolistACType | RemoveTodolistsReducerType

const initialState: TasksStateType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "React Book", isDone: true}
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case'REMOVE-TASK': {
            return {
                ...state,
            [action.todolistId]: state [action.todolistId].filter(task=>task.id!==action.taskId)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }

        }

        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task=> task.id === action.taskId
                    ? {...task, isDone: action.isDone}
                    : task)
            }

        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task=> task.id === action.taskId
                    ? {...task, title: action.title}
                    : task)
            }

        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];

            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy
        }



        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string ): ChangeTaskActionType => {
    return {type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string ): ChangeTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
