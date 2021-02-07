const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const middlewares = require('./middleware');
const auth = require('./api/auth');

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());

app.use('/auth', auth);

app.get('/', (req, res) => {
  res.json({
    message: 'HelloWorld!',
  });
});



app.use(middlewares.notFound);

app.use(middlewares.errorHandling);

const port = process.env.PORT || 1337;

app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
});
