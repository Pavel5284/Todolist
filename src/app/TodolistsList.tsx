import React, {useCallback, useEffect} from "react";
import {AppRootStateType, useAppDispatch} from "./store";
import {useSelector} from "react-redux";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "../features/TodolistsList/todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../features/TodolistsList/tasks-reducer";
import {TaskStatuses} from "../api/todolists-api";
import {RequestStatusType} from "./app-reducer";
import {CustomizedSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {TasksStateType} from "./App";


type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const dispatch = useAppDispatch();
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    useEffect(() => {
        if (demo) {
            return;
        }
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
        const thunk = updateTaskTC(id, {status}, todolistId);
        dispatch(thunk)
    }, [dispatch])
    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(id, {title: newTitle}, todolistId))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(value, todolistId)
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


    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title);
        dispatch(thunk);
    }, [dispatch])


    return (
        <div>

                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={5}>
                    {todolists.map(tl => {
                        let tasksForTodolist = tasks[tl.id];


                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    todolist={tl}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    demo={demo}
                                />
                            </Paper>

                        </Grid>

                    })
                    }

                </Grid>


        </div>
    )
}