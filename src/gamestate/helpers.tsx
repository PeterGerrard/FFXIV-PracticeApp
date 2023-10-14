export const pickOne = <T extends unknown>(items: T[]) => {
  return items[(items.length * Math.random()) | 0];
};

export const split = <T extends unknown>(
  items: T[],
  predicate: (a: T) => boolean
): [T[], T[]] => {
  const trues: T[] = [];
  const falses: T[] = [];
  items.forEach((i) => {
    if (predicate(i)) {
      trues.push(i);
    } else {
      falses.push(i);
    }
  });

  return [trues, falses];
};

export const shuffle = <T extends unknown>(items: T[]): T[] => {
  let currentIndex = items.length,
    randomIndex;
  const result = [...items];

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [result[currentIndex], result[randomIndex]] = [
      result[randomIndex],
      result[currentIndex],
    ];
  }

  return result;
};
