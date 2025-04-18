import React from 'react';
import '../Styledasboard.css'
import Nav from '../../Companents/Nav';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const clients = [
        { Client_ID: 1, Name: "John Doe", Gender: "male", MobileNO: "123-456-7890",  DueAmount: 1000 },
        { Client_ID: 2, Name: "Jane Smith", Gender: "Female", MobileNO: "987-654-3210",  DueAmount: 0 },
        { Client_ID: 3, Name: "Jane Smith", Gender: "Female", MobileNO: "987-654-3210",  DueAmount: 1000 },
        { Client_ID: 4, Name: "Jane Smith", Gender: "Female", MobileNO: "987-654-3210",  DueAmount: 1000 },
        { Client_ID: 5, Name: "Smith", Gender: "Female", MobileNO: "987-654-3210",  DueAmount: 0 },
        { Client_ID: 6, Name: "Jane Smith", Gender: "male", MobileNO: "987-654-3210",  DueAmount: 1000 },
        { Client_ID: 6, Name: "Smith", Gender: "Female", MobileNO: "987-654-3210",  DueAmount: 0 },
        { Client_ID: 6, Name: "Jane Smith", Gender: "Female", MobileNO: "987-654-3210",  DueAmount: 0 },


    ];
    const totalamount = clients.filter(c => c.DueAmount > 0).length * 1000;
    const totaldue = clients.filter(c => c.DueAmount >=1000).length * 1000;
    const totalclients = clients.length;
    return (
        <>
            <Nav/>
            <div className="container-fluid ">

                <div className="row">
                    <nav className='col-md-3  col-lg-2 px-md-0 bg-light sidebar'>
                        <div className="sidebar ">
                            <div className="nav flex-column mt-2 ">

                                <Link to={'/'} className="nav-link active mt-5">
                                    <span><i class="fa-solid fa-home px-1"></i></span>
                                    <span className='px-2'>Home</span>
                                </Link>

                                <a href="#" className="nav-link mt-5 ">
                                    <span><i class="fa-solid fa-table-columns px-1"></i></span>
                                    <span className='px-2'>Dashboard</span>
                                </a>

                                <a href="/Cbio" className="nav-link mt-5">
                                    <span><i class="fa-solid fa-money-bills"></i></span>
                                    <span className='px-2'>Transactions</span>
                                </a>

                                <Link to={'/Cbio'} className="nav-link mt-5">
                                    <span><i class="fa-solid fa-users"></i></span>
                                    <span className='px-3'>User</span>
                                </Link>

                            </div>
                        </div>
                    </nav>
                    <main className='col-md-9 ms-sm-auto col-lg-10 px-md-4 mt-5 pt-5'>

                        <div className="d-flex flex-row mb-3 justify-content-between">
                            <div class="p-2 border border-black bg-secondary shadow ">
                                
                                    <div className="card-tilte mt-3 pr-3 px-3 text-center text-white ">
                                        <h6 >Total amount</h6>
                                        <h2 ><i class="fa-solid fa-money-bills "></i> </h2>
                                        <div className="card-body text-dark">
                                            {totalamount}
                                        </div>
                                    </div>
                                
                            </div>

                            <div class="p-2 border border-black-5 bg-secondary shadow mr-5  ">
                            
                                    <div className="card-title text-center text-dark mt-3 pr-3 px-3 text-white">
                                        <h6>Due Amount</h6>
                                        <h5><i class="fa-solid fa-clock"></i></h5>
                                        <div className="card-body text-center">
                                            {totaldue}
                                        </div>
                                    </div>
                    
                            </div>

                            <div class="p-2 border border-black bg-secondary shadow  text-center">
                                <div className="card-title mt-3 pr-3 px-3 text-center text-white">
                                    <h6>Total Clients</h6>
                                    <h2><i class="fa-solid fa-users "></i></h2>
                                    <div className="card-body text-center text-dark">
                                        {totalclients}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className='mt-5' />

                        <div className="table mt-2 pt-5 mr-3">
                            <h2 className='mb-3 mt-0 pb-4'>Client Payment Status</h2>
                            <div class="table-responsive">
                                <table class="table bg-light shadow table-striped table-sm">
                                    <thead>
                                        <tr>
                                            <th scope="col">Client_ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">MobileNO</th>
                                            <th scope="col">Gender</th>
                                            <th scope='col'>DueAmount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clients.map(client => (
                                            <tr key={client.Client_ID}>
                                                <td>{client.Client_ID}</td>
                                                <td>{client.Name}</td>
                                                <td>{client.MobileNO}</td>
                                                <td>{client.Gender}</td>
                                                <td className={client.DueAmount > 0 ?"text-danger" : "text-success"} >{client.DueAmount > 0 ? "unpaid" :"paid"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Dashboard