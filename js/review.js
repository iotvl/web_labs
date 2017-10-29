window.addEventListener('load', function() {

    function updateOnlineStatus(event) {
        if(isOnline()){
            ReadOflineReview();
        }
    }
    window.addEventListener('online',  updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});


var i = 0;

function isOnline() {
    return window.navigator.onLine;
}


function AddReview() {
    if ($('#longdescription').val()===""){
        alert('Заповніть всі поля');
        return false;
    }

    var now = new Date();

    if (isOnline()) {
        $("#list").append("<li>\n" +
            "                <article>\n" +
            "                    <header>\n" +
            "                        <address class = 'user_adress'>\n" +
            "\n" +
            "                        </address>\n" +
            "                        <time class =\"review_time\"></time>\n" +
            "                    </header>\n" +
            "                    <div class=\"comcont\">\n" +
            "                        <p class= 'review'> </p>\n" +
            "                    </div>\n" +
            "                </article>\n" +
            "            </li>");
        $('#list li:last .user_adress').append(
            "Вася Пупкін")
        $('#list li:last .review').append($('#longdescription').val());
        $('#list li:last .review_time').append(now.toDateString());
        $('#longdescription').val('');
    }
    else {
        i++;
        var list = [];
        list.push({"message":$('#longdescription').val(), "time":now.toDateString()});
        localStorage.setItem(i, JSON.stringify(list));
        $('#longdescription').val('');
    }
}

function ReadOflineReview() {
    len = localStorage.length+1;
    for (var k=1; k<len; k++){
        $("#list").append("<li>\n" +
            "                <article>\n" +
            "                    <header>\n" +
            "                        <address class = 'user_adress'>\n" +
            "\n" +
            "                        </address>\n" +
            "                        <time class =\"review_time\"></time>\n" +
            "                    </header>\n" +
            "                    <div class=\"comcont\">\n" +
            "                        <p class= 'review'> </p>\n" +
            "                    </div>\n" +
            "                </article>\n" +
            "            </li>");

        review =JSON.parse(localStorage.getItem(k));
        console.log(review[0].time);

        $('#list li:last .user_adress').append(
            "Вася Пупкін")
        $('#list li:last .review').append(review[0].message);
        $('#list li:last .review_time').append(review[0].time);

        localStorage.removeItem(k);
    }
}