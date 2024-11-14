import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomFormikField from './CustomFormikField';

const RegistrationForm = ({ onSubmit }) => {
  const studentId = 19; 
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, 'Ім’я має бути не менше 3 символів')
      .required('Обов’язкове поле'),
    lastName: Yup.string()
      .max(10 + studentId, `Прізвище має бути не більше ${10 + studentId} символів`)
      .required('Обов’язкове поле'),
    email: Yup.string().email('Невірна електронна пошта').required('Обов’язкове поле'),
    password: Yup.string()
      .matches(/[A-Z]/, 'Пароль має містити хоча б одну велику літеру')
      .matches(/[^a-zA-Z0-9]/, 'Пароль має містити хоча б один спеціальний символ')
      .required('Обов’язкове поле'),
  });

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values); 
        resetForm(); 
      }}
    >
      <Form>
        <CustomFormikField label="Ім’я" name="firstName" type="text" />
        <CustomFormikField label="Прізвище" name="lastName" type="text" />
        <CustomFormikField label="Електронна пошта" name="email" type="email" />
        <CustomFormikField label="Пароль" name="password" type="password" />
        <button type="submit" className="btn btn-primary">Зареєструватися</button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
