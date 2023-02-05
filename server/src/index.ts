import * as dotenv from 'dotenv';
dotenv.config();

import app from './server';

app.listen(3001, () => {
    //console.log(process.env);
  console.log('My node server with TypeScript startet');
});