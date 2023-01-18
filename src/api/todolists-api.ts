import axios, {AxiosResponse} from "axios";
import {GetTasksResponce, LoginParamsType, TaskType, TodolistType, UpdateTaskType} from "./types";
import {ResponseType} from "./types"

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "ab6bfda0-a314-4258-a0ce-28cd6206b79f"
    }

}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})



//api
export const todolistsAPI = {
    getTodolists() {
        const promise =  instance.get<TodolistType[]>("todo-lists")
        return promise;
    },
    createTodolist(title: string) {
        const promise = instance.post<ResponseType<{item: TodolistType}>>("todo-lists",
            {title: title})
        return promise;
    },
    deleteTodolist(todolistId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}`)
        return promise
    },
    updateTodolist(todolistId: string, title: string) {
        const promise =  instance.put<ResponseType>(`todo-lists/${todolistId}`,
            {title})
        return promise
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponce>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle});
    }
}


export const authAPI = {
    login(data: LoginParamsType) {
        const promise = instance.post<LoginParamsType, AxiosResponse<ResponseType<{userId: string}>>>('/auth/login', data);
        return promise

    },
    logout() {
        const promise = instance.delete<ResponseType>('/auth/login');
        return promise

    },
    me() {
        const promise = instance.get<ResponseType<{id: number; email: string; login: string}>>('auth/me');
        return promise;
    }
}

