import type React from "react";
import './TopBar.css';

const TopBar : React.FC = () => {
    return(
        <div>
            <div className="titlebg">
                <span className="topbar-title">GrabFBit</span>
            </div>

            <div className="mainContainer">
                <span className="mainContainer-text">GrabFbit</span>
            </div>
        </div>
    );
}

export default TopBar;