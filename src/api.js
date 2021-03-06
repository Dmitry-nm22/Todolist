import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,                                       // передавай с запросом куки для запрашиваемого домена
    headers: {"API-KEY": "882dbad7-39ab-4897-86b8-be2cae193ef5"} // специальный ключ в заголовках передаём
});

export const api = {
    createTask(newTaskTitle, todolistId) {
        return instance.post(`/${todolistId}/tasks`, {title: newTaskTitle});
    },
    createTodolist(title) {
        return instance.post("", {title: title})
    },
    getTodolists() {
        return instance.get("");
    },
    updateTask(task) {
        return instance.put(`/tasks`,  task);
    },
    deleteTodolist(id) {
        return instance.delete("/" + id)
    },
    deleteTask(id) {
        return instance.delete(`/tasks/${id}`)
    },
    getTasks(todolistId) {
        return instance.get(`/${todolistId}/tasks`)
    },
    updateTodolistTitle(title, todolistId) {
        return instance.put(`/${todolistId}`, {title: title})
    }
}




