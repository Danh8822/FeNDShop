import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/Logo_big1.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';
import { Link } from "react-router-dom";


const Footer = () => {

    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={footer_logo} alt="" />
            </div>
            <div className='footer_content'>
                <div className="footer_about">
                    <h1 className="footer_about-logo">NDANH SHOP</h1>
                    <ul>
                        <li>Address:32 Chon Tam 5,Da Nang</li>
                        <li>Phone: 0941151254</li>
                        <li>Email: danhphan8822@gmail.com</li>
                    </ul>
                </div>
                <div className="footer_widget">
                    <h1>Shop</h1>
                    <ul>
                        <li>
                            <Link to="#">Contact</Link>
                        </li>

                        <li>
                            <Link to="#">About</Link>
                        </li>
                        <li>
                            <Link to="#">Products</Link>
                        </li>

                    </ul>

                    <ul>
                        <li>
                            <Link to="#">Information</Link>
                        </li>
                        {/* <li>
                            <Link to="#">Giỏ hàng</Link>
                        </li> */}
                        <li>
                            <Link to="#">Favorites List</Link>
                        </li>

                    </ul>
                </div>
                <div className="footer_widget">
                    <h1>Promotions & Offers</h1>
                    <p>Subcribe to receive information here</p>
                    <form action="#">
                        <div className="input-group">
                            <input type="text" placeholder="Email" />
                            <button type="Submit" className="button-submit">Subcribe</button>
                        </div>
                        <div className="footer_widget-social">
                            <div className="footer-icons-container">
                                <img src={instagram_icon} alt="" />
                            </div>
                            <div className="footer-icons-container">
                                <img src={pintester_icon} alt="" />
                            </div>
                            <div className="footer-icons-container">
                                <img src={whatsapp_icon} alt="" />
                            </div>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Footer