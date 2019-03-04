import * as React from 'react';
import { SelectField, SelectFieldConcern } from './select-field';
import { broke } from './utils';

export interface BoatConcern {
    about: 'choose-boat';
    activeOption: SelectFieldConcern;
}

export interface BoatSelectSeed {
    activeOption: string;
}

export interface BoatSelectProps {
    seed: BoatSelectSeed;
    when: (concern: BoatConcern) => void;
}

const boatOptions = ['divers boat', 'intro boat', 'mixed boat'];
export class BoatSelect extends React.Component<BoatSelectProps> {
    private whenBoatChoosen = (concern: SelectFieldConcern) => {
        this.props.when({ about: 'choose-boat', activeOption: concern });
    }
    render() {
        const { seed: { activeOption } } = this.props;
        return <>
            <SelectField options={boatOptions} when={this.whenBoatChoosen}
                key="boat" activeOption={activeOption} />
        </>;
    }
}

export function faceSelectFieldConcern(
    _field: BoatSelectSeed,
    concern: BoatConcern,
): BoatSelectSeed {
    switch (concern.about) {
        case 'choose-boat':
            return {
                activeOption: concern.activeOption.activeOption,
            };
        default: return broke(concern.about);
    }
}
