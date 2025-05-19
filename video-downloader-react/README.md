# Video Downloader React

This project is a simple React application that allows users to input a video link and download the video from that link using a backend service.

## Features

- Input field for video link
- Submit button to download the video
- Displays download status and errors

## Technologies Used

- React
- TypeScript
- Actix-web (for the backend service)

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd video-downloader-react
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm start
   ```

4. **Access the application:**
   Open your browser and go to `http://localhost:3000`.

## Usage

- Enter the video link in the input field.
- Click the "Download" button to initiate the download process.
- The application will communicate with the backend to fetch the video.

## Backend Setup

Ensure that the backend service is running and accessible. The backend should handle the `/download` endpoint to process video download requests.

## License

This project is licensed under the MIT License.