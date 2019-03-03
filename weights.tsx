import * as React from 'react';
import { $across, toStewardOf } from './stewarding';
import { faceTextFieldConcern, TextField, TextFieldConcern, TextFieldSeed } from './text-field';
import { broke } from './utils';

export type WeightsConcern = WeightsInternalConcern | WeightsExternalConcern;

export type WeightsExternalConcern = WeightsToSaveConcern;

export type WeightsInternalConcern =
    | WhenOneKiloPiecesConcern
    | WhenTwoKiloPiecesConcern
    | WhenThreeKiloPiecesConcern;

export interface WeightsToSaveConcern {
    about: 'weights-to-save';
}
export interface WhenOneKiloPiecesConcern {
    about: '1-kilo-pieses';
    kiloPieces1: TextFieldConcern;
}
export interface WhenTwoKiloPiecesConcern {
    about: '2-kilo-pieses';
    kiloPieces2: TextFieldConcern;
}
export interface WhenThreeKiloPiecesConcern {
    about: '3-kilo-pieses';
    kiloPieces3: TextFieldConcern;
}
export interface WeightsSeed {
    kind: 'weights';
    kiloPieces1: TextFieldSeed;
    kiloPieces2: TextFieldSeed;
    kiloPieces3: TextFieldSeed;
    totalWeights: number;
}
export interface WeightsProps {
    seed: WeightsSeed;
    when: (concern: WeightsConcern) => void;
}

export class Weights extends React.Component<WeightsProps> {
    private whenOneKiloPieces = (concern: TextFieldConcern) => {
        this.props.when({ about: '1-kilo-pieses', kiloPieces1: concern });
    }
    private whenTwoKiloPieces = (concern: TextFieldConcern) => {
        this.props.when({ about: '2-kilo-pieses', kiloPieces2: concern });
    }
    private whenThreeKiloPieces = (concern: TextFieldConcern) => {
        this.props.when({ about: '3-kilo-pieses', kiloPieces3: concern });
    }
    render() {
        const { seed: { kiloPieces1, kiloPieces2, kiloPieces3, totalWeights } } = this.props;
//        const totalWeights = kiloPieces1.value + kiloPieces2.value * 2 + kiloPieces3.value * 3;
        return <div className="checklist-form">
            <h2>Weights</h2>
            <form>
                <label>1 kilo pieces
                    <TextField seed={kiloPieces1} when={this.whenOneKiloPieces}/>
                </label>
                <label>2 kilo pieces
                    <TextField seed={kiloPieces2} when={this.whenTwoKiloPieces}/>
                </label>
                <label>3 kilo pieces
                    <TextField seed={kiloPieces3} when={this.whenThreeKiloPieces}/>
                </label>
                <div>Total weigths: {totalWeights}</div>
                <button onSubmit={() => {
                    this.props.when({
                        about: 'weights-to-save',
                    });
                }}>SAVE</button>
            </form>;
        </div>;
    }
}

const inWeightsSeed = toStewardOf<WeightsSeed>();

export function faceWeightsInternalConcern(
    weights: WeightsSeed,
    concern: WeightsInternalConcern,
): WeightsSeed {
    switch (concern.about) {
        case '1-kilo-pieses': return inWeightsSeed.kiloPieces1[$across](
            weights, oldField => faceTextFieldConcern(oldField, concern.kiloPieces1),
        );
        case '2-kilo-pieses': return inWeightsSeed.kiloPieces2[$across](
            weights, oldField => faceTextFieldConcern(oldField, concern.kiloPieces2),
        );
        case '3-kilo-pieses': return inWeightsSeed.kiloPieces3[$across](
            weights, oldField => faceTextFieldConcern(oldField, concern.kiloPieces3),
        );
        default: return broke(concern);
    }
}
