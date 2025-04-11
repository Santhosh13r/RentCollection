import React, { useEffect, useState } from 'react';

import supabase from '../../config/supabaseClient';
import { motion } from 'framer-motion';

const ClientDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: session, error: userError } = await supabase.auth.getUser();

      if (userError || !session?.user) {
        setFetchError(" user not authedicated ");
        console.error("not valid user ", userError);
        setLoading(false);
        return;
      }
      console.log("user data ", session);

      
      // Fetch user profile from clientinfo table
      const { data:profile , error: profileError } = await supabase
        .from('clientinfo')
        .select('*')
        .eq('client_id', session.user)
        .single();

       console.log("profile data ", profile);


      if (profileError) {
        setFetchError("Error fetching user profile.");
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

  return (
    <div className="container-fluid text-center d-flex justify-content-center align-items-center vh-100">
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
        
        {fetchError && <h3 className="text-danger">{fetchError}</h3>}

        {!loading && !fetchError && userData && (
          <motion.div 
            className="col-md-6 offset-md-3 mb-4"
            initial={{ y: 50, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="card shadow-lg bg-white p-4">
              <motion.div 
                className="card-body text-center"
                whileHover={{ scale: 1.03 }}
              >
                <h5 className="card-title border-bottom pb-2">{userData.name}</h5>
                <p className="card-text"><strong>Email:</strong> {userData.email}</p>
                <p className="card-text"><strong>Address:</strong> {userData.address}</p>
                <p className="card-text"><strong>Phone:</strong> {userData.phoneno}</p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {!loading && !fetchError && !userData && <h4>No data available.</h4>}
      </div>
    </div>
  );
};

export default ClientDashboard;
