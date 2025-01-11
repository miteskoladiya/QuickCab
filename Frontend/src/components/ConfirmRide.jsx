import React from "react";

const ConfirmRide = (props) => {
    return (
        <div>
            <h5
                className="p-1 text-center absolute top-0 w-[93%] z-20 "
                onClick={() => {
                    props.setconfirmRidePanel(false);
                }}
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className="text-2xl font-semibold mb-5">Confirm your Ride </h3>

            <div className="flex gap-2 flex-col items-center justify-between ">
                <img
                    className="h-20"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1568070387/assets/b5/0a5191-836e-42bf-ad5d-6cb3100ec425/original/UberX.png"
                    alt=""
                />
                <div className="w-full empty:5">
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm  -mt-1 text-gray-600">
                                {props.pickUp}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div className="">
                            <h3 className="text-lg font-medium">562/11-A</h3>
                            <p className="text-sm  -mt-1 text-gray-600">
                                {props.destination}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3 ">
                        <i className="text-lg ri-currency-line"></i>
                        <div className="">
                            <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
                            <p className="text-sm  -mt-1 text-gray-600">
                                Cash Cash
                            </p>
                        </div>
                    </div>
                </div>
                <button onClick={()=>{
                    props.setvehicleFound(true);
                    props.setconfirmRidePanel(false);
                    props.createRide();
                    // props.setvehiclePanelOpen(false);
                }} className="w-full empty:5 bg-green-600 text-white font-semibold p-2 rounded-l">
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default ConfirmRide;
