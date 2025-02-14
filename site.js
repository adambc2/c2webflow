$(document).ready(function(){
	console.log("case-studies-slider")
	var caseStudiesSlider = $('.case-studies-slider').multislider({
        continuous: false, // Set to true for infinite scrolling
        slideAll: false,  
        interval: 4000, 
        duration: 750,      
        hoverPause: true, 
        pauseAbove: null,   
        pauseBelow: null   
    });

    $('.case-studies-button.ms-right').on("click", function() {
        caseStudiesSlider.data("next")(); // Move to the next slide
    });

    $('.case-studies-button.ms-left').on("click", function() {
        caseStudiesSlider.data("prev")(); // Move to the previous slide
    });

    setInterval(cycleFaqItems, 3000);

    $('.faq_wrapper').on('mouseenter click', function () {
        $(this).addClass('interacted');
    });

    $('.faq_wrapper').on('mouseleave', function () {
        var $wrapper = $(this);
        setTimeout(function () {
            $wrapper.removeClass('interacted');
        }, 5000); // Resumes cycling after 5 seconds
    });
});
function cycleFaqItems() {
    $('.faq_wrapper').each(function () {
        var $wrapper = $(this);

        // Skip cycling if the wrapper has the "interacted" class
        if ($wrapper.hasClass('interacted')) {
            return;
        }

        var $items = $wrapper.find('.faq_item');
        var $activeItem = $items.filter('.active');

        if ($activeItem.length === 0) {
            // If no active item, add active class to the first one
            $items.first().addClass('active');
        } else {
            // Otherwise, move to the next item, or loop back to the first
            var $nextItem = $activeItem.next('.faq_item');
            if ($nextItem.length === 0) {
                $nextItem = $items.first();
            }
            $activeItem.removeClass('active');
            $nextItem.addClass('active');
        }
    });