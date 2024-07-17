import axios from 'axios';
import React, { useEffect, useState } from 'react';

function FormEditUser({userEdit, fetchAllUsers, handleClose}) {
    
    const [product, setProduct] = useState(userEdit);
    // setProduct(props.userEdit);
    // console.log('prop trong FormEdituser', product);

    function handleChangeInput(e){
        let {name,value} = e.target;
        setProduct({...product,[name]:value});
    }

    async function handleSubmit(e){
        e.preventDefault();
        
        await axios.put(`http://localhost:5244/api/User/${product.userId}`,product)
            .then(res=>{
                // console.log("res: ",res);
                // console.log("create: ",res.data.data);
                // setUsers(pre=>[...pre,res.data]);
                fetchAllUsers();
                handleClose();
            })
            .catch(err=>console.log(err))
    }

    return (
        <div className='row'>
            {/* <h2>Edit user form</h2> */}
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
                        onChange={handleChangeInput} value={product.username}
                        placeholder="Enter Username" name="userName" />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">Email:</label>
                    <input type="email" className="form-control"
                        onChange={handleChangeInput} value={product.email}
                        placeholder="Enter Email" name="email" />
                </div>

                {/* <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">Date of Birth:</label>
                    <input type="date" className="form-control"
                        onChange={handleChangeInput} value={product.dob}
                        placeholder="Enter Date of Birth" name="dOB" />
                </div> */}

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
                        onChange={handleChangeInput} value={product.pin}
                        placeholder="Enter PIN" name="pIN" />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="name" className="form-label">Role:</label>
                    <input type="text" className="form-control"
                        onChange={handleChangeInput} value={product.role}
                        placeholder="Enter Role" name="role" />
                </div>

                {/* <div className="mb-3 mt-3">
                    <label htmlFor="role" className="form-label">Role:</label>
                    <select className="form-select" name='role' onChange={handleChangeInput}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        {/* {cats.map((item, index) => {
                            return (<option key={index} value={item.id}>{item.name}</option>)
                        })}
                    </select>
                </div> */}

                {/* <div className="mb-3 mt-3">
                    <label htmlFor="addDated" className="form-label">addDated:</label>
                    <input type="date" className="form-control"
                        onChange={handleChangeInput} value={product.addDated}
                        name="addDated" />
                </div> */}

                {/* <div className="mb-3 mt-3">
                    <label htmlFor="category" className="form-label">Category:</label>
                    <select className="form-select" name='categoryId' onChange={handleChangeInput}>
                        {cats.map((item, index) => {
                            return (<option key={index} value={item.id}>{item.name}</option>)
                        })}
                    </select>
                </div> */}

                <button type="submit" className="btn btn-primary">Submit</button> &nbsp;
                <button className='btn btn-secondary' onClick={handleClose}>Close</button>
            </form>
        </div>
    );

}

export default FormEditUser;