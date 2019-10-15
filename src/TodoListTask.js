import React from 'react';
import './App.css';


class TodoListTask extends React.Component {

    onIsDoneChanged = (e) => {
        this.props.chengeStatus(this.props.task, e.currentTarget.checked);
    };



    render = () => {
        return (

            <div className="todoList-task">
                <input onChange={this.onIsDoneChanged} type="checkbox" checked={this.props.task.isDone}/>
                <span>{this.props.task.title}, {this.props.task.priority}</span>
            </div>

        );
    }
}

export default TodoListTask;

