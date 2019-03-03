export interface FieldSeed {
    value: number | null;
    text: string;
    error: string;
}

export type FieldConcern = { about: 'changed-text', text: string };
