// import React, { useState, useEffect } from 'react'
// import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

// const containerStyle = {
//     width: '100%',
//     height: '100%',
// };

// const center = {
//     lat: -3.745,
//     lng: -38.523
// };

// const LiveTracking = () => {
//     const [currentPosition, setCurrentPosition] = useState(center);

//     useEffect(() => {
//         // Initial position
//         const getPosition = () => {
//             navigator.geolocation.getCurrentPosition((position) => {
//                 const { latitude, longitude } = position.coords;
//                 setCurrentPosition({
//                     lat: latitude,
//                     lng: longitude
//                 });
//             });
//         };

//         getPosition(); // Initial position update

//         // Watch position updates
//         const watchId = navigator.geolocation.watchPosition((position) => {
//             const { latitude, longitude } = position.coords;
//             setCurrentPosition({
//                 lat: latitude,
//                 lng: longitude
//             });
//         });

//         return () => {
//             // Cleanup the watchPosition on component unmount
//             navigator.geolocation.clearWatch(watchId);
//         };
//     }, []);

//     return (
//         <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
//             <GoogleMap
//                 mapContainerStyle={containerStyle}
//                 center={currentPosition}
//                 zoom={15}
//             >
//                 <Marker position={currentPosition} />
//             </GoogleMap>
//         </LoadScript>
//     )
// }

// export default LiveTracking;

import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const LiveTracking = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const mapRef = useRef(null); // Reference to the map

    useEffect(() => {
        // Check if Geolocation API is available
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by this browser.");
            return;
        }

        // Success callback for geolocation
        const success = (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lng: longitude });

            // Set view to the current location on the map
            if (mapRef.current) {
                mapRef.current.setView([latitude, longitude], 13); // Zoom level of 13
            }
        };

        // Error callback for geolocation
        const error = (err) => {
            setError("Unable to retrieve location.");
        };

        // Watch position to get continuous updates
        const watchId = navigator.geolocation.watchPosition(success, error, {
            enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 5000,
        });

        // Cleanup on component unmount
        return () => {
            navigator.geolocation.clearWatch(watchId);
        };
    }, []);

    return (
        <div>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {location ? (
                <MapContainer
                    center={[location.lat, location.lng]}
                    zoom={13}
                    scrollWheelZoom={false}
                    style={{ height: "500px", width: "100%" }}
                    ref={mapRef}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                    />
                    <Marker position={[location.lat, location.lng]}>
                        <Popup>Your current location</Popup>
                    </Marker>
                </MapContainer>
            ) : (
                <p>Loading map...</p>
            )}
        </div>
    );
};

export default LiveTracking;

//maptiler api
// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// const LiveTracking = () => {
//     const [currentPosition, setCurrentPosition] = useState([51.505, -0.09]); // Default to London coordinates
//     const [loading, setLoading] = useState(true); // Optional loading state while fetching position

//     useEffect(() => {
//         // Get the initial position
//         navigator.geolocation.getCurrentPosition(
//             (position) => {
//                 const { latitude, longitude } = position.coords;
//                 setCurrentPosition([latitude, longitude]);
//                 setLoading(false); // Once position is fetched, stop loading
//             },
//             (error) => {
//                 console.error("Error fetching position: ", error);
//                 setLoading(false);
//             }
//         );

//         // Watch for position changes and update state dynamically
//         const watchId = navigator.geolocation.watchPosition((position) => {
//             const { latitude, longitude } = position.coords;
//             setCurrentPosition([latitude, longitude]);
//         });

//         // Cleanup the watch when the component unmounts
//         return () => {
//             navigator.geolocation.clearWatch(watchId);
//         };
//     }, []);

//     if (loading) {
//         return <div>Loading...</div>; // Show loading state until position is fetched
//     }

//     return (
//         <MapContainer
//             center={currentPosition}
//             zoom={15}
//             style={{ height: "calc(100vh - 150px)", width: "100%" }} // Adjust map size dynamically
//         >
//             <TileLayer
//                 url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`}
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             />
//             <Marker position={currentPosition}>
//                 <Popup>
//                     Current Position: {currentPosition[0]}, {currentPosition[1]}
//                 </Popup>
//             </Marker>
//         </MapContainer>
//     );
// };

// export default LiveTracking;
