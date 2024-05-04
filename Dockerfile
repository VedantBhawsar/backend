FROM node:20.11.0

RUN npm -v && node -v

RUN apt update -y
RUN apt install nginx -y

WORKDIR /app/backend

COPY . .

RUN npm install 
CMD [ "npm", 'start' ]
EXPOSE 3001
 
