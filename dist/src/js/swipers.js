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

<<<<<<< HEAD
<<<<<<< HEAD
    if (document.querySelector('.services__container')) {
        document.querySelectorAll('.services__container').forEach(item => {
            const prev = item.querySelector('.services__swiper-prev');
            const next = item.querySelector('.services__swiper-next');
            const pagination = item.querySelector('.services__swiper-pagination');
            const slider = item.querySelector('.services__swiper');
            const servicesSwiper = new Swiper(slider, {
                spaceBetween: rem(3.4),
                pagination: {
                    el: pagination,
                },
                navigation: {
                    nextEl: next,
                    prevEl: prev,
                },
                breakpoints: {
                    769: {
                        slidesPerView: 4,
                    },
                    320: {
                        slidesPerView: 1,
                    }
                }
            })
        })
    }


    const awaySwiper = new Swiper('.away__swiper', {
        slidesPerView: 3,
        spaceBetween: rem(3.5),
        pagination: {
            el: '.services__swiper-pagination',
        },
        navigation: {
            nextEl: '.services__swiper-next',
            prevEl: '.services__swiper-prev',
        },
    })

    const proposalSwiper = new Swiper('.proposal__swiper', {
        slidesPerView: 3,
        spaceBetween: rem(3.5),
=======
    const servicesSwiper = new Swiper('.services__swiper', {
        spaceBetween: rem(3.4),
>>>>>>> cd4bfcd (news pages + mobile styles main page)
=======
    const servicesSwiper = new Swiper('.services__swiper', {
        spaceBetween: rem(3.4),
>>>>>>> c38f3e1 (feat: update from main remote)
        pagination: {
            el: '.services__swiper-pagination',
        },
        navigation: {
            nextEl: '.services__swiper-next',
            prevEl: '.services__swiper-prev',
        },
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> c38f3e1 (feat: update from main remote)
        breakpoints: {
            769: {
                slidesPerView: 4,
            },
            320: {
                slidesPerView: 1,
            }
        }
<<<<<<< HEAD
>>>>>>> cd4bfcd (news pages + mobile styles main page)
=======
>>>>>>> c38f3e1 (feat: update from main remote)
    })

    const newsSwiper = new Swiper('.news__swiper', {
        spaceBetween: rem(3.5),
        pagination: {
            el: '.news__swiper-controllers .swiper-pagination',
        },
        navigation: {
<<<<<<< HEAD
<<<<<<< HEAD
            nextEl: '.news__swiper-controllers .swiper-next',
            prevEl: '.news__swiper-controllers .swiper-prev',
=======
            nextEl: '.news__swiper-controllers .next',
            prevEl: '.news__swiper-controllers .prev',
>>>>>>> cd4bfcd (news pages + mobile styles main page)
=======
            nextEl: '.news__swiper-controllers .next',
            prevEl: '.news__swiper-controllers .prev',
>>>>>>> c38f3e1 (feat: update from main remote)
        },
        breakpoints: {
            769: {
                slidesPerView: 3,
            },
            320: {
                slidesPerView: 1,
            }
        }
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

    const interiors = new Swiper('.interiors__swiper', {
        slidesPerView: 1.8,
        spaceBetween: rem(3),
        centeredSlides: true,
        loop: true,
        speed: 600,
        pagination: {
            el: '.interiors__swiper-controllers .swiper-pagination',
        },
        navigation: {
            nextEl: '.interiors__swiper-controllers .swiper-next',
            prevEl: '.interiors__swiper-controllers .swiper-prev',
        },
    })



    const aboutTeamSwiper = new Swiper('.about-team__swiper', {
        slidesPerView: 4,
        spaceBetween: rem(3.4),
        speed: 600,
        pagination: {
            el: '.about-team__swiper-controllers .swiper-pagination',
        },
        navigation: {
            nextEl: '.about-team__swiper-controllers .swiper-next',
            prevEl: '.about-team__swiper-controllers .swiper-prev',
        },
    })

    const authorcoffeeTypesSwiper = new Swiper('.authorcoffee-types__swiper', {
        slidesPerView: 1,
        spaceBetween: rem(3.5),
        speed: 600,
        pagination: {
            el: '.authorcoffee-types__swiper-controllers .swiper-pagination',
        },
        navigation: {
            nextEl: '.authorcoffee-types__swiper-controllers .swiper-next',
            prevEl: '.authorcoffee-types__swiper-controllers .swiper-prev',
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