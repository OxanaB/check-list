
export function getRandomElement<T>(array: T[]): T {
    const n = Math.random() * array.length;
    const r = Math.floor(n);
    const randomElement = array[r];
    return randomElement;
}
export function copyArray<T>(array: T[]): T[] {
    return array.slice(0);
}

export function swapInArray<T>(array: T[], oneIndex: number, anotherIndex: number): T[] {
    const copied = copyArray(array);
    const oneValue = copied[oneIndex];
    const anotherValue = copied[anotherIndex];
    copied[oneIndex] = anotherValue;
    copied[anotherIndex] = oneValue;
    return copied;
}

export function map<In, Out>(value: In[], instead: (value: In) => Out) {
    const resulut: Out[] = [];
    for (let index = 0; index < value.length; index++) {
        const inValue = value[index];
        const outValue = instead(inValue);
        resulut.push(outValue);
    }
    return resulut;
}

export function filter<T>(all: T[], shouldKeep: (val: T) => boolean): T[] {
    const result: T[] = [];
    for (let index = 0; index < all.length; index++) {
        const val = all[index];
        if (shouldKeep(val)) {
            result.push(val);
        }
    }
    return result;
}

export function fold<T, R>(vals: T[], result: R, take: (result: R, val: T) => R): R {
    for (let index = 0; index < vals.length; index++) {
        const val = vals[index];
        result = take(result, val);
    }
    return result;
}

export function sum(numbers: number[]): number {
    const sum = fold(numbers, 0, (sum, number) => sum + number);
    return sum;
}

// for typeahead
export function matchOptions(options: string[], text: string): string[] {
    const filtered = options.filter(option => option.toLocaleLowerCase().includes(text.toLocaleLowerCase()));
    return filtered;
}

export function minus(left: string[], right: string[]): string[] {
    return left.filter(left => !right.includes(left));
}

// for reducers

export function crash(message: string): never  {
    throw new Error(message);
}

export function broke(never: never): never {
    console.log(never);
    throw new Error('Unexpected case.');
}

// for proper state
export function to<T>(value: T): T { return value; }
