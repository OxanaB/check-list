import { $across, toStewardOf } from 'divemaster-checklist/tools/stewarding';
import { broke } from 'divemaster-checklist/tools/utils';
import * as React from 'react';
import { faceTextFieldConcern, TextField, TextFieldConcern, TextFieldSeed } from './text-field';



export type EquipmentConcern =
    | EquipmentToSaveConcern
    | MasksConcern
    | SnorkelsConcern
    | BcdsConcern
    | RegulatorsConcern
    | ShortiesConcern
    | FinsConcern
    | BeltsConcern;

export interface MasksConcern {
    about: 'masks';
    masks: TextFieldConcern;
}
export interface SnorkelsConcern {
    about: 'snorkels';
    snorkels: TextFieldConcern;
}
export interface BcdsConcern {
    about: 'bcds';
    bcds: TextFieldConcern;
}
export interface RegulatorsConcern {
    about: 'regulators';
    regulators: TextFieldConcern;
}
export interface ShortiesConcern {
    about: 'shorties';
    shorties: TextFieldConcern;
}
export interface FinsConcern {
    about: 'fins';
    fins: TextFieldConcern;
}
export interface BeltsConcern {
    about: 'belts';
    belts: TextFieldConcern;
}
export interface EquipmentToSaveConcern {
    about: 'equipment-to-save';
}

export interface EquipmentSeed {
    kind: 'equipment';
    masks: TextFieldSeed;
    snorkels: TextFieldSeed;
    bcds: TextFieldSeed;
    regulators: TextFieldSeed;
    shorties: TextFieldSeed;
    fins: TextFieldSeed;
    belts: TextFieldSeed;
}
export interface EquipmentProps {
    seed: EquipmentSeed;
    when: (concern: EquipmentConcern) => void;
}

export class Equipment extends React.Component<EquipmentProps> {
    private whenMasks = (concern: TextFieldConcern) => {
        this.props.when({ about: 'masks', masks: concern });
    }
    private whenSnorkels = (concern: TextFieldConcern) => {
        this.props.when({ about: 'snorkels', snorkels: concern });
    }
    private whenBcds = (concern: TextFieldConcern) => {
        this.props.when({ about: 'bcds', bcds: concern });
    }
    private whenRegulators = (concern: TextFieldConcern) => {
        this.props.when({ about: 'regulators', regulators: concern });
    }
    private whenShorties = (concern: TextFieldConcern) => {
        this.props.when({ about: 'shorties', shorties: concern });
    }
    private whenFins = (concern: TextFieldConcern) => {
        this.props.when({ about: 'fins', fins: concern });
    }
    private whenBelts = (concern: TextFieldConcern) => {
        this.props.when({ about: 'belts', belts: concern });
    }
    render() {
        const { seed: { masks, snorkels, bcds, regulators, shorties, fins, belts } } = this.props;
        return <form>
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
    }
}

export const inEquipmentSeed = toStewardOf<EquipmentSeed>();

export function faceEquipmentConcern(
    oldEqiupment: EquipmentSeed,
    concern: EquipmentConcern,
): EquipmentSeed {
    switch (concern.about) {
        case 'masks': return inEquipmentSeed.masks[$across](oldEqiupment,
            oldField => faceTextFieldConcern(oldField, concern.masks),
            );
        case 'snorkels': return inEquipmentSeed.snorkels[$across](oldEqiupment,
            oldField => faceTextFieldConcern(oldField, concern.snorkels),
            );
        case 'bcds': return inEquipmentSeed.bcds[$across](oldEqiupment,
            oldField => faceTextFieldConcern(oldField, concern.bcds),
            );
        case 'regulators': return inEquipmentSeed.regulators[$across](oldEqiupment,
            oldField => faceTextFieldConcern(oldField, concern.regulators),
            );
        case 'shorties': return inEquipmentSeed.shorties[$across](oldEqiupment,
            oldField => faceTextFieldConcern(oldField, concern.shorties),
            );
        case 'fins': return inEquipmentSeed.fins[$across](oldEqiupment,
            oldField => faceTextFieldConcern(oldField, concern.fins),
            );
        case 'belts': return inEquipmentSeed.belts[$across](oldEqiupment,
            oldField => faceTextFieldConcern(oldField, concern.belts),
            );
        case 'equipment-to-save': return oldEqiupment;
        default: return broke(concern);
    }
}

export const defaultEquipment: EquipmentSeed = {
    kind: 'equipment',
    masks: {
        value: 0,
        text: '',
        error: '',
    },
    snorkels: {
        value: 0,
        text: '',
        error: '',
    },
    bcds: {
        value: 0,
        text: '',
        error: '',
    },
    regulators: {
        value: 0,
        text: '',
        error: '',
    },
    shorties: {
        value: 0,
        text: '',
        error: '',
    },
    fins: {
        value: 0,
        text: '',
        error: '',
    },
    belts: {
        value: 0,
        text: '',
        error: '',
    },
};
