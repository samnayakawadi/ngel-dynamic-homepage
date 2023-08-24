import React, { Component } from 'react';
import { Styles } from '../styles/priceFilter.js';
import UserService from '../../../services/UserService.js';

class PriceFilter extends Component {

    componentDidMount() {
        UserService.generateToken();
       }

    render() {
        return (
            <Styles>
                {/* Price Filter */}
                <div className="price-filter">
                    <h5>Price Filter</h5>
                    <ul className="filter-item list-unstyled">
                        <li className="check-btn">
                            <label htmlFor="price1"><input type="checkbox" id="price1" className="check-box" />$0.00 - $99.00</label>
                        </li>
                        <li className="check-btn">
                            <label htmlFor="price2"><input type="checkbox" id="price2" className="check-box" />$100.00 - $199.00</label>
                        </li>
                        <li className="check-btn">
                            <label htmlFor="price3"><input type="checkbox" id="price3" className="check-box" />$200.00 - $299.00</label>
                        </li>
                        <li className="check-btn">
                            <label htmlFor="price4"><input type="checkbox" id="price4" className="check-box" />$300.00 - $399.00</label>
                        </li>
                    </ul>
                </div>
            </Styles>
        )
    }
}

export default PriceFilter
