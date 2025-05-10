import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ManualPayment = () => {
    const [form, setForm] = useState({ name: '', email: '', amount: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.amount) {
            setError('All fields are required.');
            return;
        }
        localStorage.setItem("paymentData", JSON.stringify(form));
        navigate('/invoice');
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4">
                        <h2 className="mb-4 text-center">Manual Payment</h2>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Payment Amount (₹)</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={form.amount}
                                    onChange={(e) => setForm({ ...form, amount: e.target.value })}
                                />
                            </div>
                            <button className="btn btn-success w-100">Proceed to Invoice</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManualPayment;
