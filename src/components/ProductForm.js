import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomFormikField from './CustomFormikField';

const ProductForm = ({ onSubmit }) => {
  const validationSchema = Yup.object({
    productName: Yup.string().required('Назва товару є обов’язковою'),
    price: Yup.number()
      .min(1, 'Ціна повинна бути більше 0')
      .required('Обов’язкове поле'),
    quantity: Yup.number()
      .min(1, 'Кількість повинна бути більше 0')
      .integer('Кількість повинна бути цілим числом')
      .required('Обов’язкове поле'),
  });

  return (
    <Formik
      initialValues={{ productName: '', price: '', quantity: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values); 
        resetForm(); 
      }}
    >
      <Form>
        <CustomFormikField label="Назва товару" name="productName" type="text" />
        <CustomFormikField label="Ціна" name="price" type="number" />
        <CustomFormikField label="Кількість" name="quantity" type="number" />
        <button type="submit" className="btn btn-primary">Додати товар</button>
      </Form>
    </Formik>
  );
};

export default ProductForm;
