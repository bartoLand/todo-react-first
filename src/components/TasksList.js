import React from 'react';
import Task from './Task'

const TasksList = (props) => {

    const active = props.tasks.filter(task => task.active)
    const done = props.tasks.filter(task => !task.active)

    const activeTasks = active.map(task => <Task key={task.id} task={task} timer={props.timer} pause={props.pause} reset={props.reset} done={props.done} timerZero={props.timerZero} delete={props.delete} />)

    const doneTasks = done.map(task => <Task key={task.id} task={task} timer={props.timer} pause={props.pause} reset={props.reset} done={props.done} timerZero={props.timerZero} delete={props.delete} />)

    return (
        <>
            <div className="active">
                <h2 className="header header-todo">zadania do zrobienia ({activeTasks.length}):</h2>
                {activeTasks.length > 0 ? activeTasks : <p>Zadania zrobione!</p>}
            </div>

            <div className="done">
                <h3 className="header header-done">Zrobione ({doneTasks.length}):</h3>
                {doneTasks}
            </div>
        </>
    );
}

export default TasksList;