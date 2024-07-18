import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';

import FormAddUser from './FormAddUser';
import FormEditUser from './FormEditUser';
import Pagination from './Pagination';

function UserCRUD() {
  // For edit user modal pop-up START
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // For edit user modal pop-up END

  // Pagination START
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);
  // Pagination END
  
  const [users, setUsers] = useState([]); // list of all User
  const [userEdit, setUserEdit] = useState({}); // user đang cần edit

  async function fetchAllUsers() {
    await axios.get("http://localhost:5244/api/User")
      .then(res => {
        if (res.status === 200) {
          setUsers(res.data)
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchAllUsers();
  }, [])
  console.log("list of users", users);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentUsers = users.slice(firstPostIndex, lastPostIndex);

  //Edit user
  async function handleEdit(id) {
    await axios.get(`http://localhost:5244/api/User/${id}`)
      .then(res => {
        if (res.status === 200) {
          setUserEdit(res.data);
        }
      })
      .catch(err => console.log(err));

    handleShow();
  }

  // Delete user
  const handleDelete = (id) => {
    if(window.confirm("Are you sure to delete this user?") === true)
    {
      // alert(id);
      axios.delete(`http://localhost:5244/api/User/${id}`)
      .then(res => {
        if (res.status === 200) {
          // console.log('user cần edit', res.data.data);
          // setUserEdit(res.data.data);
          console.log('delete thành công');
          // setProducts(products);
          fetchAllUsers();
          // App.forceUpdate();
        }
      })
      .catch(err => console.log(err));
    }
  }

  return (
    <div className="container">
      <h2>User List</h2>
      <table className="table table-striped table-bordered table-hover" >
        <thead>
          <tr>
            <th>User ID</th>
            {/* <th>First Name</th> */}
            {/* <th>Last Name</th> */}
            <th>Username</th>
            <th>Email</th>
            {/* <th>Date of Birth</th> */}
            {/* <th>Address</th> */}
            <th>Phone Number</th>
            {/* <th>Password</th> */}
            {/* <th>PIN</th> */}
            <th>Role</th>
            <th>Failed Login Attempts</th>
            <th>Account status</th>
            <th>Actions</th>
            {/* <th>CategoryName</th> */}
          </tr>
        </thead>
        <tbody>
          {currentUsers && currentUsers.length > 0 ? 
            currentUsers.map((item, index) => {
              return (
                <tr key={index}>
                  {/* <td>{index + 1}</td> */}
                  <td>{item.userId}</td>
                  {/* <td>{item.firstName}</td> */}
                  {/* <td>{item.lastName}</td> */}
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  {/* <td>{item.dob}</td> */}
                  {/* <td>{item.address}</td> */}
                  <td>{item.phone}</td>
                  {/* <td>{item.pin}</td> */}
                  <td>{item.role}</td>
                  <td>{item.failedLoginAttempts}</td>
                  <td>{item.accountLocked ? 'locked' : 'active'}</td> {/* 0 là false 1 là true */}
                  <td colSpan={2}>
                    <button className='btn btn-primary' onClick={()=> handleEdit(item.userId)}>Edit</button> &nbsp;
                    <button className='btn btn-danger' onClick={()=> handleDelete(item.userId)}>Delete</button>
                  </td>
                </tr>
              )
            }) : 'Loading ...'
          }
        </tbody>
      </table>
      <Pagination
          totalPosts={users.length}
          postsPerPage={postsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
      />
      <hr />

      {/* Form add user START*/}
      {/* <button className='btn btn-primary' onClick={()=> handleEdit(item.userId)}>Add User</button> */}
      <FormAddUser setUsers = {setUsers}/>
      {/* Form add user END*/}

      {/* Pop-up modal edit user */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Edit user</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {/* <h1>Form edit user</h1> */}
          <FormEditUser userEdit = {userEdit} fetchAllUsers = {fetchAllUsers} handleClose ={handleClose}/>
        </Modal.Body>

        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>{}}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>

    </div>
  );
}

export default UserCRUD;
