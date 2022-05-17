import React, {useContext, useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import axios from 'axios';
import {useRouter} from "next/router";
import {GlobalContext} from "../components/GlobalProvider";
import Link from "next/link";

function Register(props) {
    const [error, setError] = useState('');
    const {getUserString} = useContext(GlobalContext);
    const user = getUserString();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    const handleSubmit = (values, {setSubmitting}) => {
        axios({
            method: 'POST',
            url: process.env.NEXT_PUBLIC_API_URL +'/users/create',
            headers: {
                'Content-Type': 'application/json',
            },
            data: values,
        }).then(res => {
            const userData = res.data.user;
            const status = res.status;
            console.log(JSON.stringify(userData))
            console.log(status)
            if (status === 201) {
                alert('User Created Successfully ' + userData.name);
                router.push('/login');
            }
        }).catch(err => {
            console.log(err.response.data.message);
            setError(err.response.data.message);
        })
        setSubmitting(false);
    }

    return (
        <div>
            <div className="card">
                <div className="card-content ">
                    <h1 className="text-center">Create Account</h1>
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
                                <div className="field-group">
                                    <label htmlFor="email">Email</label>
                                    <Field type="email" name="email" className="form-control" />
                                    <ErrorMessage name="email" component="div" />
                                </div>
                                <div className="field-group">
                                    <label htmlFor="password">Password</label>
                                    <Field type="password" name="password" className="form-control" />
                                    <ErrorMessage name="password" component="div" />
                                </div>
                                <div className='alert'>{error}</div>
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </Form>
                        )}
                    </Formik>
                    <div className={"btn-secondary"}>
                        <Link  href="/login">Go to Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;