# Installation
* rebuild
https://www.evernote.com/Home.action#n=21b4dcf2-45f9-4e44-a87d-fb9e653f6f30&ses=1&sh=5&sds=5&x=docker
* run in detached mode and map local port 80 to container port 8080
  * `docker run -d -p 80:8080 silesky/vscode-theme-gen:latest`
# Cool commands
* Delete images with no relationship to any tagged image
  * `docker rmi -f $(docker images -f dangling=true -q)`
* Delete containers
  * `docker ps -a`
  * `docker rm <ID>`

