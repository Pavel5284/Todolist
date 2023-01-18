
import {addTodolist, slice, TodolistDomainType} from "./todolists-reducer";
import {slice as tasksSlice, TasksStateType} from './tasks-reducer'
import {TodolistType} from "../../api/types";

const todolistsReducer = slice.reducer
const tasksReducer = tasksSlice. reducer


test ('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: TodolistDomainType[] = [];

    let todolist: TodolistType = {
        title: '',
        id: '',
        order: 0,
        addedDate: ''
    }

    const action = addTodolist.fulfilled({todolist}, 'requestId', todolist.title);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
})