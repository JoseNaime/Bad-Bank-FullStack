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
        console.log(values);
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
            console.log(err.response.data.message);
            setError(err.response.data.message);
        })
        setSubmitting(false);
    }

    return (
        <div>
            <h1>Login</h1>
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
            <div>
                <Link href="/register">Create an Account</Link>
            </div>
        </div>
    );
}

export default Login;