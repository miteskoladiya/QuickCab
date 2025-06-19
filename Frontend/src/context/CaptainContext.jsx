import { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const values = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError
    };

    return (
        <CaptainDataContext.Provider value={values}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;