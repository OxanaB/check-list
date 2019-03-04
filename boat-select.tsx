import * as React from 'react';
import { SelectField, SelectFieldConcern } from './select-field';

export interface BoatConcern {
    about: 'choose-boat';
    activeOption: SelectFieldConcern;
}

export interface BoatSelectProps {
    kind: 'current-boat';
    boatOptions: string[];
    when: (concern: BoatConcern) => void;
}

export class BoatSelect extends React.Component<BoatSelectProps> {
    private whenBoatChoosen = (concern: SelectFieldConcern) => {
        this.props.when({ about: 'choose-boat', activeOption: concern });
    }
    render() {
        const boatOptions = ['divers boat', 'intro boat', 'mixed boat'];
        return <>
            <SelectField options={boatOptions} when={this.whenBoatChoosen} key="boat" activeOption={boatOptions[0]}/>
        </>;
    }
}
