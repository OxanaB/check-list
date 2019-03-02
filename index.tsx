import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Checklist, ChecklistConcern, ChecklistProps } from './checklist';
import { allTabs, equipment, tanks, weights } from './data/tabs-data';
import { EquipmentSeed } from './equipment';
import { SituationSeed } from './situation';
import { Tab } from './tabTop';
import { TanksSeed } from './tanks';
import { broke, to } from './utils';
import { WeightsSeed } from './weights';

interface AppState {
    weights: WeightsSeed;
    tanks: TanksSeed;
    equipment: EquipmentSeed;
    allTabs: Tab[];
    activeTabId: number;
    situation: SituationSeed;
}


class App extends React.Component<{}, AppState> {

    state = to<AppState>({
        activeTabId: allTabs[0].id,
        allTabs,
        situation: tanks,
        equipment,
        tanks,
        weights,
    });

    private whenChecklist: (concern: ChecklistConcern) => void = concern => {
        switch(concern.about) {
            case 'equipment':
            case 'tab-choosen':
            case 'tanks':
            case 'weights':
                console.log(concern);
                return;
            default: return broke(concern);
        }
    }

    render() {
        const { state: { activeTabId, allTabs, situation } } = this;
        const props: ChecklistProps = {
            activeTabId,
            allTabs,
            situation,
            when: this.whenChecklist,
        };
        return <Checklist {...props} />;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
