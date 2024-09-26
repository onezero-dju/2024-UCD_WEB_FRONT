import React, { createContext, useState, useContext, useEffect } from 'react';
import { getHomeData } from '../api/homeData';
import { IsLoginedContext } from './IsLogined';
import { useNavigate } from 'react-router-dom';

// const homeData = await getHomeData()
// const myName = homeData.user.user_name;
// const myRole = homeData.user.role;

// Context 생성
export const HomeDataContext = createContext();

export const HomeDataProvider = ({ children }) => {
  // const navigate = useNavigate();
  const {
    isLogined,
    setIsLogined,
  } = useContext(IsLoginedContext);
  const [homeData, setHomeData] = useState(null); // 홈 데이터를 저장할 상태
  const [myName, setMyName] = useState('');
  const [myRole, setMyRole] = useState('');
  const [selectedOrgId, setSelectedOrgId] = useState('');
  const [selectedChannelId, setSelectedChannelId] = useState('');
  const [selectedOrgs, setSelectedOrgs] = useState('');
  const [selectedChannels, setSelectedChannels] = useState('');

  // if(!isLogined){
  //   alert('로그인이 필요한 페이지입니다.');
  //   navigate('/login');
  // } // 필요한 코드인지 확인 요망

  // useEffect( async() => { // 필요한 코드인지 확인 요망
  //   console.log('tt');
  // 중복 전송 방지로 로그인 상태 변경시에만 실행
  useEffect(() => {    
    const temp = async () => {
      const data = await getHomeData(isLogined);

      setHomeData(data);
      // console.log(data);
      setMyName(homeData.user.user_name);
      setMyRole(homeData.user.role);

      setSelectedOrgId(homeData.organizations[0].organization_id);
      setSelectedChannelId(homeData.organizations[0].channels[0].channel_id);
      setSelectedOrgs(homeData.organizations);
      setSelectedChannels(homeData.organizations[0].channels);
    }

    temp();
  }, [isLogined])



  // },[isLogined])

  // const [selectedOrgId, setSelectedOrgId] = useState(homeData.organizations[0].organization_id);
  // const [selectedChannelId, setSelectedChannelId] = useState(homeData.organizations[0].channels[0].channel_id);
  // const [selectedOrgs, setSelectedOrgs] = useState(homeData.organizations);
  // const [selectedChannels, setSelectedChannels] = useState(homeData.organizations[0].channels);

  return (
    <HomeDataContext.Provider
      value={{
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
      }}
    >
      {children}
    </HomeDataContext.Provider>
  );
};
