import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";

export type FilterValueType = "all" | "completed" | "active";

const App = () => {

    let [tasks, setTasks] = useState<Array<TaskPropsType>>([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ]);
    let [filter, setFilter] = useState<FilterValueType>("active");

    function removeTask(id:number) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    };

    function changeFilter(value: FilterValueType) {
        setFilter(value);
    }

    let tasksForTodolist = tasks;
    if (filter ==="completed"){
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }
    if (filter === "active"){
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }


    return (
        <div className="App">
       <Todolist
           title="What ti learn"
           tasks={tasksForTodolist}
           removeTask={removeTask}
           changeFilter={changeFilter}
       />
</div>
    );
}

export default App;
