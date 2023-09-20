export interface MarkerData {
    latitude: number;
    longitude: number;
    id: string;
    description: string;
}
  
export const toiletMarkers: MarkerData[] = [
    {latitude: 51.51, longitude: -0.1, id: "T121", description: "3rd floor"},
    {latitude: 51.50, longitude: -0.09, id:"T122", description: "1st floor"},
];
  
export const trashMarkers: MarkerData[] = [
    {latitude: 51.52, longitude: -0.11, id: "R121", description: "1st floor"},
];

export const waterMarkers: MarkerData[] = [
    {latitude: 51.50, longitude: -0.08, id: "W121", description: "1st floor"},
];

export const printerMarkers: MarkerData[] = [
    {latitude: 51.49, longitude: -0.09, id: "P121", description: "1st floor"},
    {latitude: 51.53, longitude: -0.07, id: "P122", description: "2nd floor"},
];