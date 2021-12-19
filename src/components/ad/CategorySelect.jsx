import { useEffect, useState } from "react";
import { getData } from "../../utils/fetch";
import css from "./CategorySelect.module.css";

function CategorySelect({formik, defVal}) {
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const catData = await getData('categories');
        console.log(catData);
        setCategories(catData.data);
    }

    useEffect(() => {
        getCategories();
        return () => {
            setCategories([]);
        }
    }, [])
    console.log(formik.values.categoryId);
    return (
        <select className={css["category-select"]} name="categoryId" id="categoryId" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.categoryId}>
            <option value={null}>Choose Category</option>
            {categories.map(({id, category_name}) => {
                return (
                    <option key={id} value={id}>{category_name}</option>
                )
            })}
        </select>
    );
}

export default CategorySelect;