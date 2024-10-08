import axios from 'axios';
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

// 임시 데이터
const temp_response = {
    "code": 200,
    "message": "success",
    "data": {
      "channels": [
        {
          "channel_id": 1,
          "channel_name": "General",
          "categories": [
            {
              "category_id": 101,
              "category_name": "Company Updates",
              "meetingDTOList": [
                { "meetingId": 1001, "meetingTitle": "Monthly Update" },
                { "meetingId": 1002, "meetingTitle": "Quarterly Review" },
                { "meetingId": 1003, "meetingTitle": "Strategy Planning" }
              ]
            },
            {
              "category_id": 102,
              "category_name": "General Planning",
              "meetingDTOList": [
                { "meetingId": 1004, "meetingTitle": "Resource Allocation" },
                { "meetingId": 1005, "meetingTitle": "Team Coordination" }
              ]
            }
          ]
        },
        {
          "channel_id": 2,
          "channel_name": "Development",
          "categories": [
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
        },
        {
          "channel_id": 3,
          "channel_name": "Design",
          "categories": [
            {
              "category_id": 301,
              "category_name": "UI/UX Reviews",
              "meetingDTOList": [
                { "meetingId": 3001, "meetingTitle": "Wireframe Feedback" },
                { "meetingId": 3002, "meetingTitle": "Prototype Review" }
              ]
            },
            {
              "category_id": 302,
              "category_name": "Branding",
              "meetingDTOList": [
                { "meetingId": 3003, "meetingTitle": "Logo Redesign" },
                { "meetingId": 3004, "meetingTitle": "Color Palette Approval" },
                { "meetingId": 3005, "meetingTitle": "Brand Guidelines Discussion" },
                { "meetingId": 3006, "meetingTitle": "Typography Selection" },
                { "meetingId": 3007, "meetingTitle": "Marketing Materials Review" }
              ]
            },
            {
              "category_id": 303,
              "category_name": "Final Design",
              "meetingDTOList": [
                { "meetingId": 3006, "meetingTitle": "Final Design Approval" }
              ]
            }
          ]
        },
        {
          "channel_id": 4,
          "channel_name": "HR",
          "categories": [
            {
              "category_id": 401,
              "category_name": "Recruitment",
              "meetingDTOList": [
                { "meetingId": 4001, "meetingTitle": "Interview Process Optimization" },
                { "meetingId": 4002, "meetingTitle": "Candidate Screening Review" }
              ]
            },
            {
              "category_id": 402,
              "category_name": "Employee Engagement",
              "meetingDTOList": [
                { "meetingId": 4003, "meetingTitle": "Monthly Feedback Session" },
                { "meetingId": 4004, "meetingTitle": "Employee Wellness Program" }
              ]
            },
            {
              "category_id": 403,
              "category_name": "HR Policies",
              "meetingDTOList": [
                { "meetingId": 4005, "meetingTitle": "Policy Update Review" }
              ]
            }
          ]
        },
        {
          "channel_id": 5,
          "channel_name": "Marketing",
          "categories": [
            {
              "category_id": 501,
              "category_name": "Campaign Planning",
              "meetingDTOList": [
                { "meetingId": 5001, "meetingTitle": "Q3 Social Media Strategy" },
                { "meetingId": 5002, "meetingTitle": "SEO Optimization Review" },
                { "meetingId": 5003, "meetingTitle": "Influencer Collaboration" }
              ]
            },
            {
              "category_id": 502,
              "category_name": "Market Research",
              "meetingDTOList": [
                { "meetingId": 5004, "meetingTitle": "Customer Feedback Analysis" },
                { "meetingId": 5005, "meetingTitle": "Competitive Analysis" }
              ]
            }
          ]
        },
        {
          "channel_id": 6,
          "channel_name": "Sales",
          "categories": [
            {
              "category_id": 601,
              "category_name": "Sales Targets",
              "meetingDTOList": [
                { "meetingId": 6001, "meetingTitle": "Q2 Sales Performance" },
                { "meetingId": 6002, "meetingTitle": "Q3 Sales Forecast" }
              ]
            },
            {
                "category_id": 602,
                "category_name": "Client Management",
                "meetingDTOList": [
                  { "meetingId": 6003, "meetingTitle": "Client A Contract Review" },
                  { "meetingId": 6004, "meetingTitle": "Client B Follow-up" },
                  { "meetingId": 6005, "meetingTitle": "Client C Feedback Session" },
                  { "meetingId": 6006, "meetingTitle": "Client D Renewal Discussion" }
                ]
              }                  
          ]
        },
        {
          "channel_id": 7,
          "channel_name": "Support",
          "categories": [
            {
              "category_id": 701,
              "category_name": "Customer Service",
              "meetingDTOList": [
                { "meetingId": 7001, "meetingTitle": "Ticket Handling Efficiency" },
                { "meetingId": 7002, "meetingTitle": "Customer Satisfaction Improvement" }
              ]
            },
            {
              "category_id": 702,
              "category_name": "Training",
              "meetingDTOList": [
                { "meetingId": 7003, "meetingTitle": "Product Knowledge Training" },
                { "meetingId": 7004, "meetingTitle": "Customer Interaction Workshop" },
                { "meetingId": 7005, "meetingTitle": "Support Team Skill Development" }
              ]
            }
          ]
        },
        {
          "channel_id": 8,
          "channel_name": "Engineering",
          "categories": [
            {
              "category_id": 801,
              "category_name": "System Architecture",
              "meetingDTOList": [
                { "meetingId": 8001, "meetingTitle": "Infrastructure Upgrade Plan" },
                { "meetingId": 8002, "meetingTitle": "Cloud Migration Discussion" },
                { "meetingId": 8003, "meetingTitle": "Security Protocols Review" }
              ]
            },
            {
              "category_id": 802,
              "category_name": "Codebase Management",
              "meetingDTOList": [
                { "meetingId": 8004, "meetingTitle": "Code Refactoring Session" },
                { "meetingId": 8005, "meetingTitle": "Version Control Best Practices" }
              ]
            }
          ]
        },
        {
          "channel_id": 9,
          "channel_name": "Product",
          "categories": [
            {
              "category_id": 901,
              "category_name": "Feature Development",
              "meetingDTOList": [
                { "meetingId": 9001, "meetingTitle": "Feature A Rollout" },
                { "meetingId": 9002, "meetingTitle": "Feature B Prototype Review" },
                { "meetingId": 9003, "meetingTitle": "Feature C User Feedback" }
              ]
            },
            {
                "category_id": 902,
                "category_name": "Product Launch",
                "meetingDTOList": [
                  { "meetingId": 9004, "meetingTitle": "Launch Preparation" },
                  { "meetingId": 9005, "meetingTitle": "Post-Launch Analysis" },
                  { "meetingId": 9006, "meetingTitle": "Marketing Strategy Review" },
                  { "meetingId": 9007, "meetingTitle": "Customer Feedback Collection" },
                  { "meetingId": 9008, "meetingTitle": "Launch Retrospective" }
                ]
              }                  
          ]
        },
        {
          "channel_id": 10,
          "channel_name": "Operations",
          "categories": [
            {
              "category_id": 1001,
              "category_name": "Operational Efficiency",
              "meetingDTOList": [
                { "meetingId": 10001, "meetingTitle": "Process Optimization Review" },
                { "meetingId": 10002, "meetingTitle": "Quarterly Performance Evaluation" }
              ]
            },
            {
                "category_id": 1002,
                "category_name": "Budgeting",
                "meetingDTOList": [
                  { "meetingId": 10003, "meetingTitle": "Q2 Budget Planning" },
                  { "meetingId": 10004, "meetingTitle": "Cost Optimization Strategies" },
                  { "meetingId": 10005, "meetingTitle": "Expense Report Review" }
                ]
              }                  
          ]
        }
      ]
    }
};

export const useGetCategories = (channel_id) => {
  const [cookies] = useCookies('token');
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const fetchGetCatagories = async () => {
      try {
          setLoading(true); 
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/channel/${channel_id}/meetings`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.token}`,
              },
            });
        if (response.code === 200) {
          setCategoryData(response.data);
        } 
      } catch (error) {
        setError(error);
        // 403 에러 시 임시데이터로 처리, 추후 수정 필요
        if (error.response && error.response.status === 403) {
            const responseData = temp_response.data;
            // channel_id에 따른 데이터 반환
            const filteredData = responseData.channels.filter(channel => channel.channel_id === channel_id);
            setCategoryData(filteredData[0]);

        } else {
          setCategoryData(false);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchGetCatagories();
    
  }, [channel_id, cookies.token]);

  return { categoryData, loading, error };
};
