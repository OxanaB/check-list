import * as React from 'react';
import { Tab } from './data/tabs-data';

export type BottomTabConcern = TabSubmitConcern | TabInputChangeConcern;

export interface TabInputChangeConcern {
    about: 'tab-input-change';
    item: string;
    itemValue: string;
}
export interface TabSubmitConcern {
    about: 'tab-on-submit';
}

export interface BottomTabProps {
    activeTab: Tab;
    itemValue: string;
    totalWeights: number;
    when: (concern: BottomTabConcern) => void;
}

export class BottomTab extends React.Component<BottomTabProps> {
    render() {
        const { activeTab, itemValue, totalWeights } = this.props;
        return <div className="tabs-bottom">
            <div>
                <form className="bottom-item">
                    {activeTab.data.map(item => {
                        return <label key={item}>
                            {item}
                            <input type="string" value={itemValue} placeholder="0"
                            />
                        </label>;
                    })}
                </form>;
            </div>
            {activeTab.title === 'Weights'
                ? <div>Total weigths: {totalWeights}</div>
                : null
            }
            <button onSubmit={() => {
                this.props.when({
                    about: 'tab-on-submit',
                });
            }}>SAVE</button>
        </div>;
    }
}
