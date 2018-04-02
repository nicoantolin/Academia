"use strict";
var $portfolio_filter,$grid_selectors,$blog,$port_filter;
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


/*==============================================================
 owl slider
 ==============================================================*/

$(document).ready(function () {

    bind_shrink_header();
    
    var isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }
    
    $('.owl-slider-full').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        items: 3,
        paginationSpeed: 400,
        autoPlay: 5000,
        singleItem: true,
        navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
    });
    
    $('.owl-slider-style2').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        items: 2,
        itemsDesktop: [1200, 2],
        itemsTablet: [800, 2],
        itemsMobile: [700, 1],
        paginationSpeed: 400,
         navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
    });

    $('.owl-slider-style3').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        items: 3,
        itemsDesktop: [1200, 4],
        itemsTablet: [800, 2],
        itemsMobile: [700, 1],
        paginationSpeed: 400,
        navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
    });

    $('.owl-slider-style4').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        items: 4,
        itemsDesktop: [1200, 4],
        itemsTablet: [991, 3],
        itemsMobile: [767, 1],
        paginationSpeed: 400,
         navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
    });

    $('.testimonial-style3').owlCarousel({
        navigation: false,
        items: 3,
        itemsDesktop: [1200, 3],
        itemsTablet: [800, 2],
        itemsMobile: [700, 1]
    });

    $('.gallery-style4').owlCarousel({
        navigation: false,
        items: 4,
        itemsDesktop: [1200, 4],
        itemsTablet: [991, 3],
        itemsMobile: [767, 1]
    });

    $('.owl-slider-auto').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        items: 3,
        autoPlay: 5000,
        paginationSpeed: 400,
        singleItem: true,
         navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']
    });

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    //set equalize height
    $('.equalize').equalize();

    //fit videos
    $(".fit-videos").fitVids();

    /* ===================================
     counter number reset while scrolling
     ====================================== */
    $('.timer').removeClass('appear');
    $('.timer').appear();
    $(document.body).on('appear', '.timer', function (e) {
        // this code is executed for each appeared element
        if (!$(this).hasClass('appear')) {
            animatecounters();
            $(this).addClass('appear');
        }
    });

    /* ===================================
     Tab Active After Export
     ====================================== */
    
    var tab_id = $('.nav-tabs').parents('section').attr('id');
    if(tab_id != undefined)
    {
        var tz_tabs = tab_id.substring(0,3);
        if(tz_tabs == 'tab')
        {
            var rem_href = $('#'+tab_id).find('.nav-tabs li.active').find('a').attr('href');
            var rem_active =  $('#'+tab_id).find('.nav-tabs li.active').removeClass('active');
            $('#'+tab_id).find(rem_href).removeClass('active');
            $('#'+tab_id).find('.nav-tabs li').first().addClass('active');
            var first_href = $('#'+tab_id).find('.nav-tabs li').first().find('a').attr('href');
            $('#'+tab_id).find(first_href).addClass('active in');
        }
    }

    /* ===================================
     Toggle Close 
     ====================================== */
    $(document).on('click', 'ul.navbar-nav li', function (event) { 
        $('#bs-example-navbar-collapse-1').removeClass('in');
        $('#bs-example-navbar-collapse-1').addClass('collapse');
        $('.navbar-toggle').addClass('collapsed');
    });


    /* ===================================
     masonry
     ====================================== */

    $blog = $('.masonry-items');
    $blog.imagesLoaded(function () {
        $blog.isotope({
            itemSelector: 'li',
            layoutMode: 'masonry'
        });
    });

    /*==============================================================*/
    //Lightbox gallery - START CODE
    /*==============================================================*/
    
     $('.lightbox-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        midClick: true,
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-fade',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title');
            }
        },
        callbacks: {
                open: function () {
                    $.magnificPopup.instance.close = function() {
                        if (!isMobile){
                            $.magnificPopup.proto.close.call(this);
                        } else {
                            $(document).on('click', 'button.mfp-close', function (event) {
                               $.magnificPopup.proto.close.call(this);
                            });
                        }
                    }
                }
            }
    });

     /*==============================================================
     smooth scroll With Shrink Navigation
     ==============================================================*/

    $(window).scroll(function () {
        
        var shrink_header = $('.shrink-header').length;
        var shrink_medium_header = $('.shrink-medium-header').length;
        var shrink_big_header = $('.shrink-big-header').length;
        var shrink_transparent_header_light = $('.shrink-transparent-header-light').length;
        var shrink_transparent_header_dark = $('.shrink-transparent-header-dark').length;
        if(shrink_medium_header)
        {
            var windowsize = $(window).width();
            if(windowsize <= 991 && windowsize == 768)
            {
              var header_offset = -106;
            }else if(windowsize <= 767){
              var header_offset = -90;
            }else{
              var header_offset = -110;
            }
            
        }else if(shrink_big_header){
            var windowsize = $(window).width();
            if(windowsize <= 991)
            {
              var header_offset = -64;
            }else{
              var header_offset = -115;
            }
            
        }else if(shrink_header || shrink_transparent_header_light || shrink_transparent_header_dark){
            var windowsize = $(window).width();
            if(windowsize <= 991 && windowsize == 768)
            {
              var header_offset = -64;
            }else if(windowsize <= 767){
              var header_offset = -60;
            }else{
              var header_offset = -68;
            }
            
        }else{
            var header_offset = 1;
        }
        $('.inner-link').smoothScroll({
            speed: 900,
            offset: header_offset
        });

        $('a.btn:not(.inner-link)').smoothScroll({
            speed: 900,
            offset: header_offset
        });
    });


    /* ===================================
     shrink navigation Active
     ====================================== */
    $('.navigation-menu').onePageNav({
        scrollSpeed: 750,
        scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
        scrollOffset: 79, //Height of Navigation Bar
        currentClass: 'active',
        filter: ':not(.btn-very-small)'
    });
    /*===========================================================
     Contact Form 
     ============================================================ */

    $('.tz_submit').on('click', function (event) {
        event.preventDefault();
        var name_attr = [];
        var values = [];
        var tz_process = "";
        if($(this).closest("section").attr('id') !== undefined)
        {
            var section_id = $(this).closest("section").attr('id');
        }else{
            var section_id = $(this).closest("footer").attr('id');
        }
        var submit_loader = '<div class="loading text-deep-green display-inline-block margin-five no-margin-tb no-margin-right" id="loading">Loading...</div>';
        $('#' + section_id).find('form').find('button').after(submit_loader);
        $('#' + section_id).find('form input, form select,form textarea').each(
                function (index) {
                    
                    if ($(this).is('[data-email="required"]')) {
                        var required_val = $(this).val();
                        if (required_val != '') {
                            name_attr.push($(this).attr('name'));
                            values.push($(this).val());
                            tz_process = true;
                        } else {
                            $('#loading').remove();
                            $(this).addClass('tz_input_error');
                            tz_process = false;
                        }
                    }

                    if (!$(this).is('[data-email="required"]')) {
                        name_attr.push($(this).attr('name'));
                        values.push($(this).val());
                    }

                });
        
        var captcha_length = $('.g-recaptcha').length;
        if (captcha_length >= 1) {
            var response = grecaptcha.getResponse();
            //recaptcha failed validation
            if (response.length == 0) {
                $('#loading').remove();
                $('#google-recaptcha-error').remove();
                $('#' + section_id).find('.g-recaptcha').after('<span class="google-recaptcha-error" id="google-recaptcha-error">Invalid recaptcha</span>');
                tz_process = false;
            } else {
                $('#google-recaptcha-error').remove();
                $('#recaptcha-error').hide();
                tz_process = true;
            }
        }
        if (tz_process) 
        {
            localStorage.setItem('tz_section',section_id);
            $.post("tz_mail/contact.php", {
                data: { input_name: name_attr,values:values,section_id:section_id},
                type: "POST",
            }, function (data) {
                $('#loading').remove();
                var tz_form_output = '';
                if(data) 
                {
                    if(data.type == "tz_message") 
                    {
                       $('#error').remove(); 
                       $('#success').remove();
                       $('#google-recaptcha-error').remove(); 
                       var tz_form_output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else if (data.type == "tz_error") {
                        $('#success').remove();
                        $('#error').remove(); 
                        var tz_form_output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else{
                        var tz_form_output = '';
                    } 
                }

                if(tz_form_output != '')
                {
                    var section_id = localStorage.getItem('tz_section');
                    $('#'+section_id).find('form').before(tz_form_output);
                }
                $('#' + section_id).find('form input,form textarea').each(function (index) {
                    $(this).val('');
                    $(this).removeClass('tz_input_error');
                });

                setTimeout(function(){
                    $('#success').fadeOut();
                    $('#success').remove();
                    $('#error').fadeOut();
                    $('#error').remove();
                    $(this).submit();
                 },5000);
                localStorage.removeItem('tz_section');
            }, 'json');
        }
        
        $('#' + section_id).find('form input,form textarea').each(function (index) {
            $(this).keypress(function () {
                $(this).removeClass('tz_input_error');
            });
        });

        $('#' + section_id).find('form input,form textarea').each(function (index) {
            if ($(this).is(":focus")) {
                $(this).removeClass('tz_input_error');
            }
        });

        $('#' + section_id).find('form select').each(function (index) {
            $(this).on("change", function () {
                var val = this.value;
                if (val == ''){
                    $(this).removeClass('tz_input_error');
                }
            });
        });
    });
    
});

