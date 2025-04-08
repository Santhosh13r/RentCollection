import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './UserLogin.css' // Import the new CSS file
import { Link ,useNavigate} from 'react-router-dom'




const AdminLogin = () => {
    const navigate = useNavigate();

    const inisitialstate = {
        Admin_ID: { required: false },
        password: { required: false }
    }

    const [pop, setPop] = useState(inisitialstate);

    const [user, setuser] = useState({
        Admin_ID: "",
        password: ""
    });

    const handlechange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value })
    }

    const handlesubmit = (e) => {
        e.preventDefault();

        let pop = inisitialstate;


        if (user.Admin_ID === "") {
            pop.Admin_ID.required = true;
        }
        if (user.password === "") {
            pop.password.required = true;
        }

        setPop({ ...pop });

        
        
        if (user.Admin_ID ==="9360072547" && user.password === "admin123@") {
            
            alert("Admin credential successful");
          
            navigate('/Admin');
            
            
               
            
        } else {
            alert("Admin failed credential failed")
            
        }

       
    }
    return (
        <>
            <div className="container-fluid signup">
                <div className="card shadow-lg p-3 mb-5 bg-white">
                    <h2>Admin Login</h2>
                    <div className="card-body">
                        <form onSubmit={handlesubmit} >
                            <div className="form-group">
                                <label htmlFor="text">Admin_ID</label>
                                <input type="text" className="form-control" id="" name="Admin_ID" required onChange={handlechange} />
                                {
                                    pop.Admin_ID.required ? (<p className="text-danger">Admin_ID is required</p>) : null
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name="password" required onChange={handlechange} />
                                {
                                    pop.password.required ? (<p className="text-danger">Password is required</p>) : null
                                }
                            </div>

                            <button type="submit" className="btn btn-primary text-center mt-3">Sign In</button>
                            <div className="account-footer">
                                <p className='text-center mt-2'> Create a new account? <Link to={'/Register'}>Add Users</Link></p>
                                <p className='text-center'>Forgot Password ! <a href="/">userAccount</a>  </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLogin