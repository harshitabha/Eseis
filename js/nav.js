a = true;
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("mySidenav").style.border = "solid";
    document.getElementById("main").style.marginLeft = "-250px";
    document.body.style.backgroundColor = "white";
    a = false;
  }
  
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.border = "transparent";
    document.getElementById("main").style.marginLeft= "0px";
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
