function displaySearchIcon(val) {

    $('a#search-icon').css({
        'display': val
    });

}

function displaySearchBar(val) {

    $('div.form-group').css({
        'display': val

    });
    $('#search-bar').val('').focus();

}


$(document).ready(function() {
    $('a#search-icon').on('click', function() {
        displaySearchIcon('none');
        displaySearchBar('inline-block');
    });
    $('a#close-btn').on('click', function() {
        displaySearchBar('none');
        displaySearchIcon('inline');
    });

    $('#search-bar').on('keypress', function(event) {

        if (event.which == 13 && $(this).val() !== '') {
            /*display the overlay & the spinner*/
            $('.overlay').css('display', 'block');
            var output = '';
            event.preventDefault();
            input = $(this).val();
            $.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=10&origin=*&search=' + input, function(data) {

                for (i = 0; i < data[1].length; i++) {
                    var title = data[1][i],
                        content = data[2][i],
                        pageUrl = data[3][i];
                    output += "<div class='animated bounce'><a target='_blank' href=" + pageUrl + '>' + title + "</a>" + "<p>" + content + "</p></div>";

                }
                /*hide the overlay & the spinner*/
                $('.overlay').css('display', 'none');
                $('div#data').html(output);
            });
        }
    });
});