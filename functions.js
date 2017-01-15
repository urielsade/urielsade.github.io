
function selectBG(){

  var images = [
    'camp',
    'chief',
    'crescentbeach',
    'houston',
    'lake',
    'stanleypark'
  ];

  var i = Math.floor(Math.random()*images.length);

  if( i == 4){
    $('#temporary-notice').css("color", "white");
  }

  $('#background').css("background-image","url(./images/"+images[i]+".jpg)");

}
