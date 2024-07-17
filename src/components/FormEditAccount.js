import axios from 'axios';
import React, { useEffect, useState } from 'react';

function FormEditAccount({accountEdit, fetchAllAccounts, handleClose}) {
    
    const [account, setAccount] = useState(accountEdit);
    // setProduct(props.userEdit);
    // console.log('prop trong FormEdituser', product);

    function handleChangeInput(e){
        let {name,value} = e.target;
        setAccount({...account,[name]:value});
    }

    async function handleSubmit(e){
        e.preventDefault();
        
        await axios.put(`http://localhost:5244/api/Account/${account.accountId}`,account)
            .then(res=>{
                // console.log("res: ",res);
                // console.log("create: ",res.data.data);
                // setUsers(pre=>[...pre,res.data]);
                console.log('Edit account successfully!');
                fetchAllAccounts();
                handleClose();
            })
            .catch(err=>console.log(err))
    }

    return (
        <div className='row'>
            <form onSubmit={handleSubmit}>

            <div className="mb-3 mt-3">
                    <label htmlFor="firstName" className="form-label">User ID:</label>
                    <input type="text" className="form-control"
                        onChange={handleChangeInput} value={account.userId}
                        placeholder="Enter user ID" name="userId" />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="firstName" className="form-label">Account Number:</label>
                    <input type="text" className="form-control"
                        onChange={handleChangeInput} value={account.accountNumber}
                        placeholder="Enter account number" name="accountNumber" />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="firstName" className="form-label">Balance:</label>
                    <input type="number" className="form-control"
                        onChange={handleChangeInput} value={account.balance}
                        placeholder="Enter balance" name="balance" />
                </div>

                <div className="mb-3 mt-3">
                    <label htmlFor="firstName" className="form-label">Type account ID:</label>
                    <input type="text" className="form-control"
                        onChange={handleChangeInput} value={account.typeAccountId}
                        placeholder="Enter type account ID" name="typeAccountId" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button> &nbsp;
                <button className='btn btn-secondary' onClick={handleClose}>Close</button>
            </form>
        </div>
    );

}

export default FormEditAccount;