import * as React from 'react';
import { SelectField, SelectFieldConcern } from './select-field';
import { broke } from './utils';


export interface BoatSelectSeed {
    activeOption: string;
}
export interface BoatConcern {
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
        return <>
            <SelectField options={boatOptions} when={this.whenBoatChoosen}
                activeOption={activeOption} />
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
