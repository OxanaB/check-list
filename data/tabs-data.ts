import { Equipment } from 'divemaster-checklist/equipment';
import { TanksProps } from 'divemaster-checklist/tanks';
import { Weights } from 'divemaster-checklist/weights';

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

export const tanks: TanksProps [] = {
    air12L: {
        value: 0,
        text: '',
        error: '',
    },
    air15L: {
        value: 0,
        text: '',
        error: '',
    },
    nitrox12L: {
        value: 0,
        text: '',
        error: '',
    },
    nitrox15L: {
        value: 0,
        text: '',
        error: '',
    },
};
export const weights: Weights [] = [{
    kiloPieces1: {
        value: 0,
        text: '',
        error: '',
    },
    kiloPieces2: {
        value: 0,
        text: '',
        error: '',
    },
    kiloPieces3: {
        value: 0,
        text: '',
        error: '',
    },
}];
export const equipment: Equipment[] = [ {
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
}];

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
