# 1단계: 빌드를 위한 Node.js 이미지 사용
FROM node:18 AS build

# 애플리케이션의 작업 디렉터리를 설정
WORKDIR /app

# package.json과 package-lock.json을 먼저 복사하여 의존성을 설치 (캐시를 효율적으로 활용)
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 리액트 앱 빌드
RUN npm run build

# 2단계: 빌드된 파일을 서빙할 Nginx 이미지 사용
FROM nginx:alpine

# 빌드된 리액트 앱을 Nginx의 기본 서빙 디렉터리로 복사
COPY --from=build /app/build /usr/share/nginx/html

# Nginx가 사용하는 80 포트 오픈
EXPOSE 80

# Nginx 시작
CMD ["nginx", "-g", "daemon off;"]
