import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../UI/Button";
import Input from "../UI/Input";

const formFields = [
    { type: "email", name: "email", placeholder: "Email" },
    { type: "password", name: "password", placeholder: "Password" },
];

function Login() {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
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
            <Button>Login</Button>
        </form>
    );
}

export default Login;