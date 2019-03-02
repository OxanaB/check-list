import * as React from 'react';
import { Field } from './data/tabs-data';

export type TanksConcern = TanksToSaveConcern;

export interface TanksToSaveConcern {
    about: 'tanks-to-save';
}
export interface TanksSeed {
    kind: 'tanks';
    air12L: Field;
    air15L: Field;
    nitrox12L: Field;
    nitrox15L: Field;

}
export interface TanksProps {
    seed: TanksSeed;
    when: (concern: TanksConcern) => void;
}

export class Tanks extends React.Component<TanksProps> {
    render() {
        return <form className="checklist-form">
            <h2>Tanks</h2>
            <button onSubmit={() => {
                this.props.when({
                    about: 'tanks-to-save',
                });
            }}>SAVE</button>
        </form>;
    }
}
