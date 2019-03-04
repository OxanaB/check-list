import * as React from 'react';
import { IntroBoatChecklist, IntroBoatChecklistProps, IntroBoatChecklistSeed } from './intro-boat-checklist';
import { SelectField, SelectFieldConcern } from './select-field';
import { broke } from './utils';


export interface BoatSelectSeed {
    activeOption: string;
    introBoatChecklist: IntroBoatChecklistSeed;
}
export interface BoatConcern {
    about: 'choose-boat';
    boat: SelectFieldConcern;
}
export interface BoatSelectProps {
    seed: BoatSelectSeed;
    when: (concern: BoatConcern) => void;
}

const boatOptions = ['divers boat', 'intro boat', 'mixed boat'];
export class BoatSelect extends React.Component<BoatSelectProps> {
    private whenBoatChoosen = (concern: SelectFieldConcern) => {
        this.props.when({ about: 'choose-boat', boat: concern });
    }
    render() {
        const { seed: { activeOption } } = this.props;
        const introBoatCheklistProps: IntroBoatChecklistProps = {
            seed,
            when: concern => {
                this.props.when(concern);
            },
        };
        return <>
            <SelectField options={boatOptions} when={this.whenBoatChoosen}
                activeOption={activeOption} />
            {
                activeOption === 'intro boat' ?
                    <IntroBoatChecklist {...introBoatCheklistProps} />
                    : null
            }
        </>;
    }
}

export function faceSelectFieldConcern(
    _field: BoatSelectSeed,
    concern: BoatConcern,
): BoatSelectSeed {
    switch (concern.about) {
        case 'choose-boat':
        default: return broke(concern.about);
    }
}
