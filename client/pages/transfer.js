import React, {useContext, useEffect, useState} from 'react';
import Head from "next/head";
import NavBar from "../components/NavBar";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {GlobalContext} from "../components/GlobalProvider";

function Transfer(props) {
    const {getUserParsed, saveUser} = useContext(GlobalContext);
    const _user = getUserParsed();
    const [user, setUser] = useState({});

    useEffect(() => {
        if (_user) {
            setUser(_user);
        }
    }, [_user]);

    const handleSubmit = (values, {setSubmitting}) => {
        setSubmitting(true);
        //saveUser(values);
        setSubmitting(false);
    };

    return (
        <>
            <Head>
                <title>Transfer | Bad Bank</title>
                <meta name="description" content="Deposit to your Bad Bank" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <main>
                <div className="card">
                    <div className="card-content ">
                        <div className="card-header">
                            <h1>Transfer</h1>
                            <div className="card-balance">
                                <p>Current Balance</p>
                                <h5>${user.balance}</h5>
                            </div>
                        </div>
                        <p>
                            Transfer money to another account
                        </p>
                        <Formik
                            initialValues={{
                                email: '',
                                amount: '',
                            }}
                            validate={
                                values => {
                                    const errors = {};

                                    if (!values.email) {
                                        errors.email = 'Email Required';
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {
                                        errors.email = 'Invalid email address';
                                    }

                                    if (!values.amount) {
                                        errors.amount = 'Required';
                                    } else if (isNaN(values.amount)) {
                                        errors.amount = 'Must be a number';
                                    } else if (values.amount < 0) {
                                        errors.amount = 'Must be positive';
                                    } else if (user.balance - values.amount < 0) {
                                        errors.amount = 'Must be less than your balance';
                                    }
                                    return errors;
                                }
                            }
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <div className="form-group">
                                    <div className="field-group">
                                        <label htmlFor="email">Email to transfer</label>
                                        <Field type="email" name="email" className="form-control" />
                                        <ErrorMessage name="email" component="div" className="alert alert-danger" />
                                    </div>
                                    <div className="currency-input-container">
                                        <p>$</p>
                                        <Field type="number"
                                               name="amount"
                                               className="form-control"
                                               placeholder="0.00" />
                                    </div>
                                    <ErrorMessage name="amount" component="div" className="alert alert-danger" />
                                </div>
                                <button type="submit" className="btn btn-primary">Do Deposit</button>
                            </Form>
                        </Formik>
                    </div>
                </div>

            </main>
        </>
    );
}

export default Transfer;