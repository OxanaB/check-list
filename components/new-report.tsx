import * as React from 'react';
import { $across, toStewardOf } from '../tools/stewarding';
import { broke } from '../tools/utils';
import { DiversBoatChecklist, DiversBoatChecklistConcern, DiversBoatChecklistProps, DiversBoatChecklistSeed, faceDiversBoatChecklistConcern } from './divers-boat-checklist';
import { faceIntoBoatCheckListConsern, IntroBoatChecklist, IntroBoatChecklistConcern, IntroBoatChecklistProps, IntroBoatChecklistSeed } from './intro-boat-checklist';
import { SelectField, SelectFieldConcern } from './select-field';

export type NewReportConcern =
    | { about: 'divers-boat', diversBoat: DiversBoatChecklistConcern }
    | { about: 'intro-boat', introBoat: IntroBoatChecklistConcern }
    | NewReportInputConcern
    | SelectFieldConcern;

export interface NewReportInputConcern {
    about: 'changed-boat-name';
    boatName: string;
}

export interface NewReportSeed {
    activeOption: string;
    boatName: string;
    diversBoat: DiversBoatChecklistSeed;
    introBoat: IntroBoatChecklistSeed;
}

export interface NewReportProps {
    seed: NewReportSeed;
    when: (concern: NewReportConcern) => void;
}

const boatOptions = ['', 'divers boat', 'intro boat'];
const defaultOption = '';

export class NewReport extends React.Component<NewReportProps> {
    private whenChanged: React.ChangeEventHandler<HTMLInputElement> = e => {
        const { when } = this.props;
        const text = e.currentTarget.value;
        when({ about: 'changed-boat-name', boatName: text });
    }
    render() {
        const { seed: { activeOption, diversBoat, introBoat, boatName } } = this.props;
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
                    Name <input onChange={this.whenChanged} value={boatName} placeholder="Enter boat name" />
                </label>
                <label>
                    Type <SelectField defaultOption={defaultOption} options={boatOptions} when={concern => {
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

export function faceBoatSelectConcern(
    oldSeed: NewReportSeed,
    concern: NewReportConcern,
): NewReportSeed {
    switch (concern.about) {
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
        case 'changed-boat-name': {
            return {
                ...oldSeed, boatName: concern.boatName,
            };
        }
        default: return broke(concern);
    }
}
