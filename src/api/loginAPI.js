const url = 'http://localhost:8080/login';
// const url = 'https://14caf9a4-4da5-4843-8925-940176a8dcd5.mock.pstmn.io/api/users/login';

export const userLogin = async (requestData) => {
    try {
        // 추후 fetch 코드 추가
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        //   mode: 'cors',
          body: JSON.stringify(requestData)
        });

        const responseJson = await response.json();
        console.log(responseJson);
        if (responseJson.code === 200) {
            // console.log(response)
            return true;
        } else {
            throw new Error(`Error: Received status code ${responseJson.code}`);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
        throw error;
      }
};
