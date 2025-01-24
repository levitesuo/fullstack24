interface returnFormat { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: 1 | 2 | 3,
    ratingDescription: string,
    target: number,
    average: number
}

const parseCalcArguments = (args: string[]): number[] => (
    args
        .slice(2)
        .map(
            (argument: string): number => {
                if (!isNaN(Number(argument))) {
                    return Number(argument);
                } else {
                    throw new Error('All provided values must be numbers');
                }
            }
    )
);

const calculateExercises = (data: number[], target: number): returnFormat => {
    const periodLength = data.length;
    const trainingDays = data.filter((hours: number): boolean => hours !== 0).length;
    const average = data.reduce((acc: number, obj: number): number => (acc + obj))/periodLength;
    const success = target < average;
    const ratingDescription = trainingDays && success ? 'good' : trainingDays ? 'not too bad but could be better' : 'bad';
    const rating = trainingDays && success ? 3 : trainingDays ? 2 : 1;

    return ({periodLength, trainingDays, success, rating, ratingDescription, target, average});
};


try {
    const days = parseCalcArguments(process.argv);
    console.log(calculateExercises(days, 2));
} catch (error: unknown) {
    let errorMessage = 'Something bad happend';
    if (error instanceof Error) {
        errorMessage += ':\t' + error.message;
    }
    console.log(errorMessage);
}

export default calculateExercises;