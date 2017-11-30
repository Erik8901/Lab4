
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

     function deleteBook() {
            
            
        let btnD = document.getElementById("btnGone");
        
        btnD.addEventListener("click",
             function(event) {
               var list = document.getElementById("listBooks"); 
               list.removeChild(list.childNodes[0]);
        });
        
    };



       var  getDataFromDataBase =  function() {
           

         let req = new XMLHttpRequest();

         req.open("GET", "https://www.forverkliga.se/JavaScript/api/crud.php?op=select&" + key);

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

       };

       function saveToLib(obj) {
            console.log(key);

         for (let i = 0; i < obj.data.length; i++) {
             console.log(obj.data[0].id);

           let listItem = document.createElement("li");
           let btnRemoveBook = document.createElement("button");
           let div = document.createElement("div"); 
           div.className = "books";
           btnRemoveBook.className = "knappTabort";
           btnRemoveBook.id = "btnGone";
           btnRemoveBook.innerHTML = "Click to Remove Book";
        

           div.innerHTML = "<p>" + obj.data[i].id + "</p>" + "<p>" + obj.data[i].title + "</p>" + "<p>" + obj.data[i].author + "</p>";

           listItem.appendChild(btnRemoveBook);
           listItem.appendChild(div);
           listBooks.appendChild(listItem);
           
             
                   

           
         }
       };


   
     /*   
        function removeBook() {
        
            
            let id = "";
            let key = "";
            let reqRemove = new XMLHttpRequest();
            
            reqRemove.open("GET", "https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&key=hVfr2&" + id)
            
            reqRemove.sen()
                console.log(reqRemove.response)
            
            
            reqRemove.onreadystatechange = function() {
                
                if (this.readyState = 4 && this.status == 200) {
                    
                    let obj = JSON.parse(reqRmove.response);
                        //console.log(obj);
                    
                        deleteBook();
                }
            }
        };
        
        */
        //window.addEventListener("load", deleteBook) 

            function deleteBook() {
            
            
        let btnD = document.getElementById("btnGone");
        
        btnD.addEventListener("click",
             function(event) {
            console.log(event);
               var list = document.getElementById("listBooks"); 
               list.removeChild(list.childNodes[0]);
        });
        
    };


  
      
 /*   window.addEventListener("load", event);
          
    function event()  { 
    
        let id = "";
        let key = "";
        let div = document.getElementById("myDiv");    
    
        fetch ("https://www.forverkliga.se/JavaScript/api/crud.php?op=delete&" + key + id)
          .then(
            function(result) {
               console.log(response);
                 return result.json();
               })
            .then(function(json) {
             div.innerHTML = json
                
                
            });
          };
          
          */
          
    
    
    
 
    


   