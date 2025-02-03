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

});
