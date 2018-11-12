
function selectBG(image_name){

    if (image_name == undefined) {

        var images = [
            'camp',
            'chief',
            'crescentbeach',
            'houston',
            'lake',
            'stanleypark'
        ];

        var i = Math.floor(Math.random() * images.length);

        image_name = images[i];
    }

    if (image_name == 'lake') {
        $('#temporary-notice').css("color", "white");
    }

    var path = "url(./images/" + image_name + ".JPG)";

    $('#background').css("background-image", path);
}
