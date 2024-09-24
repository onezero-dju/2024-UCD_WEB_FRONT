import React, { createContext, useState } from 'react';
import { getHomeData } from '../api/homeData';

const homeData = await getHomeData()
const myName = homeData.user.user_name;
const myRole = homeData.user.role;

// Context 생성
export const HomeDataContext = createContext();

export const HomeDataProvider = ({ children }) => {
  const [selectedOrgId, setSelectedOrgId] = useState(homeData.organizations[0].organization_id);
  const [selectedChannelId, setSelectedChannelId] = useState(homeData.organizations[0].channels[0].channel_id);
  const [selectedOrgs, setSelectedOrgs] = useState(homeData.organizations);
  const [selectedChannels, setSelectedChannels] = useState(homeData.organizations[0].channels);

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
