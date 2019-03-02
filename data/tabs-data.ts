export interface Tab {
    id: number;
    title: string;
    data: {};
}
export interface Field {
    value: number | null;
    text: string;
    error: string;
}

export interface Tanks {
    'air 12L': Field;
    'air 15L': Field;
    'nitrox 12L': Field;
    'nitrox 15L': Field;
}

export interface Weights {
    '1 kilo-pieces': Field;
    '2 kilo-pieces': Field;
    '3 kilo-pieces': Field;
}

export interface Equipment {
    Masks: Field;
    Snorkels: Field;
    BCDs: Field;
    Regulators: Field;
    Shorty: Field;
    Fins: Field;
}

export const tanks: Tanks = {
    'air 12L': {
        value: 0,
        text: '',
        error: '',
    },
    'air 15L': {
        value: 0,
        text: '',
        error: '',
    },
    'nitrox 12L': {
        value: 0,
        text: '',
        error: '',
    },
    'nitrox 15L': {
        value: 0,
        text: '',
        error: '',
    },
};
export const weights: Weights = {
    '1 kilo-pieces': {
        value: 0,
        text: '',
        error: '',
    },
    '2 kilo-pieces': {
        value: 0,
        text: '',
        error: '',
    },
    '3 kilo-pieces': {
        value: 0,
        text: '',
        error: '',
    },
};
export const equipment: Equipment = {
    Masks: {
        value: 0,
        text: '',
        error: '',
    },
    Snorkels: {
        value: 0,
        text: '',
        error: '',
    },
    BCDs: {
        value: 0,
        text: '',
        error: '',
    },
    Regulators: {
        value: 0,
        text: '',
        error: '',
    },
    Shorty: {
        value: 0,
        text: '',
        error: '',
    },
    Fins: {
        value: 0,
        text: '',
        error: '',
    },
};

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
