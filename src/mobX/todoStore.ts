import { action, makeAutoObservable, observable } from "mobx";
import { IlistTodoResponse } from '../rest/IApi/IAuthentication';

class todoSlice {

    listTodo: Array<IlistTodoResponse> = []
    loading: boolean = false

    constructor() {
        makeAutoObservable(this,
            {
                listTodo: observable,
                addListTodo: action,
                loading: observable,
                clearState: action,
            }
        )
    }
    addListTodo(val: Array<IlistTodoResponse>) {
        this.listTodo = val
    }

    clearState() {
        this.listTodo = []
    }

    setLoading(state: boolean) {
        this.loading = state
    }

}

export const todoAction = new todoSlice()