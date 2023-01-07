import {TasksStateType} from "../../app/App";
import {addTodolistTC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import exp from "constants";
import {TodolistType} from "../../api/todolists-api";

test ('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: TodolistDomainType[] = [];

    let todolist: TodolistType = {
        title: '',
        id: '',
    }

    const action = addTodolistTC.fulfilled({todolist}, 'requestId', {title:todolist.title});

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
})