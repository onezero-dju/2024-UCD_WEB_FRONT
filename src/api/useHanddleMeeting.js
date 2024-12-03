import axios from 'axios';
import {useCookies} from "react-cookie";
import { useState } from "react";

// 임시 데이터
const temp_response = {
    "data":[
        {
        "category_id": 201,
        "category_name": "Sprint Planning",
        "meetingDTOList": [
            { "meetingId": 2001, "meetingTitle": "Sprint 1 Kickoff" },
            { "meetingId": 2002, "meetingTitle": "Sprint 2 Review" }
        ]
        },
        {
        "category_id": 202,
        "category_name": "Technical Discussions",
        "meetingDTOList": [
            { "meetingId": 2003, "meetingTitle": "API Design Review" },
            { "meetingId": 2004, "meetingTitle": "Database Optimization" },
            { "meetingId": 2005, "meetingTitle": "Code Quality Improvement" }
        ]
        },
        {
        "category_id": 203,
        "category_name": "Feature Development",
        "meetingDTOList": [
            { "meetingId": 2006, "meetingTitle": "Feature X Review" },
            { "meetingId": 2007, "meetingTitle": "Feature Y Implementation" }
        ]
        }
    ]
};

// 회의 생성
export const useGenMeeting = () => {
    const [cookies] = useCookies('token');
    const [responseData, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const config = {
        headers: {
            'Authorization': `Bearer ${cookies.token}`,
            'Content-Type': 'application/json',
        },
    };

    const fetchGenMeeting = async (data) => {
        try {
            setLoading(true); 
            setError(null);
            const response = await axios.post(`${process.env.REACT_APP_MEETING_API_URL}/api/meetings/create`, data, config);
            console.log(response);
            if (response.status === 201) {
                console.log("Meeting generated successfully:", response.data);
                setResponse(response.data);
            } 
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
  
    return { responseData, loading, error, fetchGenMeeting};
  
};

export const useGetMeetingList = () => {
    const [cookies] = useCookies('token');
    const [responseData, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGetMeetingList = async (channel_id) => {
        try {
            setLoading(true); 
            setError(null);
            const response = await axios.get(`${process.env.REACT_APP_MEETING_API_URL}/api/meetings/by_channel/${channel_id}`,{
                headers: {
                    'Authorization': `Bearer ${cookies.token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);
            if (response.status === 200) {
                console.log("Category list got successfully:", response.data);
                setResponse(response.data);
            } 
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log('403 error occurred');
                setResponse(temp_response);
            } else {
                setError(error);
            }
        } finally {
            setLoading(false);
        }
    };
  
    return { responseData, loading, error, fetchGetMeetingList};
  
};
