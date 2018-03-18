$(document).ready(function() {


    var userFeed = new Instafeed({
        get: 'user',
        userId: '7583118',
        limit: 8,
        resolution: 'standard_resolution',
        accessToken: '7583118.1677ed0.08b1fe99262b45168526a156a1a6e685',
        sortBy: 'most-recent',
        template: '<div class="col-lg-3 instaimg"><a href="{{link}}" title="{{caption}}" target="_blank"><img src="{{image}}" alt="{{caption}}" class="img-fluid"/></a></div>',
    });


    userFeed.run();

    
    // This will create a single gallery from all elements that have class "gallery-item"
    $('.gallery').magnificPopup({
        type: 'image',
        delegate: 'a',
        gallery: {
            enabled: true
        }
    });


});