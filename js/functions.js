window.addEventListener("load", function() {

  let btnTest = document.getElementById("btnTest");
  btnTest.addEventListener("click", function() {
    //getDataFromDataBase(0);
    makeUserBookLiberary();

  });


        //console.log(obj);
  function searchGoogleOneBook(searchForStr,i,maxLength) {
    /*
    function wait(ms){
      var start = new Date().getTime();
      var end = start;
      while(end < start + ms) {
        end = new Date().getTime();
      }
    }

    console.log('before');
    wait(1000);  //7 seconds in milliseconds
    console.log('after');
   */

    let link = "https://www.googleapis.com/books/v1/volumes?q=";
      //console.log(link + searchForStr);

      //console.log("detta är sökning nummer " + i + "och söker på");
    //console.log(link + searchForStr + "&key=AIzaSyCeCWE-_JEPML1urQm5_jMtzTiebFZ_4lc");
    fetch(link + searchForStr)
      .then(function(result) {
        return result.json();
      }).then(function(json) {
          //console.log(json);
          objBook[i] = (json.items[0]);
          //console.log(maxLength-1);
          //console.log(i);
          if (i==maxLength-1) {
            //waitForJson();
          }
      }).catch(function(str) {
              console.log("fick inget svar från google"+ str);

      });

  };

  let objBook= [];


  function showInUserLib(obj) {
    objBook = [];


    //console.log(objBook)
    listBooks.innerHTML = "";
    //console.log(key);
    maxLength =  (obj.data.length);
    for (let i = 0; i < maxLength; i++) {
      //console.log("detta är från titeln : "+ obj.data[i].title);
      //console.log("leta rätt på bok : " + obj.data[i].title);

      //searchGoogleOneBook(obj.data[i].title,i,maxLength);
      objBook.push(obj.data[i]);
    }


  };

  let btnTest2 = document.getElementById("btnTest2");
  btnTest2.addEventListener("click",function(){

    waitForJson();


  });


  function waitForJson(i){
    //console.log("nu är vi inne i wait for json.. ");3
    //console.log(userBooks);
    //console.log(objBook);


    for(i = 0; i < objBook.length; i++){

      output = document.getElementById("listBooks");


      let book = {};
      x = objBook[i];

      book.description = x.volumeInfo.description;
      book.infoLink = x.volumeInfo.infoLink;
      book.bookTitel = x.volumeInfo.title
      book.searchSnippet = "Saknar beskrivande text"
      book.Id=x.id;


      if(x.volumeInfo.hasOwnProperty("imageLinks")){
        if(x.volumeInfo.imageLinks.hasOwnProperty("smallThumbnail")){
          if(x.volumeInfo.imageLinks.smallThumbnail!=undefined){
            book.imgSrc = x.volumeInfo.imageLinks.smallThumbnail;

          }else{
          }
        }
      }
      if(x.hasOwnProperty("searchInfo")){
        if(x.searchInfo.hasOwnProperty("textSnippet")){
          book.searchSnippet = x.searchInfo.textSnippet;
        }
      };
      /*
      if(x.volumeInfo.imageLinks.smallThumbnail!=undefined)
      book.imgSrc = x.volumeInfo.imageLinks.smallThumbnail;

      if(x.hasOwnProperty("searchInfo")){
        if(x.searchInfo.hasOwnProperty("textSnippet")){
          book.searchSnippet = x.searchInfo.textSnippet;
        }
      };
      */
      let list = document.createElement("li",{id:"books"});
      let img = document.createElement("img");
      let button  = document.createElement("button");
      let div = document.createElement("div");
      let span = document.createElement("span");
      div.className="books";
      button.className="knappTabort";
      span.innerHTML = userBooks.data[i].id;
      img.src=book.imgSrc;
      list.appendChild(div);
      div.appendChild(img);
      div.innerHTML+="<br><a href="+book.infoLink +" target=_blank><h3>" + book.bookTitel +
        "</h3></a><br>"+ book.searchSnippet + "<br><br>"+"<h4>Sammanfattning: </h4><br>"+
        book.description +"<br> Google ID: "+ userBooks.data[i].title + "<br> Databas Id: ";
      div.appendChild(span);
      output.appendChild(list);
      list.appendChild(button);



      //btnRemoveBook.innerHTML = "Click to Remove Book";


      let knappBort = document.getElementsByClassName("knappTabort")[i];

      knappBort.addEventListener("click",
      function(event) {

        //console.log(event.target.parentElement);

        let li = event.target.parentElement;
        let uniqueBook = li.querySelector("span").innerHTML;
        //console.log(uniqueBook);

        removeBook(uniqueBook, li, 0);

      })
    }



    }



  function deleteBook() {

    let btnD = document.getElementById("btnGone");

    btnD.addEventListener("click",
    function(event) {
      var list = document.getElementById("listBooks");
      list.removeChild(list.childNodes[0]);
    });
  };

  function getDataFromDataBase(i) {

    let link = "https://www.forverkliga.se/JavaScript/api/crud.php?op=select&"

    fetch(link + "key=" + key).then(function(response) {
      return response.json();
    }).then(function(json) {
      userBooks = json;
      //console.log(json);
      if (json.status == "error") {
        if (i < 12) {
          i++
          getDataFromDataBase(i);
        }
      } else {

        showInUserLib(json);

      }
    });
  };




  function removeBook(uniqueBook, li, i) {

    let link = "https://www.forverkliga.se/JavaScript/api/crud.php?";
    typ = "&op=delete";
    id = "&id=" + uniqueBook;


    fetch(link + "key=" + key + typ + id).then(function(response) {
      return response.json();

    }).then(function(json) {
      //console.log(json);

      if (json.status == "error") {

        if (i < 8) {
          i++
          removeBook(uniqueBook, li, i);
        }
      } else {

        listBooks.removeChild(li);

      }

    }).catch(function(res) {

    });
  };

  // nedan är de nya funktionerna för labb 4 för VG 2017-12-10

  function makeUserBookLiberary(){

    //console.log("nu är vi inne i wait for json.. ");3
    //console.log(userBooks);
    //console.log(objBook);
    output = document.getElementById("listBooks");
    output.innerHTML = "";

    for(i = 0; i < userBooks.length; i++){


      let book = {};
      x = userBooks[i];

      book.description = "";
      book.infoLink = "";
      book.bookTitel = x.title;
      book.searchSnippet = x.author;
      book.Id= x.id;
      book.imgSrc = "http://books.google.com/books/content?id=7zsJAAAAQAAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api";

      /*
      if(x.volumeInfo.imageLinks.smallThumbnail!=undefined)
      book.imgSrc = x.volumeInfo.imageLinks.smallThumbnail;

      if(x.hasOwnProperty("searchInfo")){
        if(x.searchInfo.hasOwnProperty("textSnippet")){
          book.searchSnippet = x.searchInfo.textSnippet;
        }
      };
      */
      let list = document.createElement("li",{id:"books"});
      let img = document.createElement("img");
      let button  = document.createElement("button");
      let div = document.createElement("div");
      let span = document.createElement("span");
      div.className="books";
      button.className="knappTabort";
      span.innerHTML = book.Id;
      img.src=book.imgSrc;
      list.appendChild(div);
      div.appendChild(img);
      //div.innerHTML+="<br><a href=# target=_blank><h3>" + book.bookTitel +
      // book.description +"<br> Google ID: "+ book.bookTitel + "<br> Databas Id: ";
      div.innerHTML+="<h3 class=title>"+book.bookTitel + "</h3></a><p class=author>"+ book.searchSnippet + "<p><br>"+"<h4>Sammanfattning: </h4><br>"+
        book.description +"<br> Databas Id: ";
      div.appendChild(span);
      output.appendChild(list);
      list.appendChild(button);





      let changeTitle = document.getElementsByClassName("title")[i];
      let replaceNode="";

      changeTitle.addEventListener("click",function(event){
        let a = event.target;
        let parent = event.target.parentNode
        let x = document.createElement("input");
        x.id="title";
        x.value= a.innerText;
        replaceNode = parent.replaceChild(x,a);
        x.focus();
        let changeTitle2 = document.getElementById("title");
        console.log(changeTitle2);
        changeTitle2.addEventListener("blur",function(event){
          console.log("funkar!!")
          replaceNode.innerText= x.value;
          replaceNode = parent.replaceChild(replaceNode,x);
        });
      });


      let changeAuthor = document.getElementsByClassName("author")[i];
      changeAuthor.addEventListener("click",function(event){
        let a = event.target;
        let parent = event.target.parentNode
        let x = document.createElement("input");
        x.id="author";
        x.value= a.innerText;
        replaceNode = parent.replaceChild(x,a);
        x.focus();
        let changeAuthor2 = document.getElementById("author");
        console.log(changeAuthor2);
        changeAuthor2.addEventListener("blur",function(event){
          console.log("funkar!!")
          replaceNode.innerText= x.value;
          replaceNode = parent.replaceChild(replaceNode,x);
        });
      });

      //btnRemoveBook.innerHTML = "Click to Remove Book";

      let knappBort = document.getElementsByClassName("knappTabort")[i];
      //console.log(x);
      //console.log(knappBort);
      //console.log(output);
      knappBort.addEventListener("click",
      function(event) {

        //console.log(event.target.parentElement);

        let li = event.target.parentElement;
        let uniqueBook = li.querySelector("span").innerHTML;
        //console.log(uniqueBook);

        removeBook(uniqueBook, li, 0);
        getOneUser();
      })
    }
    }


    function getOneUser(i=0){
      userBooks=[];

      let link = "https://www.forverkliga.se/JavaScript/api/crud.php?";
      typ = "&op=select";


        fetch(link +"key="+key + typ).then(function(response){
            return response.json();
          }).then(function(json){
            if(json.status=="error"){
              if(i<8){
                i++;
                getOneUser(x,i);
              }else{
                console.log(json);
              }
            }else{
              console.log(json);
              userBooks=json.data;
            }
          }).catch(function(res){
            console.log("Efter 8st försök men går fortfarande inte: "+res);
          });

    };









});
