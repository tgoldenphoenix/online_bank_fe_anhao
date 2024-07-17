import { useEffect, useState } from 'react';
// import './App.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import FormAddAccount from './FormAddAccount';
import FormEditAccount from './FormEditAccount';

function AccountCRUD() {

    // For edit modal pop-up START
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // For edit modal pop-up END

    const [accounts, setAccounts] = useState([]);
    // danh sách type account
    const [accTypes, setAccTypes] = useState([]);
    const [accountEdit, setAccountEdit] = useState({});

    async function fetchAllAccounts() {
        await axios.get("http://localhost:5244/api/Account")
          .then(res => {
            if (res.status === 200) {
              setAccounts(res.data)
              
            }
          })
          .catch(err => console.log(err))
    }
    // Get all account type từ DB đổ lên 
    async function fetchDataAccountType() {
      await axios.get("http://localhost:5244/api/Account/TypeAccount")
          .then(res => {
              if (res.status == 200) {
                  setAccTypes(res.data)
              }
          })
          .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchAllAccounts();
        fetchDataAccountType();
    }, [])
    console.log("list of accounts", accounts);

    //Edit account
  async function handleEdit(id) {
    // alert(id);
    // console.log('id muốn edit la so: ', id);
    
    await axios.get(`http://localhost:5244/api/Account/${id}`)
      .then(res => {
        if (res.status === 200) {
          console.log('account cần edit', res.data);
          setAccountEdit(res.data);
        }
      })
      .catch(err => console.log(err));

    handleShow();
  }

  // Delete account
  const handleDelete = (id) => {
    if(window.confirm("Are you sure to delete this account?") === true)
    {
      // alert(id);
      axios.delete(`http://localhost:5244/api/Account/${id}`)
      .then(res => {
        fetchAllAccounts();
        if (res.status === 200) {
          // console.log('user cần edit', res.data.data);
          // setUserEdit(res.data.data);
          console.log('delete account thành công');
          // setProducts(products);
          fetchAllAccounts();
          // App.forceUpdate();
        }
      })
      .catch(err => console.log(err));
    }
  }

    return(
      <div className="container">

        <h2>Account List</h2>
        <table className="table table-striped table-bordered table-hover" >
          <thead>
            <tr>
              <th>Account ID</th>
              <th>User ID</th>
              <th>Account Number</th>
              <th>Balance</th>
              <th>Type account ID</th>
              <th>Actions</th>
              {/* <th>CategoryName</th> */}
            </tr>
          </thead>
          <tbody>
            {accounts && accounts.length > 0 ? 
              accounts.map((item, index) => {
                return (
                  <tr key={index}>
                    {/* <td>{index + 1}</td> */}
                    <td>{item.accountId}</td>
                    <td>{item.userId}</td>
                    <td>{item.accountNumber}</td>
                    <td>{item.balance}</td>
                    <td>{item.typeAccountId}</td>
                    
                    <td colSpan={2}>
                      <button className='btn btn-primary' onClick={()=> handleEdit(item.accountId)}>Edit</button> &nbsp;
                      <button className='btn btn-danger' onClick={()=> handleDelete(item.accountId)}>Delete</button>
                    </td>
                    {/* <td>{item.categoryName}</td> */}
                  </tr>
                )
              }) : 'Loading ...'
          }

          </tbody>
        </table>
        <hr />

        {/* Form add account START*/}
        {/* <button className='btn btn-primary' onClick={()=> handleEdit(item.userId)}>Add User</button> */}
        <FormAddAccount setAccounts = {setAccounts} accTypes={accTypes}/>
        {/* Form add account END*/}


        {/* Pop-up modal edit account START */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Form Edit Account</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <FormEditAccount accountEdit =  {accountEdit} fetchAllAccounts = {fetchAllAccounts} handleClose ={handleClose}/>
          </Modal.Body>
        </Modal>
        {/* Pop-up modal edit account END */}
      </div>
    );
}

export default AccountCRUD;