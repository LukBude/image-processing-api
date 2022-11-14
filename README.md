# image-processing-api

This project implements a simple express server, which exposes a REST API. The REST API allows for retrieving a resized version of an image, which is stored on the server's filesystem. A GET request asking for a resized version of an image will not only send the resized image to the client, but also save the resized version of the requested image on the server's filesystem, next to the original image.

The server stores its images in the following directory: [resources/images](https://github.com/LukBude/image-processing-api/tree/main/resources/images).
The originally available images have the following names: 
* encenadaport
* fjord
* icelandwaterfall
* palmtunnel
* santamonica

## testing the REST API

In order to test the REST API, you need to have nodJs installed. Clone this repository, navigate into it and open a console. This repository contains a package.json, which includes several node scripts. In order to test the REST API, run the node script "serve" by executing the command "npm run serve" inside your console. This command will start the express server on port 3000 of your localhost. Open your browser and send a valid GET request of the pattern:

http://localhost:3000/api/image?name={imageName}&width={width}&height={height}

If you want to retrieve the image "fjord" with dimensions 300px x 300px, send the following GET request:

http://localhost:3000/api/image?name=fjord&width=300&height=300

## run jasmine tests

Both the endpoint and the image-resize service have been tested using jasmine. You can execute all unit tests by running the npm script "test".
