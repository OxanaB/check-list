import * as React from 'react';
import { FieldConcern, FieldSeed } from './field';
import { TextField } from './text-field';

export type TanksConcern =
    | TanksToSaveConcern
    | WhenAir12LConsern
    | WhenAir15LConsern
    | WhenNitrox12LConsern
    | WhenNitrox15LConsern;

export interface TanksToSaveConcern {
    about: 'tanks-to-save';
}
export interface WhenAir12LConsern {
    about: 'air12L';
    air12L: FieldConcern;
}
export interface WhenAir15LConsern {
    about: 'air15L';
    air15L: FieldConcern;
}
export interface WhenNitrox12LConsern {
    about: 'nitrox12L';
    nitrox12L: FieldConcern;
}
export interface WhenNitrox15LConsern {
    about: 'nitrox15L';
    nitrox15L: FieldConcern;
}
export interface TanksSeed {
    kind: 'tanks';
    air12L: FieldSeed;
    air15L: FieldSeed;
    nitrox12L: FieldSeed;
    nitrox15L: FieldSeed;

}
export interface TanksProps {
    seed: TanksSeed;
    when: (concern: TanksConcern) => void;
}

export class Tanks extends React.Component<TanksProps> {
    private whenAir12L = (concern: FieldConcern) => {
        this.props.when({ about: 'air12L', air12L: concern });
    }
    private whenAir15L = (concern: FieldConcern) => {
        this.props.when({ about: 'air15L', air15L: concern });
    }
    private whenNitrox12L = (concern: FieldConcern) => {
        this.props.when({ about: 'nitrox12L', nitrox12L: concern });
    }
    private whenNitrox15L = (concern: FieldConcern) => {
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
            </form>;
        </div>;
    }
}
