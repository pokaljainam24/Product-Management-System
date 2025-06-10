import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ClientNavbar({ categories = [], brands = [], onCategorySelect, onBrandSelect }) {
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartCount(cart.length);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top p-3">
            <div className="container">
                <a className="navbar-brand fw-bold fs-4" href="/Client">🛒 ShopEase</a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link fs-5 active" href="/Client">Home</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link fs-5 active" href="/">Admin</a>
                        </li>

                        {/* Category Dropdown */}
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle fs-5"
                                href="#"
                                id="categoryDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                            >
                                Categories
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
                                {categories.map((cat, index) => (
                                    <li key={index}>
                                        <a
                                            className="dropdown-item fs-6"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onCategorySelect(cat);
                                            }}
                                        >
                                            {cat.toUpperCase()}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        {/* Brand Dropdown */}
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle fs-5"
                                href="#"
                                id="brandDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                            >
                                Brands
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="brandDropdown">
                                {brands.map((brand, index) => (
                                    <li key={index}>
                                        <a
                                            className="dropdown-item"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onBrandSelect(brand);
                                            }}
                                        >
                                            {brand}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </ul>

                    <button className="btn btn-warning position-relative ms-3" onClick={() => navigate('/cart')}>
                        <i className="fa fa-shopping-cart me-1" />
                        Cart
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {cartCount}
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default ClientNavbar;
