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
        const { seed: { text, typeAheadOptions, isOptionToShow, placeholder } } = this.props;
        return <>
            <input onChange={this.whenChanged} value={text} placeholder={placeholder} />
            {
                typeAheadOptions !== null && isOptionToShow
                    ? <div className="type-ahead-options">
                        {
                            typeAheadOptions.map(machedOption => {
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
    typeAheadOptions: string[];
    isOptionToShow: boolean;
}

export type TypeAheadInputConcern =
    | { about: 'type-ahead-input-changed', text: string }
    | { about: 'type-ahead-option-picked', text: string };

export function faceTypeAheadInputConcern(
    oldProps: TypeAheadInputSeed,
    concern: TypeAheadInputConcern,
): TypeAheadInputSeed {
    switch (concern.about) {
        case 'type-ahead-input-changed': {
            const { typeAheadOptions } = oldProps;
            const input = concern.text;
            const matchedOptions = matchOptions(typeAheadOptions, input);
            return {
                text: concern.text,
                isOptionToShow: true,
                typeAheadOptions: matchedOptions,
                ...oldProps,
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
