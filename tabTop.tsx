
import * as React from 'react';
import { allTabs, Tab } from './data/tabs-data';

export type TopTabConcern = ChoosenTabConcern;

export interface ChoosenTabConcern {
    about: 'tab-choosen';
    activeTab: Tab;
}
export interface TopTabProps {
    activeTab: Tab;
    when: (concern: TopTabConcern) => void;
}

export class TopTab extends React.Component<TopTabProps> {
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
