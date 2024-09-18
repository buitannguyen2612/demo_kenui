import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Field, FieldRenderProps, Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { Input, InputSuffix, TextBox } from '@progress/kendo-react-inputs';
import {
    Error
} from "@progress/kendo-react-labels";
import { AxiosResponse } from 'axios';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../../components/button/page';
import loginBackground from '../../images/sndloginBackground.jpg';
import { loginAction } from '../../mobX/authen';
import { login } from '../../rest/api/authentication';
import { LoginPayload, LoginResponse } from '../../rest/IApi/IAuthentication';
import { showToatify } from '../../utils/toastify';
import styles from './page.module.css';




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

            <Input id='username' placeholder='Username' value={value} {...others} className='k-rounded-full h-[3rem] text-normalTxt' />
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

interface Ilogin {
    onClick?: () => void
}

const Login = observer(({ onClick = () => { } }: Ilogin) => {
    //*Define the store by using context 
    const authAction = loginAction

    // * Fetch login 
    const fetchLogin = async (payload: LoginPayload) => {
        try {
            const res: AxiosResponse<LoginResponse> = await login(payload)

            const data = res.data
            const inforUser = res.data.infomationUser
            authAction.login(data.accessToken,
                data.refreshToken,
                data.tokenLifespan,
                inforUser.name
            )
            showToatify(`Hello bro ${authAction.userName}`, 'success')
        } catch (error) {
            console.log(error);
            showToatify('🦄 Login fail!!', 'error')
        }
    }

    //*Trigger to login the field
    const submitLogin = (dataItem: { [name: string]: any }) => {
        const userName: string = dataItem.username
        const password: string = dataItem.password

        const payload = {
            userName,
            password
        }

        fetchLogin(payload)
        // if (authAction.loginByAccount(userName, password)) {
        //     showToatify('🦄 Login success!!', 'success')
        //     navigate('/todo/homepage')
        // }
        // else {
        //     showToatify('🦄 Login fail!!', 'error')
        // }
    }
    return (
        <>
            <section data-testid="login-container" className='w-full h-full flex justify-center items-center'>
                <div className='h-[40rem] w-[60rem] rounded-xl shadow-xl bg-white flex overflow-hidden'>
                    <div className='flex-1'>
                        <img src={loginBackground} alt="" className='w-full h-full object-cover' />
                    </div>
                    <div className='flex-1'>
                        <Form
                            onSubmit={submitLogin}
                            render={(formRenderProps: FormRenderProps) => (
                                <FormElement className='h-full w-full p-[2rem] flex flex-col justify-center gap-5'>
                                    <div className='w-full flex justify-center'>
                                        <p className='w-max h-max text-title text-mainCorlor font-bold'>Member Login</p>
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
                                    <div className="w-full flex flex-col items-center gap-3">
                                        <CustomButton isDisable={!formRenderProps.allowSubmit} title={'Sign Up'} trigger={onClick} btnType='primary' size='50%' />
                                        <span
                                            className='flex items-center gap-2'
                                        >
                                            <p className='text-supTxt'>I not have account</p>
                                            <Link to={'/'} className='text-supTxt font-bold cursor-pointer underline'>
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