const main = function () {
    const goTop = document.querySelector('.go-top');
    const mobile = document.querySelector('.mobile');
    const popup = document.querySelector('.popup');
    const office = document.querySelector('.office');
    const apartment = document.querySelector('.apartment');
    const calendar = document.querySelector('.calendar');

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
            else if (mobile.classList.contains('_active') && (!e.target.closest('.mobile-inner') || e.target.closest('.mobile .close') || e.target.closest('.mobile .menu-item'))) closeNav()
        })
    }

    if (popup) {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-tour')) {
                const tourSrc = e.target.closest('.btn-tour').getAttribute('data-tour')
                let iframe = popup.querySelector('iframe')

                if (iframe) {
                    if (iframe.getAttribute('src') != tourSrc) iframe.setAttribute('src', tourSrc)
                } else {
                    iframe = document.createElement('iframe')
                    iframe.setAttribute('src', tourSrc)
                    popup.querySelector('.popup-body').insertAdjacentElement('afterbegin', iframe)
                }

                popup.classList.add('_active')
                document.body.classList.add('_lock')
            }
        })
        popup.addEventListener('click', (e) => {
            if (popup.classList.contains('_active') && (!e.target.closest('.popup-inner') || e.target.closest('.popup .close'))) {
                popup.classList.remove('_active')
                document.body.classList.remove('_lock')
            }
        })
    }

    if (office) {
        const swiperSelectors = office.querySelectorAll('.office-list .swiper')
        const filter = office.querySelector('.office-filter')

        initOfficeSwiper(swiperSelectors)

        if (filter) {
            filter.addEventListener('click', (e) => { if (e.target.closest('.toggle')) filter.classList.toggle('_active') })
            document.addEventListener('click', (e) => { if (!e.target.closest('.office-filter')) filter.classList.remove('_active') })
        }
    }

    if (apartment) {
        const swiperSelector = apartment.querySelector('.images .swiper-top')
        const swiperPagination = swiperSelector.querySelector('.swiper-pagination')
        const swiperNext = swiperSelector.querySelector('.swiper-button-next')
        const swiperPrev = swiperSelector.querySelector('.swiper-button-prev')
        const thumbsSelector = apartment.querySelector('.images .swiper-thumbs')

        const thumbs = new Swiper(thumbsSelector, {
            spaceBetween: 15,
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
    }

    if (calendar) {
        const swiperSelector = calendar.querySelector('.calendar-swiper .swiper')
        const swiperNext = swiperSelector.querySelector('.swiper-button-next')
        const swiperPrev = swiperSelector.querySelector('.swiper-button-prev')

        const swiper = new Swiper(swiperSelector, {
            navigation: {
                nextEl: swiperNext,
                prevEl: swiperPrev,
            },
            enabled: true,
            spaceBetween: 0,
            slidesPerView: 1,
            breakpoints: {
                991.98: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                }
            }
        })

        calendar.addEventListener('click', (e) => {
            if (e.target.closest('.switch button')) {
                const btns = e.target.closest('.switch').querySelectorAll('button')
                for (const btn of btns) btn.classList.remove('_active')
                e.target.closest('.switch button').classList.add('_active')
            }
        })
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