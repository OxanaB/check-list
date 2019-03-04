import * as React from 'react';
import { Equipment, EquipmentConcern, EquipmentExternalConcern, EquipmentInternalConcern, EquipmentSeed } from './equipment';
import { Tanks, TanksConcern, TanksExternalConcern, TanksInternalConcern, TanksSeed } from './tanks';
import { broke } from './utils';
import { Weights, WeightsConcern, WeightsExternalConcern, WeightsInternalConcern, WeightsSeed } from './weights';

export type IntroBoatSituationInternalConcern =
    | { about: 'tanks', tanks: TanksInternalConcern }
    | { about: 'weights', weights: WeightsInternalConcern }
    | { about: 'equipment', equipment: EquipmentInternalConcern };


export type IntroBoatSituationExternalConcern = { about: 'tanks', tanks: TanksExternalConcern }
    | { about: 'weights', weights: WeightsExternalConcern }
    | { about: 'equipment', equipment: EquipmentExternalConcern };

export type IntroBoatSituationConcern = IntroBoatSituationInternalConcern | IntroBoatSituationExternalConcern;

export type IntroBoatSituationSeed = TanksSeed | WeightsSeed | EquipmentSeed;

export interface IntroBoatSituationProps {
    seed: IntroBoatSituationSeed;
    when: (concern: IntroBoatSituationConcern) => void;
}

export class IntroBoatSituation extends React.Component<IntroBoatSituationProps> {

    render() {
        const { seed, when } = this.props;
        switch (seed.kind) {
            case 'equipment': return <Equipment
                seed={seed} when={concern => when(
                    toSituationConcernFromEquipment(concern),
                )}
            />;
            case 'tanks': return <Tanks
                seed={seed} when={concern => when(
                    toSituationConcernFromTanks(concern),
                )}
            />;
            case 'weights': return <Weights
                seed={seed} when={concern => when(
                    toSituationConcernFromWeights(concern),
                )}
            />;
            default: return broke(seed);
        }
    }
}

function toSituationConcernFromEquipment(concern: EquipmentConcern): IntroBoatSituationConcern {
    if (concern.about === 'equipment-to-save') {
        return {about: 'equipment', equipment: concern };
    } else {
        return { about: 'equipment', equipment: concern };
    }
}

function toSituationConcernFromTanks(concern: TanksConcern): IntroBoatSituationConcern {
    if (concern.about === 'tanks-to-save') {
        return { about: 'tanks', tanks: concern };
    } else {
        return { about: 'tanks', tanks: concern };
    }
}


function toSituationConcernFromWeights(concern: WeightsConcern): IntroBoatSituationConcern {
    if (concern.about === 'weights-to-save') {
        return { about: 'weights', weights: concern };
    } else {
        return { about: 'weights', weights: concern };
    }
}
