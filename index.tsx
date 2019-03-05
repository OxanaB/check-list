import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BoatSelect, BoatSelectConcern, BoatSelectProps } from './boat-select';
import { DiversBoatChecklistSeed } from './divers-boat-checklist';
import { IntroBoatChecklistSeed, SituationSeed } from './intro-boat-checklist';
import { $atop, toStewardOf } from './stewarding';
import { allTabs, Tab } from './tabTop';
import { broke, to } from './utils';

interface AppState {
    activeOption: string;
    allTabs: Tab[];
    situation: SituationSeed;
    diversBoat: DiversBoatChecklistSeed;
    introBoat: IntroBoatChecklistSeed;
}

type AppConcern = BoatSelectConcern;

class App extends React.Component<{}, AppState> {

    state = to<AppState>({
        activeOption: '',
        allTabs,
        diversBoat,
        introBoat,
        situation,
        when,
    });

    render() {
        const { state: { activeOption, allTabs, situation, diversBoat, introBoat } } = this;
        const props: BoatSelectProps = {
            situation,
            seed: {
                activeOption, diversBoat, introBoat, allTabs,
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
        case 'divers-boat': {
            return inAppState.diversBoat[$atop](oldState, {
                });
        }
        case 'intro-boat': return inAppState.introBoat[$atop](oldState, {

        });
        default: return broke(concern);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
