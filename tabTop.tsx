import * as React from 'react';

export interface Tab {
    title: string;
}
export interface ChoosenTabConcern {
    about: 'tab-choosen';
    activeTab: Tab;
}

export interface TabsProps {
    allTabs: Tab[];
    activeTabId: string;
    when: (concern: ChoosenTabConcern) => void;
}

export class Tabs extends React.Component<TabsProps> {
    render() {
        const { activeTabId, allTabs } = this.props;
        return <div className="tabs-top">
            {allTabs.map(tab => {
                return <a href="" key={tab.title}
                    className={tab.title === activeTabId ? 'tab-item choosen' : 'tab-item'}
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

export const allTabs: Tab[] = [
    {
        title: 'Tanks',
    },
    {
        title: 'Weights',
    },
    {
        title: 'Equipment',
    },
];
