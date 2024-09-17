import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavRectButton } from '../NavRectButton/NavRectButton';
import { NavCirButton } from '../NavCirButton/NavCirButton';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import './Sidebar.css'

function Sidebar() {

    // get home data 함수 필요
    // 임시 데이터
    const response = {
        "code": 200,
        "message": "success",
        "data": {
          "user": {
            "user_id": 1,
            "user_name": "John Doe",
            "email": "johndoe@example.com",
            "role": "user",
            "created_at": "2024-08-26T18:56:04Z"
          },
          "organizations": [
            {
              "organization_id": 123,
              "organization_name": "One",
              "description": "This is the first organization.",
              "channels": [
                {
                  "channel_id": 1,
                  "name": "General",
                  "description": "This is the general channel",
                  "created_at": "2024-08-26T12:00:00Z"
                },
                {
                  "channel_id": 2,
                  "name": "Development",
                  "description": "This is the development channel",
                  "created_at": "2024-08-26T12:30:00Z"
                },
                {
                  "channel_id": 3,
                  "name": "Design",
                  "description": "This is the design channel",
                  "created_at": "2024-08-26T13:00:00Z"
                },
                {
                  "channel_id": 4,
                  "name": "HR",
                  "description": "This is the HR channel",
                  "created_at": "2024-08-26T14:00:00Z"
                }
              ]
            },
            {
              "organization_id": 124,
              "organization_name": "Two",
              "description": "This is the second organization.",
              "channels": [
                {
                  "channel_id": 5,
                  "name": "Marketing",
                  "description": "This is the marketing channel",
                  "created_at": "2024-08-26T13:00:00Z"
                },
                {
                  "channel_id": 6,
                  "name": "Sales",
                  "description": "This is the sales channel",
                  "created_at": "2024-08-26T13:30:00Z"
                },
                {
                  "channel_id": 7,
                  "name": "Support",
                  "description": "This is the support channel",
                  "created_at": "2024-08-26T14:00:00Z"
                }
              ]
            },
            {
              "organization_id": 125,
              "organization_name": "Three",
              "description": "This is the third organization.",
              "channels": [
                {
                  "channel_id": 8,
                  "name": "Engineering",
                  "description": "This is the engineering channel",
                  "created_at": "2024-08-26T12:00:00Z"
                },
                {
                  "channel_id": 9,
                  "name": "Product",
                  "description": "This is the product channel",
                  "created_at": "2024-08-26T12:30:00Z"
                },
                {
                  "channel_id": 10,
                  "name": "Operations",
                  "description": "This is the operations channel",
                  "created_at": "2024-08-26T13:00:00Z"
                }
              ]
            }
          ]
        }
    };

    const homeData = response.data;
    const myName = homeData.user.user_name;
    const myRole = homeData.user.role;

    const [selectedOrgId, setSelectedOrgId] = useState(homeData.organizations[0].organization_id);
    const [selectedChannelId, setSelectedChannelId] = useState(homeData.organizations[0].channels[0].channel_id);
    const [selectedOrgs, setSelectedOrgs] = useState(homeData.organizations);
    const [selectedChannels, setSelectedChannels] = useState(homeData.organizations[0].channels);

    const navigate = useNavigate();

    // Organization 클릭 시 실행
    const handleOrganizationClick = (id) => {
        // 조직 ID 기반 채널 리스트 선택
        const channelsByOrgId = homeData.organizations.filter(org => org.organization_id==id)[0].channels;
        setSelectedOrgId(id);
        setSelectedChannels(channelsByOrgId);
        // 해당 조직의 첫번째 채널을 선택
        const firstChannelId = channelsByOrgId[0].channel_id;
        setSelectedChannelId(firstChannelId);
        navigate(`/main/${id}/${firstChannelId}`)
    }

    // Channel 클릭 시 실행
    const handleChannelClick = (e, id) => {
        e.stopPropagation(); // 이벤트 버블링 중단
        setSelectedChannelId(id);
        navigate(`/main/${selectedOrgId}/${id}`)
    }

    return (
        <div className='side'>
        <nav className='snb'>
            <div className='team'>
                <ul className='team-list'>
                    {selectedOrgs.map(org => (
                        <li>
                            <NavCirButton 
                                dataId={org.organization_id}
                                selectedId={selectedOrgId}
                                label={org.organization_name}
                                onClick={() => handleOrganizationClick(org.organization_id)}
                            />
                            {org.organization_id === selectedOrgId && (
                                <div className='channel'>
                                <ul className='channel-list'>
                                    <h2>회의실</h2>
                                    {selectedChannels.map(channel => (
                                    <li>
                                        <NavRectButton 
                                            dataId={channel.channel_id}
                                            selectedId={selectedChannelId}
                                            label={channel.name}
                                            onClick={(e) => handleChannelClick(e, channel.channel_id)}
                                        />
                                    </li>
                                    ))}
                                    <li>
                                        <NavRectButton 
                                            dataId='-1'
                                            label='+'
                                            onClick={console.log('Add Channel')}
                                        />
                                    </li>
                                </ul>
                                </div>
                            )}
                        </li>
                    ))}
                    <NavCirButton 
                        dataId='-1'
                        label='+'
                        onClick={console.log('Add Organization')}
                    />
                </ul>
            </div>
        </nav>
        <div className='user-info'>
            <div>
                <ProfileImage name={myName} size='medium'/>
                <div>
                    <div className='user-name'>{myName}</div>
                    <div className='user-desc'>{myRole}</div>
                </div>
            </div>
            <div className='settings'>
            <img src='/assets/icons/settings.png'/>
            </div>
        </div>
        </div>
    )
}

export default Sidebar
