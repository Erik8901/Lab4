window.addEventListener("load", function() {
  let btnLoggIn = document.getElementById("btnLoggIn");
  let btnKeyGen = document.getElementById("btnKeyGen");
  let boxlogin = document.getElementById("boxlogin");
  let http = new XMLHttpRequest();
  let container = document.getElementsByClassName("container")[0];
  let userName = document.getElementById("userName"); /*Här är användarens id*/
  let userPassword = document.getElementById("userPassword"); /*Här skall nyckel sparas ner*/
  let answer = "";
  let found = false;
  let key = "";
  let keyMaster = "key=Ln9a4"; /*användarens inloggningsuppgifter sparas i detta bibliotek*/
  let userId = "";
  let title = "";
  let author = "";

  /* FUNKTION FÖR ATT KONTROLLERA LÖSENORD OCH LOGGA IN */
  btnLoggIn.addEventListener("click", function() {
    key = "key=Ln9a4"; /*På denna nycklen lagras alla användare och lösenorden går ej att bytas ut eftersom de är kopplade till användarens bibliotek*/
    let typ = "op=select";
    let link = "https://www.forverkliga.se/JavaScript/api/crud.php?";
    console.log(link + key + "&" + typ);
    http.open("GET", link + key + "&" + typ, true);
    http.send();

    http.onreadystatechange = function() {

      if (this.readyState === 4) {
        console.log(JSON.parse(http.response));
        answer = JSON.parse(http.response);
        for (i = 0; i < answer.data.length; i++) {
          if (userName.value == answer.data[i].title) {
            if (userPassword.value == answer.data[i].author) {
              document.getElementsByClassName("header-right")[0].innerHTML="Inloggad: " + userName.value;
              console.log("Rätt lösenord");
              key = "key="+ answer.data[i].author;
              userId = "id="+ answer.data[i].id;
              title  = "title="+answer.data[i].title;
              found=true;

              loadUserLib();
            } else {
              console.log("Felaktigt lösenord");
              found=true;
            }
          }
        }
        if (!found) {
          console.log("Användare Saknas");
        }
      }
    };
  });
  /*   LOGGIN  END! */

  /* FUNKTION FÖR ATT SKAPA EN NYCKEL *********************************/
  btnKeyGen.addEventListener("click", function() {
    http.onreadystatechange = function() {
      if (this.readyState == 4) {
        answer = JSON.parse(http.response);
        console.log(answer.key);
        boxlogin.innerHTML += "Your key is: " + answer.key
      }
    };

    http.open("GET", "https://www.forverkliga.se/JavaScript/api/crud.php?requestKey");
    http.send();
  });
  /* --   END ----- FUNKTION FÖR ATT SKAPA EN NYCKEL******************/




 /* Navigeringsbar visa artikel  *************************************/
 let navBar = document.getElementsByClassName("navBar");
 let article  = document.getElementsByClassName('article')
 article[0].style.display="block"; /* Denna skall bort med css*/

  let showArticle = function(event){
    for(i=0;i<article.length;i++){
      if(event.target==navBar[i]){
        article[i].style.display="block";
      }else {
        article[i].style.display="none";
      }
    }
  }

  for(i=0;i<navBar.length;i++){
    navBar[i].addEventListener("click",showArticle);
  }
 /* Navigeringsbar END  **********************************************/


 /********  Hämta Data från databasen ********************************/
 /* Nyckeln skall vara vara satt till innan denna funktion körs ex: key = "key="+"xxxxx" **/

  let loadUserLib = function (){
    http.onreadystatechange = function(){
      if(this.readyState==4){
        document.getElementsByClassName("userLib")[0].innerHTML="funkar: ";
        document.getElementsByClassName("userLib")[0].innerHTML+=http.responseText;
        console.log(JSON.parse(http.response));
      }
    }

    let typ= "op=select";
    let link = "https://www.forverkliga.se/JavaScript/api/crud.php?";
    console.log(link+key+"&"+typ);
    http.open("GET", link+key+"&"+typ,true);
    http.send();

  }
  /************ Hämta data END  *****************************************/



  /***  Ändra användare eller lösenord i databas *******************************/

  let updateUserLib = function(){
    http.onreadystatechange = function(){
      if(this.readyState==4){
        console.log(JSON.parse(http.response));
        document.getElementsByClassName("userLib")[0].innerHTML="funkar: ";
        document.getElementsByClassName("userLib")[0].innerHTML+=http.responseText;
      }
    }

    let link = "https://www.forverkliga.se/JavaScript/api/crud.php?";
    keyMaster = "key=Ln9a4"
    let typ= "op=update";
    id = "id=11006";
    title="title=Erik";
    author = "author=hVfr2"

    console.log(link + keyMaster +"&"+ typ +"&"+ id +"&"+ title +"&"+ author);
    http.open("GET",link + keyMaster +"&"+ typ +"&"+ id +"&"+ title +"&"+ author,true);
    http.send();
  }
  /************************ Uppdatatera END *******************************/


  /*******************  Lägg till i databas  ********************************/

  let addToUserLib = function (){
    http.onreadystatechange = function(){
      if(this.readyState==4){
        document.getElementsByClassName("userLib")[0].innerHTML="funkar: ";
        document.getElementsByClassName("userLib")[0].innerHTML+=http.responseText;
        console.log(JSON.parse(http.response));
      }
    }

    let link = "https://www.forverkliga.se/JavaScript/api/crud.php?";
    let typ= "op=insert";
    title="title=zyTCAlFPjgYC";
    author="author=GoogleBooks";


    console.log(link+key+"&"+typ+"&"+title+"&"+author);
    http.open("GET", link+key+"&"+typ+"&"+title+"&"+author,true);

    http.send();

  }



  /********************   Lägg till END   *************************************/



  let btnTEST = document.getElementById("btnTest");
  btnTEST.addEventListener("click",function(){
    loadUserLib();
  });
});
