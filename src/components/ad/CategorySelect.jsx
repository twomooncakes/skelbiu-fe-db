import { useEffect, useState } from "react";
import { getData } from "../../utils/fetch";
import css from "./CategorySelect.module.css";

function CategorySelect({formik}) {
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const catData = await getData('categories');
        setCategories(catData.data);
    }

    useEffect(() => {
        getCategories();
        return () => {
            setCategories([]);
        }
    }, [])

    return (
        <select className={css["category-select"]} name="categoryId" id="categoryId" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.categoryId}>
            <option value={0}>Choose Category</option>
            {categories.map(({id, category_name}) => {
                return (
                    <option key={id} value={id}>{category_name}</option>
                )
            })}
        </select>
    );
}

export default CategorySelect;