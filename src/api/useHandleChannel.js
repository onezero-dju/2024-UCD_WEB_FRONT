import axios from 'axios';
import {useCookies} from "react-cookie";
import { useState } from "react";

export const useGenChannel = () => {
    const [cookies] = useCookies('token');
    const [responseData, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const config = {
        withCredentials: true, 
        headers: {
            'Authorization': `Bearer ${cookies.token}`,
            'Content-Type': 'application/json',
        },
    };

    const fetchGenChannel = async (organization_id, data) => {
        try {
            setLoading(true); 
            setError(null);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/organizations/${organization_id}/channels`, data, config);

            if (response.status === 201) {
                console.log("Channel created successfully:", response.data);
                setResponse(response.data);
            } 
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
  
    return { responseData, loading, error,  fetchGenChannel};
  
};
