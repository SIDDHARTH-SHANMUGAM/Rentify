import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function MyProperties() {

  const navigate = useNavigate();
  useEffect(()=>{
       const accessToken = JSON.parse(sessionStorage.getItem('token'));
       if(!accessToken)
       {
          navigate('/');
       }

  })

    const [ rents, setRents] = useState('');
  useEffect( ()=>
  {
    async function fetchData()
    {
      const accessToken = JSON.parse(sessionStorage.getItem('token'));
      await axios.post('http://localhost:3001/rent/getmyrents', {accessToken}).then(res=>{
        if(res.data.msg==='got')
        {
          console.log(res.data.rents);
          setRents(res.data.rents);
        }
      })
    }
    fetchData();
  },[])
    console.log(rents);

  return (
    <div className='rcontainer'>
      {
            rents && rents.map((rent) => (
              <RentCard key={rent._id} rent={rent} />
            ))
      }
    </div>
  )
}
function RentCard ({rent}){

    const [deleteConfirm, setdeletConfirm] = useState(false);
    const [updateConfirm, setUpdateConfirm] = useState(false);
    const [street, setStreet] = useState(rent.street);
    const [city, setCity] = useState(rent.city);
    const [state, setState] = useState(rent.state);
    const [country, setCountry] = useState(rent.country);
    const [bedRooms, setBedrooms] = useState(rent.bedRooms);
    const [halls, setHalls] = useState(rent.halls);
    const [bathRooms, setBathrooms] = useState(rent.bathRooms);
    const [kitchens, setKitchen] = useState(rent.kitchens);
    const [otherDescription, setOD] = useState(rent.otherDescription);
    const [advance, setAdvance] = useState(rent.advance);
    const [pricePerMonth, setPPM] = useState(rent.pricePerMonth);
    var deletePopUp, updatePopUp;

    const deleteRent = async () =>{
        const accessToken = JSON.parse(sessionStorage.getItem('token'));
      await axios.post('http://localhost:3001/rent/deletemyrent', {accessToken, rentId: rent.rentId}).then(res=>{
        if(res.data.msg==='success')
        {
          window.location.reload();
        }
      })
    }
    if(deleteConfirm)
    {
        deletePopUp = <div>
          Confirm to delete
          <button onClick={()=>{deleteRent()}}>Ok</button>
          <button onClick={()=>{setdeletConfirm(false)}}>Cancel</button>
        </div>
    }

    const updateRent = async () =>{
        const accessToken = JSON.parse(sessionStorage.getItem('token'));
      await axios.post('http://localhost:3001/rent/updatemyrent', {accessToken, rentId: rent.rentId, street, city, state, country,
            bedRooms, halls, bathRooms, kitchens, otherDescription, 
            advance, pricePerMonth}).then(res=>{
        if(res.data.msg==='updated')
        {
          window.location.reload();
        }
      })
    }

    if(updateConfirm)
    {
        updatePopUp = <div className='AddRent'>
      <h1>Add Rent Description</h1>
      <div className='boxes'>
        <h2>Location</h2>
        <div className='ipcont'>
          <div>
            <label >Street</label>
            <input 
              type='text'
              value= {street}
              onChange={(e)=>{setStreet(e.target.value)}}
            />
          </div>
          <div>
            <label >City</label>
            <input 
              type='text'
              value= {city}
              onChange={(e)=>{setCity(e.target.value)}}
            />
          </div>
          <div>
            <label >State</label>
            <input 
              type='text'
              value= {state}
              onChange={(e)=>{setState(e.target.value)}}
            />
          </div>
          <div>
            <label >Country</label>
            <input 
              type='text'
              value= {country}
              onChange={(e)=>{setCountry(e.target.value)}}
            />
          </div>
      </div>
    </div>
    <div className='boxes'>
        <div className='ipcont'>
        <h2>Availablity</h2>
          <div>
            <label >No Of Halls</label>
            <input 
              type='number'
              value= {halls}
              onChange={(e)=>{setHalls(e.target.value)}}
            />
          </div>
          <div>
            <label >No Of Bed Rooms</label>
            <input 
              type='number'
              value= {bedRooms}
              onChange={(e)=>{setBedrooms(e.target.value)}}
            />
          </div>
          <div>
            <label >No Of Bath Rooms</label>
            <input 
              type='number'
              value= {bathRooms}
              onChange={(e)=>{setBathrooms(e.target.value)}}
            />
          </div>
          <div>
            <label >No Of kitchens</label>
            <input 
              type='number'
              value= {kitchens}
              onChange={(e)=>{setKitchen(e.target.value)}}
            />
          </div>
          <div>
            <label >Other Descriptions</label>
            <input 
              type='text'
              value= {otherDescription}
              onChange={(e)=>{setOD(e.target.value)}}
            />
          </div>
        </div>
      </div>
      <div className='boxes'>
        <div className='ipcont'>
        <h2>Cost</h2>
          <div>
            <label >Rent Prize Per Month</label>
            <input 
              type='number'
              value= {pricePerMonth}
              onChange={(e)=>{setPPM(e.target.value)}}
            />
          </div>
          <div>
            <label >Advance</label>
            <input 
              type='number'
              value= {advance}
              onChange={(e)=>{setAdvance(e.target.value)}}
            />
          </div>
      </div>
      </div>
      
          <button onClick={updateRent}>Update</button>
          <button onClick={()=>{setUpdateConfirm(false)}}>Cancel</button>
    </div>
    }
  
  return <div className='card' >
      <div className='details'>
        <h2>Location</h2>
        <p>Street : {rent.street}</p>
        <p>City : {rent.city}</p>
        <p>State : {rent.state}</p>
        <p>Country : {rent.country}</p>
      </div>

      <div className='details'>
        <h2>Availablity</h2>
        <p>bedRooms : {rent.bedRooms}</p>
        <p>Halls: {rent.halls}</p>
        <p>bathRooms : {rent.bathRooms}</p>
        <p>kitchen : {rent.kitchens}</p>
      </div>

      <div className='details'>
        <h2>Costs</h2>
        <p >Advance : &#8377;{rent.advance}</p>
        <p >Rent Prize : &#8377;{rent.pricePerMonth}</p>
        <button onClick={()=>{setdeletConfirm(true)}}>Delete</button>
        <button onClick={()=>{setUpdateConfirm(true)}}>Update</button>
      </div>
      {deleteConfirm&&deletePopUp}
      {updateConfirm&&updatePopUp}
    </div>
}

export default MyProperties
