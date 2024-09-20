import { Field, FieldRenderProps, Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import {
    Error
} from "@progress/kendo-react-labels";
import { IUserUpatePayload } from '../../rest/IApi/IAuthentication';
import CustomButton from '../button/page';

const userNameRegex: RegExp = new RegExp(/[A-Z\s\W_]/);
const upperCaseRegex: RegExp = new RegExp(/[A-Z]/)

const usernameValidator = (value: string) => {
    const specialSympol = userNameRegex.test(value)
    const upperCaseCharacter = upperCaseRegex.test(value)
    const isEmpty = value.length === 0
    const notValid = specialSympol || upperCaseCharacter || isEmpty
    return notValid ? 'UserName must not contain in special character and uppercase letter' : ''
}
const UsernameInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, value, ...others } = fieldRenderProps
    return (
        <>
            <Input id='username' placeholder='Username' value={value} {...others} className='k-rounded-full h-[3rem] text-normalTxt' />
            {
                visited && validationMessage && <Error>{validationMessage}</Error>
            }

        </>
    )
}
const emailRegex: RegExp = new RegExp(/\S+@\S+\.\S+/);
const emailValidator = (value: string) => {
    const isEmpty = value.length > 0
    const isEmailFormat = emailRegex.test(value)
    const isValid = isEmpty && isEmailFormat
    return isValid ? '' : "Please enter a valid email."
}
const EmailInput = (fieldRenderProps: FieldRenderProps) => {

    const { validationMessage, visited, value, ...others } = fieldRenderProps;
    return (
        <>
            <Input id='email' placeholder='Enter email' value={value} {...others} className='k-rounded-full h-[3rem] text-normalTxt' />
            {visited && validationMessage && <Error>{validationMessage}</Error>}
        </>
    );
};


type Props = {
    callback: (id: string, val: IUserUpatePayload) => void
    close?: Function
    itemEdit: IUserUpatePayload
}

const FormEditUser = (props: Props) => {
    const { close, callback, itemEdit } = props
    const submitLogin = (dataItem: { [name: string]: any }) => {
        const idUser: string = itemEdit?.id
        const username: string = dataItem.username
        const email: string = dataItem.email
        const newData = {
            id: itemEdit.id,
            userName: username,
            email: email,
        }
        callback(idUser, newData)
    }

    // * Define current data when open edit popup
    const initialValues = {
        username: itemEdit?.userName || '',
        email: itemEdit?.email || ''
    };

    //* Define list of input field
    const listFieldInput = [
        {
            id: 1,
            name: "username",
            component: UsernameInput,
            validator: usernameValidator,
        }, {
            id: 2,
            name: "email",
            component: EmailInput,
            validator: emailValidator,
        }
    ]

    return (
        <section className='w-full h-full flex justify-center pt-5'>
            <div className='w-[40rem] min-h-[10rem] flex justify-center p-[1rem] rounded-xl shadow-xl bg-white'>
                <Form
                    onSubmit={submitLogin}
                    initialValues={initialValues}
                    render={(formRenderProps: FormRenderProps) => (
                        <FormElement className='h-full w-full flex flex-col justify-start gap-5'>
                            <div className='w-full flex justify-center'>
                                <p className='w-max h-max text-title text-txtMainColor font-bold'>Edit user</p>
                            </div>
                            <fieldset className='flex flex-col gap-3'>

                                {/* Render all of the input field */}
                                {
                                    listFieldInput.map((val) => (
                                        <div key={val.id}>
                                            <Field
                                                name={val.name}
                                                component={val.component}
                                                validator={val.validator}
                                            />
                                        </div>
                                    ))
                                }
                                {/* Render all of the input field */}

                            </fieldset>
                            <div className="w-full flex justify-end gap-3 mt-auto ">
                                <CustomButton isDisable={!formRenderProps.allowSubmit} title={'Add'} size='10rem' btnType='primary' />
                                <CustomButton title={'cancel'} size='10rem' btnType='cancel' isButton={true} callBack={close} />
                            </div>
                        </FormElement>
                    )} />
            </div>
        </section>
    )
}

export default FormEditUser