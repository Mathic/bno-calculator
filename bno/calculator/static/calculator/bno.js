// get selection
var gross = [];
var num_trains = 0;
var level = $('.tech_level').find('.active').text();

$('#current_tech_level').text(level);
$('#num_trains').text(num_trains);

SetLevel(level);
CountStops();

$('.tech_level').delegate('label', 'change', function() {
    $(this).addClass('active').siblings().removeClass('active');
    level = $('.tech_level').find('.active').text();
    $('#current_tech_level').text(level);
    SetLevel(level);
});

$('#train-count').on('click', function() {
    if (num_trains > 5) {
        return false;
    };
    num_trains = num_trains + 1;
    var HTML = '../../template/calculator/traintech.html;
    $('#t-tech').append(HTML);

    $('.train-tech').delegate('label', 'click', function() {
        $(this).addClass('active').siblings().removeClass('active');
        CountStops();
    });

    $('#num_trains').text(num_trains);
    SetLevel(level);
    CountStops();
});

$(document).on('click', '.remove-train', function() {
    $(this).parent().remove();
    num_trains = num_trains - 1;
    $('#num_trains').text(num_trains);
    CountStops();
});

$('.city-name').on('change', function() {
    var tech_level = 'tech_' + $('#current_tech_level').text().trim();
    var name = '.' + tech_level + '.' + ($(this)[0].value).replace(' ', '.');
    var num = parseInt($(name).text());
    if (this.checked) {
        gross.push(num);
    } else {
        gross.splice($.inArray(num, gross), 1);
    }
});


function CountStops() {
    var total = 0;
    var add = $('.train-tech').find('.active').text().split('');
    $.each(add, function(index, value) {
        if (!jQuery.isNumeric(parseInt(value))) {
            return true;
        }
        total = total + parseInt(value);
    });
    $('#num_stops').text(total);
}

function SetLevel(lvl) {
    $('.train-tech').each(function(index) {
        $(this).find('label').each(function() {
            if (parseInt($(this).text()) > parseInt(lvl)) {
                $(this).addClass('invisible');
            } else if ($(this).hasClass('invisible')) {
                $(this).removeClass('invisible');
            }
        });
    });
}