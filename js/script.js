$(window).on('load', function () {

    // Preloader
    $('.preloader img').fadeOut();
    $('.preloader').delay(200).fadeOut();
    $('body').removeClass("overflow-hidden");

    // Scroll top button
    $offset = $("#header").outerHeight();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200)
            $('#btn-scroll-top').fadeIn(200);
        else
            $('#btn-scroll-top').fadeOut(200);

        if ($(this).scrollTop() > $offset + 200) {
            $("#header").addClass("fixed");
        }
        else {
            $("#header").removeClass("fixed");
        }
    });

});

$(function () {
    // Document click
    $(document).mouseup(function (e) {
        var langList = $(".lang-list");

        if (!langList.is(e.target) && langList.has(e.target).length === 0) {
            langList.find('button').stop(true, false, true).removeClass('active');
            $('.lang-dropdown').stop(true, false, true).removeClass('active');
        }
    });
    // Scroll top button
    $('#btn-scroll-top').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 0);
    });

    // Go to
    $('.go-to').click(function (e) {
        e.preventDefault()
        let fixedHeight = $('#header').outerHeight();
        let id = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(id).offset().top - fixedHeight }, 0);
    });

    // Lang list
    $('.lang-list button').click(function () {
        $(this).stop(true, false, true).toggleClass('active');
        $('.lang-dropdown').stop(true, false, true).toggleClass('active');
    });

    $('.accardion-item-header button').click(function () {
        const accordionBody = $(this).closest('.accardion-item').find('.accardion-item-body');
        $('.accardion-item-body.show').stop(true, false, true).slideUp(250);
        accordionBody.stop(true, false, true).slideToggle(250);
        accordionBody.addClass("show");
    });

    // Welcome swiper
    const welcomeSwiper = new Swiper(".welcomeSwiper", {
        spaceBetween: 0,
        autoplay: {
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
            delay: 3000,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
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
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
            delay: 3000,
        },
    });

    // Products swiper
    const productsSwiper = new Swiper(".productsSwiper", {
        slidesPerView: 4,
        spaceBetween: 32,
        autoplay: {
            pauseOnMouseEnter: true,
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
        spaceBetween: 100,
        autoplay: {
            pauseOnMouseEnter: false,
            disableOnInteraction: false,
            delay: 3000,
        },
    });

    // Products swiper
    const serviceCenterSwiper = new Swiper(".serviceCenterSwiper", {
        slidesPerView: 3,
        spaceBetween: 36,
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

    // Products gallery swiper
    const productGallerySwiper = new Swiper(".productGallerySwiper", {
        spaceBetween: 0,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // Blogs swiper
    const blogsSwiper = new Swiper(".blogsSwiper", {
        slidesPerView: 3,
        spaceBetween: 68,
        autoplay: {
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
            delay: 3000,
        }
    });

    // Fancybox
    Fancybox.bind("[data-fancybox]", {
        // Your options go here
    });

    // Copy text
    $(".copy-to-clipboard").click(function () {
        $(this).find("span").fadeIn(150).delay(300).fadeOut(150);
        let $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(this).data('href')).select();
        document.execCommand("copy");
        $temp.remove();
    })
})
