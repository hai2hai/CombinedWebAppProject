const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./models');

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// respond with "hello world" when a GET request is made to the homepage
app.get('/', async function (req, res) {
  res.send("hello")
});

app.use('/product', require('./routes/productRoutes'));

app.use('/home', require('./routes/homeRoutes'));

db.sequelize.sync({ alter: true }).then(req => {
  console.log("synced!");
})

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
