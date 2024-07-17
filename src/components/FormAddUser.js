import axios from 'axios';
import React, { useEffect, useState } from 'react';

function FormAddUser(props) {
    // product này ko có 's', products bên App.js có 's'
    const [product, setProduct] = useState({ 
        firstName: "",
        lastName: "", 
        userName: "", 
        email: "", 
        dOB: "", 
        address: "", 
        phone: "", 
        password: "",
        pIN: "",
        role: ""
    });

    let {setUsers} = props;
    
    function handleChangeInput(e){
        let {name,value} = e.target;
        setProduct({...product,[name]:value});
    }

    async function handleSubmit(e){
        e.preventDefault();

        if (product.role === '') {
            alert('Please choose role');
        }

        await axios.post("http://localhost:5244/api/User",product)
            .then(res=>{
                setUsers(pre=>[...pre,res.data])
                // Reset lại các trường input trong form
                setProduct({ 
                    firstName: "", 
                    lastName: "", 
                    userName: "", 
                    email: "", 
                    dOB: "", 
                    address: "", 
                    phone: "", 
                    password: "",
                    pIN: "",
                    role: ""
                });
                // console.log('add user successfully');
                alert('Add user successfully!');
            })
            .catch(err=>console.log(err))
    }

    return (
        <div className='row'>
            <h2>FORM ADD NEW USER</h2>
            <form onSubmit={handleSubmit}>

                <div className="mb-3 mt-3">
                    <label htmlFor="firstName" className="form-label">First Name:</label>
                    <input type="text" className="form-control"
                        onChange={handleChangeInput} value={product.firstName}
                        placeholder="Enter first name" name="firstName" />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="lastName" className="form-label">Last Name:</label>
                    <input type="text" className="form-control"
                        onChange={handleChangeInput} value={product.lastName}
                        placeholder="Enter last name" name="lastName" />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">Username:</label>
                    <input type="text" className="form-control"
                        onChange={handleChangeInput} value={product.userName}
                        placeholder="Enter Username" name="userName" />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">Email:</label>
                    <input type="email" className="form-control"
                        onChange={handleChangeInput} value={product.email}
                        placeholder="Enter Email" name="email" />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">Date of Birth:</label>
                    <input type="date" className="form-control"
                        onChange={handleChangeInput} value={product.dOB}
                        placeholder="Enter Date of Birth" name="dOB" />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">Address:</label>
                    <input type="text" className="form-control"
                        onChange={handleChangeInput} value={product.address}
                        placeholder="Enter Address" name="address" />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">Phone:</label>
                    <input type="number" className="form-control"
                        onChange={handleChangeInput} value={product.phone}
                        placeholder="Enter Phone" name="phone" />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">Password:</label>
                    <input type="text" className="form-control"
                        onChange={handleChangeInput} value={product.password}
                        placeholder="Enter Password" name="password" />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">PIN:</label>
                    <input type="number" className="form-control"
                        onChange={handleChangeInput} value={product.pIN}
                        placeholder="Enter PIN" name="pIN" />
                </div>
                
                <div className="mb-3 mt-3">
                    <label htmlFor="category" className="form-label">Role:</label>
                    <select className="form-select" name='role' onChange={handleChangeInput}>
                        <option value="">--Please choose an option--</option>
                        <option key="admin" value="admin">Admin</option>
                        <option key="user" value="user">User</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default FormAddUser;