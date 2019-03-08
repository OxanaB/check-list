import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DiversBoatChecklistSeed, faceDiversBoatChecklistConcern } from './components/divers-boat-checklist';
import { faceIntoBoatCheckListConsern, IntroBoatChecklistSeed } from './components/intro-boat-checklist';
import { NewReport, NewReportConcern, NewReportProps } from './components/new-report';
import { faceTypeAheadInputConcern, TypeAheadInputSeed } from './components/type-ahead-input';
import { $across, $atop, toStewardOf } from './tools/stewarding';
import { broke, to } from './tools/utils';

interface AppState {
    activeOption: string;
    boatName: TypeAheadInputSeed;
    diversBoat: DiversBoatChecklistSeed;
    introBoat: IntroBoatChecklistSeed;
}

type AppConcern = NewReportConcern;

const init = { value: null, text: '', error: '' };
const boatNameOptions = ['Lady Nataly', 'Eleonora', 'Maria Sole'];

class App extends React.Component<{}, AppState> {

    state = to<AppState>({
        activeOption: '',
        boatName: {
            isOptionToShow: false,
            placeholder: 'Enter boat name',
            text: '',
            typeAheadOptions: boatNameOptions,
            matchingOptions: [],
        },
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
                toSaveMode: false,
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
                toSaveMode: false,
                totalWeights: 0,
            },
            equipment: {
                bcds: init,
                belts: init,
                fins: init,
                kind: 'equipment',
                toSaveMode: false,
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
        case 'boat-name':
            return inAppState.boatName[$across](oldState,
                oldName => faceTypeAheadInputConcern(oldName, concern.boatName));
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


{/* <Router>
            const newReport = () => { return <NewReport {...props} />;};
            <Route path="/reports/new" component={newReport} />
        </Router>; */}
