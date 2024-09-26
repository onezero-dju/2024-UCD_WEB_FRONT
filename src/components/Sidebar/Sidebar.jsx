import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavRectButton } from '../NavRectButton/NavRectButton';
import { NavCirButton } from '../NavCirButton/NavCirButton';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import { HomeDataContext } from '../../hooks/HomeDataContext';
import './Sidebar.css'

function Sidebar() {

  const {
    homeData,
    myName,
    myRole,
    selectedOrgId,
    selectedChannelId,
    selectedOrgs,
    selectedChannels,
    setSelectedOrgId,
    setSelectedChannelId,
    setSelectedOrgs,
    setSelectedChannels,
  } = useContext(HomeDataContext); 
  
  console.log(`homedata: ${homeData}`);

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
        navigate('/main')
    }

    // Channel 클릭 시 실행
    const handleChannelClick = (e, id) => {
        // 이벤트 버블링 중단
        e.stopPropagation(); 
        setSelectedChannelId(id);
        navigate('/main')
    }

    return (
        <div className='side'>
        <nav className='snb'>
            <div className='team'>
                <ul className='team-list'>
                    {selectedOrgs && selectedOrgs.map(org => (
                        <li key={org.organization_id}>
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
                                    <li key={channel.channel_id}>
                                        <NavRectButton 
                                            dataId={channel.channel_id}
                                            selectedId={selectedChannelId}
                                            label={channel.name}
                                            onClick={(e) => handleChannelClick(e, channel.channel_id)}
                                        />
                                    </li>
                                    ))}
                                    <li key={0}>
                                        <NavRectButton 
                                            dataId={0}
                                            label='+'
                                            onClick={(e) => console.log('Add Channel')}
                                        />
                                    </li>
                                </ul>
                                </div>
                            )}
                        </li>
                    ))}
                    <NavCirButton 
                        dataId={0}
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
