// api 기능 미개발상태로, 
// 요청한 데이터에 대해 고정된 값을 반환하도록 설계함
// 추후 수정이 필요 

// 임시 데이터
const response = {
    "code": 200,
    "message": "success",
    "data": {
      "user": {
        "user_id": 1,
        "user_name": "John Doe",
        "email": "johndoe@example.com",
        "role": "user",
        "created_at": "2024-08-26T18:56:04Z"
      },
      "organizations": [
        {
          "organization_id": 123,
          "organization_name": "One",
          "description": "This is the first organization.",
          "channels": [
            {
              "channel_id": 1,
              "name": "General",
              "description": "This is the general channel",
              "created_at": "2024-08-26T12:00:00Z"
            },
            {
              "channel_id": 2,
              "name": "Development",
              "description": "This is the development channel",
              "created_at": "2024-08-26T12:30:00Z"
            },
            {
              "channel_id": 3,
              "name": "Design",
              "description": "This is the design channel",
              "created_at": "2024-08-26T13:00:00Z"
            },
            {
              "channel_id": 4,
              "name": "HR",
              "description": "This is the HR channel",
              "created_at": "2024-08-26T14:00:00Z"
            }
          ]
        },
        {
          "organization_id": 124,
          "organization_name": "Two",
          "description": "This is the second organization.",
          "channels": [
            {
              "channel_id": 5,
              "name": "Marketing",
              "description": "This is the marketing channel",
              "created_at": "2024-08-26T13:00:00Z"
            },
            {
              "channel_id": 6,
              "name": "Sales",
              "description": "This is the sales channel",
              "created_at": "2024-08-26T13:30:00Z"
            },
            {
              "channel_id": 7,
              "name": "Support",
              "description": "This is the support channel",
              "created_at": "2024-08-26T14:00:00Z"
            }
          ]
        },
        {
          "organization_id": 125,
          "organization_name": "Three",
          "description": "This is the third organization.",
          "channels": [
            {
              "channel_id": 8,
              "name": "Engineering",
              "description": "This is the engineering channel",
              "created_at": "2024-08-26T12:00:00Z"
            },
            {
              "channel_id": 9,
              "name": "Product",
              "description": "This is the product channel",
              "created_at": "2024-08-26T12:30:00Z"
            },
            {
              "channel_id": 10,
              "name": "Operations",
              "description": "This is the operations channel",
              "created_at": "2024-08-26T13:00:00Z"
            }
          ]
        }
      ]
    }
};

export const getHomeData = async () => {
    try {
      // 추후 fetch 코드 추가
      if (response.code === 200) {
          return response.data;
      } else {
          throw new Error(`Error: Received status code ${response.code}`);
      }
    } catch (error) {
      console.error('Error fetching home data:', error);
      throw error;
    }
};
