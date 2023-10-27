import React from "react";
import "./index.css"

interface SelectButtonProps {
    showMarkers: (type: string) => void;
    change_MarkersClicked: () => void;
    clicked:boolean;

}

const SelectButton: React.FC<SelectButtonProps> = ({ showMarkers,change_MarkersClicked,clicked }) => {
    
    const show_and_hide_Markers = (marker:string) =>{
        if(clicked===false){
            showMarkers(marker);
            change_MarkersClicked();
        }
        else{
            change_MarkersClicked();
            
        }
}
    return (
        <div id="buttons-container">
            <button className={"facility-button"} onClick = {()=> show_and_hide_Markers('toilet')}> Toilet </button>
            <button className={"facility-button"} onClick = {() => show_and_hide_Markers('trash')}> Bins </button>
            <button className={"facility-button"} onClick = {() => show_and_hide_Markers('water')}> Drinks </button>
            <button className={"facility-button"} onClick = {() => show_and_hide_Markers('safe')}> Emergency </button>
            <button className={"facility-button"} onClick = {() => show_and_hide_Markers('water')}> Misc </button>
        </div>
    );
};
export default SelectButton;