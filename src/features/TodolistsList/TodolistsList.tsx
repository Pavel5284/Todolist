import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@mui/material";
import {AddItemForm, AddItemFormSubmitHelperType} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "../Auth/selectors";
import {useActions, useAppDispatch, useAppSelector} from "../../utils/redux-utils";
import {todolistsActions} from "./index";


type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {

    const dispatch = useAppDispatch();
    const todolists = useAppSelector(state => state.todolists)
    const tasks = useAppSelector(state => state.tasks)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

      const {fetchTodolists, addTodolist} = useActions(todolistsActions)

      const addTodolistCallback = useCallback(async (title:string, helper: AddItemFormSubmitHelperType) => {
          let thunk = todolistsActions.addTodolist(title)
          const resultAction = await dispatch(thunk)
          if (todolistsActions.addTodolist.rejected.match(resultAction)) {
              if (resultAction.payload?.errors?.length) {
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
        fetchTodolists()
    }, [])


        if (!isLoggedIn) {
            return <Navigate to={"/login"} />
        }
    return (
        <div>

            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={() => {
                }}/>
            </Grid>
                 <Grid container spacing={3} style={{flexWrap: 'nowrap', overflowX: 'scroll'}}>
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