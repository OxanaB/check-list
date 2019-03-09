import * as React from 'react';
import { $across, toStewardOf } from '../tools/stewarding';
import { broke, matchOptions } from '../tools/utils';
import { DiversBoatChecklist, DiversBoatChecklistConcern, DiversBoatChecklistProps, DiversBoatChecklistSeed, faceDiversBoatChecklistConcern } from './divers-boat-checklist';
import { faceIntoBoatCheckListConsern, IntroBoatChecklist, IntroBoatChecklistConcern, IntroBoatChecklistProps, IntroBoatChecklistSeed } from './intro-boat-checklist';
import { SelectField, SelectFieldConcern } from './select-field';
import { toBeingTypeAhead } from './type-ahead-input';

export const { TypeAheadInput: BoatName, faceTypeAheadInputConcern } = toBeingTypeAhead<string>(
    text => text,
    text => text,
    ['Lady Nataly', 'Eleonora', 'Maria Sole'],
    (items, text) => matchOptions(items, text),
    text => text,
);

interface Person {
    first: string;
    last: string;
    email: string;
}
export const {
    TypeAheadInput: PersonPicker,
    faceTypeAheadInputConcern: facePersonPickerConcern,
} = toBeingTypeAhead<Person>(
    person => <div><b>{person.first}</b> <i>{person.last}</i></div>,
    person => person.email,
    [{ first: 'Chloe', last: 'Bykov', email: 'xxx' }, { first: 'Andrew', last: 'Bykov', email: 'yyy' }],
    (prople, text) => prople.filter(
        person => person.first.includes(text) || person.last.includes(text) || person.email.includes(text),
    ),
    person => person.first + ' ' + person.last,
);


export type NewReportConcern =
    | { about: 'boat-name', boatName: typeof BoatName.Concern; }
    | { about: 'divers-boat', diversBoat: DiversBoatChecklistConcern }
    | { about: 'intro-boat', introBoat: IntroBoatChecklistConcern }
    | SelectFieldConcern;

export interface NewReportSeed {
    activeOption: string;
    boatName: typeof BoatName.Seed;
    diversBoat: DiversBoatChecklistSeed;
    introBoat: IntroBoatChecklistSeed;
}

export interface NewReportProps {
    seed: NewReportSeed;
    when: (concern: NewReportConcern) => void;
}

const boatTypeOptions = ['', 'divers boat', 'intro boat'];
const defaultOption = '';

export class NewReport extends React.Component<NewReportProps> {
    render() {
        const { seed: { activeOption, diversBoat, introBoat, boatName } } = this.props;
        const boatNameProps: typeof BoatName.Props = {
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
                    Name <BoatName {...boatNameProps} />
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
                oldName, concern.boatName,
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
