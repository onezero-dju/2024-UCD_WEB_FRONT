import axios from 'axios';
import {useCookies} from "react-cookie";
import { useState } from "react";

export const useGenOrg = () => {
    const [cookies] = useCookies('token');
    const [responseData, setOrgResponseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const config = {
        withCredentials: true, 
        headers: {
            'Authorization': `Bearer ${cookies.token}`,
            'Content-Type': 'application/json',
        },
    };

    const generateOrganization = async (data) => {
        try {
            setLoading(true); 
            setError(null);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/organizations`, data, config);

            if (response.status === 201) {
                setOrgResponseData(response.data);
            } 
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
  
    return { responseData, loading, error,  generateOrganization};
  
};
