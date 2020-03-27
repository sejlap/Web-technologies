const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/pocetna', function (req, res) {
    res.sendFile('pocetna.html', { root: path.join(__dirname, './public') });
});
app.get('/', function (req, res) {
    res.sendFile('pocetna.html', { root: path.join(__dirname, './public') });
});
app.get('/sale', function (req, res) {
    res.sendFile('sale.html', { root: path.join(__dirname, './public') });
});
app.get('/unos', function (req, res) {
    res.sendFile('sale.html', { root: path.join(__dirname, './public') });
});

app.get('/rezervacija.js', function (req, res) {
    res.sendFile('rezervacija.js', { root: path.join(__dirname, './public') });
});
app.get('/pozivi.js', function (req, res) {
    res.sendFile('pozivi.js', { root: path.join(__dirname, './public') });
});
app.get('/zauzeca.json', function (req, res) {
    opt = { root: __dirname };
    res.sendFile('zauzeca.json', { root: path.join(__dirname, './public') });
});

app.get('/slike.json', function (req, res) {
    opt = { root: __dirname };
    res.sendFile('slike.json', { root: path.join(__dirname, './public') });
});
//prvi zadatak
//ukoliko se unese sala MA i vrijeme 10:00 AM i 12:00 PM prikaze se zauzece
app.get('/rezervacija.html', function (req, res) {
    fs.readFile('zauzeca.json', 'utf8',(err, data) => {
        if (err) throw err;
        var niz=JSON.parse(data);
        console.log(niz);
        res.send(niz);
    });
});
//treci zadatak
app.get('/pocetna.html', function (req, res) {
    fs.readFile('slike.json',(err, data) => {
        if (err) throw err;
       // console.log(JSON.parse(data));
        res.send(JSON.parse(data));
    });
});

//drugi zadatak
app.post('/',function(req,res){
    var niz=[];
    var sala;
    var vrijeme1;
    var vrIjeme2;
    niz=funkcija();
    for(var i=0; i<niz.length; i++){
       sala=niz[0];
       vrijeme1=niz[1];
       vrijeme2=niz[2];
       dan=niz[3];
    }
    let novaLinija = "\n"+"naziv:" + sala + " pocetak:" + vrijeme1 + " kraj:" + vrijeme2 + " " + dan;
    fs.appendFile('zauzeca.json',novaLinija,function(err){
        if(err) throw err;
        res.send(novaLinija);
    });
 });
 
app.listen(8080);



