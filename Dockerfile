# https://hub.docker.com/_/node/
FROM node:4-onbuild

# create working directory on container
WORKDIR /app
#
ADD . /app
# install node modules like nodemon etc
RUN npm install

# container port (not the one we connect to)... e.g if express is running on port 80, we're using it on port 80
EXPOSE 8080

# define env variables
ENV env development

CMD ["npm", "start"]
# cmd to run when container launches
