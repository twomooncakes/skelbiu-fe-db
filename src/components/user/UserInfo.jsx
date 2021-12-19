import css from './UserInfo.module.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import Button from "../UI/Button";
import Input from "../UI/Input";
import TimeAgo from 'timeago-react';
import { useEditProfileCtx } from '../../store/EditProfileContext';
import { postData } from '../../utils/fetch';
import { useAuthCtx } from '../../store/AuthContext';
import { useEffect, useState } from "react";

const formFields = [
    { type: "text", name: "city", placeholder: "City" },
    { type: "text", name: "phone", placeholder: "Phone" }
];

function UserInfo({userInfo}) {
    const [response, setResponse] = useState([]);
    const { token } = useAuthCtx();
    const { editInfoToggle, setEditInfoToggle } = useEditProfileCtx();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            city: userInfo.city || "",
            phone: userInfo.phone || "",
        },
        validationSchema: Yup.object({
            city: Yup.string().matches(/[A-zÀ-ž\s^\D*]/, 'letters and spaces only').nullable(),
            phone: Yup.string().max(12).matches(/^(\+370|8)([0-9]{8})$/, 'Invalid phone number').nullable(),
        }),
        onSubmit: async (values) => {
            console.log(values);
            const editData = await postData('user/edit/info', values, token);
            if(editData.msg) {
                toast.success(editData.msg);
                setEditInfoToggle(false);
                return;
            }
            if(Array.isArray(editData.error)) {
                setResponse(editData.error);
                return;
            }
            toast.error(editData.error);
        }
    });

    const formikErrors = formik.setErrors;

    useEffect(() => {
        const errorObj = responseToErrors(response);
        formikErrors(errorObj);
    }, [response, formikErrors]);

    return (
        <section className={css["user-info-wrapper"]}>
            {/* <h2>Your info:</h2> */}
            {editInfoToggle ? 
                <form onSubmit={formik.handleSubmit}>
                    {formFields.map((field) => {
                        return (
                            <div key={field.name}>
                                <label htmlFor={field.name}>{field.name}</label>
                                <Input type={field.type} key={field.name} formik={formik} name={field.name} placeholder={field.placeholder} />
                            </div>
                        )
                    })}
                    <Button type="submit" mainBtn={true}>Confirm changes</Button>
                </form> 
            :
                <ul className={css["user-info-list"]}>
                    <li><span>City:</span> {userInfo.city ? userInfo.city : 'Unspecified'}</li>
                    <li><span>Phone:</span> {userInfo.phone ? userInfo.phone :'Unspecified'}</li>

                    <li><span>Member since:</span> <TimeAgo datetime={userInfo.timestamp}/></li>
                    <li><span>Listings posted: </span> {userInfo.numOfAds}</li>
                    <li><span>Listings favorited: </span> {userInfo.numOfFaves}</li>
                </ul>
            }
        </section>
    );
}

export default UserInfo;

function responseToErrors(response) {
    const arrayStructure = response.map((errObj) => ({
        [errObj.field]: errObj.errorMsg,
    }));
  
    return Object.assign({}, ...arrayStructure);
}