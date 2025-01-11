import React from 'react'

const WaitForDriver = (props) => {
  return (
    <div>
    <h5
        className="p-1 text-center absolute top-0 w-[93%] z-20 "
        onClick={() => {
            props.WaitForDriver(false);
        }}
    >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
    </h5>

    <div className='flex items-center justify-between'>
    <img
                    className="h-12"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1568070387/assets/b5/0a5191-836e-42bf-ad5d-6cb3100ec425/original/UberX.png"
                    alt=""
                />
                <div className='text-right'>
                  <h2 className='text-lg  font-medium capitalize'>{props.ride?.captain.fullname.firstname}</h2>
                  <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
                  <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                  <h1 className='text-lg font-semibold'>{props.ride?.otp}</h1>
                </div>
    </div>
    

    <div className="flex gap-2 flex-col items-center justify-between ">
        <div className="w-full mt-5">
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
    </div>
</div>
  )
}

export default WaitForDriver
