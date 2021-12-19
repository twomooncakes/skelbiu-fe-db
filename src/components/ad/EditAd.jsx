import { useFormik } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useAuthCtx } from '../../store/AuthContext';
import { postMultiPartData } from "../../utils/fetch";

const formFields = [
    { type: "text", name: "title", placeholder: "Title" },
    { type: "text", name: "description", placeholder: "Description" },
    { type: "number", name: "price", placeholder: "Price" },
    { type: "file", name: "mainImage" }
];

function EditAd({listingInfo, listingId}) {
    const { token } = useAuthCtx();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: listingInfo.title,
            description: listingInfo.description,
            price: listingInfo.price,
            mainImage: listingInfo.image,
        },
        validationSchema: Yup.object({
            title: Yup.string().max(25).required(),
            description: Yup.string().min(3),
            price: Yup.number().min(0).required(),
            mainImage: Yup.string(),
        }),
        onSubmit: async (values) => {
            console.log(values);
            // refactor later
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('price', values.price);
            formData.append('mainImage', values.mainImage);

            console.log(Object.fromEntries(formData));

            const listingData = await postMultiPartData(`listings/edit/${listingId}`, formData, token);
            // if(listingData.msg) {
            //     toast.success('add posted succesfully!');
            //     return;
            // }
            // if(Array.isArray(listingData.error)) {
            //     console.log(listingData.error[0].errorMsg);
            //     toast.error(listingData.error[0].errorMsg);
            //     return;
            // }
            // toast.error(listingData.error);
        }
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            {formFields.map((field) => {
                return (
                    <Input type={field.type} key={field.name} formik={formik} name={field.name} placeholder={field.placeholder} />
                )
            })}
            <Button type="submit" mainBtn={true}>Confirm Changes</Button>
        </form>
    );
}

export default EditAd;