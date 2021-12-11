a = true;
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("mySidenav").style.border = "solid";
    document.getElementById("main").style.marginRight = "250px";
    document.body.style.backgroundColor = "white";
    a = false;
  }
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.border = "transparent";
    document.getElementById("main").style.marginRight= "0";
    document.body.style.backgroundColor = "white";
    a = true;
  }
function menu() {
  if(a){
    openNav();

  }
  else{
    closeNav();
  }
}
