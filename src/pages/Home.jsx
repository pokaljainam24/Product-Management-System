import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientNavbar from '../components/ClientNavbar';
import ClientFooter from '../components/ClientFooter';
import ReviewCard from '../components/ReviewCard';

function Home({ productData }) {
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [selectedPrices, setSelectedPrices] = useState([]);

    const navigate = useNavigate();

    /* ----------------------------- FILTER LOGIC ----------------------------- */
    useEffect(() => {
        let data = [...productData];

        if (search)
            data = data.filter((p) => p.pName.toLowerCase().includes(search.toLowerCase()));

        if (selectedCategory)
            data = data.filter((p) => p.category === selectedCategory);

        if (selectedBrand)
            data = data.filter((p) => p.brand === selectedBrand);

        if (selectedRating)
            data = data.filter((p) => Math.round(p.rating) >= Number(selectedRating)); // 👈 avoid parseInt

        if (selectedPrices.length)
            data = data.filter((p) =>
                selectedPrices.some((range) => {
                    if (range === 'under500') return p.price < 500;
                    if (range === '500to1000') return p.price >= 500 && p.price <= 1000;
                    if (range === '1000to2000') return p.price > 1000 && p.price <= 2000;
                    if (range === '2000toUp') return p.price >= 2000;
                    return true;
                }),
            );

        setFilteredData(data);
    }, [search, selectedCategory, selectedBrand, selectedRating, selectedPrices, productData]);

    /* ----------------------------- UNIQUE VALUES ---------------------------- */
    const uniqueCategories = [...new Set(productData.map((p) => p.category))];
    const uniqueBrands = [...new Set(productData.map((p) => p.brand))];

    /* --------------------------- EVENT HANDLERS ---------------------------- */
    const togglePrice = (price) => {
        setSelectedPrices((prev) => (prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]));
    };

    const handleViewDetails = (product) => navigate('/product', { state: { product } });

    const handleAddToCart = (product) => {
        const originalPrice = product.price + 1000;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({
            ...product,
            originalPrice,
            discount: Math.round(((originalPrice - product.price) / originalPrice) * 100),
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        navigate('/cart');
    };

    /* ----------------------------------------------------------------------- */

    return (
        <>
            {/* ------------------------------- NAVBAR ------------------------------- */}
            <ClientNavbar
                categories={uniqueCategories}
                brands={uniqueBrands}
                onCategorySelect={setSelectedCategory}
                onBrandSelect={setSelectedBrand}
            />

            {/* ------------------------------ MAIN LAYOUT ------------------------------ */}
            <div className="container-fluid mt-5 pt-3">
                <div className="row" style={{ marginTop: '35px' }}>
                    {/* ----------------------------- SIDEBAR ----------------------------- */}
                    <div className="col-md-3" style={{ maxWidth: '300px' }}>
                        <div
                            className="position-fixed"
                            style={{ top: '90px', overflowY: 'auto', width: 300 }}
                        >
                            {/* Search */}
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="🔍 Search product..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            {/* Accordion for filters */}
                            <div className="accordion" id="filterAccordion">
                                {/* Category */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingCategory">
                                        <button
                                            className="accordion-button collapsed fw-semibold"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseCategory"
                                            aria-expanded="false"
                                            aria-controls="collapseCategory"
                                        >
                                            Category
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseCategory"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingCategory"
                                        data-bs-parent="#filterAccordion"
                                    >
                                        <ul className="list-group list-group-flush">
                                            {uniqueCategories.map((cat, i) => (
                                                <li key={i} className="list-group-item p-2">
                                                    <a
                                                        href="#"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setSelectedCategory(cat);
                                                        }}
                                                        className="text-dark text-decoration-none"
                                                    >
                                                        {cat.toUpperCase()}
                                                    </a>
                                                </li>
                                            ))}
                                            <li className="list-group-item p-2">
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
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
                                </div>

                                {/* Price */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingPrice">
                                        <button
                                            className="accordion-button collapsed fw-semibold"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapsePrice"
                                            aria-expanded="false"
                                            aria-controls="collapsePrice"
                                        >
                                            Price
                                        </button>
                                    </h2>
                                    <div
                                        id="collapsePrice"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingPrice"
                                        data-bs-parent="#filterAccordion"
                                    >
                                        <div className="card-body p-3">
                                            {[
                                                { id: 'under500', label: 'Under ₹500' },
                                                { id: '500to1000', label: '₹500 - ₹1000' },
                                                { id: '1000to2000', label: '₹1000 - ₹2000' },
                                                { id: '2000toUp', label: '₹2000 - Up' },
                                            ].map(({ id, label }) => (
                                                <div key={id} className="form-check mb-1">
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
                                </div>

                                {/* Brands */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingBrand">
                                        <button
                                            className="accordion-button collapsed fw-semibold"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseBrand"
                                            aria-expanded="false"
                                            aria-controls="collapseBrand"
                                        >
                                            Brands
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseBrand"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingBrand"
                                        data-bs-parent="#filterAccordion"
                                    >
                                        <div className="card-body p-3">
                                            {uniqueBrands.map((br, i) => (
                                                <div key={i} className="form-check mb-1">
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
                                </div>

                                {/* Ratings */}
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingRating">
                                        <button
                                            className="accordion-button collapsed fw-semibold"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseRating"
                                            aria-expanded="false"
                                            aria-controls="collapseRating"
                                        >
                                            Ratings
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseRating"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingRating"
                                        data-bs-parent="#filterAccordion"
                                    >
                                        <div className="card-body p-3">
                                            {[4, 3, 2].map((star) => (
                                                <div key={star} className="form-check mb-1">
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
                            </div>
                        </div>
                    </div>

                    {/* ----------------------------- PRODUCTS ----------------------------- */}
                    <div className="col-md-8 col-lg-9 mx-3">
                        <h3 className="mb-4">🛍️ Explore Our Collection</h3>
                        <div className="row">
                            {filteredData.length ? (
                                filteredData.map((item, i) => (
                                    <div key={i} className="col-sm-6 col-md-4 col-lg-3 mb-4 p-2">
                                        <div
                                            className="product-card h-100 shadow-sm rounded-4 p-3"
                                            onClick={() => handleViewDetails(item)}
                                            style={{ cursor: 'pointer', transition: 'transform .3s', background: '#fff' }}
                                        >
                                            {/* Image */}
                                            <div
                                                className="d-flex justify-content-center align-items-center bg-light rounded-3 overflow-hidden"
                                                style={{ height: '200px' }}
                                            >
                                                <img
                                                    src={item.image?.url}
                                                    alt={item.pName}
                                                    style={{ height: '100%', width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
                                                />
                                            </div>

                                            <p className="sponsored my-2 text-primary small">Sponsored</p>

                                            <div className="product-title fw-semibold text-truncate">{item.pName}</div>

                                            <div className="product-subtitle mb-1 text-muted small">
                                                {item.color || 'Color'} Strap, {item.size || 'Regular'}
                                            </div>

                                            <div className="d-flex align-items-center gap-2 mb-1">
                                                <span className="rating-badge bg-success text-light px-2 rounded">
                                                    {item.rating} ★
                                                </span>
                                                <span className="text-muted small">({item.reviewCount || '1,000+'})</span>
                                            </div>

                                            <div className="d-flex gap-2 mb-1 align-items-baseline">
                                                <div className="fw-bold text-dark">₹{item.price}</div>
                                                <div className="text-muted text-decoration-line-through small">
                                                    ₹{item.originalPrice || item.price + 1000}
                                                </div>
                                                <div className="text-success small">{item.discount || '50% off'}</div>
                                            </div>

                                            <div className="text-muted small">
                                                Upto <strong>₹300</strong> Off on Exchange
                                            </div>

                                            <div className="d-flex gap-2 mt-3">
                                                <button
                                                    className="btn btn-outline-primary w-50 btn-sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleViewDetails(item);
                                                    }}
                                                >
                                                    👁️ View
                                                </button>
                                                <button
                                                    className="btn btn-primary w-50 btn-sm"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAddToCart(item);
                                                    }}
                                                >
                                                    🛒 Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted">No products match your filters.</p>
                            )}
                        </div>
                    </div>
                </div>
                <ReviewCard />
            </div>

            <ClientFooter />
        </>
    );
}

export default Home;
