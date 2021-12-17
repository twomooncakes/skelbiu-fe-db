
import css from './Credentials.module.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import Button from "../UI/Button";
import Icon from "../UI/Icon";
import Input from "../UI/Input";

const credFormFields = [
    { type: "email", name: "email", placeholder: "Email", label: "Email" },
    { type: "password", name: "oldPassword", placeholder: "Old password", label: "Old Password" },
    { type: "password", name: "newPassword", placeholder: "Password", label: "New Password" },
    { type: "password", name: "repeatPassword", placeholder: "Repeat Password", label: "Repeat Password" },
];

function Credentials({userInfo, editCredToggle, setEditCredToggle}) {
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: userInfo.email,
            oldPassword: "",
            newPassword: "",
            repeatPassword: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            newPassword: Yup.string().min(6),
            repeatPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Password fields must match'),
        }),
        onSubmit: async (values) => {
            console.log(values);
            setEditCredToggle(false);
            // const editData = await postData('user/edit', values, token);
        }
    });
    return (
        <div className={css.credentials}>
            {editCredToggle ? 
                <>
                    {credFormFields.map((field) => {
                        return (
                            <div className={css["labeled-input"]} key={field.name}>
                                <label htmlFor={field.name}>{field.label}</label>
                                <Input type={field.type} key={field.name} formik={formik} name={field.name} placeholder={field.placeholder} />
                            </div>
                        )
                    })}
                    <Button type="submit" mainBtn={true}>Confirm changes</Button>
                </>
            :
                <>
                    <h2>{userInfo.email}</h2><Icon icon='fa-pencil' />
                </>
            } 
        </div>

    );
}

export default Credentials;