import { Button } from "@progress/kendo-react-buttons";
import {
    Field,
    FieldRenderProps,
    FieldWrapper,
    Form,
    FormElement,
    FormRenderProps
} from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { useContext, useState } from "react";
import { authentActions } from '../../mobX/store';
import { Error } from "@progress/kendo-react-labels";

type Props = {}
const emailRegex: RegExp = new RegExp(/\S+@\S+\.\S+/);
const emailValidator = (value: string) =>
    emailRegex.test(value) ? "" : "Please enter a valid emaiahfdskjl.";


// this component will render the file input of email, and will checking if mail incorrect
const EmailInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
        <div className="k-form-field-wrap">
            <Input {...others} />
            {visited && validationMessage && <Error>{validationMessage}</Error>}
        </div>
    );
};

const Register = (props: Props) => {
    const registerAction = useContext(authentActions)

    const [error, setError] = useState<object>()

    // calling to mobx and passing data to state of mobx
    const submitRegister = (dataItem: {
        [name: string]: any;
    }) => {
        console.log('submit', dataItem);
        console.log(dataItem.username);

    }

    return (
        <Form
            onSubmit={submitRegister}
            render={(formRenderProps: FormRenderProps) => (
                <FormElement>
                    <div className='w-full h-svh flex justify-center items-center bg-transparent'>
                        <div className=' h-[30rem] w-[25rem] flex flex-col items-center gap-[2rem] rounded-xl shadow-2xl backdrop-blur-xl bg-white/30 overflow-hidden'>
                            <div className='w-full h-[5rem] flex justify-center items-center box-primary-gradientcolor'>
                                <p className='w-max text-[1.6rem] font-bold text-white'>Register</p>
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
                                    {/* <FloatingLabel
                                        label={"User Name:"}
                                        editorId="username"
                                        editorValue={userName}
                                        className="w-full"
                                    >
                                        <Input id="username" name="username" value={userName} onChange={(e) => typeof e.target.value === 'string' && setUserName(e.target.value)} className="w-full h-[3rem]" />
                                    </FloatingLabel> */}
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
                                    {/* <FloatingLabel
                                        label={"Password:"}
                                        editorId="password"
                                        editorValue={password}
                                        className="w-full"
                                    >
                                        <Input id="password" name="password" value={password} onChange={(e) => typeof e.target.value === 'string' && setPassword(e.target.value)} className="w-full h-[3rem]" />
                                    </FloatingLabel> */}
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
                                <Button disabled={!formRenderProps.allowSubmit}>Submit</Button>
                            </div>
                        </div>

                    </div>
                </FormElement>
            )}
        />
    )
}

export default Register