
import express, { Request, Response } from 'express';
import { splitString } from './logic';

const app = express();
const port = 8001;


// spliting the given string
app.get('/split/params/:inputString', (req: Request, res: Response) => {
  const inputString = req.params.inputString;
  const { revisedString } = splitString(inputString);
  res.json({ revisedString });
});

app.get('/split/query', (req: Request, res: Response) => {
  const inputString = req.query.inputString as string;
  const { revisedString } = splitString(inputString);
  res.json({ revisedString });
});


//concatenating the given string
app.get('/concat/params/:param1/:param2', (req: Request, res: Response) => {
    const param1 = req.params.param1;
    const param2 = req.params.param2;
    const concatenatedString = param1 + param2;
    res.json({ revisedString: concatenatedString });
  });
  
  app.get('/concat/query', (req: Request, res: Response) => {
    const param1 = req.query.param1 as string;
    const param2 = req.query.param2 as string;
    const concatenatedString = param1 + param2;
    res.json({ revisedString: concatenatedString });
  });


  //leap year
  function isLeapYear(year: number): boolean {
    if (year % 4 !== 0) {
      return false;
    } else if (year % 100 !== 0) {
      return true;
    } else if (year % 400 === 0) {
      return true;
    } else {
      return false;
    }
  }
  
  app.get('/leap-year/:year', (req: Request, res: Response) => {
    const year = parseInt(req.params.year);
    if (isNaN(year)) {
      res.status(400).json({ error: 'Invalid year. Please provide a valid year.' });
    } else {
      const isLeap = isLeapYear(year);
      res.json({ year, isLeap });
    }
  });
  

// convert a number to a secret handshake sequence
function secretHandshake(number: number): string[] {
  const binaryString = number.toString(2); // Convert number to binary string
  const actions: string[] = [];

  for (let i = binaryString.length - 1; i >= 0; i--) {
    if (binaryString[i] === '1') {
      switch (1 << (binaryString.length - 1 - i)) {
        case 1: // 00001
          actions.push('wink');
          break;
        case 2: // 00010
          actions.push('double blink');
          break;
        case 4: // 00100
          actions.push('close your eyes');
          break;
        case 8: // 01000
          actions.push('jump');
          break;
        case 16: // 10000
          actions.reverse();
          break;
      }
    }
  }

  return actions;
}


app.get('/secret-handshake/:number', (req: Request, res: Response) => {
  const number = parseInt(req.params.number);
  if (isNaN(number) || number < 1 || number > 31) {
    res.status(400).json({ error: 'Invalid number. Please provide a number between 1 and 31.' });
  } else {
    const actions = secretHandshake(number);
    res.json({ number, actions });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
