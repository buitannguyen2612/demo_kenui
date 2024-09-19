import { action, makeAutoObservable, observable } from "mobx";

class ModalStore {
    isModalOpen: boolean = false;
    message: string = "";
    onConfirm: () => void = () => { };

    constructor() {
        makeAutoObservable(this,
            {
                isModalOpen: observable,
                message: observable,
                onConfirm: observable,
                openModal: action,
                closeModal: action
            }
        );
    }

    openModal(message: string, onConfirm: () => void) {
        this.isModalOpen = true;
        this.message = message;
        this.onConfirm = onConfirm;
    }

    closeModal() {
        this.isModalOpen = false;
        this.message = "";
    }
}

const modalStore = new ModalStore();
export default modalStore;