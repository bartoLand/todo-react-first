import React from 'react';

const Task = (props) => {
    const { name, note, time, id, clockOn, active, reset } = props.task

    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    //time that passed from clicking start
    const passed = reset - time;
    let passMinutes = Math.floor(passed / 60);
    let passSeconds = passed % 60;

    if (active) {
        return (
            <div className='task'>
                <p className='task-name'>{name}</p>
                {/* time */}

                {time === -1 ? props.timerZero(id) : null}

                <div className='time'>{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</div>
                <p className='note'>{note}</p>

                {/* buttons */}
                {clockOn ? <div>
                    <button onClick={() => props.done(id)}>Zrobione</button>
                    {time > 0 ? <button onClick={() => props.pause()}>Pauza</button> : null}
                    <button onClick={() => props.reset(id)}>Reset</button>
                </div> :
                    <div>
                        <button onClick={() => props.timer(id)}>Start</button>
                    </div>}
            </div>
        );
    } else {
        return (
            <div className='taskDone'>
                <span className='done-text'>{name} - poświęcony czas: {passMinutes < 10 ? "0" + passMinutes : passMinutes}:{passSeconds < 10 ? "0" + passSeconds : seconds} </span> <button className='btnDelete' onClick={() => props.delete(id)}>X</button>
            </div>
        )
    }
}

export default Task;