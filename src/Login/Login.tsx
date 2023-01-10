import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../components/common/FormsControls/FormsControls";
import {required} from "../utils/validators/validators";
import {getCaptcha, login} from "../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import s from '../components/common/FormsControls/FormsControls.module.css'
import {useAppDispatch, useAppSelector} from "../redux/hooks";

type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type PropsType = {
    captchaUrl: string
    getCaptcha: () => void
}


const LoginForm: React.FC<InjectedFormProps<FormDataType & PropsType> & PropsType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={"Email"} name={'email'} component={Input}
                       validate={[required]}/>
            </div>
            <div>
                <Field placeholder={"Password"} name={'password'} type={'password'} component={Input}
                       validate={[required]}/>
            </div>
            <div>
                <Field type={"checkbox"} name={'rememberMe'} component={'input'}/> remember me
            </div>
            {error && <div className={s.formSummaryError}>{error}</div>}
            {captchaUrl && <>
                <img src={captchaUrl} alt={'captcha'}/>
                <div></div>
                <Field type={"text"} name={'captcha'} component={'input'}/>
            </>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<FormDataType,any>({form: 'login'})(LoginForm)

export const Login = () => {

    const isAuth = useAppSelector(state => state.auth.isAuth)
    const captchaUrl = useAppSelector(state => state.auth.captchaUrl)

    const dispatch = useAppDispatch()
    const onSubmit = (formData: FormDataType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }
    if(isAuth) return <Redirect to={'/profile'}/>
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} getCaptcha={getCaptcha} />
        </div>
    );
};

