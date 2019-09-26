import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";

class TodoListFooter  extends React.Component {
    render = () => {
        return (


                    <div className="todoList-footer">
                        <button>All</button>
                        <button>Completed</button>
                        <button>Active</button>
                    </div>

        );
    }
}

export default TodoListFooter ;

