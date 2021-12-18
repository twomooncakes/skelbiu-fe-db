import { useFormik } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import Button from "../UI/Button";
import Input from "../UI/Input";
// CHANGE LATER
import css from './Credentials.module.css';
import { useEditProfileCtx } from "../../store/EditProfileContext";
import { postData } from "../../utils/fetch";
import { useAuthCtx } from "../../store/AuthContext";

const credFormFields = [
    { type: "email", name: "email", placeholder: "Email", label: "Email" },
    { type: "password", name: "password", placeholder: "Password", label: "Password" },
];

function UserEmail({userInfo}) {
    const { token } = useAuthCtx();
    const { editEmailToggle, setEditEmailToggle } = useEditProfileCtx();
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
            console.log(values);
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
            :
                <div>
                    <h2>{userInfo.email}</h2>
                </div>
            } 
        </>
    );
}

export default UserEmail;