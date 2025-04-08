import React, { useEffect, useState } from 'react';
import '../Styledasboard.css';
import supabase from '../../config/supabaseClient';

const ClientDashboard = () => {
  const [fetchError, setFetchError] = useState(null);
  const [data, setData] = useState([]); // State to store array data
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session) {
        const { data, error } = await supabase
          .from('clientinfo') // Replace with your actual table name
          .select('*')
          .eq('id', sessionData.session.user.id);

        if (error) {
          console.error("Error fetching data:", error);
          setFetchError("Failed to fetch data.");
        } else {
          setData(data); // Store the array data
          setFetchError(null);
        }
      } else {
        setFetchError("No active session found.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setFetchError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container-fluid text-center">
        <div className="row mt-5 mx-3">
          {fetchError && <h3 className="text-danger">{fetchError}</h3>}
          {loading ? (
            <h4>Loading data...</h4>
          ) : (
            data.length > 0 ? (
              data.map((item, index) => (
                <div className="col-md-4 col-sm-6 mb-4" key={index}>
                  <div className="card shadow-lg bg-white">
                    <div className="card-body text-center">
                      <h5 className="card-title border-bottom pb-2">{item.name}</h5>
                      <p className="card-text"><strong>Email:</strong> {item.email}</p>
                      <p className="card-text"><strong>Address:</strong> {item.address}</p>
                      <p className="card-text"><strong>Phone:</strong> {item.phone}</p>
                      <p className="card-text"><strong>Pincode:</strong> {item.pincode}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h4>No data available.</h4>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default ClientDashboard;