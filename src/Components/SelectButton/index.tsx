import React from "react";
import "./index.css"

interface SelectButtonProps {
    showMarkers: (type: string) => void;
}

const SelectButton: React.FC<SelectButtonProps> = ({ showMarkers }) => {
    return (
        <div id="buttons-container">
            <button onClick = {() => showMarkers('toilet')}> 🚽 Toilet </button>
            <button onClick = {() => showMarkers('trash')}> 🗑️ Bins </button>
            <button onClick = {() => showMarkers('water')}> 💧 Drinks </button>
            <button onClick = {() => showMarkers('safe')}> Safety </button>
            <button onClick = {() => showMarkers('misc')}> Misc. </button>
        </div>
    );
};
export default SelectButton;