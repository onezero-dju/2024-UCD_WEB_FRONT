import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavRectButton } from '../NavRectButton/NavRectButton';
import { NavCirButton } from '../NavCirButton/NavCirButton';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import { HomeDataContext } from '../../hooks/HomeDataContext';
import ProfileModal from '../ModalFrame/ModalFrame';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useGenOrg } from '../../api/useHandleOrg';
import { useGenChannel } from '../../api/useHandleChannel';
import './Sidebar.css'

function Sidebar() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAddOrgModalOpen, setAddOrgModalOpen] = useState(false);
  const [isGenOrgSectionOpen, setGenOrgSectionOpen] = useState(false);
  const [genOrgName, setGenOrgName] = useState('');
  const [genOrgDisc, setGenOrgDisc] = useState('');
  const [genChannelName, setGenChannelName] = useState('');
  const [genChannelDisc, setGenChannelDisc] = useState('');
  const [joinOrgID, setJoinOrgID] = useState('');
  const [joinOrgMsg, setJoinOrgMsg] = useState('');
  
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

    // Organization 클릭 시 실행
    const handleOrganizationClick = (id) => {
        // 조직 ID 기반 채널 리스트 선택
        const channelsByOrgId = homeData.organizations.filter(org => org.organization_id==id)[0].channels;
        setSelectedOrgId(id);
        setSelectedChannels(channelsByOrgId);

        navigate('/main')
    }

    useEffect(()=>{
        if(selectedChannels.length > 0) {
            // 해당 조직의 첫번째 채널을 선택
            const channelsByOrgId = homeData.organizations.filter(org => org.organization_id==selectedOrgId)[0].channels;
            const firstChannelId = channelsByOrgId[0].channel_id;
            const firstChannelName = channelsByOrgId[0].name;
            setSelectedChannelId(firstChannelId);
            setSelectedChannelName(firstChannelName);
        }
    },[selectedOrgId])

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
            setModalOpen(false);
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
                                            onClick={(e) => setModalOpen(true)}
                                        />
                                        {isModalOpen && (<ProfileModal setModalOpen={setModalOpen}>
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
                                        </ProfileModal>
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
                        {isAddOrgModalOpen && (<ProfileModal setModalOpen={setAddOrgModalOpen}>
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
                        </ProfileModal>
                        )}
                    </li>   
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