/* ===================================
 shrink navigation
 ====================================== */
$(window).scroll(function () {
    bind_shrink_header();
});

function bind_shrink_header() {
    if ($('nav').hasClass('shrink-header')) {

        $('.shrink-header').addClass('shrink-nav');
        $('section:first').addClass('header-margin-top');

    } else if ($('nav').hasClass('shrink-big-header')) {

        $('.shrink-big-header').addClass('shrink-nav');
        $('section:first').addClass('header-margin-top-big');

    } else if ($('nav').hasClass('shrink-medium-header')) {

        $('.shrink-medium-header').addClass('shrink-nav');
        $('section:first').addClass('header-margin-top-medium');

    } else if ($('nav').hasClass('shrink-transparent-header-dark')) {

        $('.shrink-transparent-header-dark').addClass('shrink-nav');

    } else if ($('nav').hasClass('shrink-transparent-header-light')) {

        $('.shrink-transparent-header-light').addClass('shrink-nav');

    } else {

        $('.shrink-header').removeClass('shrink-nav');
        $('section:first').removeClass('header-margin-top');
    }

    if ($(window).scrollTop() > 10) {
        $('nav').addClass('shrink');
    } else {
        $('nav').removeClass('shrink');
    }
}

setTimeout(function () {
    $(window).scroll();
}, 500);


