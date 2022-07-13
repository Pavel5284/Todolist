import React from 'react';
import './App.css';
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "./TodolistsList";
import {CustomizedSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";
import {AppBar, Button, Container, Grid, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "../features/TodolistsList/Todolist/Todolist";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

export function App({demo = false}:PropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>((state => state.app.status))
    return (
        <div className="App">

            <div>
                <CustomizedSnackbars/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <TodolistsList demo={demo}/>

                </Container>

            </div>



        </div>
    );
}



