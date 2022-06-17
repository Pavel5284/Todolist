import {
    addTodolistAC, changeFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {strict} from "assert";

let todolistId1: string = v1();
let todolistId2:string = v1();

let startState: Array<TodolistDomainType> = [
    {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0},
    {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
];

/*beforeEach(() => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    startState = [

    ]
})*/

test('correct todolist should be removed', () => {



    //const endState = todolistsReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId})
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";


   // const endState = todolistsReducer(startState, { type: 'ADD-TODOLIST', title: newTodolistTitle})
    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";


    const action = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todolistId2,
        title: newTodolistTitle
    };

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});


test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";


    const action = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todolistId2,
        filter: newFilter
    };

    const endState = todolistsReducer(startState, changeFilterAC( newFilter, todolistId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
