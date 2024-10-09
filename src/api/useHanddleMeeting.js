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

export const useGetCategoryList = () => {
    const [cookies] = useCookies('token');
    const [responseData, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGetCategoryList = async (channel_id) => {
        try {
            setLoading(true); 
            setError(null);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/meetings/byChannel/${channel_id}`,{
            // const response = await axios.get(`${process.env.REACT_APP_MEETING_API_URL}/api/meetings/byChannel/${channel_id}`,{
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
            // 403 에러 커스텀 처리
            // 추후 수정 필요
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
  
    return { responseData, loading, error, fetchGetCategoryList};
  
};
