import * as React from 'react';
import { Equipment, equipment, EquipmentConcern, EquipmentSeed, faceEquipmentConcern } from './equipment';
import { $across, toStewardOf } from './stewarding';
import { ChoosenTabConcern, Tabs, TabsProps } from './tabTop';
import { faceTanksConcern, Tanks, tanks, TanksConcern, TanksSeed } from './tanks';
import { broke } from './utils';
import { faceWeightsConcern, Weights, weights, WeightsConcern, WeightsSeed } from './weights';

export type IntroBoatChecklistConcern =
    | { about: 'tanks', tanks: TanksConcern }
    | { about: 'weights', weights: WeightsConcern }
    | { about: 'equipment', equipment: EquipmentConcern }
    | ChoosenTabConcern;

export type ShowTabDataSeed = TanksSeed | WeightsSeed | EquipmentSeed;
export type ActiveTabId = ShowTabDataSeed['kind'];

export interface IntroBoatChecklistSeed {
    tanks: TanksSeed;
    weights: WeightsSeed;
    equipment: EquipmentSeed;
    activeTabId: ActiveTabId;
}

function pickContentByActiveTabId(seed: IntroBoatChecklistSeed): ShowTabDataSeed {
    const { activeTabId, equipment, tanks, weights } = seed;
    switch (activeTabId) {
        case 'equipment': return equipment;
        case 'tanks': return tanks;
        case 'weights': return weights;
        default: return broke(activeTabId);
    }
}

export interface IntroBoatChecklistProps {
    seed: IntroBoatChecklistSeed;
    when: (concern: IntroBoatChecklistConcern) => void;
}

export class IntroBoatChecklist extends React.Component<IntroBoatChecklistProps> {

    renderSituation() {
        const { when, seed } = this.props;
        const situation = pickContentByActiveTabId(seed);
        switch (situation.kind) {
            case 'equipment': return <Equipment
                seed={equipment} when={concern => when({ about: 'equipment', equipment: concern })}
            />;
            case 'tanks': return <Tanks
                seed={tanks} when={concern => when({ about: 'tanks', tanks: concern })}
            />;
            case 'weights': return <Weights
                seed={weights} when={concern => when({ about: 'weights', weights: concern })}
            />;
            default: return broke(situation);
        }
    }

    render() {
        const { seed: { activeTabId } } = this.props;
        const tabsProps: TabsProps = {
            activeTabId,
            when: concern => {
                this.props.when(concern);
            },
        };
        return <div className="tabs-container">
            <Tabs {...tabsProps} />
            {this.renderSituation()}
        </div>;
    }
}

const inIntroBoatChecklistSeed = toStewardOf<IntroBoatChecklistSeed>();

export function faceIntoBoatCheckListConsern(
    oldSeed: IntroBoatChecklistSeed,
    concern: IntroBoatChecklistConcern,
): IntroBoatChecklistSeed {
    switch (concern.about) {
        case 'tab-choosen': {
            return {
                ...oldSeed,
                activeTabId: concern.activeTabId,
            };
        }
        case 'equipment': return inIntroBoatChecklistSeed.equipment[$across](
            oldSeed,
            oldEquipment => faceEquipmentConcern(oldEquipment, concern.equipment),
        );
        case 'tanks': return inIntroBoatChecklistSeed.tanks[$across](
            oldSeed,
            oldTanks => faceTanksConcern(oldTanks, concern.tanks),
        );
        case 'weights': return inIntroBoatChecklistSeed.weights[$across](
            oldSeed,
            oldWeights => faceWeightsConcern(oldWeights, concern.weights),
        );
        default: return broke(concern);
    }
}
