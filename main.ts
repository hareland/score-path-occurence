export const scorePathOccurrence = (tuples: string[][], sliceLength = 3, limit = 10) => {
    const scores = {};
    const tripletBuilders = {};

    for (const tuple of tuples) {
        const [path, group] = tuple;

        if (!tripletBuilders.hasOwnProperty(group)) {
            tripletBuilders[group] = [];
        }

        tripletBuilders[group].push(path);

        if (tripletBuilders[group].length === sliceLength) {
            const scoreKey = tripletBuilders[group].join('->');
            if (!scores.hasOwnProperty(scoreKey)) {
                scores[scoreKey] = 0;
            }

            scores[scoreKey]++;
            tripletBuilders[group].shift();
        }
    }

    return Object.fromEntries(
        Object
            .entries(scores)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .slice(0, limit)
    );
}

const logFile: string[][] = [
    ['/', 'user_1'],
    ['/about', 'user_1'],
    ['/', 'user_3'],
    ['/features', 'user_1'],
    ['/about', 'user_2'],
    ['/purchase', 'user_2'],
    ['/purchase', 'user_1'],
    ['/thank-you', 'user_1'],
    ['/about', 'user_3'],
    ['/thank-you', 'user_2'],
    ['/purchase', 'user_3'],
    ['/thank-you', 'user_3'],
];

const main = (logFile: string[][]) => {
    console.log(scorePathOccurrence(logFile, 3, 10));
}

main(logFile);

/*
{
  '/about->/purchase->/thank-you': 2,
  '/->/about->/features': 1,
  '/about->/features->/purchase': 1,
  '/features->/purchase->/thank-you': 1,
  '/->/about->/purchase': 1
}
 */
