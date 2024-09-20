import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
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
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import CustomButton from '../../components/button/page';
import backGroundRegister from '../../images/sndRegisterbg.jpg';
import { showToatify } from '../../utils/toastify';
import styles from './page.module.css';
import { register } from '../../rest/api/authentication';
import { IRegisterPayload } from '../../rest/IApi/IAuthentication';

// * Validate password, return to passing this into component field
const userNameRegex: RegExp = new RegExp(/[A-Z\s\W_]/);
let currentPassword: string

const usernameValidator = (value: string) => {
    const specialSympol = userNameRegex.test(value)
    const notValid = specialSympol || value?.length === 0
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

                <TextBox value={value} data-testid="confirmPassword" id='repassword' type={show ? 'text' : "password"} {...others} className='k-rounded-lg text-normalTxt' suffix={() => (
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
                <Input value={value} id='email' {...others} className='k-rounded-lg text-normalTxt' />
            </FloatingLabel>
            {visited && validationMessage && <Error>{validationMessage}</Error>}
        </>
    );
};

interface IRegister {
    onClick?: () => void;
}


const Register = observer(({ onClick = () => { } }: IRegister) => {

    const navigate = useNavigate()

    // * fetch register
    const fetchRegister = async (payload: IRegisterPayload) => {
        try {
            await register(payload)
            showToatify('Register successful!!', 'success')
            navigate("/todo/login");
        } catch (error: any) {
            showToatify(`${error.response.data}`, 'error')
            console.log(error.response.data);
        }
    }

    //*this func sp of KendoUI, get the data in dataItem 
    const submitRegister = (dataItem: {
        [name: string]: any;
    }) => {
        onClick()//! This is make for calling in jestjs
        const payload = {
            userName: dataItem.username,
            password: dataItem.password,
            email: dataItem.email,
            role: 'user'
        }

        fetchRegister(payload)
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
        }, {
            id: 4,
            name: "repassword",
            component: ConfirmPasswordInput,
            validator: confirmPassValidator
        }
    ]

    return (
        <div data-testid="register-container" className='wfull h-full flex justify-center items-center sm:p-[0_1rem]'>
            <section className='min-h-[25rem] w-[60rem] rounded-xl shadow-xl bg-white flex flex-row overflow-hidden lg:flex-col-reverse lg:h-[40rem] lg:w-[30rem] sm:w-[25rem]'>
                <div className='flex-1 '>
                    <Form
                        onSubmit={submitRegister}
                        render={(formRenderProps: FormRenderProps) => (
                            <FormElement className='h-full w-full p-[1.2rem] flex flex-col gap-1'>
                                <fieldset className={`k-form-fieldset ${styles.form_register}`}>
                                    <div className='w-full flex justify-center'>
                                        <p className='w-max h-max text-title text-txtMainColor font-bold'>Sign up</p>
                                    </div>

                                    {/* Render all of the input field */}
                                    {
                                        listFieldInput.map((val) => (
                                            <div key={val.id} className="k-form-field-wrap">
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
                                <div className="mt-auto flex flex-col gap-3">
                                    <CustomButton isDisable={!formRenderProps.allowSubmit} title={'Sign Up'} size='50%' btnType='primary' />
                                    <span
                                        className='flex items-center gap-2'
                                    >
                                        <p className='text-supTxt'>I already have an account</p>
                                        <Link to={'/todo/login'} className='text-supTxt font-bold cursor-pointer underline'>
                                            Go to login
                                        </Link>
                                    </span>
                                </div>
                            </FormElement>
                        )} />
                </div>
                <div className='flex-1 '>
                    <img src={backGroundRegister} alt="background" className='aspect-video w-full h-full object-cover' />
                </div>
            </section >

        </div >
    )
})

export default Register