import * as React from 'react';
import { FieldConcern, FieldSeed } from './field';
import { TextField } from './text-field';

export type EquipmentConcern =
    | EquipmentToSaveConcern
    | WhenMasksConcern
    | WhenSnorkelsConcern
    | WhenBcdsConcern
    | WhenRegulatorsConcern
    | WhenShortiesConcern
    | WhenFinsConcern
    | WhenBeltsConcern;

export interface WhenMasksConcern {
    about: 'masks';
    masks: FieldConcern;
}
export interface WhenSnorkelsConcern {
    about: 'snorkels';
    snorkels: FieldConcern;
}
export interface WhenBcdsConcern {
    about: 'bcds';
    bcds: FieldConcern;
}
export interface WhenRegulatorsConcern {
    about: 'regulators';
    regulators: FieldConcern;
}
export interface WhenShortiesConcern {
    about: 'shorties';
    shorties: FieldConcern;
}
export interface WhenFinsConcern {
    about: 'fins';
    fins: FieldConcern;
}
export interface WhenBeltsConcern {
    about: 'belts';
    belts: FieldConcern;
}
export interface EquipmentToSaveConcern {
    about: 'equipment-to-save';
}

export interface EquipmentSeed {
    kind: 'equipment';
    masks: FieldSeed;
    snorkels: FieldSeed;
    bcds: FieldSeed;
    regulators: FieldSeed;
    shorties: FieldSeed;
    fins: FieldSeed;
    belts: FieldSeed;
}
export interface EquipmentProps {
    seed: EquipmentSeed;
    when: (concern: EquipmentConcern) => void;
}

export class Equipment extends React.Component<EquipmentProps> {
    private whenMasks = (concern: FieldConcern) => {
        this.props.when({ about: 'masks', masks: concern });
    }
    private whenSnorkels = (concern: FieldConcern) => {
        this.props.when({ about: 'snorkels', snorkels: concern });
    }
    private whenBcds = (concern: FieldConcern) => {
        this.props.when({ about: 'bcds', bcds: concern });
    }
    private whenRegulators = (concern: FieldConcern) => {
        this.props.when({ about: 'regulators', regulators: concern });
    }
    private whenShorties = (concern: FieldConcern) => {
        this.props.when({ about: 'shorties', shorties: concern });
    }
    private whenFins = (concern: FieldConcern) => {
        this.props.when({ about: 'fins', fins: concern });
    }
    private whenBelts = (concern: FieldConcern) => {
        this.props.when({ about: 'belts', belts: concern });
    }
    render() {
        const { seed: { masks, snorkels, bcds, regulators, shorties, fins, belts } } = this.props;
        return <div className="checklist-form">
            <h2>Equipment</h2>
            <form>
                <label>Masks
                    <TextField seed={masks} when={this.whenMasks}/>
                </label>
                <label>Snorkels
                    <TextField seed={snorkels} when={this.whenSnorkels}/>
                </label>
                <label>BCD
                    <TextField seed={bcds} when={this.whenBcds}/>
                </label>
                <label>Regulators
                    <TextField seed={regulators} when={this.whenRegulators}/>
                </label>
                <label>Shorty
                    <TextField seed={shorties} when={this.whenShorties}/>
                </label>
                <label>Fins
                    <TextField seed={fins} when={this.whenFins}/>
                </label>
                <label>Belts
                    <TextField seed={belts} when={this.whenBelts} />
                </label>
                <button onSubmit={() => {
                    this.props.when({
                        about: 'equipment-to-save',
                    });
                }}>SAVE</button>
            </form>;
        </div>;
    }
}
