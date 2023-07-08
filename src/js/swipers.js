document.addEventListener('DOMContentLoaded', function () {

    // Пересчет rem в px 
    const rem = function (rem) {
        if (window.innerWidth > 768) {
            return 0.005208335 * window.innerWidth * rem;
        } else {
            // где 375 это ширина моб версии макета
            return (100 / 375) * (0.1 * window.innerWidth) * rem;
        }
    }

    const getThreeDigitNumber = function (number) {
        if (number < 10) return String('00' + number)
        else if (number > 10 && number < 100) return String('0' + number)
        else return String(number)
    }

    const getTwoDigitNumber = function (number) {
        if (number < 10) return String('0' + number)
        else if (number > 10 && number < 100) return String('0' + number)
        else return String(number)
    }

    // ГЛАВНАЯ

    const mainHeroBanner = new Swiper('.main-banner__swiper', {
        slidesPerView: 1,
        spaceBetween: rem(3),
        pagination: {
            el: '.main-banner__swiper-controllers .swiper-pagination',
        },
        navigation: {
            nextEl: '.main-banner__swiper-controllers .next',
            prevEl: '.main-banner__swiper-controllers .prev',
        },
    })

    const servicesSwiper = new Swiper('.services__swiper', {
        slidesPerView: 4,
        spaceBetween: rem(3.4),
        pagination: {
            el: '.services__swiper-pagination',
        },
        navigation: {
            nextEl: '.services__swiper-next',
            prevEl: '.services__swiper-prev',
        },
    })

    const newsSwiper = new Swiper('.news__swiper', {
        slidesPerView: 3,
        spaceBetween: rem(3.5),
        pagination: {
            el: '.news__swiper-controllers .swiper-pagination',
        },
        navigation: {
            nextEl: '.news__swiper-controllers .next',
            prevEl: '.news__swiper-controllers .prev',
        },
    })

    const eventsSwiper = new Swiper('.events__swiper', {
        slidesPerView: 1,
        spaceBetween: rem(3.5),
        speed: 600,
        pagination: {
            el: '.events__swiper-controllers .swiper-pagination',
        },
        navigation: {
            nextEl: '.events__swiper-controllers .swiper-next',
            prevEl: '.events__swiper-controllers .swiper-prev',
        },
    })
    // КАТАЛОГ (ОБЩИЙ)

    const catalogHeroSwiper = new Swiper('.catalog-hero__swiper', {
        slidesPerView: 'auto',
        spaceBetween: rem(3),
        effect: 'fade',
        pagination: {
            el: '.catalog-hero__swiper-controllers .swiper-pagination',
        },
        navigation: {
            nextEl: '.catalog-hero__swiper-controllers .swiper-next',
            prevEl: '.catalog-hero__swiper-controllers .swiper-prev',
        },
    })


})