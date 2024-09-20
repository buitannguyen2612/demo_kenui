import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Field, FieldRenderProps, Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { Input, InputSuffix, TextBox } from '@progress/kendo-react-inputs';
import {
    Error
} from "@progress/kendo-react-labels";
import { useState } from 'react';
import { IUser } from '../../pages/userManagement/page';
import CustomButton from '../button/page';
import { IListUserReponse, IRegisterPayload } from '../../rest/IApi/IAuthentication';

const userNameRegex: RegExp = new RegExp(/[A-Z\s\W_]/);
const upperCaseRegex: RegExp = new RegExp(/[A-Z]/)
const passwordValidator = (value: string) => {
    const isValid = value?.length > 2 && value?.length < 10
    return isValid ? '' : 'Password must contain in 2-10 character'
}
const PasswordInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, value, ...others } = fieldRenderProps
    const [show, setShow] = useState<boolean>(false)
    return (
        <>
            <TextBox value={value} placeholder='Password' data-testid="passwordInput" id='password' className='k-rounded-full h-[3rem] text-normalTxt' type={show ? "text" : "password"} {...others} suffix={() => (
                <>
                    <InputSuffix>
                        {
                            show ?
                                <VisibilityOffIcon sx={{ color: "black", fontSize: "1rems", cursor: "pointer", marginRight: "0.3rem" }} onClick={() => setShow(false)} />
                                :
                                <RemoveRedEyeIcon sx={{ color: "black", fontSize: "1rems", cursor: "pointer", marginRight: "0.3rem" }} onClick={() => setShow(true)} />
                        }
                    </InputSuffix>
                </>
            )} />
            {
                visited && validationMessage && <Error>{validationMessage}</Error>
            }
        </>
    )
}
const usernameValidator = (value: string) => {
    const specialSympol = userNameRegex.test(value)
    const upperCaseCharacter = upperCaseRegex.test(value)
    const notValid = specialSympol || upperCaseCharacter
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
const emailValidator = (value: string) =>
    emailRegex.test(value) ? "" : "Please enter a valid email.";
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
    callback: (val: IRegisterPayload) => void
    close?: Function
}

const FormAddUser = (props: Props) => {
    const { close, callback } = props
    const submitLogin = (dataItem: { [name: string]: any }) => {
        const username: string = dataItem.username
        const password: string = dataItem.password
        const email: string = dataItem.email
        const newData = {
            userName: username,
            password: password,
            email: email,
            role: 'user'
        }
        callback(newData)
    }

    //* Define list of input field
    const listFieldInput = [
        {
            id: 1,
            name: "username",
            component: UsernameInput,
            validator: usernameValidator
        }, {
            id: 2,
            name: "email",
            component: EmailInput,
            validator: emailValidator
        }, {
            id: 3,
            name: "password",
            component: PasswordInput,
            validator: passwordValidator
        }
    ]

    return (
        <section className='w-full h-full flex justify-center pt-5'>
            <div className='w-[40rem] min-h-[20rem] flex justify-center p-[1rem] rounded-xl shadow-xl bg-white'>
                <Form
                    onSubmit={submitLogin}
                    render={(formRenderProps: FormRenderProps) => (
                        <FormElement className='h-full w-full flex flex-col justify-start gap-5'>
                            <div className='w-full flex justify-center'>
                                <p className='w-max h-max text-title text-txtMainColor font-bold'>Add new user</p>
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

export default FormAddUser