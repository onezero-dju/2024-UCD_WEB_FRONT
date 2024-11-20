import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavRectButton } from '../NavRectButton/NavRectButton';
import { NavCirButton } from '../NavCirButton/NavCirButton';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import { HomeDataContext } from '../../hooks/HomeDataContext';
import './Sidebar.css'
import ModalFrame from '../ModalFrame/ModalFrame';
import { Button } from '../Button/Button';
import { useCookies } from 'react-cookie';
import axios from 'axios';

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

  const [requestMessage, setRequestMessage] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // 조직 가입 요청 목록 모달창
  const [cookies, setCookie] = useCookies(['token']);
  const [userAdminOrg, setUserAdminOrg] = useState([]);
  const [viewMessage, setViewMessage] = useState("");
  const [userInfo, setUserInfo] = useState({}); // 회원 정보 조회


  const navigate = useNavigate();

  useEffect(() => {
    handleUserInfo(); // 회원 정보 조회
    handleAdminOrgInfo(); // 관리자 권한이 있는 조직 리스트 요청
  }, [])

  useEffect(() => {
    userAdminOrg.forEach((org) => {
      handleRequestMessage(org.organization_id); // 조직 가입 요청 메세지 fetching
    })
  }, [userAdminOrg])

  // 회원 정보 조회
  const handleUserInfo = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/me`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          }
        })
      if (response.data.code === 200) {
        console.log(`회원 정보 조회 완료 \n ${response.data.data}`);
        setUserInfo(response.data.data);
      }
    } catch (error) {
      console.error(`회원 정보 조회 에러 \n ${error}`);
    }
  }

  // 관리자 권한이 있는 조직 정보 반환 
  const handleAdminOrgInfo = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/organizations/my`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      console.log(response);
      if (response.data.data.length > 0) {
        console.log(`소속된 조직 검색 완료 \n ${response.data.data}`)
        response.data.data.forEach((info) => {
          if (info.role === 'admin') {
            setUserAdminOrg([...userAdminOrg, info]); // 관리자인 조직 저장
          }
        })
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('이 리소스에 대한 권한이 없습니다.');
      } else {
        console.error('조직 확인 에러', error);
        alert('조직 정보를 불러오는 데 실패했습니다.');
      }
    }
  };

  // 조직 가입 요청 목록 조회
  const handleRequestMessage = async (organization_id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/organizations/${organization_id}/join-requests`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          }
        })

      if (response.data.code === 200) {
        setRequestMessage([...requestMessage, response.data.data])
      } else {
        console.log('조직 가입 요청 목록 조회 실패');
      }

    } catch (error) {
      console.error(`조직 가입 요청 목록 조회 에러 \n ${error}`);
    }
  }

  // Organization 클릭 시 실행
  const handleOrganizationClick = (id) => {
    // 조직 ID 기반 채널 리스트 선택
    const channelsByOrgId = homeData.organizations.filter(org => org.organization_id == id)[0].channels;
    setSelectedOrgId(id);
    setSelectedChannels(channelsByOrgId);
    // 해당 조직의 첫번째 채널을 선택
    const viewMessageChannelId = channelsByOrgId[0].channel_id;
    setSelectedChannelId(viewMessageChannelId);
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
            <div className='user-name'>{userInfo["email"]}</div>
            <div className='user-desc'>{userInfo["role"]}</div>
          </div>
        </div>
        {userAdminOrg.length >= 0 &&
          (<div className='user-org-message'>
            <div className='notification' onClick={() => setIsModalOpen(true)}>
              <img src='/assets/icons/add-user.png' alt='Message Icon' />
              {requestMessage > 0 && (
                <span className='badge'>{requestMessage}</span>
              )}
            </div>
          </div>
          )}
        {isModalOpen &&
          (<ModalFrame setModalOpen={setIsModalOpen}>
            <div className={'request-modal-temp'}>
              <h4 className='request-modal-title'>조직 가입 신청서 목록</h4>
              <div className='request-modal-content'>
                <div className='request-org-list'>
                  {requestMessage.length > 0 && requestMessage.map((message) => (
                    <div key={message.organization_id} className='request-message-item'>
                      <span className='request-info-org'>조직: {message.username}</span>
                      <span className='request-info-user'>유저: {message.username}</span>
                      <button
                        onClick={() => setViewMessage(message.message)}>
                        보기
                      </button>
                    </div>
                  ))}
                </div>
                <div className='request-message-results'>
                  <div className='request-message-view'>
                    {viewMessage}
                  </div>
                  <div className='request-button-wrapper'>
                    <button className='request-message-button'>수락</button>
                    <button className='request-message-button'>거절</button>
                  </div>
                </div>
              </div>
            </div>
          </ModalFrame>
          )}
      </div>
    </div>
  )
}

export default Sidebar
