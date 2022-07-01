import React, {useCallback, useEffect, useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    addTodolistAC, addTodolistTC,
    changeFilterAC,
    changeTodolistTitleAC, changeTodolistTitleTC, fetchTodolistTC, FilterValuesType,
    removeTodolistAC, removeTodolistTC, setTodolistsAC, TodolistDomainType,
} from "./state/todolists-reducer";
import {
    addTaskAC, addTaskTC,
    updateTaskAC, changeTaskStatusTC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTaskTC,
    tasksReducer, updateTaskTC
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./state/store";
import {TaskStatuses, TaskType, todolistsAPI} from "./api/todolists-api";



export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export function AppWithRedux() {

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

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;



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

        </div>
    );
}
