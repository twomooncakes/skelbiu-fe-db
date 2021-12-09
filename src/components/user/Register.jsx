import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../UI/Button";
import Input from "../UI/Input";

const formFields = [
    { type: "email", name: "email", placeholder: "Email" },
    { type: "password", name: "password", placeholder: "Password" },
    { type: "password", name: "repeatPassword", placeholder: "Repeat password" },
];

function Register() {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            repeatPassword: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            repeatPassword: Yup.string().required().oneOf([Yup.ref('password')], 'Password fields must match')
        }),
        onSubmit: async (values) => {
            console.log(values);
        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            {formFields.map((field) => {
                return (
                    <Input type={field.type} key={field.name} formik={formik} name={field.name} placeholder={field.placeholder} />
                )
            })}
            <Button>Register</Button>
        </form>
    );
}

export default Register;