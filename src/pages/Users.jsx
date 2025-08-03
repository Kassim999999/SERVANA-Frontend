import './Users.css';

const Users=()=> {
    const users=[ {
        name: 'Alice Wambui',
            email: 'alice@example.com',
            phone: '+254712345678',
            role: 'User',
            status: 'Active',
            location: 'Nairobi',
            signup: '2025-07-01',
            lastLogin: '2025-08-01'
    }

    ,
    {
    name: 'John Kipkoech',
        email: 'johnk@example.com',
        phone: '+254798456123',
        role: 'User',
        status: 'Suspended',
        location: 'Mombasa',
        signup: '2025-06-15',
        lastLogin: '2025-07-29'
}

];

return (<div className="users-page" > <div className="users-header" > <h2>User Management</h2> <button className="btn-primary" >+ Add New User</button> </div> <div className="table-wrapper" > <table className="users-table" > <thead> <tr> <th>Name</th> <th>Email</th> <th>Phone</th> <th>Status</th> <th>Role</th> <th>Location</th> <th>Signup Date</th> <th>Last Login</th> <th>Actions</th> </tr> </thead> <tbody> {
        users.map((user, index)=> (<tr key= {
                    index
                }

                > <td> {
                    user.name
                }

                </td> <td> {
                    user.email
                }

                </td> <td> {
                    user.phone
                }

                </td> <td> <span className= {
                    `badge $ {
                        user.status.toLowerCase()
                    }

                    `
                }

                > {
                    user.status
                }

                </span> </td> <td> {
                    user.role
                }

                </td> <td> {
                    user.location
                }

                </td> <td> {
                    user.signup
                }

                </td> <td> {
                    user.lastLogin
                }

                </td> <td> <button className="link" >View</button> <button className="link danger" >Suspend</button> </td> </tr>))
    }

    </tbody> </table> </div> </div>);
}

;

export default Users;