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
    when: (concern: BottomTabConcern) => void;
}

export class BottomTab extends React.Component<BottomTabProps> {
    render() {
        const { activeTab, itemValue } = this.props;
        return <div className="tabs-bottom">
            <div>{activeTab.data.map(item => {
                return <form key={item} className="bottom-item"
                    onChange={e => {
                        this.props.when({
                            about: 'tab-input-change',
                            item,
                            itemValue: e.currentTarget.value,
                        });
                    }}>
                    <label >
                        {item}
                        <input type="string" value={itemValue}
                            placeholder="0" />
                    </label>
                </form>;
            })}
            </div>
            <button onSubmit={() => {
                this.props.when({
                    about: 'tab-on-submit',
                });
            }}>SAVE</button>
        </div>;
    }
}
