import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavRectButton } from '../NavRectButton/NavRectButton';
import { NavCirButton } from '../NavCirButton/NavCirButton';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import { HomeDataContext } from '../../hooks/HomeDataContext';
import './Sidebar.css'
import ModalFrame from '../ModalFrame/ModalFrame';
import { Button } from '../Button/Button';

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
  } = useContext(HomeDataContext); // Context 사용

  const [requestMessage, setRequestMessage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

  }, [])


  // Organization 클릭 시 실행
  const handleOrganizationClick = (id) => {
    // 조직 ID 기반 채널 리스트 선택
    const channelsByOrgId = homeData.organizations.filter(org => org.organization_id == id)[0].channels;
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

  // const handleRequest
  // /api/organizations/{organization_id}/join-requests

  return (
    <div className='side'>
      <nav className='snb'>
        <div className='team'>
          <ul className='team-list'>
            {selectedOrgs.map(org => (
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
          <ProfileImage name={myName} size='medium' />
          <div>
            <div className='user-name'>{myName}</div>
            <div className='user-desc'>{myRole}</div>
          </div>
        </div>
        <div className='user-org-message'>
          <div className='notification' onClick={setIsModalOpen(true)}>
            <img src='/assets/icons/add-user.png' alt='Message Icon' />
            {requestMessage > 0 && (
              <span className='badge'>{requestMessage}</span>
            )}
          </div>
          {isModalOpen &&
            (<ModalFrame setModalOpen={setIsModalOpen}>
              <div className={'modal-temp'}>
                <h4 className='modal-title'>조직 가입 요청</h4>
                <div className='modal-content'>
                  { }

                  <div className='search-org-results'>
                    {searchResults.map((org) => (
                      <div key={org.organization_id} className='organization-item'>
                        <span>{org.organization_name}</span>
                        <Button
                          label='가입 신청'
                          onClick={() => handleJoinOrganization(org.organization_id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ModalFrame>
            )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
