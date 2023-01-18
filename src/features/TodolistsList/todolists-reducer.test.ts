import {
    changeTodolistEntityStatus,
    changeTodolistFilter,
    FilterValuesType,
    slice,
    TodolistDomainType,
} from './todolists-reducer';
import {v1} from 'uuid';
import {RequestStatusType} from "../Application/application-reducer";
import { todolistsActions } from '.';
import {TodolistType} from "../../api/types";

const todolistsReducer = slice.reducer
const {addTodolist, changeTodolistTitle, fetchTodolists, removeTodolist} = todolistsActions

let todolistId1: string = v1();
let todolistId2:string = v1();

let startState: Array<TodolistDomainType> = [
    {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
    {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'}
];


test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, removeTodolist.fulfilled({todolistId:todolistId1}, 'requestId', todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle: TodolistType = {
        title: 'New Todolist',
        id: '',
        order: 0,
        addedDate: ''
    };

    const endState = todolistsReducer(startState, addTodolist.fulfilled({todolist:newTodolistTitle}, 'requestId', newTodolistTitle.title))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle.title);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todolistsReducer(startState, changeTodolistTitle.fulfilled({id:todolistId2, title:newTodolistTitle}, 'requestId', {id:todolistId2, title:newTodolistTitle}));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";


    const action = changeTodolistFilter ( {filter:newFilter, id:todolistId2});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
test ('todolists should be set to the state', () => {
    const action = fetchTodolists.fulfilled({todolists:startState}, 'requestId', undefined)
    const endState = todolistsReducer([], action)

    expect(endState.length).toBe(2)
})



test('correct entity status of todolist should be changed', () => {

    let newStatus: RequestStatusType = "loading";


    const action = changeTodolistEntityStatus ( {status:newStatus, id:todolistId2});

    const endState = todolistsReducer(startState, action);

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});