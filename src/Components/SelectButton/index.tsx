import React from "react";
import "./index.css"

interface SelectButtonProps {
    showMarkers: (type: string) => void;
}

const SelectButton: React.FC<SelectButtonProps> = ({ showMarkers }) => {
    return (
        <div id="buttons-container">
            <button className = "facility-button" onClick = {() => showMarkers('toilet')}> Toilet </button>
            <button className = "facility-button" onClick = {() => showMarkers('trash')}> Bins </button>
            <button className = "facility-button" onClick = {() => showMarkers('water')}> Drinks </button>
            <button className = "facility-button" onClick = {() => showMarkers('safe')}> Emergency </button>
            <button className = "facility-button" onClick = {() => showMarkers('misc')}> Misc. </button>
        </div>
    );
};
export default SelectButton;