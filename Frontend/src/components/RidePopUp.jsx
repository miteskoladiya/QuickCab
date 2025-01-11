import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
      <h5
                className="p-1 text-center absolute top-0 w-[93%] z-20 "
                onClick={() => {
                  props.setRidePopupPanel(false);  
                }}
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">New Ride Available! </h3>

            <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg'>
                <div className='flex items-center gap-3'>
                    <img className='h-12 w-12 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaYKOiTp7W27Sl8DbLxLarVV2pjZEC-BGw5g&s" alt="" />
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>1.2 KM</h5>
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
                            <p className="text-sm  -mt-1 text-gray-600">
                                Cash Cash
                            </p>
                        </div>
                    </div>
                </div>
               <div className='w-full'>
                 <button onClick={()=>{
                    props.setconfirmRidePopupPanel(true);
                    props.confirmRide();
                    
                }} className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
                    Accept
                </button>

                <button onClick={()=>{
                    props.setRidePopupPanel(false);
                }} className="w-full mt-1 bg-gray-400 text-gray-300 font-semibold p-2 rounded-lg">
                    Ignore
                </button>
               </div>
            </div>
    </div>
  )
}

export default RidePopUp
