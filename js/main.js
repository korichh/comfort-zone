const main = function () {
    const goTop = document.querySelector('.go-top');
    const mobile = document.querySelector('.mobile');
    const office = document.querySelector('.office');
    const apartment = document.querySelector('.apartment');

    if (goTop) {
        const checkScroll = () => {
            if (scrollY > 40) {
                if (!goTop.classList.contains('_active'))
                    goTop.classList.add('_active')
            } else {
                if (goTop.classList.contains('_active'))
                    goTop.classList.remove('_active')
            }
        }

        document.addEventListener('scroll', checkScroll);
        checkScroll();
    }

    if (mobile) {
        const openNav = () => {
            document.body.classList.add('_lock');
            mobile.classList.add('_active')
        }
        const closeNav = () => {
            document.body.classList.remove('_lock');
            mobile.classList.remove('_active')
        }

        document.addEventListener('click', (e) => {
            if (e.target.closest('.burger')) openNav()
            else if (!e.target.closest('.mobile-inner') || e.target.closest('.mobile .close') || e.target.closest('.mobile .menu-item')) closeNav()
        })
    }

    if (office) {
        const swiperSelectors = office.querySelectorAll('.swiper')
        const filter = office.querySelector('.office-filter')

        initOfficeSwiper(swiperSelectors)

        filter.addEventListener('click', (e) => { if (e.target.closest('.toggle')) filter.classList.toggle('_active') })
        document.addEventListener('click', (e) => { if (!e.target.closest('.office-filter')) filter.classList.remove('_active') })
    }

    if (apartment) {
        const swiperSelector = apartment.querySelector('.images .swiper-top')
        const swiperPagination = swiperSelector.querySelector('.swiper-pagination')
        const swiperNext = swiperSelector.querySelector('.swiper-button-next')
        const swiperPrev = swiperSelector.querySelector('.swiper-button-prev')
        const thumbsSelector = apartment.querySelector('.images .swiper-thumbs')
        const officeSwiperSelectors = apartment.querySelectorAll('.office-list .swiper')

        const thumbs = new Swiper(thumbsSelector, {
            spaceBetween: 10,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
            breakpoints: {
                767.98: {
                    slidesPerView: 4,
                    spaceBetween: 25,
                }
            }
        })

        const swiper = new Swiper(swiperSelector, {
            pagination: {
                el: swiperPagination,
                type: 'fraction'
            },
            navigation: {
                nextEl: swiperNext,
                prevEl: swiperPrev,
            },
            thumbs: {
                swiper: thumbs,
            },
        })

        initOfficeSwiper(officeSwiperSelectors)
    }

    function initOfficeSwiper(selectors) {
        for (const selector of selectors) {
            const pagination = selector.querySelector('.swiper-pagination')
            const next = selector.querySelector('.swiper-button-next')
            const prev = selector.querySelector('.swiper-button-prev')

            const swiper = new Swiper(selector, {
                loop: true,
                pagination: {
                    el: pagination,
                    type: 'fraction'
                },
                navigation: {
                    nextEl: next,
                    prevEl: prev
                }
            })
        }
    }
}();