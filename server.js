const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = require('./app');

mongoose
  .connect('mongodb://localhost:27017/testQ')
  .then(() => console.log('DB connected '))
  .catch((err) => {
    console.log(err);
  });

dotenv.config({ path: './vars/config.env' });

const port = process.env.PORT;
app.listen(port, () => console.log(`App is running on port ${port}`));
