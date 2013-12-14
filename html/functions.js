// client side javascript to avoid page refresh
// and image timeout with light switch is pressed

//function debug() 
//{
//  alert("DEBUG: loaded functions file");
//}

function lights() 
{
  var xmlhttp = new XMLHttpRequest();
  var url = "/lights";
  var params = "switch=true";
  xmlhttp.open("POST", url, true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(params);
}
