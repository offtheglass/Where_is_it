import React from "react";

interface MiniViewProps {
    description: string;
}

const MiniView:React.FC<MiniViewProps> = ({ description }) => {
    return (
        <div id="miniview-container">
            <div id="miniview-content">
                {description}
            </div>
        </div>
    );
};
export default MiniView;