window.addEventListener('load', function () {

    function updateOnlineStatus(event) {
        if (isOnline()) {
            ReadOflineNews();
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});

function isOnline() {
    return window.navigator.onLine;
}


function ReadOflineNews() {
    if (useLocalStorage) {
        len = localStorage.length + 1;
        for (var k = 1; k < len; k++) {
            $("#news_list").prepend("<li class=\"list-group-item\">\n" +
                "    <article class=\"element\">\n" +
                "        <figure><img src=\"images/sud_0.jpg\" alt=\"\">\n" +
                "            <figcaption><a href=\"#\"><i class=\"fa fa-eye\"></i></a></figcaption>\n" +
                "        </figure>\n" +
                "        <div class=\"excerpt\">\n" +
                "            <h6 class=\"heading\"></h6>\n" +
                "            <p class=\"longdescription\"></p>\n" +
                "            <p class=\"shortdescription\"></p>\n" +
                "        </div>\n" +
                "    </article>\n" +
                "</li></br>");

            news = JSON.parse(localStorage.getItem(k));
            console.log(news[0].name);
            console.log(news[0].shortdescription);
            console.log(news[0].longdescription);

            $('#news_list li:first .heading').append(news[0].name);
            $('#news_list li:first .shortdescription').append(news[0].shortdescription);
            $('#news_list li:first .longdescription').append(news[0].longdescription);
        }
    }
    else {
        var transaction = db.transaction(["news"], "readonly");
        var store = transaction.objectStore("news");

        store.openCursor().onsuccess = function (e) {
            var cursor = e.target.result;
            if (cursor) {
                cursor.continue();
                $("#news_list").prepend("<li class=\"list-group-item\">\n" +
                    "    <article class=\"element\">\n" +
                    "        <figure><img src=\"images/sud_0.jpg\" alt=\"\">\n" +
                    "            <figcaption><a href=\"#\"><i class=\"fa fa-eye\"></i></a></figcaption>\n" +
                    "        </figure>\n" +
                    "        <div class=\"excerpt\">\n" +
                    "            <h6 class=\"heading\"></h6>\n" +
                    "            <p class=\"shortdescription\"></p>\n" +
                    "            <p class=\"longdescription\"></p>\n" +
                    "        </div>\n" +
                    "    </article>\n" +
                    "</li></br>");

                $('#news_list li:first .heading').append(cursor.value.name);
                $('#news_list li:first .shortdescription').append(cursor.value.shortdescription);
                $('#news_list li:first .longdescription').append(cursor.value.longdescription);
            }
        }
    }
}