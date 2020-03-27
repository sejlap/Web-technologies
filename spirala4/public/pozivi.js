var br=0;
var p=0;
var duzina;
var pocetniNiz=0;
var ucitane=0;
var noviniz= [];
var pokupisaformeNiz= [];
var zaduzenaUsali=[];

 function sljedeci(){
     Pozivi.ucitajUPocetnu();
     br++;
     if(duzina==0)  document.getElementById("next").disabled = true;
}

var bio=0;
function prethodni(){
    p++;
    var n=pocetniNiz-1;
    var h="";
    var b=0;
    var k;
    if(n==i && bio==0) { k=i-3; bio=1; }
    else{
       if(p!=0) i=i-3;
       if(br==0 || i==2 || (duzina==0 && i==3))  document.getElementById("prev").disabled = true;
       else  document.getElementById("prev").disabled = false;
        var l=i;
      if((i!=n || i!=n-1 || i!=n-2 || i!=n-3 || i!=n-4 || i!=n-5) && duzina==0 && bio==1) k=l-3; 
        else k=l-2;
        if(k<0) k=0;
    }
   
    while(b!=3){
        b=0;
        h+= '<div class="red" id="red">';
        for(j=k; j<=i; j++){
            h+= '<div class="kolona">';
            h+= '<img src=' + noviniz[j];
            h+= ' alt="cuda svijeta" ';
            h+= '</div>';
            b++;
            if(b==3) break;
        }
     h+= '</div>';
    }
   document.getElementById('slike').innerHTML=h;
   br--;
}
var nizOsoblja=[];
var nizTermina= [];
var nizSala = [];
var nizRezervacija= [];
let  Pozivi = (function(){
    function ucitajUPocetnuImpl(){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200){
                var niz= JSON.parse(ajax.responseText);
                var html="";
                duzina=niz.length-br*3; 
                pocetniNiz=niz.length;
                var brojac=0;
                if(br==0)  document.getElementById("prev").disabled = true;
                else  document.getElementById("prev").disabled = false;
                while(brojac!=3){
                    brojac=0;
                    html+= '<div class="red" id="red">';
                    for(i=0; i<=niz.length; i++){
                        var j=0;
                        if(br==0 && i==0) i=0;
                        if(br!=0 && i==0) i= 3*br;   
                        html+= '<div class="kolona">';
                        html+= '<img src=' + niz[i].slike;
                        noviniz.push(niz[i].slike);
                        j++;
                        html+= ' alt="cuda svijeta" ';
                        html+= '</div>';
                        brojac++; duzina--;
                        if(duzina==0) break;
                        if( brojac==3 ) break; 
                     }
                    html+= '</div>';
                    if(duzina==0) break;
                }
                document.getElementById('slike').innerHTML=html;   
            }
        }
        ajax.open("GET","slike.json",true);
        ajax.send();
    }
    function ucitajUKalendarImpl(){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200){
                var rez = JSON.parse(ajax.responseText);
                var periodicna= [];
                for(var i=0; i< rez.periodicna.length; i++){
                    periodicna.push(rez.periodicna[i]);
                }
                var vanredna= [];
                for(var i=0; i< rez.vanredna.length; i++){
                    vanredna.push(rez.vanredna[i]);
                }
               Kalendar.ucitajPodatke(rez.periodicna, rez.vanredna);
            }
        }
        ajax.open("GET","zauzeca.json",true);
        ajax.send();
    }
  


//spirala 4
//zadatak 1
function prikaziOsobljeImpl(){
    var ajax = new XMLHttpRequest();
   
    ajax.onreadystatechange = function() {
        var rez = ajax.responseText;
        nizOsoblja=rez;
        rez=JSON.parse(ajax.responseText);
        var html="";
        for(i=0; i<rez.length; i++){
            html+= '<option>';
            html+=rez[i].ime;
            html+= ' ';
            html+=rez[i].prezime;
            html+= '</option>';
           
        }
        document.getElementById("osobe").innerHTML = html; 
    }
    
    ajax.open("GET","osoblje",true);
    ajax.send();
}


