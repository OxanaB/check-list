import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { equipment, EquipmentConcern, EquipmentSeed, faceEquipmentInternalConcern } from './equipment';
import { IntroBoatChecklist, IntroBoatChecklistConcern, IntroBoatChecklistProps } from './intro-boat-checklist';
import { IntroBoatSituationSeed } from './situation';
import { $atop, $on, toStewardOf } from './stewarding';
import { allTabs, Tab } from './tabTop';
import { faceTanksInternalConcern, tanks, TanksConcern, TanksSeed } from './tanks';
import { broke, crash, to } from './utils';
import { faceWeightsInternalConcern, weights, WeightsConcern, WeightsSeed } from './weights';



interface AppState {
    weights: WeightsSeed;
    tanks: TanksSeed;
    equipment: EquipmentSeed;
    allTabs: Tab[];
    activeTabId: string;
}

type AppConcern = IntroBoatChecklistConcern;

class App extends React.Component<{}, AppState> {

    state = to<AppState>({
        activeTabId: allTabs[0].title,
        allTabs,
        equipment,
        tanks,
        weights,
    });

    render() {
        const { state: { activeTabId, allTabs } } = this;
        const props: IntroBoatChecklistProps = {
            seed: {
                activeTabId,
                allTabs,
                situation: pickSituationSeedByTabId(this.state, activeTabId),
            },
            when: concern => {
                const oldState = this.state;
                const newState = faceAppConcern(oldState, concern);
                console.log(oldState, newState);
                this.setState(newState);
            },
        };
        return <IntroBoatChecklist {...props} />;
    }
}
const inAppState = toStewardOf<AppState>();

function faceEquipmentConcern(oldState: AppState, concern: EquipmentConcern): AppState {
    const situation = pickSituationSeedByTabId(oldState, oldState.activeTabId);
    if (situation.kind !== 'equipment') return crash('!!!');
    if (concern.about === 'equipment-to-save') return oldState;
    const newEquipment = faceEquipmentInternalConcern(situation, concern);
    const newState = inAppState.equipment[$on](oldState, newEquipment);
    return newState;
}

function faceWeightsConcern(oldState: AppState, concern: WeightsConcern): AppState {
    const situation = pickSituationSeedByTabId(oldState, oldState.activeTabId);
    if (situation.kind !== 'weights') return crash('!!!');
    if (concern.about === 'weights-to-save') return oldState;
    const newEquipment = faceWeightsInternalConcern(situation, concern);
    const newState = inAppState.weights[$on](oldState, newEquipment);
    return newState;
}

function faceTanksConcern(oldState: AppState, concern: TanksConcern): AppState {
    const situation = pickSituationSeedByTabId(oldState, oldState.activeTabId);
    if (situation.kind !== 'tanks') return crash('!!!');
    if (concern.about === 'tanks-to-save') return oldState;
    const newEquipment = faceTanksInternalConcern(situation, concern);
    const newState = inAppState.tanks[$on](oldState, newEquipment);
    return newState;
}

function faceAppConcern(oldState: AppState, concern: AppConcern): AppState {
    switch (concern.about) {
        case 'tab-choosen': {
            const activeTabId = concern.activeTab.title;
            return inAppState[$atop](oldState, {
                activeTabId,
            });
        }
        case 'equipment': return faceEquipmentConcern(oldState, concern.equipment);
        case 'weights': return faceWeightsConcern(oldState, concern.weights);
        case 'tanks': return faceTanksConcern(oldState, concern.tanks);
        default: return broke(concern);
    }
}

function pickSituationSeedByTabId(state: AppState, tabId: string): IntroBoatSituationSeed {
    switch (tabId) {
        case 'Tanks': return state.tanks;
        case 'Weights': return state.weights;
        case 'Equipment': return state.equipment;
        default: return crash('Invalid tab id.');
    }

}


ReactDOM.render(<App />, document.getElementById('root'));
