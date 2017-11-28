    window.addEventListener("load", function() {
        
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
        
        
     /*   function removeBook(taBort) {
        
        let req = new XMLHttpRequest();    
        
         let typ = "op=" + "delete";
         //let author = "author=" + "test";
         //let title = "title=" + "title";
         let id = "id=" + taBort;
         let key = "key=" + "hVfr2"
        
         req.open("GET", "https://www.forverkliga.se/JavaScript/api/crud.php?" + typ+ "&" + id+ "&" + key);
        
        req.send();
        
        req.onreadystatechange = function(event) {
            console.log("readyState:" + req.readyState);
            console.log("status:" + req.status);
                    console.log("responseText:" + req.responseText);
                    
                    if( req.readyState == 4 ) {
                        
                        console.log(req.response);
                        
                    }
            };
        } removeBook(11734); */
        
        
    }); 
    