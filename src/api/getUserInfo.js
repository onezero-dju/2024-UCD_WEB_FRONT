const url = 'http://localhost:8080/api/users/me';

export const getUserInfo = async () => {


    try {
      // 추후 fetch 코드 추가
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          // 'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        // mode: 'cors',
      });

      // console.log(response);
      if(response.status === 403){
        return false;
      }

      const responseJson = await response.json();

      if (responseJson.code === 200) {
        console.log('로그인 유지중...');
          return responseJson.data;
      } else {
          throw new Error(`Error: Received status code ${responseJson.code}`);
      }
    } catch (error) {
        console.log('로그인 정보 없음...');
      console.error('Error fetching getUserInfo:', error);
      throw error;
    }
  
};
