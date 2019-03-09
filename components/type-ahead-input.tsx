import * as React from 'react';
import { broke } from '../tools/utils';

export interface TypeAheadInputProps<Item> {
    seed: TypeAheadInputSeed<Item>;
    when: (concern: TypeAheadInputConcern<Item>) => void;
}
export function toBeingTypeAhead<Item>(
    renderItem: (item: Item) => React.ReactNode, // <-- HTML
    toKey: (item: Item) => string,
    typeAheadOptions: Item[],
    matchOptions: (items: Item[], text: string) => Item[],
    formatItem: (item: Item) => string,
) {

    class TypeAheadInput
        extends React.Component<TypeAheadInputProps<Item>> {

        static Concern: TypeAheadInputConcern<Item>;
        static Props:  TypeAheadInputProps<Item>;
        static Seed: TypeAheadInputSeed<Item>;

        private whenChanged: React.ChangeEventHandler<HTMLInputElement> = e => {
            const { when } = this.props;
            const text = e.currentTarget.value;
            when({ about: 'type-ahead-input-changed', text });
        }

        private whenTypeAheadOptionPicked(item: Item) {
            const { when } = this.props;
            when({ about: 'type-ahead-option-picked', item });
        }
        render() {
            const { seed: { text, isOptionToShow, placeholder, matchedItems: matchingOptions } } = this.props;
            return <>
                <input className="type-ahead" onChange={this.whenChanged} value={text} placeholder={placeholder} />
                {matchingOptions && isOptionToShow ?
                    <div className="type-ahead-options">
                        {
                            matchingOptions.map(item => {
                                return <div key={toKey(item)}>
                                    <a href="#" onClick={e => {
                                        e.preventDefault();
                                        this.whenTypeAheadOptionPicked(item);
                                    }}>{renderItem(item)}</a></div>;

                            })}</div>
                    : null
                }
            </>;
        }
    }

    function faceTypeAheadInputConcern(
        oldProps: TypeAheadInputSeed<Item>,
        concern: TypeAheadInputConcern<Item>,
    ): TypeAheadInputSeed<Item> {
        switch (concern.about) {
            case 'type-ahead-input-changed': {
                const { text } = concern;
                const matchedOptions = matchOptions(typeAheadOptions, text);
                return {
                    ...oldProps,
                    text,
                    isOptionToShow: true,
                    matchedItems: matchedOptions,
                };
            }
            case 'type-ahead-option-picked': {
                const text = formatItem(concern.item);
                return {
                    ...oldProps, text, isOptionToShow: false,
                };
            }
            default: return broke(concern);
        }
    }

    return { TypeAheadInput, faceTypeAheadInputConcern };

}
export interface TypeAheadInputSeed<Item> {
    text: string;
    placeholder: string;
    matchedItems: Item[];
    isOptionToShow: boolean;
}

export type TypeAheadInputConcern<Item> =
    | { about: 'type-ahead-input-changed', text: string }
    | { about: 'type-ahead-option-picked', item: Item; };
