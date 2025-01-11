import React from "react";

const VehiclePanel = (props) => {
    return (
        <div>
            <h5
                className="p-1 text-center absolute top-0 w-[93%] z-20 "
                onClick={() => {
                    props.setVehicleTypePanelOpen(false);
                    //console.log("Vehicle panel closing...");
                }}
            >
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>

            <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
            <div onClick={()=>{
                props.setconfirmRidePanel(true);
                props.setVehicleType('car');
            }} className="mb-2 p-3 border-2 active:border-black rounded-xl flex w-full  items-center justify-between">
                <img
                    className="h-10"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1568070387/assets/b5/0a5191-836e-42bf-ad5d-6cb3100ec425/original/UberX.png"
                    alt=""
                />
                <div className="ml-2 w-1/2">
                    <h4 className="font-medium text-lg">
                        UberGo{" "}
                        <span>
                            {" "}
                            <i className="ri-user-3-fill"></i>4
                        </span>
                    </h4>
                    <h5 className="font-medium text-sm">2 mins away</h5>
                    <p className="font-normal text-xs text-gray-600">
                        Affordable, compact rides
                    </p>
                </div>
                <h2 className="text-lg font-semibold">₹{props.fare.car}</h2>
            </div>
            <div onClick={()=>{
                props.setconfirmRidePanel(true);
                props.setVehicleType('moto');
            }} className="mb-2 p-3 border-2 active:border-black rounded-xl flex w-full  items-center justify-between">
                <img
                    className="h-10"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
                    alt=""
                />
                <div className="-ml-2 w-1/2">
                    <h4 className="font-medium text-lg">
                        Moto{" "}
                        <span>
                            {" "}
                            <i className="ri-user-3-fill"></i>1
                        </span>
                    </h4>
                    <h5 className="font-medium text-sm">3 mins away</h5>
                    <p className="font-normal text-xs text-gray-600">
                        Affordable, motorcycle rides
                    </p>
                </div>
                <h2 className="text-lg font-semibold">₹{props.fare.moto}</h2>
            </div>
            <div onClick={()=>{
                props.setconfirmRidePanel(true);
                props.setVehicleType('auto');
            }} className="mb-2 p-3 border-2 active:border-black rounded-xl flex w-full  items-center justify-between">
                <img
                    className="h-10"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
                    alt=""
                />
                <div className="ml-2 w-1/2">
                    <h4 className="font-medium text-lg">
                        UberAuto{" "}
                        <span>
                            {" "}
                            <i className="ri-user-3-fill"></i>3
                        </span>
                    </h4>
                    <h5 className="font-medium text-sm">2 mins away</h5>
                    <p className="font-normal text-xs text-gray-600">
                        Affordable, motorcycle rides
                    </p>
                </div>
                <h2 className="text-lg font-semibold">₹{props.fare.auto}</h2>
            </div>
        </div>
    );
};

export default VehiclePanel;
