jQuery(document).ready(function () {
    console.log("case-studies-slider");

    try {
        UpdateRelativeMousePosition({ clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
        $(document).mousemove(UpdateRelativeMousePosition);
    } catch (err) {
        console.warn("Mouse position update failed:", err);
    }

    let caseStudiesSlider;
    try {
        caseStudiesSlider = $('.case-studies-slider').multislider({
            continuous: false,
            slideAll: false,
            interval: 4000,
            duration: 750,
            hoverPause: true,
            pauseAbove: null,
            pauseBelow: null
        });
    } catch (err) {
        console.error("Failed to initialize caseStudiesSlider:", err);
    }

    try {
        $('.case-studies-button.ms-right').on("click", function () {
            try { caseStudiesSlider.data("next")(); } catch (err) { console.warn("next not available", err); }
        });

        $('.case-studies-button.ms-left').on("click", function () {
            try { caseStudiesSlider.data("prev")(); } catch (err) { console.warn("prev not available", err); }
        });
    } catch (err) {
        console.warn("Slider button binding failed:", err);
    }

    try {
        $('.about-us-slider').multislider({
            continuous: false,
            slideAll: false,
            interval: 2500,
            duration: 750,
            hoverPause: true,
            pauseAbove: null,
            pauseBelow: null
        });
    } catch (err) {
        console.warn("Failed to initialize aboutUsSlider:", err);
    }

    try {
        setInterval(cycleFaqItems, 3000);
    } catch (err) {
        console.warn("Failed to set FAQ interval:", err);
    }

    try {
        $('.faq_wrapper').on('mouseenter click', function () {
            $(this).addClass('interacted');
        }).on('mouseleave', function () {
            const $wrapper = $(this);
            setTimeout(() => $wrapper.removeClass('interacted'), 10000);
        });

        $('.faq_question').on('click', function () {
            const $faqWrapper = $(this).closest('.faq_wrapper');
            const $faqItem = $(this).closest('.faq_item');
            const $link = $faqItem.find('a.border-button');
            const url = $link.attr('href');
            if (url && url !== "#") {
                window.location.href = url;
            }
        });
    } catch (err) {
        console.warn("FAQ interaction error:", err);
    }

    try {
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
                    maxHeight = Math.max(maxHeight, itemHeight);
                    maxWidth = Math.max(maxWidth, itemWidth);
                });

                $proofWrapper.css({
                    "height": maxHeight + "px",
                    "width": maxWidth + "px"
                }).addClass("sized");
            }

            updateQuoteSize();
            $(window).on("resize", updateQuoteSize);
        });
    } catch (err) {
        console.warn("Social proof slider setup failed:", err);
    }
});
