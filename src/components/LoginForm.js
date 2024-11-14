import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomFormikField from './CustomFormikField';

const LoginForm = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email('Невірна електронна пошта').required('Обов’язкове поле'),
    password: Yup.string().required('Пароль є обов’язковим'),
  });

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Login Data:', values);
      }}
    >
      <Form>
        <CustomFormikField label="Електронна пошта" name="email" type="email" />
        <CustomFormikField label="Пароль" name="password" type="password" />
        <button type="submit" className="btn btn-primary">Увійти</button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
