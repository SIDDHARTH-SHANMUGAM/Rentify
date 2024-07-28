import React, { useState } from 'react'
import './SignIn.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function SignIn() {
  
  const [firstname, setFName] = useState('');
  const [lastname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate('');


  const handleRegister = async (e) => {
    e.preventDefault()
    try{
        await axios.post("http://localhost:3001/user/register", {
          firstname, lastname, email, mobile,  password
        })
        .then(res=>{
          if(res.data.message==='signedIn')
          {
            sessionStorage.setItem('token', JSON.stringify(res.data.token));
            navigate('/home');
          }
          else
          {
            alert(res.data.message);
          }
        })
      }
      catch(e){
        console.log(e);
      }
    }

  const gotoLogIn=()=>{
  navigate('/');
  }
  return (
    <div className='loginContainer'>
      <div className='inner'>
        <h2>Signin</h2>
        <div className='ipContainer'>
          <div>
            <label >First Name</label>
            <input 
              type='text'
              value= {firstname}
              onChange={(e)=>{setFName(e.target.value)}}
            />
          </div>
          <div>
            <label >Last Name</label>
            <input 
              type='text'
              value= {lastname}
              onChange={(e)=>{setLName(e.target.value)}}
            />
          </div>
          <div>
            <label >Email</label>
            <input 
              type='email'
              value= {email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div>
            <label >Mobile</label>
            <input 
              type='number'
              value={mobile}
              onChange={(e)=>{ setMobile(e.target.value)}}
              />
          </div>
          <div>
            <label >Password</label>
            <input 
              type='password'
              value={password}
              onChange={(e)=>{ setPassword(e.target.value)}}
              />
          </div>
        </div>
        <button type='submit' onClick={handleRegister}> Register</button>
        <div className='stol'>
          <p>Have account already? </p>
          <p className='link' onClick={gotoLogIn}>Login</p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
