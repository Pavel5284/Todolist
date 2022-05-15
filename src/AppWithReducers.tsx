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

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export function AppWithReducers() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer,[
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatchToTasksReducer(action)
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId);
        dispatchToTasksReducer(action)
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        const  action = changeTaskStatusAC(id, isDone, todolistId);
        dispatchToTasksReducer(action)
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
      dispatchToTasksReducer(changeTaskTitleAC(id, newTitle, todolistId))
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeFilterAC(value, todolistId)
        dispatchToTodolistsReducer(action)
    }




    function removeTodolist(id: string) {
        const action = removeTodolistAC(id);
        dispatchToTasksReducer(action);
        dispatchToTodolistsReducer(action);
    }
    function changeTodolistTitle(id: string, title: string) {
       const action = changeTodolistTitleAC(id, title);
       dispatchToTodolistsReducer(action);
    }



    function addTodolist(title: string) {
       const action = addTodolistAC(title);
       dispatchToTasksReducer(action);
       dispatchToTodolistsReducer(action);
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
