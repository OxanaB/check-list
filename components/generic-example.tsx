import * as React from 'react';
import { toBeingTypeAhead } from './type-ahead-input';

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
