import React from "react";
import Aside from "../components/Aside";
import Header from "../components/Header";

const Form = ({ handleSubmit, handleChange, product, options, imageRef, error }) => {
    return (
        <div className="wrapper">
            <Aside />
            <div className="main-panel">
                <div className="main-header">
                    <div className="main-header-logo">
                        {/* Logo Header */}
                        <div className="logo-header" data-background-color="dark">
                            <a href="../index.html" className="logo">
                                <img src="../assets/img/kaiadmin/logo_light.svg" alt="navbar brand" className="navbar-brand" height={20} />
                            </a>
                            <div className="nav-toggle">
                                <button className="btn btn-toggle toggle-sidebar">
                                    <i className="gg-menu-right" />
                                </button>
                                <button className="btn btn-toggle sidenav-toggler">
                                    <i className="gg-menu-left" />
                                </button>
                            </div>
                            <button className="topbar-toggler more">
                                <i className="gg-more-vertical-alt" />
                            </button>
                        </div>
                        {/* End Logo Header */}
                    </div>
                    {/* Navbar Header */}
                    <Header />
                    {/* End Navbar */}
                </div>
                <div className="container">
                    <div className="page-inner">
                        <h3 className="fw-bold mb-3">Product Form</h3>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="card">
                                <div className="card-header">
                                    <div className="card-title">Product Details</div>
                                </div>
                                <div className="card-body row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Product Name</label>
                                            <input
                                                name="pName"
                                                value={product.pName || ""}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                            {error.pName && <small className="text-danger">{error.pName}</small>}
                                        </div>
                                        <div className="form-group">
                                            <label>SKU</label>
                                            <input
                                                name="sku"
                                                value={product.sku || ""}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                            {error.sku && <small className="text-danger">{error.sku}</small>}
                                        </div>
                                        <div className="form-group">
                                            <label>Brand</label>
                                            <input
                                                name="brand"
                                                value={product.brand || ""}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                            {error.brand && <small className="text-danger">{error.brand}</small>}
                                        </div>
                                        <div className="form-group">
                                            <label>Category</label>
                                            <select
                                                name="category"
                                                value={product.category || ""}
                                                onChange={handleChange}
                                                className="form-control"
                                            >
                                                <option value="">Select Category</option>
                                                <option value="menswear">Menswear</option>
                                                <option value="electronics">Electronics</option>
                                                <option value="mobiles">Mobiles</option>
                                                <option value="laptops">Laptops</option>
                                                <option value="furniture">Furniture</option>
                                            </select>
                                            {error.category && <small className="text-danger">{error.category}</small>}
                                        </div>

                                        <div className="form-group">
                                            <label>Price</label>
                                            <input
                                                name="price"
                                                value={product.price || ""}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                            {error.price && <small className="text-danger">{error.price}</small>}
                                        </div>
                                        <div className="form-group">
                                            <label>Rating</label>
                                            <input
                                                name="rating"
                                                value={product.rating || ""}
                                                onChange={handleChange}
                                                className="form-control"
                                                type="number"
                                                step="0.1"
                                            />
                                            {error.rating && <small className="text-danger">{error.rating}</small>}
                                        </div>
                                        <div className="form-group">
                                            <label>Description</label>
                                            <textarea
                                                name="content"
                                                value={product.content || ""}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                            {error.content && <small className="text-danger">{error.content}</small>}
                                        </div>
                                        <div className="form-group">
                                            <label>Options</label><br />
                                            {["Red", "Green", "Blue", "Black", "Skyblue"].map((opt) => (
                                                <div className="form-check form-check-inline" key={opt}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        name="options"
                                                        value={opt}
                                                        checked={options.includes(opt)}
                                                        onChange={handleChange}
                                                    />
                                                    <label className="form-check-label">{opt}</label>
                                                </div>
                                            ))}
                                            {error.options && <div className="text-danger">{error.options}</div>}
                                        </div>
                                        <div className="form-group">
                                            <label>Image Upload</label>
                                            <input
                                                type="file"
                                                name="image"
                                                ref={imageRef}
                                                onChange={handleChange}
                                                className="form-control"
                                            />
                                            {error.image && <div className="text-danger">{error.image}</div>}
                                        </div>
                                        <div className="form-group form-check">
                                            <input
                                                name="stock"
                                                type="checkbox"
                                                checked={product.stock || false}
                                                onChange={handleChange}
                                                className="form-check-input"
                                                id="stockCheck"
                                            />
                                            <label className="form-check-label" htmlFor="stockCheck">
                                                {product.stock ? 'In Stock' : 'Out of Stock'}
                                            </label>
                                            {error.stock && <div className="text-danger">{error.stock}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-success">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
