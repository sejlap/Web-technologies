let assert = chai.assert;
describe('iscrtajKalendar()', function() {
    it('Trebao bi imati 30 dana', function() {
        Kalendar.iscrtajKalendar(document.getElementById("kalendar"),8);
        let dani=document.getElementsByClassName("kolona");
        let brojac = 0;
        for(var i=0; i<dani.length; i++){
              if(dani[i].textContent!='') brojac++;
        }
        assert.equal(brojac, 30,"Trebao bi imati 30 dana");
    });
  
    it('Trebao bi imati 31 dan', function() {
        Kalendar.iscrtajKalendar(document.getElementById("kalendar"),11);
        let dani=document.getElementsByClassName("kolona");
        let brojac = 0;
        for(var i=0; i<dani.length; i++){
              if(dani[i].textContent!='') brojac++;
        }
        assert.equal(brojac, 31,"Trebao bi imati 31 dan");
    });
    it('Trideseti dan bi trebala biti subota', function() {
        Kalendar.iscrtajKalendar(document.getElementById("kalendar"),10);
        let dani=document.getElementsByClassName("kolona");
        let brojac = 0;
        let trideseti;
        let prazni;
        for(var i=0; i<dani.length; i++){
           if(dani[i].textContent!='')  brojac++;
           if(i==7) i=0;
           if(brojac==30){
                trideseti = i;
                break;
            }
        }
        assert.equal(trideseti, 5,"Posljednji dan bi trebala biti subota");
    });

    it('Prvi dan bi trebao biti petak ', function() {
        Kalendar.iscrtajKalendar(document.getElementById("kalendar"),10);
        let dani=document.getElementsByClassName("kolona");
        for(var i=0; i<dani.length; i++){
            if(dani[i].textContent!='')  break;
        }
        let prvi=i;
        assert.equal(prvi, 4,"Prvi dan bi trebao biti petak");
    });


      it('Januar bi trebao imati 31 dan i utorak bi trebao biti prvi dan u mjesecu', function() {
        Kalendar.iscrtajKalendar(document.getElementById("kalendar"),0);
        let dani=document.getElementsByClassName("kolona");
        let prviUtorak = 0;
        let brojac = 0;
        for(var i = 0; i < dani.length; i++) {
            if(dani[i].textContent!='') {
              brojac++;
              if(brojac== 1) {
                prviUtorak = i;
              }      
            }
          }
        assert.equal(brojac, 31,"Treba imati 31 dan");
        assert.equal(prviUtorak, 1,"Utorak treba biti prvi dan");
      });

      it('Cetvrti mjesec april', function() {
        Kalendar.iscrtajKalendar(document.getElementById("kalendar"),3);
        let mjesec = document.getElementById("naslov").textContent;
        assert.equal(mjesec, "April","Cetvrti mjesec bi trebao biti april");
      });

      it('Provjera da oktobar ima 31 dan', function() {
        Kalendar.iscrtajKalendar(document.getElementById("kalendar"),9);
        let dani=document.getElementsByClassName("kolona");
        let brojac = 0;
        for(var i = 0; i < dani.length; i++) {
            if(dani[i].textContent!='') 
              brojac++;     
          }
          console.log(i);
        assert.equal(brojac,31,"Provjera da oktobar ima 31 dan");
      });

    });
      it('Ne bi trebao imati zauzeca', function() {
        Kalendar.obojiZauzeca(document.getElementsByClassName("sadrzaj"),10,'MA','13:00','15:00');
        let zauzeta = document.getElementsByClassName("zauzeta");
        assert.equal(zauzeta.length, 0,"Trebao bi imati 0 zauzetih");
      });
      
      it('Ne bi trebao imati zauzeca u ljetnom', function() {
        Kalendar.iscrtajKalendar(document.getElementById("kalendar"),10);
        var periodicno1 = {
          dan: 0,
          semestar: "ljetni",
          pocetak: "13:30",
          kraj: "15:00",
          naziv: "MA",
          predavac: "NN"
        }
        var periodicno2 = {
          dan: 0,
          semestar: "ljetni",
          pocetak: "12:30",
          kraj: "16:00",
          naziv: "VA",
          predavac: "ZJ"
        }
        var periodicna = [periodicno1,periodicno2];
        var vanredna = [];
        Kalendar.ucitajPodatke(periodicna,vanredna);
        Kalendar.obojiZauzeca(document.getElementById("sadrzaj"),10,'MA','13:00','15:00');
        let zauzeta = document.getElementsByClassName("zauzeta");
        assert.equal(zauzeta.length, 0,"Trebao bi imati 0 zauzetih");
      });
      it('Ne bi trebao imati zauzeca u drugom mjesecu', function() {
        Kalendar.iscrtajKalendar(document.getElementById("kalendar"),10);
        var periodicno1 = {
          dan: 0,
          semestar: "ljetni",
          pocetak: "14:00",
          kraj: "15:00",
          naziv: "MA",
          predavac: "NN"
        }
        var periodicno2 = {
          dan: 0,
          semestar: "ljetni",
          pocetak: "12:30",
          kraj: "16:00",
          naziv: "VA",
          predavac: "ZJ"
        }
        var periodicna = [periodicno1,periodicno2];
        var vanredno = [];
        Kalendar.ucitajPodatke(periodicna,vanredno);
        Kalendar.obojiZauzeca(document.getElementById("glavniDIo"),11,'MA','13:30','15:00');
        let zauzeta = document.getElementsByClassName("zauzeta");
        assert.equal(zauzeta.length, 0,"Trebao bi imati 0 zauzetih");
      });
      it('Nema vanrednih zauzeca u drugom mjesecu', function() {
        Kalendar.iscrtajKalendar(document.getElementById("kalendar"),10);
        var vanredno1 = {
          datum: "30.12.2019",  
          pocetak: "12:00",
          kraj: "15:00",
          naziv: "1-01",
          predavac: "ZJ"
        }
        var periodicna = [];
        var vanredno = [vanredno1];
        Kalendar.ucitajPodatke(periodicna,vanredno);
        Kalendar.obojiZauzeca(document.getElementsByClassName("sadrzaj"),11,'MA','13:30','15:00');
        let zauzeta = document.getElementsByClassName("zauzeta");
        assert.equal(zauzeta.length, 0,"Trebao bi imati 0 zauzetih");
      });
      it('Ne bi trebao imati vanrednih zauzeca u drugom semestru', function() {
        Kalendar.iscrtajKalendar(document.getElementById("kalendar"),10);
        var vanredna = {
          datum: "30.3.2019",  
          pocetak: "12:00",
          kraj: "15:00",
          naziv: "1-01",
          predavac: "Juric"
        }
        var periodicna = [];
        var vanredni = [vanredna];
        Kalendar.ucitajPodatke(periodicna,vanredni);
        Kalendar.obojiZauzeca(document.getElementsByClassName("sadrzaj"),11,'MA','13:30','15:00');
        let zauzeta = document.getElementsByClassName("zauzeta");
        assert.equal(zauzeta.length, 0,"Trebao bi imati 0 zauzetih");
      });
     

