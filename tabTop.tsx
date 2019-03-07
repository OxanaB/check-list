import * as React from 'react';
import { ActiveTabId } from './intro-boat-checklist';

export interface Tab {
    kind: ActiveTabId;
    title: string;
}
export interface ChoosenTabConcern {
    about: 'tab-choosen';
    activeTabId: ActiveTabId;
}

export interface TabsProps {
    activeTabId: string;
    when: (concern: ChoosenTabConcern) => void;
}

export class Tabs extends React.Component<TabsProps> {
    render() {
        const { activeTabId } = this.props;
        return <div className="tabs-top">
            {allTabs.map(tab => {
                return <a href="" key={tab.title}
                    className={tab.kind === activeTabId ? 'tab-item choosen' : 'tab-item'}
                    onClick={e => {
                        e.preventDefault();
                        this.props.when({
                            about: 'tab-choosen',
                            activeTabId: tab.kind,
                        });
                    }}
                >{tab.title}</a>;
            })}
        </div>;
    }
}

export const allTabs: Tab[] = [
    {
        kind: 'tanks',
        title: 'Tanks',
    },
    {
        kind: 'weights',
        title: 'Weights',
    },
    {
        kind: 'equipment',
        title: 'Equipment',
    },
];
