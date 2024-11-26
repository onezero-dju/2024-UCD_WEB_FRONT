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
import { P } from 'storybook/internal/components';

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
  const [userInfo, setUserInfo] = useState({}); // 회원 정보 조회
  const [currentMessage, setCurrentMessage] = useState({});


  const navigate = useNavigate();

  useEffect(() => {
    handleUserInfo(); // 회원 정보 조회
    handleAdminOrgInfo(); // 관리자 권한이 있는 조직 리스트 요청
  }, [])

  useEffect(() => {
    if (userAdminOrg && Array.isArray(userAdminOrg)) {
      userAdminOrg.forEach((org) => {
        handleRequestMessage(org.organization_id, org.organization_name);
      });
    }
  }, [userAdminOrg]);

  // const test = async (organization_id, requests_id) => {
  //   try {
  //     const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/organizations/${organization_id}/join-requests/${requests_id}/reject`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${cookies.token}`,
  //         }
  //       })
  //     if (response.data.code === 200) {
  //       console.log(response.data.data);
  //     }
  //   } catch (error) {
  //     console.error(`회원 정보 조회 에러 \n ${error}`);
  //   }
  // }


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
        // console.log("회원 정보 조회 완료");
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
      if (response.data.data.length > 0) {
        // admin 권한이 있는 조직만 필터링
        const adminOrg = response.data.data.map((info) => {
          let org = {};
          if (info.role === 'admin') {
            org = info;
          }
          return org
        })
        setUserAdminOrg(adminOrg)
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
  const handleRequestMessage = async (organization_id, organization_name) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/organizations/${organization_id}/join-requests`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            'Content-Type': 'application/json',
          },
        });

      if (response.data.code === 200) {
        // console.log('가입요청목록조회성공')
        // message에 조직 이름도 담아서 핸들링
        const messages = response.data.data.map((message) => {
          message["organization_name"] = organization_name;
          message["organization_id"] = organization_id;
          return message
        });
        // console.log(messages);
        setRequestMessage([...requestMessage, ...messages]);
      } else {
        console.log('조직 가입 요청 목록 조회 실패');
      }

    } catch (error) {
      console.error(`조직 가입 요청 목록 조회 에러`);
      console.error(`${error}`);
    }
  }

  // 조직 가입 요청 승인 및 거절
  const decideJoinRequest = async (organization_id, request_id, decision) => {
    try {
      // const response = await axios.post(
      //   `${process.env.REACT_APP_API_URL}/api/organizations/${organization_id}/join-requests/${request_id}/${decision}`,
      //   {
      //     withCredentials: true,
      //     headers: {
      //       Authorization: `Bearer ${cookies.token}`,
      //       'Content-Type': 'application/json',
      //     },
      //   }
      // );
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/organizations/${organization_id}/join-requests/${request_id}/${decision}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.code === 200) {
        console.log(response.data.message);
      } else {
        console.log('조직 가입 요청에 대한 처리 실패');
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Organization 클릭 시 실행
  const handleOrganizationClick = (id) => {
    // 조직 ID 기반 채널 리스트 선택
    const channelsByOrgId = homeData.organizations.filter(org => org.organization_id === id)[0].channels;
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
            // onClick={console.log('Add Organization')}
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
                  {requestMessage.length > 0 && requestMessage.map((message) => {
                    return (
                      <div key={message.request_id} className='request-message-item'>
                        <span className='request-info'>조직</span>
                        {message.organization_name}
                        <span className='request-info'>유저</span>
                        {message.username}
                        <button
                          onClick={() => setCurrentMessage(message)}>
                          보기
                        </button>
                      </div>
                    )
                  })}
                </div>
                <div className='request-message-results'>
                  <div className='request-message-view'>
                    {currentMessage.message}
                    {currentMessage.organization_id},{currentMessage.request_id}
                  </div>
                  <div className='request-button-wrapper'>
                    <button onClick={() => decideJoinRequest(currentMessage.organization_id, currentMessage.request_id, 'approve')}>수락</button>
                    <button onClick={() => decideJoinRequest(currentMessage.organization_id, currentMessage.request_id, 'reject')}>거절</button>
                    {/* <button onClick={() => test(currentMessage.organization_id, currentMessage.request_id)}>거절</button> */}
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
