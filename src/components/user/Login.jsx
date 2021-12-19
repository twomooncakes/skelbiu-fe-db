import { useFormik } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import Button from "../UI/Button";
import Input from "../UI/Input";
import { postData } from "../../utils/fetch";
import { useAuthCtx } from '../../store/AuthContext';
import { useEffect, useState } from "react";

const formFields = [
    { type: "email", name: "email", placeholder: "Email" },
    { type: "password", name: "password", placeholder: "Password" },
];

function Login() {
    const [response, setResponse] = useState([]);
    const { login } = useAuthCtx();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        }),
        onSubmit: async (values) => {
            const authData = await postData('auth/login', values);
            if(authData.msg) {
                login(authData.data.token, authData.data.email, authData.msg)
                return;
            }
            if(Array.isArray(authData.error)) {
                setResponse(authData.error);
                return;
            }
            toast.error(authData.error);
        }
    });

    const formikErrors = formik.setErrors;
    
    useEffect(() => {
        const errorObj = responseToErrors(response);
        formikErrors(errorObj);
    }, [response, formikErrors]);

    return (
        <form onSubmit={formik.handleSubmit}>
            {formFields.map((field) => {
                return (
                    <Input type={field.type} key={field.name} formik={formik} name={field.name} placeholder={field.placeholder} />
                )
            })}
            <Button type="submit" mainBtn={true}>Login</Button>
        </form>
    );
}

function responseToErrors(response) {
    const arrayStructure = response.map((errObj) => ({
        [errObj.field]: errObj.errorMsg,
    }));
  
    return Object.assign({}, ...arrayStructure);
}

export default Login;