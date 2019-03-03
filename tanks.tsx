import * as React from 'react';
import { FieldConcern, FieldSeed } from './data/field';
import { TextField } from './text-field';

export type TanksConcern = TanksToSaveConcern | {
    about: 'air12L', air12L: FieldConcern;
};

export interface TanksToSaveConcern {
    about: 'tanks-to-save';
}
export interface TanksValueConcern {
    about: 'tanks-value-concern';
    what: FieldSeed;
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

    render() {
        const { air12L } = this.props.seed;
        const air12Lvalue = air12L.value || air12L.text;
        if (air12Lvalue === air12L.text) {
            air12L.error = 'Please enter number';
        }
        return <div className="checklist-form">
            <h2>Tanks</h2>
            <form >
                <label> air 12L
                    <TextField seed={air12L} when={this.whenAir12L} />
                </label>
                {
                    air12L.error !== ''
                        ? <div className="input-error">{air12L.error}</div>
                        : null
                }
                <label> air 15L
                    <input type="text" placeholder="0" />
                </label>
                <label> nitrox 12L
                    <input type="text" placeholder="0" />
                </label>
                <label> nitrox 15L
                    <input type="text" placeholder="0" />
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
