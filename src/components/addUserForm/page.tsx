import { Field, FieldRenderProps, Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { Input, InputSuffix, TextBox } from '@progress/kendo-react-inputs';
import { useState } from 'react';
import CustomButton from '../button/page';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
    Error,
    FloatingLabel
} from "@progress/kendo-react-labels";

const userNameRegex: RegExp = new RegExp(/[!@#$%^&*(),.?":{}|<>]/)
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
            <FloatingLabel
                label={"Password:"}
                editorId='password'
                editorValue={fieldRenderProps.value}
            >
                <TextBox value={value} data-testid="passwordInput" id='password' className='k-rounded-lg text-normalTxt' type={show ? "text" : "password"} {...others} suffix={() => (
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
            </FloatingLabel>
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
            <FloatingLabel
                label={"Username:"}
                editorId='username'
                editorValue={fieldRenderProps.value}
            >
                <Input id='username' value={value} {...others} className='k-rounded-lg text-normalTxt' />
            </FloatingLabel>
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
            <FloatingLabel
                label={"Email:"}
                editorId='email'
                editorValue={fieldRenderProps.value}
            >
                <Input value={value} id='email' {...others} className='k-rounded-lg text-normalTxt' />
            </FloatingLabel>
            {visited && validationMessage && <Error>{validationMessage}</Error>}
        </>
    );
};


type Props = {
    callback?: Function
}

const FormAddUser = (props: Props) => {

    const submitLogin = (dataItem: { [name: string]: any }) => {
        console.log(dataItem);
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
            <div className='w-[40rem] min-h-[20rem] flex justify-center p-[0.2rem] rounded-xl shadow-xl bg-white'>
                <Form
                    onSubmit={submitLogin}
                    render={(formRenderProps: FormRenderProps) => (
                        <FormElement className='h-full w-full p-[2rem] flex flex-col justify-center'>
                            <div className='w-full flex justify-center'>
                                <p className='w-max h-max text-title text-mainCorlor font-bold'>Add new user</p>
                            </div>
                            <fieldset>

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
                            <div className="w-full flex flex-col items-center gap-3">
                                <CustomButton isDisable={!formRenderProps.allowSubmit} title={'Add'} size='10rem' btnType='primary' />
                            </div>
                        </FormElement>
                    )} />
            </div>
        </section>
    )
}

export default FormAddUser