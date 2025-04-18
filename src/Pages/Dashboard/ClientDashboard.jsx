import React, { useEffect, useState } from 'react';
import supabase from '../../config/supabaseClient';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const { data: sessionData, error: sessionError } = await supabase.auth.getUser();

      if (sessionError || !sessionData.user.id) {
        setFetchError("User not authenticated.");
        console.error("Authentication error:", sessionError);
        setLoading(false);
        return;
      }
  else{
     // Get the user ID from the session data
      console.log("User ID:", sessionData.user.id);
  }
      

      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('UID' ,uid) 
        .single();

      if (profileError) {
        setFetchError("Error fetching user profile.");
        console.error("Profile fetch error:", profileError);
      } else {
        setUserData(profile);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setFetchError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentRedirect = () => {
    navigate('/payment');
  };

  return (
    <div className="container-fluid text-center d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="row mx-3">
        {loading && (
          <motion.div
            className="spinner-border text-primary"
            role="status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="visually-hidden">Loading...</span>
          </motion.div>
        )}

        {fetchError && (
          <motion.h3
            className="text-danger"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {fetchError}
          </motion.h3>
        )}

        {!loading && !fetchError && userData && (
          <motion.div
            className="col-md-6 offset-md-3 mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="card shadow-lg bg-white p-4 rounded-4">
              <motion.div
                className="card-body text-center"
                whileHover={{ scale: 1.03 }}
              >
                <h4 className="card-title border-bottom pb-2 fw-bold text-primary">{userData.name}</h4>
                <p className="card-text"><strong>Email:</strong> {userData.email}</p>
                <p className="card-text"><strong>Address:</strong> {userData.address}</p>
                <p className="card-text"><strong>Phone:</strong> {userData.phoneno}</p>
                <motion.button
                  className="btn btn-success mt-3"
                  onClick={handlePaymentRedirect}
                  whileHover={{ scale: 1.05 }}
                >
                  Pay Monthly Rent
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {!loading && !fetchError && !userData && (
          <h4 className="text-secondary">No data available.</h4>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