function uzmiTermineImpl(){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200){
            var rez = JSON.parse(ajax.responseText); //niz upita iz baze
          nizTermina=rez;
    }
}
    ajax.open("GET","termin",true);
    ajax.send();
   
}

function uzmirezervacijeImpl(){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200){
            var rez = JSON.parse(ajax.responseText); //niz upita iz baze
          nizRezervacija=rez;
    }
}
    ajax.open("GET","rezervacija",true);
    ajax.send();
   
}
function uzmiSaleImpl(){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200){
          var rez = JSON.parse(ajax.responseText); //niz upita iz baze
          nizSala=rez;
    }
}
    ajax.open("GET","sala",true);
    ajax.send();
   
}

   
   
//zadatak 3
function popuniOsobeImpl(){
    prikaziOsobljeImpl();
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){
    if (ajax.readyState == 4 && ajax.status == 200){
        var niz=[];
        niz=JSON.parse(nizOsoblja);
        var rez = JSON.parse(ajax.responseText);
        var html="";
        var vrijeme = new Date(); 
        var dan = vrijeme.getDate();
        var mjesec=vrijeme.getMonth()+1;
        var godina=vrijeme.getFullYear()  
        var sati= vrijeme.getHours();
        var minute= vrijeme.getMinutes();
        var sekunde=vrijeme.getSeconds();
        html+= '<tr>  <th> Osobe </th> <th>Sale</th>  </tr>';
        for(i=0; i<rez.length; i++){
            html+='<tr>';
            html+= '<td>';
            html+=rez[i].ime + ' ' + rez[i].prezime;
            html+= '</td>';
            html+='<td>';
            for(var j=0; j<rez.length; j++){
                danB=parseInt(rez[i].rezervacijas[j].terminrezervacija2.datum.substring(0,2));
                mjesecB=parseInt(rez[i].rezervacijas[j].terminrezervacija2.datum.substring(3,5));
                godinaB=parseInt(rez[i].rezervacijas[j].terminrezervacija2.datum.substring(6,10));
                pocsatiB=parseInt(rez[i].rezervacijas[j].terminrezervacija2.pocetak.substring(0,2));
                pocminuteB=parseInt(rez[i].rezervacijas[j].terminrezervacija2.pocetak.substring(3,5));
                pocsekundeB=parseInt(rez[i].rezervacijas[j].terminrezervacija2.pocetak.substring(6,8));
                krajsatiB=parseInt(rez[i].rezervacijas[j].terminrezervacija2.kraj.substring(0,2));
                krajminuteB=parseInt(rez[i].rezervacijas[j].terminrezervacija2.kraj.substring(3,5));
                krajsekundeB=parseInt(rez[i].rezervacijas[j].terminrezervacija2.kraj.substring(6,8));
                if(dan==danB && mjesec==mjesecB && godina==godinaB){    
                    if(pocsatiB<sati && sati<krajsatiB){
                        html+=rez[i].sala.naziv;
                    }
                    else if(pocsatiB==sati && sati <krajsatiB){
                        if(pocminuteB<=minute){
                            html+=rez[i].sala.naziv;
                        }
                    }
                    else if(pocsatiB<sati && sati==krajsatiB){
                        if(minute<=krajminuteB){
                            html+=rez[i].sala.naziv;
                            }
                    }
                    else if(pocsatiB==krajsatiB  && krajsatiB==sati){
                        if(pocminuteB<=minute && minute<=krajminuteB){
                                html+=rez[i].sala.naziv;
                            }
                        }
                        //else { html+='U kancelariji';  }
                    }           
                    else { html+='U kancelariji';  }
                }
                for(var i=0; i<niz.length; i++){
                    var nasao=0;
                    for(var j=0; j<rez.length; j++){
                        if(niz[i].ime==rez[j].ime && niz[i].prezime==rez[j].prezime){
                            nasao=1; 
                            break;
                            }
                    }
                    if(nasao==0){
                        html+='<tr>';
                        html+= '<td>';
                        html+=niz[i].ime;                            
                        html+= ' ';
                        html+=niz[i].prezime;
                        html+= '</td>';
                        html+='<td>';
                        html+=' U kancelariji';
                    }
                }                 
            }
            html+= '</td>';
            html+='</tr>';
            document.getElementById("tabela").innerHTML = html;
        }
    }
        ajax.open("GET","ispis",true);
        ajax.send();
        setTimeout(function(){ popuniOsobeImpl(); }, 30000); // za periodicno azuriranje svkih 30s
    }
    function  upisiPodatkeImpl(salaNaz,redovna, poc, kraj,sem,dat,salazaduzenaO,danUSed,salaBroj,terminBroj){  //potrebni jos dan pon.., (termin, sala, osoba-iz baze pojedinacnih tabela)
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
         //  alert(ajax.responseText);
            var rez=ajax.responseText;
        }
        ajax.open("POST","nova",true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify({
            salaN: salaNaz,
            redovnoZ : redovna,
            pocetakT: poc,
            krajT: kraj,
            semestarT: sem,
            datumT: dat,
            salazaduzenaOsoba: salazaduzenaO,
            danUSedmici: danUSed,
            salaBrojId: salaBroj,
            terminBrojId: terminBroj
            

        }));
    }
    
    function rezervacijaTerminaImpl(){
       //pokupiSaForme();
       uzmiSaleImpl();
       uzmiTermineImpl();
       uzmirezervacijeImpl();
  
         var ajax = new XMLHttpRequest();
         ajax.onreadystatechange = function(){
             if (ajax.readyState == 4 && ajax.status == 200){
                 var niz=[];
                 niz=pokupisaformeNiz;
                 var salaBroj;
                 var terminBroj;

               var rez = JSON.parse(ajax.responseText); //niz upita iz baze
               for(i=0; i<nizSala.length; i++){
                    for(j=0; j<nizRezervacija.length; j++){
                        
                        if(nizSala[i].id==nizRezervacija[j].sala) 
                        {salaBroj=nizSala[i].id;
                      
                      
                       break;
                        }        
                    }
                }
                    for(j=0; j<nizRezervacija.length; j++){
                    for(k=0; k<nizTermina.length; k++){
                        if(nizTermina[k].id==nizRezervacija[j].termin) terminBroj=nizTermina[k].id
                       // alert(nizTermina[k].id); alert(nizRezervacija[j].termin);
                    }
                    }
            
              
                 for(var i=0; i<rez.length; i++){
                     for(var j=0; j<rez.length; j++){
                danB=parseInt(rez[i].rezervacijas[j].terminrezervacija2.datum.substring(0,2));
                 mjesecB=parseInt(rez[i].rezervacijas[j].terminrezervacija2.datum.substring(3,5));
                 godinaB=parseInt(rez[i].rezervacijas[j].terminrezervacija2.datum.substring(6,10));
                 pocsatiB=parseInt(rez[i].rezervacijas[j].terminrezervacija2.pocetak.substring(0,2));
                 pocminuteB=parseInt(rez[i].rezervacijas[j].terminrezervacija2.pocetak.substring(3,5));
                 pocsekundeB=parseInt(rez[i].rezervacijas[j].terminrezervacija2.pocetak.substring(6,8));
                 krajsatiB=parseInt(rez[i].rezervacijas[j].terminrezervacija2.kraj.substring(0,2));
                 krajminuteB=parseInt(rez[i].rezervacijas[j].terminrezervacija2.kraj.substring(3,5));
                 var satiPoc= parseInt(niz[2].substring(0,2));
                 var minutePoc=parseInt(niz[2].substring(3,5));
                 var satiKraj= parseInt(niz[3].substring(0,2));
                 var minuteKraj=parseInt(niz[3].substring(3,5));
                var salaNaz=niz[0]; var redovna=niz[1]; var poc=niz[2]; var kraj=niz[3]; var salazaduzenaO=niz[9];
                var sem=niz[7]; var dat=niz[8];
                var danUSed=niz[10];
            
                 if(salaNaz==rez[i].sala.naziv && redovna==rez[i].rezervacijas[j].terminrezervacija2.redovni 
                     && satiPoc==pocsatiB && satiKraj==krajsatiB && niz[4]==danB && niz[5]==mjesecB && niz[6]==godinaB )
                    { alert("Sala" + rez[i].sala.naziv + " je vec rezervisana. Rezervisao je " + rez[i].ime + " " + rez[i].prezime); }
                
                     else {
                     
                    upisiPodatkeImpl(salaNaz,redovna, poc, kraj,sem,dat,salazaduzenaO,danUSed,salaBroj,terminBroj);
                    alert("Dodano u bazu");
                     }
                 }
             }
         }
        



     }
             ajax.open("GET","ispis",true);
             ajax.send();       
}
    return {
     ucitajUKalendar: ucitajUKalendarImpl,
     ucitajUPocetnu: ucitajUPocetnuImpl,
     prikaziOsoblje: prikaziOsobljeImpl,
     popuniOsobe: popuniOsobeImpl,
     rezervacijaTermina: rezervacijaTerminaImpl,
     upisiPodatke: upisiPodatkeImpl,
     uzmiSale: uzmiSaleImpl,
     uzmirezervacije: uzmirezervacijeImpl,
     uzmiTermine: uzmiTermineImpl
    }
}());
var mjeseci = ["Januar","Februar","Mart", "April", "Maj", "Juni", "Juli", "August", "Septembar", "Oktobar", "Novembar", "Decembar"];