/*==============================================================
 portfolio-filter
 ==============================================================*/

$portfolio_filter = $('.grid');
$portfolio_filter.imagesLoaded(function () {
    $portfolio_filter.isotope({
        itemSelector: 'li',
        layoutMode: 'masonry'
    });
});

$grid_selectors = $('.portfolio-filter > li > a');
$grid_selectors.on('click', function ()
{
    $portfolio_filter = $('.grid');
    $('.portfolio-filter > li').removeClass('active');
    $(this).parent().addClass('active');

    var selector = $(this).attr('data-filter');
    $portfolio_filter.imagesLoaded(function () {
        $portfolio_filter.isotope({
            filter: selector,
            itemSelector: 'li',
            layoutMode: 'masonry'

        });
    });
    return false;
});

$(window).resize(function () {
    setTimeout(function () {
        $portfolio_filter.isotope('layout');
        //set equalize height
        if (!isMobile.any()) {
            $(window).unbind('equalize');
            //$('.equalize > div').css('height', '');
            $('.equalize').equalize();
        }
    }, 500);
});

$(window).on("orientationchange", function () {
    if (isMobile.any()) {
        $(window).unbind('equalize');
        setTimeout(function () {
            $('.equalize').equalize();
        }, 500);
    }
});

$(window).load(function () {
    //set equalize height
    $('.equalize').equalize();
});

