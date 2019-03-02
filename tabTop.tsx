import * as React from 'react';
import { allTabs, Tab } from './data/tabs-data';

export type TabsConcern = ChoosenTabConcern;

export interface ChoosenTabConcern {
    about: 'tab-choosen';
    activeTab: Tab;
}
export interface TabsProps {
    activeTab: Tab;
    when: (concern: TabsConcern) => void;
}

export class Tabs extends React.Component<TabsProps> {
    render() {
        const { activeTab } = this.props;
        return <div className="tabs-top">
            {allTabs.map(tab => {
                return <a href="" key={tab.id}
                    className={tab.id === activeTab.id ? 'tab-item choosen' : 'tab-item'}
                    onClick={e => {
                        e.preventDefault();
                        this.props.when({
                            about: 'tab-choosen',
                            activeTab: tab,
                        });
                    }}
                >{tab.title}</a>;
            })}
        </div>;
    }
}
