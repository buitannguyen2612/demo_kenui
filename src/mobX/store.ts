import { action, computed, makeAutoObservable, observable } from "mobx";
import { createContext } from "react";
import { v4 as uuidv4 } from 'uuid';

//* define the object when enter informations
class Todo {

    id: string = uuidv4()
    title: string
    complete: boolean = false

    constructor(title: string) {
        makeAutoObservable(this, {
            id: observable,
            title: observable,
            complete: observable,
            toggleComplete: action

        })

        this.title = title
    }

    toggleComplete() {
        this.complete = !this.complete
    }
}

//* create user
class User {
    id: string
    username: string
    password: string

    constructor(username: string, password: string) {
        makeAutoObservable(this, {
            id: observable,
            username: observable,
            password: observable
        })

        this.id = uuidv4()
        this.username = username
        this.password = password
    }
}

//* trigger create account from user
class Account {
    listUser: Array<User> = []

    constructor() {
        makeAutoObservable(this, {
            listUser: observable,
            createAccount: action,
            loginByAccount: action,
        })
    }

    createAccount(username: string, password: string) {
        this.listUser.push(new User(username, password))
    }

    loginByAccount(username: string, password: string): boolean {
        return this.listUser.some(val => val.username === username && val.password === password)
    }
}

//* Define current instance, and feel of method for trigger action
class TodoStore {

    todos: Array<Todo> = [];

    constructor() {
        //* Using for define observable for wraping the state change
        makeAutoObservable(this, {
            todos: observable,
            addTodo: action,
            completeCountingTodo: computed,
            removeTodo: action
            // * there 3 atribute for define:
            //* observable: Using for wrap the init state and watching if they change.
            //* action: Using for define the action method, trigger to current state and change it.
            //* computed: Define method that using for counting and not contact to init state.
        })
    }

    addTodo(title: string) {
        this.todos?.push(new Todo(title))
    }

    triggerComplete(id: string) {
        this.todos.forEach(val => {
            if (val.id === id) {
                return val.complete = !val.complete
            }
        })
    }

    removeTodo(id: string) {
        this.todos = this.todos?.filter(val => val?.id !== id)
    }

    updateTodo(id: string, title: string) {
        this.todos.forEach(val => {
            if (val.id === id) {
                val.title = title
            }
        })
    }

    clearAllTodo() {
        this.todos.length = 0
    }

    get completeCountingTodo() {
        return this.todos.filter(val => val.complete === false).length
    }
}


//? So i see this case will work when we calling it to component by useContext hook, but its good more than case below ?
export const TodoStoreContext = createContext(new TodoStore());
export const authentActions = createContext(new Account())
//? -------------------------------------------------------------





export const todoActions = new TodoStore()
export const authenticationActions = new Account()