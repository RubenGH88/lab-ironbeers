const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerPartials(__dirname + "/views/partials");





// Add the route handlers here:




app.get('/', (req, res) => {
  res.render('index');
});


app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then((beersFromApi) => {
      
      res.render("beers.hbs",{ beersFromApi });
    })
    .catch(error => console.log(error));
});


app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then((beerFromApi) => {
      
      res.render("random-beer.hbs",{beer:beerFromApi[0]});
    })
    .catch(error => console.log(error));
});

app.listen(8008, () => console.log('🏃‍ on port 8008'));
