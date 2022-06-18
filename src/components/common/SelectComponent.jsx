import Select from "react-select";

const SelectComponent = ({ value, options, id, name, formik }) => {
  return (
    <div className="formControl">
      <Select
        id={id}
        name={name}
        value={value}
        options={options}
        onChange={(option) => {
          formik.setFieldValue("country", option.id);
        }}
      />
      {formik.errors[name] && formik.touched[name] && (
        <div className="error">{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default SelectComponent;
