import React from 'react'
import './payment.css'
import { useCart } from "react-use-cart";
import axios from 'axios';

const Payment = () => {
    const {
        items,
        cartTotal,
    } = useCart();

    const userId = localStorage.hasOwnProperty('user') ? (JSON.parse(localStorage.getItem("user"))).id : '';
    const orderItems = JSON.stringify(items);

    const handleClick = () => {
        try {
            axios.post('http://localhost:3001/orderitem',
                JSON.stringify({ orderItems, cartTotal, userId }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                });
            localStorage.removeItem('react-use-cart')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        < div className='payment-container' >
            <div className="payment-total">
                <h1>Total: ${cartTotal} </h1>
            </div>
            <div class="payment">
                <div class="payment-wrapper">
                    <div class="outer-card">
                        <img src='https://www.theorchardcottage.co.nz/wp-content/uploads/2018/09/visa-and-mastercard-logos-logo-visa-png-logo-visa-mastercard-png-visa-logo-white-png-awesome-logos.png' />
                        <div class="forms">
                            <div class="input-items">
                                <span>Card Number</span>
                                <input placeholder=".... .... .... ...." data-slots="." data-accept="\d" size="19" />
                            </div>
                            <div class="input-items">
                                <span>Name on card</span>
                                <input placeholder="Name on card" />
                            </div>
                            <div class="one-line">
                                <div class="input-items">
                                    <span>Expiry Date</span>
                                    <input placeholder="mm/yyyy" data-slots="my" />
                                </div> <div class="input-items">
                                    <span>CVV</span>
                                    <input placeholder="..." data-slots="." data-accept="\d" size="3" />
                                </div>
                            </div>

                            <div class="input-buttons">
                                <button onClick={handleClick}><a href="/paysuccessful">Save Changes</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Payment