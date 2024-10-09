import React, { useContext, useEffect, useState } from 'react'
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { SectionLinkItem } from '../SectionLinkItem/SectionLinkItem';
import { HomeDataContext } from '../../hooks/HomeDataContext';
import SignOutButton from "../SignOutButton/SignOutButton";
import './MainContainer.css'
import { useGetCategoryList } from '../../api/useHanddleMeeting';
import { useGenCategory } from '../../api/useHandleCategory';
import ProfileModal from '../ModalFrame/ModalFrame';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

function MainContainer() {
    const { selectedChannelId } = useContext(HomeDataContext);
    const [genCategoryName, setGenCategoryName] = useState(null);
    const [isGenCategorySectionOpen, setGenCategorySectionOpen] = useState(false);
    
    const { responseData: mainData, loading: getCategoriesLoading, error: getCategoriesError, fetchGetCategoryList } = useGetCategoryList();
    const { responseData: genCategoryResponse, loading: genCategoryLoading, error: genCategoryError, fetchGenCategory } = useGenCategory();
 
    useEffect(()=>{
        fetchGetCategoryList(selectedChannelId);
    }, [selectedChannelId])
    
    useEffect(()=>{
        console.log(mainData);
    }, [mainData])

    // genCategoryResponse 수신한 후 실행
    useEffect(() => {
        console.log(`genCategoryLoading: ${genCategoryLoading}`);
        console.log(`genCategoryError: ${genCategoryError}`);
        console.log(`genCategoryResponse: ${genCategoryResponse}`);
        
        if (!genCategoryLoading && genCategoryResponse) {
            console.log("genCategoryResponse:", genCategoryResponse);
            alert(`\'${genCategoryResponse.data.name}\' 채널을 생성하였습니다.`);
            setGenCategorySectionOpen(false);
            // window.location.reload();
        } else if (!genCategoryLoading && genCategoryError) {
            console.error("Error:", genCategoryError);
            alert('다시 시도해주세요.');
        }
    }, [genCategoryResponse, genCategoryLoading, genCategoryError]);
        
    // 카테고리 생성
    const handleGenCategory = async () => {
        // 유효성 검사
        if(!genCategoryName) {alert('카테고리 이름을 입력해주세요'); return}
              
        console.log(`카테고리명: ${genCategoryName}`)
        const data = {
            "name": genCategoryName,
        }
        await fetchGenCategory(data, selectedChannelId);
    };

    if (getCategoriesLoading) {
        return <div>Loading...</div>;
    }
    if (getCategoriesError) {
        return <div>Error: {getCategoriesError.message}</div>;
    }

    return (
        <main className='main-wrap'>
            <div className='title-container'>
                <div className='chanel_title'>
                    {/* <h3>{mainData && mainData.channel_name && mainData.channel_name}</h3> */}
                    <h3>ChannelName</h3>
                </div>
                <div className='toolbar'>
                    <SignOutButton/>
                    <div className='add-category' onClick={()=>setGenCategorySectionOpen(true)}>+</div>
                    {isGenCategorySectionOpen && <ProfileModal setModalOpen={setGenCategorySectionOpen}>
                    <div className='modal-temp'>
                        <h4 className='modal-title'>카테고리 생성</h4>
                        <Input 
                            type='text' id='gen-category-name' label='카테고리 이름'
                            onChange={(e) => setGenCategoryName(e.target.value)}
                            required
                        />
                        <Button 
                            type='submit' label='생성하기' size='full' primary
                            onClick={() => handleGenCategory()}
                        />
                    </div>           
                    </ProfileModal>}
                    <div className='add-meetingnote'>+</div>
                </div>
            </div>
            <div className='category-wrap'>
                <ul className='category'>
                    {mainData && mainData.data.map(category => (
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
                                <li key='0'>
                                    <SectionLinkItem 
                                        id='0'
                                        text='+'
                                    />
                                </li>
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    )
}

export default MainContainer
