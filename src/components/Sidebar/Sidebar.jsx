import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavRectButton } from '../NavRectButton/NavRectButton';
import { NavCirButton } from '../NavCirButton/NavCirButton';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import { HomeDataContext } from '../../hooks/HomeDataContext';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useGenOrg } from '../../api/useHandleOrg';
import { useGenChannel } from '../../api/useHandleChannel';
import './Sidebar.css'
import ModalFrame from '../ModalFrame/ModalFrame';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { P } from 'storybook/internal/components';

function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddChannelModalOpen, setAddChannelModalOpen] = useState(false);
  const [isAddOrgModalOpen, setAddOrgModalOpen] = useState(false);
  const [isGenOrgSectionOpen, setGenOrgSectionOpen] = useState(false);
  const [genOrgName, setGenOrgName] = useState('');
  const [genOrgDisc, setGenOrgDisc] = useState('');
  const [genChannelName, setGenChannelName] = useState('');
  const [genChannelDisc, setGenChannelDisc] = useState('');
  const [joinOrgID, setJoinOrgID] = useState('');
  const [joinOrgMsg, setJoinOrgMsg] = useState('');
  const [requestMessage, setRequestMessage] = useState([]);
  const [cookies, setCookie] = useCookies(['token']);
  const [userAdminOrg, setUserAdminOrg] = useState([]);
  const [userInfo, setUserInfo] = useState({}); // 회원 정보 조회
  const [currentMessage, setCurrentMessage] = useState({});

  const { responseData: genOrgResponse, loading: genOrgLoading, error: genOrgError, generateOrganization } = useGenOrg();
  const { responseData: genChannelResponse, loading: genChannelLoading, error: genChannelError, fetchGenChannel } = useGenChannel();

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
    setSelectedChannelName,
    setSelectedOrgs,
    setSelectedChannels,
  } = useContext(HomeDataContext);

  const navigate = useNavigate();
  
  useEffect(() => {
    handleUserInfo(); // 회원 정보 조회
    handleAdminOrgInfo(); // 관리자 권한이 있는 조직 리스트 요청
  }, [])

  useEffect(() => {
    console.log(userAdminOrg[0])
    if (userAdminOrg.length > 0 && Array.isArray(userAdminOrg)) {
      userAdminOrg.forEach((org) => {
        handleRequestMessage(org.organization_id, org.organization_name);
      });
    }
  }, [userAdminOrg]);

  useEffect(() => {
    if (selectedChannels.length > 0) {
      // 해당 조직의 첫번째 채널을 선택
      const channelsByOrgId = homeData.organizations.filter(org => org.organization_id == selectedOrgId)[0].channels;
      const firstChannelId = channelsByOrgId[0].channel_id;
      const firstChannelName = channelsByOrgId[0].name;
      setSelectedChannelId(firstChannelId);
      setSelectedChannelName(firstChannelName);
    }
  }, [selectedOrgId]);

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
    // Channel 클릭 시 실행
    const handleChannelClick = (e, id, name) => {
      // 이벤트 버블링 중단
      e.stopPropagation();
      setSelectedChannelId(id);
      setSelectedChannelName(name);
      navigate('/main')
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
        const adminOrg = response.data.data.filter((info) => info.role === 'admin')

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
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/organizations/${organization_id}/join-requests/${request_id}/${decision}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.code === 200) {
        console.log(response.data.message);

        setCurrentMessage({});
        const deletedMessage = requestMessage.filter((message) => message.request_id !== request_id);
        setRequestMessage(deletedMessage);
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
    navigate('/main')
  }

  // Channel 클릭 시 실행
  const handleChannelClick = (e, id, name) => {
      // 이벤트 버블링 중단
      e.stopPropagation();
      setSelectedChannelId(id);
      setSelectedChannelName(name);
      navigate('/main')
  }

  // 조직 생성
  const HanddleGenOrg = async () => {
    // 유효성 검사
    if(!genOrgName) {alert('조직 이름을 입력해주세요'); return}
    else if(!genOrgDisc) {alert('조직 설명을 작성해주세요'); return}
    
    // 조직 생성
    console.log(`조직명: ${genOrgName}`)
    console.log(`조직 설명: ${genOrgDisc}`)
    const data = {
        "organization_name": genOrgName,
        "description": genOrgDisc
    };        
    await generateOrganization(data);
  }

  // genOrgResponse를 수신한 후 실행
  useEffect(() => {
      console.log(`genOrgLoading: ${genOrgLoading}`);
      console.log(`genOrgError: ${genOrgError}`);
      console.log(`genOrgResponse: ${genOrgResponse}`);
      
      if (!genOrgLoading && genOrgResponse) {
          console.log("genOrgResponse:", genOrgResponse);
          alert(`\'${genOrgResponse.data.organization_name}\' 조직을 생성하였습니다.`);
          setAddOrgModalOpen(false);
          window.location.reload();
      } else if (!genOrgLoading && genOrgError) {
          console.error("Error:", genOrgError);
          alert('다시 시도해주세요.');
      }
    }, [genOrgResponse, genOrgLoading, genOrgError]);

  // 사용자가 가입한 조직이 있는지 확인
  const checkOrgLength = () => {
      if(selectedOrgs || selectedOrgs.length === 0) {
          alert('가입된 조직이 없습니다.\n조직에 가입 요청을 보내거나 조직을 생성해주세요.');
          setAddOrgModalOpen(true);
      }
  }

  // 채널 생성
  const handdleGenChannel = async () => {
      // 유효성 검사
      if(!genChannelName) {alert('회의실 이름을 입력해주세요'); return}
      else if(!genChannelDisc) {alert('회의실 설명을 작성해주세요'); return}
      
      // 채널 생성
      console.log(`채널명: ${genChannelName}`)
      console.log(`채널 설명: ${genChannelDisc}`)
      const data = {
          "name": genChannelName,
          "description": genChannelDisc
      }
      await fetchGenChannel(selectedOrgId, data);
  };

  // genChannelResponse 수신한 후 실행
  useEffect(() => {
      console.log(`genChannelLoading: ${genChannelLoading}`);
      console.log(`genChannelError: ${genChannelError}`);
      console.log(`genChannelResponse: ${genChannelResponse}`);
      
      if (!genChannelLoading && genChannelResponse) {
          console.log("genChannelResponse:", genChannelResponse);
          alert(`\'${genChannelResponse.data.name}\' 채널을 생성하였습니다.`);
          setIsModalOpen(false);
          window.location.reload();
      } else if (!genChannelLoading && genChannelError) {
          console.error("Error:", genChannelError);
          alert('다시 시도해주세요.');
      }
  }, [genChannelResponse, genChannelLoading, genChannelError]);

  // 조직 가입 요청
  const RequestJoinOrg = () => {
      // 유효성 검사
      if(!joinOrgID) {alert('가입 요청을 보낼 조직의 아이디를 입력해주세요')}
      else if(!joinOrgMsg) {setJoinOrgMsg('조직에 가입하고 싶어요.')}
      else {
          console.log(`Request to ${joinOrgID}`);
          alert(`${joinOrgID}에 가입 요청을 보냈습니다.`)
          // 창 닫기            
          setAddOrgModalOpen(false)
      }
  }

  const handleGenOrgSection = () => {
      if (isGenOrgSectionOpen) {
          setGenOrgSectionOpen(false);
      } else {
          setGenOrgSectionOpen(true)
      }
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
                            onClick={(e) => handleChannelClick(e, channel.channel_id, channel.name)}
                            />
                        </li>
                      ))}
                      <li key={0}>
                        <NavRectButton
                          dataId={0}
                          label='+'
                          onClick={(e) => {setAddChannelModalOpen(true)}}
                          />
                          {isAddChannelModalOpen && (<ModalFrame setModalOpen={setAddChannelModalOpen}>
                              <div className='modal-temp'>
                                  <h4 className='modal-title'>회의실 생성</h4>
                                  <Input 
                                      type='text' id='gen-channel-name' label='회의실 이름'
                                      onChange={(e) => setGenChannelName(e.target.value)}
                                      required
                                  />
                                  <Input 
                                      type='text' id='gen-channel-disc' label='회의실 설명'
                                      onChange={(e) => setGenChannelDisc(e.target.value)}
                                      required
                                  />
                                  <Button 
                                      type='submit' label='생성하기' size='full' primary
                                      onClick={() => handdleGenChannel()}
                                  />
                              </div>
                          </ModalFrame>
                          )}
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            ))}
            <li>
              <NavCirButton 
                  dataId={0}
                  label='+'
                  onClick={() => setAddOrgModalOpen(true)}
              />
              {isAddOrgModalOpen && (<ModalFrame setModalOpen={setAddOrgModalOpen}>
                  <div className={'modal-temp'}>
                      <div className={`modal-slider ${isGenOrgSectionOpen ? 'slide-bottom' : 'slide-top'}`}>
                          <h4 className='modal-title'>조직 참가하기</h4>
                          <div className='modal-content'>
                              <Input 
                                  type='text' id='join-org-id' label='조직 아이디 입력'
                                  onChange={(e) => setJoinOrgID(e.target.value)}
                                  required
                              />
                              <Input 
                                  type='text' id='join-org-msg' label='요청 메시지'
                                  onChange={(e) => setJoinOrgMsg(e.target.value)}
                                  required
                              />
                              <Button 
                                  type='submit' label='가입 요청' size='full' primary
                                  onClick={() => RequestJoinOrg()}
                              />
                          </div>
                          <div className="separator">
                              {/* <div className="line"></div> */}
                              <span className='view-gen-org-section' onClick={()=>handleGenOrgSection()}>{isGenOrgSectionOpen ? '가입 요청하기':'또는 직접 생성하기'}</span>
                              {/* <div className="line"></div> */}
                          </div>
                          <h4 className='modal-title'>조직 생성</h4>
                          <div className='modal-content'>
                              <Input 
                                  type='text' id='gen-org-name' label='조직 이름'
                                  onChange={(e) => setGenOrgName(e.target.value)}
                                  required
                              />
                              <Input 
                                  type='text' id='gen-org-disc' label='조직 설명'
                                  onChange={(e) => setGenOrgDisc(e.target.value)}
                                  required
                              />
                              <Button 
                                  type='submit' label='조직 생성' size='full' primary
                                  onClick={() => HanddleGenOrg()}
                              />
                          </div>
                      </div>
                  </div>
              </ModalFrame>
              )}
            </li>   
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

export default Sidebar;
