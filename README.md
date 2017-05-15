# Installation
* run in detached mode and map local port 80 to container port 8080
  * `docker run -d -p 80:8080 silesky/vscode-theme-gen:latest`

# Cool commands
* Delete images with no relationship to any tagged image
  * `docker rmi -f $(docker images -f dangling=true -q)`
* Delete containers
  * `docker ps -a`
  * `docker rm <ID>`

