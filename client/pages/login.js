import React, {useContext, useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import axios from 'axios';
import Link from 'next/link';
import {GlobalContext} from "../components/GlobalProvider";
import {useRouter} from "next/router";

function Login(props) {
    const [error, setError] = useState('');
    const {login, getUserString} = useContext(GlobalContext);
    const user = getUserString();
    const router = useRouter();

    useEffect(() => {
        if (user.name) {
            router.push('/')
        }
    }, [user, router]);

    const handleSubmit = async (values, {setSubmitting}) => {
        axios({
            method: 'POST',
            url: process.env.NEXT_PUBLIC_API_URL +'/auth/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: values,
        }).then(res => {
            const userData = res.data.data;
            const status = res.status;

            if (status === 200) {
                alert('Login Successful ' + userData.name);
                login(userData);
                router.push('/');
            }
        }).catch(err => {
            if (err.response.data) {
                setError(err.response.data.message);
            } else {
                setError('Something went wrong');
            }
        })
        setSubmitting(false);
    }

    return (
        <main>
            <h1 className="text-center title">Bad Bank</h1>
            <div className="card">
                <div className="card-content ">
                    <h2 className="text-center">Login</h2>
                    <Formik
                        initialValues={{email: '', password: ''}}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Email Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            return errors;
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <div className="field-group">
                                    <label htmlFor="email">Email</label>
                                    <Field type="email" name="email" className="form-control" placeholder={"john.doe@mail.com"} />
                                    <ErrorMessage name="email" component="div" />
                                </div>
                                <div className="field-group">
                                    <label htmlFor="password">Password</label>
                                    <Field type="password" name="password" className="form-control" placeholder={"******"}/>
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
                        <Link  href="/register">Create an Account</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Login;