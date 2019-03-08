import { $across, toStewardOf } from 'divemaster-checklist/tools/stewarding';
import { broke } from 'divemaster-checklist/tools/utils';
import * as React from 'react';
import { DiversBoatChecklist, DiversBoatChecklistConcern, DiversBoatChecklistProps, DiversBoatChecklistSeed, faceDiversBoatChecklistConcern } from './divers-boat-checklist';
import { faceIntoBoatCheckListConsern, IntroBoatChecklist, IntroBoatChecklistConcern, IntroBoatChecklistProps, IntroBoatChecklistSeed } from './intro-boat-checklist';
import { SelectField, SelectFieldConcern } from './select-field';


export type BoatSelectConcern =
    | { about: 'divers-boat', diversBoat: DiversBoatChecklistConcern }
    | { about: 'intro-boat', introBoat: IntroBoatChecklistConcern }
    | SelectFieldConcern;

export interface BoatSelectSeed {
    activeOption: string;
    diversBoat: DiversBoatChecklistSeed;
    introBoat: IntroBoatChecklistSeed;
}

export interface BoatSelectProps {
    seed: BoatSelectSeed;
    when: (concern: BoatSelectConcern) => void;
}

const boatOptions = ['divers boat', 'intro boat'];
export class BoatSelect extends React.Component<BoatSelectProps> {
    render() {
        const { seed: { activeOption, diversBoat, introBoat } } = this.props;
        const diversBoatProps: DiversBoatChecklistProps = {
            seed: diversBoat,
            when: concern => {
                this.props.when({ about: 'divers-boat', diversBoat: concern });
            },
        };
        const introBoatProps: IntroBoatChecklistProps = {
            seed: introBoat,
            when: concern => {
                this.props.when({ about: 'intro-boat', introBoat: concern });
            },
        };
        return <>
            Choose the boat you on
            <SelectField options={boatOptions} when={concern => {
                this.props.when(concern);
            }} />
            {
                activeOption === 'divers boat'
                    ? <DiversBoatChecklist {...diversBoatProps} />
                    : <IntroBoatChecklist {...introBoatProps} />
            }
        </>;
    }
}

const inBoatSelectSeed = toStewardOf<BoatSelectSeed>();

export function faceBoatSelectConcern(
    oldSeed: BoatSelectSeed,
    concern: BoatSelectConcern,
): BoatSelectSeed {
    switch (concern.about) {
        case 'divers-boat': return inBoatSelectSeed.diversBoat[$across](
            oldSeed,
            oldData => faceDiversBoatChecklistConcern(oldData, concern.diversBoat),
        );
        case 'intro-boat': return inBoatSelectSeed.introBoat[$across](
            oldSeed,
            oldData => faceIntoBoatCheckListConsern(oldData, concern.introBoat),
        );
        case 'selected-option': {
            return {
                ...oldSeed, activeOption: concern.activeOption,
            };
        }
        default: return broke(concern);
    }
}
