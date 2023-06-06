$(function () {
    // Lazy load
    if ("IntersectionObserver" in window) {
        let lazyImgObserver = new IntersectionObserver(
            (entries, lazyImgObserver) => {
                entries.forEach(entry => {
                    if (entry.intersectionRatio > 0.0) {
                        let img = entry.target;
                        if (img.classList.contains('lazyload')) {
                            img.setAttribute('src', img.dataset.src);
                            img.removeAttribute('data-src');
                            img.classList.remove('lazyload')
                        }
                    }
                });
            }
        );

        let lazyImages = document.querySelectorAll('.lazyload');
        for (let img of lazyImages) {
            lazyImgObserver.observe(img);
        }
    }

    // Document click
    $(document).mouseup(function (e) {
        let langList = $(".lang-list");
        let servicesSearchForm = $(".services-search-form");

        if (!langList.is(e.target) && langList.has(e.target).length === 0) {
            langList.find('button').stop(true, false, true).removeClass('active');
            $('.lang-dropdown').stop(true, false, true).removeClass('active');
        }

        if (!servicesSearchForm.is(e.target) && servicesSearchForm.has(e.target).length === 0) {
            servicesSearchForm.find('.form-general-select.collapsed').removeClass('collapsed');
            servicesSearchForm.find('.form-general-select-body').slideUp(200);
        }
    });

    // Scroll top button
    $offset = $("#header").outerHeight();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200)
            $('#btn-scroll-top').fadeIn(200);
        else
            $('#btn-scroll-top').fadeOut(200);

        if ($(this).scrollTop() > $offset + 200) {
            $("#header").addClass("fixed");
        } else {
            $("#header").removeClass("fixed");
        }
    });

    // Scroll top button
    $('#btn-scroll-top').click(function () {
        $("html, body").animate({ scrollTop: 0 }, 0);
    });

    // Go to
    $('.go-to').click(function (e) {
        e.preventDefault()
        $("body").removeClass("overflow-hidden")
        $(".mobile-menu-content").removeClass("show")
        let fixedHeight = $('#header').outerHeight()
        let id = $(this).attr("href")
        $("html, body").animate({ scrollTop: $(id).offset().top - fixedHeight }, 0)
    });

    // Lang list
    $('.lang-list button').click(function () {
        $(this).stop(true, false, true).toggleClass('active');
        $('.lang-dropdown').stop(true, false, true).toggleClass('active');
    });

    // Mobile menu
    $(".btn-menu-toggle").click(function () {
        if ($(".mobile-menu-content").hasClass("show")) {
            $("body").removeClass("overflow-hidden")
            $(".mobile-menu-content").removeClass("show")
        } else {
            $("body").addClass("overflow-hidden")
            $(".mobile-menu-content").addClass("show")
        }
    })

    // Form general select
    $('.form-general').on('click', '.form-general-select-header', function () {
        let currentFormItem = $(this).closest('.form-general-item');
        if (currentFormItem.hasClass('active')) {
            $('.form-general-select-body').stop(true, false, true).slideUp(200);
            currentFormItem.find('.form-general-select-body').stop(true, false, true).slideToggle(200);
            $(this).closest('.form-general-select').toggleClass('collapsed');
        }
    })

    $('.services-search-form').on('click', '.form-general-option', function () {
        $('.form-general-option').removeClass('selected');
        $(this).addClass('selected');
        $(this).closest('.form-general-select').find('.form-general-select-header').addClass('selected');

        let dataValue = $(this).data('value');
        let currentFormItem = $(this).closest('.form-general-item');
        let nextFormItem = currentFormItem.next('.form-general-item');

        currentFormItem.find('.form-general-select-header').data('value', dataValue);
        currentFormItem.find('.form-general-select-header span').text(dataValue);

        let nextFormItems = currentFormItem.nextAll('.form-general-item');
        for (const formItem of nextFormItems) {
            nextFormItems.removeClass('active')
            let formItemHeader = $(formItem).find('.form-general-select-header');
            formItemHeader.find('span').text(formItemHeader.data('label'));
            formItemHeader.removeClass('selected');
        }

        $(this).closest('.form-general-select-body').slideUp(200);
        $(this).closest('.form-general-select').toggleClass('collapsed');

        // if response true
        if (nextFormItem.length) {
            nextFormItem.addClass('active');
        } else {
            $('.form-general').addClass('completed')
        }
    })

    $('.customs-form').on('click', '.form-general-option', function () {
        $('.form-general-option').removeClass('selected');
        $(this).addClass('selected');
        $(this).closest('.form-general-select').find('.form-general-select-header').addClass('selected');

        let dataValue = $(this).data('value');
        let currentFormItem = $(this).closest('.form-general-item');

        currentFormItem.find('.form-general-select-header').data('value', dataValue);
        currentFormItem.find('.form-general-select-header span').text(dataValue);

        $(this).closest('.form-general-select-body').slideUp(200);
        $(this).closest('.form-general-select').toggleClass('collapsed');

        if (isCompletedCustomsForm()) {
            $('.customs-form').addClass('completed')
        } if (!isEmptyCustomsForm()) {
            $('.customs-form').removeClass('empty')
        }
    })

    $('.customs-form').on('input', 'input', function () {
        if (isCompletedCustomsForm()) {
            $('.customs-form').addClass('completed')
        } if (!isEmptyCustomsForm()) {
            $('.customs-form').removeClass('empty')
        }
    })

    $('#clearCustomsForm').click(function () {
        clearCustomsForm()
    });

    $('#showCustomsResult').click(function () {
        const vehicleType = $('#vehicleType').data('value');
        const engineType = $('#engineType').data('value');
        const customsValue = $('#customsValue').val();
        const engineCapacity = $('#engineCapacity').val();
        const productionDate = $('#productionDate').val();
        const manufactureCountry = $('input[name="manufactureCountry"]:checked').val();
        console.log(vehicleType, engineType, customsValue, engineCapacity, productionDate, manufactureCountry);

        clearCustomsForm()
    });

    function isCompletedCustomsForm() {
        const vehicleType = $('#vehicleType').data('value');
        const engineType = $('#engineType').data('value');
        const customsValue = $('#customsValue').val();
        const engineCapacity = $('#engineCapacity').val();
        const productionDate = $('#productionDate').val();
        const manufactureCountry = $('input[name="manufactureCountry"]:checked').val();
        return vehicleType && engineType && customsValue && engineCapacity && productionDate && manufactureCountry
    }

    function isEmptyCustomsForm() {
        const vehicleType = $('#vehicleType').data('value');
        const engineType = $('#engineType').data('value');
        const customsValue = $('#customsValue').val();
        const engineCapacity = $('#engineCapacity').val();
        const productionDate = $('#productionDate').val();
        const manufactureCountry = $('input[name="manufactureCountry"]:checked').val();
        return !(vehicleType || engineType || customsValue || engineCapacity || productionDate || manufactureCountry)
    }

    function clearCustomsForm() {
        $('#vehicleType').data('value', '');
        $('#engineType').data('value', '');
        console.log($('#vehicleType').find('span'));
        $('#vehicleType').find('span').text($('#vehicleType').data('label'))
        $('#engineType').find('span').text($('#engineType').data('label'))
        $('#customsValue').val("");
        $('#engineCapacity').val("");
        $('#productionDate').val("");
        $('#otherCountries').prop('checked', true)
        $('.customs-form').removeClass('completed').addClass('empty')
    }

    $('.flatpickr').length && flatpickr(".flatpickr", {
        dateFormat: "m-d-Y",
        wrap: true
    });

    // Marked search
    const servicesResultWrapper = document.querySelector('.services-result-wrapper');
    const markedSearchInput = document.querySelector('.marked-search-input');

    // on keyup
    markedSearchInput && markedSearchInput.addEventListener("keyup", (event) => {
        let searchText = event.target.value
        if (searchText) {
            markedSearchInput.closest('.marked-search').classList.add('active')
        } else {
            markedSearchInput.closest('.marked-search').classList.remove('active')
        }
        highlight(servicesResultWrapper, searchText)
    });

    // clear search
    let btnClearSearch = document.querySelector('.marked-search .clear-filter')
    btnClearSearch && btnClearSearch.addEventListener('click', () => {
        markedSearchInput.value = ""
        btnClearSearch.closest('.marked-search').classList.remove('active')
        highlight(servicesResultWrapper, "")
    })

    // highlight on search
    function highlight(container, markedText) {

        // Select the whole paragraph
        let ob = new Mark(container);

        document.querySelectorAll('.services-result-item').forEach((element) => {
            element.classList.remove('d-none', 'marked', 'no-border');
        });

        // First unmark the highlighted word or letter
        ob.unmark();

        if (markedText) {

            // Highlight letter or word
            ob.mark(markedText, {
                "separateWordSearch": false,
                "done": function (count) {
                    if (count) {
                        document.querySelectorAll('.services-result-item').forEach((element) => {
                            if (!element.querySelector('mark')) {
                                element.classList.add('d-none');
                            } else {
                                element.classList.add('marked');
                            }
                        });
                        let markedItems = document.querySelectorAll('.services-result-item.marked');
                        markedItems[markedItems.length - 1].classList.add('no-border');
                    } else {
                        document.querySelectorAll('.services-result-item').forEach((element) => {
                            element.classList.add('d-none');
                        });
                    }
                }
            });

        }

    }

    // Accordion
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
        breakpoints: {
            0: {
                slidesPerView: 2,
                spaceBetween: 0,
            },
            576: {
                slidesPerView: 3,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 0,
            },
            992: {
                slidesPerView: 5,
                spaceBetween: 0,
            },
            1200: {
                slidesPerView: 7,
                spaceBetween: 0,
            }
        },
        // rewind: true,
        loop: true,
        lazy: true,
        autoplay: {
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
            delay: 3000,
        },
    });

    // Products swiper
    const productsSwiper = new Swiper(".productsSwiper", {
        // rewind: true,
        loop: true,
        lazy: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 24,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 32,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 32,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 32,
            }
        },
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
        // rewind: true,
        loop: true,
        lazy: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 60,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 80,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 100,
            }
        },
        autoplay: {
            pauseOnMouseEnter: false,
            disableOnInteraction: false,
            delay: 3000,
        },
    });

    // Services center swiper
    const serviceCenterSwiper = new Swiper(".serviceCenterSwiper", {
        // rewind: true,
        loop: true,
        lazy: true,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 24,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            992: {
                slidesPerView: 2,
                spaceBetween: 36,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 36,
            }
        },
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
        // rewind: true,
        loop: true,
        lazy: true,
        autoplay: {
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
            delay: 3000,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 24,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 24,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 24,
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 48,
            },
            1400: {
                slidesPerView: 3,
                spaceBetween: 68,
            }
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
