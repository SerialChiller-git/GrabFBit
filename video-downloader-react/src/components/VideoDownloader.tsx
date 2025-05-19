import React, { useState, useEffect } from 'react';
import FileSaver from 'file-saver';

const VideoDownloader: React.FC = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [response, setResponse] = useState('');
    const [totalProgress, setTotalProgress] = useState<number>(0);
    

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVideoUrl(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResponse('');
    
            const res = await fetch('http://localhost:8080/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: videoUrl }),
            });

            if (!res.ok) {
                setResponse('Error downloading video');
                return;
            }
            const textResponse = await res.text();
            setResponse(textResponse);
    };

    const saveVideo = async (videoUrl : string, filename= "vid.mp4") => {
       
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
                console.log("done");
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
        <div>
            <h1>Video downlaoder</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={videoUrl}
                    onChange={handleInputChange}
                    placeholder="Enter video URL"
                    required
                />
                <button type="submit">Download Video</button>
            </form>
            {response && 
                <div>
                    <button onClick={() => saveVideo(response)}>
                        Download
                    </button>
                </div>
            }
            {totalProgress > 0 && (
                <div>
                    <p>Download progress: {totalProgress.toFixed(2)}%</p>
                </div>
            )}
        </div>
    );
};

export default VideoDownloader;