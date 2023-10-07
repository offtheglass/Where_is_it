export interface MarkerData {
    latitude: number;
    longitude: number;
    id: string;
    description: string;
}
  
export const toiletMarkers: MarkerData[] = [
    {latitude: 37.5619, longitude: 126.9363, id: "T121", description: "3rd floor"},
    {latitude: 37.5620, longitude: 126.9362, id:"T122", description: "1st floor"},
];
  
export const trashMarkers: MarkerData[] = [
    {latitude: 37.5621, longitude: 126.9364, id: "R121", description: "1st floor"},
];

export const waterMarkers: MarkerData[] = [
    {latitude: 37.5617, longitude: 126.9361, id: "W121", description: "1st floor"},
];

export const miscMarkers: MarkerData[] = [
    {latitude: 37.5618, longitude: 126.9365, id: "M121", description: "lockers"},
    {latitude: 37.5623, longitude: 126.9362, id: "M122", description: "printer"},
    {latitude: 37.5623, longitude: 126.9362, id: "M123", description: "convenience store"},
];

export const safeMarkers: MarkerData[] = [
    {latitude: 37.5618, longitude: 126.9365, id: "S121", description: "fire extinguisher"},
    {latitude: 37.5618, longitude: 126.9365, id: "S122", description: "chemical safety"},
    {latitude: 37.5618, longitude: 126.9365, id: "S123", description: "defibrillator"},
]

