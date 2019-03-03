import * as React from 'react';
import { FieldSeed } from './data/field';

export type WeightsConcern = WeightsToSaveConcern;

export interface WeightsToSaveConcern {
    about: 'weights-to-save';
}

export interface WeightsSeed {
    kind: 'weights';
    kiloPieces1: FieldSeed;
    kiloPieces2: FieldSeed;
    kiloPieces3: FieldSeed;
    totalWeights: number;
}
export interface WeightsProps {
    seed: WeightsSeed;
    when: (concern: WeightsConcern) => void;
}

export class Weights extends React.Component<WeightsProps> {
    render() {
        const { seed: { totalWeights } } = this.props;
        return <form className="checklist-form">
            <h2>Weights</h2>
            <div>Total weigths: {totalWeights}</div>
            <button onSubmit={() => {
                this.props.when({
                    about: 'weights-to-save',
                });
            }}>SAVE</button>
        </form>;
    }
}
