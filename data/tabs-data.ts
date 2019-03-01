export interface Tab {
    id: number;
    title: string;
    data: string[];
}

export const tanks: string[] = ['air 12L', 'air 15L', 'nitrox 12L', 'nitrox 15L'];

export const weights: string[] = ['1 kilo-pieces', '2 kilo-pieces', '3 kilo-pieces'];

export const equipment: string[] = ['Masks: ', 'Snorkels: ', 'BCDs: ', 'Regulators: ', 'Shorty: ', 'Fins: '];

export const allTabs: Tab[] = [
    {
        id: 1001,
        title: 'Tanks',
        data: tanks,
    },
    {
        id: 1002,
        title: 'Weights',
        data: weights,
    },
    {
        id: 1003,
        title: 'Equipment',
        data: equipment,
    },
];
