import React from 'react';
import VideoDownloader from './components/VideoDownloader';
import AdComponent from './components/AdComponent';
import './App.css';

const App: React.FC = () => {
    return (
        <div>
            <VideoDownloader />
            <div className='ad'>
                <AdComponent />
            </div>
        </div>
    );
};

export default App;