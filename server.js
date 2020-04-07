const express = require('express');
const dotenv = require('dotenv');
const exphbs  = require('express-handlebars');


const app = express();
dotenv.config({ path: '.env' })
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.set('view engine', 'handlebars');



app.get('/', (req, res) => {
  res.render('index', {
    title: "Home"
  });
});



app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});