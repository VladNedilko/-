import React from 'react';
import { useField } from 'formik';

const CustomFormikField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input {...field} {...props} className="form-control" />
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomFormikField;
