window.addEventListener("load",function(event){
  let output = document.getElementsByClassName("container")[0];
  let http = new XMLHttpRequest();

  http.onreadystatechange = function(){
    if(http.readyState == 4 && http.status == 200){
      console.log(JSON.parse(http.response));
      obj=JSON.parse(http.response)
      console.log(obj.items[1].volumeInfo.title);
    }
  };
  http.open("GET","https://www.googleapis.com/books/v1/volumes?key=AIzaSyCeCWE-_JEPML1urQm5_jMtzTiebFZ_4lc&q=lordoftherings")
  http.send();




});
