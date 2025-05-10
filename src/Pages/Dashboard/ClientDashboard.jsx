import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ClientDashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
            }
        }
    }, []);

    if (!user) return <p className="text-center mt-5">Loading user data...</p>;

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card shadow border-0">
                        <div className="card-body text-center">
                            <h4 className="card-title mb-3">Welcome, {user.name || "User"}!</h4>
                            <p className="card-text"><strong>Email:</strong> {user.email}</p>
                            {user.role && <p className="card-text"><strong>Role:</strong> {user.role}</p>}
                            {user.phone && <p className="card-text"><strong>Phone:</strong> {user.phone}</p>}
                            {/* Add more fields if available */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientDashboard;
