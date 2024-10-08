import React, { useContext, useEffect, useState } from 'react'
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { SectionLinkItem } from '../SectionLinkItem/SectionLinkItem';
import { HomeDataContext } from '../../hooks/HomeDataContext';
import { useGetCategories } from '../../api/useGetCategories';
import SignOutButton from "../SignOutButton/SignOutButton";
import './MainContainer.css'

function MainContainer() {
    const [filteredData, setFilteredData] = useState('');

    // selectedChannelId를 기반으로 categories, meetingDTOList data 요청
    const { selectedChannelId } = useContext(HomeDataContext);
    useEffect( () => {
        const FetchData = async () => {
            const mainData = await useGetCategories(selectedChannelId);
            setFilteredData( mainData );
        }
        FetchData();
    }, [selectedChannelId])
    const ChannelName = filteredData.channel_name;
    const categoriesByChannel = filteredData.categories;

    return (
        <main className='main-wrap'>
            <div className='title-container'>
                <div className='chanel_title'>
                    <h3>{ChannelName}</h3>
                </div>
                <div className='toolbar'>
                    <SignOutButton/>
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
                                {category.meetingDTOList.map(meeting => (
                                    <li key={meeting.meetingId}>
                                        <SectionLinkItem 
                                            id={meeting.meetingId}
                                            text={meeting.meetingTitle}
                                            to={`/meeting/${meeting.meetingId}`}
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
