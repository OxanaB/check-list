import * as React from 'react';
import { DiversBoatChecklist, DiversBoatChecklistConcern, DiversBoatChecklistSeed } from './divers-boat-checklist';
import { IntroBoatChecklist, IntroBoatChecklistConcern, IntroBoatChecklistSeed } from './intro-boat-checklist';
import { SelectField, SelectFieldConcern } from './select-field';
import { broke } from './utils';

export type BoatConcern = BoatChoiseConcern | DiversBoatChecklistConcern | IntroBoatChecklistConcern;

export interface BoatSelectSeed {
    activeOption: string;
    diversBoat: DiversBoatChecklistSeed;
    introBoat: IntroBoatChecklistSeed;
}
export interface BoatChoiseConcern {
    about: 'choose-boat';
    boat: SelectFieldConcern;
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
        const { seed: { activeOption } } = this.props;
        const { seed: { tanks, weights, comment } } = this.props;
        const diverBoatProps:
        return <>
            <SelectField options={boatOptions} when={this.whenBoatChoosen}
                activeOption={activeOption} />
            {
                activeOption === 'divers-boat'
                ? <DiversBoatChecklist />
                : <IntroBoatChecklist />
            }
        </>;
    }
}

export function faceBoatSelectConcern(
    _boat: BoatSelectSeed,
    concern: BoatConcern,
): BoatSelectSeed {
    switch (concern.about) {
        case 'choose-boat': return concern.boat;
        default: return broke(concern.about);
    }
}
