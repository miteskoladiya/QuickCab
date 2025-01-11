import React, { useState,useRef } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
    const navigate = useNavigate()
    
    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            rideId: props.ride._id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (response.status === 200) {
            navigate('/captain-home')
        }

    }

  return (
    <div>
    <h5
        className="p-1 text-center absolute top-0 w-[93%] z-20 "
        onClick={() => {
            props.setFinishRidePanel(false);
        }}
    >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
    </h5>
    <h3 className="text-2xl font-semibold mb-5">Finish this Ride</h3>

    <div className="flex items-center justify-between mt-4 p-4 border-2 border-yellow-400 rounded-lg">
        <div className="flex items-center gap-3">
            <img
                className="h-12 w-12 rounded-full object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaYKOiTp7W27Sl8DbLxLarVV2pjZEC-BGw5g&s"
                alt=""
            />
            <h2 className="text-lg font-medium">{props.ride?.user.fullname.firstname}</h2>
        </div>
        <h5 className="text-lg font-semibold">1.2 KM</h5>
    </div>

    <div className="flex gap-2 flex-col items-center justify-between ">
        <div className="w-full empty:5">
            <div className="flex items-center gap-5 p-3 border-b-2">
                <i className="text-lg ri-map-pin-user-fill"></i>
                <div>
                    <h3 className="text-lg font-medium">562/11-A</h3>
                    <p className="text-sm  -mt-1 text-gray-600">
                        {props.ride?.pickUp}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-3 border-b-2">
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div className="">
                    <h3 className="text-lg font-medium">562/11-A</h3>
                    <p className="text-sm  -mt-1 text-gray-600">
                    {props.ride?.destination}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-5 p-3 ">
                <i className="text-lg ri-currency-line"></i>
                <div className="">
                    <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
                    <p className="text-sm  -mt-1 text-gray-600">Cash Cash</p>
                </div>
            </div>
        </div>
        <div className="mt-10 w-full">
                <button onClick={endRide}
                    className="w-full mt-5 flex text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg"
                >
                    Finish Ride
                </button>

                <p className=' mt-10 text-xs '>Click on finish ride button if you have completed the payment.</p>
        </div>
    </div>
</div>
  )
}

export default FinishRide
