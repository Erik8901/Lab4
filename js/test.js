let key = "";
let keyMaster = "key=Ln9a4"; /*användarens inloggningsuppgifter sparas i detta bibliotek*/
let userLoggedIn = [];
let userBooks = [];
let searchBooks = [];

window.addEventListener("load", function() {
  let btnLoggIn = document.getElementById("btnLoggIn");
  let btnKeyGen = document.getElementById("btnKeyGen");
  let boxlogin = document.getElementById("boxlogin");
  let http = new XMLHttpRequest();
  let i = 0;
  let title = "";
  let author = "";
  let headUserInfo = document.getElementById("headUserInfo");
  let loggOut = document.getElementById("loggOut");
  let menuText = document.getElementsByClassName("pop-up-Text")[0];

  //let loggInStatus = 0;
  //let container = document.getElementsByClassName("container")[0];
  //let userId = "";
  //let answer = "";


  let userName = document.getElementById("userName"); /*Här är användarens id*/
  let userFirstName = document.getElementById("firstName");
  let userLastName = document.getElementById("lastName");
  let userEmail = document.getElementById("userEmail");
  let userPassword = document.getElementById("userPassword"); /*Här skall nyckel sparas ner*/
  let userKey = document.getElementById("userKey");



  /* FUNKTION FÖR ATT KONTROLLERA LÖSENORD OCH LOGGA IN */
  btnLoggIn.addEventListener("click", function() {
    logInUser(0); // logInUser -> CheckUser = inloggad
  });
  /*   LOGGIN  END! */

  /********************* Logga In  ********************************************/

  function logInUser (i){
    let link = "https://www.forverkliga.se/JavaScript/api/crud.php?";
      typ = "&op=select";


    console.log(link + keyMaster + typ);

      fetch(link + keyMaster + typ).then(function(response){
          console.log("hej");
          return response.json();

        }).then(function(json){
          console.log("Hej");
          if(json.status=="error"){

            if(i<8){
              i++;
              console.log(i + " antal gånger");
              logInUser(i);
            }else{
              console.log(" Misslyckades att logga in :< ");

            }
          }else{
            checkUser(json,0);
          }
        }).catch(function(res){
          console.log("detta skrivs ut");
          console.log("8st försök men funkar fortfarande inte"+res);
        });

  }

  function checkUser(obj,i){   //kontrolerar lösenordet....
    let userList = []
    let j = "0";
    let found = false;

    for(i=0;i<obj.data.length;i++){
      let userObj = JSON.parse(obj.data[i].title);
      userList.push(userObj);
    }
    for(i=0;i<userList.length;i++){

      if(userList[i].userId==userName.value){

        if(userList[i].password===userPassword.value){
          //console.log("Rätt lösenord");
          found=true;
          j=i;
        }else{

          loggMenu("Felaktigt lösenord");


        }

      }else{
        loggMenu("Användare Saknas");
      }


    }
    console.log(found);
    if(found){ //rätt lösenord och användare.. hämta data
      //let closeLoggInMenu = document.getElementById("closeLoggInMenu");
      loggMenu("inloggad som "+ userList[j].userId);
      key = userList[j].key;
      headUserInfo.innerHTML="Inloggad som: " + userList[j].userId;
      document.getElementsByClassName("fa-user-circle")[0].style.color="rgb(22, 142, 8)";


      window.location.assign("#close");

    }
  }
  /********************* Logga In  END ********************************************/




  /********************* SKAPA ANVÄNDARE ***************************************/
  // makeKey --> makeUser   detta för att hinna med att få en nyckel från api:n

  let btnMakeUser = document.getElementById("btnNewUser");
  btnMakeUser.addEventListener("click",makeNewKey);


  /********************** skapar en nyckel ************************************/
  function makeNewKey(i){

    if(userKey.value==""){  //kontrolerar om nyckeln redan är satt
          fetch("https://www.forverkliga.se/JavaScript/api/crud.php?requestKey").then(function(response){
          return response.json();
        }).then(function(json){
          if(json.status=="error"){
            if(i<8){
              i++;
              maekNewKey(i);
            }
          }else{
            key = json.key;
            userKey.value=key;
            makeUser(0);
          }

        }).catch(function(failRes){
              loggMenu("Misslyckades att skapa nyckel");
              console.log("Försökt 8 gånger utan att lyckats skapa nyckel: "+failRes);
      });
    }else{
      key=userKey.value;
      makeUser(0);
    }

  }
  /******************  skapar en nyckel END     *******************************/

  /****************** Hämtar databas över användare *************************/
  function makeUser (i){

    let link = "https://www.forverkliga.se/JavaScript/api/crud.php?";
    typ = "&op=select";


    //console.log(link + keyMaster + typ);

      fetch(link + keyMaster + typ).then(function(response){
          return response.json();
        }).then(function(json){

          if(json.status=="error"){
            if(i<8){
              i++;
              makeUser(i);
            }else{
              loggMenu("Misslyckades!");
              console.log("makeUser: Fler än 8st försök");
            }
          }else{
            checkUserInputs(json);
          }

        }).catch(function(res){
            loggMenu("Inloggning misslyckades : "+ res);
            console.log("makeUser felkod: "+res);
        });

  }


  /*****************  kontrolerar så att anv inte redan finns *****************/
  function checkUserInputs(obj){
    let userList = []
    let j = "0";
    let found=false;


    for(i=0;i<obj.data.length;i++){
      let userObj = JSON.parse(obj.data[i].title);
      userList.push(userObj);
    }
    //console.log(userList);

    for(i=0;i<userList.length;i++){
      //console.log(userList[i].userId);
      if(userList[i].userId== userName.value){

        found= true;
        console.log("Användar ID redan upptaget, vänligen välj ett nytt");

      }

    }

    if(!found){
      //console.log(userName.value,userPassword.value,userFirstName.value,userLastName.value,userEmail.value,key);
      if(key===""){
        console.log("Misslykades med att skapa användare pga saknad nyckel");
      }else{
        let x = new User(userName.value,userPassword.value,userFirstName.value,userLastName.value,userEmail.value,key)
        x = JSON.stringify(x);
        console.log(x);

        saveNewUser(x,0);

        headUserInfo.innerHTML="Inloggad som: " + userName.value;
        document.getElementsByClassName("fa-user-circle")[0].style.color="rgb(22, 142, 8)";
        console.log("FUnkar.. ny user upplagd!1");
        //window.location.assign("#close");
      }




    }
  }
  /********************* kontroll av användare END  ****************************/

  /**********************  Spara Användare (skicka in objekt)*******************/

  function saveNewUser(strObj,i){
    let link = "https://www.forverkliga.se/JavaScript/api/crud.php?";
    /* På denna nycklen lagras alla användare och lösenorden går ej att bytas ut eftersom de är kopplade till användarens bibliotek*/
    title = "&title="+ strObj;
    typ = "&op=insert";
    author="&author=not used";

      fetch(link + keyMaster + typ + title + author).then(function(response){
            return response.json();
        }).then(function(json){
          if(json.status=="error"){
            if(i<8){
              i++;
              saveNewUser(strObj,i);
            }else{
              loggMenu("Misslyckades att spara användare : "+ res);
            }
          }else{
            loggMenu("Användare Sparad!");
            console.log("Sparad!");
            console.log(json);
          }
      }).catch(function(res){
        loggMenu("Misslyckades att spara användare");
        console.log("användaren blev ej sparad felkod: " + res);
      });
  }


  /********************* Skapa Användare END **********************************/















 /* Navigeringsbar visa artikel  *************************************/
 let navBar = document.getElementsByClassName("navBar");
 let article  = document.getElementsByClassName('article')
 article[0].style.display="block"; /* Denna skall bort med css*/

  let showArticle = function(event){

    for(i=0;i<article.length;i++){
      if(event.target==navBar[i]){
        article[i].style.display="block";
        navBar[i].className="navBar navBarSelected";

      }else {
        article[i].style.display="none";
        navBar[i].className="navBar";
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


  /*******************  Logga Ut Användare ***********************************/
    loggOut.addEventListener("click",function(event){
      if (key!==""){
        headUserInfo.innerHTML="Ej Inloggad";
        document.getElementsByClassName("fa-user-circle")[0].style.color="rgb(142, 0, 0)";
        key="";
      }

    });

  /*******************  Logga ut Avnändare END *******************************/

  /********************  Hämta data från Google books  **********************/

  function searchGoogle(){

    fetch("https://www.googleapis.com/books/v1/volumes?q="+"inauthor:"+searchAutorTextInput.value+"&printType=books")
      .then(function(result){
        return result.json();
      }).then(function(json){
        createBooks(json);
      }).catch(function(str){
        console.log(str);
      });

  }

  function createBooks(result){
    let resultSearchBooks = document.getElementById("resultSearchBooks");
    resultSearchBooks.innerHTML="";
    console.log(result);

    for(i=0;i<result.items.length;i++){

        x = result.items[i];

      let list = document.createElement("li",{id:"books"});
      let img = document.createElement("img");
      let button  = document.createElement("button");
      let div = document.createElement("div");
      let span = document.createElement("span");
      div.className="books";


      span.innerHTML="<br>"+x.id;
      button.id="btnAddToShell";
      /*button.innerHTML="Lägg till i biblo!";*/

      if(x.volumeInfo.imageLinks.smallThumbnail!=undefined)
      img.src=x.volumeInfo.imageLinks.smallThumbnail;

      list.appendChild(div);
      div.appendChild(img);
      div.innerHTML+="<br><a href="+x.volumeInfo.infoLink+" target=_blank>" + x.volumeInfo.title+"</a><br>"+x.volumeInfo.description;
      div.appendChild(span);
      resultSearchBooks.appendChild(list);
      list.appendChild(button);
      console.log(list.children)
    }

    mouseLeaveFunction();
  };

  /********************  Hämta data från Google books   END      *************/





  /********************* Hämta Alla användare *********************************/
  function getAllUsers(i){

    let link = "https://www.forverkliga.se/JavaScript/api/crud.php?";
    typ = "&op=select";

      fetch(link + keyMaster + typ).then(function(response){
          return response.json();
        }).then(function(json){
          console.log(json);
          if(json.status=="error"){
            if(i<8){
              i++;
              getAllUsers(i);
            }else{
              console.log(json);
            }
          }
        }).catch(function(res){
          console.log("Efter 8st försök men går fortfarande inte: "+res);
        });

  };




  /********************* Hämta Alla användare END *****************************/





  /********************* Remove user ******************************************/
  function removeUser(x){
    let link = "https://www.forverkliga.se/JavaScript/api/crud.php?";
    typ = "&op=delete";
    id= "&id="+x;

      fetch(link + keyMaster + typ + id).then(function(response){
          return response.json();
        }).then(function(json){
          console.log(json);

        }).catch(function(res){
            console.log("8st försök utan att lyckas"+ res);
        });

  };


  /********************* Remove user END ************************************/


  let btnSearchGoogle = document.getElementById("btnSearchGoogle");
  btnSearchGoogle.addEventListener("click",searchGoogle);






  //let johan = new User("johan80","admin","johan","Augustsson","zingo80@msn.com","fe7Hz");
  //console.log(johan);
  //let johanStr = (JSON.stringify(johan));



  //saveNewUser(johanStr);
  i=0;
  getAllUsers(i);
  //logInUser();
  //removeUser(15068);
   //makeNewKey();





   function loggMenu(str){
     menuText.innerHTML=str;
    }


 let test2 = document.getElementById("test2");
   test2.addEventListener("click",function(){
    let pos = -40;
    let inter = setInterval(frame,0.5);
    function frame(){
      if(pos==100){
        clearInterval(inter);
        //userPassword.style.backgroundColor="white";
        console.log("Test");
      }else if(pos<100){
        pos++;
        userPassword.style.left = pos + "px";
        userPassword.style.backgroundColor="rgba(237, 152, 164, 0.3)";
      }
    }


  })





});

  /************** Mouse leave scroll top funktion ***********/
  function mouseLeaveFunction() {
    let books = document.getElementsByClassName("books");

    for(i=0;i<books.length;i++){
      books[i].addEventListener("mouseout",function(event){
        event.target.scrollTop=0;
      });

    }


  }

  /***********END Mouser leave scroll top funktion END ******/




/************  Skapa användare med classes  *********************/

class User {
  constructor(myUserId,myPassword,myName,myLastName,myEmail,myKey){
    this.userId=myUserId;
    this.firstName=myName;
    this.lastName=myLastName;
    this.email=myEmail;
    this.password=myPassword;
    this.key=myKey;
  }

}




class CreateBooks{
  constructor(myBookObj,myServer){
    this.BookId= myBookObj.id;
    this.BookTitel = myBookObj.volumeInfo.infoLink;

  }
  getAllBookInfo(){
      fetch("https://www.googleapis.com/books/v1/volumes?q=id="+this.BookId).then(function(response){
      return response.json();
    }).then(function(json){
        console.log(json);
        return JSON.stringify(json);
    }).then(function(str){
      console.log(str);
    });

  }

};
