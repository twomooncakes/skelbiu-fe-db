import { useFormik } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useAuthCtx } from '../../store/AuthContext';
import { postMultiPartData } from "../../utils/fetch";
import { useHistory } from "react-router-dom";

const formFields = [
    { type: "text", name: "title", placeholder: "Title" },
    { type: "textarea", name: "description", placeholder: "Description" },
    { type: "number", name: "price", placeholder: "Price" },
    { type: "file", name: "mainImage" },
    { type: "select", name: "categoryId" },
];

function CreateAd() {
    const { token } = useAuthCtx();
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: 0,
            mainImage: "",
            categoryId: ""
        },
        validationSchema: Yup.object({
            title: Yup.string().max(25).required(),
            description: Yup.string().min(3),
            price: Yup.number().min(0).required(),
            mainImage: Yup.string()
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('price', values.price);
            formData.append('mainImage', values.mainImage);
            formData.append('categoryId', values.categoryId);


            const listingData = await postMultiPartData('listings/new', formData, token);
            if(listingData.msg) {
                toast.success('add posted succesfully!');
                history.push('/');
                return;
            }
            if(Array.isArray(listingData.error)) {
                toast.error(listingData.error[0].errorMsg);
                return;
            }
            toast.error(listingData.error);
            
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            {formFields.map((field) => {
                return (
                    <Input type={field.type} key={field.name} formik={formik} name={field.name} placeholder={field.placeholder} />
                )
            })}
            <Button type="submit" mainBtn={true}>Create</Button>
        </form>
    );
}

export default CreateAd;