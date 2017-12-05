window.addEventListener("load", function() {

  let btnTEST = document.getElementById("btnTest");
  btnTEST.addEventListener("click", function() {
    getDataFromDataBase(0);
  });
        //console.log(obj);
  function searchGoogleOneBook(searchForStr) {
    //event skickas med från addEventListener konstigt nog.. därav ligger den med här men används ej

    /*

    let searchStr = "";
    let resultSearchBooks = document.getElementById("resultSearchBooks");
    resultSearchBooks.innerHTML = "";
    let searchTitelTextInput = document.getElementById("searchTitelTextInput");
    let searchAutorTextInput = document.getElementById("searchAutorTextInput");
    searchStr += "&printType=books"
    */




    let link = "https://www.googleapis.com/books/v1/volumes?q=";
      console.log(link + searchForStr);


    fetch(link + searchForStr)
      .then(function(result) {
        return result.json();
      }).then(function(json) {
        console.log(json);
        objBook.json.items[0];
        console.log(objBook);
      }).catch(function(str) {
        console.log(str);
      });

  };





  function showInUserLib(obj) {
    let objBook = [];

    //console.log(objBook)
    listBooks.innerHTML = "";
    console.log(key);

    for (let i = 0; i < obj.data.length; i++) {
      console.log("här är titeln: "+ obj.data[i].title);
      searchGoogleOneBook(obj.data[i].title);
      let book = {};
      x = objBook[i];
        
      book.description = x.volumeInfo.description;
      book.infoLink = x.volumeInfo.infoLink;
      book.bookTitel = x.volumeInfo.title
      book.searchSnippet = "Saknar beskrivande text"
      book.Id = x.id;
      if (x.volumeInfo.imageLinks.smallThumbnail != undefined)
        book.imgSrc = x.volumeInfo.imageLinks.smallThumbnail;

      if (x.hasOwnProperty("searchInfo")) {
        if (x.searchInfo.hasOwnProperty("textSnippet")) {
          book.searchSnippet = x.searchInfo.textSnippet;
        }
      };

      //console.log(obj.data[0].id);



      let listItem = document.createElement("li");
      listItem.id = "books"
      let img = document.createElement("img");
      let span = document.createElement("span");
      div.className = "books";

      span.innerHTML = "</br>" + objBook.id;



      let btnRemoveBook = document.createElement("button");
      let div = document.createElement("div");
      div.className = "books";
      btnRemoveBook.className = "knappTabort";
      //btnRemoveBook.innerHTML = "Click to Remove Book";


      div.innerHTML = "<p class=uniqueBook>" + obj.data[i].id + "</p>" + "<p>" + obj.data[i].title + "</p>" + "<p>" + obj.data[i].author + "</p>";

      img.src = objBook.imgSrc;
      listItem.appendChild(div);
      div.appendChild(img);

      listItem.appendChild(btnRemoveBook);
      listBooks.appendChild(listItem);

      div.innerHTML += "<br><a href=" + objbBook.infoLink + " target=_blank><h3>" + objBook.bookTitel + "</h3></a><br>" + objBook.searchSnippet + "<br><br>" + "<h4>Sammanfattning: </h4><br>" + objBook.description;
      div.appendChild(span);





      let knappBort = document.getElementsByClassName("knappTabort")[i];

      knappBort.addEventListener("click",
        function(event) {


          console.log(event.target.parentElement);

          let li = event.target.parentElement;
          let uniqueBook = li.querySelector(".uniqueBook").innerHTML;
          console.log(uniqueBook);

          removeBook(uniqueBook, li, 0);

        })
    }
  };





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
      console.log(json);
      if (json.status == "error") {
        if (i < 8) {
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
      console.log(json);

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
});
