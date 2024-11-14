import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomFormikField from './CustomFormikField';

const CommentForm = ({ onSubmit }) => {
  const validationSchema = Yup.object({
    comment: Yup.string()
      .min(10, 'Коментар має бути не менше 10 символів')
      .required('Обов’язкове поле'),
  });

  return (
    <Formik
      initialValues={{ comment: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values); 
        resetForm(); 
      }}
    >
      <Form>
        <CustomFormikField label="Коментар" name="comment" type="text" />
        <button type="submit" className="btn btn-primary">Додати коментар</button>
      </Form>
    </Formik>
  );
};

export default CommentForm;
