var periodicna1 = [{dan: 1, semestar: "zimski", pocetak: "12:00", kraj: "14:00", naziv: "MA", predavac: "Novica Nosović"},
{dan: 2, semestar: "zimski", pocetak: "12:00", kraj: "14:00", naziv: "VA", predavac: "Vensada Okanović"} ];
var vanredna1 = [{datum: "13.11.2019", semestar: "zimski", pocetak: "10:00", kraj: "12:00", naziv: "MA", predavac: "Željko Jurić"}, 
{datum: "16.11.2019", semestar: "zimski", pocetak: "9:00", kraj: "10:00", naziv: "MA", predavac: "Samir Ribić"} ];

var mjesec;
var trenutni=mjesec;
let Kalendar = (function(){
                    
    var kalendarRef;
    function obojiZauzecaImpl(kalendarRef,mjesec, sala, pocetak, kraj){
        mjesec=trenutni;
        kalendarRef=document.getElementsByClassName("sadrzaj");
        var dani=document.getElementsByClassName("kolona");
        if(periodicna1.length!=0 || vanredna1.length!=0) {
            for(var i=0; i<dani.length; i++){
                if(dani[i].textContent>=1 && (dani[i].textContent<=30 || dani[i].textContent<=31))
                dani[i].style.background="linear-gradient(to top, rgb(50, 219, 50) 50%, #fff 50%)";
            } 
          }
       
            var selectBox = document.getElementById('sal');
            sala = selectBox.options[selectBox.selectedIndex].value;
            pocetak=document.getElementById('time1');
            kraj=document.getElementById('time2');
            
            for(var i=0; i<vanredna1.length; i++){
            var dat=vanredna1[i];
            var sem=vanredna1[i]['semestar'];
            var m=String(dat['datum']).substring(3,5);    //mjesec iz podataka
            var d=String(dat['datum']).substring(0,2); // dan iz podataka
            var n=vanredna1[i]['naziv'];
            var p=vanredna1[i]['pocetak'];
            var k=vanredna1[i] ['kraj'];
                for(var j=0; j<dani.length; j++){
                    if(dani[j].textContent===d && m==trenutni+1 && sala==n && ((trenutni==9 || trenutni==10 || trenutni==11 || trenutni==0) 
                    && sem=="zimski") && ((pocetak.value>k || kraj.value>k ) && pocetak.value!='' && kraj.value!=''))
                      
                  // dani[j].className="zauzeta";
                  dani[i].style.background="linear-gradient(to top, rgb(50, 219, 50) 50%, #fff 50%)";
                   
                }
            } 
            for(var i=0; i<periodicna1.length; i++){
                var dat=periodicna1[i];
                var sem=periodicna1[i];
                var p=periodicna1[i]['pocetak'];
                var k=periodicna1[i] ['kraj'];
                var s= sem['semestar']; 
                var d=String(dat['dan']).substring(0,2); // dan iz podataka
                var n=periodicna1[i]['naziv'];
                for(var j=0; j<dani.length; j++){
                    if( j===parseInt(d) && sala==n && ((trenutni==9 || trenutni==10 || trenutni==11 || trenutni==0) && s=="zimski")){  
                    if(dani[j].textContent!='') {
                        dani[j].style.background="linear-gradient(to top, rgb(243, 120, 98) 50%, #fff 50%)";
                    }
                    d=parseInt(d)+7;
                    }
                }
            }
        }
    
             
    function ucitajPodatkeImpl(periodicna, vanredna){
            periodicna1 = periodicna;
            vanredna1= vanredna;
    }
    var mjesec;
    var trenutni=mjesec;
    function iscrtajKalendarImpl(kalendarRef, mjesec){
        
        if(mjesec!='+1' && mjesec!='-1') trenutni=mjesec;
        if(trenutni==1 && mjesec=='-1') document.getElementById('my').style.display="none";
        else if(trenutni!=1 && mjesec=='+1') document.getElementById('my').style.display="inline-block";
        if(trenutni==10 && mjesec=='+1') document.getElementById('next').style.display="none";
        else if(trenutni!=10 && mjesec=='-1')document.getElementById('next').style.display="inline-block";
         if(mjesec==='+1') { mjesec=trenutni;   trenutni=trenutni+1; }
         if(mjesec==='-1')  { mjesec=trenutni; trenutni=trenutni-1; }
        
         var mjeseci = ["Januar","Februar","Mart", "April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar"];
         var x=mjeseci[trenutni];
        document.getElementById("naslov").innerHTML = x;
        var date = new Date(2019, trenutni+1);
            var firstDay = new Date(date.getUTCFullYear(), date.getUTCMonth(), 1);
            var startingDay = firstDay.getDay();
            if (startingDay==0) startingDay=7;
            startingDay= startingDay-1;
            var brojDana=  32 - new Date(2019, trenutni, 32).getDate();
            var html = ' ';
            var day = 1;
            for (var i = 0; i < 9; i++) {
            html += '<tr>';
            for (var j = 0; j <= 6; j++) { 
                html += '<td class="kolona" id="polje">';
                if (day <= brojDana && (i > 0 || j >= startingDay)) {
                html += day;
                day++;
                }
                html+= '<hr>';
                html += '</td>';
            }
                html += '</tr>';
                if (day > brojDana) {
                    break;
                }
            }
            document.getElementsByClassName("days")[0].innerHTML = html; 
    }
    return {
        obojiZauzeca: obojiZauzecaImpl,
        ucitajPodatke: ucitajPodatkeImpl,
        iscrtajKalendar: iscrtajKalendarImpl,  
    }
    }());
    Kalendar.iscrtajKalendar(document.getElementById("kalendar"),10); 
    Kalendar.ucitajPodatke(periodicna1,vanredna1);
