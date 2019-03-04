import * as React from 'react';
import { DiversBoatChecklist, DiversBoatChecklistConcern, DiversBoatChecklistProps, DiversBoatChecklistSeed } from './divers-boat-checklist';
import { IntroBoatChecklist, IntroBoatChecklistConcern, IntroBoatChecklistProps, IntroBoatChecklistSeed } from './intro-boat-checklist';
import { SelectField, SelectFieldConcern } from './select-field';
import { broke } from './utils';

export type BoatConcern = BoatChoiseConcern | DiversBoatChecklistConcern | IntroBoatChecklistConcern;

export interface BoatChoiseConcern {
    about: 'choose-boat';
    boat: SelectFieldConcern;
}

export interface BoatSelectSeed {
    activeOption: string;
    diversBoat: DiversBoatChecklistSeed;
    introBoat: IntroBoatChecklistSeed;
}

export interface BoatSelectProps {
    seed: BoatSelectSeed;
    when: (concern: BoatConcern) => void;
}

const boatOptions = ['divers boat', 'intro boat'];
export class BoatSelect extends React.Component<BoatSelectProps> {
    private whenBoatChoosen = (concern: SelectFieldConcern) => {
        this.props.when({ about: 'choose-boat', boat: concern });
    }
    render() {
        const { seed: { activeOption, diversBoat, introBoat } } = this.props;
        const diversBoatProps: DiversBoatChecklistProps = {
            seed: diversBoat,
            when: concern => {
                this.props.when(concern);
            },
        };
        const introBoatProps: IntroBoatChecklistProps = {
            seed: introBoat,
            when: concern => {
                this.props.when(concern);
            },
        };
        return <>
            <SelectField options={boatOptions} when={this.whenBoatChoosen}
                activeOption={activeOption} />
            {
                activeOption === 'divers-boat'
                    ? <DiversBoatChecklist {...diversBoatProps} />
                    : <IntroBoatChecklist {...introBoatProps} />
            }
        </>;
    }
}

export function faceBoatSelectConcern(
    oldBoatProps: BoatSelectSeed,
    concern: BoatConcern,
): BoatSelectSeed {
    switch (concern.about) {
        case 'choose-boat': {
            const { diversBoat, introBoat } = oldBoatProps;
            return {
                ...diversBoat, ...introBoat, activeOption: concern.boat,
            };
        }
        default: return broke(concern.about);
    }
}
