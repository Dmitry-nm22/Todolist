import React from 'react';
import './App.css';


class TodoListTitle extends React.Component {


    render = () => {


        return (
            <div className="todoList-header__title">
                <h3 >{this.props.title}</h3>
                <button onClick={this.props.deleteTodolist}>X</button>
            </div>
        );
    }
}

export default TodoListTitle;

