import * as React from 'react';
import { $across, toStewardOf } from '../tools/stewarding';
import { broke } from '../tools/utils';
import { faceTextFieldConcern, TextField, TextFieldConcern, TextFieldSeed } from './text-field';

export type TanksConcern =
    | TanksToSaveConcern
    | Air12LConsern
    | Air15LConsern
    | Nitrox12LConsern
    | Nitrox15LConsern;

export interface TanksToSaveConcern {
    about: 'tanks-to-save';
    toSaveMode: boolean;
}
export interface Air12LConsern {
    about: 'air12L';
    air12L: TextFieldConcern;
}
export interface Air15LConsern {
    about: 'air15L';
    air15L: TextFieldConcern;
}
export interface Nitrox12LConsern {
    about: 'nitrox12L';
    nitrox12L: TextFieldConcern;
}
export interface Nitrox15LConsern {
    about: 'nitrox15L';
    nitrox15L: TextFieldConcern;
}
export interface TanksSeed {
    kind: 'tanks';
    toSaveMode: boolean;
    air12L: TextFieldSeed;
    air15L: TextFieldSeed;
    nitrox12L: TextFieldSeed;
    nitrox15L: TextFieldSeed;
}
export interface TanksProps {
    seed: TanksSeed;
    when: (concern: TanksConcern) => void;
}

export class Tanks extends React.Component<TanksProps> {
    private whenAir12L = (concern: TextFieldConcern) => {
        this.props.when({ about: 'air12L', air12L: concern });
    }
    private whenAir15L = (concern: TextFieldConcern) => {
        this.props.when({ about: 'air15L', air15L: concern });
    }
    private whenNitrox12L = (concern: TextFieldConcern) => {
        this.props.when({ about: 'nitrox12L', nitrox12L: concern });
    }
    private whenNitrox15L = (concern: TextFieldConcern) => {
        this.props.when({ about: 'nitrox15L', nitrox15L: concern });
    }
    private whenToChangeMode(toSaveMode: boolean) {
        this.props.when({ about: 'tanks-to-save', toSaveMode });
    }
    render() {
        const { seed: { air12L, air15L, nitrox12L, nitrox15L, toSaveMode } } = this.props;
        return <>
            {
                !toSaveMode
                    ? <>
                        <label> air 12L
                    <TextField seed={air12L} when={this.whenAir12L} />
                        </label>
                        <label> air 15L
                    <TextField seed={air15L} when={this.whenAir15L} />
                        </label>
                        <label> nitrox 12L
                    <TextField seed={nitrox12L} when={this.whenNitrox12L} />
                        </label>
                        <label> nitrox 15L
                    <TextField seed={nitrox15L} when={this.whenNitrox15L} />
                        </label>
                        <button onClick={e => {
                            e.preventDefault();
                            this.whenToChangeMode(true);
                        }}>SAVE</button>
                    </>
                    : <>
                        {
                            air12L.value || air15L.value || nitrox12L.value || nitrox15L.value ?
                                <>
                                    <div>air 12L is {air12L.value}</div>
                                    <div>air 15L is {air15L.value}</div>
                                    <div>nitrox 12L is {nitrox12L.value}</div>
                                    <div>nitrox 12L is {nitrox15L.value}</div>
                                </>
                                : <div className="input-error">
                                    <p>Enter amount of tanks (filled).</p>
                                    <p>If there is no kind of tanks enter 0 (zero).</p>
                                </div>
                        }
                        <button onClick={e => {
                            e.preventDefault();
                            this.whenToChangeMode(false);
                        }}>EDIT</button>
                    </>
            }
        </>;
    }
}

const inTanksSeed = toStewardOf<TanksSeed>();

export function faceTanksConcern(
    oldTanks: TanksSeed,
    concern: TanksConcern,
): TanksSeed {
    switch (concern.about) {
        case 'air12L': return inTanksSeed.air12L[$across](oldTanks,
            oldField => faceTextFieldConcern(oldField, concern.air12L),
        );
        case 'air15L': return inTanksSeed.air15L[$across](oldTanks,
            oldField => faceTextFieldConcern(oldField, concern.air15L),
        );
        case 'nitrox12L': return inTanksSeed.nitrox12L[$across](oldTanks,
            oldField => faceTextFieldConcern(oldField, concern.nitrox12L),
        );
        case 'nitrox15L': return inTanksSeed // <-- we work with TanksSeed!
            .nitrox15L[$across](
                oldTanks, // <-- here is our seed, please use it
                // ACROSS: oldValue => newValue
                oldField => faceTextFieldConcern(oldField, concern.nitrox15L),
            );
        case 'tanks-to-save': return { ...oldTanks, toSaveMode: concern.toSaveMode };
        default: return broke(concern);
    }
}

export const defaultTanks: TanksSeed = {
    kind: 'tanks',
    toSaveMode: false,
    air12L: {
        value: 0,
        text: '',
        error: '',
    },
    air15L: {
        value: 0,
        text: '',
        error: '',
    },
    nitrox12L: {
        value: 0,
        text: '',
        error: '',
    },
    nitrox15L: {
        value: 0,
        text: '',
        error: '',
    },
};
