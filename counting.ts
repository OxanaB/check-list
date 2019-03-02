import { fold } from './utils';

export function factorFromItem(item: string): number {
    switch (item) {
        case '1 kilo-pieces': {
            const factor = 1;
            return factor;
        }
        case '2 kilo-pieces': {
            const factor = 2;
            return factor;
        }
        case '3 kilo-pieces': {
            const factor = 3;
            return factor;
        }
        default: return 0;
    }
}

export function countTotalWeights(numbers: number[], startCount: number): number {
    const sum = fold(numbers, startCount, (sum, number) => sum + number);
    return sum;
}
