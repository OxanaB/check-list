import * as React from 'react';
import { Situation, SituationConcern, SituationProps, SituationSeed } from './situation';
import { ChoosenTabConcern, Tab, Tabs, TabsProps } from './tabTop';

export type ChecklistConcern = SituationConcern | ChoosenTabConcern;

export interface ChecklistProps {
    allTabs: Tab[];
    activeTabId: number;
    situation: SituationSeed;
    when: (concern: ChecklistConcern) => void;
}
export class Checklist extends React.Component<ChecklistProps> {
    render() {
        const { situation, allTabs, activeTabId } = this.props;
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
            <Tabs {...tabsProps}/>
            <Situation {...situationProps}/>
        </div>;
    }
}
