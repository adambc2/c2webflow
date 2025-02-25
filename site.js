console.log("custom site.js loaded");

function updateBodyClass() {
    if (window.innerWidth < 768) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}

// Run on page load
updateBodyClass();

// Run on window resize
window.addEventListener('resize', updateBodyClass);

function UpdateRelativeMousePosition(event) {
    let xPercent = event.clientX / window.innerWidth;
    let yPercent = event.clientY / window.innerHeight;

    // Set x and y percentages as CSS variables
    $("body").css({
        "--x-percent": xPercent,
        "--y-percent": yPercent
    });

    // Calculate durations: faster animation at lower Y (top), slower at higher Y (bottom)
    // Duration range: Left side (20s to 80s), Right side (15s to 60s)
    const leftDuration = (1 - yPercent) * 60 + 20;  // from 80s to 20s
    const rightDuration = (1 - yPercent) * 45 + 15; // from 60s to 15s

    $(".left_side").css("--left-duration", `${leftDuration}s`);
    $(".right_side").css("--right-duration", `${rightDuration}s`);
}

jQuery(document).ready(function () {
    console.log("case-studies-slider");

    // Call the function on document ready with a mock event to set initial values
    UpdateRelativeMousePosition({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });

    $(document).mousemove(UpdateRelativeMousePosition);

    var caseStudiesSlider = $('.case-studies-slider').multislider({
        continuous: false,
        slideAll: false,
        interval: 4000,
        duration: 750,
        hoverPause: true,
        pauseAbove: null,
        pauseBelow: null
    });

    $('.case-studies-button.ms-right').on("click", function () {
        caseStudiesSlider.data("next")();
    });

    $('.case-studies-button.ms-left').on("click", function () {
        caseStudiesSlider.data("prev")();
    });

    var aboutUsSlider = $('.about-us-slider').multislider({
        continuous: false,
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
        }, 10000);
    });

    $('.faq_question').on('click', function () {
        var $faqWrapper = $(this).closest('.faq_wrapper');
        var $faqItem = $(this).closest('.faq_item');
        var $link = $faqItem.find('a.border-button');
        var url = $link.attr('href');
        if (url && url !== "#") {
            window.location.href = url;
        }
    });

    $(".social_proofs_outerwrapper").each(function () {
        const $wrapper = $(this);
        const $indicators = $wrapper.find(".social_proof_indicator");
        const $proofWrapper = $wrapper.find(".social_proof_wrapper");
        const totalIndicators = $indicators.length;

        $wrapper.attr("data-active", "1").attr("data-total", totalIndicators);

        $indicators.each(function (index) {
            $(this).on("click", function () {
                $wrapper.attr("data-active", index + 1);
                $wrapper.addClass("clicked");
            });
        });

        function autoAdvance() {
            if (!$wrapper.hasClass("clicked")) {
                let currentActive = parseInt($wrapper.attr("data-active"), 10);
                let nextActive = currentActive < totalIndicators ? currentActive + 1 : 1;
                $wrapper.attr("data-active", nextActive);
            }
        }

        let interval = setInterval(autoAdvance, 3000);

        function updateQuoteSize() {
            $proofWrapper.removeClass("sized").css({ "height": "", "width": "" });

            let maxHeight = 0;
            let maxWidth = 0;

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

            $proofWrapper.css({
                "height": maxHeight + "px",
                "width": maxWidth + "px"
            }).addClass("sized");
        }

        updateQuoteSize();
        $(window).on("resize", updateQuoteSize);
    });
});

function cycleFaqItems() {
    $('.faq_wrapper').each(function () {
        if ($('body').hasClass('mobile')) {
            return;
        }

        var $wrapper = $(this);

        if ($wrapper.hasClass('interacted')) {
            return;
        }

        var $items = $wrapper.find('.faq_item');
        var $activeItem = $items.filter('.active');

        if ($activeItem.length === 0) {
            $items.first().addClass('active');
        } else {
            var $nextItem = $activeItem.next('.faq_item');
            if ($nextItem.length === 0) {
                $nextItem = $items.first();
            }
            $activeItem.removeClass('active');
            $nextItem.addClass('active');
        }
    });
}
