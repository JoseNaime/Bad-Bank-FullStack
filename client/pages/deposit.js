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
            } else {
                alert("Deposit failed");
            }
        }).catch(err => {
            console.log(err);
        });
        setSubmitting(false);
    }

    return (
        <div>
            <Head>
                <title>Deposit | Bad Bank</title>
                <meta name="description" content="Deposit to your Bad Bank" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <main>
                <h1>Deposit</h1>
                <p>
                    Deposit money to your Bad Bank account.
                </p>
                <Formik
                    initialValues={{
                        amount: '',
                    }}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <Field type="number"
                                   name="amount"
                                   className="form-control"
                                   id="amount"
                                   placeholder="Amount" />
                            <ErrorMessage name="amount" component="div" className="alert alert-danger" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </Form>
                </Formik>

            </main>
        </div>
    );
}

export default Deposit;