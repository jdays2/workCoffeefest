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