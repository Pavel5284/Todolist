import React, {useCallback, useEffect} from 'react';
import './App.css';
import {useSelector} from "react-redux";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../features/TodolistsList/tasks-reducer";
import {
    addTodolistTC, changeFilterAC,
    changeTodolistTitleTC, fetchTodolistTC, FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "../features/TodolistsList/todolists-reducer";
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {AppRootStateType, useAppDispatch} from "./store";
import {TaskStatuses, TaskType} from "../api/todolists-api";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export function App() {



    return (
        <div className="App">

            <TodolistsList/>

        </div>
    );
}


const TodolistsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>( state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks)


    useEffect(() => {
        dispatch(fetchTodolistTC())
    }, [])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        const thunk = removeTaskTC(taskId, todolistId);
        dispatch(thunk)
    }, [])
    const addTask = useCallback((title: string, todolistId: string) => {
        const thunk = addTaskTC(title, todolistId);
        dispatch(thunk)
    }, [dispatch])
    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        const  thunk = updateTaskTC(id, {status}, todolistId);
        dispatch(thunk)
    }, [dispatch])
    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(id, {title: newTitle}, todolistId))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeFilterAC(value, todolistId)
        dispatch(action)
    }, [dispatch])
    const removeTodolist = useCallback((id: string) => {
        const thunk = removeTodolistTC(id);
        dispatch(thunk);
    }, [dispatch])
    const changeTodolistTitle = useCallback((id: string, title: string) => {
        const thunk = changeTodolistTitleTC(id, title);
        dispatch(thunk);
    }, [dispatch])



    const addTodolist = useCallback ((title: string) => {
        const thunk = addTodolistTC(title);
        dispatch(thunk);
    }, [dispatch])



    return<>
    <AddItemForm addItem={addTodolist} />

        {todolists.map(tl => {
            let tasksForTodolist = tasks[tl.id];


            return <Todolist
                key={tl.id}
                id={tl.id}
                title={tl.title}
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeStatus}
                filter={tl.filter}
                removeTodolist={removeTodolist}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}
            />
        })
        }
        </>

}
