import React from 'react'
import './paysuccess.css'
import { FaCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const Paysuccess = () => {
    return (
        <div className='paysuccess-container'>
            <div className="paysuccess">
                <FaCheck className="checkmark" />
                <h1>Success</h1>
                <p>We received your purchase request;
                    we'll be in touch shortly!
                </p>
                <Link to='/' className="backtohomelink">Back to Home</Link>
            </div>
        </div>
    )
}

export default Paysuccess