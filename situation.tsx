import * as React from 'react';
import { Equipment, EquipmentConcern, EquipmentSeed } from './equipment';
import { Tanks, TanksConcern, TanksSeed } from './tanks';
import { broke } from './utils';
import { Weights, WeightsConcern, WeightsSeed } from './weights';

export type SituationConcern =
    | { about: 'tanks', tanks: TanksConcern }
    | { about: 'weights', weights: WeightsConcern }
    | { about: 'equipment', equipment: EquipmentConcern };

export type SituationSeed = TanksSeed | WeightsSeed | EquipmentSeed;
export interface SituationProps {
    seed: SituationSeed;
    when: (concern: SituationConcern) => void;
}

export class Situation extends React.Component<SituationProps> {
    render() {
        const { seed, when } = this.props;
        switch (seed.kind) {
            case 'equipment': return <Equipment
                seed={seed} when={concern => when({ about: 'equipment', equipment: concern })}
            />;
            case 'tanks': return <Tanks
                seed={seed} when={concern => when({ about: 'tanks', tanks: concern })}
            />;
            case 'weights': return <Weights
                seed={seed} when={concern => when({ about: 'weights', weights: concern })}
            />;
            default: return broke(seed);
        }
    }
}
