import CategorySelect from "../ad/CategorySelect";
import css from "./Input.module.css";

function Input({ formik, type, name, placeholder, val}) {
    if(type === 'file') {
        return (
            <div className={css['file-input-wrapper']}>
                <input
                    className={css['file-input']}
                    type="file"
                    name="image"
                    onChange={(e) => formik.setFieldValue(name, e.target.files[0])}
                    onBlur={formik.handleBlur} 
                />
            </div>
        )
    }

    if(type === 'textarea') {
        return (
            <div className={css["input-wrapper"]}>
                <textarea
                    className={css.textarea}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                    defaultValue={formik.values[`${name}`]}
                    
                />
                {formik.touched.hasOwnProperty(name) && formik.errors.hasOwnProperty(name) && <p className={css["invalid-feedback"]}>{formik.errors[name]}</p>}
            </div>
        )
    }

    if(type === 'select') {
        return (
            <CategorySelect formik={formik} defVal={val}/>
        )
    }

    return (
        <div className={css["input-wrapper"]}>
            <input
                className={css.input}
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} 
                defaultValue={formik.values[`${name}`]}
                
            />
            {formik.touched.hasOwnProperty(name) && formik.errors.hasOwnProperty(name) && <p className={css["invalid-feedback"]}>{formik.errors[name]}</p>}
        </div>
    );
}

export default Input;