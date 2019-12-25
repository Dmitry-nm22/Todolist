import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";

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

    };
    newtodolistid = 0

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('state-for-item' + this.props.id, stateAsString);
    }


    restoreState = () => {
        let state = {
            todolists:[],

        };
        let stateAsString = localStorage.getItem('state-for-item' + this.props.id);
        if(stateAsString != null){
            state = JSON.parse(stateAsString);
        }

        this.setState(state)
    }

    addToDoList = (title) =>{

            let newTodolist = {
                id: this.newtodolistid,
                title: title,
                tasks: []

            };
            this.newtodolistid++
            this.props.addTodolist(newTodolist)
            // let newToDoLists = [...this.state.todolists, newToDolist];
            // this.setState( {
            //     todolists: newToDoLists
            // }, () => {this.saveState()});
    };

    render = () => {
        const todolists = this.props.todolists.map(tl => <ToDoList  id={tl.id} title={tl.title} tasks={tl.tasks}/>)
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

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodolist: (newTodolist) => {
            const action = {
                type: "ADD-TODOLIST",
                newTodolist: newTodolist
            };

            dispatch(action)
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp;



