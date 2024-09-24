import React from 'react'
import { useParams } from 'react-router-dom';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import './MeetingContainer.css'

function MeetingContainer() {
    const { meetingId } = useParams();

    // 임시 데이터
    const responseData = [
        { meetingId: 1001, meetingName: "Monthly Update" },
        { meetingId: 1002, meetingName: "Quarterly Review" },
        { meetingId: 1003, meetingName: "Strategy Planning" },
        { meetingId: 1004, meetingName: "Resource Allocation" },
        { meetingId: 1005, meetingName: "Team Coordination" },
        { meetingId: 2001, meetingName: "Sprint 1 Kickoff" },
        { meetingId: 2002, meetingName: "Sprint 2 Review" },
        { meetingId: 2003, meetingName: "API Design Review" },
        { meetingId: 2004, meetingName: "Database Optimization" },
        { meetingId: 2005, meetingName: "Code Quality Improvement" },
        { meetingId: 2006, meetingName: "Feature X Review" },
        { meetingId: 2007, meetingName: "Feature Y Implementation" },
        { meetingId: 3001, meetingName: "Wireframe Feedback" },
        { meetingId: 3002, meetingName: "Prototype Review" },
        { meetingId: 3003, meetingName: "Logo Redesign" },
        { meetingId: 3004, meetingName: "Color Palette Approval" },
        { meetingId: 3005, meetingName: "Brand Guidelines Discussion" },
        { meetingId: 3006, meetingName: "Typography Selection" },
        { meetingId: 3007, meetingName: "Marketing Materials Review" },
        { meetingId: 3006, meetingName: "Final Design Approval" },
        { meetingId: 4001, meetingName: "Interview Process Optimization" },
        { meetingId: 4002, meetingName: "Candidate Screening Review" },
        { meetingId: 4003, meetingName: "Monthly Feedback Session" },
        { meetingId: 4004, meetingName: "Employee Wellness Program" },
        { meetingId: 4005, meetingName: "Policy Update Review" },
        { meetingId: 5001, meetingName: "Q3 Social Media Strategy" },
        { meetingId: 5002, meetingName: "SEO Optimization Review" },
        { meetingId: 5003, meetingName: "Influencer Collaboration" },
        { meetingId: 5004, meetingName: "Customer Feedback Analysis" },
        { meetingId: 5005, meetingName: "Competitive Analysis" },
        { meetingId: 6001, meetingName: "Q2 Sales Performance" },
        { meetingId: 6002, meetingName: "Q3 Sales Forecast" },
        { meetingId: 6003, meetingName: "Client A Contract Review" },
        { meetingId: 6004, meetingName: "Client B Follow-up" },
        { meetingId: 6005, meetingName: "Client C Feedback Session" },
        { meetingId: 6006, meetingName: "Client D Renewal Discussion" },
        { meetingId: 7001, meetingName: "Ticket Handling Efficiency" },
        { meetingId: 7002, meetingName: "Customer Satisfaction Improvement" },
        { meetingId: 7003, meetingName: "Product Knowledge Training" },
        { meetingId: 7004, meetingName: "Customer Interaction Workshop" },
        { meetingId: 7005, meetingName: "Support Team Skill Development" },
        { meetingId: 8001, meetingName: "Infrastructure Upgrade Plan" },
        { meetingId: 8002, meetingName: "Cloud Migration Discussion" },
        { meetingId: 8003, meetingName: "Security Protocols Review" },
        { meetingId: 8004, meetingName: "Code Refactoring Session" },
        { meetingId: 8005, meetingName: "Version Control Best Practices" },
        { meetingId: 9001, meetingName: "Feature A Rollout" },
        { meetingId: 9002, meetingName: "Feature B Prototype Review" },
        { meetingId: 9003, meetingName: "Feature C User Feedback" },
        { meetingId: 9004, meetingName: "Launch Preparation" },
        { meetingId: 9005, meetingName: "Post-Launch Analysis" },
        { meetingId: 9006, meetingName: "Marketing Strategy Review" },
        { meetingId: 9007, meetingName: "Customer Feedback Collection" },
        { meetingId: 9008, meetingName: "Launch Retrospective" },
        { meetingId: 10001, meetingName: "Process Optimization Review" },
        { meetingId: 10002, meetingName: "Quarterly Performance Evaluation" },
        { meetingId: 10003, meetingName: "Q2 Budget Planning" },
        { meetingId: 10004, meetingName: "Cost Optimization Strategies" },
        { meetingId: 10005, meetingName: "Expense Report Review" }
    ];
        
    // Meeting ID에 따른 데이터 필터링
    // 추후 아래 코드는 API 설계 후 수정 필요
    const meeting = responseData.find(item => item.meetingId.toString() === meetingId);
    
    if (!meeting) {
        return <div>존재하지 않는 페이지입니다..</div>;
    }

    return (
        <section className='meeting-container'>
            <div className='meeting_title'>
                <h3>{meeting.meetingName}</h3>
                <ul className='participants'>
                <li>
                    <ProfileImage name="김지우" size='large'/>
                </li>
                <li>
                    <ProfileImage name="Emily Johnson" size='large'/> 
                </li>
                <li>
                    <ProfileImage name="이민서" size='large'/>
                </li>
                <li>
                    <ProfileImage name="Ethan Parker" size='large'/>
                </li>
                </ul>
            </div>
            <div className='realtime_space'></div>
        </section>
    )
}

export default MeetingContainer
