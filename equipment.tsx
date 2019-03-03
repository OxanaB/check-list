import * as React from 'react';
import { FieldSeed } from './data/field';

export type EquipmentConcern = EquipmentToSaveConcern;

export interface EquipmentToSaveConcern {
    about: 'equipment-to-save';
}

export interface EquipmentSeed {
    kind: 'equipment';
    masks: FieldSeed;
    snorkels: FieldSeed;
    bcds: FieldSeed;
    regulators: FieldSeed;
    shorty: FieldSeed;
    fins: FieldSeed;
}
export interface EquipmentProps {
    seed: EquipmentSeed;
    when: (concern: EquipmentConcern) => void;
}

export class Equipment extends React.Component<EquipmentProps> {
    render() {
        return <form className="checklist-form">
            <h2>Equipment</h2>
            <button onSubmit={() => {
                this.props.when({
                    about: 'equipment-to-save',
                });
            }}>SAVE</button>
        </form>;
    }
}
