import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BoatSelect, BoatSelectConcern, BoatSelectProps } from './boat-select';
import { DiversBoatChecklistSeed, faceDiversBoatChecklistConcern } from './divers-boat-checklist';
import { faceIntoBoatCheckListConsern, IntroBoatChecklistSeed } from './intro-boat-checklist';
import { $across, $atop, toStewardOf } from './stewarding';
import { broke, to } from './utils';

interface AppState {
    activeOption: string;
    diversBoat: DiversBoatChecklistSeed;
    introBoat: IntroBoatChecklistSeed;
}

type AppConcern = BoatSelectConcern;
const xxx = { value: null, text: '0', error: '' };
class App extends React.Component<{}, AppState> {

    state = to<AppState>({
        activeOption: 'divers boat',
        diversBoat: {
            comment: '',
            tanks: {
                kind: 'tanks',
                air12L: xxx,
                air15L: { value: null, text: '0', error: '' },
                nitrox12L: { value: null, text: '0', error: '' },
                nitrox15L: { value: null, text: '0', error: '' },
            },
            weights: {
                kiloPieces1: { value: null, text: '0', error: '' },
                kiloPieces2: { value: null, text: '0', error: '' },
                kiloPieces3: { value: null, text: '0', error: '' },
                kind: 'weights',
                totalWeights: 0,
            },
        },
        introBoat: {
            activeTabId: 'Tanks',
            toShowTabData: {
                kind: 'tanks',
                air12L: { value: null, text: '0', error: '' },
                air15L: { value: null, text: '0', error: '' },
                nitrox12L: { value: null, text: '0', error: '' },
                nitrox15L: { value: null, text: '0', error: '' },
            },
            tanks: {
                kind: 'tanks',
                air12L: { value: null, text: '0', error: '' },
                air15L: { value: null, text: '0', error: '' },
                nitrox12L: { value: null, text: '0', error: '' },
                nitrox15L: { value: null, text: '0', error: '' },
            },
            weights: {
                kiloPieces1: { value: null, text: '0', error: '' },
                kiloPieces2: { value: null, text: '0', error: '' },
                kiloPieces3: { value: null, text: '0', error: '' },
                kind: 'weights',
                totalWeights: 0,
            },
            equipment: {
                bcds: { value: null, text: '0', error: '' },
                belts: { value: null, text: '0', error: '' },
                fins: { value: null, text: '0', error: '' },
                kind: 'equipment',
                masks: { value: null, text: '0', error: '' },
                regulators: { value: null, text: '0', error: '' },
                shorties: { value: null, text: '0', error: '' },
                snorkels: { value: null, text: '0', error: '' },
            },
        },
    });

    render() {
        const { state: { activeOption, diversBoat, introBoat } } = this;
        const props: BoatSelectProps = {
            seed: {
                activeOption, diversBoat, introBoat,
            },
            when: concern => {
                const oldState = this.state;
                const newState = faceAppConcern(oldState, concern);
                console.log(oldState, newState);
                this.setState(newState);
            },
        };
        return <BoatSelect {...props} />;
    }
}
const inAppState = toStewardOf<AppState>();

function faceAppConcern(oldState: AppState, concern: AppConcern): AppState {
    switch (concern.about) {
        case 'selected-option': {
            const choosenBoat = concern.activeOption;
            return inAppState[$atop](oldState, {
                ...oldState, activeOption: choosenBoat,
            });
        }
        case 'divers-boat':
            return inAppState.diversBoat[$across](oldState,
                oldData => faceDiversBoatChecklistConcern(oldData, concern.diversBoat));
        case 'intro-boat':
            return inAppState.introBoat[$across](oldState,
                oldData => faceIntoBoatCheckListConsern(oldData, concern.introBoat));
        default: return broke(concern);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
