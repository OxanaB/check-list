import * as React from 'react';
import { $across, toStewardOf } from './stewarding';
import { faceTextFieldConcern, TextField, TextFieldConcern, TextFieldSeed } from './text-field';
import { broke } from './utils';

export type TanksConcern = TanksInternalConcern | TanksExternalConcern;

export type TanksExternalConcern =
    | TanksToSaveConcern;

export type TanksInternalConcern =
    | WhenAir12LConsern
    | WhenAir15LConsern
    | WhenNitrox12LConsern
    | WhenNitrox15LConsern;

export interface TanksToSaveConcern {
    about: 'tanks-to-save';
}
export interface WhenAir12LConsern {
    about: 'air12L';
    air12L: TextFieldConcern;
}
export interface WhenAir15LConsern {
    about: 'air15L';
    air15L: TextFieldConcern;
}
export interface WhenNitrox12LConsern {
    about: 'nitrox12L';
    nitrox12L: TextFieldConcern;
}
export interface WhenNitrox15LConsern {
    about: 'nitrox15L';
    nitrox15L: TextFieldConcern;
}
export interface TanksSeed {
    kind: 'tanks';
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

    render() {
        const { seed: { air12L, air15L, nitrox12L, nitrox15L } } = this.props;
        return <div className="checklist-form">
            <h2>Tanks</h2>
            <form >
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
                <button onSubmit={() => {
                    this.props.when({
                        about: 'tanks-to-save',
                    });
                }}>SAVE</button>
            </form>
        </div>;
    }
}

const inTanksSeed = toStewardOf<TanksSeed>();

export function faceTanksInternalConcern(
    tanks: TanksSeed,
    concern: TanksInternalConcern,
): TanksSeed {
    switch (concern.about) {
        case 'air12L': return inTanksSeed.air12L[$across](tanks,
            oldField => faceTextFieldConcern(oldField, concern.air12L),
        );
        case 'air15L': return inTanksSeed.air15L[$across](tanks,
            oldField => faceTextFieldConcern(oldField, concern.air15L),
        );
        case 'nitrox12L': return inTanksSeed.nitrox12L[$across](tanks,
            oldField => faceTextFieldConcern(oldField, concern.nitrox12L),
        );
        case 'nitrox15L': return inTanksSeed // <-- we work with TanksSeed!
            .nitrox15L[$across](
                tanks, // <-- here is our seed, please use it
                // ACROSS: oldValue => newValue
                oldField => faceTextFieldConcern(oldField, concern.nitrox15L),
            );
        default: return broke(concern);
    }
}
