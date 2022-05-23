import React, {useContext, useEffect, useState} from 'react';
import Head from "next/head";
import NavBar from "../components/NavBar";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {GlobalContext} from "../components/GlobalProvider";
import axios from "axios";
import {config} from "../config";

function Transfer(props) {
    const {getUserParsed, saveUser} = useContext(GlobalContext);
    const _user = getUserParsed();
    const [user, setUser] = useState({});

    useEffect(() => {
        if (_user) {
            setUser(_user);
        }
    }, []);

    const handleSubmit = async (values, {setSubmitting}) => {
        setSubmitting(true);
        axios({
            method: 'put',
            url: config.apiUrl + '/users/transfer',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email: user.email,
                amount: values.amount,
                toUser: values.toEmail,
            }
        }).then(res => {
            console.log(res);
            if (res.status === 201) {
                alert("Transfer successful");
                saveUser(res.data.userUpdated);
                setUser(res.data.userUpdated);
            } else {
                alert("Transfer failed");
            }
            values.amount = "";
            values.toEmail = "";
        }).catch(err => {
            console.log(err);
        })
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
                                toEmail: '',
                                amount: '',
                            }}
                            validate={
                                values => {
                                    const errors = {};

                                    if (!values.toEmail) {
                                        errors.toEmail = 'Email Required';
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.toEmail)
                                    ) {
                                        errors.toEmail = 'Invalid email address';
                                    } else if (values.toEmail === user.email) {
                                        errors.toEmail = 'Cannot transfer to yourself';
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
                                        <label htmlFor="toEmail">Email to transfer</label>
                                        <Field type="email"
                                               name="toEmail"
                                               className="form-control"
                                               placeholder={"john.doe@mail.com"} />
                                        <ErrorMessage name="toEmail" component="div" className="alert alert-danger" />
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
                                <button type="submit" className="btn btn-primary">Do Transfer</button>
                            </Form>
                        </Formik>
                    </div>
                </div>

            </main>
        </>
    );
}

export default Transfer;