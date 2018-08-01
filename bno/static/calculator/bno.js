// get selection
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
    if(num_trains > 5) { return false; };
    num_trains = num_trains + 1;
    var HTML = '../../templates/calculator/traintech.html';
    $('#t-tech').append(HTML);

    $('.train-tech').delegate('label', 'click', function(){
        $(this).addClass('active').siblings().removeClass('active');
        CountStops();
    });

    $('#num_trains').text(num_trains);
    SetLevel(level);
    CountStops();
});

$(document).on('click','.remove-train',function() {
    $(this).parent().remove();
    num_trains = num_trains - 1;
    $('#num_trains').text(num_trains);
    CountStops();
});

function CountStops(){
    var total = 0;
    var add = $('.train-tech').find('.active').text().split('');
    $.each(add, function(index, value){
        if(!jQuery.isNumeric(parseInt(value))) { return true; }
        total = total + parseInt(value);
    });
    $('#num_stops').text(total);
}

function SetLevel(lvl){
    $('.train-tech').each(function(index) {
        $(this).find('label').each(function(){
            if( parseInt($(this).text()) > parseInt(lvl) ) { $(this).addClass('invisible'); }
            else if( $(this).hasClass('invisible') ) { $(this).removeClass('invisible'); }
        });
    });
}