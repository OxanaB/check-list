import { EquipmentSeed } from 'divemaster-checklist/equipment';
import { Tab } from 'divemaster-checklist/tabTop';
import { TanksSeed } from 'divemaster-checklist/tanks';
import { WeightsSeed } from 'divemaster-checklist/weights';


export const tanks: TanksSeed = {
    kind: 'tanks',
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
export const weights: WeightsSeed = {
    kind: 'weights',
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
    totalWeights: 0,
};
export const equipment: EquipmentSeed = {
    kind: 'equipment',
    masks: {
        value: 0,
        text: '',
        error: '',
    },
    snorkels: {
        value: 0,
        text: '',
        error: '',
    },
    bcds: {
        value: 0,
        text: '',
        error: '',
    },
    regulators: {
        value: 0,
        text: '',
        error: '',
    },
    shorty: {
        value: 0,
        text: '',
        error: '',
    },
    fins: {
        value: 0,
        text: '',
        error: '',
    },
};

export const allTabs: Tab[] = [
    {
        id: 1001,
        title: 'Tanks',
    },
    {
        id: 1002,
        title: 'Weights',
    },
    {
        id: 1003,
        title: 'Equipment',
    },
];
