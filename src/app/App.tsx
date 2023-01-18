import React, {useCallback, useEffect} from 'react';
import './App.css';
import {ErrorSnackbars} from "../components/ErrorSnackbar/ErrorSnackbar";

import MenuIcon from "@mui/icons-material/Menu";
import {Navigate, Route, Routes} from "react-router-dom";
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import {authActions, authSelectors, Login} from "../features/Auth";
import {selectIsInitialized, selectStatus} from "./selectors";
import {useActions, useAppSelector} from "../utils/redux-utils";
import {appActions} from "../features/Application";
import { TodolistsList } from '../features/TodolistsList';


type PropsType = {
    demo?: boolean
}



export function App({demo = false}:PropsType) {

    const status = useAppSelector(selectStatus)
    const isLoggedIn = useAppSelector(authSelectors.selectIsLoggedIn)
    const isInitialized = useAppSelector(selectIsInitialized)


    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(appActions)


    const logoutHandler = useCallback(() => {
        logout()
    }, [])

    useEffect(() => {
        if (!demo) {
            initializeApp()
        }

    }, [])


    if (!isInitialized) {
        return <div  style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
        <CircularProgress/>
        </div>
    }

    return (
            <div className="App">
                    <ErrorSnackbars/>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" >
                                News
                            </Typography>
                            {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                        </Toolbar>
                        {status === 'loading' && <LinearProgress/>}
                    </AppBar>
                    <Container fixed>
                        <Routes>
                            <Route path="/" element={<TodolistsList demo={demo}/>}/>
                            <Route path="/login"   element={<Login/>} />
                            <Route path={'*'} element={<Navigate to={'404'}/>}/>
                            <Route path={'404'} element={<h1 style={{display: 'flex', justifyContent: 'center'}}>
                                404: PAGE NOT FOUND
                            </h1>}/>
                        </Routes>
                    </Container>
            </div>
    );
}



