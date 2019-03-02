import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Checklist, ChecklistConcern, ChecklistProps } from './checklist';
import { allTabs } from './data/tabs-data';
import { broke, to } from './utils';

class App extends React.Component<{}, ChecklistProps> {

    private when = (concern: ChecklistConcern): void => {
        switch (concern.about) {
            case 'tab-choosen': {
                this.setState({
                    activeTab: concern.activeTab,
                });
                break;
            }
            case 'tab-input-change': {
                break;
            }
            case 'tab-on-submit': {
                console.log('button submited');
                break;
            }
            default: return broke(concern);
        }
    }
    state = to<ChecklistProps>({
        activeTab: allTabs[0],
        item: null,
        totalWeights: 0,
        when: this.when,
    });
    render() {
        const { state } = this;
        return <>
            <Checklist {...state} />
        </>;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
