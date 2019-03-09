import * as React from 'react';
import { broke, matchOptions } from '../tools/utils';

export interface TypeAheadInputProps {
    seed: TypeAheadInputSeed;
    when: (concern: TypeAheadInputConcern) => void;
}

export class TypeAheadInput extends React.Component<TypeAheadInputProps> {
    private whenChanged: React.ChangeEventHandler<HTMLInputElement> = e => {
        const { when } = this.props;
        const text = e.currentTarget.value;
        when({ about: 'type-ahead-input-changed', text });
    }
    private whenTypeAheadOptionPicked(matchedOption: string) {
        const { when } = this.props;
        when({ about: 'type-ahead-option-picked', text: matchedOption });
    }
    render() {
        const { seed: { text, isOptionToShow, placeholder, matchingOptions } } = this.props;
        return <>
            <input className="type-ahead" onChange={this.whenChanged} value={text} placeholder={placeholder} />
            {matchingOptions && isOptionToShow ?
                <div className="type-ahead-options">
                    {
                        matchingOptions.map(machedOption => {
                            return <div key={machedOption}>
                                <a href="#" onClick={e => {
                                    e.preventDefault();
                                    this.whenTypeAheadOptionPicked(machedOption);
                                }}>{machedOption}</a></div>;

                        })}</div>
                : null
            }
        </>;
    }
}
export interface TypeAheadInputSeed {
    text: string;
    placeholder: string;
    matchingOptions: string[];
    isOptionToShow: boolean;
}

export type TypeAheadInputConcern =
    | { about: 'type-ahead-input-changed', text: string }
    | { about: 'type-ahead-option-picked', text: string };

export function faceTypeAheadInputConcern(
    oldProps: TypeAheadInputSeed,
    typeAheadOptions: string[],
    concern: TypeAheadInputConcern,
): TypeAheadInputSeed {
    switch (concern.about) {
        case 'type-ahead-input-changed': {
            const { text } = concern;
            const matchedOptions = matchOptions(typeAheadOptions, text);
            return {
                ...oldProps,
                text,
                isOptionToShow: true,
                matchingOptions: matchedOptions,
            };
        }
        case 'type-ahead-option-picked': {
            const text = concern.text;
            return {
                ...oldProps, text, isOptionToShow: false,
            };
        }
        default: return broke(concern);
    }
}
