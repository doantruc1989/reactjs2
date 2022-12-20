import React, { useState } from 'react'
import Navbar2 from '../../components/Navbar/Navbar2'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios';

const Forgotpw = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async () => {
        try {
            await axios.get(`http://localhost:3001/forgot-password/${email}`)
            setEmail('');
            navigate(from, { replace: true });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Navbar2 />
            <section className='register-container'>
                <div className='login'>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit} className='register-form'>
                        <label htmlFor="username">Email</label>
                        <input
                            type="email"
                            id="username"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                        <button>Send</button>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Forgotpw