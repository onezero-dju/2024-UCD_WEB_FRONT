import React, { useContext, useEffect, useState } from 'react'
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { SectionLinkItem } from '../SectionLinkItem/SectionLinkItem';
import { HomeDataContext } from '../../hooks/HomeDataContext';
import { getMainData } from '../../api/mainDataAPI';
import './MainContainer.css'

function MainContainer() {
    const [filteredData, setFilteredData] = useState(null);

    // selectedChannelId를 기반으로 categories, meetings data 요청
    const { selectedChannelId } = useContext(HomeDataContext);
    useEffect( () => {
        const fetchData = async () => {
            const mainData = await getMainData(selectedChannelId);
            setFilteredData( mainData );
        }
        fetchData();
    }, [selectedChannelId])
    const [channelName, setChannelName] = useState('');
    const [categoriesByChannel, setCategoriesByChannel] = useState('');
    // const ChannelName = filteredData.channel_name;
    // const categoriesByChannel = filteredData.categories;
    if (filteredData) {
        setChannelName(filteredData.channel_name);
        setCategoriesByChannel(filteredData.categories);
    }
    return (
        <main className='main-wrap'>
            <div className='title-container'>
                <div className='chanel_title'>
                    <h3>{channelName}</h3>
                </div>
                <div className='toolbar'>
                    <div className='add-note'></div>
                    <div className='add-category'></div>
                </div>
            </div>
            <div className='category-wrap'>
                <ul className='category'>
                    {categoriesByChannel && categoriesByChannel.map(category => (
                        <li className='category-item' key={category.category_id}>
                            <SectionTitle text={category.category_name}/>
                            <ul className='meeting_note'>
                                {category.meetings.map(meeting => (
                                    <li key={meeting.meeting_id}>
                                        <SectionLinkItem 
                                            id={meeting.meeting_id}
                                            text={meeting.meeting_name}
                                            to={`/meeting/${meeting.meeting_id}`}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}

export default MainContainer
