import { Button } from '@progress/kendo-react-buttons';
import { Field, FieldWrapper, Form, FormElement, FormRenderProps } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { authenticationActions } from '../../mobX/store';
import styles from './page.module.css';

type Props = {}

const Login = observer((props: Props) => {
    //*Define the store by using context 
    const loginAction = authenticationActions
    const navigate = useNavigate()


    //*Trigger to login the field
    const submitRegister = (dataItem: { [name: string]: any }) => {
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
            <Form
                onSubmit={submitRegister}
                render={(formRenderProps: FormRenderProps) => (
                    <FormElement className='w-full h-full flex justify-center items-center'>
                        <div className='w-auto h-auto'>
                            <div className=' min-h-[25rem] w-[25rem] flex flex-col items-center gap-[2rem] rounded-xl shadow-2xl backdrop-blur-xl bg-white/30 overflow-hidden'>
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
                                <div className="w-full flex justify-center items-center gap-2">
                                    <p className="text-[0.8rem] font-normal">
                                        Want to Register?
                                    </p>
                                    <Link className="text-[0.5rem]" to="/">Go to Register</Link>
                                </div>
                            </div>
                        </div>

                    </FormElement>
                )}
            />
        </>
    )
})

export default Login