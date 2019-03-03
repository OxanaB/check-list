import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Checklist, ChecklistConcern, ChecklistProps } from './checklist';
import { allTabs, equipment, tanks, weights } from './data/tabs-data';
import { EquipmentConcern, EquipmentSeed, faceEquipmentInternalConcern } from './equipment';
import { SituationSeed } from './situation';
import { $on, toStewardOf } from './stewarding';
import { Tab } from './tabTop';
import { faceTanksInternalConcern, TanksConcern, TanksSeed } from './tanks';
import { broke, crash, to } from './utils';
import { faceWeightsInternalConcern, WeightsConcern, WeightsSeed } from './weights';



interface AppState {
    weights: WeightsSeed;
    tanks: TanksSeed;
    equipment: EquipmentSeed;
    allTabs: Tab[];
    activeTabId: number;
    situation: SituationSeed;
}

type AppConcern = ChecklistConcern;

class App extends React.Component<{}, AppState> {

    state = to<AppState>({
        activeTabId: allTabs[0].id,
        allTabs,
        situation: tanks,
        equipment,
        tanks,
        weights,
    });

    render() {
        const { state: { activeTabId, allTabs, situation } } = this;
        const props: ChecklistProps = {
            seed: {
                activeTabId,
                allTabs,
                situation,
            },
            when: concern => {
                const oldState = this.state;
                const newState = faceAppConcern(oldState, concern);
                this.setState(newState);
            },
        };
        return <Checklist {...props} />;
    }
}
const inAppState = toStewardOf<AppState>();

function faceEquipmentConcern(oldState: AppState, concern: EquipmentConcern): AppState {
    if (oldState.situation.kind !== 'equipment') return crash('!!!');
    if (concern.about === 'equipment-to-save') return oldState;
    const newEquipment = faceEquipmentInternalConcern(oldState.situation, concern);
    const newState = inAppState.situation[$on](oldState, newEquipment);
    return newState;
}

function faceWeightsConcern(oldState: AppState, concern: WeightsConcern): AppState {
    if (oldState.situation.kind !== 'weights') return crash('!!!');
    if (concern.about === 'weights-to-save') return oldState;
    const newEquipment = faceWeightsInternalConcern(oldState.situation, concern);
    const newState = inAppState.situation[$on](oldState, newEquipment);
    return newState;
}

function faceTanksConcern(oldState: AppState, concern: TanksConcern): AppState {
    if (oldState.situation.kind !== 'tanks') return crash('!!!');
    if (concern.about === 'tanks-to-save') return oldState;
    const newEquipment = faceTanksInternalConcern(oldState.situation, concern);
    const newState = inAppState.situation[$on](oldState, newEquipment);
    return newState;
}

function faceAppConcern(oldState: AppState, concern: AppConcern): AppState {
    switch (concern.about) {
        case 'tab-choosen': return oldState;
        case 'equipment': return faceEquipmentConcern(oldState, concern.equipment);
        case 'weights': return faceWeightsConcern(oldState, concern.weights);
        case 'tanks': return faceTanksConcern(oldState, concern.tanks);
        default: return broke(concern);
    }
}


ReactDOM.render(<App />, document.getElementById('root'));
