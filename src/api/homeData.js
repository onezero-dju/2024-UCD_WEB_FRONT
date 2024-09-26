// import { useContext } from "react";
// import { IsLoginedContext } from "../hooks/IsLogined";

const url = 'http://localhost:8080/api/users/home';

export const getHomeData = async (isLogined) => {

  if (true) {
    try {
      // 추후 fetch 코드 추가
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        // mode: 'cors',
      });

      // console.log(response);

      if (response.ok) {
        const responseJson = await response.json();
        return responseJson.data;
      }

      
      else {
          throw new Error(`Error: Received status code ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching home data:', error);
      // throw error;
      return false;
    }
  } else {
    console.log('로그인이 필요합니다.');
  }
};
