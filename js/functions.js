            window.addEventListener("load", function() {

                     let btnTEST = document.getElementById("btnTest");
                     btnTEST.addEventListener("click", function() {
                       getDataFromDataBase(0);
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


                function getDataFromDataBase(i) {
                    
                    let link = "https://www.forverkliga.se/JavaScript/api/crud.php?op=select&"
                    
                    fetch(link + key).then(function(response) {
                        
                       return response.json();
                        
                        }).then(function(json){
                        
                        
                        console.log(json);

                        if(json.status == "error") {
                            console.log("asdasdsadsdas")

                            if(i < 8) {
                                i++
                                
                                console.log("helo")
                                getDataFromDataBase(i);
                                
                            }
                        } else {
                        showInUserLib(json); 
                            
                        }
                }

        )};
            

                function showInUserLib(obj) {
                    console.log(key);

                 for (let i = 0; i < obj.data.length; i++) {
                     console.log(obj.data[0].id);

           let listItem = document.createElement("li");
           let btnRemoveBook = document.createElement("button");
           let div = document.createElement("div"); 
           div.className = "books";
           btnRemoveBook.className = "knappTabort";
           btnRemoveBook.innerHTML = "Click to Remove Book";
        

           div.innerHTML = "<p class=uniqueBook>" + obj.data[i].id + "</p>" + "<p>" + obj.data[i].title + "</p>" + "<p>" + obj.data[i].author + "</p>";

           listItem.appendChild(btnRemoveBook);
           listItem.appendChild(div);
           listBooks.appendChild(listItem);

             
            let knappBort = document.getElementsByClassName("knappTabort")[i];
             
            knappBort.addEventListener("click",
                    function(event) {
                
                
                        console.log(event.target.parentElement);

                        let li = event.target.parentElement;
                        let uniqueBook = li.querySelector(".uniqueBook").innerHTML;                console.log(uniqueBook);

                        removeBook(uniqueBook, li,0);

                        })
                    }
               };


   
      
                function removeBook(uniqueBook, li,i) {
                
                    let link = "https://www.forverkliga.se/JavaScript/api/crud.php?";
                    typ = "&op=delete";
                    id= "&id=" + uniqueBook;


                    fetch(link + key + typ + id).then(function(response){
                            return response.json();

                    }).then(function(json){
                    console.log(json);

                        if(json.status == "error") {

                            if(i < 8) {
                                i++
                                removeBook(uniqueBook, li,i);
                            }
                        } else {

                        listBooks.removeChild(li);

                    }

                    }).catch(function(res){

                    });    
                };

        
    
      