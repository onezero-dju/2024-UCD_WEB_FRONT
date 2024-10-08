import React, { useContext } from 'react'
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { SectionLinkItem } from '../SectionLinkItem/SectionLinkItem';
import { HomeDataContext } from '../../hooks/HomeDataContext';
import { useGetCategories } from '../../api/useGetCategories';
import SignOutButton from "../SignOutButton/SignOutButton";
import './MainContainer.css'

function MainContainer() {
    const { selectedChannelId } = useContext(HomeDataContext);
    const {mainData, loading, error} = useGetCategories(selectedChannelId);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    
    return (
        <main className='main-wrap'>
            <div className='title-container'>
                <div className='chanel_title'>
                    <h3>{mainData.channel_name && mainData.channel_name}</h3>
                </div>
                <div className='toolbar'>
                    <SignOutButton/>
                    <div className='add-note'></div>
                    <div className='add-category'></div>
                </div>
            </div>
            <div className='category-wrap'>
                <ul className='category'>
                    {mainData.categories && mainData.categories.map(category => (
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
