import React from 'react';
import Aside from './Aside';
import Header from './Header';
import '../assets/script';

function Table({ productData, handleEdit, handleDelete }) {
    return (
        <div className="wrapper">
            <Aside />
            <div className="main-panel">
                <div className="main-header">
                    <div className="main-header-logo">
                        <div className="logo-header" data-background-color="dark">
                            <a href="../index.html" className="logo">
                                <img
                                    src="../assets/img/kaiadmin/logo_light.svg"
                                    alt="navbar brand"
                                    className="navbar-brand"
                                    height={20}
                                />
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
                    </div>
                    <Header />
                </div>

                <div className="container">
                    <div className="page-inner">
                        <div className="page-header">
                            <h3 className="fw-bold mb-3">Product Data Table</h3>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">All Product Details</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive" style={{ overflowX: 'auto' }}>
                                            <table className="display table table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Product Name</th>
                                                        <th>SKU</th>
                                                        <th>Brand</th>
                                                        <th className="d-none d-sm-table-cell">Category</th>
                                                        <th>Price</th>
                                                        <th>Rating</th>
                                                        <th>Stock</th>
                                                        <th className="d-none d-md-table-cell">Options</th>
                                                        <th>Image</th>
                                                        <th className="d-none d-md-table-cell">Content</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {productData && productData.length > 0 ? (
                                                        productData.map((product) => (
                                                            <tr key={product._id || product.id}>
                                                                <td
                                                                    style={{
                                                                        whiteSpace: 'nowrap',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                    }}
                                                                    title={product.pName}
                                                                >
                                                                    {product.pName}
                                                                </td>
                                                                <td style={{ minWidth: '150px' }}>{product.sku}</td>
                                                                <td>{product.brand}</td>
                                                                <td className="d-none d-sm-table-cell">{product.category}</td>
                                                                <td>₹{product.price}</td>
                                                                <td style={{ minWidth: '150px' }}>
                                                                    {[...Array(Math.round(product.rating))].map((_, i) => (
                                                                        <i
                                                                            key={i}
                                                                            className="fa fa-star"
                                                                            style={{ color: '#f1c40f', fontSize: '16px', marginRight: '2px' }}
                                                                        />
                                                                    ))}
                                                                    
                                                                </td>
                                                                <td>{product.stock ? 'In Stock' : 'Out of Stock'}</td>
                                                                <td
                                                                    className="d-none d-md-table-cell"
                                                                    style={{
                                                                        whiteSpace: 'nowrap',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                    }}
                                                                    title={Array.isArray(product.options) ? product.options.join(', ') : ''}
                                                                >
                                                                    {Array.isArray(product.options) ? product.options.join(', ') : '—'}
                                                                </td>
                                                                <td>
                                                                    {product.image?.url ? (
                                                                        <img
                                                                            src={product.image.url}
                                                                            alt={product.image.name}
                                                                            className="img-fluid rounded"
                                                                            style={{ maxWidth: '60px', maxHeight: '60px', objectFit: 'cover' }}
                                                                        />
                                                                    ) : (
                                                                        'No Image'
                                                                    )}
                                                                </td>
                                                                <td
                                                                    className="d-none d-md-table-cell"
                                                                    style={{
                                                                        whiteSpace: 'nowrap',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        maxWidth: '150px',
                                                                    }}
                                                                    title={product.content}
                                                                >
                                                                    {product.content?.length > 30
                                                                        ? product.content.slice(0, 30) + '...'
                                                                        : product.content}
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex gap-2">
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-sm btn-primary"
                                                                            onClick={() => handleEdit(product._id || product.id)}
                                                                            title="Edit"
                                                                        >
                                                                            <i className="fa fa-edit" />
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-sm btn-danger"
                                                                            onClick={() => handleDelete(product._id || product.id)}
                                                                            title="Delete"
                                                                        >
                                                                            <i className="fa fa-times" />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="11" className="text-center">
                                                                No Products Found
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th>Product Name</th>
                                                        <th>SKU</th>
                                                        <th>Brand</th>
                                                        <th className="d-none d-sm-table-cell">Category</th>
                                                        <th>Price</th>
                                                        <th>Rating</th>
                                                        <th>Stock</th>
                                                        <th className="d-none d-md-table-cell">Options</th>
                                                        <th>Image</th>
                                                        <th className="d-none d-md-table-cell">Content</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="footer">
                    <div className="container-fluid d-flex justify-content-between">
                        <nav className="pull-left">
                            <ul className="nav">
                                <li className="nav-item">
                                    <a className="nav-link" href="http://www.themekita.com">
                                        ThemeKita
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        {' '}
                                        Help{' '}
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        {' '}
                                        Licenses{' '}
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div className="copyright">
                            2024, made with <i className="fa fa-heart heart text-danger" /> by
                            <a href="http://www.themekita.com"> ThemeKita</a>
                        </div>
                        <div>
                            Distributed by <a target="_blank" href="https://themewagon.com/">
                                ThemeWagon
                            </a>
                            .
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Table;
