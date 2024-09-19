import { observer } from 'mobx-react-lite';
import modalStore from '../../mobX/modal';

type Props = {}

const ModalForm = observer((props: Props) => {
    if (!modalStore.isModalOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-xl min-w-[25rem] min-h-[10rem] flex flex-col items-center gap-1 p-[0.5rem]">
                <p className='w-max h-max text-title text-txtMainColor font-bold'>Confirm box</p>
                <h3 className="text-lg font-normal text-normalTxt">{modalStore.message}</h3>
                <div className="mt-auto w-full flex justify-end gap-2">
                    <button
                        className="btn-shape-rounded hover-effect-topleft"
                        onClick={() => {
                            modalStore.onConfirm();
                            modalStore.closeModal();
                        }}
                    >
                        Confirm
                    </button>
                    <button
                        className="btn-error-rounded hover-effect-topleft"
                        onClick={() => modalStore.closeModal()}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
})

export default ModalForm