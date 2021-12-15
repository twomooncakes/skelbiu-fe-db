import { useFormik } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import Button from "../UI/Button";
import Input from "../UI/Input";
import { postData } from "../../utils/fetch";
import { useAuthCtx } from '../../store/AuthContext';

const formFields = [
    { type: "email", name: "email", placeholder: "Email" },
    { type: "password", name: "password", placeholder: "Password" },
];

function Login() {
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
            console.log(values);
            const authData = await postData('auth/login', values);
            if(authData.msg) {
                login(authData.data.token, authData.data.email, authData.msg)
                return;
            }
            if(Array.isArray(authData.error)) {
                console.log(authData.error[0].errorMsg);
                toast.error(authData.error[0].errorMsg);
                return;
            }
            toast.error(authData.error);
        }
    });
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

export default Login;