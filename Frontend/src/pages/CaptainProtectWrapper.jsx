import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/captain-login')
            return
        }

        const loadCaptainData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/captains/profile`, 
                    {
                        headers: {
                            Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}` 
                            // Add Bearer prefix if not present
                        }
                    }
                )
                
                if (response.status === 200) {
                    setCaptain(response.data.captain)
                    setIsLoading(false)
                }
            } catch (err) {
                console.error('Failed to load captain data:', err)
                localStorage.removeItem('token')
                navigate('/captain-login')
            }
        }

        loadCaptainData()
    }, [token, navigate, setCaptain])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        )
    }

    return <>{children}</>
}

export default CaptainProtectWrapper