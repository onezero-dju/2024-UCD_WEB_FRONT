import React, { createContext, useState, useEffect } from 'react';
import { useHomeData } from '../api/useHomeData';

export const HomeDataContext = createContext();

export const HomeDataProvider = ({ children }) =>  {
  const [homeData, setHomeData] = useState(null);
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [selectedOrgs, setSelectedOrgs] = useState([]);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [myName, setMyName] = useState('');
  const [myRole, setMyRole] = useState('');

  useEffect(() => {
    const FetchHomeData = async () => {
      try {
        const data = await useHomeData();
        setHomeData(data);

        if (data && data.organizations && data.organizations.length > 0) {
          setSelectedOrgId(data.organizations[0].organization_id);
          setSelectedChannelId(data.organizations[0].channels[0].channel_id);
          setSelectedOrgs(data.organizations);
          setSelectedChannels(data.organizations[0].channels);
          setMyName(data.user.user_name);
          setMyRole(data.user.role);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
      }
    };

    FetchHomeData();
  }, []);

  if (!homeData) {
    return <div>Loading...</div>;
  }

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
