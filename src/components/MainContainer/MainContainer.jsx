import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { SectionLinkItem } from '../SectionLinkItem/SectionLinkItem';
import './MainContainer.css'

function MainContainer() {
    const navigate = useNavigate();
    const { channelId } = useParams();
    const selectedChannelId = Number(channelId);

    // 임시 데이터
    const response = {
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
                  "meetings": [
                    { "meeting_id": 1001, "meeting_name": "Monthly Update" },
                    { "meeting_id": 1002, "meeting_name": "Quarterly Review" },
                    { "meeting_id": 1003, "meeting_name": "Strategy Planning" }
                  ]
                },
                {
                  "category_id": 102,
                  "category_name": "General Planning",
                  "meetings": [
                    { "meeting_id": 1004, "meeting_name": "Resource Allocation" },
                    { "meeting_id": 1005, "meeting_name": "Team Coordination" }
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
                  "meetings": [
                    { "meeting_id": 2001, "meeting_name": "Sprint 1 Kickoff" },
                    { "meeting_id": 2002, "meeting_name": "Sprint 2 Review" }
                  ]
                },
                {
                  "category_id": 202,
                  "category_name": "Technical Discussions",
                  "meetings": [
                    { "meeting_id": 2003, "meeting_name": "API Design Review" },
                    { "meeting_id": 2004, "meeting_name": "Database Optimization" },
                    { "meeting_id": 2005, "meeting_name": "Code Quality Improvement" }
                  ]
                },
                {
                  "category_id": 203,
                  "category_name": "Feature Development",
                  "meetings": [
                    { "meeting_id": 2006, "meeting_name": "Feature X Review" },
                    { "meeting_id": 2007, "meeting_name": "Feature Y Implementation" }
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
                  "meetings": [
                    { "meeting_id": 3001, "meeting_name": "Wireframe Feedback" },
                    { "meeting_id": 3002, "meeting_name": "Prototype Review" }
                  ]
                },
                {
                  "category_id": 302,
                  "category_name": "Branding",
                  "meetings": [
                    { "meeting_id": 3003, "meeting_name": "Logo Redesign" },
                    { "meeting_id": 3004, "meeting_name": "Color Palette Approval" },
                    { "meeting_id": 3005, "meeting_name": "Brand Guidelines Discussion" },
                    { "meeting_id": 3006, "meeting_name": "Typography Selection" },
                    { "meeting_id": 3007, "meeting_name": "Marketing Materials Review" }
                  ]
                },
                {
                  "category_id": 303,
                  "category_name": "Final Design",
                  "meetings": [
                    { "meeting_id": 3006, "meeting_name": "Final Design Approval" }
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
                  "meetings": [
                    { "meeting_id": 4001, "meeting_name": "Interview Process Optimization" },
                    { "meeting_id": 4002, "meeting_name": "Candidate Screening Review" }
                  ]
                },
                {
                  "category_id": 402,
                  "category_name": "Employee Engagement",
                  "meetings": [
                    { "meeting_id": 4003, "meeting_name": "Monthly Feedback Session" },
                    { "meeting_id": 4004, "meeting_name": "Employee Wellness Program" }
                  ]
                },
                {
                  "category_id": 403,
                  "category_name": "HR Policies",
                  "meetings": [
                    { "meeting_id": 4005, "meeting_name": "Policy Update Review" }
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
                  "meetings": [
                    { "meeting_id": 5001, "meeting_name": "Q3 Social Media Strategy" },
                    { "meeting_id": 5002, "meeting_name": "SEO Optimization Review" },
                    { "meeting_id": 5003, "meeting_name": "Influencer Collaboration" }
                  ]
                },
                {
                  "category_id": 502,
                  "category_name": "Market Research",
                  "meetings": [
                    { "meeting_id": 5004, "meeting_name": "Customer Feedback Analysis" },
                    { "meeting_id": 5005, "meeting_name": "Competitive Analysis" }
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
                  "meetings": [
                    { "meeting_id": 6001, "meeting_name": "Q2 Sales Performance" },
                    { "meeting_id": 6002, "meeting_name": "Q3 Sales Forecast" }
                  ]
                },
                {
                    "category_id": 602,
                    "category_name": "Client Management",
                    "meetings": [
                      { "meeting_id": 6003, "meeting_name": "Client A Contract Review" },
                      { "meeting_id": 6004, "meeting_name": "Client B Follow-up" },
                      { "meeting_id": 6005, "meeting_name": "Client C Feedback Session" },
                      { "meeting_id": 6006, "meeting_name": "Client D Renewal Discussion" }
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
                  "meetings": [
                    { "meeting_id": 7001, "meeting_name": "Ticket Handling Efficiency" },
                    { "meeting_id": 7002, "meeting_name": "Customer Satisfaction Improvement" }
                  ]
                },
                {
                  "category_id": 702,
                  "category_name": "Training",
                  "meetings": [
                    { "meeting_id": 7003, "meeting_name": "Product Knowledge Training" },
                    { "meeting_id": 7004, "meeting_name": "Customer Interaction Workshop" },
                    { "meeting_id": 7005, "meeting_name": "Support Team Skill Development" }
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
                  "meetings": [
                    { "meeting_id": 8001, "meeting_name": "Infrastructure Upgrade Plan" },
                    { "meeting_id": 8002, "meeting_name": "Cloud Migration Discussion" },
                    { "meeting_id": 8003, "meeting_name": "Security Protocols Review" }
                  ]
                },
                {
                  "category_id": 802,
                  "category_name": "Codebase Management",
                  "meetings": [
                    { "meeting_id": 8004, "meeting_name": "Code Refactoring Session" },
                    { "meeting_id": 8005, "meeting_name": "Version Control Best Practices" }
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
                  "meetings": [
                    { "meeting_id": 9001, "meeting_name": "Feature A Rollout" },
                    { "meeting_id": 9002, "meeting_name": "Feature B Prototype Review" },
                    { "meeting_id": 9003, "meeting_name": "Feature C User Feedback" }
                  ]
                },
                {
                    "category_id": 902,
                    "category_name": "Product Launch",
                    "meetings": [
                      { "meeting_id": 9004, "meeting_name": "Launch Preparation" },
                      { "meeting_id": 9005, "meeting_name": "Post-Launch Analysis" },
                      { "meeting_id": 9006, "meeting_name": "Marketing Strategy Review" },
                      { "meeting_id": 9007, "meeting_name": "Customer Feedback Collection" },
                      { "meeting_id": 9008, "meeting_name": "Launch Retrospective" }
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
                  "meetings": [
                    { "meeting_id": 10001, "meeting_name": "Process Optimization Review" },
                    { "meeting_id": 10002, "meeting_name": "Quarterly Performance Evaluation" }
                  ]
                },
                {
                    "category_id": 1002,
                    "category_name": "Budgeting",
                    "meetings": [
                      { "meeting_id": 10003, "meeting_name": "Q2 Budget Planning" },
                      { "meeting_id": 10004, "meeting_name": "Cost Optimization Strategies" },
                      { "meeting_id": 10005, "meeting_name": "Expense Report Review" }
                    ]
                  }                  
              ]
            }
          ]
        }
    };
    const responseData = response.data;
    // Channel ID에 따른 데이터 필터링
    // 추후 아래 코드는 API 설계 후 수정 필요
    const filteredData = responseData.channels.filter(channel => channel.channel_id === selectedChannelId);

    const ChannelName = filteredData[0].channel_name;
    const categoriesByChannel = filteredData[0].categories;

    return (
        <main className='main-wrap'>
            <div className='title-container'>
                <div className='chanel_title'>
                    <h3>{ChannelName}</h3>
                </div>
                <div className='toolbar'>
                    <div className='add-note'></div>
                    <div className='add-category'></div>
                </div>
            </div>
            <div className='category-wrap'>
                <ul className='category'>
                    {categoriesByChannel.map(category => (
                        <li className='category-item' key={category.category_id}>
                            <SectionTitle text={category.category_name}/>
                            <ul className='meeting_note'>
                                {category.meetings.map(meeting => (
                                    <li>
                                        <SectionLinkItem 
                                            id={meeting.meeting_id}
                                            text={meeting.meeting_name}
                                            to={`/meeting/${meeting.meeting_id}`}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}

export default MainContainer
