import { useFormik } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import Button from "../UI/Button";
import Input from "../UI/Input";
import css from './UserEmail.module.css';
import { useEditProfileCtx } from "../../store/EditProfileContext";
import { postData } from "../../utils/fetch";
import { useAuthCtx } from "../../store/AuthContext";
import { useHistory } from "react-router-dom";

const credFormFields = [
    { type: "email", name: "email", placeholder: "Email", label: "Email" },
    { type: "password", name: "password", placeholder: "Password", label: "Password" },
];

function UserEmail({userInfo}) {
    const history = useHistory();
    const { token, logout } = useAuthCtx();
    const { editEmailToggle, setEditEmailToggle } = useEditProfileCtx();

    const handleDeleteUser = async () => {
        const deleteData = await postData('user/delete', {}, token);
        if(deleteData.msg) {
            logout();
            toast.success(deleteData.msg);
            history.push('/');
            return;
        }
        toast.error('something went wrong');
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: userInfo.email,
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email(),
            password: Yup.string().min(6).when('email', {
                is: (email) => email !== userInfo.email,
                then: Yup.string().min(6).required()
            }),

        }),
        onSubmit: async (values) => {
            setEditEmailToggle(false);
            const editData = await postData('user/edit/email', values, token);
            if(editData.error) {
                return toast.error(editData.error);
            }
            toast.success(editData.msg); 
        }
    });
    return (
        <>
            {editEmailToggle ? 
                <form className={css["user-email"]} onSubmit={formik.handleSubmit}>
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
            :
                <div className={css.account}>
                    <h2>{userInfo.email}</h2>
                    <Button mainBtn={true} clickFunc={handleDeleteUser}>Delete Account</Button>
                </div>
            } 
        </>
    );
}

export default UserEmail;