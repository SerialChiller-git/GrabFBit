import React, { useState } from 'react';
import './VideoDownloader.css';
import AdComponent from './AdComponent';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VideoDownloader: React.FC = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [response, setResponse] = useState('');
    const [totalProgress, setTotalProgress] = useState<number>(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const [urlLoaded, setUrlLoaded] = useState(false);
    const [filename, setFilename] = useState<string>('');
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVideoUrl(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResponse('');
    
            const res = await fetch('https://vid-downloader.onrender.com/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: videoUrl }),
            });

            if (!res.ok) {
               toast.info("Invalid URL", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                });
                setResponse('Error downloading video');
                return;
            }
            const textResponse = await res.text();
            setResponse(textResponse);
            setUrlLoaded(true);
    };

    const saveVideo = async (videoUrl : string, filename= "vid.mp4") => {
        setIsDownloading(true);
        if(filename === '') {
            const now = new Date();
            filename = now.toISOString().replace(/:/g, '-') + '.mp4';
        }
       
        const resp = await fetch(videoUrl);

        if (!resp.ok) {
            throw new Error("Failed to fetch video");
        }
        if(!resp?.body) return;

        const contentLength = resp.headers.get('Content-Length');
        const totalLength = contentLength ? parseInt(contentLength, 10) : 0;
        //console.log("Total length: ", totalLength);
        const reader = resp.body.getReader();
        const chunks = [];
        let receivedLength : number  = 0; // received bytes
        while(true){
            const {done, value} = await reader.read();
            if(done) {
                setIsDownloading(false);
                setUrlLoaded(false);
                break;   
            }
            chunks.push(value);
            receivedLength += value.length;
            const progress = (receivedLength / totalLength) * 100;
            setTotalProgress(progress);
        }

        const blob = new Blob(chunks);


         //console.log(blob);
         const url = URL.createObjectURL(blob);
         const a = document.createElement('a');
         a.href = url;
         a.download = filename;
         const revokeObjectURL = () => {
             setTimeout(() => {
                 URL.revokeObjectURL(url);
                 a.removeEventListener('click', revokeObjectURL);
                }, 150);
            };
            a.addEventListener('click', revokeObjectURL, false);
            a.click();
         }
    

    return (
        <div className='main-container'>
            <h1 className='title'>GrabFBit</h1>
            <h3 className='subtitle'>Download any facebook or instagram video using the link</h3>
            <form className='submitForm' onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={videoUrl}
                    onChange={handleInputChange}
                    placeholder="Enter video URL"
                    required
                />
                <button type="submit">Download Video</button>
            </form>
            {urlLoaded && 
                <div className='response'>
                    <input id='filename' type="text" value={filename} onChange={
                        (e) => setFilename(e.target.value)
                    } placeholder="Enter File Name" />
                    <button onClick={() => saveVideo(response, filename)}>
                        Download
                    </button>
                </div>
            }
            {isDownloading && (
                <div className='progress'>
                    <p>Download progress: {totalProgress.toFixed(2)}%</p>
                </div>
            )}
            <div className='ad-container'>
                <AdComponent />
            </div>

        </div>
    );
};

export default VideoDownloader;