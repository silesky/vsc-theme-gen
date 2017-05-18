#!/bin/bash
docker run -d -v ~/projects/vsc-theme-gen:/app -p 8888:8080 silesky/vscode-theme-gen:latest

