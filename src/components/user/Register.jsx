import { useFormik } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import Button from "../UI/Button";
import Input from "../UI/Input";
import { postData } from "../../utils/fetch";

const formFields = [
    { type: "email", name: "email", placeholder: "Email" },
    { type: "password", name: "password", placeholder: "Password" },
    { type: "password", name: "repeatPassword", placeholder: "Repeat password" },
    { type: "text", name: "city", placeholder: "City" },
    { type: "text", name: "phone", placeholder: "Phone" }
];

function Register() {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            repeatPassword: "",
            city: "",
            phone: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            repeatPassword: Yup.string().required().oneOf([Yup.ref('password')], 'Password fields must match'),
            city: Yup.string(),
            phone: Yup.string().max(12).matches(/^(\+370|8)([0-9]{8})$/, 'Invalid phone number'),
        }),
        onSubmit: async (values) => {
            console.log(values);
            const authData = await postData('auth/register', values);
            if(authData.msg) {
                toast.success(authData.msg);
                return;
            }
            console.log(authData.error);
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
            <Button type="submit" mainBtn={true}>Register</Button>
        </form>
    );
}

export default Register;