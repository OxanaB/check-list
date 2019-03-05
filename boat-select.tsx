import * as React from 'react';
import { DiversBoatChecklist, DiversBoatChecklistConcern, DiversBoatChecklistProps, DiversBoatChecklistSeed, faceDiversBoatChecklistConcern } from './divers-boat-checklist';
import { faceIntoBoatCheckListConsern, IntroBoatChecklist, IntroBoatChecklistConcern, IntroBoatChecklistProps, IntroBoatChecklistSeed, SituationSeed } from './intro-boat-checklist';
import { SelectField, SelectFieldConcern } from './select-field';
import { $across, toStewardOf } from './stewarding';
import { Tab } from './tabTop';
import { broke } from './utils';

export type BoatSelectConcern =
    | { about: 'divers-boat', diversBoat: DiversBoatChecklistConcern }
    | { about: 'intro-boat', introBoat: IntroBoatChecklistConcern }
    | SelectFieldConcern;

export interface BoatSelectSeed {
    activeOption: string;
    diversBoat: DiversBoatChecklistSeed;
    introBoat: IntroBoatChecklistSeed;
    allTabs: Tab[];
}

export interface BoatSelectProps {
    situation: SituationSeed;
    seed: BoatSelectSeed;
    when: (concern: BoatSelectConcern) => void;
}

const boatOptions = ['divers boat', 'intro boat'];
export class BoatSelect extends React.Component<BoatSelectProps> {
    render() {
        const { seed: { activeOption, diversBoat, introBoat } } = this.props;
        const { situation } = this.props;
        const diversBoatProps: DiversBoatChecklistProps = {
            seed: diversBoat,
            when: concern => {
                this.props.when({ about: 'divers-boat', diversBoat: concern });
            },
        };
        const introBoatProps: IntroBoatChecklistProps = {
            situation, seed: introBoat,
            when: concern => {
                this.props.when({ about: 'intro-boat', introBoat: concern });
            },
        };
        return <>
            <SelectField options={boatOptions} when={concern => {
                this.props.when(concern);
            }}
            activeOption={activeOption} />
            {
                activeOption === 'divers-boat'
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
