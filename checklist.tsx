import * as React from 'react';
import { Tab } from './data/tabs-data';
import { Situation, SituationConcern, SituationProps } from './situation';
import { Tabs, TabsProps } from './tabTop';

export type ChecklistConcern = SituationConcern;

export interface ChecklistProps {
    situation: SituationProps;
    activeTab: Tab;
    when: (concern: ChecklistConcern) => void;
}
export class Checklist extends React.Component<ChecklistProps> {
    render() {
        const { activeTab, tanks, weights, equipment } = this.props;
        const tabsProps: TabsProps = {
            activeTab,
            when: concern => {
                this.props.when(concern);
            },
        };
        const situationProps: SituationProps = {
            activeTab, tanks, weights, equipment,
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
