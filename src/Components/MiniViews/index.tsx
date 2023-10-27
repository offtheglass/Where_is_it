import React from "react";
import './index.css';

interface MiniViewProps {
    floor: number;
    description: string;
}

const MiniView:React.FC<MiniViewProps> = ({ floor, description }) => {
    return (
        <div id="miniview-container">
            <span className="header-letters">
                {"Floor "}
            </span>
                {floor}F <br/>
            <span className="header-letters">
                {"Info "}
            </span>
                {description}
            {/* <button id="miniview-button">
                경로
            </button> */}
        </div>
    );
};
export default MiniView;