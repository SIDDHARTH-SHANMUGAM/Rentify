import axios from 'axios';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Contact() {
    const navigate = useNavigate('');

    const location = useLocation();
    const userId = location.state;

    const [user, setUser] = useState('');
    const accessToken = JSON.parse(sessionStorage.getItem('token'));
    axios.post('http://localhost:3001/user/getUser', {accessToken, userId}).then((res)=>{
      if(res.data.message === 'got')
      {
        setUser(res.data.user);
      }
    })
    

    const gotoHome= () =>{
        navigate("/home")
    }

  return (
    <div>
      <p>Owner Details</p>

      <p>First Name : {user.firstname}</p>
      <p>Last Name : {user.lastname}</p>
      <p>Email : {user.email}</p>
      <p>Contact : {user.mobile}</p>

      <h2 onClick={gotoHome}> Go to Home</h2>
    </div>
  )
}

export default Contact