import {createStore} from "redux";


const initialState = {
    todolists: [
        // {id: 0, title: "asdasd", tasks:[ {id: 0, title: "qq", isDone: false, priority: "low"} ]},
        // {id: 1, title: "asdasd", tasks:[ {id: 1, title: "ww", isDone: false, priority: "low"} ]},
        // {id: 2, title: "asdasd", tasks:[ {id: 2, title: "ee", isDone: false, priority: "low"} ]}
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD-TODOLIST" : {
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            }
        }
        case  "ADD-TASK": {
            return {
                ...state,
                todolists: state.todolists.map(todolists => {
                    if (todolists.id === action.todolistId) {
                        return {
                            ...todolists,
                            tasks: [...todolists.tasks, action.newTask]
                        }
                    } else {
                        return todolists
                    }
                })
            }
        }
        case  "CHANGE-TASK": {
            return {
                ...state,
                todolists: state.todolists.map(todolist =>{
                    if(todolist.id === action.todolistId){
                        return {
                            ...todolist,
                            tasks: todolist.tasks.map(task =>{
                                if(task.id === action.taskId){
                                    return {...task, ...action.obj}
                                }else {
                                    return task
                                }
                            })
                        }
                    }else {
                        return todolist
                    }
                })
            }
        }
        case  "DELETE-TODOLIST": {
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id != action.TodolistId)
            }
        }
        case  "DELETE-TASK": {
            debugger
            return {
                ...state,
                todolists: state.todolists.map(tl =>{
                    if(tl.id === action.TodolistId){
                        return{
                            ...tl,
                            tasks: tl.tasks.filter(t => t.id != action.taskId)
                        }
                    }else{
                        return  tl
                    }
                })
            }
        }
        default:
            return state;
    }
}

const store = createStore(reducer);
export default store;