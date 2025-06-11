import React, { useEffect, useState } from 'react';
import ClientNavbar from './ClientNavbar';
import ClientFooter from './ClientFooter';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [uniqueCategories, setUniqueCategories] = useState([]);
    const [uniqueBrands, setUniqueBrands] = useState([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartWithQuantity = cart.map(item => ({
            ...item,
            quantity: item.quantity || 1
        }));
        setCartItems(cartWithQuantity);

        setUniqueCategories([...new Set(cart.map(p => p.category))]);
        setUniqueBrands([...new Set(cart.map(p => p.brand))]);
    }, []);

    const updateLocalStorage = (items) => {
        localStorage.setItem('cart', JSON.stringify(items));
    };

    const handleRemove = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const handleQuantityChange = (index, change) => {
        const updatedCart = [...cartItems];
        const newQty = updatedCart[index].quantity + change;

        if (newQty >= 1) {
            updatedCart[index].quantity = newQty;
            setCartItems(updatedCart);
            updateLocalStorage(updatedCart);
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);
    const delivery = 0;
    const total = subtotal + delivery;

    return (
        <>
            {/* navbar */}
            <ClientNavbar
                categories={uniqueCategories}
                brands={uniqueBrands}
                onCategorySelect={() => { }}
                onBrandSelect={() => { }}
            />
            <div className="container py-5 mt-5">
                <nav className="mb-4">
                    <a href="/" className="text-decoration-none text-light">Home</a> /
                    <span className="text-primary">Your Basket</span>
                </nav>

                <h3 className="mb-4">Your Basket</h3>

                <div className="row">
                    {/* Left: Cart Items */}
                    <div className="col-md-8">
                        {cartItems.length === 0 ? (
                            <p className="text-muted">Your cart is empty.</p>
                        ) : (
                            cartItems.map((item, i) => (
                                <div className="card mb-3 p-3" key={i}>
                                    <div className="d-flex align-items-start">
                                        <img
                                            src={item.image?.url}
                                            className="card-img me-3"
                                            alt={item.pName}
                                            style={{ width: '100px', height: 'auto', objectFit: 'contain' }}
                                        />
                                        <div className="flex-grow-1">
                                            <h5 className="mb-1">{item.pName}</h5>
                                            <p className="text-success mb-2">✔️ Click & Collect<br />✔️ Home Delivery</p>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <span className="me-2">Qty:</span>
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm"
                                                        onClick={() => handleQuantityChange(i, -1)}
                                                    >-</button>
                                                    <input
                                                        type="text"
                                                        value={item.quantity}
                                                        className="form-control form-control-sm mx-1 text-center"
                                                        style={{ width: '40px' }}
                                                        readOnly
                                                    />
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm"
                                                        onClick={() => handleQuantityChange(i, 1)}
                                                    >+</button>
                                                </div>
                                                <h5 className="mb-0 text-danger">
                                                    ₹{item.price * item.quantity}
                                                    {item.originalPrice && (
                                                        <span className="text-muted text-decoration-line-through ms-2">
                                                            ₹{item.originalPrice * item.quantity}
                                                        </span>
                                                    )}
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="ms-3 text-danger" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => handleRemove(i)}>
                                            &times;
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Right: Summary */}
                    <div className="col-md-4">
                        <div className="p-4 bg-white shadow-sm rounded">
                            <div className="mb-3">
                                <label className="me-3">
                                    <input type="radio" name="delivery" defaultChecked className="form-check-input me-1" />
                                    Home Delivery
                                </label>
                                <label>
                                    <input type="radio" name="delivery" className="form-check-input me-1" />
                                    Click & Collect
                                </label>
                            </div>
                            <div className="d-flex text-danger  justify-content-between mb-2">
                                <span>Subtotal:</span>
                                <strong>₹{subtotal.toFixed(2)}</strong>
                            </div>
                            <div className="d-flex  text-danger justify-content-between mb-2">
                                <span>Delivery:</span>
                                <strong>₹{delivery.toFixed(2)}</strong>
                            </div>
                            <hr />
                            <div className="d-flex text-danger justify-content-between mb-4">
                                <span>Total:</span>
                                <h5 className="text-success">₹{total.toFixed(2)}</h5>
                            </div>
                            <button className="btn btn-success w-100">Checkout</button>
                            <p className="mt-3 text-muted small">
                                This site is protected by reCAPTCHA and the Google <a href="#">Privacy Policy</a> and <a href="#">Terms of Service</a> apply.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Footer */}
            <ClientFooter />
        </>
    );
}

export default Cart;
