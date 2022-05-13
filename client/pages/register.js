import React, {useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import axios from 'axios';

function Register(props) {
    const [error, setError] = useState('');
    const handleSubmit = (values) => {
        axios({
            method: 'POST',
            url: process.env.NEXT_PUBLIC_API_URL +'/users',
            headers: {
                'Content-Type': 'application/json',
            },
            data: values,
        }).then(res => {
            const userData = res.data.data;
            const status = res.status;
            console.log(JSON.stringify(res))
            if (status === 200) {
                alert('User Created Successfully ' + userData.name);
                props.history.push('/login');
            }
        }).catch(err => {
            console.log(err.response.data.message);
            setError(err.response.data.message);
        })
    }

    return (
        <div>
            <h1>Create Account</h1>
            <Formik
                initialValues={{name: '', email: '', password: ''}}
                validate={values => {
                    const errors = {};
                    if (!values.name) {
                        errors.name = 'Name is Required';
                    }
                    if (!values.email) {
                        errors.email = 'Email is Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.password) {
                        errors.password = 'Password is Required';
                    } else if (values.password.length < 6) {
                        errors.password = 'Password must be at least 6 characters';
                    }

                    return errors;
                }}
                onSubmit={handleSubmit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="name" />
                        <ErrorMessage name="name" component="div" />
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                        <div>{error}</div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Register;