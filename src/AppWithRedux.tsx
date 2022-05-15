import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    addTodolistAC,
    changeFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export function AppWithRedux() {


    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, TodolistType[]>( state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>( state => state.tasks)



    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatch(action)
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId);
        dispatch(action)
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const  action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action)
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeFilterAC(value, todolistId)
        dispatch(action)
    }




    function removeTodolist(id: string) {
        const action = removeTodolistAC(id);
        dispatch(action);
    }
    function changeTodolistTitle(id: string, title: string) {
       const action = changeTodolistTitleAC(id, title);
        dispatch(action);
    }



    function addTodolist(title: string) {
       const action = addTodolistAC(title);
        dispatch(action);
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {
                todolists.map(tl => {
                    let allTodolistTasks = tasks[tl.id];
                    let tasksForTodolist = allTodolistTasks;

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                    }

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
