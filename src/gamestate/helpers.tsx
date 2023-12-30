export const pickOne = <T,>(items: T[]) => {
  return items[(items.length * Math.random()) | 0];
};

export const extractN = <T,>(
  items: T[],
  amount: number
): [T[], T[]] => {
  const s = shuffle(items);
  return [s.slice(0, amount), s.slice(amount)];
};

export const split = <T,>(
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

export const shuffle = <T,>(items: T[]): T[] => {
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
