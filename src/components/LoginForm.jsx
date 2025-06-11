import React from 'react'
import img from '../img/img-2.avif'
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/admin')
    }
    return (
        <div className="login-box container p-4">
            <div className="login-image">
                <img src={img} width={400} alt="" style={{ padding: '10px', borderRadius: '50px' }} />
            </div>
            <div className="login-form">
                <div className="tab-buttons">
                    <a href="#" className="active text-light">Login</a>
                    <a href="#" className='text-light'>Register</a>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold text-light">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-bold text-light">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter password" required/>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="rememberMe" required/>
                            <label className="form-check-label text-light fw-bold" htmlFor="rememberMe">Remember me</label>
                        </div>
                        <a href="#" className="text-decoration-none text-light">Forgot password?</a>
                    </div>
                    <button type="submit" className="btn btn-light w-100">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm
