const Sequelize = require("sequelize");
const sequelize = new Sequelize("DBWT19","root","root",{
    host:"127.0.0.1",
    dialect:"mysql",
    logging:false
});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;

//import modela
db.osoblje = sequelize.import(__dirname+'/osoblje.js');
db.rezervacija = sequelize.import(__dirname+'/rezervacija.js');
db.sala = sequelize.import(__dirname+'/sala.js');
db.termin = sequelize.import(__dirname+'/termin.js');


//  Osoblje - jedan na više - Rezervacija
db.osoblje.hasMany(db.rezervacija, {foreignKey : "osoba"});

//Rezervacija - jedan na jedan - Termin
db.termin.hasOne(db.rezervacija,{ as:"terminrezervacija", foreignKey:"termin"});

//Rezervacija - više na jedan - Sala
db.sala.hasMany(db.rezervacija,{foreignKey:"sala"});

//Sala - jedan na jedan - Osoblje
db.osoblje.hasOne(db.sala, {foreignKey:"zaduzenaOsoba"});

//Sala - jedan na jedan - Osoblje
db.sala.belongsTo(db.osoblje, {foreignKey:"zaduzenaOsoba"});

db.rezervacija.belongsTo(db.termin,{ as:"terminrezervacija2", foreignKey:"termin"});

db.rezervacija.belongsTo(db.osoblje, {foreignKey : "osoba"});

db.rezervacija.belongsTo(db.sala,{as:"terminrezervacijasala",foreignKey:"sala"});


module.exports=db;