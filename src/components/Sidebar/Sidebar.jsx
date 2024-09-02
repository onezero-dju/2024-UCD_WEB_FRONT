import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Sidebar.css'

function Sidebar({ selectedOrganization, onOrganizationSelect, onChannelClick, selectedChannel }) {
  
  const navigate = useNavigate();

  // 임시 데이터
  const orgList = [
    { id: 1, name: 'UCD', description: "UCD is..."},
    { id: 2, name: '일영', description: "일영 is..."},
    { id: 3, name: '백엔드', description: "백엔드 is..."},
  ];

  // 임시 데이터
  const channelList = [
    { id: 1, name: '개발팀', organization_id: 1, description: "개발팀 is..."},
    { id: 2, name: '홍보팀', organization_id: 1, description: "홍보팀 is..."},
    { id: 3, name: '자유실', organization_id: 1, description: "자유실 is..."},

    { id: 4, name: '기획팀', organization_id: 2, description: "기획팀 is..."},
    { id: 5, name: 'AI', organization_id: 2, description: "AI is..."},
    { id: 6, name: '인사', organization_id: 2, description: "인사 is..."},

    { id: 8, name: '운영', organization_id: 3, description: "운영 is..."},
    { id: 7, name: 'TDD', organization_id: 3, description: "TDD is..."},
  ];

  const filteredChannels = channelList.filter(channel => channel.organization_id === selectedOrganization);
  
  // 상태는 App.jsx에서 관리
  const handleOrganizationClick = (orgId) => {
    onOrganizationSelect(orgId);
    navigate('/main');
  };

  const handleChannelClick = (channelId) => {
    onChannelClick(channelId);
    // navigate('/meeting');
  };

  return (
    <div className='side'>
      <nav className='snb'>
        <div className='team'>
            <ul className='team-list'>
              {orgList.map(org => (
                <li
                  key={org.id}
                  className={org.id === selectedOrganization ? 'selected' : ''}
                  onClick={() => handleOrganizationClick(org.id)}
                >
                  {org.name}
                  {org.id === selectedOrganization && (
                    <div className='channel'>
                      <ul className='channel-list'>
                        <h2>회의실</h2>
                        {filteredChannels.map(channel => (
                          <li
                            key={channel.id}
                            className={channel.id === selectedChannel ? 'selected' : ''}
                            onClick={() => handleChannelClick(channel.id)}
                          >
                            {channel.name}
                          </li>
                        ))}
                        <li>+</li>
                      </ul>
                    </div>
                  )}
                </li>
              ))}
              <li>+</li>
            </ul>
        </div>
      </nav>
      <div className='user-info'>
        <div>
            <div className='profile-image'>동</div>
            <div>
                <div className='user-name'>홍길동</div>
                <div className='user-desc'>일영 멤버</div>
            </div>
        </div>
        <div className='settings'>
          <img src='assets/icon/settings.png'/>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
