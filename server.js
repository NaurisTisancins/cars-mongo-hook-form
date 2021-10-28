require("dotenv").config();
// const morgan = require('morgan');
const mongoose = require('mongoose');
// const cors = require('cors');

// console.log(process.env);
const {
  PORT = 3001,
  MONGODB_URI = "mongodb://localhost/cars" //<-- implicit db creation
} = process.env;

(async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI);
    // console.log("connected", conn);
    // this is for errors after a connection has been established
    mongoose.connection.on("error", (err) => {
      console.log(err);
    });
  } catch (error) {
    // this is for connection error
    console.log(error);
  }
})();

const Schema = mongoose.Schema;
const carSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  bhp: {
    type: Number,
    required: true
  },
  avatar_url: {
    type: String,
    default: 'https://static.thenounproject.com/png/449586-200.png'
  }
});

const Car = mongoose.model('Car', carSchema);

// const cars = [
//   {
//     make: 'tesla',
//     bhp: 3,
//   },
//   {
//     make: 'tesla2',
//     bhp: 3,
//   }
// ];

const express = require("express");

const app = express();

// app.use(morgan('combined'));

// [fn, fn2, fn3]

app.use(express.static('public'));
app.use(express.json());
// app.use(cors());

// app.use(function(req, res, next){
//   console.log('middleware');
//   next();
//   // if(req.isAuthenticated) {
//   //   next();
//   // }
//   // res.redirect('/login.html')
// })

app.get('/api/v1/cars', (req, res) => {
  Car.find({}).exec((err, cars) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(cars);
  })
});//end of get

app.post('/api/v1/cars', (req, res) => {
  console.log(req.body);
  const car = new Car(req.body);
  car.save((err, newCar) => {
    if (err) return res.status(500).send(err);
    res.status(201).send(newCar);
  })
});//end of add

app.delete('/api/v1/cars/:id', (req, res) => {
  Car.deleteOne({ _id: req.params.id }, (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(204);
  })
});//end of delete

app.put('/api/v1/cars/update/:id', async (req, res) => {
  try {
    const id = req.params.id; 
    const updates = req.body;
    //findByIdAndUpdate returns the objects as it was before the update
    const result = await Car.findByIdAndUpdate(id, updates);
    const updateCar = await Car.findOne({ "_id": result.id });
    res.send(updateCar);
  } catch (err) {
    console.log(err.message);
  }
});//end of update

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

// import lodash, {slice } from 'lodash'

// const name = 'James';

// const users = require('./user.json');

// exports function a(){}
// exports function b(){}

// module.exports = function(){}

// const myFunc = require('./myFunc.js');

// const myEmitter = new EventEmitter();

// myEmitter.on('test_event', (data) => {
//   console.log('test_event received', data);
// });

// myEmitter.emit('test_event', 123);

// const { exec } = require('child_process');
// const { inspect } = require('util');

// exec('./shell.sh');

// console.log(process)
// console.log(inspect(process, {
//   depth: 20,
//   showHidden: true,
//   colors: true,
// }));

// const process = require('process');

// process.exit(1);
// console.log(process.exitCode);

// const path = require('path');

// const p = path.join('test_dir/', '/inner.txt');
// const p2 = path.join(__dirname, 'public');
// console.log(p2);

// console.log(path.resolve('test_dir', 'inner.txt'))
// console.log('p2 directory = ', path.dirname(p2));

// const filepath = './thing/thing.txt';
// console.log(path.basename(filepath));

// const fs = require('fs');

// fs.mkdir('test_dir', (err) => {
//   console.log(err);
// });

// const data = new Uint8Array(Buffer.from('Hello Node.js'));

// fs.writeFile('my_text.txt', data, (err) => {
//   console.log(err);
// })

// fs.readFile('./test.txt', 'utf8', (err, data) => {
//   if(err) {
//     console.log(err);
//     return;
//   }

//   console.log({data});
// })

// const {readFile} = require('fs').promises;

// (async () => {
//   try {
//     const text = await readFile('./test.txt', 'utf8');
//     console.log('text', text);
//   } catch (err) {
//     console.log(err);
//   }
// })();

// const os = require('os');

// console.log(os.cpus());
// console.log(`I have ${os.cpus().length} cores`);

// console.log(os.userInfo());

// console.log('__filename', __filename)
// console.log('__dirname', __dirname)

// require("dotenv").config();

// console.log(process.env);

// const {
//   SERVER_ID
// } = process.env;

// console.log(`Server id ${SERVER_ID}`)

// const {
//   DB_URL = 'mongodb+srv//skdjfklsjdfklsjdklfjsdklfjsd',
//   STRIPE_KEY=""
// } = process.env;

// db.conn(DB_URL);

// const client = new Stripe({
//   password: STRIPE_KEY
// });
