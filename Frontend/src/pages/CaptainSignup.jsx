import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainSignup = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
  
    const [userData, setUserData] = useState({});
    
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    const {captain,setCaptain} = React.useContext(CaptainDataContext);
  
    const submitHandler =async (e) => {
      e.preventDefault();
      //console.log(email, password ); 
      const captainData={
        fullname:{
        firstname: firstname,
        lastname: lastname,
      },
      email: email, 
      password: password,
      vehicle:{
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
    if(response.status===201){
      const data=await response.data;
      setCaptain(data.captain);
      localStorage.setItem('token'  , data.token);
      navigate('/captain-home');
    }


      
      //console.log(userData);
      setEmail('');
      setPassword('');
      setFirstName(''); 
      setLastName(''); 
      setVehicleColor('');
      setVehiclePlate('');
      setVehicleCapacity('');
      setVehicleType('');

    }
  return (
    <div>
      <div>
      <div className='py-5 px-5 h-screen  flex flex-col justify-between'>
        <div>
        <img
            className="w-20 mb-3"
            src="https://www.svgrepo.com/show/505031/uber-driver.svg"
            alt="Uber Driver Logo"
          />

          <form onSubmit={(e) => {
            submitHandler(e);
          }}>
            <h3 className="text-lg font-medium w-full mb-2">What's our captain's name</h3>
            <div className='flex gap-4 mb-7'>
              <input className="bg-[#eeeeee]  rounded px-4 py-2 border  text-lg placeholder:text-base w-1/2"
              type="text"  value={firstname} onChange={(e)=>{
                setFirstName(e.target.value)
              }}   required placeholder="First name"  />
              <input className="bg-[#eeeeee]  rounded px-4 py-2 border  text-lg placeholder:text-base w-1/2" value={lastname} onChange={(e)=>{
                setLastName(e.target.value)
              }} type="text" required placeholder="Last name"  />
            </div>

            <h3 className="text-lg font-medium mb-2">What's  our Captain's email</h3>

            <input className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base" value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }} type="email" required placeholder="email@example.com" />

            <h3 className="text-lg font-medium mb-2">Enter Password</h3>

            <input className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base" type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required placeholder="password" />



              <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
<div className='flex gap-4 mb-7'>
              <input className="bg-[#eeeeee]  w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base" type="text"
                value={vehicleColor}
                onChange={(e) => {
                setVehicleColor(e.target.value)
                }}
                required placeholder="Vehicle Color" />

              <input className="bg-[#eeeeee]  rounded-lg px-4 py-2 border w-1/2 text-lg placeholder:text-base" type="text"
                value={vehiclePlate}
                onChange={(e) => {
                setVehiclePlate(e.target.value)
                }}
                required placeholder="Vehicle Plate" />
</div>
<div className='flex gap-4 mb-7'>
            <input className="bg-[#eeeeee]  rounded-lg px-4 py-2 border w-1/2 text-lg placeholder:text-base" type="number"
        value={vehicleCapacity}
        onChange={(e) => {
          const newValue = parseInt(e.target.value, 10);
          if (newValue < 0) {
            setVehicleCapacity(0);
          } else {
            setVehicleCapacity(newValue);
          }
        }}
        required placeholder="Vehicle Capacity" />

              <select className="bg-[#eeeeee]  rounded-lg px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                value={vehicleType}
                onChange={(e) => {
                setVehicleType(e.target.value)
                }}
                required>
                <option value="" disabled>Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
              </div>

            <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">Create Captain Account</button>

          </form>
          <p className='text-center'>Already have a account?<Link to='/Captain-Login'
            className="text-blue-600">Login here
          </Link>
          </p>
        </div>
        <div>
        <p className='text-[10px] mt-6 leading-tight'>
          This site is protected by reCAPTCHA and the <span className='underline'>Google Policy</span> and <span className='underline'>Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CaptainSignup
