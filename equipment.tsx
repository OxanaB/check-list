import * as React from 'react';
import { Field } from './data/tabs-data';

export type EquipmentConcern = EquipmentToSaveConcern;

export interface EquipmentToSaveConcern {
    about: 'equipment-to-save';
}

export interface EquipmentProps {
    masks: Field;
    snorkels: Field;
    BCDs: Field;
    regulators: Field;
    shorty: Field;
    fins: Field;
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
