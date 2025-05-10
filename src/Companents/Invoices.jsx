import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Invoice = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const paymentInfo = JSON.parse(localStorage.getItem("paymentData"));
        if (paymentInfo) {
            setData(paymentInfo);
        }
    }, []);

    if (!data) return <div className="text-center mt-5">Loading Invoice...</div>;

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center mb-4">Payment Invoice</h2>
                        <table className="table table-bordered">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <td>{data.name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{data.email}</td>
                                </tr>
                                <tr>
                                    <th>Amount Paid</th>
                                    <td>₹{data.amount}</td>
                                </tr>
                                <tr>
                                    <th>Status</th>
                                    <td><span className="badge bg-success">Payment Successful</span></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-center mt-4">
                            <button className="btn btn-primary" onClick={() => window.print()}>
                                Download/Print Invoice
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