/*==============================================================
 accordion
 ==============================================================*/

$('.accordion-style1 .collapse').on('show.bs.collapse', function () {
    var id = $(this).attr('id');
    $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-accordion');
    $('a[href="#' + id + '"] .panel-title').find('i').addClass('fa-angle-up').removeClass('fa-angle-down');
});
$('.accordion-style1 .collapse').on('hide.bs.collapse', function () {
    var id = $(this).attr('id');
    $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-accordion');
    $('a[href="#' + id + '"] .panel-title').find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
});

/*==============================================================
 countdown timer
 ==============================================================*/

$('#counter-event').countdown($('#counter-event').attr("data-enddate")).on('update.countdown', function (event) {
    var $this = $(this).html(event.strftime('' + '<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div>' + '<div class="counter-box"><div class="number">%H</div><span>Hours</span></div>' + '<div class="counter-box"><div class="number">%M</div><span>Minutes</span></div>' + '<div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'))
});

/*==============================================================
 counter
 ==============================================================*/

jQuery(function ($) {
    // start all the timers
    animatecounters();
});

function animatecounters() {
    $('.timer').each(count);
    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }

}

/* ===========================================================
   TWITTER FEED
============================================================== */
function handleTweets(tweets) {
    
    var x = tweets.length,
    n = 0,
    element = document.getElementById('twitter-feed'),
    html = '<div class="twitter-post-slides">';
    while (n < x) {
        html += '<div>' + tweets[n] + '</div>';
        n++;
    }
    html += '</div>';
    
    element.innerHTML = html;
       
    /* Twits attached to owl-carousel */
    $(".twitter-post-slides").owlCarousel({
        slideSpeed : 300,
        paginationSpeed : 400,
        autoPlay: true,
        pagination: false,
        transitionStyle : "fade",
        singleItem: true
    });
}

if( $('#twitter-feed').length ) 
{   
    var widgetId = $('#twitter-feed').attr('data-widget-id');
    var tz_config_feed = {
      "id": widgetId,
      "domId": 'twitter-feed',
      "maxTweets": 5,
      "enableLinks": true,
      "showUser": false,
      "showTime": true,
      "dateFunction": '',
      "showRetweet": false,
      "customCallback": handleTweets,
      "showInteraction": false
    };
    twitterFetcher.fetch(tz_config_feed);
}

/*==============================================================
 wow animation - on scroll
 ==============================================================*/

var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 90,
    mobile: false,
    live: true
});
wow.init();




