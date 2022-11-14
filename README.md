# image-processing-api

This project implements a simple express server, which exposes a REST API. The REST API allows for retrieving a resized version of an image stored on the server's filesystem. A GET request asking for a resized version of an image will not only send the resized image to the client, but also save it on the server's filesystem.

The server stores its images in the following directory: [resources/images](https://github.com/LukBude/image-processing-api/tree/main/resources/images).
The available images' names are: 
* encenadaport
* fjord
* icelandwaterfall
* palmtunnel
* santamonica

## testing the REST API

In order to test the REST API, you need to have nodJs installed. Open a console inside the image-processing-api directory, which contains a package.json file. You'll find several node scripts inside the package.json. In order to test the REST API, run the node script "serve" by executing the command "npm run serve". This command will start the express server on port 3000 of your localhost. Open your browser and send a valid GET request of the pattern:

http://localhost:3000/api/image?name={imageName}&width={width}&height={height}

If you want to retrieve the image "fjord" with dimensions 300px x 300px, send the following GET request:

http://localhost:3000/api/image?name=fjord&width=300&height=300

## run jasmine tests

Both the endpoint and the image-resize service have been tested using jasmine. You can execute all unit tests by running the npm script "test".
