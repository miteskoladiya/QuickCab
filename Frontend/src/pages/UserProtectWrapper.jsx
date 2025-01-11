import React, { useContext ,useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserProtectWrapper = ({
    children
}) => {
    const  token  =localStorage.getItem('token');
    const navigate = useNavigate();
    const {user,setUser} = React.useContext(UserDataContext);
    const [isLoading, setIsLoading] = React.useState(true);


    
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        if(res.status === 200){
            setUser(res.data);
            setIsLoading(false);
        }
    }).catch((err) => { 
        console.log(err);
        localStorage.removeItem('token');
        navigate('/login');
    })
    }, [token])

    if(isLoading){
        return <div>Loading...</div>
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper
