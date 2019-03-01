import * as React from 'react';
import { Tab } from './data/tabs-data';
import { BottomTab, BottomTabConcern, BottomTabProps } from './tabBottom';
import { TopTab, TopTabConcern, TopTabProps } from './tabTop';

export type TabsConcern = TopTabConcern | BottomTabConcern;

export interface TabsProps {
    activeTab: Tab;
    item: string | null;
    itemValue: string;
    when: (concern: TabsConcern) => void;
}
export class Tabs extends React.Component<TabsProps> {
    render() {
        const { activeTab, itemValue } = this.props;
        const topTabProps: TopTabProps = {
            activeTab,
            when: concern => {
                this.props.when(concern);
            },
        };
        const bottomTabProps: BottomTabProps = {
            activeTab, itemValue,
            when: concern => {
                this.props.when(concern);
            },
        };
        return <div className="tabs-container">
            <TopTab {...topTabProps}/>
            <BottomTab {...bottomTabProps}/>
        </div>;
    }
}
