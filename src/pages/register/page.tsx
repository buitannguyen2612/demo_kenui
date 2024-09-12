import { Button } from "@progress/kendo-react-buttons";
import {
    Field,
    FieldRenderProps,
    FieldWrapper,
    Form,
    FormElement,
    FormRenderProps
} from "@progress/kendo-react-form";
import { Input, TextBox } from "@progress/kendo-react-inputs";
import { Error } from "@progress/kendo-react-labels";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { authentActions } from '../../mobX/store';
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
// * Validate password, return to passing this into component field
const passwordValidator = (value: string) => {
    const isValid = value?.length > 2 && value?.length < 10
    return isValid ? '' : 'Password must contain in 2-10 character'
}
const PasswordInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps
    return (
        <>
            {/* <TextBox placeholder="John Smith" /> */}
            <Input {...others} />
            {
                visited && validationMessage && <Error>{validationMessage}</Error>
            }
        </>
    )
}
const UsernameInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps
    return (
        <>
            {/* <TextBox placeholder="John Smith" /> */}
            <Input {...others} />
            {
                visited && validationMessage && <Error>{validationMessage}</Error>
            }
        </>
    )
}






//*Func check valid mail
const emailRegex: RegExp = new RegExp(/\S+@\S+\.\S+/);
const emailValidator = (value: string) =>
    emailRegex.test(value) ? "" : "Please enter a valid email.";//! This string will be passing to error message on below

//*this Func render fileInput of email, and checking is value of mail isvalid or not
const EmailInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps; //! Detructuring the field suppor in KendoUI and define that
    return (
        <div>
            <Input {...others} />
            {visited && validationMessage && <Error>{validationMessage}</Error>}
        </div>
    );
};



const Register = observer((props: Props) => {
    //* Get the context named authentActions in store.mobx
    const registerAction = useContext(authentActions)


    const navigate = useNavigate()

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


        if (isContainAccount(userName, password)) {
            toast.error('🦄 Use another account!!', {
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
            toast.success('🦄 Register successful!!', {
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
        <>
            <Form
                onSubmit={submitRegister}
                render={(formRenderProps: FormRenderProps) => (
                    <FormElement className="w-full h-full flex justify-center items-center">
                        <section className='h-auto w-auto'>
                            <div className=' min-h-[30rem] w-[25rem] pb-[1rem] flex flex-col items-center gap-[2rem] rounded-xl shadow-2xl backdrop-blur-xl bg-white/30 overflow-hidden'>
                                <div className='w-full h-[5rem] flex justify-center items-center box-primary-gradientcolor'>
                                    <p className='w-max text-[1.6rem] font-bold text-white'>Register</p>
                                </div>
                                <div className='w-full h-auto flex flex-col gap-[1rem] justify-center p-[0.5rem]'>
                                    <div className='w-full'>
                                        <FieldWrapper>
                                            <Field
                                                name={"username"}
                                                type={"text"}
                                                component={UsernameInput}
                                                label={"UserName"}
                                                validator={usernameValidator}
                                            />
                                        </FieldWrapper>
                                    </div>
                                    <div className='w-full'>
                                        <FieldWrapper>
                                            <Field
                                                name={"password"}
                                                type={"text"}
                                                component={PasswordInput}
                                                label={"Password"}
                                                validator={passwordValidator}
                                            />
                                        </FieldWrapper>
                                    </div>
                                    <div className="w-full">
                                        <FieldWrapper>
                                            <Field
                                                name={"email"}
                                                type={"email"}
                                                component={EmailInput}
                                                label={"Email"}
                                                validator={emailValidator}
                                            />
                                        </FieldWrapper>
                                    </div>
                                    <div className="w-full flex justify-center">
                                        <Button className={`w-[50%] ${styles.submitButton}`} disabled={!formRenderProps.allowSubmit}>Register</Button>
                                    </div>
                                </div>
                                <div className="w-full flex justify-center items-center gap-2">
                                    <p className="text-[0.8rem] font-normal">
                                        You already having account?
                                    </p>
                                    <Link className="text-[0.5rem]" to="/todo/login">Go to login</Link>
                                </div>
                            </div>
                        </section>

                    </FormElement>
                )}
            />
        </ >
    )
})

export default Register