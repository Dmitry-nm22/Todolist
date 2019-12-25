import React from 'react';
import './App.css';
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";

class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();
    }

    componentDidMount = () => {
        this.restoreState()
    }



    state = {
        tasks: []

    };
    nextTaskId = 0

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem('our-state' + this.props.id, stateAsString);
    }


    restoreState = () => {
        let state = {
            tasks: [],
        };
        let stateAsString = localStorage.getItem('our-state' + this.props.id);
        if(stateAsString != null){
            state = JSON.parse(stateAsString);
        }

        this.setState(state)
    }

    addTask = (newText) => {
        debugger
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.nextTaskId++
        this.props.addTask(newTask, this.props.id)

        // let newTasks = [...this.state.tasks, newTask];
        // this.setState( {
        //     tasks: newTasks
        // }, () => {this.saveState();});

        
    }

    changeFilter = (newFilterValue) => {
        this.setState( {
            filterValue: newFilterValue
        },() => {this.saveState();});
    }

    changeTask= (taskId, obj ) =>{
        this.props.changeTask(this.props.id, taskId, obj )
        
        // let newTasks = this.state.tasks.map(t => {
        //     if (t.id != taskId) {
        //         return t;
        //     }
        //     else {
        //
        //         return {...t, ...obj};
        //     }
        // });
        //
        // this.setState({
        //     tasks: newTasks
        // },() => {this.saveState();})

    }

    changeStatus = (taskId, isDone) => {

        this.changeTask(taskId,{isDone: isDone})
    
    }

    changeTitle = (taskId, title) => {

        this.changeTask(taskId,{title: title})      
       
    }


    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                    <div className= 'todolist-header'>
                        <TodoListTitle title={this.props.title}/>
                        <AddNewItemForm addItem={this.addTask}/>
                    </div>

                    <TodoListTasks changeTask={this.changeTask} 
                                    changeStatus={this.changeStatus }
                                    changeTitle={this.changeTitle}
                                   tasks={this.props.tasks.filter(t => {
                        if (this.state.filterValue === "All") {
                            return true;
                        }
                        if (this.state.filterValue === "Active") {
                            return t.isDone === false;
                        }
                        if (this.state.filterValue === "Completed") {
                            return t.isDone === true;
                        }
                    })}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue} />
                </div>
            </div>
        );
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        addTask:(newTask, todolistId)=>{
            const action = {
                type: "ADD-TASK",
                newTask: newTask,
                todolistId: todolistId
            }
            dispatch(action)
        },

        changeTask:(taskId, obj, todolistId)=>{
            const action = { type: "CHANGE-TASK", taskId, obj, todolistId }
            dispatch(action)
        }
    }
}

const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList);
export default ConnectedTodoList;


