import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!').status(200);
});

app.get('/bmi', (req, res) => {
    let height, weight: number;
    const val1 = req.query.height as string;
    const val2 = req.query.weight as string; 
    try {
        if(!isNaN(Number(val1)) && !isNaN(Number(val2))) {
                height= Number(val1);
                weight= Number(val2);
                const bmi = calculateBmi(height, weight);
                res.send({height, weight, bmi}).status(200);
        } else {
            throw new Error('Provided values must be numbers');
        }
    } catch (error: unknown) {
        let errorMessage = 'Something bad happend';
        if (error instanceof Error) {
            errorMessage += ':\t' + error.message;
        }
        console.log(errorMessage);
        res.send({error: 'malformatted parameters'}).status(400);
    }
});

app.post('/exercises', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (!req.body || !req.body.daily_exercises || !req.body.target) {
            throw new Error("parameters missing");
        }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const daily_exercises = req.body.daily_exercises as string[];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const req_target = req.body.target as string;

        const exercises: number[] = daily_exercises.map(
            (argument: string): number => {
                if (!isNaN(Number(argument))) {
                    return Number(argument);
                } else {
                    throw new Error('malformatted parameters');
                }
            }
        );
        if (isNaN(Number(req_target))){
            throw new Error('malformatted parameters');
        }

        const target = Number(req_target);

        res.json(calculateExercises(exercises, target)).status(200);
    } catch (error: unknown) {
        let errorMessage = '';
        if (error instanceof Error) {
            errorMessage += error.message;
        }
        res.send({'error': errorMessage}).status(400);
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log('server running on port ' + PORT);
});