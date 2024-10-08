import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavRectButton } from '../NavRectButton/NavRectButton';
import { NavCirButton } from '../NavCirButton/NavCirButton';
import { ProfileImage } from '../ProfileImage/ProfileImage';
import { HomeDataContext } from '../../hooks/HomeDataContext';
import './Sidebar.css'
import ProfileModal from '../ModalFrame/ModalFrame';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

function Sidebar() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [genChannelName, setGenChannelName] = useState('');
  const [genChannelDisc, setGenChannelDisc] = useState('');
  
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

    // Chaanel 생성 함수
    const handdleGenChannel = () => {
        // 유효성 검사
        if(!genChannelName) {alert('회의실 이름을 입력해주세요')}
        else if(!genChannelDisc) {alert('회의실 설명을 작성해주세요')}
        else {
            // 데이터 통신 로직 추가
            console.log(`채널명: ${genChannelName}`)
            console.log(`채널 설명: ${genChannelDisc}`)
            // 실패/성공 관련 메시지 출력
            alert(`${genChannelName} 회의실을 생성하였습니다.`)
            // 창 닫기            
            setModalOpen(false)
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
                                            onClick={(e) => handleChannelClick(e, channel.channel_id)}
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
                            onClick={() => console.log('Add Organization')}
                        />
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
