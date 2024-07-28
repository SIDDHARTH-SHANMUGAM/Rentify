import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AvailableRents from '../AvailableRents/AvailableRents';
import AddRent from '../AddRents/AddRent';
import './Home.css';
import MyProperties from '../MyProprties/MyProperties';


function Home() {

  const [rentAvailablePage, setRentAvailablePage] = useState(true);
  const [addRentPage, setAddRentPage] = useState(false);
  const [myProperty, setMyProperty] = useState(false);
  const navigate = useNavigate('');

  const accessToken = JSON.parse(sessionStorage.getItem('token'));

  const [logOut, setLogout] = useState(false);
  const handleLogOut= () =>{
    setLogout(!logOut);

  }
  const makeLogout = ()=>{
    sessionStorage.removeItem('token');
    navigate('/');
  }
  var logoutmask
  if(logOut)
  {
    logoutmask = <div className='logoutContainer'>
        <p>Are you sure to Logout</p>
        <br/>
        <br/>
      <div className='cont'>
        <button onClick={makeLogout}> Yes </button>
        <button onClick={handleLogOut}> NO </button>
      </div>
    </div>
  }

  const openRentAvailablePage = () =>{
    setRentAvailablePage(true);
    setAddRentPage(false);
    setMyProperty(false);
  }
  const openAddRentPage = () =>{
    setRentAvailablePage(false);
    setAddRentPage(true);
    setMyProperty(false);
  }
  const openMyProperty = () =>{
    setRentAvailablePage(false);
    setAddRentPage(false);
    setMyProperty(true);
    
  }


  return (
    <div className='container'>
      
      <div className='navbar'>
        <h1>Rentify</h1>

        <div className={accessToken?'navItems':'nav2'}>
          <button onClick={openRentAvailablePage}>Rents Available</button>
          <button onClick={openAddRentPage}>Add Rent</button>
          <button onClick={openMyProperty}>My Properties</button>
          <button onClick={handleLogOut}>Logout</button>
        </div>
      </div>
        <div >
          {rentAvailablePage&&<AvailableRents/>}
          {addRentPage&&<AddRent/>}
          {myProperty&&<MyProperties/>}
          {logOut&&logoutmask}
        </div>
    </div>
  )
}

export default Home
