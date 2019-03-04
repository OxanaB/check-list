import * as React from 'react';
import { Equipment, EquipmentConcern, EquipmentSeed } from './equipment';
import { ChoosenTabConcern, Tab, Tabs, TabsProps } from './tabTop';
import { Tanks, TanksConcern, TanksSeed } from './tanks';
import { broke } from './utils';
import { Weights, WeightsConcern, WeightsSeed } from './weights';

export type IntroBoatChecklistConcern =
    | { about: 'tanks', tanks: TanksConcern }
    | { about: 'weights', weights: WeightsConcern }
    | { about: 'equipment', equipment: EquipmentConcern }
    | ChoosenTabConcern;

type SituationSeed = TanksSeed | WeightsSeed | EquipmentSeed;
export interface IntroBoatChecklistSeed {
    allTabs: Tab[];
    activeTabId: string;
    situation: SituationSeed;
}
export interface IntroBoatChecklistProps {
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
        const { seed: { situation } } = this.props;
        const { activeTabId, allTabs } = this.props.seed;
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
