import * as React from 'react';
import { IntroBoatSituation, IntroBoatSituationExternalConcern, IntroBoatSituationInternalConcern, IntroBoatSituationProps, IntroBoatSituationSeed } from './situation';
import { ChoosenTabConcern, Tab, Tabs, TabsProps } from './tabTop';

export type IntroBoatChecklistInternalConcern = IntroBoatSituationInternalConcern;
export type IntroBoatChecklistExternalConcern = IntroBoatSituationExternalConcern | ChoosenTabConcern;
export type IntroBoatChecklistConcern = IntroBoatChecklistInternalConcern | IntroBoatChecklistExternalConcern ;

export interface IntroBoatChecklistSeed {
    allTabs: Tab[];
    activeTabId: number;
    situation: IntroBoatSituationSeed;
}
export interface IntroBoatChecklistProps {
    seed: IntroBoatChecklistSeed;
    when: (concern: IntroBoatChecklistConcern) => void;
}
export class IntroBoatChecklist extends React.Component<IntroBoatChecklistProps> {
    render() {
        const { seed: { situation, allTabs, activeTabId } } = this.props;
        const tabsProps: TabsProps = {
            activeTabId,
            allTabs,
            when: concern => {
                this.props.when(concern);
            },
        };
        const situationProps: IntroBoatSituationProps = {
            seed: situation,
            when: concern => {
                this.props.when(concern);
            },
        };
        return <div className="tabs-container">
            <Tabs {...tabsProps} />
            <IntroBoatSituation {...situationProps} />
        </div>;
    }
}
