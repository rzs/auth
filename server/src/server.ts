import express from 'express';
import morgan from 'morgan';

const app = express();

// middleware
app.use(morgan('dev')); // middleware --> see log in server console
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', async (req, res) => {
  console.log('hello from server');
  res.status(200);
  res.json({message: 'hello from server'});
});

export default app;