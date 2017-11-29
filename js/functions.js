
   /* window.addEventListener("load", function() {


           function addBook() {

           let req = new XMLHttpRequest();

            let typ = "op=" + "insert";
            let author = "author=" + "test";
            let title = "title=" + "title";
            //let id = "id=" + "11729";
            let key = "key=" + "hVfr2"

            req.open("GET", "https://www.forverkliga.se/JavaScript/api/crud.php?" + typ+ "&"+ author+ "&"+ title+"&" + key);

           req.send();

           req.onreadystatechange = function(event) {
               console.log("readyState:" + req.readyState);
               console.log("status:" + req.status);
                       console.log("responseText:" + req.responseText);

                       if( req.readyState == 4 ) {

                           console.log(req.response);

                       }
               };
           }

         });
     */
   window.addEventListener("load", function() {

         let btnTEST = document.getElementById("btnTest");
         btnTEST.addEventListener("click", function() {
           getDataFromDataBase();
         });
       });



       var  getDataFromDataBase =  function() {

         let req = new XMLHttpRequest();

         req.open("GET", "https://www.forverkliga.se/JavaScript/api/crud.php?op=select&key=" + key);

         req.send();
         //console.log(req.response);

         req.onreadystatechange = function() {

           if (this.readyState == 4 && this.status == 200) {

             //console.log(req.response);
             let obj = JSON.parse(req.response);
             console.log(obj);

             saveToLib(obj);
           }
         }

       }

       function saveToLib(obj) {


         for (let i = 0; i < obj.data.length; i++) {




           console.log(obj.data[0].id);

           let listItem = document.createElement("li");
           listItem.className = "Books";
           let btnRemoveBook = document.createElement("button");
           btnRemoveBook.className = "knappTabort";
           btnRemoveBook.innerHTML = "Click to Remove Book";

           listItem.innerHTML = "<p>" + obj.data[i].id + "</p>" + "<p>" + obj.data[i].title + "</p>" + "<p>" + obj.data[i].author + "</p>";

           listItem.appendChild(btnRemoveBook);
           listBooks.appendChild(listItem);

           btnRemoveBook.addEventListener("click",
             function() {

               listBooks.removeChild(listItem);





             });
         }

       };
