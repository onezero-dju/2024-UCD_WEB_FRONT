import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import './LoginContainer.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import ModalFrame from '../ModalFrame/ModalFrame';
import useCheckLogin from '../../hooks/useCheckLogin';

export default function LoginContainer() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(['token']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [organizationId, setOrganizationId] = useState('');
  const [message, setMessage] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [requestMessage, setRequestMessage] = useState('');
  const [genOrgName, setGenOrgName] = useState('');
  const [genOrgDisc, setGenOrgDisc] = useState('');
  const [isGenOrgSectionOpen, setIsGenOrgSectionOpen] = useState(false);
  useCheckLogin('token');
  const navigate = useNavigate();

  // 로그인 로직
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password.length < 8) {
      alert('비밀번호는 최소 8자 이상이어야 합니다.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email: id,
        password: password,
      });
      if (response.data.code === 200) {
        alert('로그인이 성공하였습니다');
        setCookie('token', response.data.token);
        // checkUserOrganization(response.data.token);
        navigate('/main')
      } else {
        alert('로그인이 실패하였습니다');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('인증 오류: ' + error.message);
      } else {
        console.error('로그인 에러', error);
        alert('로그인 실패');
      }
    }
  };

  // 소속된 조직 검사
  const checkUserOrganization = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/organizations/my`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.data.length > 0) {
        alert(response.data.data)
        navigate('/main');
        console.log("가입된 조직이 있어서 메인으로 이동합니다.")
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('이 리소스에 대한 권한이 없습니다.');
      } else {
        console.error('조직 확인 에러', error);
        alert('조직 정보를 불러오는 데 실패했습니다.');
      }
    }
  };

  // 조직 검색
  const handleSearchOrganization = async (event) => {
    event.preventDefault()
    if (!searchKeyword) {
      alert('검색할 조직 이름을 입력해주세요.');
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/organizations/search`,
        {
          params: {
            keyword: searchKeyword,
          },
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );

      if (response.data.code === 200) {
        setSearchResults(response.data.data);
      } else {
        alert('조직 검색에 실패했습니다.');
        console.log(response.data.code);
      }
    } catch (error) {
      console.error('조직 검색 에러', error);
      alert('조직 검색에 실패했습니다!');
    }
  };

  // 조직 신청
  const handleJoinOrganization = async (id) => {
    console.log(id);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/organizations/${id}/join`,
        {
          message: "가입 신청합니다.",
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);

      if (response.data.code === 201) {
        alert('조직 가입 신청이 성공했습니다.');
        setIsModalOpen(false);
      } else {
        alert('조직 가입 신청에 실패했습니다.');
      }
    } catch (error) {
      console.error('조직 가입 신청 에러', error);
      alert('조직 가입 신청에 실패했습니다.');
    }
  };

  const handleGenOrgSection = () => {
    if (isGenOrgSectionOpen) {
      setIsGenOrgSectionOpen(false);
    } else {
      setIsGenOrgSectionOpen(true)
    }
  }

  // 조직 생성 (조직이 없는 회원)
  const handleCreateOrg = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/organizations`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`
          },
        },
        {
          organization_name: genOrgName,
          description: genOrgDisc
        }
      );
      if (response.data.code === 201) {
        alert("성공적으로 조직이 생성되었습니다.");
        console.log(`조직: ${genOrgName} 생성 완료`);
        navigate('/main');
      } else {
        console.log("조직 생성 실패");
      }
    } catch (error) {
      console.error(`조직 생성 요청 에러 \n ${error}`);
    }
  }

  return (
    <main className='login-container'>
      <form className='login-field' onSubmit={handleSubmit}>
        <Input
          type='text'
          id='email'
          label='이메일'
          onChange={(e) => setId(e.target.value)}
          required
        />
        <Input
          type='password'
          id='password'
          label='비밀번호'
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type='submit' label='로그인' size='full' primary />
      </form>
      {isModalOpen &&
        (<ModalFrame setModalOpen={setIsModalOpen}>
          <div className={'modal-temp'}>
            <div className={`modal-slider ${isGenOrgSectionOpen ? 'slide-bottom' : 'slide-top'}`}>
              <h4 className='modal-title'>조직 참가하기</h4>
              <div className='modal-content'>
                <form onSubmit={handleSearchOrganization} className='search-org-name'>
                  <Input
                    type='text'

                    label='조직 검색'
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    required
                  />
                  <Button type="submit" label='검색' size='full' primary />
                </form>

                <div className='search-org-results'>
                  {searchResults.map((org) => (
                    <div key={org.organization_id} className='organization-item'>
                      <span>{org.organization_name}</span>
                      <Button
                        label='가입 신청'
                        onClick={() => handleJoinOrganization(org.organization_id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="separator">
                {/* <div className="line"></div> */}
                <span className='view-gen-org-section' onClick={() => handleGenOrgSection()}>{isGenOrgSectionOpen ? '가입 요청하기' : '또는 직접 생성하기'}</span>
                {/* <div className="line"></div> */}
              </div>
              <h4 className='modal-title'>조직 생성</h4>
              <div>
                <Input
                  type='text' id='gen-org-name' label='조직 이름'
                  onChange={(e) => setGenOrgName(e.target.value)}
                  required
                />
                <Input
                  type='text' id='gen-org-disc' label='조직 설명'
                  onChange={(e) => setGenOrgDisc(e.target.value)}
                  required
                />
                <Button
                  type='submit' label='조직 생성' size='full' primary
                  onClick={() => handleCreateOrg()}
                />
              </div>
            </div>
          </div>
        </ModalFrame>
        )}
      <div className='signup-box'>
        <Link to='/signup' className='text-href'>
          회원가입 &gt;
        </Link>
      </div>
    </main>
  );
}
