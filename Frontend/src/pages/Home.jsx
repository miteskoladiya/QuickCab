import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitForDriver from "../components/WaitingForDriver";
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
  const [pickUp, setPickUp] = React.useState("");
  const [destination, setDestination] = React.useState("");

  const [panelOpen, setPanelOpen] = React.useState(false);
  const panelRef = React.useRef(null);

  const panelCloseRef = React.useRef(null);

  const vehiclePanelRef = React.useRef(null);

  const confirmRidePanelRef = React.useRef(null);
  const vehicleFoundRef = React.useRef(null);

  const waitingForDriverRef = React.useRef(null);

  const [vehiclePanelOpen, setvehiclePanelOpen] = React.useState(false);

  const [confirmRidePanel, setconfirmRidePanel] = React.useState(false);

  const [vehicleFound, setvehicleFound] = React.useState(false);

  const [waitingForDriver, setwaitingForDriver] = React.useState(false);

  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)

  const navigate = useNavigate()

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id })
  }, [user])

  socket.on('ride-confirmed', ride => {
    setvehicleFound(false)
    setwaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    console.log("ride")
    setwaitingForDriver(false)
    navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
  })

  const handlePickupChange = async (e) => {
    setPickUp(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setPickupSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching pickup suggestions:', error.response || error.message || error);
    }
    
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)
    } catch {
      console.error('Error fetching destination suggestions:', e);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
        //opacity: 1
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
        // opacity: 0
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriver]);


  async function findTrip() {
    setvehiclePanelOpen(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickUp, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setFare(response.data)
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickUp,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })


  }

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5  "
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt=""
      />

      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
        {/* <LiveTracking/> */}
      </div>

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full  ">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => {
              setPanelOpen(false);
            }}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form className='relative py-3'
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[58%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
              value={pickUp}
              onChange={handlePickupChange}
              onClick={() => {
                setPanelOpen(true);
                setActiveField('pickup')
              }}
            />
            <input
              className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={handleDestinationChange}
              onClick={() => {
                setPanelOpen(true)
                setActiveField('destination')
              }}
            />
          </form>
          <button
            onClick={findTrip}
            className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
            Find Trip
          </button>
        </div>
        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setvehiclePanelOpen={setvehiclePanelOpen}
            setPickUp={setPickUp}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      <div ref={vehiclePanelRef}
        className="fixed z-10 w-full bg-white bottom-0 translate-y-full  py-10 px-3 pt-12"
      >
        <VehiclePanel
          selectVehicle={setVehicleType} fare={fare} setvehiclePanelOpen={setvehiclePanelOpen} setconfirmRidePanel={setconfirmRidePanel} />
      </div>

      <div ref={confirmRidePanelRef}
        className="fixed z-10 w-full bg-white bottom-0 translate-y-full  py-6 px-3 pt-12"
      >
        <ConfirmRide
          createRide={createRide}
          pickUp={pickUp}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setconfirmRidePanel={setconfirmRidePanel} setvehicleFound={setvehicleFound} />
      </div>

      <div ref={vehicleFoundRef}
        className="fixed z-10 w-full bg-white bottom-0 translate-y-full  py-6 px-3 pt-12"
      >
        <LookingForDriver
          createRide={createRide}
          pickUp={pickUp}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType} setvehicleFound={setvehicleFound} />
      </div>


      <div ref={waitingForDriverRef}
        className="fixed z-10 w-full bg-white bottom-0   py-6 px-3 pt-12"
      >
        <WaitForDriver
          ride={ride}
          setvehicleFound={setvehicleFound}
          setwaitingForDriver={setwaitingForDriver}
          waitingForDriver={waitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
