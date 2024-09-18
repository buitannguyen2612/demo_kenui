import { action, makeAutoObservable, observable } from "mobx";
import { IlistTodoResponse } from '../rest/IApi/IAuthentication';

class todoSlice {

    listTodo: Array<IlistTodoResponse> = []

    constructor() {
        makeAutoObservable(this,
            {
                listTodo: observable,
                addListTodo: action,
                clearState: action
            }
        )
    }
    addListTodo(val: Array<IlistTodoResponse>) {
        this.listTodo = val
    }

    clearState() {
        this.listTodo = []
    }
}

export const todoAction = new todoSlice()