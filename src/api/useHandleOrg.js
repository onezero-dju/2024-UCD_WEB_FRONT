import axios from 'axios';
import {useCookies} from "react-cookie";
import { useState, useEffect } from "react";

export const useGenOrg = () => {
    const [cookies] = useCookies('token');
    const [genOrgResponse, setOrgResponseData] = useState(null);
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
            console.log("Organization created successfully:", response.data);
            setOrgResponseData(response.data);
            console.log(genOrgResponse);
        } 
    } catch (error) {
        setError(error);
    } finally {
        console.log(genOrgResponse);
        setLoading(false);
    }
    };
    console.log(genOrgResponse);
  
    return { genOrgResponse, loading, error,  generateOrganization};
  
};
