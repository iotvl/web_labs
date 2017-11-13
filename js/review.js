window.addEventListener('load', function () {

    function updateOnlineStatus(event) {
        if (isOnline()) {
            ReadOflineReview();
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});


var i = 0;

function isOnline() {
    return window.navigator.onLine;
}


function AddReview() {
    if ($('#longdescription').val() === "") {
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
    }
    else {
        if (useLocalStorage) {
            i++;
            var list = [];
            list.push({"message": $('#longdescription').val(), "time": now.toDateString()});
            localStorage.setItem(i, JSON.stringify(list));
        }
        else {
            var transaction = db.transaction(["reviews"], "readwrite");
            var store = transaction.objectStore("reviews");
            var review = {
                message: $('#longdescription').val(),
                time: now.toDateString()
            };
            store.add(review);
        }
    }
    $('#longdescription').val('');
}

function ReadOflineReview() {
    if (useLocalStorage) {
        len = localStorage.length + 1;
        for (var k = 1; k < len; k++) {
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

            review = JSON.parse(localStorage.getItem(k));

            $('#list li:last .user_adress').append(
                "Вася Пупкін")
            $('#list li:last .review').append(review[0].message);
            $('#list li:last .review_time').append(review[0].time);
        }
    }
    else {
        var transaction = db.transaction(["reviews"], "readonly");
        var store = transaction.objectStore("reviews");

        store.openCursor().onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                cursor.continue();
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
                    "Вася Пупкін");
                $('#list li:last .review').append(cursor.value.message);
                $('#list li:last .review_time').append(cursor.value.time);
            }
        }
    }
}