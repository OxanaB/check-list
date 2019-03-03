import * as React from 'react';
import { TextFieldConcern, TextFieldSeed } from './text-field';
import { broke } from './utils';

export interface TextFieldProps {
    seed: TextFieldSeed; // ---> IN
    when: (concern: TextFieldConcern) => void; // <--- OUT
}

export class TextField extends React.Component<TextFieldProps> {
    private whenChanged: React.ChangeEventHandler<HTMLInputElement> = e => {
        const { when } = this.props;
        const text = e.currentTarget.value;
        when({ about: 'changed-text', text });
    }
    render() {
        const { seed: { text } } = this.props;
        return <input onChange={this.whenChanged} value={text} />;
    }
}

export interface TextFieldSeed {
    value: number | null;
    text: string;
    error: string;
}

export type TextFieldConcern = { about: 'changed-text', text: string };

export function faceTextFieldConcern(
    _field: TextFieldSeed, // old field
    concern: TextFieldConcern, // use action
): TextFieldSeed { // new field
    switch (concern.about) {
        case 'changed-text': {
            const { text } = concern;
            const value = parseInt(text, 10);
            if (isNaN(value)) {
                // cannot parse
                return { text,
                    value: null, // OXANA: can be old value or null or default value
                    error: 'Invalid number.' };
            } else {
                // parsed
                return { text, value, error: '' };
            }
        }
        default: return broke(concern.about);
    }
}
