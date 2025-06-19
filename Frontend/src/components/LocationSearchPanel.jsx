import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
    }

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser')
            return
        }

        // Show loading state while getting location
        if (activeField === 'pickup') {
            setPickup('Getting current location...')
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    // Convert coordinates to address using Google Maps Geocoding API
                    const response = await fetch(
                        `${import.meta.env.VITE_BASE_URL}/maps/reverse-geocode?` + 
                        `lat=${position.coords.latitude}&lng=${position.coords.longitude}`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        }
                    )
                    const address = await response.json()
                    
                    if (activeField === 'pickup') {
                        setPickup(address)
                        setPanelOpen(false)
                    }
                } catch (error) {
                    console.error('Error getting address:', error)
                    if (activeField === 'pickup') {
                        setPickup('')
                    }
                    alert('Could not get your current location address')
                }
            },
            (error) => {
                console.error('Error getting location:', error)
                if (activeField === 'pickup') {
                    setPickup('')
                }
                alert('Could not get your current location')
            }
        )
    }

    return (
        <div>
            {activeField === 'pickup' && (
                <div 
                    onClick={getCurrentLocation}
                    className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'
                >
                    <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                        <i className="ri-gps-line"></i>
                    </h2>
                    <h4 className='font-medium'>Use current location</h4>
                </div>
            )}

            {/* Display fetched suggestions */}
            {suggestions.map((elem, idx) => (
                <div 
                    key={idx} 
                    onClick={() => handleSuggestionClick(elem)} 
                    className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'
                >
                    <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'>
                        <i className="ri-map-pin-fill"></i>
                    </h2>
                    <h4 className='font-medium'>{elem}</h4>
                </div>
            ))}
        </div>
    )
}

export default LocationSearchPanel