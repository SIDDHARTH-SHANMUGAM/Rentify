import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './AddRents.css'
import { useNavigate } from 'react-router-dom';

function AddRent() {
  const navigate = useNavigate();
  useEffect(()=>{
       const accessToken = JSON.parse(sessionStorage.getItem('token'));
       if(!accessToken)
       {
          navigate('/');
       }

  })

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [bedRooms, setBedrooms] = useState('');
  const [halls, setHalls] = useState('');
  const [bathRooms, setBathrooms] = useState('');
  const [kitchens, setKitchen] = useState('');
  const [otherDescription, setOD] = useState('');
  const [advance, setAdvance] = useState('');
  const [pricePerMonth, setPPM] = useState('');

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
       const accessToken = JSON.parse(sessionStorage.getItem('token'));
        await axios.post("http://localhost:3001/rent/addrent", {
            street, city, state, country,
            bedRooms, halls, bathRooms, kitchens, otherDescription, 
            advance, pricePerMonth, accessToken
        })
        .then(res=>{
          if(res.data.msg==='done')
          {
            window.location.reload();
          }
          else{
            alert(res.data.message);
          }
          
        })
        .catch(e=>{
          console.log(e);
        })
      }
      catch(e){
        console.log(e);
      }
  }


  return (
    <div className='AddRent'>
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
      
          <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default AddRent