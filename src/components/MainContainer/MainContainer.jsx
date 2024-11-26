import React, { useContext, useEffect, useState } from 'react'
import Select from 'react-select'
import { SectionTitle } from '../SectionTitle/SectionTitle';
import { SectionLinkItem } from '../SectionLinkItem/SectionLinkItem';
import { HomeDataContext } from '../../hooks/HomeDataContext';
import SignOutButton from "../SignOutButton/SignOutButton";
import { useGenMeeting, useGetMeetingList } from '../../api/useHanddleMeeting';
import { useGenCategory, useGetCategories } from '../../api/useHandleCategory';
import ProfileModal from '../ModalFrame/ModalFrame';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import './MainContainer.css';

function MainContainer() {
  const { selectedChannelId, selectedChannelName } = useContext(HomeDataContext);
  const [options, setOptions] = useState([]);
  const [genCategoryName, setGenCategoryName] = useState(null);
  const [genMeetingName, setGenMeetingName] = useState(null);
  const [genMeetingCategory, setGenMeetingCategory] = useState(null);
  const [genMeetingAgenda, setGenMeetingAgenda] = useState(null);
  const [isGenCategorySectionOpen, setGenCategorySectionOpen] = useState(false);
  const [isGenMeetingSectionOpen, setGenMeetingSectionOpen] = useState(false);
  const { responseData: mainData, loading: getMeetingLoading, error: getMeetingError, fetchGetMeetingList } = useGetMeetingList(10);
  const { responseData: genCategoryResponse, loading: genCategoryLoading, error: genCategoryError, fetchGenCategory } = useGenCategory();
  const { responseData: getCategoryResponse, loading: getCategoryLoading, error: getCategoryError, fetchGetCategory } = useGetCategories();
  const { responseData: genMeetingResponse, loading: genMeetingLoading, error: genMeetingError, fetchGenMeeting } = useGenMeeting();

  // 드롭다운 메뉴 커스텀
  // 추후 컴포넌트화 필요
  const customStyles = {
    // 상위 요소 커스텀
    control: (provided, state) => ({
      ...provided,
      borderRadius: '10px',
      borderColor: state.isFocused ? '#3F72AF' : '#505050',
      borderWidth: state.isFocused ? '2px' : '1px',
      boxShadow: 'none',
      marginBottom: '10px',
      '&:hover': {
        cursor: 'pointer',
        borderWidth: '2px',
        borderColor: '#3F72AF'
      },
    }),
    // 하위 요소 wrap 커스텀
    menu: (provided) => ({
      ...provided,
      borderRadius: '10px',
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: '90px',
      overflowY: 'auto',
      '::-webkit-scrollbar': {
        width: '8px',
      },
      '::-webkit-scrollbar-track': {
        background: '#0000',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#8888',
        borderRadius: '10px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        background: '#555',
      },
    }),
    // 옵션 커스텀
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3F72AF' : '#fff',
      color: state.isSelected ? '#fff' : '#555',
      textAlign: 'left',
      // 옵션 호버 시
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#e1e1e1',
        color: '#333',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      textAlign: 'left',
    }),
    // 플레이스홀더
    placeholder: (provided) => ({
      ...provided,
      textAlign: 'left',
    }),
  };

  useEffect(() => {
    if (!selectedChannelId) return;
    fetchGetMeetingList(selectedChannelId);
  }, [selectedChannelId])

  useEffect(() => {
    console.log(mainData);
  }, [mainData])

  useEffect(() => {
    if (isGenMeetingSectionOpen) {
      fetchGetCategory(selectedChannelId);
    }
  }, [isGenMeetingSectionOpen])

  useEffect(() => {
    console.log(getCategoryResponse)
    if (!getCategoryLoading && getCategoryResponse) {
      const optionList = getCategoryResponse.map(item => ({ id: item.category_id, value: item.name, label: item.name }));
      console.log(optionList)
      setOptions(optionList);
    }

  }, [getCategoryResponse, getCategoryLoading, getCategoryError]);

  // genCategoryResponse 수신한 후 실행
  useEffect(() => {
    console.log(`genCategoryLoading: ${genCategoryLoading}`);
    console.log(`genCategoryError: ${genCategoryError}`);
    console.log(`genCategoryResponse: ${genCategoryResponse}`);

    if (!genCategoryLoading && genCategoryResponse) {
      console.log("genCategoryResponse:", genCategoryResponse);
      alert(`\'${genCategoryResponse.data.name}\' 채널을 생성하였습니다.`);
      setGenCategorySectionOpen(false);
      fetchGetMeetingList(selectedChannelId);
    } else if (!genCategoryLoading && genCategoryError) {
      console.error("Error:", genCategoryError);
      alert('다시 시도해주세요.');
    }
  }, [genCategoryResponse, genCategoryLoading, genCategoryError]);

  // genMeetingResponse 수신한 후 실행
  useEffect(() => {
    console.log(`genMeetingLoading: ${genMeetingLoading}`);
    console.log(`genMeetingError: ${genMeetingError}`);
    console.log(`genMeetingResponse: ${genMeetingResponse}`);

    if (!genMeetingLoading && genMeetingResponse) {
      console.log("genMeetingResponse:", genMeetingResponse);
      alert(`\'${genMeetingResponse.meeting_title}\' 회의를 생성하였습니다.`);
      setGenCategorySectionOpen(false);
      fetchGetMeetingList(selectedChannelId);
    } else if (!genMeetingLoading && genMeetingError) {
      console.error("Error:", genMeetingError);
      alert('다시 시도해주세요.');
    }
  }, [genMeetingResponse, genMeetingLoading, genMeetingError]);

  // 카테고리 생성
  const handleGenCategory = async () => {
    // 유효성 검사
    if (!genCategoryName) { alert('카테고리 이름을 입력해주세요'); return }

    console.log(`카테고리명: ${genCategoryName}`)
    const data = {
      "name": genCategoryName,
    }
    await fetchGenCategory(data, selectedChannelId);
  };

  // 회의 생성
  const handleGenMeeting = async () => {
    // 유효성 검사
    if (!genMeetingName) { alert('회의 이름을 입력해주세요'); return }
    if (!genMeetingCategory) { alert('카테고리를 선택해주세요'); return }
    if (!genMeetingAgenda) { alert('안건을 입력해주세요'); return }

    console.log(`회의명: ${genMeetingName}`)
    console.log(`카테고리명: ${genMeetingCategory.value}`)
    console.log(`안건: ${genMeetingAgenda}`)

    const data = {
      "meeting_title": genMeetingName,
      "channel_id": selectedChannelId,
      "channel_name": selectedChannelName,
      "category_id": genMeetingCategory.id,
      "category_name": genMeetingCategory.value,
      "agenda": genMeetingAgenda
    }

    console.log(data);

    await fetchGenMeeting(data);
  }

  if (getMeetingLoading) {
    return <div>Loading...</div>;
  }
  if (getMeetingError) {
    return <div>Error: {getMeetingError.message}</div>;
  }

  return (
    <main className='main-wrap'>
      <div className='title-container'>
        <div className='chanel_title'>
          <h3>{selectedChannelName}</h3>
        </div>
        <div className='toolbar'>
          <SignOutButton />
          <div className='add-category' onClick={() => setGenCategorySectionOpen(true)}>+</div>
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
          <div className='add-meetingnote' onClick={() => setGenMeetingSectionOpen(true)}>+</div>
          {isGenMeetingSectionOpen && <ProfileModal setModalOpen={setGenMeetingSectionOpen}>
            <div className='modal-temp'>
              <h4 className='modal-title'>회의 생성</h4>
              <div className='dropdown'>
                <Select
                  options={options}
                  styles={customStyles}
                  placeholder="상위 카테고리 선택"
                  maxMenuHeight={90}
                  menuPlacement="auto"
                  onChange={setGenMeetingCategory}
                />
              </div>
              <Input
                type='text' id='gen-meeting-name' label='회의 제목'
                onChange={(e) => setGenMeetingName(e.target.value)}
                required
              />
              <Input
                type='text' id='gen-meeting-org' label='회의 안건'
                onChange={(e) => setGenMeetingAgenda(e.target.value)}
                required
              />
              <Button
                type='submit' label='생성하기' size='full' primary
                onClick={() => handleGenMeeting()}
              />
            </div>
          </ProfileModal>}
        </div>
      </div>
      <div className='category-wrap'>
        <ul className='category'>
          {mainData && mainData.length === 0 ? (
            <p>카테고리 또는 회의가 비어있습니다. <br /> 우측 상단의 아이콘을 눌러 카테고리를 생성해보세요!</p>
          ) : mainData && mainData.length > 0 ? (
            mainData.map(category => (
              <li className='category-item' key={category.category_id}>
                <SectionTitle text={category.category_name} />
                <ul className='meeting_note'>
                  {category.meeting_dtolist.map(meeting => (
                    <li key={meeting.meeting_id}>
                      <SectionLinkItem
                        id={meeting.meeting_id}
                        text={meeting.meeting_title}
                        to={`/meeting/${meeting.meeting_id}`}
                      />
                    </li>
                  ))}
                  {/* 미팅리스트 마지막에 + 추가 */}
                  {/* <li key='0'>
                                        <SectionLinkItem 
                                            id='0'
                                            text='+'
                                        />
                                    </li> */}
                </ul>
              </li>
            ))
          ) : (
            <p>No items available.</p>
          )}
        </ul>
      </div>
    </main>
  )
}

export default MainContainer
