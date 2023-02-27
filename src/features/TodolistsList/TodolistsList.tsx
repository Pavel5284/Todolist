import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@mui/material";
import {AddItemForm, AddItemFormSubmitHelperType} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "../Auth/selectors";
import {useActions, useAppDispatch} from "../../utils/redux-utils";
import {todolistsActions} from "./index";
import { useSelector } from "react-redux";
import { AppRootStateType } from "../../utils/types";
import {TodolistDomainType} from "./todolists-reducer";
import { TasksStateType } from "./tasks-reducer";


type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {

    const dispatch = useAppDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector(selectIsLoggedIn)

      const {fetchTodolists, addTodolist} = useActions(todolistsActions)

      const addTodolistCallback = useCallback(async (title:string, helper: AddItemFormSubmitHelperType) => {
          let thunk = todolistsActions.addTodolist(title)
          const resultAction = await dispatch(thunk)
          if (todolistsActions.addTodolist.rejected.match(resultAction)) {
              if (resultAction.payload?.errors.length) {
                  const errorMessgae = resultAction.payload?.errors[0]
                  helper.setError(errorMessgae)
              } else {
                  helper.setError('Some error occured')
              }
          } else {
              helper.setTitle('')
          }
      }, [])

    useEffect(() => {
           if (demo || !isLoggedIn) {
               return;
           }
        if (!todolists.length) {
            fetchTodolists()
        }
    }, [])


        if (!isLoggedIn) {
            return <Navigate to={"/login"} />
        }
    return (
        <div>

            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolistCallback}/>
            </Grid>
                 <Grid container spacing={3} style={{flexWrap: 'wrap'}}>
                {todolists.map(tl => {
                    let allTodolistsTasks = tasks[tl.id];
                    return <Grid item key={tl.id}>
                        <Paper style={{width: '300px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistsTasks}
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