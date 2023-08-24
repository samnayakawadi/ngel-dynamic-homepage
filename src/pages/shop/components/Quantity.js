import React, { useEffect } from 'react';
import { Styles } from '../styles/quantity.js';
import UserService from '../../../services/UserService.js';

function Quantity() {

    useEffect(() => {
        UserService.generateToken();
       }, []);

    useEffect(() => {
        const plus = document.getElementById("plus");
        const minus = document.getElementById("minus");
        const input = document.getElementById("count");

        plus.addEventListener("click", () => {
            input.value = parseInt(input.value) + 1;
        });

        minus.addEventListener("click", () => {
            if (input.value > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });

    return (
        <Styles>
            <div className="product-qty">
                <ul className="list-unstyled list-inline">
                    <li className="list-inline-item">Qty :</li>
                    <li className="list-inline-item" id="qty-input">
                        <input type="button" defaultValue="-" id="minus" />
                        <input type="text" defaultValue="1" id="count" />
                        <input type="button" defaultValue="+" id="plus" />
                    </li>
                </ul>
            </div>
        </Styles>
    )
}

export default Quantity