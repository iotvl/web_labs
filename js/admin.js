var i = 0;

function isOnline() {
    return window.navigator.onLine;
}

function AddNews() {
    if (($('#longdescription').val()==="") || ($('#shortdescription').val()==="") || ($('#namearticle').val()==="")) {
        alert('Заповніть всі дані');
        return false;
    }

    if (isOnline()) {
        $('#longdescription').val('');
        $('#shortdescription').val('');
        $('#namearticle').val('');
        alert('Новину успішно додано');
    }

    else {
        i++;
        var list = [];
        list.push({"name":$('#namearticle').val(),
            "shortdescription":$('#shortdescription').val(),
            "longdescription":$('#longdescription').val()});
        localStorage.setItem(i, JSON.stringify(list));
        $('#longdescription').val('');
        $('#shortdescription').val('');
        $('#namearticle').val('');
    }
}