import React from "react";
import "./index.css"

interface SelectButtonProps {
    showMarkers: (type: string) => void;
}

const SelectButton: React.FC<SelectButtonProps> = ({ showMarkers }) => {
    return (
        <div id="buttons-container">
            <button onClick = {() => showMarkers('toilet')}> 🚽 Toilet </button>
            <button onClick = {() => showMarkers('trash')}> 🗑️ Trash Can </button>
            <button onClick = {() => showMarkers('water')}> 💧 Water Fountain </button>
        </div>
    );
};
export default SelectButton;