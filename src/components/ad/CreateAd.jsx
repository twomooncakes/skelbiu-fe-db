import { useFormik } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';
import Button from "../UI/Button";
import Input from "../UI/Input";

const formFields = [
    { type: "text", name: "title", placeholder: "Title" },
    { type: "text", name: "description", placeholder: "Description" },
    { type: "number", name: "price", placeholder: "Price" },
    { type: "file", name: "mainImage", placeholder: "Image" }
];

function CreateAd() {
    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            price: 0,
            mainImage: ""
        },
        validationSchema: Yup.object({
            title: Yup.string().max(40).required(),
            description: Yup.string().min(3),
            price: Yup.number().min(0).required(),
            // add image validation 
        }),
        onSubmit: async (values) => {
            console.log(values);
            // refactor later
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('mainImage', values.mainImage)
            console.log(formData.get('mainImage'));

            const res = await fetch('http://localhost:5000/create', {
                method: 'POST',
                body: formData,
            });
            const data = await res.text();
            console.log(data);
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