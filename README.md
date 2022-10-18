# image-processing-api

This project implements a simple REST API, which allows for retrieving a resized version of an image stored on the server. 

The server stores its images in the following directory: [resources/images](https://github.com/LukBude/image-processing-api/tree/main/resources/images).
The available images' names are: 
* encenadaport
* fjord
* icelandwaterfall
* palmtunnel
* santamonica

## testing the REST API

In order to test the REST API, you need to have nodJs installed. Open a console inside the image-processing-api directory, which contains a package.json file. Now, you can simply run the node script "serve" by executing the command "npm run serve". Open your browser and send a valid GET request of the pattern:

http://localhost:3000/api/image?name={imageName}&width={width}&height={height}

If you want to retrieve the image "fjord" with dimensions 300px + 300px, send the following GET request:

http://localhost:3000/api/image?name=fjord&width=300&height=300

## run jasmine tests

Both the endpoint and the image-resize service have been tested using jasmine. You can execute all unit tests by running the npm script "test".
