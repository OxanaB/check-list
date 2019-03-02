import * as React from 'react';

export type TabsConcern = ChoosenTabConcern;
export interface Tab {
    id: number;
    title: string;
}
export interface ChoosenTabConcern {
    about: 'tab-choosen';
    activeTab: Tab;
}
export interface TabsProps {
    activeTabId: number;
    allTabs: Tab[];
    when: (concern: TabsConcern) => void;
}

export class Tabs extends React.Component<TabsProps> {
    render() {
        const { activeTabId, allTabs } = this.props;
        return <div className="tabs-top">
            {allTabs.map(tab => {
                return <a href="" key={tab.id}
                    className={tab.id === activeTabId ? 'tab-item choosen' : 'tab-item'}
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
