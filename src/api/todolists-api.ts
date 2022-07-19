import axios, {AxiosResponse} from "axios";

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


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}



type GetTasksResponce = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
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


export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{userId: string}>>>('/auth/login', data);

    },
    logout() {
        return instance.delete<ResponseType>('/auth/login');

    },
    me() {
        const promise = instance.get<ResponseType<{id: number; email: string; login: string}>>('auth/me');
        return promise;
    }
}

//types

export type TodolistType = {
    id:string
    title: string
    addedDate?: string
    order?: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}