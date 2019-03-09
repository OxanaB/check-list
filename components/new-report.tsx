import * as React from 'react';
import { $across, toStewardOf } from '../tools/stewarding';
import { broke } from '../tools/utils';
import { DiversBoatChecklist, DiversBoatChecklistConcern, DiversBoatChecklistProps, DiversBoatChecklistSeed, faceDiversBoatChecklistConcern } from './divers-boat-checklist';
import { faceIntoBoatCheckListConsern, IntroBoatChecklist, IntroBoatChecklistConcern, IntroBoatChecklistProps, IntroBoatChecklistSeed } from './intro-boat-checklist';
import { SelectField, SelectFieldConcern } from './select-field';
import { faceTypeAheadInputConcern, TypeAheadInput, TypeAheadInputConcern, TypeAheadInputProps, TypeAheadInputSeed } from './type-ahead-input';

export type NewReportConcern =
    | { about: 'boat-name', boatName: TypeAheadInputConcern }
    | { about: 'divers-boat', diversBoat: DiversBoatChecklistConcern }
    | { about: 'intro-boat', introBoat: IntroBoatChecklistConcern }
    | SelectFieldConcern;

export interface NewReportSeed {
    activeOption: string;
    boatName: TypeAheadInputSeed;
    diversBoat: DiversBoatChecklistSeed;
    introBoat: IntroBoatChecklistSeed;
}

export interface NewReportProps {
    seed: NewReportSeed;
    when: (concern: NewReportConcern) => void;
}

const boatTypeOptions = ['', 'divers boat', 'intro boat'];
const defaultOption = '';

export const boatNamesSuggestions = ['Lady Nataly', 'Eleonora', 'Maria Sole'];

export class NewReport extends React.Component<NewReportProps> {
    render() {
        const { seed: { activeOption, diversBoat, introBoat, boatName } } = this.props;
        const boatNameProps: TypeAheadInputProps = {
            seed: boatName,
            when: concern => {
                this.props.when({ about: 'boat-name', boatName: concern });
            },
        };
        const diversBoatProps: DiversBoatChecklistProps = {
            seed: diversBoat,
            when: concern => {
                this.props.when({ about: 'divers-boat', diversBoat: concern });
            },
        };
        const introBoatProps: IntroBoatChecklistProps = {
            seed: introBoat,
            when: concern => {
                this.props.when({ about: 'intro-boat', introBoat: concern });
            },
        };
        return <div className="new-report">
            <h1>New report</h1>
            <h3>Choose the boat</h3>
            <form>

                <label>
                    Name <TypeAheadInput {...boatNameProps} />
                </label>
                <label>
                    Type <SelectField defaultOption={defaultOption} options={boatTypeOptions} when={concern => {
                        this.props.when(concern);
                    }} />
                </label>
                {
                    activeOption === 'divers boat'
                        ? <DiversBoatChecklist {...diversBoatProps} />
                        : activeOption === 'intro boat'
                            ? <IntroBoatChecklist {...introBoatProps} />
                            : null
                }
            </form>
        </div>;
    }
}

const inNewReportSeed = toStewardOf<NewReportSeed>();

export function faceNewReportConcern(
    oldSeed: NewReportSeed,
    concern: NewReportConcern,
): NewReportSeed {
    switch (concern.about) {
        case 'boat-name': return inNewReportSeed.boatName[$across](
            oldSeed, oldName => faceTypeAheadInputConcern(
                oldName, boatNamesSuggestions, concern.boatName,
            ),
        );
        case 'divers-boat': return inNewReportSeed.diversBoat[$across](
            oldSeed,
            oldData => faceDiversBoatChecklistConcern(oldData, concern.diversBoat),
        );
        case 'intro-boat': return inNewReportSeed.introBoat[$across](
            oldSeed,
            oldData => faceIntoBoatCheckListConsern(oldData, concern.introBoat),
        );
        case 'selected-option': {
            return {
                ...oldSeed, activeOption: concern.activeOption,
            };
        }
        default: return broke(concern);
    }
}
