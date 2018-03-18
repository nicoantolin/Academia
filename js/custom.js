$(document).ready(function() {


    var userFeed = new Instafeed({
        get: 'user',
        userId: '5628321695',
        limit: 8,
        resolution: 'standard_resolution',
        accessToken: '5628321695.1677ed0.3dec227a5fcb4d228af3c0486b6d04b0',
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