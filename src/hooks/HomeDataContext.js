import React, { createContext, useState, useEffect } from 'react';
import { useHomeData } from '../api/useHomeData';

export const HomeDataContext = createContext();

export const HomeDataProvider = ({ children }) =>  {

  const homeData = useHomeData();

  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [selectedOrgs, setSelectedOrgs] = useState([]);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [myName, setMyName] = useState('');
  const [myRole, setMyRole] = useState('');

  useEffect(() => {
    // homeData가 로드된 후에만 상태 업데이트
    if (homeData && homeData.organizations && homeData.organizations.length > 0) {     
      setSelectedOrgId(homeData.organizations[0].organization_id);
      setSelectedOrgs(homeData.organizations);

      if(homeData.organizations[0].channels.length > 0){
        setSelectedChannelId(homeData.organizations[0].channels[0].channel_id);
        setSelectedChannels(homeData.organizations[0].channels);
      }

      setMyName(homeData.user.username);
      setMyRole(homeData.user.role);
    } 
    // home데이터는 있지만 사용자가 속한 조직이 없을 때
    else if (homeData && homeData.organizations) {
      setMyName(homeData.user.username);
      setMyRole(homeData.user.role);
    }
  }, [homeData]);

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
