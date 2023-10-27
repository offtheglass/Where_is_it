export interface BuildingData {
    name: string;
    floors: number;
    images: string[];
}

export const Buildings: Record<string, BuildingData> = {
    eng: {
        name: 'Engineering Hall',
        floors: 10,
        images: [],
    }
}