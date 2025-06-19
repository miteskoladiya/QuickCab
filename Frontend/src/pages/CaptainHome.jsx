import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking';

const CaptainHome = () => {
    const [ridePopupPanel, setRidePopupPanel] = useState(false)
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    const [ride, setRide] = useState(null)
    const navigate = useNavigate()

    const { socket } = useContext(SocketContext)
    // Get both captain and setCaptain from context
    const { captain, setCaptain } = useContext(CaptainDataContext)

    useEffect(() => {
        // Connect socket when component mounts
        if (captain?._id) {
            socket.emit('join', {
                userId: captain._id,
                userType: 'captain'
            });

            // Set up socket event listener
            socket.on('new-ride', (data) => {
                console.log('New ride received:', data)
                if (data && data.user) {  // Add validation
                    setRide(data)
                    setRidePopupPanel(true)
                }
            });

            // Location update logic
            const updateLocation = () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(position => {
                        socket.emit('update-location-captain', {
                            userId: captain._id,
                            location: {
                                ltd: position.coords.latitude,
                                lng: position.coords.longitude
                            }
                        });
                    });
                }
            };

            const locationInterval = setInterval(updateLocation, 10000);
            updateLocation(); // Initial update

            // Cleanup function
            return () => {
                clearInterval(locationInterval);
                socket.off('new-ride');
            };
        }
    }, [captain, socket]);

    async function confirmRide() {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                console.error('No auth token found');
                setCaptain(null);
                navigate('/captain-login');
                return;
            }

            // Ensure token has Bearer prefix
            const authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
                { rideId: ride._id },
                {
                    headers: {
                        'Authorization': authToken,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                setRidePopupPanel(false);
                setConfirmRidePopupPanel(true);
                setRide(response.data);
            }
        } catch (error) {
            console.error('Error confirming ride:', error);
            
            if (error.response?.status === 401) {
                console.log('Auth error details:', error.response.data);
                localStorage.removeItem('token');
                setCaptain(null);
                navigate('/captain-login');
                return;
            }
            
            alert('Failed to confirm ride. Please try again.');
        }
    }


    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ ridePopupPanel ])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePopupPanel ])

    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-3/5'>
                {/* <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}

<LiveTracking />
            </div>
            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>
            <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>
            <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
            </div>
        </div>
    )
}

export default CaptainHome