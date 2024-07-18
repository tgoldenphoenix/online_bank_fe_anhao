import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FormInput from "./FormInput";

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

    const inputs = [
        {
            id: 1,
            name: "firstName",
            type: "text",
            placeholder: "first name",
            errorMessage:
            "First name should be 3-16 characters and shouldn't include any special character!",
            label: "First Name",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 2,
            name: "lastName",
            type: "text",
            placeholder: "last name",
            errorMessage:
            "Last name should be 3-16 characters and shouldn't include any special character!",
            label: "Last Name",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 3,
            name: "userName",
            type: "text",
            placeholder: "user name",
            errorMessage:
            "User name should be 3-16 characters and shouldn't include any special character!",
            label: "Username",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 4,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "It should be a valid email address! anhao",
            label: "Email",
            required: true,
        },
        {
            id: 5,
            name: "dOB",
            type: "date",
            placeholder: "Date of birth",
            label: "Date of Birth",
        },
        {
            id: 6,
            name: "address",
            type: "text",
            placeholder: "address",
            errorMessage:
            "Address name should be 3-16 characters and shouldn't include any special character!",
            label: "Address",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 7,
            name: "phone",
            type: "number",
            placeholder: "phone",
            errorMessage:
            "Phone should be 3-16 characters and shouldn't include any special character!",
            label: "Phone Number",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        },
        {
            id: 8,
            name: "password",
            type: "password",
            placeholder: "Password",
            errorMessage:
            "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
            label: "Password",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 9,
            name: "pIN",
            type: "text",
            placeholder: "PIN",
            errorMessage:
            "PIN name should be 3-16 characters and shouldn't include any special character!",
            label: "PIN code",
            pattern: "^[A-Za-z0-9]{3,16}$",
            required: true,
        }
    ];

    let {setUsers} = props;
    
    function handleChangeInput(e){
        // let {name,value} = e.target;
        // setProduct({...product,[name]:value});

        setProduct({ ...product, [e.target.name]: e.target.value });
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
                {inputs.map((input) => (
                <FormInput
                    key={input.id}
                    {...input} // input ko có 's'
                    value={product[input.name]}
                    onChange={handleChangeInput}
                />
                ))}

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


            {/* <form onSubmit={handleSubmit}>

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
            </form> */}
        </div>
    );
}

export default FormAddUser;