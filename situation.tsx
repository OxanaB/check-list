import * as React from 'react';
import { Tab } from './data/tabs-data';
import { EquipmentConcern, EquipmentProps } from './equipment';
import { TanksConcern, TanksProps } from './tanks';
import { WeightsConcern, WeightsProps } from './weights';

export type SituationConcern = TanksConcern | WeightsConcern | EquipmentConcern;

export interface SituationProps {
    tanks: TanksProps;
    weights: WeightsProps;
    equipment: EquipmentProps;
    activeTab: Tab;
    when: (concern: SituationConcern) => void;
}

export class Situation extends React.Component<SituationProps> {
    render() {
        return <div className="tabs-bottom">
        </div>;
    }
}
