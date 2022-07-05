FROM node:8

RUN mkdir /usr/src/app
RUN mkdir /tmp/extracted_files
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm update
RUN npm install
EXPOSE 3001

ENTRYPOINT ["npm", "start"]
