window.addEventListener("load", function() {
  let btnLoggIn = document.getElementById("btnLoggIn");
  let container = document.getElementsByClassName("container")[0];
  let userName = document.getElementById("userName"); /*Här är användarens id*/
  let userPassword = document.getElementById("userPassword"); /*Här skall nyckel sparas ner*/
  let btnKeyGen = document.getElementById("btnKeyGen");
  let http = new XMLHttpRequest();
  let answer = "";
  let found = false;


  /* FUNKTION FÖR ATT KONTROLLERA LÖSENORD OCH LOGGA IN */
  btnLoggIn.addEventListener("click", function() {
    let key = "key=Ln9a4"; /*På denna nycklen lagras alla användare och lösenorden går ej att bytas ut eftersom de är kopplade till användarens bibliotek*/
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
              console.log("Rätt lösenord");
              found=true;
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

  /* FUNKTION FÖR ATT SKAPA EN NYCKEL */
  btnKeyGen.addEventListener("click", function() {
    http.onreadystatechange = function() {
      if (this.readyState == 4) {
        answer = JSON.parse(http.response);
        console.log(answer.key);
        container.innerHTML += "Your key is: " + answer.key
      }
    };

    http.open("GET", "https://www.forverkliga.se/JavaScript/api/crud.php?requestKey");
    http.send();
  });
  /* --   END ----- FUNKTION FÖR ATT SKAPA EN NYCKEL*/



});
