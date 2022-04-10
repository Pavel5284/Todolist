import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import AddItemForm from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>> ([
        {
            id: todolistId1,
            title: "What to learn",
            filter: "active"
        },
        {
            id: todolistId2,
            title: "What to buy",
            filter: "completed"
        }
    ]);

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Juice", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Cheese", isDone: false}
        ]

    });

    function removeTask(id: string, todolistId: string) {

        setTasks({...tasksObj, [todolistId]: tasksObj[todolistId].filter(el => el.id !== id)})

       /* let tasks = tasksObj[todolistId];

        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj [todolistId] = filteredTasks;
        setTasks({...tasksObj});*/
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {id:v1(), title: title, isDone: false}
        setTasks({...tasksObj, [todolistId] : [newTask,...tasksObj[todolistId]]})

        /*let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todolistId];

        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({...tasksObj});*/
    }


    function changeFilter(value: FilterValuesType, todolistId: string) {

        setTodolists(todolists.map(el => el.id === todolistId ? {...el, filter: value} : el))

       /* let todolist = todolists.find(tl => tl.id === todolistId);
        if(todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }*/
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {

        setTasks({...tasksObj, [todolistId]: tasksObj[todolistId].map(el =>
                el.id === id ? {...el, isDone: isDone} : el)})

       /* let tasks = tasksObj[todolisId];
        let task = tasks.find(t => t.id === id);

        if (task) {
            task.isDone = isDone;
            setTasks({...tasksObj});
        }*/
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {

        setTasks({...tasksObj, [todolistId]: tasksObj[todolistId].map(el =>
                el.id === id ? {...el, title: newTitle} : el)})

       /* let tasks = tasksObj[todolisId];
        let task = tasks.find(t => t.id === id);

        if (task) {
            task.title = title;
            setTasks({...tasksObj});
        }*/
    }

    function changeTodolistTitle(id: string, newTitle: string) {

       /* setTodolists([...todolists, [newTitle]:
        todolists.find(tl => tl.id === id ? {...tl, title:newTitle})])*/

      /*  setTodolists([...todolists, [newTitle]:
        todolists.find(tl => tl.id === id ? {...tl, title:newTitle}:tl)])*/

       /* setTodolists([...todolists,
            todolists.map(tl => tl.id === id ? {...tl, title:newTitle}:tl)])*/

       /* setTodolists([...todolists,
            ...todolists.map(tl => tl.id === id ? {...tl, title:newTitle}:tl)])*/

        setTodolists(todolists.map(tl => tl.id === id ? {...tl, title: newTitle} : tl))

       /*const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }*/
    }



    let removeTodolist = (todolistsId: string) => {
        setTodolists(todolists.filter(tl => tl.id !==todolistsId))
        const tasksCopy = {...tasksObj}
        delete tasksCopy[todolistsId]
        setTasks(tasksCopy)
       /* let filteredTodolist = todolists.filter(tl => tl.id !== todolistsId)
        setTodolists(filteredTodolist);
        delete tasksObj[todolistsId];
        setTasks({...tasksObj});*/
    }

 let addTodolist = (title: string) => {
        let newTodolistId = v1();
        let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasksObj, [newTodolistId]: []})
 }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {

                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }

                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }

        </div>
    );
}

export default App;
