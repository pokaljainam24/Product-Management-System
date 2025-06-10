// components/Footer.js
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

function ClientFooter() {
    return (
        <footer className="bg-dark text-light pt-5 pb-3 mt-5">
            <div className="container">
                <div className="row">

                    {/* Logo & Description */}
                    <div className="col-md-3 mb-4">
                        <div className="mb-3">
                            <span className="fs-3 fw-bold text-primary">🦋</span>
                        </div>
                        <p>The proper Footer on proper time can preserve you protection. We assist you make sure everybody forward.</p>
                        <div className="d-flex gap-3 mt-3">
                            <FaFacebookF />
                            <FaTwitter />
                            <FaInstagram />
                            <FaEnvelope />
                        </div>
                    </div>

                    {/* Quick Link */}
                    <div className="col-md-3 mb-4">
                        <h5 className="text-info">Quick Link</h5>
                        <ul className="list-unstyled mt-3">
                            <li><a href="/Client" className="text-light text-decoration-none">› Home</a></li>
                            <li><a href="#" className="text-light text-decoration-none">› About Us</a></li>
                            <li><a href="#" className="text-light text-decoration-none">› Services</a></li>
                            <li><a href="#" className="text-light text-decoration-none">› Product</a></li>
                        </ul>
                    </div>

                    {/* Blog */}
                    <div className="col-md-3 mb-4">
                        <h5 className="text-info">Blog</h5>
                        <ul className="list-unstyled mt-3">
                            <li className="mb-2">
                                <a href="#" className="text-light text-decoration-none">› Anything You Want To Know Is Here</a>
                                <div className="small text-muted">April 14, 2024</div>
                            </li>
                            <li>
                                <a href="#" className="text-light text-decoration-none">› Anything You Want To Know Is Here</a>
                                <div className="small text-muted">April 14, 2024</div>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="col-md-3 mb-4">
                        <h5 className="text-info">Contact</h5>
                        <ul className="list-unstyled mt-3">
                            <li><FaMapMarkerAlt className="me-2" /> Palam Vihar, Gurgaon, India</li>
                            <li><FaEnvelope className="me-2" /> Singhshristi449@Gmail.Com</li>
                            <li><FaPhone className="me-2" /> 91+765-564-985</li>
                        </ul>
                    </div>
                </div>

                <div className="text-center mt-4 text-muted">
                    © 2024 All rights reserved
                </div>
            </div>
        </footer>
    );
}

export default ClientFooter;
