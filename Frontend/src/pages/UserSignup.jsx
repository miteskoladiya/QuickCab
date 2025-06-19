import React,{ useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {UserDataContext} from '../context/UserContext';

const UserSignup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');

  const navigate = useNavigate();
  const  {user,setUser} = React.useContext(UserDataContext);

  const submitHandler =async (e) => {
    e.preventDefault();
    //console.log(email, password );
    const newUser={
      fullname:{
        firstname:firstname,
        lastname:lastname,
      },
      email:email,
      password:password,
    }
    //console.log(userData);


    const response = axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser);
    //console.log(response);

  if((await response).status===200){  
  const data = (await response).data;

  setUser(data.user);
  localStorage.setItem('token',data.token);
  navigate('/home');

  }
    setEmail('');
    setPassword('');
    setFirstName(''); 
    setLastName('');  
  }
  return (
    <div>
      <div className='p-7 h-screen  flex flex-col justify-between'>
        <div>
          <img
            className="w-16 mb-10"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />

          <form onSubmit={(e) => {
            submitHandler(e);
          }}>
            <h3 className="text-lg font-medium mb-2">What's your name</h3>
            <div className='flex gap-4 mb-5'>
              <input className="bg-[#eeeeee]  rounded px-4 py-2 border  text-lg placeholder:text-base w-1/2"
              type="text"  value={firstname} onChange={(e)=>{
                setFirstName(e.target.value)
              }}   required placeholder="First name"  />
              <input className="bg-[#eeeeee]  rounded px-4 py-2 border  text-lg placeholder:text-base w-1/2" value={lastname} onChange={(e)=>{
                setLastName(e.target.value)
              }} type="text" required placeholder="Last name"  />
            </div>

            <h3 className="text-lg font-medium mb-2">What's your email</h3>

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

            <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base">Create account</button>

          </form>
          <p className='text-center'>Already have a account?<Link to='/login'
            className="text-blue-600">Login here
          </Link>
          </p>
        </div>
        <div>
          <p className='text-[10px] leading-tight'>
          This site is protected by reCAPTCHA and the <span className='underline'>Google Policy</span> and <span className='underline'>Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup
