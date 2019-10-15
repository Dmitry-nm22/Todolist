import React from 'react';
import './App.css';
import TodoListTask from "./TodoListTask";


class TodoListTasks extends React.Component {
    render = () => {

        let tasksElements = this.props.tasks.map(
            (task) => {
                return <TodoListTask
                    task={task}
                    chengeStatus={this.props.changeTaskStatus}
                  />
            })


        return (

            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    }
}

export default TodoListTasks;

