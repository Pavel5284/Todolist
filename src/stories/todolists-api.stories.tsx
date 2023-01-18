import {useEffect, useState} from "react";
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "ab6bfda0-a314-4258-a0ce-28cd6206b79f"
    }

}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()

        .then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todolistsAPI.createTodolist("Pavel Todolist")
            .then((res) => {
                setState(res.data)
            })
    }, [])
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '4f78fa52-ba73-4a92-b4f1-5744eaab6c69'
       todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '4f78fa52-ba73-4a92-b4f1-5744eaab6c69'
        todolistsAPI.updateTodolist(todolistId, "Pavel Hello")
            .then((res) => {
                setState(res.data)
            })
    }, [])
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")

    const getTasks = () => {

        todolistsAPI.getTasks(todolistId)
            .then((res)=> {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
    <div>
        <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
        <button onClick={getTasks}>get tasks</button>
    </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")

    const deleteTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
            <div>
                <input placeholder={"todlistId"} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
                <input placeholder={"taskId"} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
                <button onClick={deleteTask}> delete task</button>
            </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")
    const [title, setTitle] = useState<string>("title 1")
    const [description, setDescription] = useState<string>("description 1")
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')

    const updateTask = () => {
        todolistsAPI.updateTask(todolistId, taskId, {
            deadline: "",
            description: description,
            priority: priority,
            startDate: "",
            status: status,
            title: title
        })
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
            <div>
                <input placeholder={"todlistId"} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
                <input placeholder={"taskId"} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
                <input placeholder={"title"} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
                <input placeholder={"description"} value={description} onChange={(e) => {setDescription(e.currentTarget.value)}}/>
                <input placeholder={"status"} value={status} type="number" onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
                <input placeholder={"priority"} value={priority} type="number" onChange={(e) => {setPriority(+e.currentTarget.value)}}/>
                {/*<input placeholder={"startDate"} value={startDate} onChange={(e) => {setStartDate(e.currentTarget.value)}}/>
                <input placeholder={"deadline"} value={deadline} onChange={(e) => {setDeadline(e.currentTarget.value)}}/>*/}
                <button onClick={updateTask}> update task</button>
            </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>("")


    const [todolistId, setTodolistId] = useState<string>('')


    const createTask = () => {
        todolistsAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={"Task Title"} value={taskTitle} onChange={(e) => {setTaskTitle(e.currentTarget.value)}}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}