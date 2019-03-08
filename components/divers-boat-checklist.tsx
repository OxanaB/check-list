import * as React from 'react';
import { $across, toStewardOf } from '../tools/stewarding';
import { broke } from '../tools/utils';
import { faceTanksConcern, Tanks, TanksConcern, TanksProps, TanksSeed } from './tanks';
import { faceWeightsConcern, Weights, WeightsConcern, WeightsProps, WeightsSeed } from './weights';


export interface DiversBoatChecklistSeed {
    tanks: TanksSeed;
    weights: WeightsSeed;
    comment: string;
}
export type DiversBoatChecklistConcern =
    | { about: 'tanks', tanks: TanksConcern }
    | { about: 'weights', weights: WeightsConcern }
    | DiversChecklistCommentConcern;

export interface DiversChecklistCommentConcern {
    about: 'divers-checklist-commented';
    comment: string;
}
export interface DiversBoatChecklistProps {
    seed: DiversBoatChecklistSeed;
    when: (concern: DiversBoatChecklistConcern) => void;
}

export class DiversBoatChecklist extends React.Component<DiversBoatChecklistProps> {
    private whenCommentedDiversChecklist: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
        const { when } = this.props;
        const message = e.currentTarget.value;
        when({ about: 'divers-checklist-commented', comment: message });
    }
    render() {
        const { seed: { tanks, weights } } = this.props;
        const tanksProps: TanksProps = {
            seed: tanks,
            when: concern => {
                this.props.when({ about: 'tanks', tanks: concern });
            },
        };
        const weightsProps: WeightsProps = {
            seed: weights,
            when: concern => {
                this.props.when({ about: 'weights', weights: concern });
            },
        };
        return <div className="divers-boat">
            <h2>Tanks</h2>
            <Tanks {...tanksProps} />
            <h2>Weights</h2>
            <Weights {...weightsProps} />
            <div>
                Comments about equipment
                <div>
                    <textarea onChange={this.whenCommentedDiversChecklist} />
                </div>
            </div>
        </div>;
    }
}

const inDiversBoatCheckListSeed = toStewardOf<DiversBoatChecklistSeed>();

export function faceDiversBoatChecklistConcern(
    oldSeed: DiversBoatChecklistSeed,
    concern: DiversBoatChecklistConcern,
): DiversBoatChecklistSeed {
    switch (concern.about) {
        case 'divers-checklist-commented': {
            return {
                ...oldSeed, comment: concern.comment,
            };
        }
        case 'tanks': return inDiversBoatCheckListSeed.tanks[$across](
            oldSeed,
            oldTanks => faceTanksConcern(oldTanks, concern.tanks),
        );
        case 'weights': return inDiversBoatCheckListSeed.weights[$across](
            oldSeed,
            oldWeights => faceWeightsConcern(oldWeights, concern.weights),
        );
        default: return broke(concern);
    }

}
