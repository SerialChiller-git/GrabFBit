import React from 'react';
import VideoDownloader from './components/VideoDownloader';
import './App.css';
import { ToastContainer } from 'react-toastify';
import TopBar from './components/TopBar';
import Footer from './components/Footer';

const App: React.FC = () => {
    return (
        <div className='appContainer'>
            <TopBar />
            <VideoDownloader />
            <ToastContainer />
            <Footer />
        </div>
    );
};

export default App;