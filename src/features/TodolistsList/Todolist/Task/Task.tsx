import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../api/types";
import {tasksActions} from "../../index";
import {useActions} from "../../../../utils/redux-utils";


type TaskPropsType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const {updateTask, removeTask} = useActions(tasksActions)

    const removeTaskHandler = useCallback(() =>removeTask({taskId: props.task.id, todolistId: props.todolistId}),
        [props.task.id, props.todolistId])

    const onChangeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            taskId:props.task.id,
            domainModel: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New},
            todolistId: props.todolistId
        })
    }, [props.task.id, props.todolistId])

    const updateTaskTitleHandler = useCallback((newValue: string) => {
       updateTask({
           taskId: props.task.id,
           domainModel: {title: newValue},
           todolistId: props.todolistId
       })
    }, [props.task.id, props.todolistId])


    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}
    style={{position: 'relative'}}>
        <Checkbox  onChange={onChangeTaskStatusHandler} checked={props.task.status === TaskStatuses.Completed} color='primary'/>
        <EditableSpan value={props.task.title} onChange={updateTaskTitleHandler}/>
        <IconButton size={'small'} onClick={removeTaskHandler} style={{position: 'absolute', top: '2px', right: '2px'}}>
            <Delete fontSize={'small'}/>
        </IconButton>
    </div>
})