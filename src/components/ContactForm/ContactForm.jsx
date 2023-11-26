import React from 'react';
import * as yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import { FromButton, FromPhonebook, Input } from './ContactForm.styled';

const initialValues = {
  name: '',
  number: '',
};

// let Schema = yup.object().shape({
//   name: yup.string().required(),
//   number: yup.string().required().min(7).max(10),
// });

const Schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Please check that the name you have dialed is correct'
    ),
  number: yup
    .string()
    .required()
    .trim()
    .test('noLettersInside', 'Number cannot contain letters', value => {
      return !/[a-zA-Zа-яА-Я]/.test(value);
    })
    .matches(
      /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/,
      'Please check that the number you have dialed is correct'
    ),
});

export const ContactForm = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values.name, values.number);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Schema}
    >
      <FromPhonebook>
        <label>
          Name
          <Input type="text" name="name" required />
          <ErrorMessage name="name" />
        </label>
        <label>
          Number
          <Input type="tel" name="number" />
          <ErrorMessage name="number" />
        </label>
        <FromButton type="submit">Add contact</FromButton>
      </FromPhonebook>
    </Formik>
  );
};
