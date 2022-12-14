import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from '../pages/firebase'

export const SignIn = () => {
  const navigate = useNavigate()

  return (
    <Formik
       initialValues={{ password: '', email: '' }}
       validationSchema={Yup.object({
         password: Yup.string()
           .max(15, 'Must be 15 characters or less')
           .required('Required'),
         password: Yup.string()
           .max(20, 'Must be 20 characters or less')
           .required('Required'),
         email: Yup.string().email('Invalid email address').required('Required'),
       })}
       onSubmit={(values, { setSubmitting }) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          navigate('/dashboard')
          setSubmitting(false)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
       }}
     >
       <Form>
         <label htmlFor="password">Admin email</label>
         <Field name="email" type="email" className="form-control w-100" />
         <ErrorMessage name="email" />
 
         <label htmlFor="password">Admin password</label>
         <Field name="password" type="password" className="form-control" />
         <ErrorMessage name="password" />
 
         <button type="submit" className='btn btn-primary mt-3 w-100'>Log in</button>
       </Form>
     </Formik>
  );
};