import * as React from 'react';
import { Situation, SituationExternalConcern, SituationInternalConcern, SituationProps, SituationSeed } from './situation';
import { ChoosenTabConcern, Tab, Tabs, TabsProps } from './tabTop';

export type ChecklistInternalConcern = SituationInternalConcern;
export type ChecklistExternalConcern = SituationExternalConcern | ChoosenTabConcern;
export type ChecklistConcern = ChecklistInternalConcern | ChecklistExternalConcern ;

export interface ChecklistSeed {
    allTabs: Tab[];
    activeTabId: number;
    situation: SituationSeed;
}
export interface ChecklistProps {
    seed: ChecklistSeed;
    when: (concern: ChecklistConcern) => void;
}
export class Checklist extends React.Component<ChecklistProps> {
    render() {
        const { seed: { situation, allTabs, activeTabId } } = this.props;
        const tabsProps: TabsProps = {
            activeTabId,
            allTabs,
            when: concern => {
                this.props.when(concern);
            },
        };
        const situationProps: SituationProps = {
            seed: situation,
            when: concern => {
                this.props.when(concern);
            },
        };
        return <div className="tabs-container">
            <Tabs {...tabsProps} />
            <Situation {...situationProps} />
        </div>;
    }
}
