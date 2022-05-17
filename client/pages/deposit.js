import React, {useContext, useEffect, useState} from 'react';
import Head from "next/head";
import NavBar from "../components/NavBar";
import {ErrorMessage, Field, Form, Formik} from 'formik';
import {GlobalContext} from "../components/GlobalProvider";
import {useRouter} from "next/router";
import axios from "axios";

function Deposit() {
    const {getUserParsed, saveUser} = useContext(GlobalContext);
    const _user = getUserParsed();
    const [user, setUser] = useState({});
    const router = useRouter();

    useEffect(() => {
        console.log(_user);
        if (!_user) {
            router.push('/login')
        } else {
            setUser(_user);
        }
    }, []);

    const handleSubmit = async (values, {setSubmitting}) => {
        console.log("Submitted, account: " + values.amount);
        axios({
            method: 'put',
            url: process.env.NEXT_PUBLIC_API_URL + '/users/deposit',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                email: user.email,
                amount: values.amount,
            }
        }).then(res => {
            console.log(res);
            if (res.status === 201) {
                alert("Deposit successful");
                saveUser(res.data.newUser);
                setUser(res.data.newUser);
            } else {
                alert("Deposit failed");
            }
        }).catch(err => {
            console.log(err);
        });
        setSubmitting(false);
    }

    return (
        <>
            <Head>
                <title>Deposit | Bad Bank</title>
                <meta name="description" content="Deposit to your Bad Bank" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <main>
                <div className="card absolute-center">
                    <div className="card-content ">
                        <div className="card-header">
                            <h1>Deposit</h1>
                            <div className="card-balance">
                                <p>Current Balance</p>
                                <h5>${user.balance}</h5>
                            </div>
                        </div>
                        <p>
                            Deposit money to your Bad Bank account.
                        </p>
                        <Formik
                            initialValues={{
                                amount: '',
                            }}
                            validate={
                                values => {
                                    const errors = {};
                                    if (!values.amount) {
                                        errors.amount = 'Required';
                                    } else if (isNaN(values.amount)) {
                                        errors.amount = 'Must be a number';
                                    } else if (values.amount < 0) {
                                        errors.amount = 'Must be positive';
                                    }
                                    return errors;
                                }
                            }
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <div className="form-group">
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

export default Deposit;