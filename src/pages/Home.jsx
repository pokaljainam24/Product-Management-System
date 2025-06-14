import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientNavbar from '../components/ClientNavbar';
import ClientFooter from '../components/ClientFooter';
import ReviewCard from './../components/ReviewCard';

function Home({ productData }) {
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [selectedPrices, setSelectedPrices] = useState([]);

    const navigate = useNavigate();
    const topRef = useRef(null);

    useEffect(() => {
        let data = [...productData];

        if (search) {
            data = data.filter(p => p.pName.toLowerCase().includes(search.toLowerCase()));
        }

        if (selectedCategory) {
            data = data.filter(p => p.category === selectedCategory);
        }

        if (selectedBrand) {
            data = data.filter(p => p.brand === selectedBrand);
        }

        if (selectedRating) {
            data = data.filter(p => Math.round(p.rating) >= parseInt(selectedRating));
        }

        if (selectedPrices.length > 0) {
            data = data.filter(p => {
                return selectedPrices.some(range => {
                    if (range === 'under500') return p.price < 500;
                    if (range === '500to1000') return p.price >= 500 && p.price <= 1000;
                    if (range === '1000to2000') return p.price > 1000 && p.price <= 2000;
                    if (range === '2000toUp') return p.price >= 2000;
                    return true;
                });
            });
        }
        setFilteredData(data);
    }, [search, selectedCategory, selectedBrand, selectedRating, selectedPrices, productData]);

    const togglePrice = (price) => {
        setSelectedPrices(prev =>
            prev.includes(price) ? prev.filter(p => p !== price) : [...prev, price]
        );
    };

    const uniqueCategories = [...new Set(productData.map(p => p.category))];
    const uniqueBrands = [...new Set(productData.map(p => p.brand))];

    const handleAddToCart = (product) => {
        const originalPrice = product.price + 1000;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const productToCart = {
            ...product,
            originalPrice,
            discount: Math.round(((originalPrice - product.price) / originalPrice) * 100)
        };

        cart.push(productToCart);
        localStorage.setItem('cart', JSON.stringify(cart));
        navigate('/product', { state: { product } });
    };


    return (
        <>
            <div className="container-fluid mt-5">
                {/* Sidebar */}
                <ClientNavbar
                    categories={uniqueCategories}
                    brands={uniqueBrands}
                    onCategorySelect={(cat) => setSelectedCategory(cat)}
                    onBrandSelect={(brand) => setSelectedBrand(brand)}
                />
                {/* navbar */}
                <div className="row" style={{ marginTop: '80px' }}>
                    <div className="col-md-3" style={{ width: '300px' }}>
                        {/* search and filters (same as before) */}
                        {/* ... your existing sidebar code unchanged ... */}
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="🔍 Search product..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />

                        {/* Category */}
                        <div className="card mb-3">
                            <div className="card-header bg-dark text-white">Category</div>
                            <ul className="list-group list-group-flush">
                                {uniqueCategories.map((cat, i) => (
                                    <li key={i} className="list-group-item">
                                        <a
                                            href="#"
                                            onClick={e => {
                                                e.preventDefault();
                                                setSelectedCategory(cat);
                                            }}
                                            className="text-dark text-decoration-none"
                                        >
                                            {cat.toUpperCase()}
                                        </a>
                                    </li>
                                ))}
                                <li className="list-group-item">
                                    <a
                                        href="#"
                                        onClick={e => {
                                            e.preventDefault();
                                            setSelectedCategory('');
                                        }}
                                        className="text-muted text-decoration-none"
                                    >
                                        Clear Category
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Price */}
                        <div className="card mb-3">
                            <div className="card-header bg-dark text-white">Price</div>
                            <div className="card-body">
                                {[
                                    { id: 'under500', label: 'Under ₹500' },
                                    { id: '500to1000', label: '₹500 - ₹1000' },
                                    { id: '1000to2000', label: '₹1000 - ₹2000' },
                                    { id: '2000toUp', label: '₹2000 - ₹Up' },
                                ].map(({ id, label }) => (
                                    <div key={id} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={id}
                                            checked={selectedPrices.includes(id)}
                                            onChange={() => togglePrice(id)}
                                        />
                                        <label className="form-check-label" htmlFor={id}>
                                            {label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Brands */}
                        <div className="card mb-3">
                            <div className="card-header bg-dark text-white">Brands</div>
                            <div className="card-body">
                                {uniqueBrands.map((br, i) => (
                                    <div key={i} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="brand"
                                            id={`brand${i}`}
                                            checked={selectedBrand === br}
                                            onChange={() => setSelectedBrand(br)}
                                        />
                                        <label className="form-check-label" htmlFor={`brand${i}`}>
                                            {br}
                                        </label>
                                    </div>
                                ))}
                                <div className="form-check mt-2">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="brand"
                                        id="brandClear"
                                        checked={selectedBrand === ''}
                                        onChange={() => setSelectedBrand('')}
                                    />
                                    <label className="form-check-label" htmlFor="brandClear">
                                        Clear Brand
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Ratings */}
                        <div className="card">
                            <div className="card-header bg-dark text-white">Ratings</div>
                            <div className="card-body">
                                {[4, 3, 2].map(star => (
                                    <div key={star} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="rating"
                                            id={`rating${star}`}
                                            checked={selectedRating === star.toString()}
                                            onChange={() => setSelectedRating(star.toString())}
                                        />
                                        <label className="form-check-label" htmlFor={`rating${star}`}>
                                            {'⭐'.repeat(star)} & up
                                        </label>
                                    </div>
                                ))}
                                <div className="form-check mt-2">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="rating"
                                        id="ratingClear"
                                        checked={selectedRating === ''}
                                        onChange={() => setSelectedRating('')}
                                    />
                                    <label className="form-check-label" htmlFor="ratingClear">
                                        Clear Rating
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="col-md-9 mx-3">
                        <h3 className="mb-4">🛍️ Explore Our Collection</h3>
                        <div className="row">
                            {filteredData.length > 0 ? (
                                filteredData.map((item, i) => (
                                    <div key={i} className="col-md-3 mb-4">
                                        <div
                                            className="product-card h-100 border-0 shadow-sm rounded-4 hover-card"
                                            onClick={() => handleCardClick(item)}
                                            style={{ cursor: 'pointer', transition: 'transform 0.3s', overflow: 'hidden' }}
                                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
                                        >
                                            <div className="d-flex justify-content-center align-items-center" style={{ height: '250px', padding: '10px' }}>
                                                <img
                                                    src={item.image?.url}
                                                    alt={item.pName}
                                                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                                                />
                                            </div>
                                            <p className="sponsored mt-2 mb-1">Sponsored</p>
                                            <div className="product-title text-truncate" title={item.pName}>
                                                {item.pName}
                                            </div>
                                            <div className="product-subtitle mb-1">
                                                {item.color || 'Color Variant'} Strap, {item.size || 'Regular'}{' '}
                                            </div>
                                            <div className="d-flex align-items-center gap-2 mb-1">
                                                <span className="rating-badge">{item.rating} ★</span>
                                                <span className="text-muted-small">({item.reviewCount || "1,000+"})</span>
                                            </div>
                                            <div className="d-flex align-items-center gap-2 mb-1">
                                                <div className="fs-5 fw-bold">₹{item.price}</div>
                                                <div className="strike-price text-muted text-decoration-line-through">
                                                    ₹{item.originalPrice || item.price + 1000}
                                                </div>
                                                <div className="discount text-success">
                                                    {item.discount || "50% off"}
                                                </div>
                                            </div>
                                            <div className="exchange-offer">
                                                Upto <strong>₹300</strong> Off on Exchange
                                            </div>
                                            <button
                                                className="btn btn-primary mt-3 w-100"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddToCart(item);
                                                }}
                                            >
                                                🛒 Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">No products match your filters.</p>
                            )}
                        </div>
                    </div>

                    {/* Review */}
                    <ReviewCard />

                </div>
            </div>
            {/* Footer */}
            <ClientFooter />
        </>
    );
}

export default Home;
