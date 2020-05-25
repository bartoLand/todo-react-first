import React, { Component } from 'react';

class AddTask extends Component {
    state = {
        name: "",
        time: "",
        note: ""
    }
    handleName = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    handleTime = (e) => {
        this.setState({
            time: e.target.value
        })
    }
    handleNote = (e) => {
        this.setState({
            note: e.target.value
        })
    }
    handleAddClick = () => {
        const { name, time, note } = this.state;
        if (name !== "" && time !== "" && note !== "") {
            this.props.addTask(name, time, note);
            this.setState({
                name: "",
                time: "",
                note: ""
            })
        } else {
            alert('Wypełnij wszystkie pola!')
        }
    }

    render() {
        return (
            <div className="form">
                <input required type="text" name="addTask" id="addTask" placeholder='Wpisz jakie masz zadanie' value={this.state.name} onChange={this.handleName} />
                <br />

                <input required type="number" name="addTime" id="addTime" placeholder='Ile minut zajmie?' value={this.state.time} onChange={this.handleTime} />
                <br />

                <textarea required name="addNote" id="addNote" cols="5" rows="33" placeholder='Masz jakieś notatki?' value={this.state.note} onChange={this.handleNote}></textarea>
                <br />

                <button className='btnAdd' onClick={() => this.handleAddClick()}>Dodaj</button>
            </div>
        );
    }
}

export default AddTask;