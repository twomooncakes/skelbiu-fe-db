
// CHANGE LATER
import css from './Credentials.module.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useEditProfileCtx } from '../../store/EditProfileContext';

const credFormFields = [
    { type: "password", name: "oldPassword", placeholder: "Old Password", label: "Old Password" },
    { type: "password", name: "newPassword", placeholder: "New Password", label: "New Password" },
    { type: "password", name: "repeatNewPassword", placeholder: "Repeat New Password", label: "Repeat New Password" },
];

function UserPassword() {
    const { setEditPasswordToggle } = useEditProfileCtx();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            oldPassword: "",
            newPassword: "",
            repeatNewPassword: "",
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string().min(6).required(),
            newPassword: Yup.string().min(6).required(),
            repeatNewPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Password fields must match').required(),
        }),
        onSubmit: async (values) => {
            console.log(values);
            setEditPasswordToggle(false);
            // const editData = await postData('user/edit', values, token);
        }
    });
    return (
        <form className={css["cred-form"]} onSubmit={formik.handleSubmit}>
            {credFormFields.map((field) => {
                return (
                    <div className={css["labeled-input"]} key={field.name}>
                        <label htmlFor={field.name}>{field.label}</label>
                        <Input type={field.type} key={field.name} formik={formik} name={field.name} placeholder={field.placeholder} />
                    </div>
                )
            })}
            <Button type="submit" mainBtn={true}>Confirm changes</Button>
        </form>
    );
}

export default UserPassword;