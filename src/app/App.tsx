import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {CustomizedSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import { logoutTC } from '../features/Login/auth-reducer';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

export function App({demo = false}:PropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>((state => state.app.status))
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])


    if (!isInitialized) {
        return <div  style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
        <CircularProgress/>
        </div>
    }

    return (
        <BrowserRouter>
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
                                News1
                            </Typography>
                            {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                        </Toolbar>
                        {status === 'loading' && <LinearProgress/>}
                    </AppBar>
                    <Container fixed>
                        <Routes>
                            <Route path="/" element={<TodolistsList/>}/>
                            <Route path="/login" element={<Login/>} />
                        </Routes>


                    </Container>

                </div>



            </div>
        </BrowserRouter>

    );
}



