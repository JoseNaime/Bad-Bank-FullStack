import React, {useContext, useEffect, useState} from 'react';
import Head from "next/head";
import NavBar from "../components/NavBar";
import {GlobalContext} from "../components/GlobalProvider";
import {useRouter} from "next/router";
import axios from "axios";
import {ErrorMessage, Field, Form, Formik} from "formik";
import CurrentBalance from "../components/CurrentBalance";

function Withdraw() {
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
            url: process.env.NEXT_PUBLIC_API_URL + '/users/withdraw',
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
                alert("Withdrawal successful");
                saveUser(res.data.newUser);
                setUser(res.data.newUser);
            } else {
                alert("Withdawal failed");
            }
        }).catch(err => {
            console.log(err);
        });
        setSubmitting(false);
    }
    return (
        <div>
            <Head>
                <title>Withdraw | Bad Bank</title>
                <meta name="description" content="Withdraw to your Bad Bank" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavBar />
            <main>
                <h1>Withdraw</h1>
                <p>
                    Withdraw money to your Bad Bank account.
                </p>
                <CurrentBalance user={user}/>
                <Formik
                    initialValues={{
                        amount: '',
                    }}
                    validate={
                        values => {
                            let errors = {};
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

export default Withdraw;