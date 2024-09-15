import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button } from '@progress/kendo-react-buttons';
import {
    Field,
    FieldRenderProps,
    Form,
    FormElement,
    FormRenderProps
} from "@progress/kendo-react-form";
import { Input, InputSuffix, TextBox } from "@progress/kendo-react-inputs";
import {
    Error,
    FloatingLabel
} from "@progress/kendo-react-labels";
import { observer } from "mobx-react-lite";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { authenticationActions } from '../../mobX/store';
import styles from './page.module.css'
import { useState } from 'react';
import backGroundRegister from '../../images/sndRegisterbg.jpg'

type Props = {}



// * Validate password, return to passing this into component field
const userNameRegex: RegExp = new RegExp(/[!@#$%^&*(),.?":{}|<>]/)
const upperCaseRegex: RegExp = new RegExp(/[A-Z]/)
let currentPassword: string

const usernameValidator = (value: string) => {
    const specialSympol = userNameRegex.test(value)
    const upperCaseCharacter = upperCaseRegex.test(value)
    const notValid = specialSympol || upperCaseCharacter
    return notValid ? 'UserName must not contain in special character and uppercase letter' : ''
}
// * Validate password, return to passing this into component field
const passwordValidator = (value: string) => {
    const isValid = value?.length > 2 && value?.length < 10
    return isValid ? '' : 'Password must contain in 2-10 character'
}
const PasswordInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, value, ...others } = fieldRenderProps
    const [show, setShow] = useState<boolean>(false)
    currentPassword = fieldRenderProps.value
    return (
        <>
            <FloatingLabel
                label={"Password:"}
                editorId='password'
                editorValue={fieldRenderProps.value}
            >
                <TextBox value={value} data-testid="passwordInput" id='password' className='k-rounded-lg' type={show ? "text" : "password"} {...others} suffix={() => (
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
const UsernameInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, value, ...others } = fieldRenderProps
    return (
        <>
            <FloatingLabel
                label={"Username:"}
                editorId='username'
                editorValue={fieldRenderProps.value}
            >
                <Input id='username' value={value} {...others} className='k-rounded-lg' />
            </FloatingLabel>
            {
                visited && validationMessage && <Error>{validationMessage}</Error>
            }

        </>
    )
}


//* Validate password, return to passing this into component field
//* This func will return the value to validationMessage variable
const confirmPassValidator = (value: string) => {
    const isValid = value === currentPassword
    return isValid ? '' : 'Confirm password must be same to current password'
}
//* Catch the input of user and each of event of that input even validationMessage
const ConfirmPasswordInput = (fieldRenderProps: FieldRenderProps) => {
    const [show, setShow] = useState<boolean>(false)

    const { validationMessage, visited, value, ...others } = fieldRenderProps
    return (
        <>
            <FloatingLabel
                label={"Confirm password:"}
                editorId='repassword'
                editorValue={fieldRenderProps.value}
            >

                <TextBox value={value} data-testid="confirmPassword" id='repassword' type={show ? 'text' : "password"} {...others} className='k-rounded-lg' suffix={() => (
                    <>
                        {
                            show ?
                                <VisibilityOffIcon sx={{ color: "black", fontSize: "1rems", cursor: "pointer", marginRight: "0.3rem" }} onClick={() => setShow(false)} />

                                :
                                <RemoveRedEyeIcon sx={{ color: "black", fontSize: "1rems", cursor: "pointer", marginRight: "0.3rem" }} onClick={() => setShow(true)} />
                        }
                    </>
                )} />
            </FloatingLabel>
            {
                visited && validationMessage && <Error>{validationMessage}</Error>
            }
        </>
    )
}

//*Func check valid mail
const emailRegex: RegExp = new RegExp(/\S+@\S+\.\S+/);
const emailValidator = (value: string) =>
    emailRegex.test(value) ? "" : "Please enter a valid email.";

//*this Func render fileInput of email, and checking is value of mail isvalid or not
const EmailInput = (fieldRenderProps: FieldRenderProps) => {

    const { validationMessage, visited, value, ...others } = fieldRenderProps;
    return (
        <>
            <FloatingLabel
                label={"Email:"}
                editorId='email'
                editorValue={fieldRenderProps.value}
            >
                <Input value={value} id='email' {...others} className='k-rounded-lg' />
            </FloatingLabel>
            {visited && validationMessage && <Error>{validationMessage}</Error>}
        </>
    );
};




const Register = observer((props: Props) => {

    const navigate = useNavigate()

    //* Get the context named authentActions in store.mobx
    const registerAction = authenticationActions

    //*Check if includes user in system
    const isContainAccount = (username: string, password: string) => {
        return registerAction.listUser.some(val => JSON.stringify(val) === JSON.stringify({ username, password }))
    }

    //*this func sp of KendoUI, get the data in dataItem 
    const submitRegister = (dataItem: {
        [name: string]: any;
    }) => {
        const userName: string = dataItem.username
        const password: string = dataItem.password
        console.log(userName, password);


        if (isContainAccount(userName, password)) {
            toast.error('Use another account!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        else {
            registerAction.createAccount(userName, password)
            toast.success('Register successful!!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            navigate("/todo/login");
        }

    }

    return (
        <div data-testid="register-container" className='wfull h-full flex justify-center items-center'>
            <section className='h-[25rem] w-[60rem] rounded-xl shadow-xl bg-[#fff] flex overflow-hidden'>
                <div className='flex-1 '>
                    <Form
                        onSubmit={submitRegister}
                        render={(formRenderProps: FormRenderProps) => (
                            <FormElement className='h-full w-full p-[1.2rem] flex flex-col gap-1'>
                                <fieldset className={`k-form-fieldset ${styles.form_register}`}>
                                    <div className='w-full flex justify-center'>
                                        <p className='w-max h-max text-[2rem] text-[#648bcf] font-bold'>Sign up</p>
                                    </div>
                                    <div className="k-form-field-wrap">
                                        <Field
                                            name={"username"}
                                            component={UsernameInput}
                                            validator={usernameValidator}
                                        />
                                    </div>
                                    <div className="k-form-field-wrap">
                                        <Field
                                            name={"email"}
                                            component={EmailInput}
                                            validator={emailValidator}
                                        />
                                    </div>
                                    <div className="k-form-field-wrap">
                                        <Field
                                            name={"password"}
                                            component={PasswordInput}
                                            validator={passwordValidator}
                                        />
                                    </div>
                                    <div className="k-form-field-wrap">
                                        <Field
                                            name={"repassword"}
                                            component={ConfirmPasswordInput}
                                            validator={confirmPassValidator}
                                        />
                                    </div>

                                </fieldset>
                                <div className="mt-auto flex flex-col gap-1">
                                    <Button className={`w-[50%]  ${styles.submitButton}`} disabled={!formRenderProps.allowSubmit}>Sign Up</Button>
                                    <span
                                        className='flex items-center gap-2'
                                    >
                                        <p className='text-[0.8rem]'>I already have an account</p>
                                        <Link to={'/todo/login'} className='text-[0.7rem] font-bold cursor-pointer underline'>
                                            Go to login
                                        </Link>
                                    </span>
                                </div>
                            </FormElement>
                        )} />
                </div>

                <div className='flex-1 '>
                    <img src={backGroundRegister} alt="" className='aspect-video w-full h-full object-cover' />
                </div>
            </section >

        </div >
    )
})

export default Register