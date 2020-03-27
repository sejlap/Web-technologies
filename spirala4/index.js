
const db = require('./db.js');

db.sequelize.sync({force:true}).then(function(){
   inicializacija().then(function(){
       console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
       process.exit();
   });
});
function inicializacija(){
  
    return new Promise(function(resolve,reject){
    db.osoblje.create({ime:'Neko', prezime:'Nekic', uloga: "profesor"});  
    db.osoblje.create({ime:'Drugi', prezime:'Neko', uloga: "asistent"});  
    db.osoblje.create({ime:'Test', prezime:'Test', uloga: "asistent"}); 
    db.sala.create({naziv:'1-11', zaduzenaOsoba:1}); 
    db.sala.create({naziv:'1-15', zaduzenaOsoba:2}); 
    db.termin.create({redovni:false, dan:"NULL", datum:"01.01.2020",semestar:"NULL", pocetak: "12:00", kraj: "13:00"});
    db.termin.create({redovni:true, dan:0, datum:"NULL",semestar: "zimski", pocetak: "13:00", kraj: "14:00"});
    db.rezervacija.create({termin: 1, sala:1, osoba:1}); 
    db.rezervacija.create({termin: 2, sala:1, osoba:3});
});    
}
const mysql = require('mysql2');
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

app.get('/sale', function (req, res) {
    res.sendFile('sale.html', { root: path.join(__dirname, './public') });
});
app.get('/unos', function (req, res) {
    res.sendFile('unos.html', { root: path.join(__dirname, './public') });
});
app.get('/osobe', function (req, res) {
    res.sendFile('osobe.html', { root: path.join(__dirname, './public') });
});

app.get('/rezervacijaa.js', function (req, res) {
    res.sendFile('rezervacijaa.js', { root: path.join(__dirname, './public') });
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


//spirala 4

//prvi zadatak

//GET /osoblje -dohvati svo osoblje
app.get('/osoblje', (req, res) => {
    var niz = [];
    db.osoblje.findAll().then((resp) => {
        resp.forEach((object) => {
            var objekat = {ime:object.ime, prezime:object.prezime, uloga:object.uloga};
            niz.push(objekat);
        });
        var json = JSON.stringify(niz);
        res.send(json);
      });
});





//GET /sala - dohvati sve sale 
app.get('/sala', (req, res) => {
    var niz = [];
    db.sala.findAll().then((resp) => {
        resp.forEach((object) => {
            var objekat = {id:object.id,naziv:object.naziv, zaduzenaOsoba:object.zaduzenaOsoba};
            niz.push(objekat);
        });
        var json = JSON.stringify(niz);
        res.send(json);
      });
});


app.get('/termin', (req, res) => {
    var niz = [];
    db.termin.findAll().then((resp) => {
        resp.forEach((object) => {
            var objekat = {id:object.id, redovni:object.redovni};
            niz.push(objekat);
        });
      var json = JSON.stringify(niz);
        res.send(json);
      });
});


app.get('/rezervacija', (req, res) => {
    var niz = [];
    db.rezervacija.findAll().then((resp) => {
        resp.forEach((object) => {
            var objekat = {id:object.id, termin:object.termin, osoba:object.osoba, sala:object.sala};
            niz.push(objekat);
        });
        var json = JSON.stringify(niz);
        res.send(json);;
      });
});

//treci zadatak

//dohvatanje svih zauzeca i ko ih je zauzeo i u kom terminu 
app.get('/ispis', (req, res) => {
    var niz = [];

    db.osoblje.findAll({
        include: [
            {
                model: db.sala,
                required: true,
            },
            {
                model: db.rezervacija,
                required: true,
                include: [
                {
                  model: db.termin,
                  required: true,
                  as: "terminrezervacija2"
                }]
            }]
        }).then(function(zauzeca){
            res.send(zauzeca);
        })
});

app.get('/ispis', (req, res) => {
    var niz = [];

    db.osoblje.findAll({
        include: [
            {
                model: db.sala,
                required: true,
            },
            {
                model: db.rezervacija,
                required: true,
                include: [
                {
                  model: db.termin,
                  required: true,
                  as: "terminrezervacija2"
                }]
            }]
        }).then(function(zauzeca){
            res.send(zauzeca);
        })
});

app.post('/nova',function(req,res){
   
   let novaLinija =    db.termin.create({redovni:req.body.redovnoZ, dan:req.body.danUSedmici, datum:req.body.datumT,semestar:req.body.semestarT, pocetak: req.body.pocetakT, kraj:req.body.krajT });
   //novaLinija +=     db.sala.create({naziv:req.body.salaN, zaduzenaOsoba:1}); 
    //novaLinija += db.rezervacija.create({termin: req.body.terminBrojId, sala:req.body.salaBrojId, osoba:3});
    res.send(novaLinija);

 });
app.listen(8080);





