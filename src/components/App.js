import React, { Component } from 'react';
import './App.css';
import AddTask from './AddTask'
import TasksList from './TasksList'
import soundfile from '../sound/alertsound.mp3'

class App extends Component {
  counter = 3
  state = {
    tasks: [
      {
        id: 0,
        name: "zrobić pranie",
        time: 30 * 60,
        reset: 30 * 60,
        note: "włożyć wszystko do pralki",
        active: true,
        clockOn: false,
      },
      {
        id: 1,
        name: "zagrać w kosza",
        time: 60 * 60,
        reset: 60 * 60,
        note: "zadzwonić do znajomych",
        active: true,
        clockOn: false,
      }
    ]
  }

  handleClickStart = (id) => {
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex(task => task.id === id);
    const task = tasks[index];
    tasks.forEach(task => {
      clearInterval(this.state.interval)
      task.clockOn = false;
    })
    task.clockOn = true

    const interval = setInterval(() => {
      task.time = task.time - 1;
      this.setState({
        tasks
      })
    }, 1000);
    this.setState({
      interval: interval
    })
  }

  handleClickDone = (id) => {
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex(task => task.id === id);
    const task = tasks[index];
    clearInterval(this.state.interval)
    task.clockOn = false;
    task.active = false;

    this.setState({
      tasks
    })
  }

  handleClickPause = () => {
    const tasks = [...this.state.tasks];
    tasks.forEach((task) => {
      clearInterval(this.state.interval)
      task.clockOn = false;
      this.setState({
        tasks
      })
    })
  }

  handleClickReset = (id) => {
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex(task => task.id === id);
    const task = tasks[index];
    clearInterval(this.state.interval)
    task.clockOn = false;
    task.time = task.reset
    this.setState({
      tasks
    })
  }

  handleDelete = (id) => {
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex(task => task.id === id);
    tasks.splice(index, 1)
    this.setState({
      tasks
    })
  }

  // function when timer is 00:00

  timerZero = (id) => {
    let audio = new Audio(soundfile);
    audio.play()
    const tasks = [...this.state.tasks];
    const index = tasks.findIndex(task => task.id === id);
    const task = tasks[index];
    clearInterval(this.state.interval)
    task.time = 0;
    this.setState({
      tasks
    })
  }

  addTask = (name, time, note) => {
    const tasks = [...this.state.tasks];
    tasks.forEach(task => {
      clearInterval(this.state.interval)
      task.clockOn = false;
    })

    const newTask = {
      id: this.counter,
      name: name,
      time: time * 60,
      reset: time * 60,
      note: note,
      active: true,
      clockOn: false,
    }
    this.counter++;
    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTask]
    }))
    return true
  }

  render() {
    return (
      <div className="app">
        <div className="header main">ToDo lista</div>

        <AddTask addTask={this.addTask} />

        <TasksList tasks={this.state.tasks} timer={this.handleClickStart} pause={this.handleClickPause} reset={this.handleClickReset} done={this.handleClickDone} timerZero={this.timerZero} delete={this.handleDelete} />
      </div>
    );
  }
}

export default App;


