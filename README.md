# SayItRight-WEB
A project that helps you retrieve your audio history from Eleven Labs using their API. With this code, you can easily access and listen to your generated audio files from Eleven Labs. The project is built using popular technologies like React, Express, and Axios, making it easy for you to get started and customize it to your needs.

## Technologies Used

- Node.js
- Express
- Axios
- CORS
- React

## Getting Started

1. Clone the repository.
2. Install the dependencies by running `npm install`.
3. Start the server by running `npm start`.
4. Open the web application by navigating to `http://localhost:3000` in a web browser.

## Usage

- The list of generated audio history items is displayed in a table on the home page.
- To play an audio file, click the "Play" button in the corresponding row of the table. Click "Pause" to pause the audio, "Stop" to stop the audio and reset it, and "Download" to download the audio file.
- To stop the currently playing audio, click the "Stop" button in the row of the table containing the audio file.
- The web application can be accessed from any device connected to the same network as the server.

## API

The server provides the following API endpoints:

- GET /history - returns a list of generated audio history items.
- GET /audio/:history_item_id - returns the audio file for the specified history item.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
