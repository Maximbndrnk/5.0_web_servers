const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();  
    let log = `${now}: ${req.method} ${req.url}`

    fs.appendFileSync('server.log', log+'\n');
    next();
});

// app.use((req,res,next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req, resp) => {
    // resp.send('<h1>Hello Express!</h1>');
    // resp.send({
    //     name: 'Max',
    //     likes: [
    //         'boobs',
    //         'pokemons'
    //     ]
    // });
    resp.render('home.hbs', {
        pageTitle: 'Home page',
        wellcomeMsg: 'Hello pokemons!',
    });
});

app.get('/about', (req, resp) => {
    resp.render('about.hbs', {
        pageTitle: 'About page',
    });
});

app.get('/bad', (req, resp) => {
    resp.send({
        error: 'Watafak error!'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});