var daniUsedmici= ["Ponedjeljak","Utorak","Srijeda", "Cetvrtak", "Petak", "Subota", "Nedjelja"];
function pokupiSaForme(broj){
    var niz=[];
    var mjesec;
    var danMj;
    var txt;
    var r = confirm("Da li zelite rezervisati ovaj termin?");
    if (r == true) {
        var selectBox = document.getElementById('sal');
        sala = selectBox.options[selectBox.selectedIndex].value;
        pocetak=document.getElementById('time1');
        kraj=document.getElementById('time2');
        var s=sala;
        niz.push(s); //prvi element sala
        if(document.getElementById("periodicna").checked==true) niz.push(true);
        else niz.push(false); //drugi element checkbox
        var p=pocetak.value;
        niz.push(p); // treci element  pocetak vremena
        var k=kraj.value;
        niz.push(k); //cetvrti element kraj vremena
        danMj=broj.textContent;

        niz.push(danMj); //peti element kliknut dan
        var naziv=document.getElementById("naslov").textContent;
        for(i=0; i<12; i++){
            if(mjeseci[i]==naziv){   
                mjesec=i+1;
            }
        }
        var semestar="";
        if(mjesec==10 || mjesec==11 || mjesec==12 || mjesec==1 || mjesec==2)  semestar="zimski";
        else semestar="ljetnji";
        niz.push(mjesec); //sesti element mjesec
        
       var godina =new Date().getFullYear(); // sedmi element godina
       niz.push(godina);
       niz.push(semestar); //osmi
       var dat=" ";
       dat=danMj + "." + mjesec + "." + godina;
       niz.push(dat);
       var selectBoxOsobe= document.getElementById('osobe');
       var zOsoba=" ";
       zOsoba= selectBoxOsobe.options[selectBoxOsobe.selectedIndex].value;
       niz.push(zOsoba); //deveti
       var x;
       if(broj.classList.contains("Ponedjeljak")){
           x=0;
       }
       else if(broj.classList.contains("Utorak")){
        x=1;
      }
       else if(broj.classList.contains("Srijeda")){
        x=2;
      }
      else if(broj.classList.contains("Cetvrtak")){
        x=3;
      }
      else if(broj.classList.contains("Petak")){
        x=4;
      }
      else if(broj.classList.contains("Subota")){
        x=5;
      }
       
      else if(broj.classList.contains("Nedjelja")){
        x=6;
      }
       niz.push(x); //deseti dan
      
    } else {
    txt = "You pressed Cancel!";
    }
   // alert(niz);
    pokupisaformeNiz=niz;
    Pozivi.rezervacijaTermina();
}