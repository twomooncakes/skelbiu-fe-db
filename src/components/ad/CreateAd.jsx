import { useFormik } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import Button from "../UI/Button";
import Input from "../UI/Input";

const formFields = [
    { type: "text", name: "title", placeholder: "Title" },
    { type: "text", name: "description", placeholder: "Description" },
    { type: "number", name: "price", placeholder: "Price" },
    { type: "file", name: "image", placeholder: "Image" }
];

function CreateAd() {
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: 0,
            image: ""
        },
        validationSchema: Yup.object({
            title: Yup.string().max(40).required(),
            description: Yup.string().min(3),
            price: Yup.number().min(0).required(),
            // add image validation 
        }),
        onSubmit: async (values) => {
            console.log(values);
            toast.success('add posted succesfully!');
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