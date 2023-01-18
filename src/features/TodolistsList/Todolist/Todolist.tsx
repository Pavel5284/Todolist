import React, {useCallback, useEffect} from 'react';
import {AddItemForm, AddItemFormSubmitHelperType} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';

import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";

import {Delete} from "@mui/icons-material";
import {useActions, useAppDispatch} from "../../../utils/redux-utils";
import {TaskStatuses, TaskType} from '../../../api/types';
import {Button, IconButton, Paper} from '@mui/material';
import {tasksActions, todolistsActions} from '..';
import {Task} from './Task/Task';


type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    demo?: boolean
}

type ButtonColorType = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';

export const Todolist = ({demo = false, ...props}: PropsType) => {
      const {changeTodolistFilter, removeTodolist, changeTodolistTitle} = useActions(todolistsActions)
    const {fetchTasks} = useActions(tasksActions)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (demo) {
            return;
        }
        fetchTasks(props.todolist.id)

    }, [])

    const addTaskCallback = useCallback(async (taskTitle: string, helper: AddItemFormSubmitHelperType) => {


        const resultAction = await dispatch(tasksActions.addTask({
            taskTitle: taskTitle,
            todolistId: props.todolist.id
        }))
                if (tasksActions.addTask.rejected.match(resultAction)) {
                    if (resultAction.payload?.errors.length) {
                        const errorMessage = resultAction.payload.errors[0]
                        helper.setError(errorMessage)
                    } else {
                        helper.setError('Some error occured')
                    }
                } else {
                    helper.setTitle('')
                }
    }, [props.todolist.id])

    const removeTodolistHandler = () => {
        removeTodolist(props.todolist.id)

    }
    const changeTodolistTitleCallback = useCallback((title: string) => {
        changeTodolistTitle({id: props.todolist.id, title})
    }, [props.todolist.id])

    const changeFilterHandler = useCallback((filter: FilterValuesType) => {changeTodolistFilter({
        filter: filter,
        id: props.todolist.id
    })}, [props.todolist.id])

          let tasksForTodolist = props.tasks;

        if (props.todolist.filter === "active") {
            tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
        }
        if (props.todolist.filter === "completed") {
            tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
        }
    const renderFilterButton = (buttonFilter: FilterValuesType,
                                color: ButtonColorType,
                                text: string) => {
        return <Button variant={props.todolist.filter === buttonFilter ? 'outlined' : 'text'}
                       onClick={() => changeFilterHandler(buttonFilter)}
                       color={color}
        >{text}</Button>
    }

    return <Paper style={{padding: '10px', position: 'relative'}}>
        <IconButton
            size={'small'}
            onClick={removeTodolistHandler} disabled={props.todolist.entityStatus === 'loading'}
            style={{position: 'absolute', right: '5px', top: '5px'}}
        >
            <Delete fontSize={'small'}/>
        </IconButton>
        <h3>
            <EditableSpan value={props.todolist.title} onChange={changeTodolistTitleCallback}/>
        </h3>
        <AddItemForm addItem={addTaskCallback} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
               {
                tasksForTodolist.map(t => <Task key={t.id} task={t} todolistId={props.todolist.id}/>)
            }
            {!tasksForTodolist.length && <div style={{padding: '10px', color: 'grey'}}>No task</div>}
        </div>
        <div style={{paddingTop: '10px'}}>
            {renderFilterButton('all', 'inherit', 'All')}
            {renderFilterButton('active', 'primary', 'Active')}
            {renderFilterButton('completed', 'secondary', 'Completed')}
        </div>

    </Paper>
}

