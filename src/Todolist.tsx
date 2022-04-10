import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpant";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    filter: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    /*let [title, setTitle] = useState("")*/

    /*let [error, setError] = useState<string | null>(null)*/



  /*  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }*/

    /*const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }*/
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }
    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
            props.changeTodolistTitle(props.id, newTitle)
        }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        {/*<div>
            <input value={title}
                   onChange={ onChangeHandler }
                   onKeyPress={ onKeyPressHandler }
                   className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>*/}
        <ul>
            {
                props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id)
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={ onAllClickHandler }>All</button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={ onActiveClickHandler }>Active</button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}

