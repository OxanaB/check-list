import * as React from 'react';
import { FieldConcern, FieldSeed } from './field';

export interface TextFieldProps {
    seed: FieldSeed;
    when: (concern: FieldConcern) => void;
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
