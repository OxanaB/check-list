import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { allTabs } from './data/tabs-data';
import { Tabs, TabsConcern, TabsProps } from './tabs';
import { broke, to } from './utils';

class App extends React.Component<{}, TabsProps> {

    private when = (concern: TabsConcern): void =>{
        switch (concern.about) {
            case 'tab-choosen': {
                this.setState({
                    activeTab: concern.activeTab,
                });
                break;
            }
            case 'tab-input-change': {
                const { item, itemValue } = concern;
                this.setState({
                    item,
                    itemValue,
                });
                break;
            }
            case 'tab-on-submit': {
                console.log('button submited');
                break;
            }
            default: return broke(concern);
        }
    }
    state = to<TabsProps>({
        activeTab: allTabs[0],
        itemValue: '',
        item: null,
        when: this.when,
    });
    render() {
        const { state } = this;
        return <>
            <Tabs {...state} />
        </>;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
