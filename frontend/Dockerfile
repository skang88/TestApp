# 1단계: React 앱 빌드 (Node 환경)
FROM node:24 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: 빌드된 정적 파일 서빙 (Nginx 환경)
FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

# Nginx의 기본 포트인 80번을 열어줍니다 (기존 3000에서 변경 추천)
EXPOSE 80

# Nginx 서버를 백그라운드가 아닌 포어그라운드로 실행하여 컨테이너가 유지되도록 합니다
CMD ["nginx", "-g", "daemon off;"]