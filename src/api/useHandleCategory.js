import axios from 'axios';
import {useCookies} from "react-cookie";
import { useState } from "react";

export const useGenCategory = () => {
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

    const fetchGenCategory = async (data, channel_id) => {
        try {
            setLoading(true); 
            setError(null);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/channels/${channel_id}/categories`, data, config);
            console.log(response);
            if (response.status === 201) {
                console.log("Category generated successfully:", response.data);
                setResponse(response.data);
            } 
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
  
    return { responseData, loading, error, fetchGenCategory};
  
};
