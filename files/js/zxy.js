!$(function(){
    var logoList = $('.logo-list'),
        shBot = $('#sh-bot'),
        logoDiv = $('#logo-div'),
        shNav = $('#sh-nav li'),
        two = $('#two');

    shBot.hover(function() {
        $(this).addClass('sh-bothover')
    }, function() {
        $(this).removeClass('sh-bothover')
    });
    shNav.click(function(event) {
        var type = $(this).attr('class');
        $(this).addClass('active').siblings().removeClass('active');


    });
    logoDiv.hover(function() {
        logoList.show();
    }, function() {
        logoList.hide();
    });
    two.on('click', 'a', function(event) {
        event.preventDefault();
        $(this).addClass('active').siblings().removeClass('active')
    });
})
