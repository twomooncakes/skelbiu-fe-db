import css from "./Input.module.css";

function Input({ formik, type, name, placeholder}) {
    return (
        <>
        {type === 'file' ?
            <div className={css['file-input-wrapper']}>
                <input
                    className={css['file-input']}
                    type="file"
                    name="image"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur} 
                />
            </div>
        :
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
        }   
        </>
    );
}

export default Input;