import css from './UserInfo.module.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import Button from "../UI/Button";
import Icon from "../UI/Icon";
import Input from "../UI/Input";

const formFields = [
    { type: "text", name: "city", placeholder: "City" },
    { type: "text", name: "phone", placeholder: "Phone" }
];

function UserInfo({userInfo, editInfoToggle, setEditInfoToggle}) {
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            city: userInfo.city,
            phone: userInfo.phone,
        },
        validationSchema: Yup.object({
            city: Yup.string().nullable(),
            phone: Yup.string().max(12).matches(/^(\+370|8)([0-9]{8})$/, 'Invalid phone number').nullable(),
        }),
        onSubmit: async (values) => {
            console.log(values);
            setEditInfoToggle(false);
            // const editData = await postData('user/edit', values, token);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <h3>Your info:</h3>
            {editInfoToggle ? 
                <>
                    {formFields.map((field) => {
                        return (
                            <div key={field.name}>
                                <label htmlFor={field.name}>{field.name}</label>
                                <Input type={field.type} key={field.name} formik={formik} name={field.name} placeholder={field.placeholder} />
                            </div>
                        )
                    })}
                    <Button type="submit" mainBtn={true}>Confirm changes</Button>
                </> 
            :
                <ul className={css["user-info-list"]}>
                    <li><span>City:</span> {userInfo.city ? userInfo.city : 'Unspecified'}</li>
                    <li><span>Phone:</span> {userInfo.phone ? userInfo.phone :'Unspecified'}</li>
                    <li><span>Date registered:</span></li>
                    <li><span>Listings posted: </span> 3</li>
                    <li><span>Listings favorited: </span>5</li>
                </ul>
            }
        </form>
    );
}

export default UserInfo;