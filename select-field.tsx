import * as React from 'react';
import { broke } from './utils';

export interface SelectFieldConcern {
    about: 'selected-option';
    activeOption: string;
}

export interface SelectFieldProps {
    options: string[];
    activeOption: string;
    when: (concern: SelectFieldConcern) => void;
}
export class SelectField extends React.Component<SelectFieldProps> {
    private whenSelected: React.ChangeEventHandler<HTMLSelectElement> = e => {
        const { when } = this.props;
        const choosenOption = e.currentTarget.id;
        when({ about: 'selected-option', activeOption: choosenOption });
    }
    render() {
        const { options, activeOption } = this.props;
        return <>
            <select defaultValue={activeOption} onSelect={this.whenSelected}>
                {
                    options.map(option => {
                        return <option value={option}>{option}</option>;
                    })
                }
            </select>
        </>;
    }
}

export function faceSelectFieldConcern(
    concern: SelectFieldConcern,
) {
    switch (concern.about) {
        case 'selected-option':
            return {
                activeOption: concern.activeOption,
            };
        default: return broke(concern.about);
    }
}
