import React from 'react';
import './App.css';


class TodoListHeader extends React.Component {


    render = () => {


        return (
            <div>
                <h3 className="todoList-header__title">{this.props.title}</h3>
            </div>
        );
    }
}

export default TodoListHeader;

