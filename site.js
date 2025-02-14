console.log("custom site.js loaded");

jQuery(document).ready(function () {
    console.log("case-studies-slider");
    var caseStudiesSlider = $('.case-studies-slider').multislider({
        continuous: false, // Set to true for infinite scrolling
        slideAll: false,
        interval: 4000,
        duration: 750,
        hoverPause: true,
        pauseAbove: null,
        pauseBelow: null
    });

    $('.case-studies-button.ms-right').on("click", function () {
        caseStudiesSlider.data("next")(); // Move to the next slide
    });

    $('.case-studies-button.ms-left').on("click", function () {
        caseStudiesSlider.data("prev")(); // Move to the previous slide
    });



    var aboutUsSlider = $('.about-us-slider').multislider({
        continuous: false, // Set to true for infinite scrolling
        slideAll: false,
        interval: 2500,
        duration: 750,
        hoverPause: true,
        pauseAbove: null,
        pauseBelow: null
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

    $('.faq_question').on('mouseenter click', function () {
        $(this).closest('.faq_wrapper').addClass("interacted");
        var $faqItem = $(this).closest('.faq_item'); // Get parent .faq_item
        $faqItem.addClass('active').siblings('.faq_item').removeClass('active'); // Add active to current and remove from siblings
    });

    $(".social_proofs_outerwrapper").each(function () {
        const $wrapper = $(this);
        const $indicators = $wrapper.find(".social_proof_indicator");
        const $proofWrapper = $wrapper.find(".social_proof_wrapper");
        const totalIndicators = $indicators.length;

        // Set initial data attributes
        $wrapper.attr("data-active", "1").attr("data-total", totalIndicators);

        // Click event on indicators
        $indicators.each(function (index) {
            $(this).on("click", function () {
                $wrapper.attr("data-active", index + 1);
                $wrapper.addClass("clicked"); // Prevent auto-advance on user interaction
            });
        });

        // Auto-advance logic
        function autoAdvance() {
            if (!$wrapper.hasClass("clicked")) {
                let currentActive = parseInt($wrapper.attr("data-active"), 10);
                let nextActive = currentActive < totalIndicators ? currentActive + 1 : 1;
                $wrapper.attr("data-active", nextActive);
            }
        }

        // Set interval to auto-advance every 3 seconds
        let interval = setInterval(autoAdvance, 3000);

        function updateQuoteSize() {
            // Remove existing inline styles before recalculating
            $proofWrapper.removeClass("sized").css({ "height": "", "width": "" });

            let maxHeight = 0;
            let maxWidth = 0;

            // Loop through each .social_proof and find the tallest and widest one
            $wrapper.find(".social_proof").each(function () {
                let itemHeight = $(this).outerHeight(true);
                let itemWidth = $(this).outerWidth(true);

                if (itemHeight > maxHeight) {
                    maxHeight = itemHeight;
                }

                if (itemWidth > maxWidth) {
                    maxWidth = itemWidth;
                }
            });

            // Apply the max height and width to the .social_proof_wrapper and add "sized" class
            $proofWrapper.css({
                "height": maxHeight + "px",
                "width": maxWidth + "px"
            }).addClass("sized");
        }

        // Run height calculation on load
        updateQuoteSize();


        $(window).on("resize", function () {
            updateQuoteSize();
        });
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
}
