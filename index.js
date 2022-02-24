const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const fs = require('fs');

const app = require('express')();

const authRouter = require('./routes/auth');
const eventsRouter = require('./routes/event');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.use(authRouter);
app.use('/events', eventsRouter);

app.get('/', (req, res) => {
  res.send('App is live');
})

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
