const url = 'http://localhost:8080/api/users/signup';

export const userSignUp = async (requestData) => {
    try {
        console.log(requestData);

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        //   mode: 'cors',
          body: JSON.stringify(requestData)
        });

        const responseJson = await response.json();

        if (responseJson.code === 200) {
            return true;
        } else {
            throw new Error(`Error: Received status code ${responseJson.code}`);
        }
      } catch (error) {
        console.error('Error fetching home data:', error);
        throw error;
      }
};
