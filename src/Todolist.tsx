import React from "react";
import {FilterValueType} from "./App";

 export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValueType) => void
}

export const Todolist=  (props: TodolistPropsType) =>  {
    debugger
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((t) =>{
                    return (
                    <li><input type="checkbox" checked={t.isDone}></input>
                        <span>{t.title}</span>
                        <button onClick={() => {props.removeTask(t.id)}}>x</button>
                </li>
                )
                })}



            </ul>
            <div>
                <button onClick={() => {props.changeFilter("all")}}>All</button>
                <button onClick={() => {props.changeFilter("active")}}>Active</button>
                <button onClick={() => {props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    )
}