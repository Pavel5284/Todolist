import {TasksStateType} from "../App";
import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import exp from "constants";

test ('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: TodolistDomainType[] = [];

    const action = addTodolistAC({
        title: '',
        id: ''
    });

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
})