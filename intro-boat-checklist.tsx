import * as React from 'react';
import { Equipment, EquipmentConcern, EquipmentSeed, faceEquipmentConcern } from './equipment';
import { $across, toStewardOf } from './stewarding';
import { ChoosenTabConcern, Tab, Tabs, TabsProps } from './tabTop';
import { faceTanksConcern, Tanks, TanksConcern, TanksSeed } from './tanks';
import { broke } from './utils';
import { faceWeightsConcern, Weights, WeightsConcern, WeightsSeed } from './weights';

export type IntroBoatChecklistConcern =
    | { about: 'tanks', tanks: TanksConcern }
    | { about: 'weights', weights: WeightsConcern }
    | { about: 'equipment', equipment: EquipmentConcern }
    | ChoosenTabConcern;

export type SituationSeed = TanksSeed | WeightsSeed | EquipmentSeed;

export interface IntroBoatChecklistSeed {
    tanks: TanksSeed;
    weights: WeightsSeed;
    equipment: EquipmentSeed;
    activeTabId: string;
    allTabs: Tab[];
}

export interface IntroBoatChecklistProps {
    situation: SituationSeed;
    seed: IntroBoatChecklistSeed;
    when: (concern: IntroBoatChecklistConcern) => void;
}

export class IntroBoatChecklist extends React.Component<IntroBoatChecklistProps> {

    renderSituation(seed: SituationSeed) {
        const { when } = this.props;
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

    render() {
        const { seed: { activeTabId, allTabs } } = this.props;
        const { situation } = this.props;
        const tabsProps: TabsProps = {
            activeTabId,
            allTabs,
            when: concern => {
                this.props.when(concern);
            },
        };
        return <div className="tabs-container">
            <Tabs {...tabsProps} />
            {this.renderSituation(situation)}
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
                ...oldSeed, activeTabId: concern.activeTabId,
            };
        }
        case 'equipment': return inIntroBoatChecklistSeed.equipment[$across](
            oldSeed,
            oldGear => faceEquipmentConcern(oldGear, concern.equipment),
        );
        case 'weights': return inIntroBoatChecklistSeed.weights[$across](
            oldSeed,
            oldWeights => faceWeightsConcern(oldWeights, concern.weights),
        );
        case 'tanks': return inIntroBoatChecklistSeed.tanks[$across](
            oldSeed,
            oldTanks => faceTanksConcern(oldTanks, concern.tanks),
        );
        default: return broke(concern);
    }
}
