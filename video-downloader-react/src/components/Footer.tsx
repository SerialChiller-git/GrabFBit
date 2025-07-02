import type React from "react";
import './Footer.css'

const Footer : React.FC = () => {
    return(
        <div className="footerContainer">
            <img className="bottom-button" src="/free-down.gif" alt="GNU Linux" />
            <img className="bottom-button" src="/besteyes_ani.gif" alt="GNU Linux" />
            <img className="bottom-button" src="/dball2k.gif" alt="GNU Linux" 
            onClick={
                () => window.open("https://anilist.co/search/anime", "_blank")
            }
            />
            <img className="bottom-button" src="/firefoxget.gif" alt="GNU Linux" 
            onClick={
                () => window.open("https://www.mozilla.org/en-US/firefox/new/?utm_campaign=SET_DEFAULT_BROWSER", "_blank")
            }
            />
            <img className="bottom-button" src="/ffmpeg.gif" alt="GNU Linux" 
            onClick={
                () => window.open("https://ffmpeg.org/", "_blank")
            }
            />
            <img className="bottom-button" src="/lovelyday.gif" alt="GNU Linux" 
            // onClick={
            //     () => window.open("", "_blank")
            // }
            />
            <img className="bottom-button" src="/fckgoogle.gif" alt="GNU Linux" 
            onClick={
                () => window.open("https://duckduckgo.com/", "_blank")
            }
            />
            <img className="bottom-button" src="/legalize_now.gif" alt="GNU Linux" 
            // onClick={
            //     () => window.open("", "_blank")
            // }
            />
        </div>
    );
}

export default Footer;