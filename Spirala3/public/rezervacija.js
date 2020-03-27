Pozivi.ucitajUKalendar();

function funkcija(){
    var dani=document.getElementsByClassName("kolona");
    var sala=document.getElementById("sal");
    var t1=document.getElementById("time1");
    var t2=document.getElementById("time2");
    var x=dani.textContent;
    var niz=[];
    if (confirm("Da li želite da rezervišete ovaj termin")) {
      var nSala=sala.content;
      var nt1=t1.content;
      var nt2=t2.content;
      var data=x;
     
      niz+= nSala + nt1 + nt2 + data;
    } 
    else {
        alert("You pressed Cancel!");
    }
    return niz;
}

