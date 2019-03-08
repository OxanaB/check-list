import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DiversBoatChecklistSeed, faceDiversBoatChecklistConcern } from './components/divers-boat-checklist';
import { faceIntoBoatCheckListConsern, IntroBoatChecklistSeed } from './components/intro-boat-checklist';
import { NewReport, NewReportConcern, NewReportProps } from './components/new-report';
import { $across, $atop, toStewardOf } from './tools/stewarding';
import { broke, to } from './tools/utils';

interface AppState {
    activeOption: string;
    boatName: string;
    diversBoat: DiversBoatChecklistSeed;
    introBoat: IntroBoatChecklistSeed;
}

type AppConcern = NewReportConcern;

const init = { value: null, text: '', error: '' };

class App extends React.Component<{}, AppState> {

    state = to<AppState>({
        activeOption: '',
        boatName: '',
        diversBoat: {
            comment: '',
            tanks: {
                kind: 'tanks',
                toSaveMode: false,
                air12L: init,
                air15L: init,
                nitrox12L: init,
                nitrox15L: init,
            },
            weights: {
                kiloPieces1: init,
                kiloPieces2: init,
                kiloPieces3: init,
                kind: 'weights',
                totalWeights: 0,
            },
        },
        introBoat: {
            activeTabKind: 'tanks',
            tanks: {
                kind: 'tanks',
                toSaveMode: false,
                air12L: init,
                air15L: init,
                nitrox12L: init,
                nitrox15L: init,
            },
            weights: {
                kiloPieces1: init,
                kiloPieces2: init,
                kiloPieces3: init,
                kind: 'weights',
                totalWeights: 0,
            },
            equipment: {
                bcds: init,
                belts: init,
                fins: init,
                kind: 'equipment',
                masks: init,
                regulators: init,
                shorties: init,
                snorkels: init,
            },
        },
    });

    render() {
        const { state: { activeOption, boatName, diversBoat, introBoat } } = this;
        const props: NewReportProps = {
            seed: {
                activeOption, boatName, diversBoat, introBoat,
            },
            when: concern => {
                const oldState = this.state;
                const newState = faceAppConcern(oldState, concern);
                console.log(oldState, newState);
                this.setState(newState);
            },
        };
        return <NewReport {...props} />;
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
        case 'changed-boat-name': {
            const boatName = concern.boatName;
            return inAppState[$atop](oldState, {
                ...oldState, boatName,
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
