# # base image
# FROM node:9.6.1

# # set working directory
# RUN mkdir -p /usr/src
# WORKDIR /usr/src

# # install and cache app dependencies
# COPY package.json /usr/src/package.json
# RUN npm cache clean --force
# RUN npm install -g json-server
# RUN npm install --silent
# RUN npm install -g pm2

# COPY . .
# COPY scripts.sh scripts.sh
# RUN chmod 777 ./scripts.sh

# EXPOSE 3000 3300 8080
# # start app

# CMD ./scripts.sh

# base image
FROM nodesource/jessie:4.2.6

# set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# install and cache app dependencies
COPY package.json /usr/src/package.json
RUN npm cache clean --force
RUN npm install --silent
RUN /usr/bin/npm install -g gulp

COPY . .

EXPOSE 9001

# start app

CMD ["gulp","default"]