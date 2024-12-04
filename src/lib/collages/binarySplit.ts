function makeRow<T>(value: T, size: number) {
  return Array.from({ length: size }, () => value);
}

function makeColumn<T>(value: T, size: number) {
  return Array.from({ length: size }, () => value).map((row) => [row]);
}

function concat2DArray<T>(array1: T[][], array2: T[][]) {
  return array1.map((row, index) => [...row, ...array2[index]]);
}

export function buildTemplate<T>(array: T[], isHorizontal: boolean): T[][] {
  if (array.length === 2) {
    return isHorizontal ? [[array[0]], [array[1]]] : [array];
  }

  if (array.length === 1) {
    return [array];
  }

  const left = buildTemplate(array.slice(0, array.length / 2), !isHorizontal);
  const right = buildTemplate(array.slice(array.length / 2), !isHorizontal);

  if (isHorizontal) {
    if (left[0].length !== right[0].length) {
      const size = right[0].length;
      return [makeRow(left[0][0], size), ...right];
    }

    return [...left, ...right];
  }

  if (left.length !== right.length) {
    return concat2DArray(makeColumn(left[0][0], right.length), right);
  }

  return concat2DArray(left, right);
}

// console.table(buildTemplate([1, 2], true));
// console.table(buildTemplate([1, 2, 3], true));
// console.table(buildTemplate([1, 2, 3, 4], false));
// console.table(buildTemplate([1, 2, 3, 4, 5], false));
// console.table(buildTemplate([1, 2, 3, 4, 5, 6], true));
// console.table(buildTemplate([1, 2, 3, 4, 5, 6, 7], false));
