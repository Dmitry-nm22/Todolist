import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.newTasksTitileRef = React.createRef();
    }

    componentDidMount = () => {
        this.restoreState()
    }

    

    state = {
        tasks: [],
        nextTaskId: 0,
        filterValue: "All"
    };

    saveState = () => {
        let stateAsString = JSON.stringify(this.state)
        localStorage.setItem('our-state', stateAsString);
    }


    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: "All"
        };
        let stateAsString = localStorage.getItem('our-state');
        if(stateAsString != null){
            state = JSON.parse(stateAsString);        
        }

        this.setState(state)
    }

    addTask = (newText) => {
        let newTask = {
            id: this.state.nextTaskId,
            title: newText,
            isDone: false,
            priority: "low"
        };
        this.state.nextTaskId++
        let newTasks = [...this.state.tasks, newTask];
        this.setState( {
            tasks: newTasks
        }, () => {this.saveState();});
        
        
    }

    changeFilter = (newFilterValue) => {
        this.setState( {
            filterValue: newFilterValue
        },() => {this.saveState();});
    }

    changeTask= (taskId, obj ) =>{        
        
        let newTasks = this.state.tasks.map(t => {
            if (t.id != taskId) {
                return t; 
            }
            else {
               
                return {...t, ...obj};
            }
        });
        
        this.setState({
            tasks: newTasks
        },() => {this.saveState();})

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
                    <TodoListHeader addTask={this.addTask} />
                    <TodoListTasks changeTask={this.changeTask} 
                                    changeStatus={this.changeStatus }
                                    changeTitle={this.changeTitle}
                                   tasks={this.state.tasks.filter(t => {
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

export default App;

