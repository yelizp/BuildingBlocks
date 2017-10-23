$(function() {
    $.get('/cities', appendToList);

    function appendToList(cities) {
        var list = [];
        var content, city;
        for(var i in cities) {
            city = cities[i];
            content = `<a href='#' data-city='${city}'><span class='glyphicon glyphicon-remove'></span></a> 
                <a href='/cities/${city}'> ${city} </a>` ;
            list.push($('<li>', {html : content}));
        }
        $(".city-list").append(list);
    }

    $('form').on('submit', function(event) {
        var form = $(this);
        var cityData = form.serialize();
        $.ajax({type:'POST', url:'/cities', data: cityData})
            .done(function(cityName) {
                appendToList([cityName]);
                form.trigger('reset');
            }).catch(function(error) {
                console.log(error);
            });
    }); 

    $('ul').on('click', 'a[data-city]', function(event) {
        event.preventDefault();

        var target = $(event.currentTarget);
        
        $.ajax({type:'DELETE', url: '/cities/' + target.data('city')})
            .done(function() {
                target.parent('li').remove();
            })
    });
});