/*
      it("Pozivanje obojiZauzeca gdje u zauzećima postoje duple vrijednosti za zauzeće istog termina,očekivano je da se dan oboji bez obzira što postoje duple vrijednosti", function() {
        let ref=document.getElementById('kalendar');
        Kalendar.iscrtajKalendar(ref,2);
        Kalendar.ucitajPodatke([{
                dan: 0,
                semestar: 'zimski',
                pocetak: "09:00",
                kraj: "11:00",
                naziv: "VA1",
                predavac: "Predavac"
            },
            {
                dan: 0,
                semestar: 'zimski',
                pocetak: "09:00",
                kraj: "10:00",
                naziv: "VA1",
                predavac: "Predavac"
            }],
            [{
                datum: "13.11.2019",
                pocetak: "11:00",
                kraj: "12:00",
                naziv: "VA1",
                predavac: "Predavac",
            }
        ]);

     // Kalendar.ucitajPodatke(periodicna, vanredna);
     //  Kalendar.iscrtajKalendar(document.getElementById("kalendar"), 10);
        Kalendar.obojiZauzeca(
            document.getElementsByClassName("sadrzaj"),
            10,
            "VA1",
            "19:00",
            "15:00"
        );
        let dani=document.getElementsByClassName("kolona");
        //Treba samo jedan dan da bude obojen
        let brojac = 0;

        for (let i = 0; i < dani.length; i++) {
            if  (!(dani[i].style.background.includes("linear-gradient(to top, rgb(243, 120, 98) 50%, #fff 50%)")))
            {
                brojac++;
            }
        }
        assert.equal(brojac, 1, "Treba se obojiti jedan dan");
    });
    */


