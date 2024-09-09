import { action, computed, makeAutoObservable, observable } from "mobx";
import { createContext } from "react";
import { v4 as uuidv4 } from 'uuid';

// define the object when enter informations
class Todo{

    id:string = uuidv4()
    title:string
    complete:boolean = false

    constructor(title:string){
        makeAutoObservable(this,{
            id:observable,
            title: observable,
            complete:observable,
            toggleComplete:action
        })

        this.title = title 
    }

    toggleComplete(){
        this.complete = !this.complete
    }
}

// trigger adding single object of todo into the array
class TodoStore  {
    
    // define the array with generic is Todo object
    todos: Array<Todo> = [];
    
    // making the observable for realtime watching the state change in this class
    constructor(){
        makeAutoObservable(this,{
            todos:observable,
            addTodo:action,
            completeCountingTodo:computed, //computed will be calling when state is change ==> note: its not using for change the init state
            removeTodo:action // this is an action we want to difine in the class
            // actions and computed is differ : actions : is define for some method is calling for change some state in class
            //                                  computed : is define for some case not change the current state in class. Its will running when the state change 
        })
    }

    addTodo(title:string){
        this.todos?.push(new Todo(title))
    }

    triggerComplete(id:string){
        this.todos.forEach(val => {
            if (val.id === id) {
                return val.complete = !val.complete
            }
        } )
    }

    removeTodo(id:string){
        this.todos =  this.todos?.filter(val => val?.id !== id)
    }

    updateTodo(id:string, title:string) {
        this.todos.forEach(val => {
            if (val.id === id) {
                val.title = title
            }
        })
    }

    clearAllTodo(){
        this.todos.length = 0
    }

    get completeCountingTodo(){
        return this.todos.filter(val => val.complete === false).length
    }
}


// store two of the class in to one context --> this case is already dont need for using 
export const TodoStoreContext = createContext(new TodoStore()); 
//--> this is the best way to do it





export const todoActions = new TodoStore()