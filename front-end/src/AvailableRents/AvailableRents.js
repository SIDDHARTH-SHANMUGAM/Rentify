import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './A.css';

function AvailableRents() {
  const [rents, setRents] = useState([]);
  const [filteredRents, setFilteredRents] = useState([]);
  const [filters, setFilters] = useState({
    bedRooms: '',
    halls: '',
    minAdvance: '',
    maxAdvance: '',
    minPricePerMonth: '',
    maxPricePerMonth: '',
    city: '',
    state: '',
    country: '',
  });

  useEffect(() => {
    async function fetchData() {
      const accessToken = JSON.parse(sessionStorage.getItem('token'));
      const res = await axios.get('http://localhost:3001/rent/getrents', { headers: { Authorization: `Bearer ${accessToken}` } });
      if (res.data.msg === 'got') {
        console.log(res.data.rents);
        setRents(res.data.rents);
        setFilteredRents(res.data.rents);
      }
    }
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    let updatedRents = rents;
    if (filters.bedRooms) {
      updatedRents = updatedRents.filter(rent => rent.bedRooms.toString() === filters.bedRooms);
    }
    if (filters.halls) {
      updatedRents = updatedRents.filter(rent => rent.halls.toString() === filters.halls);
    }
    if (filters.minAdvance) {
      updatedRents = updatedRents.filter(rent => rent.advance >= Number(filters.minAdvance));
    }
    if (filters.maxAdvance) {
      updatedRents = updatedRents.filter(rent => rent.advance <= Number(filters.maxAdvance));
    }
    if (filters.minPricePerMonth) {
      updatedRents = updatedRents.filter(rent => rent.pricePerMonth >= Number(filters.minPricePerMonth));
    }
    if (filters.maxPricePerMonth) {
      updatedRents = updatedRents.filter(rent => rent.pricePerMonth <= Number(filters.maxPricePerMonth));
    }
    if (filters.city) {
      updatedRents = updatedRents.filter(rent => rent.city.toLowerCase().includes(filters.city.toLowerCase()));
    }
    if (filters.state) {
      updatedRents = updatedRents.filter(rent => rent.state.toLowerCase().includes(filters.state.toLowerCase()));
    }
    if (filters.country) {
      updatedRents = updatedRents.filter(rent => rent.country.toLowerCase().includes(filters.country.toLowerCase()));
    }
    setFilteredRents(updatedRents);
  }, [filters, rents]);

  return (
    <div className='rcontainer'>
      <div className='filters'>
        <input type="text" name="bedRooms" placeholder="Bedrooms" value={filters.bedRooms} onChange={handleFilterChange} />
        <input type="text" name="halls" placeholder="Halls" value={filters.halls} onChange={handleFilterChange} />
        <input type="number" name="minAdvance" placeholder="Min Advance" value={filters.minAdvance} onChange={handleFilterChange} />
        <input type="number" name="maxAdvance" placeholder="Max Advance" value={filters.maxAdvance} onChange={handleFilterChange} />
        <input type="number" name="minPricePerMonth" placeholder="Min Rent per month" value={filters.minPricePerMonth} onChange={handleFilterChange} />
        <input type="number" name="maxPricePerMonth" placeholder="Max Rent per month" value={filters.maxPricePerMonth} onChange={handleFilterChange} />
        <input type="text" name="city" placeholder="City" value={filters.city} onChange={handleFilterChange} />
        <input type="text" name="state" placeholder="State" value={filters.state} onChange={handleFilterChange} />
        <input type="text" name="country" placeholder="Country" value={filters.country} onChange={handleFilterChange} />
        <button onClick={()=>{ window.location.reload()}}> reset</button>
      </div >
      <div className='rents'>
      {
        filteredRents.length > 0 ? (
          filteredRents.map((rent) => (
            <RentCard key={rent._id} rent={rent} />
          ))
        ) : (
          <p>No rentals available with the selected filters.</p>
        )
      }
      </div>
    </div>
  );
}

function RentCard({ rent }) {
  const navigate = useNavigate();
  const gotoContact = () => {
    navigate('/contact', { state: rent.userId });
  };
  console.log(rent.userId);

  return (
    <div className='card'>
      <div className='details'>
        <h2>Location</h2>
        <p>Street: {rent.street}</p>
        <p>City: {rent.city}</p>
        <p>State: {rent.state}</p>
        <p>Country: {rent.country}</p>
      </div>

      <div className='details'>
        <h2>Availability</h2>
        <p>Bedrooms: {rent.bedRooms}</p>
        <p>Halls: {rent.halls}</p>
        <p>Bathrooms: {rent.bathRooms}</p>
        <p>Kitchen: {rent.kitchens}</p>
      </div>

      <div className='details'>
        <h2>Costs</h2>
        <p>Advance: &#8377;{rent.advance}</p>
        <p>Rent Price: &#8377;{rent.pricePerMonth}</p>
        <button onClick={gotoContact}>Interested</button>
      </div>
    </div>
  );
}

export default AvailableRents;
export { RentCard };
