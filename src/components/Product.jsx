import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ClientNavbar from './ClientNavbar';
import ClientFooter from './ClientFooter';

function Product() {
    const location = useLocation();
    const product = location.state?.product;
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedImage, setSelectedImage] = useState('');

    const product1 = {
        images: [
            { url: 'https://rukminim2.flixcart.com/image/612/612/kigbjbk0-0/headphone/p/p/i/mgyh3hn-a-apple-original-imafy8wbdnh4kbkd.jpeg?q=70' },
            { url: 'https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/k/e/v/-original-imah4axk5pwgfq73.jpeg?q=70' },
            { url: 'https://rukminim2.flixcart.com/image/612/612/xif0q/headphone/g/k/j/-original-imah8xhzkhgh7frt.jpeg?q=70' }
        ]
    }

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCategories([...new Set(cart.map(p => p.category))]);
        setBrands([...new Set(cart.map(p => p.brand))]);
        if (product?.image?.url) {
            setSelectedImage(product.image.url);
        }
    }, [product]);

    if (!product) return <p className="text-center mt-5">No product selected.</p>;

    const originalPrice = product.price + 1000;
    const discount = Math.round((1000 / originalPrice) * 100);

    return (
        <>
            <div className="container mt-5">
                <ClientNavbar
                    categories={categories}
                    brands={brands}
                    onCategorySelect={() => { }}
                    onBrandSelect={() => { }}
                />
                <div className="row" style={{ marginTop: '90px' }}>
                    {/* Product Image Gallery */}
                    <div className="col-md-5">
                        <div className="d-flex">
                            <div className="me-2">
                                <div className="d-flex flex-column gap-2">
                                    {product1.images.map((img, i) => (
                                        <img
                                            key={i}
                                            src={img.url}
                                            className="img-thumbnail"
                                            width={60}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setSelectedImage(img.url)}
                                        />
                                    ))}

                                </div>
                            </div>
                            <div>
                                <img
                                    src={selectedImage}
                                    className="img-fluid rounded border"
                                    style={{ maxHeight: 400, objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="col-md-7">
                        <h5 className="text-muted fw-bold">{product.brand}</h5>
                        <h3 className="fw-semibold">{product.pName}</h3>
                        <p className="text-success fw-semibold">{product.content}</p>
                        <h2 className="text-danger">
                            ₹{product.price}{' '}
                            <del className="text-muted fs-5">₹{originalPrice}</del>{' '}
                            <span className="text-success fs-5">{discount}% off</span>
                        </h2>
                        <div className="d-flex align-items-center mt-2">
                            <span className="badge bg-success me-2">{product.rating} <i className="fas fa-star text-white" /></span>
                            <span className="text-muted">Based on reviews</span>
                        </div>
                        <hr />
                        <h6 className="fw-bold">Available offers</h6>
                        <ul className="list-unstyled">
                            <li><i className="fa fa-tag text-success me-2" />Bank Offer: 5% Cashback</li>
                            <li><i className="fa fa-tag text-success me-2" />10% off with selected cards</li>
                            <li><i className="fa fa-tag text-success me-2" />Special Price: Extra 45% off</li>
                            <li className="text-primary">+5 more offers</li>
                        </ul>
                        <hr />

                        <div className="mb-3">
                            <label className="form-label fw-semibold">Enter delivery pincode</label>
                            <div className="input-group w-50">
                                <input type="text" className="form-control" placeholder="Check" />
                                <button className="btn btn-outline-secondary">Check</button>
                            </div>
                            <small className="text-muted">Delivery by 12 Jun | ₹40</small>
                        </div>

                        <p><i className="fa fa-rupee-sign me-2" />Cash on Delivery available</p>

                        <div className="d-flex gap-3 mt-4">
                            <button className="btn btn-warning w-25 fw-semibold">
                                <i className="fas fa-shopping-cart me-2" />Add to Cart
                            </button>
                            <button className="btn btn-danger w-25 fw-semibold">
                                <i className="fas fa-bolt me-2" />Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ClientFooter />
        </>
    );
}

export default Product;
