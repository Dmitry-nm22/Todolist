import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./AddNewItemForm";

class App extends React.Component {

    componentDidMount = () => {
        this.restoreState()
    }

    state = {

        todolists: [
            {id: 33, title: 'What to learn'},
            {id: 44, title: 'Week tasks'},
            {id: 55, title: 'Year tasks'}

        ],
        newtodolistid: 0
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('state-for-item' + this.props.id, stateAsString);
    }


    restoreState = () => {
        let state = {
            todolists:[],
            newtodolistid: 0
        };
        let stateAsString = localStorage.getItem('state-for-item' + this.props.id);
        if(stateAsString != null){
            state = JSON.parse(stateAsString);
        }

        this.setState(state)
    }

    addToDoList = (title) =>{

            let newToDolist = {
                id: this.state.newtodolistid,
                title: title,

            };
            this.state.newtodolistid++
            let newToDoLists = [...this.state.todolists, newToDolist];
            this.setState( {
                todolists: newToDoLists
            }, () => {this.saveState()});

    };

    render = () => {
        const todolists = this.state.todolists.map(tl => <ToDoList  id={tl.id} title={tl.title}/>)




        return (
            <div>
                <div>
                    <AddNewItemForm addItem={this.addToDoList}/>
                </div>
                <div className="App">
                {todolists}
                </div>
            </div>
        );
    }
}

export default App;

