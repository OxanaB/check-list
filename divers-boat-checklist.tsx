import * as React from 'react';
import { Tanks, TanksConcern, TanksProps, TanksSeed } from './tanks';
import { Weights, WeightsConcern, WeightsProps, WeightsSeed } from './weights';

export interface DiversBoatChecklistSeed {
    tanks: TanksSeed;
    weights: WeightsSeed;
    comment: string;
}
export type DiversBoatChecklistConcern = TanksConcern | WeightsConcern | CheckListDiversConcern;

export interface CheckListDiversConcern {
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
                this.props.when(concern);
            },
        };
        const weightsProps: WeightsProps = {
            seed: weights,
            when: concern => {
                this.props.when(concern);
            },
        };
        return <div className="wisard">
            <Tanks {...tanksProps} />
            <Weights {...weightsProps} />
            <div>Comments about broken equipment
                <textarea onChange={this.whenCommentedDiversChecklist} /></div>
        </div>;
    }
}
