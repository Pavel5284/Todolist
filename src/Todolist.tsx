import React from "react";

 export type TaskPropsType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    task: Array<TaskPropsType>
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
                {props.task.map((el) =>{
                    debugger
                    return (
                    <li><input type="checkbox" checked={el.isDone}></input><span>{el.title}</span></li>
                )
                })}



            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Complete</button>
            </div>
        </div>
    )
}