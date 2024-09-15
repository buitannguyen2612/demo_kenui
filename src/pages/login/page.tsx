import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button } from '@progress/kendo-react-buttons';
import { Field, FieldRenderProps, Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { Input, InputSuffix, TextBox } from '@progress/kendo-react-inputs';
import {
    Error
} from "@progress/kendo-react-labels";
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { authenticationActions } from '../../mobX/store';
import loginBackground from '../../images/sndloginBackground.jpg'
import styles from './page.module.css';

type Props = {}


// * Validate password, return to passing this into component field
const userNameRegex: RegExp = new RegExp(/[!@#$%^&*(),.?":{}|<>]/)
const upperCaseRegex: RegExp = new RegExp(/[A-Z]/)
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

            <Input id='username' placeholder='Username' value={value} {...others} className='k-rounded-full h-[3rem]' />
            {
                visited && validationMessage && <Error>{validationMessage}</Error>
            }

        </>
    )
}


// * Validate password, return to passing this into component field
const passwordValidator = (value: string) => {
    const isValid = value?.length > 2 && value?.length < 10
    return isValid ? '' : 'Password must contain in 2-10 character'
}
const PasswordInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, value, ...others } = fieldRenderProps
    const [show, setShow] = useState<boolean>(false)
    return (
        <>

            <TextBox value={value} placeholder='Password' data-testid="passwordInput" id='password' className='k-rounded-full h-[3rem]' type={show ? "text" : "password"} {...others} suffix={() => (
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

const Login = observer((props: Props) => {
    //*Define the store by using context 
    const loginAction = authenticationActions
    const navigate = useNavigate()

    //*Trigger to login the field
    const submitLogin = (dataItem: { [name: string]: any }) => {
        const userName: string = dataItem.username
        const password: string = dataItem.password
        if (loginAction.loginByAccount(userName, password)) {
            toast.success('🦄 Login success!!', {
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
            //TODO: finding routing to next page with react router dom
            navigate('/todo/homepage')
        }
        else {
            toast.error('🦄 Login fail!!', {
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
    }

    return (
        <>
            {/* <Form
                onSubmit={submitLogin}
                render={(formRenderProps: FormRenderProps) => (
                    <FormElement className='w-full h-full flex justify-center items-center'>
                        <div className='w-auto h-auto '>
                            <div className=' min-h-[20rem] w-[20rem] pb-[1rem] flex flex-col items-center gap-[2rem] rounded-xl bg-[#d6e4ef] overflow-hidden'>
                                <div className='w-full h-[5rem] flex justify-center items-center box-primary-gradientcolor'>
                                    <p data-testid="login-title" className='w-max text-[1.6rem] font-bold text-white'>Login</p>
                                </div>
                                <div className='w-full h-auto flex flex-col gap-[2rem] justify-center p-[0.5rem]'>
                                    <div className='w-full'>
                                        <FieldWrapper>
                                            <div className="k-form-field-wrap">
                                                <Field
                                                    name={"username"}
                                                    component={Input}
                                                    label={"UserName"}
                                                />
                                            </div>
                                        </FieldWrapper>
                                    </div>
                                    <div className='w-full'>
                                        <FieldWrapper>
                                            <div className="k-form-field-wrap">
                                                <Field
                                                    name={"password"}
                                                    component={Input}
                                                    label={"Password"}
                                                />
                                            </div>
                                        </FieldWrapper>
                                    </div>
                                    <div className='w-full flex justify-center'>
                                        <Button data-testid="btn-login" className={`w-[50%] ${styles.submitButton}`} disabled={!formRenderProps.allowSubmit}>Login</Button>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center items-center gap-1">
                                    <p className="text-[0.8rem] font-normal">
                                        Doesnt have account?
                                    </p>
                                    <Link className="text-[0.7rem] font-bold underline" to="/">Register</Link>
                                </div>
                            </div>
                        </div>

                    </FormElement>
                )}
            /> */}

            <section data-testid="login-container" className='w-full h-full flex justify-center items-center'>
                <div className='h-[40rem] w-[60rem] rounded-xl shadow-xl bg-[#fff] flex overflow-hidden'>
                    <div className='flex-1'>
                        <img src={loginBackground} alt="" className='w-full h-full object-cover' />
                    </div>
                    <div className='flex-1'>
                        <Form
                            onSubmit={submitLogin}
                            render={(formRenderProps: FormRenderProps) => (
                                <FormElement className='h-full w-full p-[2rem] flex flex-col justify-center gap-5'>
                                    <div className='w-full flex justify-center'>
                                        <p className='w-max h-max text-[2rem] text-[#648bcf] font-bold'>Member Login</p>
                                    </div>
                                    <fieldset className={`k-form-fieldset ${styles.form_register}`}>
                                        <div className="k-form-field-wrap">
                                            <Field
                                                name={"username"}
                                                component={UsernameInput}
                                                validator={usernameValidator}
                                            />
                                        </div>
                                        <div className="k-form-field-wrap">
                                            <Field
                                                name={"password"}
                                                component={PasswordInput}
                                                validator={passwordValidator}
                                            />
                                        </div>
                                    </fieldset>
                                    <div className="w-full flex flex-col items-center gap-1">
                                        <Button className={`w-[50%]  ${styles.submitButton}`} disabled={!formRenderProps.allowSubmit}>Login</Button>
                                        <span
                                            className='flex items-center gap-2'
                                        >
                                            <p className='text-[0.8rem]'>I not have account</p>
                                            <Link to={'/'} className='text-[0.7rem] font-bold cursor-pointer underline'>
                                                Go to Signup
                                            </Link>
                                        </span>
                                    </div>
                                </FormElement>
                            )} />

                    </div>
                </div>
            </section>
        </>
    )
})

export default Login