jQuery(document).ready(function($){
    var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
    var transitionsSupported = ( $('.csstransitions').length > 0 );
    //if browser does not support transitions - use a different event to trigger them
    if( !transitionsSupported ) transitionEnd = 'noTransition';
    
    //should add a loding while the events are organized 

    function SchedulePlan( element ) {
        this.element = element;
        this.timeline = this.element.find('.timeline');
        this.timelineItems = this.timeline.find('li');
        this.timelineItemsNumber = this.timelineItems.length;
        this.timelineStart = getScheduleTimestamp(this.timelineItems.eq(0).text());
        //need to store delta (in our case half hour) timestamp
        this.timelineUnitDuration = getScheduleTimestamp(this.timelineItems.eq(1).text()) - getScheduleTimestamp(this.timelineItems.eq(0).text());

        this.eventsWrapper = this.element.find('.events');
        this.eventsGroup = this.eventsWrapper.find('.events-group');
        this.singleEvents = this.eventsGroup.find('.single-event');
        this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();

        this.modal = this.element.find('.event-modal');
        this.modalHeader = this.modal.find('.header');
        this.modalHeaderBg = this.modal.find('.header-bg');
        this.modalBody = this.modal.find('.body'); 
        this.modalBodyBg = this.modal.find('.body-bg'); 
        this.modalMaxWidth = 800;
        this.modalMaxHeight = 480;

        this.animating = false;

        this.initSchedule();
    }

    SchedulePlan.prototype.initSchedule = function() {
        this.scheduleReset();
        this.initEvents();
    };

    SchedulePlan.prototype.scheduleReset = function() {
        var mq = this.mq();
        if( mq == 'desktop' && !this.element.hasClass('js-full') ) {
            //in this case you are on a desktop version (first load or resize from mobile)
            this.eventSlotHeight = this.eventsGroup.eq(0).children('.top-info').outerHeight();
            this.element.addClass('js-full');
            this.placeEvents();
            this.element.hasClass('modal-is-open') && this.checkEventModal();
        } else if(  mq == 'mobile' && this.element.hasClass('js-full') ) {
            //in this case you are on a mobile version (first load or resize from desktop)
            this.element.removeClass('js-full loading');
            this.eventsGroup.children('ul').add(this.singleEvents).removeAttr('style');
            this.eventsWrapper.children('.grid-line').remove();
            this.element.hasClass('modal-is-open') && this.checkEventModal();
        } else if( mq == 'desktop' && this.element.hasClass('modal-is-open')){
            //on a mobile version with modal open - need to resize/move modal window
            this.checkEventModal('desktop');
            this.element.removeClass('loading');
        } else {
            this.element.removeClass('loading');
        }
    };

    SchedulePlan.prototype.initEvents = function() {
        var self = this;

        this.singleEvents.each(function(){
            //create the .event-date element for each event
            var durationLabel = '<span class="event-date">'+$(this).data('start')+' - '+$(this).data('end')+'</span>';
            $(this).children('a').prepend($(durationLabel));

            //detect click on the event and open the modal
            $(this).on('click', 'a', function(event){
                event.preventDefault();
                if( !self.animating ) self.openModal($(this));
            });
        });

        //close modal window
        this.modal.on('click', '.close', function(event){
            event.preventDefault();
            if( !self.animating ) self.closeModal(self.eventsGroup.find('.selected-event'));
        });
        this.element.on('click', '.cover-layer', function(event){
            if( !self.animating && self.element.hasClass('modal-is-open') ) self.closeModal(self.eventsGroup.find('.selected-event'));
        });
    };

    SchedulePlan.prototype.placeEvents = function() {
        var self = this;
        this.singleEvents.each(function(){
            //place each event in the grid -> need to set top position and height
            var start = getScheduleTimestamp($(this).attr('data-start')),
                duration = getScheduleTimestamp($(this).attr('data-end')) - start;

            var eventTop = self.eventSlotHeight*(start - self.timelineStart)/self.timelineUnitDuration,
                eventHeight = self.eventSlotHeight*duration/self.timelineUnitDuration;
            
            $(this).css({
                top: (eventTop -1) +'px',
                height: (eventHeight+1)+'px'
            });
        });

        this.element.removeClass('loading');
    };

    SchedulePlan.prototype.openModal = function(event) {
        var self = this;
        var mq = self.mq();
        this.animating = true;

        //update event name and time
        this.modalHeader.find('.event-name').text(event.find('.event-name').text());
        this.modalHeader.find('.event-date').text(event.find('.event-date').text());
        this.modal.attr('data-event', event.parent().attr('data-event'));

        //update event content
        this.modalBody.find('.event-info').load(event.parent().attr('data-content')+'.html .event-info > *', function(data){
            //once the event content has been loaded
            self.element.addClass('content-loaded');
        });

        this.element.addClass('modal-is-open');

        setTimeout(function(){
            //fixes a flash when an event is selected - desktop version only
            event.parent('li').addClass('selected-event');
        }, 10);

        if( mq == 'mobile' ) {
            self.modal.one(transitionEnd, function(){
                self.modal.off(transitionEnd);
                self.animating = false;
            });
        } else {
            var eventTop = event.offset().top - $(window).scrollTop(),
                eventLeft = event.offset().left,
                eventHeight = event.innerHeight(),
                eventWidth = event.innerWidth();

            var windowWidth = $(window).width(),
                windowHeight = $(window).height();

            var modalWidth = ( windowWidth*.8 > self.modalMaxWidth ) ? self.modalMaxWidth : windowWidth*.8,
                modalHeight = ( windowHeight*.8 > self.modalMaxHeight ) ? self.modalMaxHeight : windowHeight*.8;

            var modalTranslateX = parseInt((windowWidth - modalWidth)/2 - eventLeft),
                modalTranslateY = parseInt((windowHeight - modalHeight)/2 - eventTop);
            
            var HeaderBgScaleY = modalHeight/eventHeight,
                BodyBgScaleX = (modalWidth - eventWidth);

            //change modal height/width and translate it
            self.modal.css({
                top: eventTop+'px',
                left: eventLeft+'px',
                height: modalHeight+'px',
                width: modalWidth+'px',
            });
            transformElement(self.modal, 'translateY('+modalTranslateY+'px) translateX('+modalTranslateX+'px)');

            //set modalHeader width
            self.modalHeader.css({
                width: eventWidth+'px',
            });
            //set modalBody left margin
            self.modalBody.css({
                marginLeft: eventWidth+'px',
            });

            //change modalBodyBg height/width ans scale it
            self.modalBodyBg.css({
                height: eventHeight+'px',
                width: '1px',
            });
            transformElement(self.modalBodyBg, 'scaleY('+HeaderBgScaleY+') scaleX('+BodyBgScaleX+')');

            //change modal modalHeaderBg height/width and scale it
            self.modalHeaderBg.css({
                height: eventHeight+'px',
                width: eventWidth+'px',
            });
            transformElement(self.modalHeaderBg, 'scaleY('+HeaderBgScaleY+')');
            
            self.modalHeaderBg.one(transitionEnd, function(){
                //wait for the  end of the modalHeaderBg transformation and show the modal content
                self.modalHeaderBg.off(transitionEnd);
                self.animating = false;
                self.element.addClass('animation-completed');
            });
        }

        //if browser do not support transitions -> no need to wait for the end of it
        if( !transitionsSupported ) self.modal.add(self.modalHeaderBg).trigger(transitionEnd);
    };

    SchedulePlan.prototype.closeModal = function(event) {
        var self = this;
        var mq = self.mq();

        this.animating = true;

        if( mq == 'mobile' ) {
            this.element.removeClass('modal-is-open');
            this.modal.one(transitionEnd, function(){
                self.modal.off(transitionEnd);
                self.animating = false;
                self.element.removeClass('content-loaded');
                event.removeClass('selected-event');
            });
        } else {
            var eventTop = event.offset().top - $(window).scrollTop(),
                eventLeft = event.offset().left,
                eventHeight = event.innerHeight(),
                eventWidth = event.innerWidth();

            var modalTop = Number(self.modal.css('top').replace('px', '')),
                modalLeft = Number(self.modal.css('left').replace('px', ''));

            var modalTranslateX = eventLeft - modalLeft,
                modalTranslateY = eventTop - modalTop;

            self.element.removeClass('animation-completed modal-is-open');

            //change modal width/height and translate it
            this.modal.css({
                width: eventWidth+'px',
                height: eventHeight+'px'
            });
            transformElement(self.modal, 'translateX('+modalTranslateX+'px) translateY('+modalTranslateY+'px)');
            
            //scale down modalBodyBg element
            transformElement(self.modalBodyBg, 'scaleX(0) scaleY(1)');
            //scale down modalHeaderBg element
            transformElement(self.modalHeaderBg, 'scaleY(1)');

            this.modalHeaderBg.one(transitionEnd, function(){
                //wait for the  end of the modalHeaderBg transformation and reset modal style
                self.modalHeaderBg.off(transitionEnd);
                self.modal.addClass('no-transition');
                setTimeout(function(){
                    self.modal.add(self.modalHeader).add(self.modalBody).add(self.modalHeaderBg).add(self.modalBodyBg).attr('style', '');
                }, 10);
                setTimeout(function(){
                    self.modal.removeClass('no-transition');
                }, 20);

                self.animating = false;
                self.element.removeClass('content-loaded');
                event.removeClass('selected-event');
            });
        }

        //browser do not support transitions -> no need to wait for the end of it
        if( !transitionsSupported ) self.modal.add(self.modalHeaderBg).trigger(transitionEnd);
    }

    SchedulePlan.prototype.mq = function(){
        //get MQ value ('desktop' or 'mobile') 
        var self = this;
        return window.getComputedStyle(this.element.get(0), '::before').getPropertyValue('content').replace(/["']/g, '');
    };

    SchedulePlan.prototype.checkEventModal = function(device) {
        this.animating = true;
        var self = this;
        var mq = this.mq();

        if( mq == 'mobile' ) {
            //reset modal style on mobile
            self.modal.add(self.modalHeader).add(self.modalHeaderBg).add(self.modalBody).add(self.modalBodyBg).attr('style', '');
            self.modal.removeClass('no-transition');    
            self.animating = false; 
        } else if( mq == 'desktop' && self.element.hasClass('modal-is-open') ) {
            self.modal.addClass('no-transition');
            self.element.addClass('animation-completed');
            var event = self.eventsGroup.find('.selected-event');

            var eventTop = event.offset().top - $(window).scrollTop(),
                eventLeft = event.offset().left,
                eventHeight = event.innerHeight(),
                eventWidth = event.innerWidth();

            var windowWidth = $(window).width(),
                windowHeight = $(window).height();

            var modalWidth = ( windowWidth*.8 > self.modalMaxWidth ) ? self.modalMaxWidth : windowWidth*.8,
                modalHeight = ( windowHeight*.8 > self.modalMaxHeight ) ? self.modalMaxHeight : windowHeight*.8;

            var HeaderBgScaleY = modalHeight/eventHeight,
                BodyBgScaleX = (modalWidth - eventWidth);

            setTimeout(function(){
                self.modal.css({
                    width: modalWidth+'px',
                    height: modalHeight+'px',
                    top: (windowHeight/2 - modalHeight/2)+'px',
                    left: (windowWidth/2 - modalWidth/2)+'px',
                });
                transformElement(self.modal, 'translateY(0) translateX(0)');
                //change modal modalBodyBg height/width
                self.modalBodyBg.css({
                    height: modalHeight+'px',
                    width: '1px',
                });
                transformElement(self.modalBodyBg, 'scaleX('+BodyBgScaleX+')');
                //set modalHeader width
                self.modalHeader.css({
                    width: eventWidth+'px',
                });
                //set modalBody left margin
                self.modalBody.css({
                    marginLeft: eventWidth+'px',
                });
                //change modal modalHeaderBg height/width and scale it
                self.modalHeaderBg.css({
                    height: eventHeight+'px',
                    width: eventWidth+'px',
                });
                transformElement(self.modalHeaderBg, 'scaleY('+HeaderBgScaleY+')');
            }, 10);

            setTimeout(function(){
                self.modal.removeClass('no-transition');
                self.animating = false; 
            }, 20);
        }
    };

    var schedules = $('.cd-schedule');
    var objSchedulesPlan = [],
        windowResize = false;
    
    if( schedules.length > 0 ) {
        schedules.each(function(){
            //create SchedulePlan objects
            objSchedulesPlan.push(new SchedulePlan($(this)));
        });
    }

    $(window).on('resize', function(){
        if( !windowResize ) {
            windowResize = true;
            (!window.requestAnimationFrame) ? setTimeout(checkResize) : window.requestAnimationFrame(checkResize);
        }
    });

    $(window).keyup(function(event) {
        if (event.keyCode == 27) {
            objSchedulesPlan.forEach(function(element){
                element.closeModal(element.eventsGroup.find('.selected-event'));
            });
        }
    });

    function checkResize(){
        objSchedulesPlan.forEach(function(element){
            element.scheduleReset();
        });
        windowResize = false;
    }

    function getScheduleTimestamp(time) {
        //accepts hh:mm format - convert hh:mm to timestamp
        time = time.replace(/ /g,'');
        var timeArray = time.split(':');
        var timeStamp = parseInt(timeArray[0])*60 + parseInt(timeArray[1]);
        return timeStamp;
    }

    function transformElement(element, value) {
        element.css({
            '-moz-transform': value,
            '-webkit-transform': value,
            '-ms-transform': value,
            '-o-transform': value,
            'transform': value
        });
    }
});