import React, { useState, useEffect } from 'react'
import Navbar2 from '../../components/Navbar/Navbar2'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

import './checkout.css'

const CheckOut = () => {
    const USER_REGEX = /^[A-z]{3,23}$/;
    const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
    const REGISTER_URL = 'http://localhost:3001/createUserPayment';

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false);


    console.log(username)
    console.log(email)

    useEffect(() => {
        setValidName(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username, email }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            localStorage.setItem("user", JSON.stringify(response?.data));
            console.log(JSON.stringify(response?.data));
            setUsername('');
            setEmail('');
        } catch (err) {
            console.log(err)
        }
    }

    return (

        <div>

            <Navbar2 />
            <section className='checkout-container'>
                <div className="checkout">
                    <h1>Shipping</h1>
                    <p>Please enter your shipping details.</p>
                    <p><Link to='/login'>Already have account? Login here</Link></p>
                    <hr />
                    <form onSubmit={handleSubmit}>
                        <div className="form">
                            <div className="fields fields--2">
                                <label className="field">
                                    <span className="field__label" for="username">username
                                        <FaCheck className={validName ? "valid" : "hide"} />
                                        <FaTimes className={validName || !username ? "hide" : "invalid"} />
                                    </span>
                                    <input className="field__input" type="text" id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </label>
                                <label className="field">
                                    <span className="field__label" for="email">email
                                        <FaCheck className={validEmail ? "valid" : "hide"} />
                                        <FaTimes className={validEmail || !email ? "hide" : "invalid"} />
                                    </span>
                                    <input className="field__input" type="email" id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </label>
                            </div>
                            <label className="field">
                                <span className="field__label" for="address">Address</span>
                                <input className="field__input" type="text" id="address" />
                            </label>

                            <div className="fields fields--3">
                                <label className="field">
                                    <span className="field__label" for="zipcode">Zip code</span>
                                    <input className="field__input" type="text" id="zipcode" />
                                </label>
                                <label className="field">
                                    <span className="field__label" for="city">City</span>
                                    <input className="field__input" type="text" id="city" />
                                </label>
                                <label className="field">
                                    <span className="field__label" for="state">State</span>
                                    <input className="field__input" type="text" id="state" />
                                </label>
                            </div>
                        </div>
                        <hr />
                        <button className="button" disabled={!validName || !validEmail ? true : false}>
                            <Link to="/payment">To payment</Link>
                        </button>
                    </form>
                </div>
            </section>



        </div>
    )
}

export default CheckOut