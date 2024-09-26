import React, { createContext, useState, useEffect } from 'react';
import { getUserInfo } from '../api/getUserInfo';

// Context 생성
export const IsLoginedContext = createContext();

export const IsLoginedProvider = ({ children }) => {
    const [isLogined, setIsLogined] = useState(null);
    // const [currentPath, setCurrentPath] = useState(window.location.pathname);
    
    useEffect(()=>{
        console.log(`isLogined: ${isLogined}`);
    }, [isLogined]);

    const fetchData = async () => {
      const response = await getUserInfo();

      if (response) {
        console.log('로그인 세션 확인!');
        setIsLogined(true);
      } else {
        console.log('로그인 세션 없음ㅠ');
        setIsLogined(false);
      }
    };


    // useEffect(()=>{

      // // popstate 이벤트가 발생할 때마다 로그인 상태 확인
      // const handleLocationChange = () => {
      //   fetchData();
      // };

      // // popstate 이벤트 리스너 추가
      // window.addEventListener('popstate', handleLocationChange);

      // // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      // return () => {
      //   window.removeEventListener('popstate', handleLocationChange);
      // };

      

    // }, []);
//   const [selectedOrgId, setSelectedOrgId] = useState(homeData.organizations[0].organization_id);
//   const [selectedChannelId, setSelectedChannelId] = useState(homeData.organizations[0].channels[0].channel_id);
//   const [selectedOrgs, setSelectedOrgs] = useState(homeData.organizations);
//   const [selectedChannels, setSelectedChannels] = useState(homeData.organizations[0].channels);

  return (
    <IsLoginedContext.Provider
      value={{
        isLogined,
        setIsLogined,
      }}
    >
      {children}
    </IsLoginedContext.Provider>
  );
};
