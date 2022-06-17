import React, {useCallback, useReducer, useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolists-api";



export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export function AppWithRedux() {

    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>( state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks)


    const removeTask = useCallback((id: string, todolistId: string) => {
        const action = removeTaskAC(id, todolistId);
        dispatch(action)
    }, [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        const action = addTaskAC(title, todolistId);
        dispatch(action)
    }, [dispatch])
    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        const  action = changeTaskStatusAC(id, status, todolistId);
        dispatch(action)
    }, [dispatch])
    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeFilterAC(value, todolistId)
        dispatch(action)
    }, [dispatch])
    const removeTodolist = useCallback((id: string) => {
        const action = removeTodolistAC(id);
        dispatch(action);
    }, [dispatch])
    const changeTodolistTitle = useCallback((id: string, title: string) => {
        const action = changeTodolistTitleAC(id, title);
        dispatch(action);
    }, [dispatch])



   const addTodolist = useCallback ((title: string) => {
       const action = addTodolistAC(title);
       dispatch(action);
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
