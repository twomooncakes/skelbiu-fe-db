import css from "./Input.module.css";

function Input({ formik, type, name, placeholder, value }) {
    return (
      <div className={css["input-wrapper"]}>
        <input
            className={css.input}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} 
            value={value}
            
        />
        {formik.touched.hasOwnProperty(name) && formik.errors.hasOwnProperty(name) && <p className={css["invalid-feedback"]}>{formik.errors[name]}</p>}
      </div>
    );
}

export default Input;