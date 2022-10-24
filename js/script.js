$(window).on('load', function () {

    // Scroll top button
    // $offset = $("#header").outerHeight();
    // $(window).scroll(function () {
    //     if ($(this).scrollTop() > 200)
    //         $('#btn-scroll-top').fadeIn(200);
    //     else
    //         $('#btn-scroll-top').fadeOut(200);

    //     if ($(this).scrollTop() > $offset + 200) {
    //         $("#header").addClass("fixed");
    //         $('body').css("padding-top", $offset + "px");
    //     }
    //     else {
    //         $("#header").removeClass("fixed");
    //         $('body').css("padding-top", "0");
    //     }
    // });

});

$(function () {

    $('.accardion-item-header button').click(function () {
        const accordionBody = $(this).closest('.accardion-item').find('.accardion-item-body');
        $('.accardion-item-body.show').stop(true, false, true).slideUp(250);
        accordionBody.stop(true, false, true).slideToggle(250);
        accordionBody.addClass("show");
    });

    // Welcome swiper
    const welcomeSwiper = new Swiper(".welcomeSwiper", {
        spaceBetween: 50,
        autoplay: {
            pauseOnMouseEnter: false,
            disableOnInteraction: false,
            delay: 3000,
        },
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar",
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false,
        },
    });

    // Brands swiper
    const brandsSwiper = new Swiper(".brandsSwiper", {
        slidesPerView: 7,
        spaceBetween: 100,
        autoplay: {
            pauseOnMouseEnter: false,
            disableOnInteraction: false,
            delay: 3000,
        },
    });

    // Products swiper
    const productsSwiper = new Swiper(".productsSwiper", {
        slidesPerView: 4,
        spaceBetween: 60,
        autoplay: {
            pauseOnMouseEnter: false,
            disableOnInteraction: false,
            delay: 3000,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // Sub services swiper
    const subServicesSwiper = new Swiper(".subServicesSwiper", {
        slidesPerView: 4,
        spaceBetween: 120,
        autoplay: {
            pauseOnMouseEnter: false,
            disableOnInteraction: false,
            delay: 3000,
        },
    });

    // Products swiper
    const serviceCenterSwiper = new Swiper(".serviceCenterSwiper", {
        slidesPerView: 3,
        spaceBetween: 44,
        autoplay: {
            pauseOnMouseEnter: false,
            disableOnInteraction: false,
            delay: 3000,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    Fancybox.bind("[data-fancybox]", {
        // Your options go here
    });
})
