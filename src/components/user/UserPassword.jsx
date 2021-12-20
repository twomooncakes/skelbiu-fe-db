
import css from './UserPassword.module.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useEditProfileCtx } from '../../store/EditProfileContext';
import { postData } from '../../utils/fetch';
import { useAuthCtx } from '../../store/AuthContext';
import { useHistory } from 'react-router-dom';

const credFormFields = [
    { type: "password", name: "oldPassword", placeholder: "Old Password", label: "Old Password" },
    { type: "password", name: "newPassword", placeholder: "New Password", label: "New Password" },
    { type: "password", name: "repeatNewPassword", placeholder: "Repeat New Password", label: "Repeat New Password" },
];

function UserPassword() {
    const { token, logout } = useAuthCtx();
    const { setEditPasswordToggle } = useEditProfileCtx();
    const history = useHistory();
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
            const passwordData = await postData('user/edit/password', values, token);
            if(passwordData.msg) {
                setEditPasswordToggle(false);
                toast.success(passwordData.msg);
                logout();
                history.push('/');
                return;
            }
            toast.error(passwordData.error);
        }
    });
    return (
        <form className={css["user-password"]} onSubmit={formik.handleSubmit}>
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