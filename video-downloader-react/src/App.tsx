import React from 'react';
import VideoDownloader from './components/VideoDownloader';
import './App.css';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
    return (
        <div>
            <VideoDownloader />
            <ToastContainer />
        </div>
    );
};

export default App;