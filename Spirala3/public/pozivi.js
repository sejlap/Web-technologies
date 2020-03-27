  var br=0;
   var p=0;
   var duzina;
   var pocetniNiz=0;
   var ucitane=0;
   var noviniz= [];
   
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
    function potvrdiOdgovorImpl(){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200){
                var rez = ajax.responseText;
            }
        }
        ajax.open("POST","zauzeca.json",true);
        ajax.send();
    }
    return {
     ucitajUKalendar: ucitajUKalendarImpl,
     ucitajUPocetnu: ucitajUPocetnuImpl,
     potvrdiOdgovor:potvrdiOdgovorImpl
    }
}());
