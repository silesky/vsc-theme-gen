# https://hub.docker.com/_/node/
FROM node:4-onbuild

# create working directory on container
WORKDIR /app

ADD . /app
RUN npm install
# application port... e.g if express is running on port 80, we're using it on port 80
EXPOSE 8080

# efine env variables
ENV NAME World

CMD ["npm", "start"]
# cmd to run when container launches
