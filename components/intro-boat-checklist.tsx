import * as React from 'react';
import { $across, toStewardOf } from '../tools/stewarding';
import { broke } from '../tools/utils';
import { Equipment, EquipmentConcern, EquipmentSeed, faceEquipmentConcern } from './equipment';
import { ChoosenTabConcern, Tabs, TabsProps } from './tabTop';
import { faceTanksConcern, Tanks, TanksConcern, TanksSeed } from './tanks';
import { faceWeightsConcern, Weights, WeightsConcern, WeightsSeed } from './weights';


export type IntroBoatChecklistConcern =
    | { about: 'tanks', tanks: TanksConcern }
    | { about: 'weights', weights: WeightsConcern }
    | { about: 'equipment', equipment: EquipmentConcern }
    | ChoosenTabConcern;

export type ShowTabDataSeed = TanksSeed | WeightsSeed | EquipmentSeed;
export type ActiveTabKind = ShowTabDataSeed['kind'];

export interface IntroBoatChecklistSeed {
    tanks: TanksSeed;
    weights: WeightsSeed;
    equipment: EquipmentSeed;
    activeTabKind: ActiveTabKind;
}

function pickContentByActiveTabId(seed: IntroBoatChecklistSeed): ShowTabDataSeed {
    const { activeTabKind, equipment, tanks, weights } = seed;
    switch (activeTabKind) {
        case 'equipment': return equipment;
        case 'tanks': return tanks;
        case 'weights': return weights;
        default: return broke(activeTabKind);
    }
}

export interface IntroBoatChecklistProps {
    seed: IntroBoatChecklistSeed;
    when: (concern: IntroBoatChecklistConcern) => void;
}

export class IntroBoatChecklist extends React.Component<IntroBoatChecklistProps> {

    renderSituation() {
        const { when, seed } = this.props;
        const activeTabContent = pickContentByActiveTabId(seed);
        switch (activeTabContent.kind) {
            case 'equipment': return <Equipment
                seed={activeTabContent} when={concern => when({ about: 'equipment', equipment: concern })}
            />;
            case 'tanks': return <Tanks
                seed={activeTabContent} when={concern => when({ about: 'tanks', tanks: concern })}
            />;
            case 'weights': return <Weights
                seed={activeTabContent} when={concern => when({ about: 'weights', weights: concern })}
            />;
            default: return broke(activeTabContent);
        }
    }

    render() {
        const { seed: { activeTabKind: activeTabId } } = this.props;
        const tabsProps: TabsProps = {
            activeTabId,
            when: concern => {
                this.props.when(concern);
            },
        };
        return <div className="tabs-container">
            <Tabs {...tabsProps} />
            <div className="tabs-content">
                {this.renderSituation()}
            </div>
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
                activeTabKind: concern.activeTabId,
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
