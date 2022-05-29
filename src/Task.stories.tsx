
import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskType} from "./Todolist";

export default {
    title: 'Task Component',
    component: Task
}

const changeTaskStatusCallback = action("Status changed");
const changeTaskTitleCallback = action("Title changed");
const removeTaskCallback = action("Task removed");


export const TaskBaseExample = (props: any) => {
    return <>
    <Task
        task={{id:'1', isDone: true, title: 'CSS'}}
        changeTaskStatus={changeTaskStatusCallback}
        changeTaskTitle={changeTaskTitleCallback}
        removeTask={removeTaskCallback}
        todolistId={"todolistId1"}
    />
    <Task
        task={{id:'2', isDone: false, title: 'JS'}}
        changeTaskTitle={changeTaskStatusCallback}
        changeTaskStatus={changeTaskTitleCallback}
        removeTask={removeTaskCallback}
        todolistId={"todolistId2"}
    />
    </>
}